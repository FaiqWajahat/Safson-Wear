'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// Final call-to-action before the footer
export default function ClosingCTA() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative max-w-7xl mx-auto rounded-[2rem] overflow-hidden bg-black text-white"
      >
        <Image
          src="/production_hero.png"
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/30" />

        <div className="relative px-6 sm:px-12 lg:px-16 py-16 sm:py-20 max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
            <span className="w-6 h-px bg-white/50" /> Start your project
          </p>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
            Ready to build your
            <span className="text-white/45"> next collection?</span>
          </h2>
          <p className="mt-5 text-base text-white/65 leading-relaxed max-w-lg">
            Share your tech pack, sketch, or reference and our team will prepare a sampling plan and production quote.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/inquiry"
              className="group inline-flex items-center gap-3 bg-white text-black text-sm font-semibold pl-7 pr-1.5 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
            >
              Request a quote
              <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <a
              href="https://wa.me/923484488019?text=Hello%20Fast%20Apparel%2C%20I%20would%20like%20to%20inquire%20about%20custom%20apparel%20manufacturing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-[1.05rem] rounded-full border border-white/30 hover:bg-white hover:text-black hover:border-white transition-all"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp us
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
