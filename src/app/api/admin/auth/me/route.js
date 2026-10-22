import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdmin, errorResponse } from '@/lib/adminAuth';

// Returns the currently logged-in admin (used by the admin layout and Admins page)
export async function GET(req) {
  try {
    const session = requireAdmin(req);
    await connectDB();
    const user = await User.findById(session.userId, 'name email role isActive').lean();
    if (!user || !user.isActive) throw new Error('Unauthorized');

    return NextResponse.json({
      success: true,
      user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    return errorResponse(error, 'Failed to load session');
  }
}
