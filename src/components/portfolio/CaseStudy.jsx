'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';
import CountUp from '@/components/home/CountUp';

const EASE = [0.16, 1, 0.3, 1];

const RESULTS = [
  { to: 1200, suffix: '', label: 'Units produced' },
  { to: 28, suffix: '', label: 'Days to delivery' },
  { to: 4, suffix: '', label: 'Kit colourways' },
  { to: 100, suffix: '%', label: 'QA pass rate' },
];

const HIGHLIGHTS = [
  'Allover sublimation across all 4 kit panels',
  'RFID player tracking badge integration',
  'Anti-slip silicone waistband on shorts',
  'WRAP-certified ethical manufacturing',
];

export default function CaseStudy() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50 text-black font-sans border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured project"
          title="Blaze United FC"
          muted="tournament kit."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Images */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="col-span-2 relative aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-200"
            >
              <Image src="/team-wear.png" alt="Blaze United match kit" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              <span className="absolute top-4 left-4 text-xs font-semibold bg-white text-black rounded-full px-3 py-1.5">Home kit</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-200"
            >
              <Image src="/hero-01.png" alt="Jersey fabric detail" fill sizes="(max-width: 1024px) 50vw, 29vw" className="object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-200"
            >
              <Image src="/capability-packaging.png" alt="Kits packed for dispatch" fill sizes="(max-width: 1024px) 50vw, 29vw" className="object-cover" />
            </motion.div>
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="lg:col-span-5"
          >
            <p className="text-[15px] text-black/60 leading-relaxed">
              Blaze United commissioned Fast Apparel for their 2024 European tournament program — a 1,200-unit run spanning home, away, third, and goalkeeper colourways with allover sublimation and RFID integration for stadium access.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px bg-black/10 rounded-3xl overflow-hidden border border-black/10">
              {RESULTS.map((r) => (
                <div key={r.label} className="bg-white p-5 sm:p-6">
                  <p className="text-3xl sm:text-4xl font-bold tracking-tight"><CountUp to={r.to} suffix={r.suffix} /></p>
                  <p className="mt-1 text-sm text-black/55">{r.label}</p>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-3">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <Link
              href="/inquiry"
              className="group mt-9 inline-flex items-center gap-3 bg-black text-white text-sm font-semibold pl-7 pr-1.5 py-1.5 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Start a similar program
              <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
