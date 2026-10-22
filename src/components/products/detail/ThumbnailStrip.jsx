'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function ThumbnailStrip({ images, selectedImage, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onSelect(img)}
          className={cn(
            'w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-150 cursor-pointer bg-slate-100',
            selectedImage === img ? 'border-slate-900 ring-1 ring-slate-400 scale-105' : 'border-slate-200 hover:border-slate-400'
          )}
        >
          <img src={img} alt="" className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  );
}
