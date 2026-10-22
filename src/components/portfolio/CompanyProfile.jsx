'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const MILESTONES = [
  { year: '2011', event: 'Fast Apparel founded in Sialkot, Pakistan' },
  { year: '2013', event: 'Expanded to 650+ machine operators on floor' },
  { year: '2017', event: 'WRAP Platinum & SEDEX SMETA accreditation' },
  { year: '2024', event: '5M+ garments produced annually, 60+ countries' },
];

const CERTIFICATIONS = [
  'WRAP Platinum Level',
  'SEDEX SMETA 4-Pillar',
  'GOTS Organic Certified',
  'ISO 9001:2015',
];

export default function CompanyProfile() {
  return (
    <>
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                <Image src="/active-wear.png" alt="Factory floor" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              </motion.div>
              <div className="grid grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                  <Image src="/team-wear.png" alt="Production 1" fill className="object-cover" sizes="25vw" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                  <Image src="/hero.png" alt="Production 2" fill className="object-cover" sizes="25vw" />
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-12">
              <div className="mb-10">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-2 block">About the Manufacturer</span>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-slate-900 leading-tight">
                  Fast Apparel — Who We Are
                </h2>
              </div>
              
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 mb-12">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Fast Apparel is a leading custom apparel manufacturer specializing in premium-quality Activewear, Swimwear, Teamwear, and Streetwear. We provide end-to-end manufacturing solutions, from design and fabric sourcing to printing, embroidery, and worldwide delivery.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Founded in 2011 by experienced professionals in the textile industry, Fast Apparel started as a small manufacturing operation focused on delivering reliable apparel solutions. Today, we manufacture premium apparel for brands around the globe while maintaining the same commitment to quality and integrity.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-4 block">Certifications</span>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {CERTIFICATIONS.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-900 flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-900">{cert}</span>
                    </div>
                  ))}
                </div>
                
                <a href="/about" className="inline-block bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                  Full Company Profile
                </a>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-2 block">Company History</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-slate-900 leading-tight">
              Our Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MILESTONES.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                <span className="text-3xl font-bold text-slate-900 block mb-3">{m.year}</span>
                <p className="text-sm text-slate-500 leading-relaxed">{m.event}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
