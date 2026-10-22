import React from 'react';
import ProductDetailView from '@/components/products/ProductDetailView';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `${id} - Custom Apparel Specification | Factory Flow`,
    description: 'B2B apparel specifications, tiered volume pricing, custom logo canvas preview, and ordering.',
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  let product = null;

  try {
    await connectDB();
    
    // Find product by SKU, slug, or ObjectId
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
      product.categoryName = foundProduct.category?.name || 'Street Wear';
      product.categorySlug = foundProduct.category?.slug || 'street-wear';
    }
  } catch (err) {
    console.error('Failed to fetch product details:', err);
  }

  return <ProductDetailView initialProduct={product} />;
}
