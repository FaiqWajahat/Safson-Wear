'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// Shared header for home page sections — fades up when scrolled into view
export default function SectionHeading({ eyebrow, title, muted, description, href, linkLabel, dark = false }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-2xl"
      >
        <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] mb-4 ${dark ? 'text-white/55' : 'text-black/50'}`}>
          <span className={`w-6 h-px ${dark ? 'bg-white/50' : 'bg-black/40'}`} />
          {eyebrow}
        </p>
        <h2 className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] ${dark ? 'text-white' : 'text-black'}`}>
          {title}
          {muted && <span className={dark ? 'text-white/45' : 'text-black/35'}> {muted}</span>}
        </h2>
        {description && (
          <p className={`mt-4 text-[15px] leading-relaxed max-w-xl ${dark ? 'text-white/60' : 'text-black/55'}`}>
            {description}
          </p>
        )}
      </motion.div>
      {href && (
        <Link
          href={href}
          className={`group inline-flex items-center gap-3 text-sm font-semibold shrink-0 ${dark ? 'text-white' : 'text-black'}`}
        >
          {linkLabel}
          <span className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 ${
            dark ? 'border-white/30 group-hover:bg-white group-hover:text-black' : 'border-black/20 group-hover:bg-black group-hover:text-white'
          }`}>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      )}
    </div>
  );
}
