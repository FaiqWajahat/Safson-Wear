import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import AboutHero from '@/components/about/AboutHero';

const History = dynamic(() => import('@/components/about/History'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});
const Pillars = dynamic(() => import('@/components/about/Pillars'), {
  loading: () => <div className="min-h-[300px] bg-neutral-50" />,
});
const Machinery = dynamic(() => import('@/components/about/Machinery'), {
  loading: () => <div className="min-h-[300px] bg-black" />,
});
const Leadership = dynamic(() => import('@/components/about/Leadership'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});
const GlobalMarkets = dynamic(() => import('@/components/about/GlobalMarkets'), {
  loading: () => <div className="min-h-[300px] bg-neutral-50" />,
});
const Sustainability = dynamic(() => import('@/components/about/Sustainability'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});
const GlobalPresence = dynamic(() => import('@/components/home/GlobalPresence'), {
  loading: () => <div className="min-h-[400px] bg-white" />,
});
const FAQ = dynamic(() => import('@/components/home/FAQ'), {
  loading: () => <div className="min-h-[300px] bg-neutral-50" />,
});
const ClosingCTA = dynamic(() => import('@/components/home/ClosingCTA'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});

export const metadata = {
  title: "About Us | Safson Wear — Custom Sportswear Manufacturers",
  description: "Explore the manufacturing history, quality control audits, leadership, and sustainability commitments of Safson Wear."
};

export default function AboutPage() {
  return (
    <>
      {/* Hero — copy, stats & image collage */}
      <AboutHero />

      {/* Our story — timeline */}
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><History /></Suspense>

      {/* What drives us — 3 principles */}
      <Suspense fallback={<div className="min-h-[300px] bg-neutral-50" />}><Pillars /></Suspense>

      {/* Machinery — dark */}
      <Suspense fallback={<div className="min-h-[300px] bg-black" />}><Machinery /></Suspense>

      {/* Leadership team */}
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><Leadership /></Suspense>

      {/* Export markets */}
      <Suspense fallback={<div className="min-h-[300px] bg-neutral-50" />}><GlobalMarkets /></Suspense>

      {/* Sustainability */}
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><Sustainability /></Suspense>

      {/* Offices */}
      <div className="border-t border-black/10">
        <Suspense fallback={<div className="min-h-[400px] bg-white" />}><GlobalPresence /></Suspense>
      </div>

      {/* FAQ + final CTA */}
      <Suspense fallback={<div className="min-h-[300px] bg-neutral-50" />}><FAQ /></Suspense>
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><ClosingCTA /></Suspense>
    </>
  );
}
