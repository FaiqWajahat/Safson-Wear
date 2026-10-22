'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function PricingTiers({ tieredPricing, activeTierKey }) {
  const tiers = [
    { key: 'sample',     label: 'Sample', price: tieredPricing?.sample?.price    || 40, range: tieredPricing?.sample?.range    || '10-20' },
    { key: 'lowVolume',  label: 'MOQ',    price: tieredPricing?.lowVolume?.price  || 30, range: tieredPricing?.lowVolume?.range  || '21-30' },
    { key: 'midVolume',  label: 'Volume', price: tieredPricing?.midVolume?.price  || 20, range: tieredPricing?.midVolume?.range  || '31-50' },
    { key: 'highVolume', label: 'Bulk',   price: tieredPricing?.highVolume?.price || 15, range: tieredPricing?.highVolume?.range || '51+'   },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Volume Pricing Tiers</p>
        <span className="text-[9px] text-slate-400 uppercase font-mono">USD / Unit</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {tiers.map(tier => {
          const active = activeTierKey === tier.key;
          return (
            <div key={tier.key} className={cn(
              'rounded-xl p-3 text-center border transition-all duration-200',
              active
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-50/60 text-slate-900 border-slate-200/80 hover:border-slate-300'
            )}>
              <div className={cn('text-[9px] font-medium uppercase tracking-wider mb-1', active ? 'text-slate-400' : 'text-slate-400')}>{tier.label}</div>
              <div className={cn('text-lg font-bold tracking-tight', active ? 'text-white' : 'text-slate-900')}>${tier.price}</div>
              <div className={cn('text-[9px] font-mono mt-0.5', active ? 'text-slate-300' : 'text-slate-500')}>{tier.range} pcs</div>
              {active && <div className="mt-1 text-[8px] font-semibold text-emerald-400 uppercase tracking-wider">● Active</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
