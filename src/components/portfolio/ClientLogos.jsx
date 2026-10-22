'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { val: '500+',  label: 'Collections Delivered' },
  { val: '60+',   label: 'Countries Served' },
  { val: '20+',   label: 'Years of Expertise' },
  { val: '250+',  label: 'Brands Partnered' },
];

export default function PortfolioStats() {
  return (
    <section className="py-16 sm:py-20 bg-[#0d0d0d] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-white mb-2">{s.val}</p>
              <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
