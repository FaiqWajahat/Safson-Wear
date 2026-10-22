'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const EASE = [0.16, 1, 0.3, 1];

const CAPABILITIES = [
  { label: 'Pattern & cutting', title: 'Computerized CAD fabric cutting', image: '/step-cutting.png', description: 'Our automated laser-guided CAD cutting tables operate at sub-millimeter precision, eliminating human variance from fabric panel production.', specs: ['Zero-variance pattern accuracy', 'Automated marker laying system', 'Up to 120 plies simultaneous cut', 'German-engineered cutter heads'] },
  { label: 'Stitching', title: 'Industrial stitching & assembly', image: '/step-assembly.png', description: 'Our stitching halls house high-speed Yamato 4-needle flatlock machines, Juki overlock sewing units, Brother lockstitch stations, and Kansai Special multi-needle machines for low-profile, durable seam joins.', specs: ['Yamato 4-needle flatlock seamers', 'Juki 5-thread industrial overlockers', 'Brother computerized lockstitch units', 'Kansai Special elastic waist machines'] },
  { label: 'Dye sublimation', title: 'Roll-to-roll sublimation heat press', image: '/step-embellishment.png', description: 'Italian calendar heat-press systems lock vivid colors permanently into polyester fibers at precise curing temperatures for maximum wash-fastness.', specs: ['200°C precision curing temperature', 'Italian Kian sublimation ink certified', 'D65 standard lightbox shade match', 'Anti-bleed print boundary control'] },
  { label: 'Tajima embroidery', title: 'Multi-head Tajima embroidery systems', image: '/capability-embroidery-v2.png', description: 'Japanese Tajima machines deliver ultra-dense satin stitch embroidery for team logos, badge crests, and custom branding details.', specs: ['1,200 stitches per minute speed', 'Up to 15 color thread capacity', 'High-density 3D puff available', 'DST digital file conversion'] },
  { label: 'Heat transfer', title: 'Silicone 3D heat transfer application', image: '/capability-printing-v2.png', description: 'Custom molded silicone heat transfers for raised 3D branding elements, player names, numbers, and technical surface textures on performance fabrics.', specs: ['300+ micron raised silicone profile', 'Wash-proof bond at 160°C press', 'Full Pantone color matching', 'Custom mold tooling in-house'] },
  { label: 'Packaging & QA', title: 'Final inspection & export packaging', image: '/capability-packaging.png', description: 'Every finished garment passes through industrial metal detectors, thread inspections, barcode verification, and anti-humidity polybag sealing.', specs: ['100% metal detector pass rate', 'SMETA compliant packaging process', 'Barcode SKU mapping verified', 'Anti-humidity silica insert packs'] },
];

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const current = CAPABILITIES[active];

  return (
    <section className="py-20 sm:py-28 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Manufacturing capabilities"
          title="Production systems"
          muted="built in-house."
          description="Six specialised departments under one roof — click any system to see what it does and how it performs."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT — selectable list */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            {CAPABILITIES.map((cap, idx) => {
              const isActive = idx === active;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`rounded-2xl border transition-colors duration-300 ${isActive ? 'bg-black text-white border-black' : 'bg-neutral-50 border-black/10 hover:border-black/25'}`}
                >
                  <button
                    onClick={() => setActive(idx)}
                    aria-expanded={isActive}
                    className="w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left cursor-pointer"
                  >
                    <span className={`shrink-0 w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center ${isActive ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-xs font-semibold uppercase tracking-[0.16em] ${isActive ? 'text-white/55' : 'text-black/45'}`}>{cap.label}</span>
                      <span className="block mt-0.5 text-base sm:text-lg font-semibold tracking-tight">{cap.title}</span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6">
                          {/* Mobile image */}
                          <div className="lg:hidden relative aspect-[16/10] rounded-xl overflow-hidden mb-5">
                            <Image src={cap.image} alt={cap.title} fill sizes="100vw" className="object-cover" />
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed">{cap.description}</p>
                          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {cap.specs.map((spec) => (
                              <li key={spec} className="flex items-start gap-2 text-sm text-white/85">
                                <Check className="w-4 h-4 mt-0.5 shrink-0" /> {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT — sticky image (desktop) */}
          <div className="hidden lg:block lg:col-span-6 sticky top-28">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={current.image} alt={current.title} fill sizes="50vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <span className="text-xs font-semibold bg-white text-black px-3 py-1.5 rounded-full">{current.label}</span>
                <span className="text-xs font-semibold tabular-nums">
                  {String(active + 1).padStart(2, '0')} / {String(CAPABILITIES.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
