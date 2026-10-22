'use client';

/**
 * AdminProductForm — Full-featured product creation / editing modal
 * Used by the Admin Products page to add/edit products.
 * Matches the screenshot from https://faiqfyp.vercel.app admin portal.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X, Loader2, Check, AlertCircle, Upload, Plus, Minus, Trash2,
  Palette, Layers, Tag, ShoppingBag, ImageIcon, Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── Preset colour palette (50 common apparel colours) ────────────────────────
const COLOUR_PALETTE = [
  { name: 'Black',        hex: '#0a0a0a' },
  { name: 'White',        hex: '#f8f8f8' },
  { name: 'Navy',         hex: '#1e3a5f' },
  { name: 'Royal Blue',   hex: '#1D4ED8' },
  { name: 'Sky Blue',     hex: '#7dd3fc' },
  { name: 'Teal',         hex: '#0d9488' },
  { name: 'Forest Green', hex: '#1E4D2B' },
  { name: 'Olive',        hex: '#6b7c41' },
  { name: 'Lime',         hex: '#84cc16' },
  { name: 'Yellow',       hex: '#facc15' },
  { name: 'Gold',         hex: '#ca8a04' },
  { name: 'Orange',       hex: '#f97316' },
  { name: 'Red',          hex: '#dc2626' },
  { name: 'Burgundy',     hex: '#6B1D2F' },
  { name: 'Maroon',       hex: '#7f1d1d' },
  { name: 'Pink',         hex: '#f472b6' },
  { name: 'Rose',         hex: '#fb7185' },
  { name: 'Purple',       hex: '#9333ea' },
  { name: 'Lavender',     hex: '#c4b5fd' },
  { name: 'Indigo',       hex: '#4338ca' },
  { name: 'Charcoal',     hex: '#374151' },
  { name: 'Grey',         hex: '#9ca3af' },
  { name: 'Silver',       hex: '#d1d5db' },
  { name: 'Taupe',        hex: '#6E645A' },
  { name: 'Sand',         hex: '#d4b896' },
  { name: 'Camel',        hex: '#c19a6b' },
  { name: 'Khaki',        hex: '#c3b091' },
  { name: 'Cream',        hex: '#fffdd0' },
  { name: 'Off White',    hex: '#faf9f6' },
  { name: 'Brown',        hex: '#92400e' },
];

const DEFAULT_TECHNIQUES = [
  { id: 'screen_print', label: 'Screen Print',   surcharge: 1.50 },
  { id: 'puff_print',   label: '3D Puff Print',  surcharge: 2.50 },
  { id: 'embroidery',   label: 'Embroidery',     surcharge: 3.50 },
  { id: 'sublimation',  label: 'Sublimation',    surcharge: 2.00 },
  { id: 'dtg',          label: 'DTG Print',      surcharge: 2.00 },
  { id: 'heat_transfer',label: 'Heat Transfer',  surcharge: 1.80 },
];

const DEFAULT_PLACEMENTS = [
  { id: 'front_chest',  label: 'Front Chest',  surcharge: 2.50 },
  { id: 'back',         label: 'Back',         surcharge: 3.00 },
  { id: 'left_sleeve',  label: 'Left Sleeve',  surcharge: 1.50 },
  { id: 'right_sleeve', label: 'Right Sleeve', surcharge: 1.50 },
  { id: 'left_chest',   label: 'Left Chest',   surcharge: 2.00 },
  { id: 'neck_label',   label: 'Neck Label',   surcharge: 1.00 },
];

const SIZES_LIST = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

// ─── Section Header helper ─────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, action }) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-neutral-800 mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-3.5 w-3.5 text-neutral-500" />}
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">{title}</span>
      </div>
      {action}
    </div>
  );
}

// ─── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, children, className }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-3 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-colors';
const selectCls = `${inputCls} cursor-pointer appearance-none`;

// ═══════════════════════════════════════════════════════════════════════════════
export default function AdminProductForm({
  mode,        // 'create' | 'edit'
  initialData, // product object when editing
  categories,
  onSubmit,
  onCancel,
  submitting,
  formError,
  formSuccess,
  uploading,
  onImageUpload,
}) {
  // ── Basic Info ──────────────────────────────────────────────────────────────
  const [name,            setName]            = useState('');
  const [slug,            setSlug]            = useState('');
  const [sku,             setSku]             = useState('');
  const [description,     setDescription]     = useState('');
  const [category,        setCategory]        = useState('');
  const [subcategory,     setSubcategory]     = useState('');
  const [minOrderQty,     setMinOrderQty]     = useState(20);
  const [origin,          setOrigin]          = useState('Sialkot, PK');
  const [status,          setStatus]          = useState('active');
  const [featured,        setFeatured]        = useState(false);
  const [images,          setImages]          = useState([]);
  const [imageUrlInput,   setImageUrlInput]   = useState('');

  // ── Specifications ──────────────────────────────────────────────────────────
  const [gsm,             setGsm]             = useState('200');
  const [material,        setMaterial]        = useState('');
  const [sizing,          setSizing]          = useState('XS - 2XL');
  const [customizationSpec, setCustomizationSpec] = useState('');

  // ── Tiered Pricing ──────────────────────────────────────────────────────────
  const [samplePrice,     setSamplePrice]     = useState(40);
  const [sampleRange,     setSampleRange]     = useState('10-20');
  const [lowPrice,        setLowPrice]        = useState(30);
  const [lowRange,        setLowRange]        = useState('21-30');
  const [midPrice,        setMidPrice]        = useState(20);
  const [midRange,        setMidRange]        = useState('31-50');
  const [highPrice,       setHighPrice]       = useState(15);
  const [highRange,       setHighRange]       = useState('51+');

  // ── Colours ─────────────────────────────────────────────────────────────────
  const [colors,          setColors]          = useState([]);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [customHex,       setCustomHex]       = useState('#000000');
  const [customColorName, setCustomColorName] = useState('');

  // ── Techniques & Placements ─────────────────────────────────────────────────
  const [techniques,      setTechniques]      = useState(DEFAULT_TECHNIQUES);
  const [placements,      setPlacements]      = useState(DEFAULT_PLACEMENTS);

  // Upload via the parent handler, then add the returned URLs to the gallery
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ''; // allow re-selecting the same file
    const urls = await onImageUpload(files);
    if (urls?.length) setImages(prev => [...prev, ...urls]);
  };

  // Populate form when editing
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name || '');
      setSlug(initialData.slug || '');
      setSku(initialData.sku || '');
      setDescription(initialData.description || '');
      setCategory(initialData.category?._id || initialData.category || '');
      setSubcategory(initialData.subcategory?._id || initialData.subcategory || '');
      setMinOrderQty(initialData.minOrderQuantity || 20);
      setOrigin(initialData.origin || 'Sialkot, PK');
      setStatus(initialData.status || 'active');
      setFeatured(initialData.featured || false);
      setImages(initialData.images || []);
      const sp = initialData.specifications || {};
      setGsm(sp.gsm || '200');
      setMaterial(sp.material || '');
      setSizing(sp.sizing || 'XS - 2XL');
      setCustomizationSpec(sp.customization || '');
      const tp = initialData.tieredPricing || {};
      setSamplePrice(tp.sample?.price || 40);
      setSampleRange(tp.sample?.range || '10-20');
      setLowPrice(tp.lowVolume?.price || 30);
      setLowRange(tp.lowVolume?.range || '21-30');
      setMidPrice(tp.midVolume?.price || 20);
      setMidRange(tp.midVolume?.range || '31-50');
      setHighPrice(tp.highVolume?.price || 15);
      setHighRange(tp.highVolume?.range || '51+');
      setColors(initialData.colors?.length ? initialData.colors : []);
      setTechniques(initialData.techniques?.length ? initialData.techniques : DEFAULT_TECHNIQUES);
      setPlacements(initialData.placements?.length ? initialData.placements : DEFAULT_PLACEMENTS);
    } else {
      // Reset for create
      setName(''); setSlug(''); setSku(''); setDescription('');
      setCategory(''); setSubcategory(''); setMinOrderQty(20);
      setOrigin('Sialkot, PK'); setStatus('active'); setFeatured(false);
      setImages([]); setGsm('200'); setMaterial(''); setSizing('XS - 2XL');
      setCustomizationSpec(''); setSamplePrice(40); setSampleRange('10-20');
      setLowPrice(30); setLowRange('21-30'); setMidPrice(20); setMidRange('31-50');
      setHighPrice(15); setHighRange('51+'); setColors([]);
      setTechniques(DEFAULT_TECHNIQUES); setPlacements(DEFAULT_PLACEMENTS);
    }
  }, [mode, initialData]);

  // Auto-generate slug
  useEffect(() => {
    if (mode === 'create') {
      setSlug(name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'));
    }
  }, [name, mode]);

  // ── Colour handlers ──────────────────────────────────────────────────────────
  const addColor = useCallback((hex, colorName) => {
    if (colors.some(c => c.hex === hex)) return;
    setColors(prev => [...prev, { name: colorName, hex, image: images[0] || '/active-wear.png' }]);
  }, [colors, images]);

  const removeColor = useCallback((idx) => {
    setColors(prev => prev.filter((_, i) => i !== idx));
  }, []);

  // ── Technique / Placement surcharge handler ──────────────────────────────────
  const updateTechniqueSurcharge = useCallback((id, surcharge) => {
    setTechniques(prev => prev.map(t => t.id === id ? { ...t, surcharge: parseFloat(surcharge) || 0 } : t));
  }, []);

  const updatePlacementSurcharge = useCallback((id, surcharge) => {
    setPlacements(prev => prev.map(p => p.id === id ? { ...p, surcharge: parseFloat(surcharge) || 0 } : p));
  }, []);

  // ── Image handlers ───────────────────────────────────────────────────────────
  const addImageUrl = useCallback(() => {
    if (!imageUrlInput.trim()) return;
    setImages(prev => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  }, [imageUrlInput]);

  const removeImage = useCallback((idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  }, []);

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name, slug, sku: sku || 'PROD-0000', description, images,
      category, subcategory: subcategory || null,
      minOrderQuantity: Number(minOrderQty) || 20,
      origin, featured, status,
      specifications: { gsm, material, sizing, customization: customizationSpec, origin },
      tieredPricing: {
        sample:     { price: Number(samplePrice), range: sampleRange },
        lowVolume:  { price: Number(lowPrice),    range: lowRange    },
        midVolume:  { price: Number(midPrice),    range: midRange    },
        highVolume: { price: Number(highPrice),   range: highRange   },
      },
      colors,
      techniques,
      placements,
    });
  };

  const subcategoryOptions = categories.filter(
    c => c.parentCategory?._id === category || c.parentCategory === category
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Alerts ──────────────────────────────────────────────────────────── */}
      {formError && (
        <div className="p-3.5 bg-red-950/20 border border-red-900/30 rounded-lg text-xs font-bold text-red-400 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" /><span>{formError}</span>
        </div>
      )}
      {formSuccess && (
        <div className="p-3.5 bg-green-950/20 border border-green-900/30 rounded-lg text-xs font-bold text-green-400 flex items-start gap-2">
          <Check className="h-4 w-4 flex-shrink-0 mt-0.5" /><span>{formSuccess}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — BASIC INFORMATION
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-4 space-y-4">
        <SectionHeader icon={Tag} title="Basic Information" />

        <Field label="Product Name">
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Premium Quality T-shirt"
            className={inputCls} disabled={submitting} required
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="SKU Number">
            <input
              type="text" value={sku} onChange={e => setSku(e.target.value)}
              placeholder="PROD-9707"
              className={`${inputCls} font-mono`} disabled={submitting}
            />
          </Field>
          <Field label="Slug Path">
            <input
              type="text" value={slug} onChange={e => setSlug(e.target.value)}
              placeholder="premium-quality-t-shirt"
              className={`${inputCls} font-mono`} disabled={submitting}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Main Category">
            <select value={category} onChange={e => { setCategory(e.target.value); setSubcategory(''); }} className={selectCls} disabled={submitting} required>
              <option value="">Select…</option>
              {categories.filter(c => !c.parentCategory).map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Subcategory">
            <select value={subcategory} onChange={e => setSubcategory(e.target.value)} className={selectCls} disabled={submitting || !category}>
              <option value="">None</option>
              {subcategoryOptions.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="MOQ (pcs)">
            <input type="number" value={minOrderQty} onChange={e => setMinOrderQty(e.target.value)} className={inputCls} disabled={submitting} />
          </Field>
          <Field label="Origin">
            <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Sialkot, PK" className={inputCls} disabled={submitting} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Status">
            <select value={status} onChange={e => setStatus(e.target.value)} className={selectCls} disabled={submitting}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archive">Archive</option>
            </select>
          </Field>
          <Field label="Featured">
            <button
              type="button"
              onClick={() => setFeatured(p => !p)}
              className={cn(
                'w-full py-2.5 px-3 rounded-lg border text-xs font-bold transition-colors cursor-pointer',
                featured ? 'bg-white text-black border-white' : 'bg-neutral-900/50 border-neutral-800 text-neutral-500 hover:border-neutral-600'
              )}
            >
              {featured ? '★ Featured' : 'Not Featured'}
            </button>
          </Field>
        </div>

        <Field label="Product Description">
          <textarea
            value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Full product description with technical specifications, fit notes…"
            rows={3} className={inputCls} disabled={submitting} required
          />
        </Field>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — TIERED PRICING
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-4 space-y-4">
        <SectionHeader icon={ShoppingBag} title="Tiered Volume Pricing" />
        <p className="text-xs text-neutral-500 -mt-2">
          Prices are per unit (USD). Quantity ranges should not overlap.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Sample Price', price: samplePrice, setPrice: setSamplePrice, range: sampleRange, setRange: setSampleRange, tier: 'SAMPLE' },
            { label: 'MOQ Price',    price: lowPrice,    setPrice: setLowPrice,    range: lowRange,    setRange: setLowRange,    tier: 'MOQ'    },
            { label: 'Volume Price', price: midPrice,    setPrice: setMidPrice,    range: midRange,    setRange: setMidRange,    tier: 'VOLUME' },
            { label: 'Bulk Price',   price: highPrice,   setPrice: setHighPrice,   range: highRange,   setRange: setHighRange,   tier: 'BULK'   },
          ].map(({ label, price, setPrice, range, setRange, tier }) => (
            <div key={tier} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-3 space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 block">{tier}</span>
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <span className="text-[10px] text-neutral-600 block mb-1">$ / unit</span>
                  <input type="number" step="0.01" min="0" value={price} onChange={e => setPrice(e.target.value)}
                    className="w-full bg-transparent border border-neutral-700 focus:border-neutral-500 rounded-md px-2 py-1.5 text-xs text-white font-mono outline-none" disabled={submitting} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-600 block mb-1">Range (pcs)</span>
                  <input type="text" value={range} onChange={e => setRange(e.target.value)} placeholder="e.g. 10-20"
                    className="w-full bg-transparent border border-neutral-700 focus:border-neutral-500 rounded-md px-2 py-1.5 text-xs text-white font-mono outline-none" disabled={submitting} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — PRODUCT SPECIFICATIONS
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-4 space-y-4">
        <SectionHeader icon={Settings} title="Product Specifications" />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Fabric / Material">
            <input type="text" value={material} onChange={e => setMaterial(e.target.value)}
              placeholder="100% Cotton / Poly-Cotton Blend"
              className={inputCls} disabled={submitting} />
          </Field>
          <Field label="Weight (GSM)">
            <input type="text" value={gsm} onChange={e => setGsm(e.target.value)}
              placeholder="200"
              className={`${inputCls} font-mono`} disabled={submitting} />
          </Field>
          <Field label="Sizing Range">
            <input type="text" value={sizing} onChange={e => setSizing(e.target.value)}
              placeholder="XS - 2XL"
              className={inputCls} disabled={submitting} />
          </Field>
          <Field label="Customization Notes">
            <input type="text" value={customizationSpec} onChange={e => setCustomizationSpec(e.target.value)}
              placeholder="Embroidery, Screen Printing…"
              className={inputCls} disabled={submitting} />
          </Field>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — AVAILABLE COLOURS
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-4 space-y-4">
        <SectionHeader icon={Palette} title="Available Colours" />

        {/* Selected colours chips */}
        {colors.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {colors.map((c, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-neutral-800 rounded-full pl-1 pr-2 py-1">
                <span className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: c.hex }} />
                <span className="text-xs text-neutral-300 font-medium">{c.name}</span>
                <button type="button" onClick={() => removeColor(idx)} className="text-neutral-600 hover:text-red-400 ml-1 transition-colors">
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Preset palette */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Click to add colour</p>
          <div className="flex flex-wrap gap-2">
            {COLOUR_PALETTE.map(c => {
              const selected = colors.some(x => x.hex === c.hex);
              return (
                <button
                  type="button"
                  key={c.hex}
                  onClick={() => selected ? removeColor(colors.findIndex(x => x.hex === c.hex)) : addColor(c.hex, c.name)}
                  title={c.name}
                  className={cn(
                    'w-6 h-6 rounded-full border-2 transition-all cursor-pointer hover:scale-110',
                    selected ? 'border-white scale-110 shadow-md' : 'border-neutral-700'
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        </div>

        {/* Custom hex input */}
        <div className="flex gap-2 items-end">
          <Field label="Custom Hex" className="flex-1">
            <div className="flex gap-2">
              <input type="color" value={customHex} onChange={e => setCustomHex(e.target.value)}
                className="h-9 w-12 rounded border border-neutral-700 bg-transparent cursor-pointer" />
              <input type="text" value={customColorName} onChange={e => setCustomColorName(e.target.value)}
                placeholder="Colour name…" className={`${inputCls} flex-1`} />
            </div>
          </Field>
          <button
            type="button"
            onClick={() => { if (customColorName) { addColor(customHex, customColorName); setCustomColorName(''); } }}
            className="mb-0.5 px-3 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-xs font-bold text-white uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
          >
            Add
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — CUSTOMISATION TECHNIQUES & PLACEMENTS
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-4 space-y-4">
        <SectionHeader icon={Layers} title="Customisation Options & Surcharges" />
        <p className="text-xs text-neutral-500 -mt-2">Set surcharge amounts per unit for each option. These appear on the product page for customers to select.</p>

        {/* Techniques */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Print / Embroidery Techniques</p>
          <div className="space-y-2">
            {techniques.map(t => (
              <div key={t.id} className="flex items-center gap-3">
                <span className="text-[13px] text-neutral-300 w-36 flex-shrink-0">{t.label}</span>
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-neutral-600 text-xs">+$</span>
                  <input
                    type="number" step="0.01" min="0" value={t.surcharge}
                    onChange={e => updateTechniqueSurcharge(t.id, e.target.value)}
                    className="w-20 bg-neutral-900 border border-neutral-700 focus:border-neutral-500 rounded-md px-2 py-1 text-xs text-white font-mono outline-none"
                    disabled={submitting}
                  />
                  <span className="text-neutral-600 text-xs">/ unit</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placements */}
        <div className="space-y-2 pt-2 border-t border-neutral-800">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 pt-2">Logo Placement Positions</p>
          <div className="space-y-2">
            {placements.map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-[13px] text-neutral-300 w-36 flex-shrink-0">{p.label}</span>
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-neutral-600 text-xs">+$</span>
                  <input
                    type="number" step="0.01" min="0" value={p.surcharge}
                    onChange={e => updatePlacementSurcharge(p.id, e.target.value)}
                    className="w-20 bg-neutral-900 border border-neutral-700 focus:border-neutral-500 rounded-md px-2 py-1 text-xs text-white font-mono outline-none"
                    disabled={submitting}
                  />
                  <span className="text-neutral-600 text-xs">/ unit</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — PRODUCT IMAGES
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-4 space-y-4">
        <SectionHeader icon={ImageIcon} title="Product Photos" />

        {/* Image grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((url, idx) => (
              <div key={idx} className="relative aspect-square bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button" onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/70 hover:bg-red-900 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1 left-1 text-[10px] font-bold bg-white/90 text-black px-1 rounded uppercase tracking-wider">Main</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Upload dropzone */}
        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-neutral-800 hover:border-neutral-600 bg-neutral-900/20 rounded-xl cursor-pointer transition-colors group">
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-5 w-5 text-neutral-400 animate-spin" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">Uploading…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-neutral-600 group-hover:text-neutral-400 transition-colors">
              <Upload className="h-5 w-5" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-center px-4">Click or drag images to upload</span>
              <span className="text-[10px] text-neutral-600">PNG, JPG, WEBP — First image is the primary product image</span>
            </div>
          )}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} disabled={uploading || submitting} />
        </label>

        {/* URL input */}
        <div className="flex gap-2">
          <input
            type="text" value={imageUrlInput} onChange={e => setImageUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
            placeholder="Or paste image URL…"
            className={`${inputCls} flex-1`} disabled={submitting}
          />
          <button
            type="button" onClick={addImageUrl}
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Add URL
          </button>
        </div>
      </div>

      {/* ── Submit button ────────────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={submitting || uploading}
        className="w-full bg-white hover:bg-neutral-100 disabled:bg-neutral-900 text-black disabled:text-neutral-600 font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        {submitting ? (
          <><Loader2 className="h-3.5 w-3.5 animate-spin" /><span>Saving…</span></>
        ) : (
          <><Check className="h-3.5 w-3.5" /><span>{mode === 'create' ? 'Publish Product' : 'Save Changes'}</span></>
        )}
      </button>
    </form>
  );
}
