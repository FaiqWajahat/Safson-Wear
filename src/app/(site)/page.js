import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import Hero from '@/components/home/Hero';
import BrandTicker from '@/components/home/BrandTicker';
import ClosingCTA from '@/components/home/ClosingCTA';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { FEATURED_PRODUCTS } from '@/data/featuredProducts';

// Re-render at most every 5 minutes; admin product edits also revalidate "/" immediately
export const revalidate = 300;

// Featured carousel uses each product's current main image from the DB, so it matches the detail page
async function getFeaturedProducts() {
  try {
    await connectDB();
    const docs = await Product.find(
      { slug: { $in: FEATURED_PRODUCTS.map((p) => p.id) }, status: 'active' },
      'slug images'
    ).lean();
    const imageBySlug = Object.fromEntries(docs.map((d) => [d.slug, d.images?.[0]]));
    return FEATURED_PRODUCTS
      .filter((p) => imageBySlug[p.id] !== undefined || docs.length === 0)
      .map((p) => ({ ...p, image: imageBySlug[p.id] || p.image }));
  } catch (err) {
    console.error('Featured products fallback:', err.message);
    return FEATURED_PRODUCTS;
  }
}

const Categories = dynamic(() => import('@/components/home/Categories'), {
  loading: () => <div className="min-h-[600px] bg-white" />,
});
const CapabilitiesShowcase = dynamic(() => import('@/components/home/CapabilitiesShowcase'), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});
const ExclusiveProductsCarousel = dynamic(() => import('@/components/home/ExclusiveProductsCarousel'), {
  loading: () => <div className="min-h-[600px] bg-white" />,
});
const StatsBand = dynamic(() => import('@/components/home/StatsBand'), {
  loading: () => <div className="min-h-[600px] bg-neutral-50" />,
});
const Process = dynamic(() => import('@/components/home/Process'), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});
const GlobalPresence = dynamic(() => import('@/components/home/GlobalPresence'), {
  loading: () => <div className="min-h-[600px] bg-white" />,
});
const HomeFAQ = dynamic(() => import('@/components/home/HomeFAQ'), {
  loading: () => <div className="min-h-[500px] bg-neutral-50" />,
});

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="bg-black">
      {/* Video hero */}
      <Hero />

      {/* Client logos */}
      <BrandTicker />

      {/* Manufacturing lines — Street Wear & Sports Wear */}
      <Suspense fallback={<div className="min-h-[600px] bg-white" />}>
        <Categories />
      </Suspense>

      {/* In-house capabilities */}
      <Suspense fallback={<div className="min-h-[600px] bg-black" />}>
        <CapabilitiesShowcase />
      </Suspense>

      {/* Featured products carousel */}
      <Suspense fallback={<div className="min-h-[600px] bg-white" />}>
        <ExclusiveProductsCarousel products={featuredProducts} />
      </Suspense>

      {/* Why us — factory image + count-up stats */}
      <Suspense fallback={<div className="min-h-[600px] bg-neutral-50" />}>
        <StatsBand />
      </Suspense>

      {/* 6-step production process */}
      <Suspense fallback={<div className="min-h-[600px] bg-black" />}>
        <Process />
      </Suspense>

      {/* Global offices & facilities */}
      <Suspense fallback={<div className="min-h-[600px] bg-white" />}>
        <GlobalPresence />
      </Suspense>

      {/* B2B FAQ */}
      <Suspense fallback={<div className="min-h-[500px] bg-neutral-50" />}>
        <HomeFAQ />
      </Suspense>

      {/* Final CTA */}
      <ClosingCTA />
    </div>
  );
}
