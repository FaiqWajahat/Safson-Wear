'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ITEMS = [
  {
    id: 1,
    no: '01',
    title: 'Tech Packs & 3D Design',
    category: 'Pre-Production',
    desc: 'Send tech packs in PDF, Excel, or Adobe Illustrator. Fully compatible with CLO3D, Browzwear, and CAD pattern software.',
    specs: ['Adobe Illustrator .AI', 'CLO3D / CAD Patterns', 'Tech Pack PDFs', 'Size Spec Sheets'],
    image: '/compatibility-tech-pack.png',
  },
  {
    id: 2,
    no: '02',
    title: 'Customization & Prints',
    category: 'Embellishment',
    desc: 'High-density screen printing, Tajima embroidery, silicone 3D prints, reflective heat transfers, and dye sublimation.',
    specs: ['Tajima Embroidery', 'Dye Sublimation', 'High-Density Prints', 'Silicone Heat Transfer'],
    image: '/compatibility-customization.png',
  },
  {
    id: 3,
    no: '03',
    title: 'Sizing & Fit Grading',
    category: 'Specification',
    desc: 'Compatible with US, EU, and Asian size charts. Custom fit grading from youth sizes to athletic plus-sizing.',
    specs: ['US & EU Standard Fit', 'Custom Size Charts', 'In-House Fit Grading', 'Youth to Plus Sizes'],
    image: '/compatibility-sizing.png',
  },
  {
    id: 4,
    no: '04',
    title: 'Logistics & Integrations',
    category: 'Fulfillment',
    desc: 'GS1 barcoding, Amazon FBA packaging, custom hangtags, polybag labeling, and direct-to-warehouse global distribution.',
    specs: ['GS1 Barcoding', 'Amazon FBA Ready', 'Shopify Warehouses', 'Custom Trims & Labels'],
    image: '/compatibility-logistics.png',
  },
];

export default function Compatibility() {
  return (
    <section className="py-20 sm:py-28 bg-[#f8fafc] font-sans border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-2">
              Integrated B2B Specifications
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-slate-900 leading-tight">
              Technical Compatibility
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-colors group flex-shrink-0"
          >
            All Services
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── 2-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-0.5">
                      {item.no} · {item.category}
                    </p>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">{item.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {item.specs.map((s, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
