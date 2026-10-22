'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_FAQS } from '@/components/common/FAQSection';

export default function HomeFAQ() {
  const [openId, setOpenId] = useState(DEFAULT_FAQS[0].id);

  return (
    <section className="py-20 sm:py-24 bg-neutral-50 text-black font-sans border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* LEFT — heading */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-black/50 mb-4">
            <span className="w-6 h-px bg-black/40" /> FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1]">
            Frequently asked
            <span className="text-black/35"> questions.</span>
          </h2>
          <p className="mt-4 text-[15px] text-black/55 leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Our team is happy to help.
          </p>
          <Link
            href="/inquiry"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold bg-black text-white px-6 py-3.5 rounded-full hover:bg-neutral-800 transition-colors"
          >
            Contact us <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* RIGHT — accordion */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-black/10 divide-y divide-black/10">
          {DEFAULT_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 px-6 sm:px-7 py-5 text-left cursor-pointer"
                >
                  <h3 className="text-[15px] sm:text-base font-semibold leading-snug">{faq.q}</h3>
                  <Plus className={`w-5 h-5 shrink-0 text-black/50 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 sm:px-7 pb-6 -mt-1 text-sm text-black/60 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
