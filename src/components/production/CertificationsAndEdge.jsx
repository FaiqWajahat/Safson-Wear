'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CERTS = [
  { label: 'WRAP Platinum', sub: 'Worldwide Responsible Accredited Production' },
  { label: 'SEDEX SMETA', sub: '4-Pillar Ethical Trade Audit Certified' },
  { label: 'GOTS Organic', sub: 'Global Organic Textile Standard' },
  { label: 'Oeko-Tex 100', sub: 'Tested for Harmful Substances' },
  { label: 'ISO 9001:2015', sub: 'Quality Management System' },
  { label: 'Bluesign®', sub: 'Sustainable Textile Processing' },
];

const ADVANTAGES = [
  { num: '01', title: 'Vertical Integration', desc: 'From raw yarn sourcing to finished export carton — every process happens under one roof in Sialkot, eliminating third-party delays and quality gaps.' },
  { num: '02', title: 'In-House R&D Lab', desc: 'Our fabric testing lab runs GSM, pilling, tensile, and wash-fastness tests in-house before any material reaches the cutting floor.' },
  { num: '03', title: '72-Hour Sampling', desc: 'Dedicated rapid-sample teams produce physical fit samples from your tech pack within 72 business hours, including courier dispatch.' },
  { num: '04', title: 'Low MOQ Access', desc: 'Emerging brands can start at 50 units per style/colourway. We scale seamlessly from small runs to mass production of millions of units.' },
];

export default function CertificationsAndEdge() {
  return (
    <section className="py-20 sm:py-28 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-2 block">
                Compliance & Accreditation
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-slate-900 leading-tight mb-6">
                CERTIFICATIONS<br />& COMPLIANCE
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                Every production facility at Safson Wear holds internationally recognised certifications across social compliance, chemical safety, organic processing, and quality management.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CERTS.map((cert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-slate-100"
              >
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">{cert.label}</h4>
                <p className="text-xs font-medium text-slate-500 leading-snug">{cert.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-20 border-t border-slate-200">
          <div className="mb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-2 block">
                Competitive Advantages
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-slate-900 leading-tight">
                WHY SAFSON WEAR?
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-8 border border-slate-100"
              >
                <span className="text-3xl font-bold text-slate-200 block mb-6">{adv.num}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{adv.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
