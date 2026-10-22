'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { CATALOG } from '@/data/catalog.mjs';

const EASE = [0.16, 1, 0.3, 1];

const HERO_CONFIGS = Object.fromEntries(
  CATALOG.map((cat) => [cat.slug, { bgImage: cat.image, pillars: cat.pillars }])
);

export default function CategoryHero({ activeCategoryKey, categoryData }) {
  const config = HERO_CONFIGS[activeCategoryKey] || HERO_CONFIGS['street-wear'];
  const subCount = Object.keys(categoryData?.subcategories || {}).length;
  const bgImage = categoryData?.heroImage || config.bgImage;

  return (
    <div className="relative overflow-hidden rounded-3xl mb-12 min-h-[380px] sm:min-h-[440px] flex bg-black text-white">
      <motion.div
        key={bgImage}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute inset-0"
      >
        <Image src={bgImage} alt={categoryData?.title || 'Category'} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/10" />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 w-full p-7 sm:p-12 flex flex-col justify-end">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="self-start inline-flex items-center gap-2 text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5"
        >
          Manufacturing division · {subCount} product lines
        </motion.span>

        <motion.h1
          key={categoryData?.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]"
        >
          {categoryData?.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 text-sm sm:text-base text-white/70 max-w-xl leading-relaxed"
        >
          {categoryData?.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
        >
          <div className="flex flex-wrap gap-2">
            {(config?.pillars || []).map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5 text-xs font-medium border border-white/25 rounded-full px-3 py-1.5">
                <Check className="w-3.5 h-3.5" /> {p}
              </span>
            ))}
          </div>
          <Link
            href="/inquiry"
            className="group shrink-0 self-start inline-flex items-center gap-3 bg-white text-black text-sm font-semibold pl-6 pr-1.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
          >
            Request a quote
            <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
