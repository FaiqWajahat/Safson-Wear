'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from '@/components/home/CountUp';

const EASE = [0.16, 1, 0.3, 1];

const CERTS = ['WRAP Platinum', 'SEDEX SMETA', 'ISO 9001:2015', 'GOTS Organic', 'Pakistan Accord'];

const STATS = [
  { to: 15, suffix: '+', label: 'Years of experience' },
  { to: 250, suffix: '+', label: 'Brands served' },
  { to: 45, suffix: '+', label: 'Countries shipped' },
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

function CollageImage({ src, alt, delay, className, sizes }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={`relative overflow-hidden rounded-3xl bg-neutral-900 ${className}`}
    >
      <Image src={src} alt={alt} fill priority sizes={sizes} className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105" />
    </motion.div>
  );
}

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white font-sans">
      {/* Soft background glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

        {/* ── LEFT: copy ── */}
        <div className="lg:col-span-6">
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
            <span className="text-xs font-semibold tracking-wide text-white/85">About Us — Est. 2011, Sialkot</span>
          </motion.div>

          <h1 className="mt-7 text-[2.6rem] sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.03]">
            <Reveal delay={0.2}>We build brands</Reveal>
            <Reveal delay={0.32} className="text-white/45">from scratch.</Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-lg"
          >
            15+ years manufacturing premium Street Wear and Sports Wear for brands across 45 countries — from first tech pack to final DDP delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 bg-white text-black text-sm font-semibold pl-7 pr-1.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
            >
              Our services
              <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/inquiry"
              className="group inline-flex items-center gap-2 text-sm font-semibold px-7 py-[1.05rem] rounded-full border border-white/30 hover:bg-white hover:text-black hover:border-white transition-all"
            >
              Request a quote
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="mt-12 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-bold tracking-tight">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-white/55">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: image collage ── */}
        <div className="lg:col-span-6 relative">
          <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 h-[420px] sm:h-[540px]">
            <CollageImage
              src="/why-us.png"
              alt="Worker stitching a sports jersey"
              delay={0.3}
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="row-span-2"
            />
            <CollageImage
              src="/about-hero-new.jpg"
              alt="Pattern cutting table with fabric rolls"
              delay={0.45}
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <CollageImage
              src="/about-hero-03.png"
              alt="4-needle flatlock stitching machine"
              delay={0.6}
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="absolute -bottom-6 left-4 sm:left-[-1.5rem] bg-white text-black rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-4"
          >
            <span className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
              2011
            </span>
            <div>
              <p className="text-xs text-black/50">Established in</p>
              <p className="text-base font-bold">Sialkot, Pakistan</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Compliance strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 shrink-0">
            <ShieldCheck className="w-4 h-4" /> Compliance
          </p>
          <div className="flex flex-wrap gap-2">
            {CERTS.map((c) => (
              <span key={c} className="text-xs text-white/80 border border-white/20 rounded-full px-3 py-1.5">{c}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
