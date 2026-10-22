'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

export default function SizeMatrix({ quantities, onChange }) {
  const total = Object.values(quantities).reduce((s, v) => s + (v || 0), 0);
  return (
    <div className="space-y-2 text-slate-900">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Size Breakdown</p>
        {total > 0 && <span className="text-[10px] font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full">{total} pcs</span>}
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
        {SIZES.map(size => (
          <div key={size} className={cn('rounded-xl border transition-all', quantities[size] > 0 ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900')}>
            <div className={cn('text-center text-[10px] font-bold uppercase pt-1.5 pb-0.5', quantities[size] > 0 ? 'text-white' : 'text-slate-800')}>{size}</div>
            <div className="flex items-center justify-center gap-0.5 pb-1.5 px-1">
              <button onClick={() => onChange(size, -1)} className={cn('w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer', quantities[size] > 0 ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-100')}>
                <Minus className="w-2.5 h-2.5" />
              </button>
              <input
                type="number" min="0"
                value={quantities[size] || 0}
                onChange={e => onChange(size, parseInt(e.target.value || '0') - (quantities[size] || 0))}
                className={cn('w-6 text-center text-[10px] font-bold bg-transparent outline-none font-mono', quantities[size] > 0 ? 'text-white' : 'text-slate-900')}
              />
              <button onClick={() => onChange(size, 1)} className={cn('w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer', quantities[size] > 0 ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-100')}>
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
