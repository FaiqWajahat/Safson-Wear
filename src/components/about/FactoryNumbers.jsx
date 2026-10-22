'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: "5M+", label: "Garments Manufactured Annually" },
  { value: "42", label: "Years of Production Legacy" },
  { value: "650+", label: "Skilled Craftsmen Employed" },
  { value: "40+", label: "Countries Shipped Globally" }
];

export default function FactoryNumbers() {
  return (
    <section className="bg-[#0d0d0d] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-zinc-800">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="py-12 px-6 flex flex-col justify-center"
            >
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
