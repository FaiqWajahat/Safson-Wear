import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ServicesHero from '@/components/services/ServicesHero';
import Stats from '@/components/home/Stats';

const ServicesOverview = dynamic(() => import('@/components/services/ServicesOverview'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});
const SourcingProcess = dynamic(() => import('@/components/services/SourcingProcess'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});
const FAQ = dynamic(() => import('@/components/home/FAQ'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});
const ClosingCTA = dynamic(() => import('@/components/home/ClosingCTA'), {
  loading: () => <div className="min-h-[300px] bg-white" />,
});

export const metadata = {
  title: 'B2B Sourcing & Custom Manufacturing Services | Fast Apparel',
  description:
    "Explore Fast Apparel's custom manufacturing services — from raw fabric sourcing, pattern CAD design, and prototyping to printing, embroidery, and global door-to-door delivery.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <Stats />
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><ServicesOverview /></Suspense>
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><SourcingProcess /></Suspense>
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><FAQ /></Suspense>
      <Suspense fallback={<div className="min-h-[300px] bg-white" />}><ClosingCTA /></Suspense>
    </>
  );
}
