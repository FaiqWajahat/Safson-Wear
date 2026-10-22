import { CATALOG, SEED_PRODUCTS } from './catalog.mjs';

// Static fallback used by the products page when the database is empty or unreachable
export const CATEGORIES = Object.fromEntries(
  CATALOG.map((cat) => [
    cat.slug,
    {
      title: cat.name,
      description: cat.description,
      heroImage: cat.image,
      subcategories: Object.fromEntries(
        cat.subcategories.map((sub) => [sub.slug, { title: sub.name, description: sub.description, image: sub.image, heroBgImage: sub.image }])
      ),
      fabricTech: cat.fabricTech,
    },
  ])
);

export const SIZING_GUIDES = {
  tops: [
    { size: 'XS', chest: '34-36"', length: '27"', sleeve: '32"' },
    { size: 'S', chest: '36-38"', length: '28"', sleeve: '33"' },
    { size: 'M', chest: '38-40"', length: '29"', sleeve: '34"' },
    { size: 'L', chest: '40-42"', length: '30"', sleeve: '35"' },
    { size: 'XL', chest: '42-44"', length: '31"', sleeve: '36"' },
    { size: 'XXL', chest: '44-46"', length: '32"', sleeve: '37"' },
    { size: '3XL', chest: '46-48"', length: '33"', sleeve: '38"' }
  ],
  bottoms: [
    { size: 'XS', waist: '26-28"', hip: '32-34"', inseam: '29"' },
    { size: 'S', waist: '28-30"', hip: '34-36"', inseam: '30"' },
    { size: 'M', waist: '30-32"', hip: '36-38"', inseam: '31"' },
    { size: 'L', waist: '32-34"', hip: '38-40"', inseam: '32"' },
    { size: 'XL', waist: '34-36"', hip: '40-42"', inseam: '33"' },
    { size: 'XXL', waist: '36-38"', hip: '42-44"', inseam: '34"' },
    { size: '3XL', waist: '38-40"', hip: '44-46"', inseam: '35"' }
  ]
};

const categoryName = (slug) => CATALOG.find((c) => c.slug === slug)?.name || 'Street Wear';

export const PRODUCTS = SEED_PRODUCTS.map((p) => ({
  id: p.slug,
  sku: p.sku,
  name: p.name,
  category: p.category,
  subcategory: p.subcategory,
  categoryName: categoryName(p.category),
  categorySlug: p.category,
  priceRange: 'OEM Bulk Quote',
  image: p.images[0],
  images: p.images,
  description: p.description,
  specifications: p.specifications,
  tieredPricing: p.tieredPricing,
  colors: p.colors,
  minOrderQuantity: p.minOrderQuantity,
  specs: [
    `Material: ${p.specifications.material}`,
    `Weight: ${p.specifications.weight}`,
    `Sizing: ${p.specifications.sizing}`,
    `Customization: ${p.specifications.customization}`,
  ],
  mfgDetails: {
    moq: `${p.minOrderQuantity} Units`,
    leadTime: '14–22 Business Days',
    customization: p.specifications.customization,
  },
  performanceTech: p.description,
  sizingType: p.kind === 'bottom' ? 'bottoms' : 'tops',
}));
