'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, ShieldCheck, Layers } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const PILLARS = [
  {
    id: '01',
    icon: Crosshair,
    title: 'Technical precision',
    subtitle: 'Automated workflows',
    description: 'Integrating CLO3D drafting simulation software and computerized laser cutters to guarantee absolute pattern repeatability across bulk production runs.',
    spec: 'CAD pattern sizing variance: ±0.1mm',
  },
  {
    id: '02',
    icon: ShieldCheck,
    title: 'Compliance & ethics',
    subtitle: 'Annual audits',
    description: 'Maintaining strict certifications including WRAP Platinum level standards and SMETA 4-Pillar logs, assuring fair compensation, safety, and workspace care.',
    spec: 'Facility compliance audit: 100% verified',
  },
  {
    id: '03',
    icon: Layers,
    title: 'Vertical integration',
    subtitle: 'Single-site control',
    description: 'Managing fabric milling, computerized dye sublimation printing, satin embroidery details, assembly stitching, and cargo logistics under one Sialkot command structure.',
    spec: 'Turnaround control: 72hr sampling',
  },
];

export default function Pillars() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50 text-black font-sans border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What drives us"
          title="Three principles"
          muted="behind every order."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-3xl bg-white border border-black/10 p-7 sm:p-8 flex flex-col hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                  <pillar.icon className="w-5 h-5" />
                </span>
                <span className="text-sm font-semibold text-black/30 tabular-nums">{pillar.id}</span>
              </div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">{pillar.subtitle}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{pillar.title}</h3>
              <p className="mt-3 text-sm text-black/60 leading-relaxed flex-1">{pillar.description}</p>
              <p className="mt-6 pt-5 border-t border-black/10 text-sm font-semibold">{pillar.spec}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
