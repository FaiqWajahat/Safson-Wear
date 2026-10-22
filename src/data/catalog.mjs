// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for the product catalog.
// Used by the frontend (Navbar / Footer / products page fallbacks) and by both
// database seeders (src/app/api/seed/route.js and src/lib/direct_seed.mjs).
// Plain ESM with no path aliases so Node scripts can import it directly.
// ─────────────────────────────────────────────────────────────────────────────

import { PRODUCT_IMAGES } from './productImages.mjs';

// Free Unsplash License photos (images.unsplash.com is allowed in next.config.mjs).
// Each category / subcategory has its own image — swap for the client's product photos when available.
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

const STREET_WEAR = {
    name: 'Street Wear',
    slug: 'street-wear',
    description: 'Heavyweight hoodies, premium tees, jackets, trousers, shorts, and tracksuits engineered for modern urban fashion labels.',
    image: unsplash('1523398002811-999ca8dec234'),
    pillars: ['450 GSM Heavyweight Fleece', 'Puff & 3D High-Density Print', 'Custom Garment Wash Finish'],
    fabricTech: [
      { name: '450 GSM Heavy French Terry', desc: 'Dense 100% organic cotton loopback knit providing structure, weight, and premium hand-feel.' },
      { name: 'Vintage Acid & Enzyme Wash', desc: 'Custom pigment garment washing process creating unique lived-in color tones and zero shrinkage.' },
      { name: 'High-Density Puff & Screen Inks', desc: 'Specialized 3D tactile screen printing and puff ink transfers built to withstand washing.' },
      { name: 'Reinforced Twin-Needle Seaming', desc: 'Double-stitched shoulder and neck ribbing engineered for oversized drop-shoulder fits.' },
    ],
    subcategories: [
      { name: 'Hoodies', slug: 'hoodies', description: 'Heavyweight french terry and fleece hoodies, drop-shoulder pullovers, and zip-ups.', image: unsplash('1556821840-3a63f95609a7') },
      { name: 'T-Shirts', slug: 't-shirts', description: 'Premium cotton tees, oversized fits, vintage washes, and high-density prints.', image: unsplash('1521572163474-6864f9cf17ab') },
      { name: 'Jackets', slug: 'jackets', description: 'Varsity jackets, bombers, windbreakers, and puffer coats for streetwear drops.', image: unsplash('1591047139829-d91aecb6caea') },
      { name: 'Trousers', slug: 'trousers', description: 'Cargo trousers, fleece joggers, and relaxed-fit pants with custom hardware.', image: unsplash('1548883354-7622d03aca27') },
      { name: 'Shorts', slug: 'shorts', description: 'Heavyweight fleece shorts, cargo shorts, and mesh shorts with drawcord waists.', image: unsplash('1591678495920-daa30e3d2c38') },
      { name: 'Tracksuits', slug: 'tracksuits', description: 'Matching hoodie-and-jogger sets, velour tracksuits, and coordinated fleece sets.', image: unsplash('1760736534441-4d14bf11103e') },
    ],
};

const SPORTS_WEAR = {
    name: 'Sports Wear',
    slug: 'sports-wear',
    description: 'Custom team uniforms and performance kits for football, soccer, rugby, ice hockey, American football, basketball, baseball, and tennis.',
    image: unsplash('1786025148428-6222e642e03f'),
    pillars: ['Full Sublimation Team Kits', 'Moisture-Wicking Performance Fabrics', 'Names, Numbers & Club Crests'],
    fabricTech: [
      { name: 'Sublimation-Ready Polyester Interlock', desc: 'Smooth 130–160 GSM polyester knit that takes edge-to-edge sublimation prints with vivid, wash-proof colour.' },
      { name: 'Moisture-Wicking Dri Mesh', desc: 'Breathable micro-mesh panels that pull sweat away from the skin and dry quickly during play.' },
      { name: 'Four-Way Stretch Spandex Blends', desc: 'Polyester spandex blends that move with the body for tennis, training, and compression layers.' },
      { name: 'Reinforced Seam Construction', desc: 'Double-stitched and flatlock seams that hold up to tackles, scrums, and repeated high-intensity use.' },
    ],
    subcategories: [
      { name: 'Football', slug: 'football', description: 'Sublimated football jerseys, shorts, and socks with player names, numbers, and club crests.', image: unsplash('1689624291789-7b402a15915a') },
      { name: 'Soccer', slug: 'soccer', description: 'Lightweight soccer match and training kits for clubs, academies, and leagues.', image: unsplash('1574629810360-7efbbe195018') },
      { name: 'Rugby', slug: 'rugby', description: 'Heavy-duty rugby jerseys and shorts with reinforced seams built for contact.', image: unsplash('1480099225005-2513c8947aec') },
      { name: 'Ice Hockey', slug: 'ice-hockey', description: 'Ice hockey jerseys with lace-up necks, fight straps, and sublimated designs.', image: unsplash('1580748141549-71748dbe0bdc') },
      { name: 'American Football', slug: 'american-football', description: 'Game jerseys and practice uniforms with stretch shoulders and tackle-twill numbers.', image: unsplash('1761258772385-66e51635cf84') },
      { name: 'Basketball', slug: 'basketball', description: 'Reversible and sublimated basketball jerseys with matching mesh shorts.', image: unsplash('1585071258252-369a36d89e30') },
      { name: 'Baseball', slug: 'baseball', description: 'Button-front baseball jerseys, pullovers, and pants for teams and leagues.', image: unsplash('1591444539769-2518e73d1090') },
      { name: 'Tennis', slug: 'tennis', description: 'Performance tennis polos, tees, skirts, and shorts in stretch fabrics.', image: unsplash('1554068865-24cecd4e34b8') },
    ],
};

// Display order across the site (menus, products page, home cards): Sports Wear first, then Street Wear
export const CATALOG = [SPORTS_WEAR, STREET_WEAR];

// Old category slugs that must be converted into Sports Wear when migrating an existing database
export const LEGACY_SPORTS_SLUGS = ['woven', 'sport-wear'];

// Placement / technique presets attached to products by `kind`
export const CUSTOMIZATION_PRESETS = {
  top: {
    placements: [
      { id: 'front_chest', label: 'Front Chest', surcharge: 2.50 },
      { id: 'back', label: 'Back', surcharge: 3.00 },
      { id: 'left_sleeve', label: 'Left Sleeve', surcharge: 1.50 },
      { id: 'right_sleeve', label: 'Right Sleeve', surcharge: 1.50 },
      { id: 'left_chest', label: 'Left Chest', surcharge: 2.00 },
      { id: 'neck_label', label: 'Neck Label', surcharge: 1.00 },
    ],
    techniques: [
      { id: 'screen_print', label: 'Screen Printing', surcharge: 1.50 },
      { id: 'puff_print', label: '3D Puff Print', surcharge: 2.50 },
      { id: 'embroidery', label: 'Embroidery', surcharge: 3.50 },
      { id: 'sublimation', label: 'Sublimation', surcharge: 2.00 },
      { id: 'dtg', label: 'DTG Print', surcharge: 2.00 },
    ],
  },
  jacket: {
    placements: [
      { id: 'left_chest', label: 'Left Chest', surcharge: 2.50 },
      { id: 'back_center', label: 'Back Center', surcharge: 4.00 },
      { id: 'right_sleeve', label: 'Right Sleeve Band', surcharge: 2.00 },
      { id: 'neck_label', label: 'Neck / Care Label', surcharge: 1.00 },
    ],
    techniques: [
      { id: 'embroidery', label: 'Embroidery', surcharge: 4.00 },
      { id: 'chenille', label: 'Chenille Patch', surcharge: 6.00 },
      { id: 'woven_patch', label: 'Woven Patch', surcharge: 3.50 },
      { id: 'leather_patch', label: 'Leather Patch', surcharge: 5.00 },
    ],
  },
  bottom: {
    placements: [
      { id: 'left_hip', label: 'Left Hip Pocket', surcharge: 1.50 },
      { id: 'back_pocket', label: 'Back Pocket', surcharge: 1.50 },
      { id: 'waistband', label: 'Waistband', surcharge: 1.00 },
    ],
    techniques: [
      { id: 'embroidery', label: 'Embroidery', surcharge: 3.00 },
      { id: 'screen_print', label: 'Screen Printing', surcharge: 1.50 },
      { id: 'heat_transfer', label: 'Heat Transfer', surcharge: 1.80 },
      { id: 'woven_label', label: 'Woven Label', surcharge: 1.20 },
    ],
  },
  jersey: {
    placements: [
      { id: 'front_chest', label: 'Front Chest', surcharge: 2.00 },
      { id: 'back_name', label: 'Back Name', surcharge: 1.50 },
      { id: 'back_number', label: 'Back Number', surcharge: 1.50 },
      { id: 'left_sleeve', label: 'Left Sleeve', surcharge: 1.00 },
      { id: 'left_chest', label: 'Club Crest', surcharge: 2.00 },
    ],
    techniques: [
      { id: 'sublimation', label: 'Full Sublimation', surcharge: 2.00 },
      { id: 'heat_transfer', label: 'Heat Transfer Vinyl', surcharge: 1.50 },
      { id: 'tackle_twill', label: 'Tackle Twill', surcharge: 3.50 },
      { id: 'embroidery', label: 'Embroidery', surcharge: 3.50 },
    ],
  },
};

// Builds tiered pricing from a sample price (bulk tiers step down from it)
function tiers(sample, low, mid, high) {
  return {
    sample: { price: sample, range: '10-20' },
    lowVolume: { price: low, range: '21-50' },
    midVolume: { price: mid, range: '51-100' },
    highVolume: { price: high, range: '101+' },
  };
}

// Sample products — one or more per subcategory
export const SEED_PRODUCTS = [
  // ── Street Wear ──────────────────────────────────────────────────────────
  {
    name: 'Oversized Drop-Shoulder Hoodie', slug: 'oversized-drop-shoulder-hoodie', sku: 'PROD-2425',
    category: 'street-wear', subcategory: 'hoodies', kind: 'top', minOrderQuantity: 20,
    description: 'Crafted from 320 GSM brushed french terry cotton, this oversized hoodie features a drop-shoulder silhouette, double-layer hood, and kangaroo pocket.',
    images: PRODUCT_IMAGES['oversized-drop-shoulder-hoodie'],
    specifications: { gsm: '320', material: '100% Ring-Spun Cotton (Brushed French Terry)', weight: '320 GSM', sizing: 'XS – 3XL (Oversized Fit)', customization: 'Screen Print, Embroidery, Puff Print, Woven Label Replacement' },
    tieredPricing: tiers(42, 32, 22, 17),
    colors: [{ name: 'Jet Black', hex: '#0A0A0A', image: PRODUCT_IMAGES['oversized-drop-shoulder-hoodie'][0] }, { name: 'Charcoal', hex: '#374151', image: PRODUCT_IMAGES['oversized-drop-shoulder-hoodie'][1] }],
  },
  {
    name: 'Heavyweight French Terry Pullover', slug: 'heavyweight-french-terry-pullover', sku: 'PROD-4500',
    category: 'street-wear', subcategory: 'hoodies', kind: 'top', minOrderQuantity: 50,
    description: 'Ultra-heavy 450 GSM organic french terry pullover with double-layer hood, internal jersey lining, and a boxy drop-shoulder fit.',
    images: PRODUCT_IMAGES['heavyweight-french-terry-pullover'],
    specifications: { gsm: '450', material: '100% GOTS-Certified Organic French Terry Cotton', weight: '450 GSM Heavyweight', sizing: 'XS – 3XL (Boxy Oversized Fit)', customization: 'High-Density Puff Print, Custom Woven Labels, 3D Embroidery' },
    tieredPricing: tiers(48, 38, 28, 21),
    colors: [{ name: 'Charcoal', hex: '#2D3136', image: PRODUCT_IMAGES['heavyweight-french-terry-pullover'][0] }, { name: 'Ecru', hex: '#F5F0E8', image: PRODUCT_IMAGES['heavyweight-french-terry-pullover'][1] }],
  },
  {
    name: 'Premium Quality T-Shirt', slug: 'premium-quality-t-shirt', sku: 'PROD-9707',
    category: 'street-wear', subcategory: 't-shirts', kind: 'top', minOrderQuantity: 10,
    description: 'Everyday essential built from 200 GSM high-density poly-cotton with a structured yet soft feel that keeps its shape wash after wash.',
    images: PRODUCT_IMAGES['premium-quality-t-shirt'],
    specifications: { gsm: '200', material: '60% Polyester / 40% Cotton', weight: '200 GSM', sizing: 'XS – 3XL', customization: 'Embroidery, Screen Printing, Puff Print, DTG' },
    tieredPricing: tiers(40, 30, 20, 15),
    colors: [{ name: 'Jet Black', hex: '#0A0A0A', image: PRODUCT_IMAGES['premium-quality-t-shirt'][0] }, { name: 'Pure White', hex: '#F8FAFC', image: PRODUCT_IMAGES['premium-quality-t-shirt'][1] }],
  },
  {
    name: 'Vintage Acid-Wash Heavyweight Tee', slug: 'vintage-acid-wash-heavyweight-street-tee', sku: 'PROD-1080',
    category: 'street-wear', subcategory: 't-shirts', kind: 'top', minOrderQuantity: 50,
    description: '240 GSM combed ring-spun cotton tee with a handcrafted vintage acid-wash finish and twin-needle stitching.',
    images: PRODUCT_IMAGES['vintage-acid-wash-heavyweight-street-tee'],
    specifications: { gsm: '240', material: '100% Combed Ring-Spun Cotton', weight: '240 GSM', sizing: 'S – XXL (Boxy Relaxed Fit)', customization: 'Screen Print, Vintage Acid Wash, Custom Printed Neck Tags' },
    tieredPricing: tiers(25, 18, 12, 8.99),
    colors: [{ name: 'Washed Black', hex: '#1C1C1C', image: PRODUCT_IMAGES['vintage-acid-wash-heavyweight-street-tee'][0] }, { name: 'Vintage Grey', hex: '#4A4A4A', image: PRODUCT_IMAGES['vintage-acid-wash-heavyweight-street-tee'][1] }],
  },
  {
    name: 'Collegiate Wool & Leather Varsity Jacket', slug: 'collegiate-wool-leather-varsity-jacket', sku: 'PROD-9010',
    category: 'street-wear', subcategory: 'jackets', kind: 'jacket', minOrderQuantity: 50,
    description: '700 GSM melton wool body paired with full-grain leather sleeves, custom chenille patches, and a heavy quilted satin lining.',
    images: PRODUCT_IMAGES['collegiate-wool-leather-varsity-jacket'],
    specifications: { gsm: '700', material: '80% Melton Wool Body / Full-Grain Leather Sleeves', weight: '700 GSM Heavyweight', sizing: 'S – 3XL', customization: 'Chenille Patches, 3D Embroidery, Custom Snap Buttons' },
    tieredPricing: tiers(90, 72, 55, 42),
    colors: [{ name: 'Black / White', hex: '#000000', image: PRODUCT_IMAGES['collegiate-wool-leather-varsity-jacket'][0] }, { name: 'Navy / Cream', hex: '#1B263B', image: PRODUCT_IMAGES['collegiate-wool-leather-varsity-jacket'][1] }],
  },
  {
    name: 'Tactical Multi-Pocket Cargo Trousers', slug: 'tactical-3d-multi-pocket-cargo-trousers', sku: 'PROD-7010',
    category: 'street-wear', subcategory: 'trousers', kind: 'bottom', minOrderQuantity: 50,
    description: 'Heavy-duty 280 GSM cotton twill cargo trousers with 3D gusset pockets, storm flaps, and adjustable ankle drawstrings.',
    images: PRODUCT_IMAGES['tactical-3d-multi-pocket-cargo-trousers'],
    specifications: { gsm: '280', material: '98% Cotton Twill / 2% Elastane', weight: '280 GSM', sizing: '28W – 40W Waist', customization: 'Custom Hardware Pullers, Embroidered Logo, Custom Woven Patches' },
    tieredPricing: tiers(50, 38, 28, 21),
    colors: [{ name: 'Tactical Khaki', hex: '#8B7E66', image: PRODUCT_IMAGES['tactical-3d-multi-pocket-cargo-trousers'][0] }, { name: 'Stealth Black', hex: '#111111', image: PRODUCT_IMAGES['tactical-3d-multi-pocket-cargo-trousers'][1] }],
  },
  {
    name: 'Heavyweight Fleece Shorts', slug: 'heavyweight-fleece-shorts', sku: 'PROD-3010',
    category: 'street-wear', subcategory: 'shorts', kind: 'bottom', minOrderQuantity: 30,
    description: '320 GSM french terry shorts with an elastic drawcord waist, deep side pockets, and a relaxed above-the-knee cut.',
    images: PRODUCT_IMAGES['heavyweight-fleece-shorts'],
    specifications: { gsm: '320', material: '100% Cotton French Terry', weight: '320 GSM', sizing: '28W – 40W Waist', customization: 'Embroidery, Puff Print, Custom Drawcord Tips' },
    tieredPricing: tiers(30, 22, 16, 12),
    colors: [{ name: 'Jet Black', hex: '#0A0A0A', image: PRODUCT_IMAGES['heavyweight-fleece-shorts'][0] }, { name: 'Heather Grey', hex: '#9CA3AF', image: PRODUCT_IMAGES['heavyweight-fleece-shorts'][1] }],
  },
  {
    name: 'Heavyweight Fleece Tracksuit', slug: 'heavyweight-fleece-tracksuit', sku: 'PROD-3510',
    category: 'street-wear', subcategory: 'tracksuits', kind: 'top', minOrderQuantity: 30,
    description: 'Matching 350 GSM fleece hoodie and tapered joggers with ribbed cuffs, kangaroo pocket, and zip side pockets.',
    images: PRODUCT_IMAGES['heavyweight-fleece-tracksuit'],
    specifications: { gsm: '350', material: '80% Cotton / 20% Polyester Fleece', weight: '350 GSM', sizing: 'XS – 3XL', customization: 'Embroidery, Puff Print, Silicone Patches' },
    tieredPricing: tiers(65, 50, 38, 29),
    colors: [{ name: 'Jet Black', hex: '#0A0A0A', image: PRODUCT_IMAGES['heavyweight-fleece-tracksuit'][0] }, { name: 'Stone', hex: '#A8A29E', image: PRODUCT_IMAGES['heavyweight-fleece-tracksuit'][1] }],
  },

  // ── Sports Wear ──────────────────────────────────────────────────────────
  {
    name: 'Sublimated Football Kit', slug: 'sublimated-football-kit', sku: 'PROD-5010',
    category: 'sports-wear', subcategory: 'football', kind: 'jersey', minOrderQuantity: 15,
    description: 'Fully sublimated football jersey and shorts set in lightweight polyester interlock, with player names, numbers, and club crest built in.',
    images: PRODUCT_IMAGES['sublimated-football-kit'],
    specifications: { gsm: '140', material: '100% Polyester Interlock', weight: '140 GSM', sizing: 'YS – 3XL (Youth & Adult)', customization: 'Full Sublimation, Player Names & Numbers, Club Crest' },
    tieredPricing: tiers(35, 26, 18, 13),
    colors: [{ name: 'Charcoal / Black', hex: '#4B5563', image: PRODUCT_IMAGES['sublimated-football-kit'][0] }, { name: 'Navy / Orange', hex: '#1E3A5F', image: PRODUCT_IMAGES['sublimated-football-kit'][1] }],
  },
  {
    name: 'Soccer Match Jersey & Shorts', slug: 'soccer-match-jersey-shorts', sku: 'PROD-5020',
    category: 'sports-wear', subcategory: 'soccer', kind: 'jersey', minOrderQuantity: 15,
    description: 'Breathable 130 GSM micro-mesh soccer jersey with matching shorts, ventilated side panels, and a quick-dry finish for match days.',
    images: PRODUCT_IMAGES['soccer-match-jersey-shorts'],
    specifications: { gsm: '130', material: '100% Polyester Micro-Mesh', weight: '130 GSM', sizing: 'YS – 3XL', customization: 'Full Sublimation, Names & Numbers, Sponsor Logos' },
    tieredPricing: tiers(32, 24, 17, 12),
    colors: [{ name: 'Royal / White', hex: '#1D4ED8', image: PRODUCT_IMAGES['soccer-match-jersey-shorts'][0] }, { name: 'Black / Grey', hex: '#111111', image: PRODUCT_IMAGES['soccer-match-jersey-shorts'][1] }],
  },
  {
    name: 'Pro Rugby Jersey', slug: 'pro-rugby-jersey', sku: 'PROD-5030',
    category: 'sports-wear', subcategory: 'rugby', kind: 'jersey', minOrderQuantity: 15,
    description: 'Heavy-duty 280 GSM rugby jersey with a tight athletic fit, reinforced double-stitched seams, and a grip-friendly body built for contact.',
    images: PRODUCT_IMAGES['pro-rugby-jersey'],
    specifications: { gsm: '280', material: '90% Polyester / 10% Spandex', weight: '280 GSM', sizing: 'S – 4XL', customization: 'Full Sublimation, Embroidered Crest, Names & Numbers' },
    tieredPricing: tiers(42, 32, 24, 18),
    colors: [{ name: 'Navy / Red', hex: '#1E2A44', image: PRODUCT_IMAGES['pro-rugby-jersey'][0] }, { name: 'Black / White', hex: '#000000', image: PRODUCT_IMAGES['pro-rugby-jersey'][1] }],
  },
  {
    name: 'Ice Hockey Game Jersey', slug: 'ice-hockey-game-jersey', sku: 'PROD-5040',
    category: 'sports-wear', subcategory: 'ice-hockey', kind: 'jersey', minOrderQuantity: 15,
    description: '220 GSM air-knit hockey jersey with a lace-up neck, fight strap, and roomy cut that fits over pads.',
    images: PRODUCT_IMAGES['ice-hockey-game-jersey'],
    specifications: { gsm: '220', material: '100% Polyester Air-Knit', weight: '220 GSM', sizing: 'YS – 3XL (Over-Pad Fit)', customization: 'Full Sublimation, Tackle Twill Numbers, Shoulder Patches' },
    tieredPricing: tiers(48, 36, 27, 20),
    colors: [{ name: 'Black / White', hex: '#000000', image: PRODUCT_IMAGES['ice-hockey-game-jersey'][0] }, { name: 'Red / White', hex: '#B91C1C', image: PRODUCT_IMAGES['ice-hockey-game-jersey'][1] }],
  },
  {
    name: 'American Football Game Jersey', slug: 'american-football-game-jersey', sku: 'PROD-5050',
    category: 'sports-wear', subcategory: 'american-football', kind: 'jersey', minOrderQuantity: 15,
    description: '180 GSM game jersey with stretch shoulder panels, mesh body, and tackle-twill numbers built to sit over shoulder pads.',
    images: PRODUCT_IMAGES['american-football-game-jersey'],
    specifications: { gsm: '180', material: '100% Polyester Pro-Mesh with Spandex Shoulders', weight: '180 GSM', sizing: 'S – 4XL', customization: 'Tackle Twill, Sublimation, Names & Numbers' },
    tieredPricing: tiers(45, 34, 25, 19),
    colors: [{ name: 'Navy / Orange', hex: '#1E3A5F', image: PRODUCT_IMAGES['american-football-game-jersey'][0] }, { name: 'Black / Grey', hex: '#111111', image: PRODUCT_IMAGES['american-football-game-jersey'][1] }],
  },
  {
    name: 'Basketball Uniform Set', slug: 'basketball-uniform-set', sku: 'PROD-5060',
    category: 'sports-wear', subcategory: 'basketball', kind: 'jersey', minOrderQuantity: 15,
    description: 'Sleeveless 150 GSM dri-mesh basketball jersey with matching shorts, wide armholes, and a sublimated design.',
    images: PRODUCT_IMAGES['basketball-uniform-set'],
    specifications: { gsm: '150', material: '100% Polyester Dri-Mesh', weight: '150 GSM', sizing: 'YS – 4XL', customization: 'Full Sublimation, Reversible Option, Names & Numbers' },
    tieredPricing: tiers(34, 25, 18, 13),
    colors: [{ name: 'Silver / Black', hex: '#C0C4C8', image: PRODUCT_IMAGES['basketball-uniform-set'][0] }, { name: 'Black / Red', hex: '#111111', image: PRODUCT_IMAGES['basketball-uniform-set'][1] }],
  },
  {
    name: 'Button-Front Baseball Jersey', slug: 'button-front-baseball-jersey', sku: 'PROD-5070',
    category: 'sports-wear', subcategory: 'baseball', kind: 'jersey', minOrderQuantity: 15,
    description: '180 GSM pro-mesh baseball jersey with a full button front, contrast piping, and tackle-twill chest lettering.',
    images: PRODUCT_IMAGES['button-front-baseball-jersey'],
    specifications: { gsm: '180', material: '100% Polyester Pro-Mesh', weight: '180 GSM', sizing: 'YS – 3XL', customization: 'Tackle Twill Lettering, Sublimation, Embroidery' },
    tieredPricing: tiers(38, 28, 20, 15),
    colors: [{ name: 'White / Black', hex: '#F8FAFC', image: PRODUCT_IMAGES['button-front-baseball-jersey'][0] }, { name: 'Grey / Navy', hex: '#6B7280', image: PRODUCT_IMAGES['button-front-baseball-jersey'][1] }],
  },
  {
    name: 'Tennis Performance Polo', slug: 'tennis-performance-polo', sku: 'PROD-5080',
    category: 'sports-wear', subcategory: 'tennis', kind: 'top', minOrderQuantity: 20,
    description: '160 GSM poly-spandex piqué polo with four-way stretch, UV protection, and a moisture-wicking finish for court play.',
    images: PRODUCT_IMAGES['tennis-performance-polo'],
    specifications: { gsm: '160', material: '88% Polyester / 12% Spandex Piqué', weight: '160 GSM', sizing: 'XS – 3XL', customization: 'Embroidery, Silicone Heat Transfer, Sublimation' },
    tieredPricing: tiers(30, 22, 16, 12),
    colors: [{ name: 'Pure White', hex: '#F8FAFC', image: PRODUCT_IMAGES['tennis-performance-polo'][0] }, { name: 'Jet Black', hex: '#0A0A0A', image: PRODUCT_IMAGES['tennis-performance-polo'][1] }],
  },
];
