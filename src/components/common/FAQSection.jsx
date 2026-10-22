'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DEFAULT_FAQS = [
  {
    id: 1,
    q: 'What is your Minimum Order Quantity (MOQ)?',
    a: 'Our standard MOQ starts at only 10 units per design/colorway for Street Wear and Sports Wear. You can split volume across multiple sizes (XS to 3XL), enabling emerging brands to launch private-label collections without heavy inventory risk.',
  },
  {
    id: 2,
    q: 'Do you offer custom tech pack creation and sample runs?',
    a: 'Yes. Our dedicated rapid prototyping team creates physical fit samples from your design sketches, Tech Pack PDFs, or CLO3D files. Sample turnarounds typically take 3–5 business days.',
  },
  {
    id: 3,
    q: 'What decoration techniques are available?',
    a: 'We offer Tajima embroidery, high-density 3D puff print, screen printing, dye sublimation, silicone heat transfers, and custom woven neck labels with luxury hardware options.',
  },
  {
    id: 4,
    q: 'What compliance certifications do your facilities hold?',
    a: 'Our Sialkot factory holds WRAP Platinum, SEDEX SMETA 4-Pillar, ISO 9001:2015, and GOTS organic certifications — audited annually by independent global bodies.',
  },
  {
    id: 5,
    q: 'What are your shipping timelines and global logistics options?',
    a: 'Express sample shipments reach the USA, Canada, UK, and Europe in 5–7 business days via air cargo. Bulk production ships DDP (door-to-door) or FOB (sea freight) direct to your warehouse.',
  },
  {
    id: 6,
    q: 'What payment terms do you support for B2B accounts?',
    a: 'Our standard structure is 50% deposit to initiate raw fabric sourcing and CAD grading, with the remaining 50% payable upon QC clearance before dispatch.',
  },
];

const WHATSAPP_URL = 'https://wa.me/923484488019?text=Hello%20Fast%20Apparel%2C%20I%20would%20like%20to%20inquire%20about%20custom%20apparel%20manufacturing.';

export default function FAQSection({
  faqs = DEFAULT_FAQS,
  badge = 'FAQ',
  title = 'Production & Procurement FAQ',
  description = 'Answers to common B2B manufacturing, sampling, and logistics questions.',
  className = '',
}) {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? 1);

  return (
    <section className={`py-20 sm:py-24 bg-neutral-50 text-black font-sans border-t border-black/5 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left — heading + contact */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-black/50 mb-4">
            <span className="w-6 h-px bg-black/40" /> {badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">{title}</h2>
          <p className="mt-4 text-[15px] text-black/55 leading-relaxed">{description}</p>

          <div className="mt-8 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <Link
              href="/inquiry"
              className="group inline-flex items-center justify-between gap-3 bg-black text-white text-sm font-semibold pl-6 pr-1.5 py-1.5 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Start an inquiry
              <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full border border-black/15 hover:border-black transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp us
            </a>
          </div>
        </div>

        {/* Right — accordion */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-black/10 divide-y divide-black/10">
          {faqs.map((faq, idx) => {
            const id = faq.id ?? idx + 1;
            const isOpen = openId === id;
            return (
              <div key={id}>
                <button
                  onClick={() => setOpenId(isOpen ? null : id)}
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
