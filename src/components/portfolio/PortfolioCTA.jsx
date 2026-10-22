'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const DIVISIONS = [
  {
    title: 'Team Kits',
    desc: 'Custom sublimated match kits, tournament uniforms, and club programs. Home, away, and third colourways with player personalisation and RFID integration.',
    image: '/active-wear.png',
  },
  {
    title: 'Activewear',
    desc: 'Private-label performance activewear — compression tights, training tops, gym wear, and cycling kits. Built from certified sustainable fabrics.',
    image: '/team-wear.png',
  },
];

const STEPS = [
  { num: '01', title: 'Submit Brief', desc: 'Send your tech pack or sketches. We respond with a quote within 12 hours.' },
  { num: '02', title: '72-hr Sample', desc: 'A physical sample is produced and couriered to your door within 72 hours.' },
  { num: '03', title: 'Production', desc: 'Once you sign off on the sample, mass production begins with weekly updates.' },
];

export default function PortfolioCTA() {
  return (
    <>
      <section className="py-20 sm:py-28 bg-[#0d0d0d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-400 mb-2 block">Our Divisions</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-white leading-tight">
              Explore by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DIVISIONS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-zinc-900">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4 max-w-sm">{item.desc}</p>
                <a href="/portfolio" className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1">
                  View Collection ↗
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-2 block">Start a Project</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-slate-900 leading-tight">
              How We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <span className="text-[11px] font-mono text-slate-300 block mb-4">{step.num}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="/inquiry" className="bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors">
              Submit Your Brief
            </a>
            <a href="/contact" className="border border-slate-200 text-slate-600 hover:border-slate-400 font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
