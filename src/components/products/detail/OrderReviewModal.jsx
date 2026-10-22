'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, FileText, ArrowLeft, Loader2, Check, Sparkles, Building2 } from 'lucide-react';

export default function OrderReviewModal({
  isOpen, onClose, product, selectedColor, baseImage, mockupUrl,
  uploadedLogo, customSpecFile, totalUnits, quantities, useIndividual,
  activeTier, unitPrice, grandTotal, selectedPlacements, selectedTechnique,
  onSubmitSuccess
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState('');
  const [successId, setSuccessId]       = useState(null);

  if (!isOpen) return null;

  const placementObj = selectedPlacements.map(pid => product.placements.find(p => p.id === pid)?.label).filter(Boolean);
  const techniqueObj = product.techniques.find(t => t.id === selectedTechnique)?.label;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setSubmitError('Please enter your full name and email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const attachments = [];
      if (mockupUrl) attachments.push(mockupUrl);

      if (customSpecFile) {
        const specFd = new FormData();
        specFd.append('file', customSpecFile);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: specFd });
        const data = await res.json();
        if (data.url) attachments.push(data.url);
      }

      const sizeBreakdownStr = useIndividual
        ? Object.entries(quantities).filter(([_, q]) => q > 0).map(([s, q]) => `${s}: ${q}pcs`).join(', ')
        : `${totalUnits} units (Bulk)`;

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Private Client',
        country: 'Worldwide',
        website: '',
        source: 'Product Detail Page Direct Review',
        productTypes: [product.name],
        fabrics: [product.specifications?.material || 'Custom Fabric'],
        productDesc: `Order configuration for ${product.name} (SKU: ${product.sku}). Colorway: ${selectedColor?.name || 'Default'}.`,
        moq: `${totalUnits}`,
        colorways: selectedColor?.name || 'Standard',
        styles: product.sku,
        timeline: 'Standard 25 Days',
        budget: `$${grandTotal}`,
        sizes: [sizeBreakdownStr],
        printMethods: [techniqueObj || 'Standard'],
        assets: uploadedLogo ? 'Custom Logo Uploaded' : 'None',
        techPack: customSpecFile ? customSpecFile.name : 'Standard Fit',
        packaging: ['Standard Polybag'],
        notes: `
[PRODUCT DETAILED SUMMARY]
• Product: ${product.name} (SKU: ${product.sku})
• Colorway: ${selectedColor?.name || 'Standard'}
• Volume: ${totalUnits} units (${sizeBreakdownStr})
• Base Tier Rate: $${activeTier.price}/unit (${activeTier.label})
• Placements: ${placementObj.length ? placementObj.join(', ') : 'Standard'}
• Technique: ${techniqueObj || 'Standard'}
• Unit Price: $${unitPrice.toFixed(2)}
• Total Investment: $${grandTotal}
• Client Instructions: ${formData.notes || 'None'}
        `.trim(),
        attachments,
      };

      const qRes = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const qData = await qRes.json();
      if (!qRes.ok || !qData.success) {
        throw new Error(qData.error || 'Failed to submit quote request');
      }

      setSuccessId(qData.quotationId);
      if (onSubmitSuccess) onSubmitSuccess(qData.quotationId);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Failed to submit quotation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="bg-white border border-slate-200/90 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto text-slate-900 my-auto relative">

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-0.5">
              <Sparkles className="w-3 h-3 text-slate-700" /> Fast Apparel B2B Quotation Review
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Order Specifications Review</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successId ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-900 border border-slate-200 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Quotation Submitted!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your manufacturing brief has been transmitted to our engineering team. Reference ID: <strong className="font-mono text-slate-900">{successId}</strong>. We will review your vector artwork and specs and issue a formal quote within 12 business hours.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 px-8 rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Close & Return to Product
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Configured Item Summary Card */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
              <div className="sm:col-span-4 aspect-square bg-white rounded-xl overflow-hidden border border-slate-200/80 flex items-center justify-center shadow-2xs">
                <img src={mockupUrl || baseImage || '/active-wear.png'} alt="Garment Preview" className="w-full h-full object-cover" />
              </div>

              <div className="sm:col-span-8 space-y-2 text-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">{product.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">SKU: {product.sku}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 bg-white border border-slate-200/80 px-2.5 py-1 rounded-lg shadow-2xs">
                      ${unitPrice.toFixed(2)} / unit
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2.5 border-t border-slate-200/60 mt-2">
                    <div><span className="text-slate-400">Colorway:</span> <strong className="text-slate-900">{selectedColor?.name || 'Standard'}</strong></div>
                    <div><span className="text-slate-400">Total Volume:</span> <strong className="text-slate-900">{totalUnits} pcs</strong></div>
                    <div><span className="text-slate-400">Pricing Tier:</span> <strong className="text-slate-900">{activeTier.label} (${activeTier.price})</strong></div>
                    <div><span className="text-slate-400">Technique:</span> <strong className="text-slate-900">{techniqueObj || 'Standard'}</strong></div>
                  </div>

                  {placementObj.length > 0 && (
                    <div className="text-[11px] mt-1.5"><span className="text-slate-400">Placements:</span> <strong className="text-slate-900">{placementObj.join(', ')}</strong></div>
                  )}

                  {useIndividual && (
                    <div className="text-[10px] text-slate-700 bg-white border border-slate-200/80 p-2 rounded-lg font-mono mt-2">
                      Sizes: {Object.entries(quantities).filter(([_, q]) => q > 0).map(([s, q]) => `${s}: ${q}pcs`).join(' · ')}
                    </div>
                  )}
                </div>

                {customSpecFile && (
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-800 bg-white border border-slate-200/80 px-2.5 py-1 rounded-lg shadow-2xs">
                    <FileText className="w-3.5 h-3.5 text-slate-600" /> Attached Spec Sheet: {customSpecFile.name}
                  </div>
                )}
              </div>
            </div>

            {/* Total Investment Pill */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-xs">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">Total Estimated Investment</p>
                <p className="text-xs text-slate-300">{totalUnits} units @ ${unitPrice.toFixed(2)} / unit</p>
              </div>
              <div className="text-2xl font-bold text-white font-mono">${grandTotal}</div>
            </div>

            {/* Client Contact Inputs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-600" /> Client Representative Details
                </h4>
                <span className="text-[10px] text-slate-400">* Required fields</span>
              </div>

              {submitError && (
                <div className="p-3 bg-slate-100 border border-slate-300 text-slate-900 rounded-xl text-xs font-semibold">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">First Name *</label>
                  <input
                    type="text" required
                    placeholder="e.g. Alexander"
                    value={formData.firstName}
                    onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 bg-slate-50/60 focus:bg-white focus:border-slate-900 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Last Name *</label>
                  <input
                    type="text" required
                    placeholder="e.g. Wright"
                    value={formData.lastName}
                    onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 bg-slate-50/60 focus:bg-white focus:border-slate-900 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Email Address *</label>
                  <input
                    type="email" required
                    placeholder="alexander@brand.com"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 bg-slate-50/60 focus:bg-white focus:border-slate-900 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 bg-slate-50/60 focus:bg-white focus:border-slate-900 outline-none transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Brand / Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Apparel Studio"
                    value={formData.company}
                    onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 bg-slate-50/60 focus:bg-white focus:border-slate-900 outline-none transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Additional Instructions / Private Labelling Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Custom woven neck tags, polybag stickers, or special seam preferences..."
                    value={formData.notes}
                    onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 bg-slate-50/60 focus:bg-white focus:border-slate-900 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs py-3 px-5 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" /> Edit Specs / Go Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3.5 px-7 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                    Submitting Quotation...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Confirm & Submit Quotation Request
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
