import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import { requireAdmin, errorResponse } from '@/lib/adminAuth';
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
    const products = await Product.find()
      .populate('category')
      .populate('subcategory')
      .sort({ createdAt: -1 })
      .lean();
      
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Products GET error:', error);
    return errorResponse(error, 'Failed to fetch products');
  }
}

export async function POST(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const body = await req.json();
    const { 
      name, slug, sku, description, images, category, subcategory, 
      minOrderQuantity, origin, specifications, tieredPricing,
      colors, placements, techniques, featured, status 
    } = body;

    if (!name || !slug || !description || !category) {
      return NextResponse.json({ error: 'Name, slug, description, and category are required' }, { status: 400 });
    }

    const product = await Product.create({
      name,
      slug,
      sku: sku || 'PROD-2425',
      description,
      images: images || [],
      category,
      subcategory: subcategory || null,
      minOrderQuantity: minOrderQuantity || 50,
      origin: origin || 'Sialkot, PK',
      specifications: specifications || { gsm: '300', material: '100% Cotton', weight: '300 GSM', sizing: 'XS - 2XL', customization: 'Embroidery, Screen Printing', origin: 'Sialkot, PK' },
      tieredPricing: tieredPricing || {
        sample: { price: 40, range: '1-19' },
        lowVolume: { price: 30, range: '20-49' },
        midVolume: { price: 20, range: '50-199' },
        highVolume: { price: 14.99, range: '200+' },
      },
      colors: colors || [
        { name: 'Burgundy', hex: '#6B1D2F', image: images?.[0] || '/active-wear.png' },
        { name: 'Taupe',    hex: '#6E645A', image: images?.[1] || '/active-wear.png' },
        { name: 'Sand',     hex: '#E6D7C3', image: images?.[2] || '/active-wear.png' }
      ],
      placements: placements || [],
      techniques:  techniques  || [],
      featured: featured || false,
      status: status || 'active',
    });

    refreshCatalog();
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Product POST error:', error);
    return errorResponse(error, 'Failed to create product');
  }
}

export async function PUT(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const body = await req.json();
    const { 
      id, name, slug, sku, description, images, category, subcategory, 
      minOrderQuantity, origin, specifications, tieredPricing,
      colors, placements, techniques, featured, status 
    } = body;

    if (!id || !name || !slug || !description || !category) {
      return NextResponse.json({ error: 'ID, name, slug, description, and category are required' }, { status: 400 });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        sku: sku || 'PROD-2425',
        description,
        images: images || [],
        category,
        subcategory: subcategory || null,
        minOrderQuantity: minOrderQuantity || 50,
        origin: origin || 'Sialkot, PK',
        specifications: specifications || { gsm: '300', material: '100% Cotton', weight: '300 GSM', sizing: 'XS - 2XL', customization: 'Embroidery, Screen Printing', origin: 'Sialkot, PK' },
        tieredPricing: tieredPricing || {
          sample: { price: 40, range: '1-19' },
          lowVolume: { price: 30, range: '20-49' },
          midVolume: { price: 20, range: '50-199' },
          highVolume: { price: 14.99, range: '200+' },
        },
        colors: colors || [
          { name: 'Burgundy', hex: '#6B1D2F', image: images?.[0] || '/active-wear.png' }
        ],
        placements: placements || [],
        techniques:  techniques  || [],
        featured: featured || false,
        status: status || 'active',
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    refreshCatalog();
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Product PUT error:', error);
    return errorResponse(error, 'Failed to update product');
  }
}

export async function DELETE(req) {
  try {
    requireAdmin(req);
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    refreshCatalog();
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Product DELETE error:', error);
    return errorResponse(error, 'Failed to delete product');
  }
}
