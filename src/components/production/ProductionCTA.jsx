'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ProductionCTA() {
  return (
    <section className="py-24 sm:py-32 bg-[#0d0d0d] text-center border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-400 mb-6 block">
            Start Your Manufacturing Program
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-tight mb-8">
            READY TO BUILD<br />YOUR COLLECTION?
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10">
            From a single sample to a 5-million unit annual program — our team is ready to scope, plan, and manufacture your sportswear line with zero compromise on quality.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors">
              Submit a Tech Pack
            </button>
            <button className="border border-zinc-800 text-white hover:border-zinc-600 font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors">
              Talk to Sales Desk
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
