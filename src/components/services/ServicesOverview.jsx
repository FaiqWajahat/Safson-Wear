'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const SERVICES = [
  {
    index: '01',
    title: 'OEM & ODM manufacturing',
    description: 'Transform your ideas into premium apparel with our complete OEM and ODM manufacturing services. Custom tech pack prototype translation, German CAD layout sizing structures, and sample turnaround in 7–10 days.',
    image: '/capability-patterning.png',
  },
  {
    index: '02',
    title: 'Sublimation printing',
    description: 'Bring your designs to life with vibrant, edge-to-edge sublimation printing. Vivid, wash-proof colors that do not fade, ideal for custom sportswear using Italian Kian inks.',
    image: '/production-hero-02.png',
  },
  {
    index: '03',
    title: 'Screen printing',
    description: 'Achieve bold, long-lasting prints with our premium screen printing services. Bold and high-density screen print overlays, outstanding durability over wash cycles.',
    image: '/capability-printing-v2.png',
  },
  {
    index: '04',
    title: 'Precision embroidery',
    description: 'Enhance your apparel with precision embroidery. Multi-head automated Tajima embroidery, dense satin stitching and 3D puff badges for a refined professional look.',
    image: '/capability-embroidery-v2.png',
  },
  {
    index: '05',
    title: 'Private label manufacturing',
    description: 'Build your brand with custom woven neck labels, eco-friendly hangtags, and barcoded SKU tracking polybag packaging for complete private labeling kits.',
    image: '/capability-packaging.png',
  },
  {
    index: '06',
    title: 'DTF & DTG printing',
    description: 'Vibrant full-color Direct to Film and Direct to Garment high-precision prints with high stretch resistance, compatible with multiple fabric types.',
    image: '/step-embellishment.png',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 sm:py-28 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services scope"
          title="Core capabilities"
          muted="for your label."
          description="Pick one service or combine them all — every capability is run by our own team, on our own machines."
          href="/inquiry"
          linkLabel="Get a quote"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => (
            <motion.div
              key={srv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/inquiry"
                className="group relative block aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100"
              >
                <Image
                  src={srv.image}
                  alt={srv.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/5" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                    {srv.index}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold tracking-tight">{srv.title}</h3>
                  {/* Description slides open on hover (always visible on touch screens) */}
                  <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="pt-3 text-sm text-white/75 leading-relaxed">{srv.description}</p>
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
