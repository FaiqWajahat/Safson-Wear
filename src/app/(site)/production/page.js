import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ProductionHero from '@/components/production/ProductionHero';

const Capabilities = dynamic(() => import('@/components/production/Capabilities'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});
const ProductionTimeline = dynamic(() => import('@/components/production/ProductionTimeline'), {
  loading: () => <div className="min-h-[300px] bg-black" />,
});
const MaterialsLab = dynamic(() => import('@/components/production/MaterialsLab'), {
  loading: () => <div className="min-h-[300px] bg-neutral-50" />,
});
const FactoryGallery = dynamic(() => import('@/components/production/FactoryGallery'), {
  loading: () => <div className="min-h-[300px] bg-black" />,
});
const QualityControl = dynamic(() => import('@/components/about/QualityControl'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});
const FAQ = dynamic(() => import('@/components/home/FAQ'), {
  loading: () => <div className="min-h-[300px] bg-neutral-50" />,
});
const ClosingCTA = dynamic(() => import('@/components/home/ClosingCTA'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});

export const metadata = {
  title: 'Production | Fast Apparel — Custom Sportswear Manufacturers',
  description:
    "Explore Fast Apparel's vertically integrated production capabilities — from CAD cutting, flatlock stitching, and embroidery to packaging and global logistics.",
};

export default function ProductionPage() {
  return (
    <>
      {/* Hero — copy, floor image, 6-step strip */}
      <ProductionHero />

      {/* Production systems — selectable list + image */}
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><Capabilities /></Suspense>

      {/* Day-by-day process — dark */}
      <Suspense fallback={<div className="min-h-[300px] bg-black" />}><ProductionTimeline /></Suspense>

      {/* Fabric materials */}
      <Suspense fallback={<div className="min-h-[300px] bg-neutral-50" />}><MaterialsLab /></Suspense>

      {/* Factory lookbook — dark */}
      <Suspense fallback={<div className="min-h-[300px] bg-black" />}><FactoryGallery /></Suspense>

      {/* Quality control */}
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><QualityControl /></Suspense>

      {/* FAQ + final CTA */}
      <Suspense fallback={<div className="min-h-[300px] bg-neutral-50" />}><FAQ /></Suspense>
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><ClosingCTA /></Suspense>
    </>
  );
}
