// Non-destructive: gives catalog products their real photos (src/data/productImages.mjs).
// Only touches products whose images are still the old bundled placeholders, so photos
// uploaded from the admin panel are never overwritten.
//
//   node src/lib/update_product_images.mjs --dry-run   (report only)
//   node src/lib/update_product_images.mjs             (apply)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PRODUCT_IMAGES, PLACEHOLDER_IMAGES } from '../data/productImages.mjs';

dotenv.config({ path: '.env.local' });

const DRY = process.argv.includes('--dry-run');
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI missing in .env.local'); process.exit(1); }

const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false, timestamps: true }), 'products');

const isPlaceholder = (url) => !url || PLACEHOLDER_IMAGES.includes(url);

await mongoose.connect(MONGODB_URI);
let updated = 0, skipped = 0;

for (const product of await Product.find({}).lean()) {
  const photos = PRODUCT_IMAGES[product.slug];
  if (!photos) { console.log(`- skip (not in catalog): ${product.slug}`); skipped++; continue; }

  const images = product.images || [];
  if (images.length && !images.every(isPlaceholder)) {
    console.log(`- skip (custom images): ${product.slug}`); skipped++; continue;
  }

  const colors = (product.colors || []).map((c, i) => (isPlaceholder(c.image) ? { ...c, image: photos[i % photos.length] } : c));
  console.log(`${DRY ? '[dry] ' : ''}update ${product.slug}`);
  if (!DRY) await Product.updateOne({ _id: product._id }, { $set: { images: photos, colors } });
  updated++;
}

console.log(`\n${DRY ? 'Would update' : 'Updated'} ${updated} product(s), skipped ${skipped}.`);
await mongoose.disconnect();
