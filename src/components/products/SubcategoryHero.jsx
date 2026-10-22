'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];
const PILLARS = ['OEM custom development', 'ISO 9001 approved seams', 'Worldwide DDP logistics'];

export default function SubcategoryHero({ subcategoryData, setParams, heroVideoRef }) {
  if (!subcategoryData) return null;

  const bgImage = subcategoryData?.heroBgImage || subcategoryData?.image || '/about-hero-bg.png';
  const bgVideo = subcategoryData?.heroBgVideo;

  return (
    <div className="relative overflow-hidden rounded-3xl min-h-[340px] sm:min-h-[400px] flex bg-black text-white">
      {bgVideo ? (
        <video
          ref={heroVideoRef}
          src={bgVideo}
          autoPlay loop muted playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="absolute inset-0"
        >
          <Image src={bgImage} alt={subcategoryData?.title || ''} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/55 to-black/10" />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 w-full p-7 sm:p-12 flex flex-col justify-between gap-10">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setParams({ sub: null })}
          className="self-start inline-flex items-center gap-2 text-sm font-semibold bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black rounded-full pl-3 pr-4 py-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> All product lines
        </motion.button>

        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55"
          >
            Product line
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            {subcategoryData?.heroHeading || subcategoryData?.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4 text-sm sm:text-base text-white/70 max-w-lg leading-relaxed"
          >
            {subcategoryData?.heroSubheading || subcategoryData?.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {PILLARS.map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5 text-xs font-medium border border-white/25 rounded-full px-3 py-1.5">
                <Check className="w-3.5 h-3.5" /> {p}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
