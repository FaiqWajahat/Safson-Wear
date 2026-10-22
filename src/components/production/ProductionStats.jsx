'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: "5M+", label: "Garments Manufactured Annually" },
  { value: "72hr", label: "Sample Turnaround Target" },
  { value: "650+", label: "Skilled Machine Operators" },
  { value: "<0.1%", label: "Production Defect Rate" },
  { value: "40+", label: "Technical Fabrics Sourced" },
  { value: "100%", label: "Vertical Integration" },
];

export default function ProductionStats() {
  return (
    <section className="py-12 bg-[#0d0d0d] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 divide-x divide-zinc-800/50 text-center sm:text-left">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="px-4 sm:px-6 first:pl-0 last:pr-0"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
