'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export default function QuantityRangeSelector({ tieredPricing, onQuantityChange }) {
  const tiers = [
    { key: 'sample',     label: 'Sample',  min: 10, max: 20,  price: tieredPricing?.sample?.price    || 40 },
    { key: 'lowVolume',  label: 'MOQ',     min: 21, max: 50,  price: tieredPricing?.lowVolume?.price  || 30 },
    { key: 'midVolume',  label: 'Volume',  min: 51, max: 100, price: tieredPricing?.midVolume?.price  || 20 },
    { key: 'highVolume', label: 'Bulk',    min: 101,max: 500, price: tieredPricing?.highVolume?.price || 15 },
  ];
  const [selectedRange, setSelectedRange] = useState('sample');
  const [customQty, setCustomQty] = useState(10);

  const currentTier = tiers.find(t => t.key === selectedRange) || tiers[0];

  const handleRangeSelect = (tier) => {
    setSelectedRange(tier.key);
    setCustomQty(tier.min);
    onQuantityChange(tier.min);
  };

  const handleSliderChange = (val) => {
    setCustomQty(val);
    onQuantityChange(val);
  };

  return (
    <div className="space-y-3 text-slate-900">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Order Quantity Volume</p>

      <div className="grid grid-cols-4 gap-1.5">
        {tiers.map(tier => (
          <button
            key={tier.key}
            onClick={() => handleRangeSelect(tier)}
            className={cn(
              'py-2 px-1 rounded-lg text-center border transition-all cursor-pointer text-[10px]',
              selectedRange === tier.key
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-semibold'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 font-medium'
            )}
          >
            <div className="text-[8px] uppercase tracking-wider opacity-80">{tier.label}</div>
            <div className="font-mono mt-0.5">{tier.min}–{tier.max === 500 ? '500+' : tier.max}</div>
          </button>
        ))}
      </div>

      <div className="border border-slate-200 rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-600">Quantity: <strong className="text-slate-900 font-bold ml-1">{customQty} units</strong></span>
          <span className="font-mono text-emerald-700 font-semibold">${currentTier.price}/unit · Subtotal: ${(customQty * currentTier.price).toFixed(0)}</span>
        </div>
        <input
          type="range"
          min={currentTier.min}
          max={Math.min(currentTier.max, 500)}
          value={customQty}
          onChange={e => handleSliderChange(parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-slate-900"
        />
      </div>
    </div>
  );
}
