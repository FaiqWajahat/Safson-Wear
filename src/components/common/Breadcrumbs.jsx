'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Breadcrumbs({ items = [], backHref, backLabel, className }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn('bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs mb-6 sticky top-0 z-30 font-sans', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
        
        {/* Breadcrumb Steps */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium flex-wrap">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const isHome = idx === 0;

            return (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                )}

                {isLast ? (
                  <span className="text-slate-900 font-bold text-[11px] truncate max-w-[280px]">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'transition-colors text-[11px] hover:text-slate-900',
                      isHome
                        ? 'inline-flex items-center gap-1 bg-slate-100/90 hover:bg-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-semibold'
                        : 'font-medium text-slate-600'
                    )}
                  >
                    {isHome && <Home className="w-3 h-3 text-slate-600" />}
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-600 font-medium text-[11px]">{item.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Optional Embedded Back Action */}
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1 transition-all shadow-2xs"
          >
            {backLabel || '← Back'}
          </Link>
        )}

      </div>
    </div>
  );
}
