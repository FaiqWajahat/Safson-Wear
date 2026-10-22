'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const EASE = [0.16, 1, 0.3, 1];

const PIPELINE_STEPS = [
  {
    step: '01',
    tabLabel: 'Inquiry',
    title: 'Tech pack analysis & quote estimate',
    duration: '12 business hours',
    description: 'Submit your tech pack specs, sizing grids, quantity profiles, and CAD patterns. Our engineering team reviews construction elements and returns a DDP/FOB quote estimate.',
    deliverables: [
      'Construction & seams feasibility scan',
      'Detailed per-piece cost analysis sheet',
      'FOB Sialkot or DDP delivery quotes',
      'Lead time and sample schedule proposal',
    ],
  },
  {
    step: '02',
    tabLabel: 'Fabric sourcing',
    title: 'Yarn sourcing & lab testing',
    duration: '3–5 days',
    description: 'We source matching performance yarns or mill custom fabric rolls to meet target GSM weight, color shade (checked in D65 light box), and stretch profile parameters.',
    deliverables: [
      'Custom lab-dip dye shade matching',
      'GSM weight verification audits',
      'Fibre composition certification (GRS/GOTS)',
      'Physical swatches shipped for approval',
    ],
  },
  {
    step: '03',
    tabLabel: 'Prototyping',
    title: 'Prototype construction & fit review',
    duration: '7–10 days',
    description: 'Our pattern master drafts a CAD template and sews a prototype sample using the approved fabric. The sample is shipped directly to your design studio for fit feedback.',
    deliverables: [
      'Pre-production sample assembly',
      'Sizing chart grading validation',
      'Fabric sublimation or print test audit',
      'Direct express shipping of prototype',
    ],
  },
  {
    step: '04',
    tabLabel: 'Bulk production',
    title: 'Vertically integrated mass production',
    duration: '18–25 days',
    description: 'Upon fit approval and PO confirmation, we roll out bulk fabrication. Cutting, sublimation heat press, flatlock seaming, and labeling are executed under strict ISO supervision.',
    deliverables: [
      'Computerized CAD fabric panel cutting',
      'Yamato flatlock seam stitching audits',
      'Tajima logo embroidery density checks',
      'Daily progress tracker updates',
    ],
  },
  {
    step: '05',
    tabLabel: 'Dispatch',
    title: 'Quality scan, customs clearance & delivery',
    duration: '5–7 days (air cargo)',
    description: 'Every item passes final metal detectors and hand audits. We manage export documentation, customs clearance, and deliver cargo directly to your warehouse.',
    deliverables: [
      '100% metal detector safety validation',
      'Barcoded SKU tracking labels applied',
      'Customs export/import clearances',
      'Door-to-door DDP courier dispatch',
    ],
  },
];

export default function SourcingProcess() {
  const [active, setActive] = useState(0);
  const current = PIPELINE_STEPS[active];
  const progress = ((active + 1) / PIPELINE_STEPS.length) * 100;

  return (
    <section className="py-20 sm:py-28 bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Operational workflow"
          title="Step-by-step"
          muted="pipeline."
          description="Five clear stages from your first message to cargo arriving at your warehouse. Select a stage to see what you receive."
        />

        {/* Step tabs */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
          <div className="grid grid-cols-5 gap-2 min-w-[640px]">
            {PIPELINE_STEPS.map((step, idx) => {
              const isActive = idx === active;
              const isDone = idx < active;
              return (
                <button
                  key={step.step}
                  onClick={() => setActive(idx)}
                  className={`rounded-2xl border px-4 py-4 text-left cursor-pointer transition-colors duration-300 ${
                    isActive ? 'bg-white text-black border-white' : isDone ? 'border-white/30 text-white' : 'border-white/10 text-white/55 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span className="block text-xs font-semibold tabular-nums opacity-60">{step.step}</span>
                  <span className="block mt-1 text-sm font-semibold">{step.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: EASE }}
            className="h-full rounded-full bg-white"
          />
        </div>

        {/* Active step panel */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              <div className="lg:col-span-6">
                <span className="text-6xl sm:text-7xl font-bold tracking-tight text-white/15 tabular-nums">{current.step}</span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">{current.title}</h3>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold border border-white/20 rounded-full px-3 py-1.5">
                  <Clock className="w-4 h-4" /> {current.duration}
                </p>
                <p className="mt-5 text-[15px] text-white/65 leading-relaxed">{current.description}</p>
              </div>
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">What you receive</p>
                <ul className="mt-4 grid grid-cols-1 gap-3">
                  {current.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3.5 text-sm">
                      <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / next */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm text-white/50 tabular-nums">{active + 1} / {PIPELINE_STEPS.length}</span>
            <button
              onClick={() => setActive((a) => Math.min(PIPELINE_STEPS.length - 1, a + 1))}
              disabled={active === PIPELINE_STEPS.length - 1}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
