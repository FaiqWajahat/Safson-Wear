'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CountUp from '@/components/home/CountUp';

const STATS = [
  { to: 150, suffix: 'K+', label: 'Units produced every month' },
  { to: 10, suffix: '', label: 'Pieces minimum order per design' },
  { to: 72, suffix: 'h', label: 'Rapid sample turnaround' },
  { to: 3, suffix: '', label: 'Offices — Pakistan, Saudi Arabia & Spain' },
];

const EASE = [0.16, 1, 0.3, 1];

export default function StatsBand() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50 text-black font-sans border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-200">
            <Image
              src="/why-us.png"
              alt="Safson Wear worker stitching a sports jersey at the Sialkot factory"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Copy + stats */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-black/50 mb-4">
              <span className="w-6 h-px bg-black/40" /> Why brands choose us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1]">
              One partner from first sample
              <span className="text-black/35"> to final shipment.</span>
            </h2>
            <p className="mt-5 text-[15px] text-black/55 leading-relaxed max-w-xl">
              Design, sourcing, cutting, embellishment, stitching, QC, and freight all happen under one roof — so your
              collection stays on spec, on schedule, and on budget.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-px bg-black/10 rounded-3xl overflow-hidden border border-black/10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white p-6 sm:p-8"
              >
                <p className="text-4xl sm:text-5xl font-bold tracking-tight">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-black/55">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
