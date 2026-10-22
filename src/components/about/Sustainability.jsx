'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Recycle, Sprout, Droplets, FlaskConical } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const EASE = [0.16, 1, 0.3, 1];

const INITIATIVES = [
  {
    icon: Recycle,
    title: 'Recycled fabrics',
    tagline: 'Eco-activewear',
    description: 'Offering premium performance polyester options woven from recycled plastic bottles, drastically decreasing carbon output per manufacturing batch.',
  },
  {
    icon: Sprout,
    title: 'Organic raw cotton',
    tagline: 'Certified sourcing',
    description: 'Sourcing 100% raw organic cotton certified by the Global Organic Textile Standard. Absolutely zero harsh chemical pesticides or toxic fertilizers.',
  },
  {
    icon: Droplets,
    title: 'Water filtration',
    tagline: 'Resource efficiency',
    description: 'Equipped with dedicated wastewater filtration systems inside our dye plants, enabling water purification and filtering before standard loop discharge.',
  },
  {
    icon: FlaskConical,
    title: 'Non-toxic dyes',
    tagline: 'Chemical safety',
    description: 'Exclusively running non-toxic, allergen-free Italian sublimation inks and fabric dyes that are certified skin-friendly for professional athletes.',
  },
];

export default function Sustainability() {
  return (
    <section className="py-20 sm:py-28 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Responsibility"
          title="Made responsibly,"
          muted="built to last."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-5 relative aspect-[4/5] lg:aspect-auto lg:min-h-[520px] rounded-3xl overflow-hidden bg-neutral-100"
          >
            <Image
              src="/step-fabric.png"
              alt="Fabric sourcing and dye lab"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </motion.div>

          {/* Initiatives */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {INITIATIVES.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE }}
                className="group rounded-3xl border border-black/10 bg-neutral-50 p-6 sm:p-7 hover:bg-white hover:shadow-xl hover:shadow-black/5 hover:border-black/20 transition-all duration-300"
              >
                <span className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                  <item.icon className="w-5 h-5" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">{item.tagline}</p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-black/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
