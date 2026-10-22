'use client';

import React from 'react';
import { ShieldCheck, Package, Award, Globe, Star, Clock } from 'lucide-react';

export default function SpecsCard({ product }) {
  const items = [
    { icon: Package,     label: 'GSM',      value: product.specifications?.gsm      || '200' },
    { icon: Award,       label: 'Material', value: product.specifications?.material  || '100% Cotton' },
    { icon: Globe,       label: 'Origin',   value: product.specifications?.origin    || 'Sialkot, PK' },
    { icon: Star,        label: 'Sizing',   value: product.specifications?.sizing    || 'XS – 3XL' },
    { icon: Clock,       label: 'MOQ',      value: `${product.minOrderQuantity || 10} pcs` },
    { icon: ShieldCheck, label: 'Print',    value: product.specifications?.customization?.split(',')[0] || 'Screen Print' },
  ];
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs text-slate-900 space-y-3">
      <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Technical Specifications</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-3 h-3 text-slate-500" />
            </div>
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
              <p className="text-[11px] font-bold text-slate-800 leading-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
