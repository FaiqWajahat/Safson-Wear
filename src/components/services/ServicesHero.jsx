'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const SERVICE_LIST = [
  'CLO3D tech packs',
  'Fabric & lab dips',
  'Laser cutting',
  'Tajima embroidery',
  'Screen & sublimation printing',
  'Private label packaging',
  'DDP logistics',
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

export default function ServicesHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

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
            <span className="text-xs font-semibold tracking-wide text-white/85">Manufacturing Services — End-to-End OEM</span>
          </motion.div>

          <h1 className="mt-7 text-[2.6rem] sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.03]">
            <Reveal delay={0.2}>Every service.</Reveal>
            <Reveal delay={0.32} className="text-white/45">One factory.</Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-md"
          >
            From the first design sketch to the final freight delivery — every step handled in-house at our Sialkot facility.
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
              Start a project
              <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/production"
              className="group inline-flex items-center gap-2 text-sm font-semibold px-7 py-[1.05rem] rounded-full border border-white/30 hover:bg-white hover:text-black hover:border-white transition-all"
            >
              View production
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: image + service menu ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="lg:col-span-7 relative"
        >
          <div className="relative aspect-[4/3] lg:aspect-[16/13] rounded-3xl overflow-hidden bg-neutral-900">
            <Image
              src="/services_hero.png"
              alt="Laser cutting machine cutting fabric panels"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/10 via-transparent to-black/50" />
          </div>

          {/* Floating service menu */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-4 lg:mt-0 lg:absolute lg:right-5 lg:top-5 lg:bottom-5 lg:w-[300px] rounded-2xl bg-black/70 lg:bg-black/55 backdrop-blur-xl border border-white/15 p-5 sm:p-6 flex flex-col"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">What we do</p>
            <ul className="mt-4 space-y-2.5 flex-1">
              {SERVICE_LIST.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.07 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  {s}
                </motion.li>
              ))}
            </ul>
            <p className="mt-5 pt-4 border-t border-white/15 text-xs text-white/60">All under one roof in Sialkot, Pakistan</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
