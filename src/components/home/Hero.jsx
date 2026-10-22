'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from '@/components/home/CountUp';

const EASE = [0.16, 1, 0.3, 1];

// Hero background — swap these to change the video (files live in /public)
const HERO_VIDEO = '/bg-video.mp4';
const HERO_POSTER = '/hero-poster.jpg'; // first frame of the video, so the swap is seamless

const STATS = [
  { to: 10, suffix: '', unit: 'pcs', label: 'Minimum order' },
  { to: 72, suffix: '', unit: 'hrs', label: 'Sample turnaround' },
  { to: 150, suffix: 'K+', unit: '', label: 'Units per month' },
  { text: 'DDP', unit: '', label: 'Worldwide delivery' },
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

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = true;
    videoRef.current.defaultMuted = true;
    videoRef.current.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black text-white font-sans min-h-[90vh] flex flex-col">
      {/* ── Video background with slow zoom-in ── */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay muted playsInline preload="auto"
          poster={HERO_POSTER}
          className="w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </motion.div>

      {/* Even overlay + vignette so centred text reads on any frame */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />

      {/* ── Centre: copy ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-white" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-white/85">
              Apparel Manufacturer — Sialkot, Pakistan
            </span>
          </motion.div>

          <h1 className="mt-7 text-[2.5rem] sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04]">
            <Reveal delay={0.2}>Crafted for brands.</Reveal>
            <Reveal delay={0.32} className="text-white/50">Engineered for scale.</Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-white/75 font-light leading-relaxed"
          >
            Full vertical OEM production of Street Wear and Sports Wear — from 3D sampling and fabric sourcing to embroidery, printing, and global freight.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-white text-black text-sm font-semibold pl-7 pr-1.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
            >
              Explore catalog
              <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href="/inquiry"
              className="group inline-flex items-center gap-2 text-sm font-semibold px-7 py-[1.05rem] rounded-full border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black hover:border-white transition-all"
            >
              Request a quote
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom: full-width stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-xl overflow-hidden">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 sm:px-8 py-5 sm:py-6 text-center border-white/15
                ${i % 2 === 1 ? 'border-l' : ''}
                ${i >= 2 ? 'border-t lg:border-t-0' : ''}
                ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                {s.text ?? <CountUp to={s.to} suffix={s.suffix} />}
                {s.unit && <span className="text-sm font-semibold text-white/50 ml-1">{s.unit}</span>}
              </p>
              <p className="mt-1.5 text-xs text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
