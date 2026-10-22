'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/home/SectionHeading';

const STEP_DURATION = 5000;

const STEPS = [
  {
    no: '01',
    phase: 'Design & R&D',
    title: 'Tech packs & patterns',
    desc: 'CAD pattern creation, CLO3D garment simulation, and size spec sheets from XS to 3XL.',
    image: '/step-design.png',
  },
  {
    no: '02',
    phase: 'Fabric sourcing',
    title: 'Yarn sourcing & lab dips',
    desc: 'Combed cotton yarns, 200–450 GSM fabrics, and Pantone lab dip colour matching.',
    image: '/step-fabric.png',
  },
  {
    no: '03',
    phase: 'Cutting',
    title: 'Precision panel cutting',
    desc: 'Computerised cutting tables and zero-variance dimension control across full runs.',
    image: '/step-cutting.png',
  },
  {
    no: '04',
    phase: 'Embellishment',
    title: 'Printing & embroidery',
    desc: 'Tajima 3D puff embroidery, high-density screen printing, and garment washes.',
    image: '/step-embellishment.png',
  },
  {
    no: '05',
    phase: 'Assembly',
    title: 'Stitching & seam testing',
    desc: 'Flatlock seams, reinforced twin-needle joins, and seam pull-strength validation.',
    image: '/step-assembly.png',
  },
  {
    no: '06',
    phase: 'QC & dispatch',
    title: 'Inspection & global freight',
    desc: '100% manual QC, barcode polybagging, and worldwide door-to-door delivery.',
    image: '/step-qc-dispatch.png',
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = STEPS[active];

  // Auto-advance; restarts whenever the active step changes
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_DURATION);
    return () => clearTimeout(t);
  }, [active, paused]);

  return (
    <section className="py-20 sm:py-28 bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          dark
          eyebrow="How it works"
          title="From sketch to shipment"
          muted="in six steps."
          href="/production"
          linkLabel="Our process"
        />

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* LEFT — step list */}
          <div className="lg:col-span-5 flex flex-col">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  key={step.no}
                  onClick={() => setActive(i)}
                  className="group relative text-left py-5 border-b border-white/10 first:border-t cursor-pointer focus:outline-none"
                >
                  {/* Progress line */}
                  {isActive && (
                    <motion.span
                      key={`${active}-${paused}`}
                      initial={{ scaleX: paused ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused ? 0 : STEP_DURATION / 1000, ease: 'linear' }}
                      className="absolute -bottom-px left-0 right-0 h-px bg-white origin-left"
                    />
                  )}
                  <div className="flex items-center gap-5">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors duration-300 ${
                      isActive ? 'bg-white text-black' : 'border border-white/20 text-white/50 group-hover:border-white/50'
                    }`}>
                      {step.no}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-xs uppercase tracking-[0.18em] transition-colors ${isActive ? 'text-white/55' : 'text-white/30'}`}>{step.phase}</p>
                      <h3 className={`mt-0.5 text-base sm:text-lg font-semibold transition-colors ${isActive ? 'text-white' : 'text-white/45 group-hover:text-white/80'}`}>
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="block overflow-hidden pl-15 text-sm text-white/60 leading-relaxed"
                      >
                        <span className="block pt-2">{step.desc}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* RIGHT — step image */}
          <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] rounded-3xl overflow-hidden bg-neutral-900">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image src={current.image} alt={current.title} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <span className="text-xs font-semibold bg-white text-black px-3 py-1.5 rounded-full">
                Step {current.no} — {current.phase}
              </span>
              <span className="text-xs font-semibold text-white/70 tabular-nums">
                {current.no} / {String(STEPS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
