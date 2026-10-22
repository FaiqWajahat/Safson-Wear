'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { PRODUCT_IMAGES } from '@/data/productImages.mjs';

const FALLBACK_RELATED = [
  {
    id: 'heavyweight-french-terry-pullover',
    sku: 'PROD-4500',
    name: 'Heavyweight French Terry Pullover',
    categoryName: 'Street Wear',
    categorySlug: 'street-wear',
    description: 'Ultra-heavy 450 GSM organic french terry cotton pullover featuring double-layer hood and drop-shoulder boxy fit.',
    image: PRODUCT_IMAGES['heavyweight-french-terry-pullover'][0],
    minOrderQuantity: 20,
    tieredPricing: { sample: { price: 42 } },
  },
  {
    id: 'vintage-acid-wash-heavyweight-street-tee',
    sku: 'PROD-1080',
    name: 'Vintage Acid-Wash Heavyweight Tee',
    categoryName: 'Street Wear',
    categorySlug: 'street-wear',
    description: '240 GSM combed ring-spun cotton heavyweight tee with handcrafted vintage acid wash finish.',
    image: PRODUCT_IMAGES['vintage-acid-wash-heavyweight-street-tee'][0],
    minOrderQuantity: 50,
    tieredPricing: { sample: { price: 25 } },
  },
  {
    id: 'sublimated-football-kit',
    sku: 'PROD-5010',
    name: 'Sublimated Football Kit',
    categoryName: 'Sports Wear',
    categorySlug: 'sports-wear',
    description: 'Fully sublimated football jersey and shorts set in lightweight 140 GSM polyester interlock.',
    image: PRODUCT_IMAGES['sublimated-football-kit'][0],
    minOrderQuantity: 15,
    tieredPricing: { sample: { price: 35 } },
  },
];

export default function RelatedProducts({ currentProduct, allProducts = [], onSelectProduct }) {
  const currentKey = (currentProduct?.sku || currentProduct?.slug || currentProduct?.id || '').toLowerCase();

  let candidates = (allProducts || []).filter(p => {
    const pKey = (p.sku || p.slug || p.id || '').toLowerCase();
    return pKey !== currentKey && p.name !== currentProduct?.name;
  });

  if (candidates.length < 3) {
    const existingSkus = new Set(candidates.map(c => c.sku || c.id));
    for (const fb of FALLBACK_RELATED) {
      if (!existingSkus.has(fb.sku) && (fb.sku || '').toLowerCase() !== currentKey) {
        candidates.push(fb);
        if (candidates.length >= 3) break;
      }
    }
  }

  const itemsToDisplay = candidates.slice(0, 3);

  return (
    <div className="mt-14 pt-10 border-t border-slate-200/80 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
            <span>Complementary Apparel Lines</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Related Manufacturing Products</h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-800 bg-white px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          Explore Full Catalog <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemsToDisplay.map((item, idx) => {
          const mainImg = item.images?.[0] || item.image || '/active-wear.png';
          const samplePrice = item.tieredPricing?.sample?.price || item.price || 35;
          const catName = item.categoryName || (item.category === 'sports-wear' ? 'Sports Wear' : 'Street Wear');
          const productSlug = item.slug || item.id || item.sku;

          return (
            <div
              key={item.sku || item.slug || idx}
              onClick={() => {
                if (onSelectProduct) {
                  onSelectProduct(item);
                } else if (typeof window !== 'undefined') {
                  window.location.href = `/products?category=${item.categorySlug || item.category || 'street-wear'}&product=${productSlug}`;
                }
              }}
              className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-900 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={mainImg}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider text-slate-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200 shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-slate-700" /> MOQ {item.minOrderQuantity || 20} pcs
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col flex-1 text-slate-900">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    {catName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-medium">SKU: {item.sku || 'PROD'}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-600 transition-colors line-clamp-1 mb-1.5">
                  {item.name}
                </h3>
                <p className="text-slate-500 text-xs line-clamp-2 mb-4 font-normal leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-mono block">Sample Tier</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">${samplePrice} <span className="text-[10px] font-normal text-slate-500">/ unit</span></span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    View Line Specs <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
