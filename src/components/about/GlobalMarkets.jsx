'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Ship } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const EASE = [0.16, 1, 0.3, 1];

const REGIONS = [
  {
    region: 'North America',
    markets: ['United States', 'Canada', 'Mexico'],
    shippingMethod: 'Air cargo (5–7 days)',
    volume: 40,
    sea: false,
  },
  {
    region: 'European Union',
    markets: ['Germany', 'Netherlands', 'France', 'Spain'],
    shippingMethod: 'Sea + air freight (7–14 days)',
    volume: 25,
    sea: true,
  },
  {
    region: 'Middle East & GCC',
    markets: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait'],
    shippingMethod: 'Air cargo (3–5 days)',
    volume: 20,
    sea: false,
  },
  {
    region: 'Asia Pacific',
    markets: ['Australia', 'New Zealand', 'Singapore'],
    shippingMethod: 'Air + sea freight (10–18 days)',
    volume: 15,
    sea: true,
  },
];

export default function GlobalMarkets() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50 text-black font-sans border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Export & distribution"
          title="Global export"
          muted="markets."
          description="All export shipments are fully insured with documented country-of-origin certificates and customs pre-clearance packages."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REGIONS.map((region, idx) => {
            const Icon = region.sea ? Ship : Plane;
            return (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE }}
                className="rounded-3xl bg-white border border-black/10 p-7 sm:p-8 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{region.region}</h3>
                    <p className="mt-1 text-sm text-black/50">Share of export volume</p>
                  </div>
                  <p className="text-4xl sm:text-5xl font-bold tracking-tight tabular-nums">{region.volume}%</p>
                </div>

                {/* Animated volume bar */}
                <div className="mt-6 h-2 rounded-full bg-black/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${region.volume}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + idx * 0.1, ease: EASE }}
                    className="h-full rounded-full bg-black"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {region.markets.map((m) => (
                    <span key={m} className="text-xs font-medium border border-black/15 rounded-full px-3 py-1.5">{m}</span>
                  ))}
                </div>

                <p className="mt-6 pt-5 border-t border-black/10 flex items-center gap-2 text-sm font-semibold">
                  <Icon className="w-4 h-4 text-black/50" /> {region.shippingMethod}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
