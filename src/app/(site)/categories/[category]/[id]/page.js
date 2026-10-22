import React from 'react';
import ProductDetailView from '@/components/products/ProductDetailView';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `${id} - Product Detail | Factory Flow`,
    description: 'Custom B2B apparel manufacturing product specifications and tier pricing options.',
  };
}

export default async function CategoryProductPage({ params }) {
  const { category, id } = await params;

  let product = null;

  try {
    await connectDB();
    
    // Try finding product by SKU or slug or ObjectId
    const foundProduct = await Product.findOne({
      $or: [
        { sku: id },
        { slug: id },
        { name: new RegExp(id.replace(/-/g, ' '), 'i') }
      ]
    })
    .populate('category')
    .populate('subcategory')
    .lean();

    if (foundProduct) {
      product = JSON.parse(JSON.stringify(foundProduct));
      product.categoryName = foundProduct.category?.name || 'Hoodies';
      product.categorySlug = foundProduct.category?.slug || category;
    }
  } catch (err) {
    console.error('Failed to fetch category product details:', err);
  }

  return <ProductDetailView initialProduct={product} />;
}
