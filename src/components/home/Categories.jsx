'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/home/SectionHeading';
import { CATALOG } from '@/data/catalog.mjs';

const CARD_COPY = {
  'street-wear': {
    subtitle: 'Urban Apparel Line',
    description: 'Hoodies, tees, jackets, trousers, shorts, and tracksuits — built for private-label streetwear brands.',
    image: '/card-street-wear.png',
  },
  'sports-wear': {
    subtitle: 'Team & Performance Line',
    description: 'Custom team uniforms for football, soccer, rugby, ice hockey, American football, basketball, baseball, and tennis.',
    image: '/card-sports-wear.png',
  },
};

const DIVISIONS = CATALOG.map((cat, i) => ({
  id: cat.slug,
  no: String(i + 1).padStart(2, '0'),
  title: cat.name,
  items: cat.subcategories.map((s) => s.name),
  link: `/products?category=${cat.slug}`,
  ...CARD_COPY[cat.slug],
}));

export default function Categories() {
  return (
    <section className="py-20 sm:py-28 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="What we make"
          title="Manufacturing lines"
          muted="built for growing brands."
          description="Two specialised divisions under one vertical facility, with low MOQs and full private-label finishing."
          href="/products"
          linkLabel="Full catalog"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIVISIONS.map((div, i) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={div.link} className="group relative block aspect-[4/5] lg:aspect-[5/6] rounded-3xl overflow-hidden bg-neutral-100">
                <Image
                  src={div.image}
                  alt={div.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/5 transition-opacity duration-500" />

                {/* Top row */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                    {div.no} — {div.subtitle}
                  </span>
                  <span className="text-xs font-semibold bg-white text-black rounded-full px-3 py-1.5">
                    MOQ 10 pcs
                  </span>
                </div>

                {/* Bottom content — details slide up on hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">{div.title}</h3>
                    <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="pt-3 text-sm text-white/75 leading-relaxed max-w-md">{div.description}</p>
                      <div className="pt-4 flex flex-wrap gap-2">
                        {div.items.map((item) => (
                          <span key={item} className="text-xs text-white/90 border border-white/25 rounded-full px-3 py-1">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
