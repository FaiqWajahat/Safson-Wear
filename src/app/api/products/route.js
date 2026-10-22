import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ status: 'active' })
      .populate('category', 'name slug')      // only fetch needed fields
      .populate('subcategory', 'name slug')
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, products }, {
      headers: {
        // CDN caches for 5 min; serves stale while revalidating for 10 min
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Public Products GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
