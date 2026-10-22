'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const CATEGORIES = ['Street Wear', 'Sports Wear', 'Team Uniforms', 'Private Label', 'Custom Drops'];

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

export default function PortfolioHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">

        {/* ── Top: headline + copy ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
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
              <span className="text-xs font-semibold tracking-wide text-white/85">Portfolio — 250+ Brand Programs</span>
            </motion.div>

            <h1 className="mt-7 text-[2.6rem] sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.03]">
              <Reveal delay={0.2}>Built for brands.</Reveal>
              <Reveal delay={0.32} className="text-white/45">Worn globally.</Reveal>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="lg:col-span-5"
          >
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              Custom collections manufactured for brands across 45 countries — from design samples to retail-ready drops.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/inquiry"
                className="group inline-flex items-center gap-3 bg-white text-black text-sm font-semibold pl-7 pr-1.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
              >
                Start a project
                <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <a
                href="#grid"
                className="group inline-flex items-center gap-2 text-sm font-semibold px-7 py-[1.05rem] rounded-full border border-white/30 hover:bg-white hover:text-black hover:border-white transition-all"
              >
                View our work
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Wide image panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="relative mt-12 sm:mt-14 aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/9] rounded-t-3xl overflow-hidden bg-neutral-900"
        >
          <Image
            src="/portfolio-hero.png"
            alt="Rack of finished streetwear samples"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
                  className="text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5"
                >
                  {c}
                </motion.span>
              ))}
            </div>
            <p className="text-xs text-white/60 shrink-0">Sample room — Sialkot, Pakistan</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
