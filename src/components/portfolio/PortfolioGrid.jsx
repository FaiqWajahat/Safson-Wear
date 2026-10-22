'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/home/SectionHeading';

const FILTERS = ['All', 'Sports Wear', 'Street Wear'];

const ITEMS = [
  { id: 1, title: 'Europa FC Match Kit', category: 'Sports Wear', image: '/team-wear.png', desc: 'Full home, away, and third kit program with sublimated graphics.' },
  { id: 2, title: 'Urban Essentials Drop', category: 'Street Wear', image: '/card-street-wear.png', desc: 'Heavyweight hoodies, tees, bombers, and cargos for a debut collection.' },
  { id: 3, title: 'Titan Multi-Sport Program', category: 'Sports Wear', image: '/card-sports-wear.png', desc: 'Coordinated uniforms across seven sports for a school league.' },
  { id: 4, title: 'Iron Club Gym Wear', category: 'Street Wear', image: '/active-wear.png', desc: 'Premium fleece hoodie and jogger set for a gym brand.' },
  { id: 5, title: 'Vortex Elite Jersey', category: 'Sports Wear', image: '/hero-01.png', desc: 'Mesh game jersey with stretch shoulder panels and twill numbers.' },
  { id: 6, title: 'Nordiq Layering Capsule', category: 'Street Wear', image: '/street_wear.png', desc: 'Neutral-tone hoodie, tee, bomber, and cargo capsule.' },
  { id: 7, title: 'Aura Performance Tee', category: 'Sports Wear', image: '/active.jpg', desc: 'Moisture-wicking performance tee with contrast sleeves.' },
];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? ITEMS : ITEMS.filter((i) => i.category === filter);

  return (
    <section id="grid" className="py-20 sm:py-28 bg-white text-black font-sans scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected works"
          title="Portfolio"
          muted="gallery."
          description="A selection of programs we have produced for clubs, gyms, and private-label brands."
        />

        {/* Filter pills */}
        <div className="mb-10 inline-flex gap-1.5 p-1.5 rounded-full bg-neutral-100 border border-black/5">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
              >
                {isActive && (
                  <motion.span layoutId="portfolio-filter" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 rounded-full bg-black" />
                )}
                <span className={`relative transition-colors ${isActive ? 'text-white' : 'text-black/55 hover:text-black'}`}>{f}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-semibold bg-white text-black rounded-full px-3 py-1.5">
                  {item.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                  <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="pt-2 text-sm text-white/75 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
