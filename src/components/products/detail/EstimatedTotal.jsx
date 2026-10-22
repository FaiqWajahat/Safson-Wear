'use client';

import React from 'react';

export default function EstimatedTotal({ totalUnits, tier, placementSurcharge, techniqueSurcharge, customMode }) {
  const unitPrice = tier.price + (customMode === 'custom' ? placementSurcharge + techniqueSurcharge : 0);
  const total = (totalUnits * unitPrice).toFixed(2);
  return (
    <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg border border-slate-800">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">Estimated Order Investment</p>
          <div className="space-y-0.5 text-xs">
            <p className="text-slate-300">Total Volume: <strong className="text-white font-semibold">{totalUnits} units</strong></p>
            <p className="text-slate-300">Base Tier: <span className="text-slate-200">{tier.label} (${tier.price}/unit)</span></p>
            {customMode === 'custom' && (placementSurcharge + techniqueSurcharge) > 0 && (
              <p className="text-emerald-400 font-medium">Customization: +${(placementSurcharge + techniqueSurcharge).toFixed(2)}/unit</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-mono">${unitPrice.toFixed(2)} / unit</p>
          <p className="text-3xl font-bold tracking-tight text-white">${total}</p>
        </div>
      </div>
    </div>
  );
}
