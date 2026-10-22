import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find()
      .populate('parentCategory', 'name slug') // only fetch needed fields
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();
    return NextResponse.json({ success: true, categories }, {
      headers: {
        // Categories change rarely — cache for 10 min, SWR for 30 min
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Public Categories GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
