'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/home/SectionHeading';

const EASE = [0.16, 1, 0.3, 1];

const TIMELINE_EVENTS = [
  {
    year: '2011',
    title: 'Small-scale stitching setup',
    description: 'Fast Apparel started as an apparel manufacturing operation in Sialkot, Pakistan, focused on delivering high-quality, reliable B2B apparel solutions.',
  },
  {
    year: '2015',
    title: 'Broadening the apparel lines',
    description: 'Expanded our production capabilities to manufacture Swimwear, Teamwear, and custom activewear lines, securing our first direct international buyers.',
  },
  {
    year: '2019',
    title: 'Modern embellishment hub',
    description: 'Integrated automated Tajima embroidery machines and premium dye sublimation technology to offer high-speed, edge-to-edge printing in-house.',
  },
  {
    year: '2024',
    title: 'End-to-end private labeling',
    description: 'Serving leading global activewear and streetwear brands with custom tagging, barcode mapping, and streamlined door-to-door worldwide shipping.',
  },
];

export default function History() {
  return (
    <section className="py-20 sm:py-28 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* LEFT — heading + image */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <SectionHeading
            eyebrow="Our journey"
            title="From one workshop"
            muted="to a vertical factory."
            description="More than a decade of steady growth — adding lines, machinery, and services as our brand partners grew with us."
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 -mt-4"
          >
            <Image
              src="/step-qc-dispatch.png"
              alt="Our Sialkot production floor"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* RIGHT — timeline */}
        <div className="lg:col-span-7">
          <ol className="relative">
            {/* Vertical line */}
            <span className="absolute left-[27px] top-2 bottom-2 w-px bg-black/10" aria-hidden="true" />
            {TIMELINE_EVENTS.map((event, idx) => (
              <motion.li
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE }}
                className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0"
              >
                <span className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-black text-white text-sm font-bold flex items-center justify-center ring-8 ring-white">
                  {event.year}
                </span>
                <div className="flex-1 rounded-3xl border border-black/10 bg-neutral-50 p-6 sm:p-7 hover:border-black/25 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight">{event.title}</h3>
                  <p className="mt-2 text-sm sm:text-[15px] text-black/60 leading-relaxed">{event.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
