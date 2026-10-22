'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck, Check, ArrowRight, Layers, Package, Scissors, Globe, Clock, Loader2, Home, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

import Breadcrumbs from '@/components/common/Breadcrumbs';

/* ─── Modular Sub-Components ─────────────────────────────────────────────────── */
import MockupStudio          from './detail/MockupStudio';
import ThumbnailStrip        from './detail/ThumbnailStrip';
import SpecsCard             from './detail/SpecsCard';
import SizeGuideCard         from './detail/SizeGuideCard';
import PricingTiers          from './detail/PricingTiers';
import QuantityRangeSelector from './detail/QuantityRangeSelector';
import SizeMatrix            from './detail/SizeMatrix';
import ColourSwatches        from './detail/ColourSwatches';
import CustomizationPanel    from './detail/CustomizationPanel';
import EstimatedTotal        from './detail/EstimatedTotal';
import OrderReviewModal      from './detail/OrderReviewModal';
import RelatedProducts       from './detail/RelatedProducts';

/* ─── Default Fallbacks ───────────────────────────────────────────────────────── */
const DEFAULT_PLACEMENTS = [
  { id: 'front_chest',  label: 'Front Chest',  surcharge: 2.50 },
  { id: 'back',         label: 'Back',         surcharge: 3.00 },
  { id: 'left_sleeve',  label: 'Left Sleeve',  surcharge: 1.50 },
  { id: 'right_sleeve', label: 'Right Sleeve', surcharge: 1.50 },
  { id: 'left_chest',   label: 'Left Chest',   surcharge: 2.00 },
  { id: 'neck_label',   label: 'Neck Label',   surcharge: 1.00 },
];

const DEFAULT_TECHNIQUES = [
  { id: 'screen_print', label: 'Screen Printing', surcharge: 1.50 },
  { id: 'puff_print',   label: '3D Puff Print',   surcharge: 2.50 },
  { id: 'embroidery',   label: 'Embroidery',       surcharge: 3.50 },
  { id: 'sublimation',  label: 'Sublimation',      surcharge: 2.00 },
  { id: 'dtg',          label: 'DTG Print',        surcharge: 2.00 },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

const DEFAULT_PRODUCT = {
  name: 'Premium Quality T-Shirt',
  sku: 'PROD-9707',
  categoryName: 'Street Wear',
  categorySlug: 'street-wear',
  description: 'Engineered from 200 GSM high-density combed cotton blend, designed for structured silhouette retention and high-durability B2B private labelling.',
  images: ['/active-wear.png', '/team-wear.png', '/hero.png'],
  specifications: { gsm: '200', material: '60% Cotton / 40% Poly Blend', sizing: 'XS – 3XL', customization: 'Embroidery, Screen Printing, 3D Puff Print', origin: 'Sialkot, PK' },
  tieredPricing: {
    sample:    { price: 40, range: '10-20' },
    lowVolume: { price: 30, range: '21-30' },
    midVolume: { price: 20, range: '31-50' },
    highVolume:{ price: 15, range: '51+'   },
  },
  colors: [
    { name: 'Forest Green', hex: '#1E4D2B', image: '/active-wear.png' },
    { name: 'Royal Blue',   hex: '#1D4ED8', image: '/team-wear.png'   },
    { name: 'Pure White',   hex: '#F8FAFC', image: '/hero.png'        },
    { name: 'Jet Black',    hex: '#0a0a0a', image: '/active-wear.png' },
  ],
  placements: DEFAULT_PLACEMENTS,
  techniques: DEFAULT_TECHNIQUES,
  minOrderQuantity: 10,
};

function getActiveTier(total, tp) {
  const tiers = [
    { key: 'sample',     label: 'SAMPLE',  price: tp?.sample?.price    || 40, range: tp?.sample?.range    || '10-20' },
    { key: 'lowVolume',  label: 'MOQ',     price: tp?.lowVolume?.price  || 30, range: tp?.lowVolume?.range  || '21-30' },
    { key: 'midVolume',  label: 'VOLUME',  price: tp?.midVolume?.price  || 20, range: tp?.midVolume?.range  || '31-50' },
    { key: 'highVolume', label: 'BULK',    price: tp?.highVolume?.price || 15, range: tp?.highVolume?.range || '51+'   },
  ];
  for (let i = 0; i < tiers.length - 1; i++) {
    const max = parseInt(tiers[i].range.split('-')[1] || tiers[i].range) || Infinity;
    if (total <= max) return tiers[i];
  }
  return tiers[tiers.length - 1];
}

export default function ProductDetailView({ initialProduct, allProducts: propAllProducts = [] }) {
  const product = useMemo(() => ({
    ...DEFAULT_PRODUCT,
    ...initialProduct,
    specifications: { ...DEFAULT_PRODUCT.specifications, ...(initialProduct?.specifications || {}) },
    tieredPricing:  { ...DEFAULT_PRODUCT.tieredPricing,  ...(initialProduct?.tieredPricing  || {}) },
    colors:     (initialProduct?.colors?.length)     ? initialProduct.colors     : DEFAULT_PRODUCT.colors,
    placements: (initialProduct?.placements?.length) ? initialProduct.placements : DEFAULT_PLACEMENTS,
    techniques: (initialProduct?.techniques?.length) ? initialProduct.techniques : DEFAULT_TECHNIQUES,
    images:     (initialProduct?.images?.length)     ? initialProduct.images     : DEFAULT_PRODUCT.images,
  }), [initialProduct]);

  const [fetchedProducts, setFetchedProducts] = useState([]);

  /* Fetch products list if not passed */
  useEffect(() => {
    if (propAllProducts && propAllProducts.length > 0) return;
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.products && Array.isArray(data.products)) {
          setFetchedProducts(data.products);
        }
      })
      .catch(err => console.warn('Failed to fetch products for related items:', err));
  }, [propAllProducts]);

  const catalogProducts = propAllProducts.length > 0 ? propAllProducts : fetchedProducts;

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedImage,    setSelectedImage]     = useState(
    product.colors[0]?.image || product.images[0] || '/active-wear.png'
  );
  const [customMode,       setCustomMode]        = useState('standard');
  const [quantities,       setQuantities]        = useState(Object.fromEntries(SIZES.map(s => [s, 0])));
  const [bulkQty,          setBulkQty]           = useState(10);
  const [useIndividual,    setUseIndividual]     = useState(false);
  const [selectedPlacements, setSelectedPlacements] = useState(
    product.placements?.length ? [product.placements[0].id] : ['front_chest']
  );
  const [selectedTechnique,  setSelectedTechnique]  = useState(
    product.techniques?.length ? product.techniques[0].id : 'screen_print'
  );
  const [uploadedLogo,     setUploadedLogo]    = useState(null);
  const [logoState,        setLogoState]       = useState(null);
  const [customSpecFile,   setCustomSpecFile]  = useState(null);

  /* Modal state */
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [capturedMockupUrl, setCapturedMockupUrl] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const img = product.colors[0]?.image || product.images[0] || '/active-wear.png';
    setSelectedImage(img);
    if (product.placements?.length) setSelectedPlacements([product.placements[0].id]);
    if (product.techniques?.length) setSelectedTechnique(product.techniques[0].id);
  }, [product]);

  const sizeTotal  = Object.values(quantities).reduce((s, v) => s + (v || 0), 0);
  const totalUnits = useIndividual ? sizeTotal : bulkQty;
  const activeTier = useMemo(() => getActiveTier(totalUnits, product.tieredPricing), [totalUnits, product.tieredPricing]);

  const placementSurcharge = useMemo(() => customMode === 'custom'
    ? selectedPlacements.reduce((s, pid) => s + (product.placements.find(p => p.id === pid)?.surcharge || 0), 0)
    : 0, [customMode, selectedPlacements, product.placements]);

  const techniqueSurcharge = useMemo(() => customMode === 'custom'
    ? (product.techniques.find(t => t.id === selectedTechnique)?.surcharge || 0)
    : 0, [customMode, selectedTechnique, product.techniques]);

  const unitPrice = activeTier.price + placementSurcharge + techniqueSurcharge;
  const grandTotal = (totalUnits * unitPrice).toFixed(2);

  const handleColorSelect = useCallback((idx) => {
    setSelectedColorIdx(idx);
    const img = product.colors[idx]?.image;
    if (img) setSelectedImage(img);
  }, [product.colors]);

  const handleQtyChange = useCallback((size, delta) => {
    setQuantities(prev => ({ ...prev, [size]: Math.max(0, (prev[size] || 0) + delta) }));
  }, []);

  const handleLogoUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setUploadedLogo(ev.target.result);
      setCustomMode('custom');
      setLogoState({ x: 160, y: 130, w: 140, h: 140, rotation: 0 });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleCustomSpecUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setCustomSpecFile(file);
  };

  const handleRemoveLogo = () => { setUploadedLogo(null); setLogoState(null); };
  const handlePlacementToggle = (pid) => setSelectedPlacements(prev =>
    prev.includes(pid) ? (prev.length > 1 ? prev.filter(x => x !== pid) : prev) : [...prev, pid]);

  const handleOpenReview = async () => {
    setIsCapturing(true);
    try {
      if (uploadedLogo && logoState) {
        const offscreen = document.createElement('canvas');
        offscreen.width = 600;
        offscreen.height = 600;
        const ctx = offscreen.getContext('2d');

        const baseImg = new Image();
        baseImg.crossOrigin = 'anonymous';
        baseImg.src = selectedImage || '/active-wear.png';

        await new Promise(resolve => { baseImg.onload = resolve; baseImg.onerror = resolve; });
        ctx.drawImage(baseImg, 0, 0, 600, 600);

        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.src = uploadedLogo;
        await new Promise(resolve => { logoImg.onload = resolve; logoImg.onerror = resolve; });

        const scale = 600 / 520;
        const { x, y, w, h, rotation } = logoState;
        ctx.save();
        ctx.translate((x + w / 2) * scale, (y + h / 2) * scale);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(logoImg, (-w / 2) * scale, (-h / 2) * scale, w * scale, h * scale);
        ctx.restore();

        const blob = await new Promise(resolve => offscreen.toBlob(resolve, 'image/png'));
        if (blob) {
          const mockupFile = new File([blob], 'custom-mockup-render.png', { type: 'image/png' });
          const fd = new FormData();
          fd.append('file', mockupFile);
          const upRes = await fetch('/api/admin/upload', { method: 'POST', body: fd });
          const upData = await upRes.json();
          if (upData.url) setCapturedMockupUrl(upData.url);
        }
      } else {
        setCapturedMockupUrl(selectedImage);
      }
    } catch (err) {
      console.warn('Mockup capture error, falling back to base image:', err);
      setCapturedMockupUrl(selectedImage);
    } finally {
      setIsCapturing(false);
      setIsReviewOpen(true);
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/products' },
    { label: product.categoryName || 'Apparel', href: `/products?category=${product.categorySlug || 'street-wear'}` },
    { label: product.name }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen font-sans pb-16">
      <Breadcrumbs
        items={breadcrumbItems}
        backHref="/products"
        backLabel="← Back to Catalog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

          {/* ═══ LEFT COLUMN — Gallery & Studio Components ══════════════════ */}
          <div className="xl:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button onClick={() => setCustomMode('standard')} className={cn('flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all cursor-pointer', customMode === 'standard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900')}>
                Product Showcase
              </button>
              <button onClick={() => setCustomMode('custom')} className={cn('flex-1 py-1.5 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer', customMode === 'custom' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900')}>
                <Layers className="w-3.5 h-3.5" /> Mockup Studio
              </button>
            </div>

            <MockupStudio
              baseImage={selectedImage}
              uploadedLogo={uploadedLogo}
              logoState={logoState}
              setLogoState={setLogoState}
            />

            <ThumbnailStrip
              images={product.images}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
            />

            <SpecsCard product={product} />

            <SizeGuideCard
              customSpecFile={customSpecFile}
              onCustomSpecUpload={handleCustomSpecUpload}
              onRemoveCustomSpec={() => setCustomSpecFile(null)}
            />
          </div>

          {/* ═══ RIGHT COLUMN — Order Builder Components ═══════════════════ */}
          <div className="xl:col-span-7 space-y-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3 text-slate-900">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-slate-100 text-slate-700 font-semibold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-slate-200">{product.categoryName}</span>
                <span className="text-slate-400 font-mono text-[11px]">SKU: {product.sku}</span>
                <span className="ml-auto text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Line
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">{product.name}</h1>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{product.description}</p>

              <div className="pt-2 border-t border-slate-100">
                <ColourSwatches colors={product.colors} selected={selectedColorIdx} onSelect={handleColorSelect} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-slate-900">
              <PricingTiers tieredPricing={product.tieredPricing} activeTierKey={activeTier.key} />
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3.5 text-slate-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setUseIndividual(false)} className={cn('flex items-center gap-1 text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer', !useIndividual ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900')}>
                    <Package className="w-3 h-3" /> Bulk Volume
                  </button>
                  <button onClick={() => setUseIndividual(true)} className={cn('flex items-center gap-1 text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer', useIndividual ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900')}>
                    <Scissors className="w-3 h-3" /> Size Matrix
                  </button>
                </div>
              </div>

              {!useIndividual ? (
                <QuantityRangeSelector
                  tieredPricing={product.tieredPricing}
                  onQuantityChange={setBulkQty}
                />
              ) : (
                <SizeMatrix quantities={quantities} onChange={handleQtyChange} />
              )}
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-slate-900">
              <CustomizationPanel
                mode={customMode}
                onModeChange={setCustomMode}
                placements={product.placements}
                techniques={product.techniques}
                selectedPlacements={selectedPlacements}
                selectedTechnique={selectedTechnique}
                onPlacementToggle={handlePlacementToggle}
                onTechniqueChange={setSelectedTechnique}
                onLogoUpload={handleLogoUpload}
                uploadedLogo={uploadedLogo}
                onRemoveLogo={handleRemoveLogo}
              />
            </div>

            <EstimatedTotal
              totalUnits={totalUnits}
              tier={activeTier}
              placementSurcharge={placementSurcharge}
              techniqueSurcharge={techniqueSurcharge}
              customMode={customMode}
            />

            <div className="space-y-3">
              <button
                onClick={handleOpenReview}
                disabled={isCapturing}
                className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[.99] text-white font-semibold text-xs tracking-wider uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isCapturing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    Capturing Mockup Snapshot...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Review Order & Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { icon: ShieldCheck, label: 'Sialkot ISO Certified' },
                  { icon: Globe,       label: 'Worldwide Express Freight' },
                  { icon: Clock,       label: '25-Day Turnaround' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 py-2 px-2 bg-white rounded-xl border border-slate-200/70 shadow-xs">
                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[9px] font-semibold text-slate-600 text-center leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Related Manufacturing Products Component ───────────────────── */}
        <RelatedProducts
          currentProduct={product}
          allProducts={catalogProducts}
        />
      </div>

      <OrderReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        product={product}
        selectedColor={product.colors[selectedColorIdx]}
        baseImage={selectedImage}
        mockupUrl={capturedMockupUrl}
        uploadedLogo={uploadedLogo}
        customSpecFile={customSpecFile}
        totalUnits={totalUnits}
        quantities={quantities}
        useIndividual={useIndividual}
        activeTier={activeTier}
        unitPrice={unitPrice}
        grandTotal={grandTotal}
        selectedPlacements={selectedPlacements}
        selectedTechnique={selectedTechnique}
      />
    </div>
  );
}
