'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const ROTATE_MS = 7000;

const TESTIMONIALS = [
  {
    quote: "Fast Apparel delivered 800 tournament kits with perfect sublimation in under 30 days. The flatlock seam quality and player name accuracy across all sizes was flawless. Three seasons in and we've never looked back.",
    name: 'Marcus Hoffmann',
    role: 'Kit Manager',
    company: 'Blaze United FC',
    initials: 'MH',
  },
  {
    quote: 'We switched to Fast Apparel for our private-label activewear line and the difference was immediate. GSM accuracy is spot-on every single order, and the Oeko-Tex certification satisfied our Scandinavian retail buyers without a second question.',
    name: 'Lena Bergström',
    role: 'Head of Sourcing',
    company: 'Nordiq Athletic',
    initials: 'LB',
  },
  {
    quote: 'The 72-hour sample turnaround is real — not a marketing claim. I sent my tech pack Monday morning and had a physical sample in Dubai by Thursday. Perfect fit on first pass.',
    name: 'Tariq Al-Rashidi',
    role: 'Founder',
    company: 'Apex Sport',
    initials: 'TA',
  },
];

export default function TestimonialsStrip() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = TESTIMONIALS[active];

  // Auto-rotate; restarts whenever the active quote changes
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % TESTIMONIALS.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  return (
    <section
      className="py-20 sm:py-28 bg-black text-white font-sans"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading dark eyebrow="Client feedback" title="What our clients" muted="say." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* Quote card */}
          <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-12 flex flex-col justify-between min-h-[340px]">
            <Quote className="w-10 h-10 text-white/25" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="mt-6"
              >
                <p className="text-xl sm:text-2xl font-medium leading-relaxed">&ldquo;{current.quote}&rdquo;</p>
                <div className="mt-10 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center">
                    {current.initials}
                  </span>
                  <div>
                    <p className="text-base font-semibold">{current.name}</p>
                    <p className="text-sm text-white/55">{current.role} · {current.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selector */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {TESTIMONIALS.map((t, i) => {
              const isActive = active === i;
              return (
                <button
                  key={t.name}
                  onClick={() => setActive(i)}
                  className={`relative overflow-hidden text-left rounded-2xl border px-5 py-5 flex items-center gap-4 cursor-pointer transition-colors duration-300 ${
                    isActive ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className={`w-11 h-11 rounded-full text-sm font-bold flex items-center justify-center shrink-0 ${isActive ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>
                    {t.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className={`block text-xs ${isActive ? 'text-black/55' : 'text-white/50'}`}>{t.company}</span>
                  </span>
                  {/* Auto-rotate progress */}
                  {isActive && !paused && (
                    <motion.span
                      key={`progress-${active}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black origin-left"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
