import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdmin, errorResponse } from '@/lib/adminAuth';

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

// Loads the acting admin from the DB so role changes apply immediately (not only after re-login)
async function getActor(req) {
  const session = requireAdmin(req);
  await connectDB();
  const actor = await User.findById(session.userId, 'role isActive').lean();
  if (!actor || !actor.isActive) throw new Error('Unauthorized');
  return { id: String(actor._id), role: actor.role };
}

function forbidden(action) {
  return NextResponse.json(
    { error: `Forbidden: Only superadmins can ${action} admin users` },
    { status: 403 }
  );
}

export async function GET(req) {
  try {
    await getActor(req);
    const users = await User.find({}, '-password').sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Users GET error:', error);
    return errorResponse(error, 'Failed to fetch users');
  }
}

export async function POST(req) {
  try {
    const actor = await getActor(req);
    if (actor.role !== 'superadmin') return forbidden('create');

    const body = await req.json();
    const { name, password, role } = body;
    const email = normalizeEmail(body.email);

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const newUser = await User.create({
      name,
      email,
      password, // Pre-save hooks hashes this
      role: role === 'superadmin' ? 'superadmin' : 'admin',
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      user: { name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    console.error('User POST error:', error);
    return errorResponse(error, 'Failed to create user');
  }
}

export async function PUT(req) {
  try {
    const actor = await getActor(req);
    if (actor.role !== 'superadmin') return forbidden('update');

    const body = await req.json();
    const { id, name, role, isActive, password } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Stop a superadmin from locking themselves out
    if (id === actor.id) {
      if (role && role !== 'superadmin') {
        return NextResponse.json({ error: 'You cannot remove your own superadmin role' }, { status: 400 });
      }
      if (isActive === false) {
        return NextResponse.json({ error: 'You cannot deactivate your own account' }, { status: 400 });
      }
    }

    if (body.email) {
      const email = normalizeEmail(body.email);
      if (email !== user.email && await User.exists({ email, _id: { $ne: id } })) {
        return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
      }
      user.email = email;
    }
    if (name) user.name = name;
    if (role === 'admin' || role === 'superadmin') user.role = role;
    if (isActive !== undefined) user.isActive = Boolean(isActive);
    if (password) {
      if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }
      user.password = password; // triggers pre-save schema hash hook
    }

    await user.save();

    return NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role, isActive: user.isActive }
    });
  } catch (error) {
    console.error('User PUT error:', error);
    return errorResponse(error, 'Failed to update user');
  }
}

export async function DELETE(req) {
  try {
    const actor = await getActor(req);
    if (actor.role !== 'superadmin') return forbidden('delete');

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    // Prevent deleting oneself
    if (id === actor.id) {
      return NextResponse.json({ error: 'Cannot delete your own admin session account' }, { status: 400 });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('User DELETE error:', error);
    return errorResponse(error, 'Failed to delete user');
  }
}
