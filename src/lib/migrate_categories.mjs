// ─────────────────────────────────────────────────────────────────────────────
// Non-destructive migration: brings an existing database in line with
// src/data/catalog.mjs without wiping users or admin-created products.
//
//   node src/lib/migrate_categories.mjs --dry-run   (report only, no writes)
//   node src/lib/migrate_categories.mjs             (apply changes)
//
// - Converts the legacy "Woven Apparel" category into "Sports Wear"
// - Creates / updates every category and subcategory from the catalog (with sortOrder)
// - Remaps products from old subcategories to the new ones where there is a clear match
// - Removes the old demo products that no longer fit the catalog
// - Deletes old subcategories that are no longer part of the catalog
// ─────────────────────────────────────────────────────────────────────────────
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CATALOG, SEED_PRODUCTS, CUSTOMIZATION_PRESETS, LEGACY_SPORTS_SLUGS } from '../data/catalog.mjs';

dotenv.config({ path: '.env.local' });

const DRY = process.argv.includes('--dry-run');
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI missing in .env.local'); process.exit(1); }

const Category = mongoose.model('Category', new mongoose.Schema({}, { strict: false, timestamps: true }), 'categories');
const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false, timestamps: true }), 'products');

// Old subcategory slug → new subcategory slug (products are moved across)
const SUB_REMAP = {
  'hoodies-sweatshirts': 'hoodies',
  'graphic-street-tees': 't-shirts',
  'street-tees': 't-shirts',
  'cargo-joggers': 'trousers',
  'street-jackets': 'jackets',
  'team-jerseys': 'football',
};

// Old demo products from earlier seeds that don't belong in the new catalog
const OBSOLETE_DEMO_SLUGS = [
  'oversized-hoodie',
  'technical-heavy-oxford-button-down-shirt',
  '12oz-heavy-duck-canvas-workwear-jacket',
  'pleated-tailored-woven-chino-trousers',
  '14oz-rigid-raw-selvedge-denim-jacket',
  'sublimated-team-football-kit',
  'performance-training-tee',
  'club-poly-knit-tracksuit',
  'compression-long-sleeve-base-layer',
];

const log = (...a) => console.log(DRY ? '[dry-run]' : '  ✓', ...a);

async function write(fn) {
  if (!DRY) await fn();
}

async function migrate() {
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to MongoDB${DRY ? ' — DRY RUN, nothing will be written' : ''}\n`);

  const idsBySlug = {};
  const managedParentIds = [];
  const newSubSlugs = new Set(CATALOG.flatMap((c) => c.subcategories.map((s) => s.slug)));

  // ── 1. Parent categories ──────────────────────────────────────────────────
  for (const [i, cat] of CATALOG.entries()) {
    const legacySlugs = cat.slug === 'sports-wear' ? LEGACY_SPORTS_SLUGS : [];
    const candidates = await Category.find({ parentCategory: null, slug: { $in: [cat.slug, ...legacySlugs] } }).lean();
    const primary = candidates.find((c) => c.slug === cat.slug) || candidates[0];
    const fields = { name: cat.name, slug: cat.slug, description: cat.description, image: cat.image, sortOrder: i };

    let parentId;
    if (primary) {
      parentId = primary._id;
      log(`Update category "${primary.name}" (${primary.slug}) → "${cat.name}" (${cat.slug})`);
      await write(() => Category.updateOne({ _id: parentId }, { $set: fields }));
    } else {
      parentId = new mongoose.Types.ObjectId();
      log(`Create category "${cat.name}" (${cat.slug})`);
      await write(() => Category.create({ _id: parentId, ...fields, parentCategory: null }));
    }
    idsBySlug[cat.slug] = parentId;
    managedParentIds.push(parentId);

    // Merge any duplicate legacy parent (e.g. both "woven" and "sports-wear" exist)
    for (const dup of candidates.filter((c) => !c._id.equals(parentId))) {
      managedParentIds.push(dup._id);
      const n = await Product.countDocuments({ category: dup._id });
      log(`Merge duplicate category "${dup.name}" into "${cat.name}" (${n} products moved), then delete it`);
      await write(async () => {
        await Product.updateMany({ category: dup._id }, { $set: { category: parentId } });
        await Category.updateMany({ parentCategory: dup._id }, { $set: { parentCategory: parentId } });
        await Category.deleteOne({ _id: dup._id });
      });
    }

    // ── 2. Subcategories ────────────────────────────────────────────────────
    for (const [j, sub] of cat.subcategories.entries()) {
      const existing = await Category.findOne({ slug: sub.slug }).lean();
      const subFields = { name: sub.name, slug: sub.slug, description: sub.description, image: sub.image, parentCategory: parentId, sortOrder: j };
      if (existing) {
        idsBySlug[sub.slug] = existing._id;
        // Keep a header image the admin set by hand; only fill it when empty
        const heroFields = existing.heroBgImage ? {} : { heroBgImage: sub.image };
        log(`  Update subcategory "${sub.name}" (${sub.slug})`);
        await write(() => Category.updateOne({ _id: existing._id }, { $set: { ...subFields, ...heroFields } }));
      } else {
        const id = new mongoose.Types.ObjectId();
        idsBySlug[sub.slug] = id;
        log(`  Create subcategory "${sub.name}" (${sub.slug})`);
        await write(() => Category.create({ _id: id, ...subFields, heroBgImage: sub.image }));
      }
    }
  }

  // ── 3. Obsolete demo products ─────────────────────────────────────────────
  const obsolete = await Product.find({ slug: { $in: OBSOLETE_DEMO_SLUGS } }, 'name slug').lean();
  for (const p of obsolete) log(`Delete old demo product "${p.name}"`);
  await write(() => Product.deleteMany({ slug: { $in: OBSOLETE_DEMO_SLUGS } }));

  // ── 4. Old subcategories → remap products, then delete ────────────────────
  const oldSubs = await Category.find({
    parentCategory: { $in: managedParentIds },
    slug: { $nin: [...newSubSlugs] },
  }).lean();

  for (const old of oldSubs) {
    const target = SUB_REMAP[old.slug];
    const products = await Product.find({ subcategory: old._id, slug: { $nin: OBSOLETE_DEMO_SLUGS } }, 'name').lean();
    if (products.length) {
      if (target) {
        log(`Move ${products.length} product(s) from "${old.name}" → "${target}"`);
      } else {
        log(`${products.length} product(s) in "${old.name}" have no matching new subcategory — kept, subcategory cleared (reassign in admin): ${products.map((p) => p.name).join(', ')}`);
      }
      await write(() => Product.updateMany(
        { subcategory: old._id },
        { $set: { subcategory: target ? idsBySlug[target] : null } }
      ));
    }
    log(`Delete old subcategory "${old.name}" (${old.slug})`);
    await write(() => Category.deleteOne({ _id: old._id }));
  }

  // ── 5. New sample products (only added if missing — existing ones are not overwritten) ──
  for (const { category, subcategory, kind, ...p } of SEED_PRODUCTS) {
    const existing = await Product.findOne({ slug: p.slug }, '_id').lean();
    if (existing) {
      await write(() => Product.updateOne(
        { _id: existing._id },
        { $set: { category: idsBySlug[category], subcategory: idsBySlug[subcategory] } }
      ));
      continue;
    }
    log(`Add sample product "${p.name}" → ${subcategory}`);
    await write(() => Product.create({
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
  }

  console.log(`\n${DRY ? 'Dry run complete — run without --dry-run to apply.' : 'Migration complete.'}`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error('✗ Migration error:', err.message);
  process.exit(1);
});
