'use client';

import React from 'react';
import { Scissors, Layers, Upload, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomizationPanel({ mode, onModeChange, placements, techniques, selectedPlacements, selectedTechnique, onPlacementToggle, onTechniqueChange, onLogoUpload, uploadedLogo, onRemoveLogo }) {
  return (
    <div className="space-y-3 text-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Scissors className="w-3.5 h-3.5 text-slate-500" />
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Branding Options</p>
        </div>
        {mode === 'custom' && <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">+Surcharges Active</span>}
      </div>

      <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-[11px]">
        <button onClick={() => onModeChange('standard')} className={cn('py-2 px-3 rounded-lg font-semibold transition-all cursor-pointer', mode === 'standard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900')}>
          Standard Blank
        </button>
        <button onClick={() => onModeChange('custom')} className={cn('py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer', mode === 'custom' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900')}>
          <Layers className="w-3 h-3" /> Custom Branding
        </button>
      </div>

      {mode === 'custom' && (
        <div className="space-y-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 text-xs">

          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Upload Artwork</p>
            {uploadedLogo ? (
              <div className="flex items-center gap-3 p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-xl">
                <img src={uploadedLogo} alt="Logo" className="w-10 h-10 object-contain rounded-lg border border-slate-200 bg-white p-0.5" />
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-emerald-900">Artwork Overlay Active ✓</p>
                  <p className="text-[10px] text-emerald-700">Drag & scale on preview image</p>
                </div>
                <button onClick={onRemoveLogo} className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2.5 w-full border border-dashed border-slate-300 hover:border-slate-900 bg-white rounded-xl px-3.5 py-3 cursor-pointer transition-all group">
                <Upload className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                <span className="text-[11px] font-medium text-slate-700 group-hover:text-slate-900">Upload Logo Artwork (PNG, SVG)</span>
                <input type="file" accept="image/*,.svg,.pdf" className="hidden" onChange={onLogoUpload} />
              </label>
            )}
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">1. Placement(s)</p>
            <div className="grid grid-cols-2 gap-1">
              {placements.map(p => {
                const on = selectedPlacements.includes(p.id);
                return (
                  <button key={p.id} onClick={() => onPlacementToggle(p.id)} className={cn('flex items-center justify-between p-2 rounded-lg border text-[10px] font-medium transition-all cursor-pointer', on ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-800 border-slate-200/80 hover:border-slate-400')}>
                    <span>{p.label}</span>
                    <span className="font-mono text-[9px] opacity-75">+${p.surcharge.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">2. Printing / Embroidery Technique</p>
            <div className="grid grid-cols-2 gap-1">
              {techniques.map(t => {
                const on = selectedTechnique === t.id;
                return (
                  <button key={t.id} onClick={() => onTechniqueChange(t.id)} className={cn('flex items-center justify-between p-2 rounded-lg border text-[10px] font-medium transition-all cursor-pointer', on ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-800 border-slate-200/80 hover:border-slate-400')}>
                    <span>{t.label}</span>
                    <span className="font-mono text-[9px] opacity-75">+${t.surcharge.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
