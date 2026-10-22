'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from '@/components/home/CountUp';

const statsList = [
  { value: 15,  suffix: '+',  label: 'Years of experience' },
  { value: 250, suffix: '+',  label: 'Global brands served' },
  { value: 150, suffix: 'K+', label: 'Units produced monthly' },
  { value: 45,  suffix: '+',  label: 'Countries shipped to' },
];

export default function Stats() {
  return (
    <section className="bg-black border-y border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {statsList.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`py-8 sm:py-10 px-4 sm:px-8 text-center border-white/10
                ${idx % 2 === 1 ? 'border-l' : ''}
                ${idx >= 2 ? 'border-t lg:border-t-0' : ''}
                ${idx === 2 ? 'lg:border-l' : ''}`}
            >
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs sm:text-sm text-white/55">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
