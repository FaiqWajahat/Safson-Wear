'use client';

import React, { useState } from 'react';
import { FileText, X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const SIZING_GUIDE_TOPS = [
  { size: 'XS',  chest: '34-36"', length: '27"', sleeve: '32"' },
  { size: 'S',   chest: '36-38"', length: '28"', sleeve: '33"' },
  { size: 'M',   chest: '38-40"', length: '29"', sleeve: '34"' },
  { size: 'L',   chest: '40-42"', length: '30"', sleeve: '35"' },
  { size: 'XL',  chest: '42-44"', length: '31"', sleeve: '36"' },
  { size: '2XL', chest: '44-46"', length: '32"', sleeve: '37"' },
  { size: '3XL', chest: '46-48"', length: '33"', sleeve: '38"' },
];

const SIZING_GUIDE_BOTTOMS = [
  { size: 'XS',  waist: '26-28"', hip: '32-34"', inseam: '29"' },
  { size: 'S',   waist: '28-30"', hip: '34-36"', inseam: '30"' },
  { size: 'M',   waist: '30-32"', hip: '36-38"', inseam: '31"' },
  { size: 'L',   waist: '32-34"', hip: '38-40"', inseam: '32"' },
  { size: 'XL',  waist: '34-36"', hip: '40-42"', inseam: '33"' },
  { size: '2XL', waist: '36-38"', hip: '42-44"', inseam: '34"' },
  { size: '3XL', waist: '38-40"', hip: '44-46"', inseam: '35"' },
];

export default function SizeGuideCard({ customSpecFile, onCustomSpecUpload, onRemoveCustomSpec }) {
  const [isCm, setIsCm] = useState(false);
  const [activeTab, setActiveTab] = useState('tops');

  const convertToCm = (valStr) => {
    if (!valStr) return '—';
    const nums = valStr.replace(/"/g, '').split('-').map(n => parseFloat(n.trim()));
    if (nums.some(isNaN)) return valStr;
    const cms = nums.map(n => Math.round(n * 2.54));
    return cms.length > 1 ? `${cms[0]}-${cms[1]} cm` : `${cms[0]} cm`;
  };

  const rows = activeTab === 'tops' ? SIZING_GUIDE_TOPS : SIZING_GUIDE_BOTTOMS;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-slate-900 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Garment Sizing Specifications</h3>
          <p className="text-[10px] text-slate-500 font-medium">Standard EU/US Body Measurements</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px]">
            <button onClick={() => setActiveTab('tops')} className={cn('px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer', activeTab === 'tops' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500')}>Tops</button>
            <button onClick={() => setActiveTab('bottoms')} className={cn('px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer', activeTab === 'bottoms' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500')}>Bottoms</button>
          </div>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px]">
            <button onClick={() => setIsCm(false)} className={cn('px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer', !isCm ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500')}>Inches</button>
            <button onClick={() => setIsCm(true)} className={cn('px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer', isCm ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500')}>cm</button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-sans">
          <thead>
            <tr className="border-b border-slate-200/80 text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/60">
              <th className="py-2.5 px-3">Size</th>
              {activeTab === 'tops' ? (
                <>
                  <th className="py-2.5 px-3">Chest</th>
                  <th className="py-2.5 px-3">Length</th>
                  <th className="py-2.5 px-3">Sleeve</th>
                </>
              ) : (
                <>
                  <th className="py-2.5 px-3">Waist</th>
                  <th className="py-2.5 px-3">Hip</th>
                  <th className="py-2.5 px-3">Inseam</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {rows.map(row => (
              <tr key={row.size} className="hover:bg-slate-50/60 transition-colors text-[11px]">
                <td className="py-2 px-3 font-bold text-slate-900">{row.size}</td>
                {activeTab === 'tops' ? (
                  <>
                    <td className="py-2 px-3">{isCm ? convertToCm(row.chest) : row.chest}</td>
                    <td className="py-2 px-3">{isCm ? convertToCm(row.length) : row.length}</td>
                    <td className="py-2 px-3">{isCm ? convertToCm(row.sleeve) : row.sleeve}</td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-3">{isCm ? convertToCm(row.waist) : row.waist}</td>
                    <td className="py-2 px-3">{isCm ? convertToCm(row.hip) : row.hip}</td>
                    <td className="py-2 px-3">{isCm ? convertToCm(row.inseam) : row.inseam}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Custom Brand Spec Sheet (Optional)</span>
          <span className="text-[9px] text-slate-400">PDF, XLS, PNG</span>
        </div>

        {customSpecFile ? (
          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-slate-700 flex-shrink-0" />
              <span className="font-semibold text-slate-800 truncate max-w-[220px]">{customSpecFile.name}</span>
              <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Attached ✓</span>
            </div>
            <button onClick={onRemoveCustomSpec} className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 hover:border-slate-800 bg-slate-50/50 hover:bg-white rounded-xl py-2.5 px-3 cursor-pointer transition-all text-xs font-medium text-slate-600">
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Upload Your Custom Size Chart / Tech Pack</span>
            <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" className="hidden" onChange={onCustomSpecUpload} />
          </label>
        )}
      </div>
    </div>
  );
}
