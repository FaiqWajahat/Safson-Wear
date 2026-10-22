import React, { Suspense } from 'react';
import ProductsClient from '@/components/products/ProductsClient';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export const metadata = {
  title: 'Products | Safson Wear — Custom Apparel Manufacturer',
  description:
    "Explore Safson Wear's catalog of custom street wear and sports wear. Request custom samples and bulk B2B quotes.",
};

// Revalidate page every 5 minutes (ISR) so product changes show without a full redeploy
export const revalidate = 300;

async function getProductsData() {
  try {
    await connectDB();
    const [categories, products] = await Promise.all([
      Category.find().populate('parentCategory', 'name slug').sort({ sortOrder: 1, createdAt: 1 }).lean(),
      Product.find({ status: 'active' })
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .sort({ createdAt: -1 })
        .lean(),
    ]);
    // Serialize: convert ObjectIds and Dates to plain strings for client props
    return {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
    };
  } catch (err) {
    console.error('SSR ProductsPage data fetch failed:', err);
    return { categories: [], products: [] };
  }
}

export default async function ProductsPage() {
  const { categories, products } = await getProductsData();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-neutral-200 border-t-black animate-spin" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono">
              Loading Products...
            </span>
          </div>
        </div>
      }
    >
      <ProductsClient initialCategories={categories} initialProducts={products} />
    </Suspense>
  );
}
