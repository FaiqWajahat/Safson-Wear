'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function ColourSwatches({ colors, selected, onSelect }) {
  return (
    <div className="space-y-2 text-slate-900">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Colorway — <span className="text-slate-900 font-bold">{colors[selected]?.name}</span>
        </p>
        <span className="text-[9px] text-slate-400 uppercase font-mono">{colors.length} Colorways</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {colors.map((c, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            title={c.name}
            style={{ backgroundColor: c.hex }}
            className={cn(
              'w-7 h-7 rounded-full border transition-all duration-150 cursor-pointer shadow-xs',
              selected === i
                ? 'border-slate-900 ring-2 ring-slate-400 ring-offset-2 scale-105'
                : 'border-slate-300 hover:scale-105 hover:border-slate-500'
            )}
          />
        ))}
      </div>
    </div>
  );
}
