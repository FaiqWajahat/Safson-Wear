import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Same secret the login route signs with (fallback kept so existing sessions stay valid)
export const JWT_SECRET = process.env.JWT_SECRET || 'abi_sports_fallback_secret_key_12345';

// Returns the decoded session { userId, role, email, name } or null when missing/invalid/expired
export function getAdminSession(req) {
  const token = req.cookies.get('admin_session')?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Throws 'Unauthorized' unless the request carries a valid admin session
export function requireAdmin(req) {
  const session = getAdminSession(req);
  if (!session) throw new Error('Unauthorized');
  return session;
}

// Standard JSON error for auth failures and unexpected errors
export function errorResponse(error, fallbackMessage) {
  if (error?.message === 'Unauthorized') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // MongoDB duplicate key (unique slug / name / email)
  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern || error.keyValue || {})[0] || 'value';
    return NextResponse.json(
      { error: `This ${field} is already in use. Please choose a different ${field}.` },
      { status: 409 }
    );
  }
  if (error?.name === 'ValidationError') {
    const first = Object.values(error.errors || {})[0];
    return NextResponse.json({ error: first?.message || 'Invalid data' }, { status: 400 });
  }
  if (error?.name === 'CastError') {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  return NextResponse.json({ error: fallbackMessage }, { status: 500 });
}
