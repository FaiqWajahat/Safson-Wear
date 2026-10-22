'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Expand, X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '@/components/home/SectionHeading';
import { FACILITIES } from '@/components/home/Offices';

const EASE = [0.16, 1, 0.3, 1];

// Main image first, then the office's sub-images (duplicates removed)
function imagesFor(facility) {
  return [facility.image, ...facility.gallery.filter((g) => g !== facility.image)];
}

export default function GlobalPresence() {
  const [activeId, setActiveId] = useState(FACILITIES[0].id);
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const officeIdx = FACILITIES.findIndex((f) => f.id === activeId);
  const facility = FACILITIES[officeIdx];
  const images = imagesFor(facility);

  const selectOffice = (id) => {
    setActiveId(id);
    setImgIdx(0);
  };

  const step = useCallback(
    (dir) => setImgIdx((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, step]);

  return (
    <section className="py-20 sm:py-28 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Global presence"
          title="Our offices"
          muted="& facilities."
          description="From our Sialkot factory to client offices worldwide — one team, one standard."
        />

        {/* ── Office tabs ── */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto mb-8">
          <div className="inline-flex gap-2 p-1.5 rounded-full bg-neutral-100 border border-black/5">
            {FACILITIES.map((f) => {
              const isActive = f.id === activeId;
              return (
                <button
                  key={f.id}
                  onClick={() => selectOffice(f.id)}
                  className="relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer focus:outline-none"
                >
                  {isActive && (
                    <motion.span
                      layoutId="office-tab"
                      transition={{ duration: 0.45, ease: EASE }}
                      className="absolute inset-0 rounded-full bg-black shadow-md"
                    />
                  )}
                  <span className={`relative transition-colors duration-300 ${isActive ? 'text-white' : 'text-black/55 hover:text-black'}`}>
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* ── LEFT: main image + sub images ── */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 group">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`${activeId}-${imgIdx}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[imgIdx]}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

              <span className="absolute top-4 left-4 text-xs font-semibold bg-white text-black px-3 py-1.5 rounded-full">
                {facility.tag}
              </span>
              <button
                onClick={() => setLightbox(true)}
                aria-label="Open gallery"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <Expand className="w-4 h-4" />
              </button>

              {/* Image arrows */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                    className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => step(1)}
                    aria-label="Next image"
                    className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              <span className="absolute bottom-5 left-5 text-xs font-semibold text-white tabular-nums">
                {imgIdx + 1} / {images.length} photos
              </span>
            </div>

            {/* Sub images */}
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-3">
              {images.map((src, i) => (
                <button
                  key={`${activeId}-${src}-${i}`}
                  onClick={() => setImgIdx(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    i === imgIdx ? 'ring-2 ring-black ring-offset-2' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: office details ── */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="h-full rounded-3xl bg-neutral-50 border border-black/10 p-6 sm:p-8 flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45">{facility.location}</p>
                  <span className="text-xs font-semibold text-black/40 tabular-nums">
                    {String(officeIdx + 1).padStart(2, '0')} / {String(FACILITIES.length).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight leading-tight">{facility.title}</h3>
                <p className="mt-4 text-sm text-black/60 leading-relaxed">{facility.description}</p>

                <div className="mt-7 space-y-3">
                  {[
                    { icon: MapPin, label: 'Address', value: facility.address },
                    { icon: Phone, label: 'Phone', value: facility.phone, href: `tel:${facility.phone}` },
                    { icon: Mail, label: 'Email', value: facility.email, href: `mailto:${facility.email}` },
                  ].filter((row) => row.value).map(({ icon: Icon, label, value, href }) => {
                    const content = (
                      <>
                        <span className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center shrink-0 group-hover/row:bg-black group-hover/row:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs text-black/45">{label}</span>
                          <span className="block text-sm font-semibold leading-snug break-words">{value}</span>
                        </span>
                      </>
                    );
                    return href ? (
                      <a key={label} href={href} className="group/row flex items-center gap-4">{content}</a>
                    ) : (
                      <div key={label} className="group/row flex items-center gap-4">{content}</div>
                    );
                  })}
                </div>

                <div className="mt-auto pt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.address || facility.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-neutral-800 transition-colors"
                  >
                    Get directions
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                  </a>
                  <button
                    onClick={() => setLightbox(true)}
                    className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full border border-black/15 hover:border-black transition-colors cursor-pointer"
                  >
                    View gallery
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
            onClick={() => setLightbox(false)}
          >
            <div className="flex items-center justify-between px-5 sm:px-8 py-5 text-white" onClick={(e) => e.stopPropagation()}>
              <div>
                <p className="text-sm font-semibold">{facility.title}</p>
                <p className="text-xs text-white/50 tabular-nums">{imgIdx + 1} / {images.length}</p>
              </div>
              <button
                onClick={() => setLightbox(false)}
                aria-label="Close gallery"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 relative flex items-center justify-center px-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-3 sm:left-8 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <AnimatePresence mode="wait">
                <motion.div
                  key={imgIdx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full max-w-5xl aspect-[4/3] max-h-[72vh]"
                >
                  <Image src={images[imgIdx]} alt={facility.title} fill sizes="(max-width: 1024px) 100vw, 1000px" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              <button
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-3 sm:right-8 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2 px-6 py-5 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
              {images.map((src, i) => (
                <button
                  key={`lb-${src}-${i}`}
                  onClick={() => setImgIdx(i)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 cursor-pointer border-2 transition-all ${
                    i === imgIdx ? 'border-white' : 'border-transparent opacity-50 hover:opacity-90'
                  }`}
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
