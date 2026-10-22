'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SectionHeading from '@/components/home/SectionHeading';
import { FEATURED_PRODUCTS } from '@/data/featuredProducts';

import 'swiper/css';

// `products` comes from the home page with live images from the database
export default function ExclusiveProductsCarousel({ products: PRODUCTS = FEATURED_PRODUCTS }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-20 sm:py-28 bg-white text-black font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Featured"
          title="Popular products"
          muted="ready for your label."
          href="/products"
          linkLabel="View all"
        />

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
          breakpoints={{
            540:  { slidesPerView: 2,   spaceBetween: 20 },
            1024: { slidesPerView: 3,   spaceBetween: 24 },
            1280: { slidesPerView: 3.6, spaceBetween: 24 },
          }}
          className="overflow-visible!"
        >
          {PRODUCTS.map((p) => (
            <SwiperSlide key={p.id}>
              <Link
                href={`/products?category=${p.categorySlug}&sub=${p.subSlug}&product=${p.id}`}
                className="group block select-none"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 540px) 85vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-semibold bg-white text-black px-3 py-1.5 rounded-full">{p.category}</span>
                    <span className="text-xs font-semibold bg-black text-white px-3 py-1.5 rounded-full">MOQ {p.moq}</span>
                  </div>

                  {/* Hover action */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-[calc(100%+1rem)] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="flex items-center justify-between bg-white/95 backdrop-blur-md text-black rounded-full pl-5 pr-1.5 py-1.5 shadow-lg">
                      <span className="text-sm font-semibold">View details</span>
                      <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="mt-5 text-base font-semibold leading-snug">{p.name}</h3>
                <p className="mt-1 text-sm text-black/50">{p.detail}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-5">
          <span className="text-sm font-semibold tabular-nums">
            {String(current + 1).padStart(2, '0')}
            <span className="text-black/30"> / {String(PRODUCTS.length).padStart(2, '0')}</span>
          </span>
          <div className="relative flex-1 h-0.5 rounded-full bg-black/10 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-black rounded-full transition-[width] duration-500"
              style={{ width: `${((current + 1) / PRODUCTS.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              ref={prevRef}
              aria-label="Previous product"
              className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              ref={nextRef}
              aria-label="Next product"
              className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
