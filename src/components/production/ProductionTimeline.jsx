'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const EASE = [0.16, 1, 0.3, 1];

const STEPS = [
  {
    id: '01',
    label: 'Tech pack review',
    day: 'Day 1',
    time: '4–6 hrs',
    description: 'Spec sheets, vector artwork, and size grading are checked for production compatibility before any material is cut.',
    specs: ['Vector outline scaling', 'Colour code verification', 'Grading chart review'],
  },
  {
    id: '02',
    label: 'Fabric sourcing',
    day: 'Day 1–3',
    time: '2–3 days',
    description: 'Performance yarns are sourced and lab-tested for weight, shrinkage, and colour fastness before cutting begins.',
    specs: ['GSM density check', 'Shrinkage tolerance test', 'Dye lot matching'],
  },
  {
    id: '03',
    label: 'CAD cutting',
    day: 'Day 4',
    time: '6–8 hrs',
    description: 'Digitised grading files are laser-cut across every ply, holding pattern variance to zero.',
    specs: ['Laser cutter mapping', 'Layer stack balancing', 'Panel tag labelling'],
  },
  {
    id: '04',
    label: 'Sublimation',
    day: 'Day 4–5',
    time: '1–2 days',
    description: 'Graphics are heat-pressed into the polyester fibre at 200°C, locking colour in permanently.',
    specs: ['Sublimation ink validation', 'Lightbox shade match', 'Bleed boundary control'],
  },
  {
    id: '05',
    label: 'Stitching',
    day: 'Day 5–8',
    time: '3–4 days',
    description: '4-needle, 6-thread flatlock seams join every panel to a zero-ridge finish built for competition.',
    specs: ['12–14 SPI target', 'Stretch load testing', 'Thread trim inspection'],
  },
  {
    id: '06',
    label: 'QA & packing',
    day: 'Day 9–10',
    time: '1–2 days',
    description: 'Every garment is metal-detected, barcoded, and sealed in anti-humidity packaging for export.',
    specs: ['100% metal detection', 'Barcode SKU mapping', 'Export weight audit'],
  },
];

export default function ProductionTimeline() {
  return (
    <section className="py-20 sm:py-28 bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Manufacturing process"
          title="From tech pack to shipment"
          muted="in about 10 days."
          description="A typical bulk order moves through six controlled stages. Here is what happens on each day."
        />

        {/* Day ruler */}
        <div className="relative mb-10 hidden md:block">
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE }}
              className="h-full rounded-full bg-white"
            />
          </div>
          <div className="mt-3 flex justify-between text-xs font-semibold text-white/50 tabular-nums">
            <span>Day 1</span><span>Day 3</span><span>Day 5</span><span>Day 8</span><span>Day 10</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.07, ease: EASE }}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 hover:bg-white hover:text-black hover:border-white transition-colors duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  {step.id}
                </span>
                <span className="text-xs font-semibold border border-white/25 group-hover:border-black/20 rounded-full px-3 py-1.5 transition-colors">
                  {step.day}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.label}</h3>
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/50 group-hover:text-black/50 transition-colors">
                <Clock className="w-3.5 h-3.5" /> {step.time}
              </p>
              <p className="mt-4 text-sm text-white/65 group-hover:text-black/65 leading-relaxed transition-colors">{step.description}</p>
              <ul className="mt-5 pt-5 border-t border-white/10 group-hover:border-black/10 space-y-2 transition-colors">
                {step.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 shrink-0 text-white/50 group-hover:text-black/50 transition-colors" /> {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
