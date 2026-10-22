'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Free Unsplash License photos — swap for the client's own office photos when available
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const FACILITIES = [
  {
    id: 'sialkot',
    label: 'Sialkot Factory',
    tag: 'Manufacturing HQ',
    title: 'Sialkot Production Facility',
    location: 'Sialkot, Pakistan',
    description: 'Our flagship vertical manufacturing headquarters. Coordinates raw fabric sourcing, CAD cutting, screen printing, Tajima embroidery, precision stitching, QC inspection, and export packaging under one roof.',
    address: 'Daska Road, Sialkot, Pakistan',
    phone: '+92 348 4488019',
    email: 'jamil.badar@fastapparel.com',
    image: unsplash('1741176505800-caaa3a52631a'), // stitching floor
    gallery: [
      unsplash('1741176505800-caaa3a52631a'), // stitching floor
      unsplash('1772351721253-1008627c8c50'), // embroidery machine
      unsplash('1610891015188-5369212db097'), // textile machinery
    ],
  },
  // TODO: replace address / phone / images with the client's real Saudi Arabia & Spain office details
  {
    id: 'saudi-arabia',
    label: 'Saudi Arabia',
    tag: 'Regional Office',
    title: 'Saudi Arabia Office',
    location: 'Saudi Arabia',
    description: 'Our Saudi Arabia office supports brands across the Gulf region with order coordination, sample approvals, and logistics.',
    address: '',
    phone: '',
    email: 'orders@fastapparel.com',
    image: unsplash('1774953037913-af0cf688491a'), // office lounge
    gallery: [
      unsplash('1774953037913-af0cf688491a'),
      unsplash('1497366811353-6870744d04b2'), // meeting room
      unsplash('1497366754035-f200968a6e72'), // glass corridor
      unsplash('1559136555-9303baea8ebd'), // team workspace
    ],
  },
  {
    id: 'spain',
    label: 'Spain',
    tag: 'European Office',
    title: 'Spain Office',
    location: 'Spain',
    description: 'Our Spain office serves brands across Europe with order coordination, sample approvals, and logistics support.',
    address: '',
    phone: '',
    email: 'orders@fastapparel.com',
    image: unsplash('1555529771-835f59fc5efe'), // apparel showroom
    gallery: [
      unsplash('1555529771-835f59fc5efe'),
      unsplash('1603400521630-9f2de124b33b'), // sample racks
      unsplash('1525896544042-354764aa27e6'), // client lounge
      unsplash('1771678040857-51d00a11be7a'), // office interior
    ],
  },
];

export default function Offices() {
  const [active, setActive] = useState('sialkot');
  const [gallery, setGallery] = useState(null); // { images, idx }

  const facility = FACILITIES.find(f => f.id === active);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setGallery(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="py-20 sm:py-24 bg-[#f8fafc] font-sans border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-2">Global Presence</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 uppercase">
              Our Offices &<br className="hidden sm:block" /> Facilities
            </h2>
          </div>
          <p className="text-sm text-slate-500 font-normal max-w-xs leading-relaxed">
            Sialkot factory to worldwide client offices — one team, one standard.
          </p>
        </div>

        {/* ── Location Tab Bar ── */}
        <div className="flex gap-1 mb-10 border-b border-slate-200 overflow-x-auto pb-px">
          {FACILITIES.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`flex-shrink-0 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap ${
                active === f.id
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Content: Image + Details ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          >
            {/* Left — Image */}
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer group shadow-sm"
              onClick={() => setGallery({ images: facility.gallery, idx: 0 })}
            >
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

              {/* Tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-slate-800 shadow-sm">
                {facility.tag}
              </div>

              {/* View gallery hint */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold text-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Gallery <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>

            {/* Right — Info */}
            <div className="flex flex-col justify-between h-full gap-8 py-2">

              {/* Title + description */}
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">{facility.location}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{facility.title}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{facility.description}</p>
              </div>

              {/* Contact rows — minimal */}
              <div className="space-y-3 border-t border-slate-200 pt-6">
                {facility.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700 leading-snug">{facility.address}</span>
                  </div>
                )}
                {facility.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <a href={`tel:${facility.phone}`} className="text-sm text-slate-700 hover:text-slate-900 transition-colors">
                      {facility.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <a href={`mailto:${facility.email}`} className="text-sm text-slate-700 hover:text-slate-900 transition-colors">
                    {facility.email}
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setGallery({ images: facility.gallery, idx: 0 })}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  View Gallery <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex flex-col"
            onClick={() => setGallery(null)}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" onClick={e => e.stopPropagation()}>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
                {facility.title} — {gallery.idx + 1} / {gallery.images.length}
              </span>
              <button
                onClick={() => setGallery(null)}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 relative flex items-center justify-center px-4" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setGallery(g => ({ ...g, idx: g.idx === 0 ? g.images.length - 1 : g.idx - 1 }))}
                className="absolute left-4 sm:left-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="relative w-full max-w-4xl aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={gallery.images[gallery.idx]}
                  alt="Gallery"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <button
                onClick={() => setGallery(g => ({ ...g, idx: g.idx === g.images.length - 1 ? 0 : g.idx + 1 }))}
                className="absolute right-4 sm:right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all cursor-pointer z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-2 px-6 py-5" onClick={e => e.stopPropagation()}>
              {gallery.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGallery(g => ({ ...g, idx: i }))}
                  className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                    i === gallery.idx ? 'border-white' : 'border-white/20 opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
