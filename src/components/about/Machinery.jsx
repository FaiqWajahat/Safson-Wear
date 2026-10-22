'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gauge, Globe2 } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const MACHINERY_ITEMS = [
  {
    id: '01',
    name: 'Tajima embroidery systems',
    origin: 'Japan',
    speed: '1,200 stitches/min',
    purpose: 'High-density satin stitching of custom team logos, badges, and crests.',
    image: '/capability-embroidery-v2.png',
  },
  {
    id: '02',
    name: 'Roll-to-roll dye sublimation',
    origin: 'Italy / Japan',
    speed: '250m / hour',
    purpose: 'Locked-in thermal calendar transfer for vivid, fade-resistant color matching.',
    image: '/step-embellishment.png',
  },
  {
    id: '03',
    name: 'Computerized CAD cutters',
    origin: 'Germany',
    speed: '99.9% precision',
    purpose: 'Zero-variance fabric panel cutting based on digital tech pack coordinates.',
    image: '/step-cutting.png',
  },
  {
    id: '04',
    name: 'Yamato flatlock stitchers',
    origin: 'Japan',
    speed: '6,000 stitches/min',
    purpose: '4-needle, 6-thread low-profile flat seams to eliminate chafing for athletes.',
    image: '/about-hero-03.png',
  },
];

export default function Machinery() {
  return (
    <section className="py-20 sm:py-28 bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Infrastructure"
          title="Advanced machinery"
          muted="sourced worldwide."
          description="Precision machinery from German, Japanese, and Italian manufacturers gives us consistent quality, high daily throughput, and rapid sampling cycles."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MACHINERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-white/25 transition-colors duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-semibold bg-white text-black px-3 py-1.5 rounded-full">
                  <Globe2 className="w-3.5 h-3.5" /> {item.origin}
                </span>
              </div>
              <div className="p-6">
                <span className="text-sm font-semibold text-white/35 tabular-nums">{item.id}</span>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">{item.name}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.purpose}</p>
                <p className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-sm font-semibold">
                  <Gauge className="w-4 h-4 text-white/50" /> {item.speed}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
