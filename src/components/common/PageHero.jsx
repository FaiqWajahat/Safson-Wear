'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

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

// Shared full-height hero for inner pages — same visual language as the home hero
export default function PageHero({
  image,
  imageAlt,
  badge,
  eyebrow,
  title,
  muted,
  description,
  primary,
  secondary,
  stripLabel,
  items = [],
}) {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white font-sans min-h-[640px] h-[100vh] max-h-[960px] flex flex-col">
      {/* Background with slow zoom-in */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
        className="absolute inset-0"
      >
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-black/15 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-black/90 to-transparent pointer-events-none" />

      {/* Copy */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
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
              <span className="text-xs font-semibold tracking-wide text-white/85">{badge}</span>
            </motion.div>

            {eyebrow && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/50"
              >
                {eyebrow}
              </motion.p>
            )}

            <h1 className="mt-4 text-[2.6rem] sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.03]">
              <Reveal delay={0.25}>{title}</Reveal>
              {muted && <Reveal delay={0.37} className="text-white/45">{muted}</Reveal>}
            </h1>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
                className="mt-6 text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl"
              >
                {description}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.67, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              {primary && (
                <Link
                  href={primary.href}
                  className="group inline-flex items-center gap-3 bg-white text-black text-sm font-semibold pl-7 pr-1.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  {primary.label}
                  <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )}
              {secondary && (
                <Link
                  href={secondary.href}
                  className="group inline-flex items-center gap-2 text-sm font-semibold px-7 py-[1.05rem] rounded-full border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black hover:border-white transition-all"
                >
                  {secondary.label}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
        >
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            {stripLabel && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 shrink-0">{stripLabel}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="text-xs text-white/85 border border-white/20 rounded-full px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
