import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/adminAuth';
import { CATALOG, SEED_PRODUCTS, CUSTOMIZATION_PRESETS } from '@/data/catalog.mjs';

export async function GET(req) {
  try {
    // Destructive: wipes the catalog, so only a logged-in superadmin may run it
    const session = getAdminSession(req);
    if (!session || session.role !== 'superadmin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    // 1. Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Admin accounts are kept; only create the default one if none exist
    if ((await User.countDocuments()) === 0) await User.create({
      name: 'Default Admin',
      email: 'admin@abisportswear.com',
      password: 'adminpassword123', // Schema pre-save hook will hash this securely
      role: 'superadmin',
      isActive: true,
    });

    // 2. Create main categories (Street Wear & Sports Wear) and their subcategories
    const idsBySlug = {};
    for (const [i, cat] of CATALOG.entries()) {
      const parent = await Category.create({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        sortOrder: i,
      });
      idsBySlug[cat.slug] = parent._id;

      for (const [j, sub] of cat.subcategories.entries()) {
        const child = await Category.create({
          name: sub.name,
          slug: sub.slug,
          description: sub.description,
          image: sub.image,
          heroBgImage: sub.image,
          parentCategory: parent._id,
          sortOrder: j,
        });
        idsBySlug[sub.slug] = child._id;
      }
    }

    // 3. Create sample products mapped to subcategories
    const sampleProducts = SEED_PRODUCTS.map(({ category, subcategory, kind, ...p }) => ({
      ...p,
      category: idsBySlug[category],
      subcategory: idsBySlug[subcategory],
      origin: 'Sialkot, PK',
      specifications: { ...p.specifications, origin: 'Sialkot, PK' },
      placements: CUSTOMIZATION_PRESETS[kind].placements,
      techniques: CUSTOMIZATION_PRESETS[kind].techniques,
      featured: true,
      status: 'active',
    }));

    await Product.insertMany(sampleProducts);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with Street Wear & Sports Wear Categories, Subcategories, and Products!',
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
