'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-6 font-sans">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center space-y-6 max-w-md"
      >
        {/* 404 Number */}
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-600">
          Error 404
        </p>
        <h1 className="text-[8rem] sm:text-[10rem] font-bold text-white leading-none tracking-tight font-mono select-none">
          404
        </h1>

        {/* Message */}
        <div className="space-y-2 border-t border-zinc-800 pt-6">
          <h2 className="text-lg font-bold text-white tracking-tight">Page Not Found</h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            The page you are looking for does not exist, has been moved, or is no longer available.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-neutral-200 transition-colors"
          >
            Back to home <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-white/25 text-white/70 hover:text-white hover:border-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all"
          >
            Browse products
          </Link>
        </div>
      </motion.div>

    </div>
  );
}
