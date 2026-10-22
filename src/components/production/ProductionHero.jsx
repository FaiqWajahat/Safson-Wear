'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from '@/components/home/CountUp';

const EASE = [0.16, 1, 0.3, 1];

const PROCESS_STEPS = ['Design & CAD', 'Yarn Sourcing', 'Laser Cutting', 'Embellishment', 'Stitching', 'QC & Dispatch'];

const STATS = [
  { to: 150, suffix: 'K+', label: 'Units per month' },
  { to: 72, suffix: 'h', label: 'Sample turnaround' },
  { to: 100, suffix: '%', label: 'Manual QC' },
];

function Reveal({ children, delay, className = '' }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function ProductionHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* ── LEFT: copy ── */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-white" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-white/85">Production Facility — Sialkot</span>
          </motion.div>

          <h1 className="mt-7 text-[2.6rem] sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.03]">
            <Reveal delay={0.2}>Engineered</Reveal>
            <Reveal delay={0.32} className="text-white/45">to perform.</Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-md"
          >
            Every cut, stitch, and press engineered for consistency — automated CAD cutting, Tajima embroidery, and 100% manual QC inspection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/inquiry"
              className="group inline-flex items-center gap-3 bg-white text-black text-sm font-semibold pl-7 pr-1.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
            >
              Request a sample
              <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold px-7 py-[1.05rem] rounded-full border border-white/30 hover:bg-white hover:text-black hover:border-white transition-all"
            >
              All services
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: image + stats card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="lg:col-span-7 relative"
        >
          <div className="relative aspect-[4/3] lg:aspect-[16/12] rounded-3xl overflow-hidden bg-neutral-900">
            <Image
              src="/production_hero.png"
              alt="Multi-head Tajima embroidery machines on our production floor"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 inline-flex items-center gap-2 text-xs font-semibold bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live floor
            </span>

            {/* Stats card */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[380px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 grid grid-cols-3 divide-x divide-white/15">
              {STATS.map((s) => (
                <div key={s.label} className="px-3 first:pl-0 last:pr-0">
                  <p className="text-2xl font-bold tracking-tight"><CountUp to={s.to} suffix={s.suffix} /></p>
                  <p className="mt-1 text-[11px] text-white/65 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 6-step workflow strip ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-auto">
          <ol className="relative grid grid-cols-6 min-w-[720px]">
            <span className="absolute left-5 right-5 top-5 h-px bg-white/15" aria-hidden="true" />
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, delay: 0.9, ease: EASE }}
              className="absolute left-5 right-5 top-5 h-px bg-white origin-left"
              aria-hidden="true"
            />
            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.12 }}
                className="relative flex flex-col items-start gap-3"
              >
                <span className="relative z-10 w-10 h-10 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-semibold text-white/85">{step}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
