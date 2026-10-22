import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { CATALOG, SEED_PRODUCTS, CUSTOMIZATION_PRESETS } from '../data/catalog.mjs';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI missing in .env.local'); process.exit(1); }

// ─── Schemas ──────────────────────────────────────────────────────────────────
const UserSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['admin', 'superadmin'], default: 'superadmin' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
});

const CategorySchema = new mongoose.Schema(
  {
    name:           { type: String, required: true },
    slug:           { type: String, required: true, unique: true },
    description:    String,
    image:          String,
    heroBgImage:    String,
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    sortOrder:      { type: Number, default: 100 },
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    name:             { type: String, required: true },
    slug:             { type: String, required: true, unique: true },
    sku:              { type: String, default: 'PROD-0000' },
    description:      { type: String, required: true },
    images:           [String],
    category:         { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory:      { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    minOrderQuantity: { type: Number, default: 20 },
    origin:           { type: String, default: 'Sialkot, PK' },
    specifications:   Object,
    tieredPricing:    Object,
    colors:           Array,
    placements:       Array,
    techniques:       Array,
    featured:         { type: Boolean, default: false },
    status:           { type: String, default: 'active' },
  },
  { timestamps: true }
);

const User     = mongoose.models.User     || mongoose.model('User',     UserSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Product  = mongoose.models.Product  || mongoose.model('Product',  ProductSchema);

// ─── Seed Logic ───────────────────────────────────────────────────────────────
async function seedDirectly() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Wipe everything
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
    ]);
    console.log('✓ Cleared all Users, Categories, Products');

    // ── Admin User ────────────────────────────────────────────────────────────
    const admin = await User.create({
      name: 'ABI Admin',
      email: 'admin@abisportswear.com',
      password: 'adminpassword123',
      role: 'superadmin',
      isActive: true,
    });
    console.log('✓ Admin:', admin.email, '/ Password: adminpassword123');

    // ── Categories & subcategories (Street Wear & Sports Wear) ────────────────
    const idsBySlug = {};
    for (const [i, cat] of CATALOG.entries()) {
      const parent = await Category.create({
        name: cat.name, slug: cat.slug, description: cat.description, image: cat.image, sortOrder: i,
      });
      idsBySlug[cat.slug] = parent._id;

      const children = await Category.insertMany(
        cat.subcategories.map((sub, j) => ({ ...sub, heroBgImage: sub.image, parentCategory: parent._id, sortOrder: j }))
      );
      children.forEach((child) => { idsBySlug[child.slug] = child._id; });
    }
    console.log('✓ Categories and subcategories seeded (Street Wear & Sports Wear)');

    // ── Products ──────────────────────────────────────────────────────────────
    const products = SEED_PRODUCTS.map(({ category, subcategory, kind, ...p }) => ({
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

    const created = await Product.insertMany(products);
    console.log(`✓ Seeded ${created.length} products under Street Wear & Sports Wear`);

    console.log('\n══════════════════════════════════════════════');
    console.log('     DATABASE RE-SEEDED: STREET & SPORTS WEAR');
    console.log('══════════════════════════════════════════════');
    CATALOG.forEach((cat) => {
      console.log(`  ${cat.name} (${cat.slug}): ${cat.subcategories.map((s) => s.name).join(', ')}`);
    });
    console.log(`  Products Count: ${created.length}`);
    created.forEach(p => console.log(`    [${p.sku}] ${p.name}`));
    console.log('══════════════════════════════════════════════\n');

    process.exit(0);
  } catch (err) {
    console.error('✗ Seed error:', err.message);
    process.exit(1);
  }
}

seedDirectly();
