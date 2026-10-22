import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import { requireAdmin, errorResponse } from '@/lib/adminAuth';
import Category from '@/models/Category';
import Product from '@/models/Product';

// Refresh the public catalog pages so admin changes show up without waiting for ISR
function refreshCatalog() {
  try {
    revalidatePath('/products');
    revalidatePath('/');
  } catch {}
}

export async function GET(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const categories = await Category.find()
      .populate('parentCategory')
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();
      
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Categories GET error:', error);
    return errorResponse(error, 'Failed to fetch categories');
  }
}

export async function POST(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const body = await req.json();
    const { 
      name, slug, description, parentCategory, image,
      heroHeading, heroSubheading, heroBgImage, heroBgVideo,
      heroImage1, heroImage2, heroImage3
    } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      parentCategory: parentCategory || null,
      image: image || '',
      heroHeading: heroHeading || '',
      heroSubheading: heroSubheading || '',
      heroBgImage: heroBgImage || '',
      heroBgVideo: heroBgVideo || '',
      heroImage1: heroImage1 || '',
      heroImage2: heroImage2 || '',
      heroImage3: heroImage3 || '',
    });

    refreshCatalog();
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Category POST error:', error);
    return errorResponse(error, 'Failed to create category');
  }
}

export async function PUT(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const body = await req.json();
    const { 
      id, name, slug, description, parentCategory, image,
      heroHeading, heroSubheading, heroBgImage, heroBgVideo,
      heroImage1, heroImage2, heroImage3
    } = body;

    if (!id || !name || !slug) {
      return NextResponse.json({ error: 'ID, name and slug are required' }, { status: 400 });
    }

    if (parentCategory && String(parentCategory) === String(id)) {
      return NextResponse.json({ error: 'A category cannot be its own parent' }, { status: 400 });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        description,
        parentCategory: parentCategory || null,
        image: image || '',
        heroHeading: heroHeading || '',
        heroSubheading: heroSubheading || '',
        heroBgImage: heroBgImage || '',
        heroBgVideo: heroBgVideo || '',
        heroImage1: heroImage1 || '',
        heroImage2: heroImage2 || '',
        heroImage3: heroImage3 || '',
      },
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    refreshCatalog();
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Category PUT error:', error);
    return errorResponse(error, 'Failed to update category');
  }
}

export async function DELETE(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    // Check if there are subcategories using this category as a parent
    const hasChildren = await Category.findOne({ parentCategory: id });
    if (hasChildren) {
      return NextResponse.json(
        { error: 'Cannot delete category that has subcategories' },
        { status: 400 }
      );
    }

    // Check if there are products using this category
    const hasProducts = await Product.findOne({ category: id });
    if (hasProducts) {
      return NextResponse.json(
        { error: 'Cannot delete category associated with active products' },
        { status: 400 }
      );
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    refreshCatalog();
    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Category DELETE error:', error);
    return errorResponse(error, 'Failed to delete category');
  }
}
