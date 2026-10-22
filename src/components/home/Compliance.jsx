'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '@/components/home/SectionHeading';
import { CERTS } from '@/components/home/Certificates';

export default function Compliance() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-black text-white font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        <SectionHeading
          dark
          index="06"
          eyebrow="Audited & Certified Operations"
          title="Compliance &"
          outline="Certifications"
          aside="Independently audited annually by international compliance secretariats to ensure tier-one social, environmental, and structural standards."
        />

        {/* ── Certification rows ── */}
        <div className="border-t border-white/15">
          {CERTS.map((cert, i) => (
            <motion.button
              key={cert.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              onClick={() => setActive(cert)}
              className="group relative w-full text-left border-b border-white/15 cursor-pointer overflow-hidden focus:outline-none focus-visible:bg-white/5"
            >
              {/* Hover fill */}
              <span className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              <div className="relative grid grid-cols-12 items-center gap-4 py-6 sm:py-8 px-1 sm:px-4 group-hover:text-black transition-colors duration-300">
                <span className="col-span-2 sm:col-span-1 text-[11px] font-bold tabular-nums opacity-50">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="col-span-10 sm:col-span-4 lg:col-span-3 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.05em] leading-none">
                  {cert.abbr}
                </span>

                <div className="col-span-10 col-start-3 sm:col-start-auto sm:col-span-5 lg:col-span-4">
                  <p className="text-base sm:text-lg font-bold">{cert.title}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mt-1">{cert.scope}</p>
                </div>

                <div className="hidden lg:block lg:col-span-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Registry ID</p>
                  <p className="text-sm font-semibold tabular-nums mt-1">{cert.regId}</p>
                </div>

                <div className="hidden sm:flex sm:col-span-2 lg:col-span-1 justify-end">
                  <span className="w-11 h-11 rounded-full border border-current flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40">
          <CheckCircle2 className="w-3.5 h-3.5" /> All certifications verified active — Sialkot facility
        </p>
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
              className="bg-white text-black rounded-[1.5rem] shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative sm:w-[40%] aspect-[16/10] sm:aspect-auto shrink-0 bg-black">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                    <span className="text-5xl font-black uppercase tracking-[-0.05em] leading-none">{active.abbr}</span>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/60 mb-0.5">Registry ID</p>
                      <p className="text-xs font-bold tabular-nums">{active.regId}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 gap-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-black/50 mb-1">{active.scope}</p>
                      <h3 className="text-2xl font-black uppercase tracking-[-0.03em]">{active.title}</h3>
                    </div>
                    <button
                      onClick={() => setActive(null)}
                      aria-label="Close"
                      className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-black/70 leading-relaxed">{active.desc}</p>

                  <div className="border-t border-black/15">
                    {[
                      ['Auditing Body', active.agency],
                      ['Registry ID', active.regId],
                      ['Audit Status', active.status],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-4 py-2.5 border-b border-black/15">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-black/50">{k}</span>
                        <span className="text-xs font-semibold text-right">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 bg-black text-white rounded-full px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] uppercase tracking-[0.2em]">Annual Audit Verified — Sialkot Facility</span>
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
