'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '@/components/home/SectionHeading';

export const CERTS = [
  {
    id: 1,
    abbr: 'WRAP',
    title: 'WRAP Certified',
    scope: 'Platinum Level Standard',
    desc: 'Worldwide Responsible Accredited Production — validates ethical labor laws, fair compensation, workplace safety, and zero-defect worker protection.',
    agency: 'Worldwide Responsible Accredited Production (USA)',
    regId: 'WRAP-19822',
    status: 'Verified Active',
    image: '/sialkot-factory.png',
  },
  {
    id: 2,
    abbr: 'SMETA',
    title: 'SEDEX SMETA',
    scope: '4-Pillar Ethical Audit',
    desc: 'Rigorous 4-pillar supply chain audit verifying working hours, health & safety, environmental integrity, and business ethics.',
    agency: 'SGS Global Audit Operations',
    regId: 'SMETA-S-499321',
    status: 'Verified Active',
    image: '/technological-precision-values.png',
  },
  {
    id: 3,
    abbr: 'ACCORD',
    title: 'Pakistan Accord',
    scope: 'Building & Fire Safety',
    desc: 'International Accord for Health and Safety in the Garment Industry — certifies structural integrity, fire safety, and electrical hazard prevention.',
    agency: 'International Accord Secretariat',
    regId: 'PAK-ACCORD-2024',
    status: 'Verified Active',
    image: '/compatibility-tech-pack.png',
  },
  {
    id: 4,
    abbr: 'GOTS',
    title: 'GOTS Organic',
    scope: 'Organic Material Processing',
    desc: 'Global Organic Textile Standard — tracks sourcing, chemical-free processing, and vertical weaving of 100% organic cotton fibers.',
    agency: 'Control Union Certifications',
    regId: 'GOTS-G-382210',
    status: 'Verified Active',
    image: '/eco-friendly-values.png',
  },
  {
    id: 5,
    abbr: 'ISO',
    title: 'ISO 9001:2015',
    scope: 'Quality Management System',
    desc: 'Structured quality management standard confirming raw fabric pre-tests, line inspections, tensile checks, and consistent B2B deliveries.',
    agency: 'QAS International Compliance',
    regId: 'ISO-9001-2015',
    status: 'Verified Active',
    image: '/global-brands-values.png',
  },
];

export default function Certificates() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-black text-white font-sans border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <SectionHeading
          dark
          eyebrow="Audited & certified operations"
          title="Compliance &"
          muted="certifications."
          description="Independently audited annually by international compliance secretariats to ensure tier-one social, environmental, and structural standards."
        />

        {/* ── 5-Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              onClick={() => setActive(cert)}
              className="group relative bg-white/[0.04] border border-white/10 hover:border-white/30 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1"
            >
              {/* Top Row: Abbreviation badge + Arrow icon */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                  {cert.abbr}
                </span>
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black transition-colors" />
                </div>
              </div>

              {/* Middle & Bottom Info */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse flex-shrink-0" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-[11px] font-mono text-zinc-400 leading-snug">
                  {cert.scope}
                </p>

                <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed pt-1">
                  {cert.desc}
                </p>
              </div>

              {/* Subtle top border hover highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-white/40 transition-colors rounded-t-2xl" />
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="bg-[#141414] border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">

                {/* Left: Certificate Visual Card */}
                <div className="relative sm:w-[40%] aspect-[3/4] sm:aspect-auto flex-shrink-0 bg-zinc-900 border-b sm:border-b-0 sm:border-r border-zinc-800">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover opacity-60"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                      {active.abbr}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-0.5">Registry ID</p>
                    <p className="text-xs font-bold text-white font-mono">{active.regId}</p>
                  </div>
                </div>

                {/* Right: Details & Registry Specs */}
                <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 gap-5">

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1">{active.scope}</p>
                      <h3 className="text-xl font-bold text-white tracking-tight">{active.title}</h3>
                    </div>
                    <button
                      onClick={() => setActive(null)}
                      className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:border-zinc-500 hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                  </div>

                  {/* Detailed Body Copy */}
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">{active.desc}</p>

                  {/* Meta table */}
                  <div className="space-y-2.5 border-t border-zinc-800/80 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Auditing Body</span>
                      <span className="text-xs font-medium text-zinc-300 text-right">{active.agency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Registry ID</span>
                      <span className="text-xs font-mono font-medium text-zinc-300">{active.regId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Audit Status</span>
                      <span className="text-xs font-mono font-medium text-white">{active.status}</span>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">
                      Annual Audit Verified — Sialkot Facility
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
