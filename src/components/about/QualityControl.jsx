'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const QA_STEPS = [
  {
    id: '01',
    title: 'Incoming fabric density',
    tab: 'Material audit',
    description: 'Every roll of raw fabric is audited in our lab before cutting. We test vertical/horizontal elongation, color shade matching under D65 lighting, and pre-wash shrinkage indices.',
    checklist: ['GSM weight validation', 'Wash shrinkage test', 'D65 shade match'],
    standard: 'ISO 9001:2015',
  },
  {
    id: '02',
    title: 'Tensile resistance check',
    tab: 'Stitching audit',
    description: 'Quality inspectors audit sewing rows in real-time. We check stitch counts per inch, seam elasticity under tensile loads, and ensure Yamato flatlock machines align seams.',
    checklist: ['12–14 SPI target', 'Seam break test', 'Flatlock alignment'],
    standard: 'Yamato standards',
  },
  {
    id: '03',
    title: 'Sublimation verification',
    tab: 'Color verification',
    description: 'Printed panels are checked post-heat press against master print targets. We verify sublimation transfer color accuracy, sharpness, and ink curing temperatures.',
    checklist: ['Ink density match', 'Curing heat verify', 'Graphic crispness'],
    standard: 'Italian Kian ink',
  },
  {
    id: '04',
    title: 'Final integrity check',
    tab: 'Fulfillment scan',
    description: 'Before bagging, 100% of finished apparel goes through industrial metal detectors. Garments are hand-inspected for loose threads, and tags are audited.',
    checklist: ['Metal detector pass', 'Barcode mapping', 'Double trimming scan'],
    standard: 'Zero-defect target',
  },
];

export default function QualityControl() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 sm:py-28 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quality assurance"
          title="4-stage audit"
          muted="on every order."
          description="Quality is checked at four points in production — not just at the end."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative aspect-[4/5] lg:aspect-auto lg:min-h-[520px] rounded-3xl overflow-hidden bg-neutral-100"
          >
            <Image
              src="/why-us-dispatch.png"
              alt="Inspectors checking finished jerseys before packing"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 text-xs font-semibold bg-white text-black rounded-full px-3 py-1.5">
              <ShieldCheck className="w-4 h-4" /> 100% manual inspection
            </span>
          </motion.div>

          {/* Steps accordion */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {QA_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.id}
                  className={`rounded-2xl border transition-colors duration-300 ${isActive ? 'bg-black text-white border-black' : 'bg-neutral-50 border-black/10 hover:border-black/25'}`}
                >
                  <button
                    onClick={() => setActiveStep(isActive ? -1 : idx)}
                    aria-expanded={isActive}
                    className="w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left cursor-pointer"
                  >
                    <span className={`shrink-0 w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center ${isActive ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      {step.id}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className={`block text-xs font-semibold uppercase tracking-[0.16em] ${isActive ? 'text-white/55' : 'text-black/45'}`}>{step.tab}</span>
                      <span className="block mt-0.5 text-base sm:text-lg font-semibold tracking-tight">{step.title}</span>
                    </span>
                    <Plus className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6">
                          <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {step.checklist.map((item) => (
                              <li key={item} className="inline-flex items-center gap-1.5 text-xs font-medium border border-white/25 rounded-full px-3 py-1.5">
                                <Check className="w-3.5 h-3.5" /> {item}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-5 pt-4 border-t border-white/15 text-xs font-semibold text-white/55">
                            Standard: <span className="text-white">{step.standard}</span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
