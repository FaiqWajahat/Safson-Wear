'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const IMAGES = [
  { src: '/step-qc-dispatch.png', caption: 'Main production floor', span: 'md:col-span-2 md:row-span-2' },
  { src: '/step-design.png', caption: 'Design & tech pack studio', span: '' },
  { src: '/step-fabric.png', caption: 'Fabric & lab dip room', span: '' },
  { src: '/about-hero-new.jpg', caption: 'Pattern cutting tables', span: '' },
  { src: '/capability-patterning.png', caption: 'CLO3D sampling', span: '' },
  { src: '/why-us.png', caption: 'Stitching hall', span: 'md:row-span-2' },
  { src: '/why-us-dispatch.png', caption: 'Packing & dispatch', span: 'md:col-span-2' },
];

export default function FactoryGallery() {
  const [open, setOpen] = useState(null); // index of image in lightbox

  const step = useCallback(
    (dir) => setOpen((i) => (i === null ? i : (i + dir + IMAGES.length) % IMAGES.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  return (
    <section className="py-20 sm:py-28 bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Inside our Sialkot plant"
          title="Factory floor"
          muted="lookbook."
          description="A look around the departments where your collection is designed, cut, stitched, and packed."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4">
          {IMAGES.map((img, idx) => (
            <motion.button
              key={img.src}
              onClick={() => setOpen(idx)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className={`group relative rounded-3xl overflow-hidden bg-neutral-900 text-left cursor-pointer ${img.span}`}
              aria-label={`Open photo: ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-4 left-4 right-14 text-sm font-semibold">{img.caption}</span>
              <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <Expand className="w-4 h-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
            onClick={() => setOpen(null)}
          >
            <div className="flex items-center justify-between px-5 sm:px-8 py-5" onClick={(e) => e.stopPropagation()}>
              <div>
                <p className="text-sm font-semibold">{IMAGES[open].caption}</p>
                <p className="text-xs text-white/50 tabular-nums">{open + 1} / {IMAGES.length}</p>
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close gallery"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 relative flex items-center justify-center px-4 sm:px-20 pb-8" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-8 w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="relative w-full max-w-5xl h-full max-h-[75vh]">
                <Image src={IMAGES[open].src} alt={IMAGES[open].caption} fill sizes="(max-width: 1024px) 100vw, 1000px" className="object-contain" />
              </div>
              <button
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-3 sm:right-8 w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
