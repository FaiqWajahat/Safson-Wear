'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '@/components/home/SectionHeading';

const CAPABILITIES = [
  {
    id: 'embroidery',
    no: '01',
    category: 'Stitching & Cresting',
    title: 'Tajima 3D Embroidery',
    desc: 'Multi-head Tajima machinery — 3D foam puff, metallic threads, high-density satin stitch, and custom woven patches.',
    specs: ['3D Foam Puff', 'Metallic Threads', 'Woven Patches'],
    image: '/capability-embroidery-v2.png',
  },
  {
    id: 'printing',
    no: '02',
    category: 'Embellishment',
    title: 'Screen & Puff Printing',
    desc: 'Automatic carousel presses with specialty inks — high-density puff, soft-hand plastisol, and vintage washes.',
    specs: ['HD Puff Print', 'Plastisol Ink', 'Acid Wash'],
    image: '/capability-printing-v2.png',
  },
  {
    id: 'patterning',
    no: '03',
    category: 'Pre-Production R&D',
    title: 'CLO3D Patterning',
    desc: 'In-house digital pattern masters with CLO3D simulation, CAD spec sheets, and XS–3XL size grading.',
    specs: ['3D Prototyping', 'CAD Specs', 'Size Grading'],
    image: '/capability-patterning.png',
  },
  {
    id: 'branding',
    no: '04',
    category: 'Private Label',
    title: 'Labels & Packaging',
    desc: 'Complete private-label finishing — woven neck labels, custom zip pulls, branded hangtags, and FBA-ready polybags.',
    specs: ['Woven Labels', 'Hangtags', 'FBA Prep'],
    image: '/capability-packaging.png',
  },
];

export default function CapabilitiesShowcase() {
  const [active, setActive] = useState(CAPABILITIES[0].id);

  return (
    <section className="py-20 sm:py-28 bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          dark
          eyebrow="Capabilities"
          title="Everything in-house,"
          muted="under one roof."
          description="Every embellishment, pattern, and finishing step is handled in our own facility — no subcontracting."
          href="/services"
          linkLabel="All services"
        />

        <div className="flex flex-col lg:flex-row gap-3 lg:h-[520px]">
          {CAPABILITIES.map((cap) => {
            const isActive = cap.id === active;
            return (
              <div
                key={cap.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={() => setActive(cap.id)}
                onMouseEnter={() => setActive(cap.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(cap.id); } }}
                className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive ? 'h-[440px] lg:h-auto lg:flex-[3.2]' : 'h-[84px] lg:h-auto lg:flex-1'
                }`}
              >
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={`object-cover transition-all duration-700 ${isActive ? 'scale-100' : 'scale-110'}`}
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-linear-to-t from-black/90 via-black/30 to-transparent' : 'bg-black/65'}`} />

                {/* Collapsed state */}
                <div className={`absolute inset-0 p-6 flex lg:flex-col items-center lg:items-start justify-between transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <span className="text-sm font-semibold text-white/60">{cap.no}</span>
                  <h3 className="text-base sm:text-lg font-semibold lg:[writing-mode:vertical-rl] lg:rotate-180 whitespace-nowrap">{cap.title}</h3>
                </div>

                {/* Expanded state */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                          {cap.no} — {cap.category}
                        </span>
                        <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{cap.title}</h3>
                        <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-md">{cap.desc}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {cap.specs.map((s) => (
                            <span key={s} className="text-xs text-white/90 border border-white/25 rounded-full px-3 py-1">{s}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
