import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/adminAuth';

export async function POST(req) {
  try {
    await connectDB();
    
    // Seed default admin if database contains zero users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        name: 'Default Admin',
        email: 'admin@abisportswear.com',
        password: 'adminpassword123', // Schema pre-save hook hashes this securely
        role: 'superadmin',
        isActive: true,
      });
      console.log('Database seeded with default admin: admin@abisportswear.com / adminpassword123');
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid credentials or inactive account' },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT Token (valid for 1 day)
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Login successful', 
        user: { name: user.name, email: user.email, role: user.role } 
      },
      { status: 200 }
    );

    // Set HTTP-only secure cookie
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred' },
      { status: 500 }
    );
  }
}
