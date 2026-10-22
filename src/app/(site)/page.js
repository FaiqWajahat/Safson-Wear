import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import Hero from '@/components/home/Hero';
import BrandTicker from '@/components/home/BrandTicker';
import ClosingCTA from '@/components/home/ClosingCTA';

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

export default function HomePage() {
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
        <ExclusiveProductsCarousel />
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
