'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const MATERIALS = [
  {
    name: 'Performance polyester',
    gsm: '120–180',
    origin: 'Taiwan / South Korea',
    properties: ['Moisture wicking', 'UV protection', 'Anti-odor', 'Quick dry'],
    description: 'Primary substrate for premium activewear. High tenacity thread structure allows sublimation dye embedding at 200°C without fibre damage or colour bleeding.',
  },
  {
    name: 'Recycled rPET fabric',
    gsm: '140–200',
    origin: 'Japan / Germany',
    properties: ['Eco-certified', 'Tensile strength', 'Pilling resistant', 'Carbon neutral'],
    description: 'Made from post-consumer PET bottles. Offers equivalent performance to virgin polyester while meeting sustainability procurement mandates globally.',
  },
  {
    name: 'Nylon stretch lycra',
    gsm: '150–230',
    origin: 'Italy / China',
    properties: ['4-way stretch', 'Compression fit', 'Shape retention', 'Chlorine resistant'],
    description: 'Bi-elastic nylon-spandex blend ideal for compression legwear, cycling bib shorts, and swimwear. Retains shape under 200+ wash cycles.',
  },
  {
    name: 'GOTS organic cotton',
    gsm: '180–260',
    origin: 'Pakistan',
    properties: ['100% organic', 'Breathable', 'Hypoallergenic', 'Soft hand feel'],
    description: 'Certified organic single-jersey and interlock cotton, free from synthetic pesticide residue. Ideal for casual-wear and lifestyle collections.',
  },
  {
    name: 'Fleece brushed terry',
    gsm: '280–380',
    origin: 'China / Pakistan',
    properties: ['Thermal insulation', 'Soft touch', 'Pill resistant', 'Anti-static'],
    description: 'Heavy-loop brushed interior fabric for cold-weather outerwear. Provides consistent loft and insulation for team training jackets and hoodies.',
  },
  {
    name: 'Waterproof shell',
    gsm: '90–130',
    origin: 'Taiwan / China',
    properties: ['10K waterproof', 'Wind resistant', 'Taped seams', '3-layer laminate'],
    description: 'Technical 3-layer laminate shell for rain jackets and hard-shell outerwear. DWR-coated face fabric with seam-sealable membrane bonded lining.',
  },
];

export default function MaterialsLab() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50 text-black font-sans border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Raw material sourcing"
          title="Fabric materials"
          muted="lab."
          description="Six core fabric families, sourced from trusted mills and tested in-house before they reach the cutting table."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MATERIALS.map((mat, idx) => (
            <motion.div
              key={mat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-white border border-black/10 p-6 sm:p-7 flex flex-col hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">{mat.name}</h3>
                <span className="text-xs font-semibold text-black/40 tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-4 text-4xl font-bold tracking-tight tabular-nums">
                {mat.gsm}<span className="ml-1.5 text-base font-semibold text-black/40">GSM</span>
              </p>
              <p className="mt-4 text-sm text-black/60 leading-relaxed flex-1">{mat.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {mat.properties.map((p) => (
                  <span key={p} className="text-xs font-medium border border-black/15 rounded-full px-3 py-1.5">{p}</span>
                ))}
              </div>
              <p className="mt-5 pt-4 border-t border-black/10 flex items-center gap-2 text-sm font-semibold">
                <MapPin className="w-4 h-4 text-black/40" /> {mat.origin}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
