import React from 'react';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import FeaturedProject from '@/components/portfolio/CaseStudy';
import TestimonialsStrip from '@/components/portfolio/TestimonialsStrip';
import Stats from '@/components/home/Stats';
import BrandTicker from '@/components/home/BrandTicker';
import ClosingCTA from '@/components/home/ClosingCTA';

export const metadata = {
  title: 'Portfolio | Safson Wear — Custom Sportswear Manufacturers',
  description:
    "Browse Safson Wear's portfolio of custom streetwear & sports wear collections.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* Hero — headline + wide image */}
      <PortfolioHero />

      {/* Counter strip — black */}
      <Stats />

      {/* Filterable gallery — white */}
      <PortfolioGrid />

      {/* Featured case study — light grey */}
      <FeaturedProject />

      {/* Client logos — white */}
      <BrandTicker />

      {/* Testimonials — black */}
      <TestimonialsStrip />

      {/* Final CTA */}
      <ClosingCTA />
    </>
  );
}
