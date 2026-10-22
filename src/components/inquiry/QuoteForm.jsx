'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, CheckCircle2,
  Package, Shirt, Scissors, ShieldCheck,
  Clock, Zap, Globe, ChevronDown, Upload, FileText, X, Loader2, MessageCircle, AlertCircle,
} from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/923484488019?text=Hello%2C%20I%20would%20like%20to%20request%20a%20manufacturing%20quote.';
const MAX_FILE_MB = 15;

const PRODUCT_TYPES = [
  { id: 'streetwear',   icon: Package,     label: 'Street Wear',    sub: 'Hoodies, tees, jackets & tracksuits' },
  { id: 'sports-wear',  icon: Scissors,    label: 'Sports Wear',    sub: 'Football, rugby, basketball & more' },
  { id: 'outerwear',    icon: ShieldCheck, label: 'Outerwear',      sub: 'Jackets & shell layers' },
  { id: 'private-label',icon: Shirt,       label: 'Private Label',  sub: 'OEM / custom branding' },
  { id: 'training',     icon: Zap,         label: 'Athletic Wear',  sub: 'Training tops & bottoms' },
  { id: 'other',        icon: Globe,       label: 'Other / Mixed',  sub: 'Multiple categories' },
];

const FABRICS = [
  { id: 'poly',    label: 'Performance Polyester', gsm: '120–180 GSM' },
  { id: 'rpet',    label: 'Recycled rPET',         gsm: '140–200 GSM' },
  { id: 'lycra',   label: 'Nylon-Lycra Stretch',   gsm: '150–230 GSM' },
  { id: 'cotton',  label: 'GOTS Organic Cotton',   gsm: '180–260 GSM' },
  { id: 'fleece',  label: 'Fleece Brushed Terry',  gsm: '280–380 GSM' },
  { id: 'shell',   label: 'Waterproof Shell',      gsm: '90–130 GSM' },
  { id: 'unsure',  label: 'Need Recommendation',   gsm: "We'll advise" },
];

const PRINT_METHODS = [
  { id: 'sublimation',   label: 'Dye Sublimation',   sub: 'Full-colour allover prints' },
  { id: 'embroidery',    label: 'Tajima Embroidery',  sub: 'Logos, crests & badges' },
  { id: 'heat-transfer', label: '3D Heat Transfer',   sub: 'Silicone names & numbers' },
  { id: 'screen',        label: 'Screen Print',       sub: 'Block-colour graphics' },
  { id: 'none',          label: 'Plain / No Print',   sub: 'Blank garments only' },
];

const MOQ_RANGES  = ['50–99', '100–249', '250–499', '500–999', '1,000–4,999', '5,000+'];
const TIMELINES   = ['Rush — within 3 weeks', 'Standard — 4–6 weeks', 'Relaxed — 6–10 weeks', 'Flexible / Planning stage'];
const SIZES       = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', 'Kids (2–14yr)', 'Custom Sizing'];
const PACKAGING   = ['Custom woven label', 'Custom hang tag', 'Branded polybag', 'Barcode / SKU label', 'Anti-humidity silica', 'RFID tag integration'];

const TRUST = [
  { icon: Clock,        title: '12-hour response', text: 'A detailed quote within one business day' },
  { icon: CheckCircle2, title: '72-hour samples',  text: 'Physical fit samples, fast' },
  { icon: ShieldCheck,  title: 'Audited factory',  text: 'WRAP Platinum certified facility' },
  { icon: Globe,        title: '45+ countries',    text: 'DDP door-to-door delivery' },
];

const SECTIONS = [
  { id: 'company', title: 'Your company',         desc: 'Who should we send the quote to?' },
  { id: 'product', title: 'Product category',     desc: 'What are you building?' },
  { id: 'specs',   title: 'Order specifications', desc: 'Quantities, sizes, and timeline' },
  { id: 'details', title: 'Branding & details',   desc: 'Decoration, files, and packaging' },
];

// ── Field primitives ─────────────────────────────────────────────────────────
function FieldLabel({ children, required, hint, htmlFor }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-black">
        {children}
        {required && <span className="ml-0.5 text-black/40">*</span>}
      </label>
      {hint && <span className="text-xs text-black/45">{hint}</span>}
    </div>
  );
}

const fieldClass = (error) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-black placeholder:text-black/35 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 ${
    error ? 'border-red-500 focus:border-red-500' : 'border-black/15 hover:border-black/30 focus:border-black'
  }`;

function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600"><AlertCircle className="w-3.5 h-3.5" /> {children}</p>;
}

function TextInput({ label, required, hint, id, type = 'text', placeholder, value, onChange, error }) {
  return (
    <div>
      <FieldLabel required={required} hint={hint} htmlFor={id}>{label}</FieldLabel>
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} className={fieldClass(error)} />
      <FieldError>{error}</FieldError>
    </div>
  );
}

function TextareaInput({ label, required, hint, id, placeholder, rows = 4, value, onChange, error }) {
  return (
    <div>
      <FieldLabel required={required} hint={hint} htmlFor={id}>{label}</FieldLabel>
      <textarea id={id} rows={rows} value={value} onChange={onChange} placeholder={placeholder} className={`${fieldClass(error)} resize-none`} />
      <FieldError>{error}</FieldError>
    </div>
  );
}

function SelectInput({ label, required, hint, id, value, onChange, children, error }) {
  return (
    <div>
      <FieldLabel required={required} hint={hint} htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select id={id} value={value} onChange={onChange} className={`${fieldClass(error)} appearance-none cursor-pointer pr-10`}>
          {children}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40 pointer-events-none" />
      </div>
      <FieldError>{error}</FieldError>
    </div>
  );
}

function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
        selected ? 'bg-black border-black text-white' : 'bg-white border-black/15 text-black/70 hover:border-black/40 hover:text-black'
      }`}
    >
      {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
      {children}
    </button>
  );
}

function SelectionCard({ title, sub, selected, onClick, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex w-full items-start gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all cursor-pointer ${
        selected ? 'bg-black border-black text-white shadow-lg shadow-black/10' : 'bg-white border-black/10 hover:border-black/30'
      }`}
    >
      {Icon && (
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${selected ? 'bg-white text-black' : 'bg-neutral-100 text-black'}`}>
          <Icon className="h-5 w-5" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        {sub && <span className={`mt-0.5 block text-xs ${selected ? 'text-white/65' : 'text-black/50'}`}>{sub}</span>}
      </span>
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${selected ? 'bg-white border-white' : 'border-black/20'}`}>
        {selected && <Check className="h-3 w-3 text-black" />}
      </span>
    </button>
  );
}

// ── Form steps ───────────────────────────────────────────────────────────────
function StepCompany({ data, set, errors = {} }) {
  const f = (k) => (e) => set((p) => ({ ...p, [k]: e.target.value }));
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextInput label="First name" required id="fn" placeholder="James" value={data.firstName} onChange={f('firstName')} error={errors.firstName} />
        <TextInput label="Last name" required id="ln" placeholder="Miller" value={data.lastName} onChange={f('lastName')} error={errors.lastName} />
      </div>
      <TextInput label="Company / brand name" id="co" placeholder="Blaze United FC" value={data.company} onChange={f('company')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextInput label="Business email" required id="em" type="email" placeholder="james@blazeunited.com" value={data.email} onChange={f('email')} error={errors.email} />
        <TextInput label="WhatsApp / phone" id="ph" placeholder="+1 555 000 0000" value={data.phone} onChange={f('phone')} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextInput label="Country" id="cn" placeholder="Germany" value={data.country} onChange={f('country')} />
        <TextInput label="Website" id="web" placeholder="https://blazeunited.com" value={data.website} onChange={f('website')} />
      </div>
      <SelectInput label="How did you hear about us?" id="src" value={data.source} onChange={f('source')}>
        <option value="">Select one</option>
        {['Google Search', 'LinkedIn', 'Industry Referral', 'Trade Show', 'Social Media', 'Previous Customer', 'Other'].map((o) => <option key={o}>{o}</option>)}
      </SelectInput>
    </div>
  );
}

function StepProduct({ data, set, errors = {} }) {
  const toggleArr = (k, v) => set((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));
  return (
    <div className="space-y-8">
      <div id="field-productTypes">
        <FieldLabel hint="Select all that apply" required>Product category</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRODUCT_TYPES.map((pt) => (
            <SelectionCard key={pt.id} title={pt.label} sub={pt.sub} icon={pt.icon}
              selected={data.productTypes.includes(pt.id)}
              onClick={() => toggleArr('productTypes', pt.id)}
            />
          ))}
        </div>
        <FieldError>{errors.productTypes}</FieldError>
      </div>
      <div>
        <FieldLabel hint="Select all that apply">Fabric preference</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {FABRICS.map((fab) => (
            <Chip key={fab.id} selected={data.fabrics.includes(fab.id)} onClick={() => toggleArr('fabrics', fab.id)}>
              {fab.label} <span className="opacity-60">· {fab.gsm}</span>
            </Chip>
          ))}
        </div>
      </div>
      <TextareaInput label="Product description" id="pd" rows={3}
        placeholder="E.g. Full home/away/third kit for a semi-professional football club."
        value={data.productDesc} onChange={(e) => set((p) => ({ ...p, productDesc: e.target.value }))}
      />
    </div>
  );
}

function StepSpecs({ data, set, errors = {} }) {
  const f = (k) => (e) => set((p) => ({ ...p, [k]: e.target.value }));
  const toggleArr = (k, v) => set((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));
  return (
    <div className="space-y-8">
      <div id="field-moq">
        <FieldLabel required hint="Units per order">Order quantity</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MOQ_RANGES.map((r) => (
            <SelectionCard key={r} title={r} sub="units" selected={data.moq === r} onClick={() => set((p) => ({ ...p, moq: r }))} />
          ))}
        </div>
        <FieldError>{errors.moq}</FieldError>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <SelectInput label="Colourways" id="cw" value={data.colorways} onChange={f('colorways')}>
          <option value="">Select</option>
          {['1', '2', '3', '4', '5', '6+'].map((v) => <option key={v}>{v}</option>)}
        </SelectInput>
        <SelectInput label="SKUs / styles" id="sk" value={data.styles} onChange={f('styles')}>
          <option value="">Select</option>
          {['1', '2–3', '4–6', '7–10', '10+'].map((v) => <option key={v}>{v}</option>)}
        </SelectInput>
        <SelectInput label="Budget per unit" id="bud" value={data.budget} onChange={f('budget')}>
          <option value="">Select</option>
          {['Under $8', '$8–$15', '$15–$25', '$25–$50', '$50+', 'Open to quote'].map((v) => <option key={v}>{v}</option>)}
        </SelectInput>
      </div>
      <div>
        <FieldLabel>Required timeline</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TIMELINES.map((t) => (
            <SelectionCard key={t} title={t} selected={data.timeline === t} onClick={() => set((p) => ({ ...p, timeline: t }))} />
          ))}
        </div>
      </div>
      <div>
        <FieldLabel hint="Select all that apply">Size range</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <Chip key={s} selected={data.sizes.includes(s)} onClick={() => toggleArr('sizes', s)}>{s}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepBranding({ data, set }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const f = (k) => (e) => set((p) => ({ ...p, [k]: e.target.value }));
  const toggleArr = (k, v) => set((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  // Uploads each selected file to the upload API and stores the returned URL
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;

    const tooBig = files.find((file) => file.size > MAX_FILE_MB * 1024 * 1024);
    if (tooBig) {
      setUploadError(`"${tooBig.name}" is larger than ${MAX_FILE_MB}MB.`);
      return;
    }

    setUploadError('');
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.url) throw new Error(json.error || 'Upload failed');
        uploaded.push({ url: json.url, name: file.name });
      }
      set((p) => ({ ...p, attachments: [...(p.attachments || []), ...uploaded] }));
    } catch (err) {
      setUploadError('Could not upload the file. Please try again or send it on WhatsApp.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAttachment = (idx) => {
    set((p) => ({ ...p, attachments: (p.attachments || []).filter((_, i) => i !== idx) }));
  };

  return (
    <div className="space-y-8">
      <div>
        <FieldLabel hint="Select all that apply">Decoration / print methods</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRINT_METHODS.map((pm) => (
            <SelectionCard key={pm.id} title={pm.label} sub={pm.sub}
              selected={data.printMethods.includes(pm.id)}
              onClick={() => toggleArr('printMethods', pm.id)}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectInput label="Brand assets available?" id="ass" value={data.assets} onChange={f('assets')}>
          <option value="">Select</option>
          <option>Yes — vector files (AI/EPS/PDF)</option>
          <option>Yes — raster files only (PNG/JPG)</option>
          <option>No — need design assistance</option>
          <option>Partially — some files available</option>
        </SelectInput>
        <SelectInput label="Tech pack / design brief?" id="tp" value={data.techPack} onChange={f('techPack')}>
          <option value="">Select</option>
          <option>Yes — full tech pack ready</option>
          <option>Yes — design reference only</option>
          <option>No — starting from scratch</option>
          <option>In progress — will send soon</option>
        </SelectInput>
      </div>
      <div>
        <FieldLabel hint={`PDF, AI, ZIP, PNG or JPG — max ${MAX_FILE_MB}MB each`}>Design assets & tech pack files</FieldLabel>
        <label
          className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-9 text-center transition-colors ${
            uploading ? 'border-black/20 bg-neutral-50 cursor-wait' : 'border-black/15 bg-neutral-50 hover:border-black/40 cursor-pointer'
          }`}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.ai,.eps,.zip,.png,.jpg,.jpeg,.svg"
            onChange={handleFileUpload}
            disabled={uploading}
            className="sr-only"
          />
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
          </span>
          <span>
            <span className="block text-sm font-semibold">{uploading ? 'Uploading…' : 'Click to select files'}</span>
            <span className="mt-1 block text-xs text-black/50">You can add more than one file</span>
          </span>
        </label>
        <FieldError>{uploadError}</FieldError>
        {data.attachments?.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.attachments.map((file, idx) => (
              <li key={`${file.url}-${idx}`} className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-4 py-3">
                <span className="flex min-w-0 items-center gap-3">
                  <FileText className="h-4 w-4 shrink-0 text-black/50" />
                  <span className="truncate text-sm font-medium">{file.name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAttachment(idx)}
                  aria-label={`Remove ${file.name}`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-black/50 hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <FieldLabel hint="Select all that apply">Labelling & packaging</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {PACKAGING.map((l) => (
            <Chip key={l} selected={data.packaging.includes(l)} onClick={() => toggleArr('packaging', l)}>{l}</Chip>
          ))}
        </div>
      </div>
      <TextareaInput label="Additional notes" id="notes" rows={4}
        placeholder="E.g. RFID tracking integration required."
        value={data.notes} onChange={(e) => set((p) => ({ ...p, notes: e.target.value }))}
      />
    </div>
  );
}

const INIT = {
  company:  { firstName: '', lastName: '', company: '', email: '', phone: '', country: '', website: '', source: '' },
  product:  { productTypes: [], fabrics: [], productDesc: '' },
  specs:    { moq: '', colorways: '', styles: '', timeline: '', budget: '', sizes: [] },
  details:  { printMethods: [], assets: '', techPack: '', packaging: [], notes: '', attachments: [] },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Order of fields used to scroll to the first error
const ERROR_TARGETS = { firstName: 'fn', lastName: 'ln', email: 'em', productTypes: 'field-productTypes', moq: 'field-moq' };

export default function QuoteForm() {
  const [data, setData] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const update = (section) => (val) => setData((p) => ({ ...p, [section]: typeof val === 'function' ? val(p[section]) : val }));

  const validate = () => {
    const err = {};
    if (!data.company.firstName.trim()) err.firstName = 'Please enter your first name';
    if (!data.company.lastName.trim()) err.lastName = 'Please enter your last name';
    if (!data.company.email.trim()) err.email = 'Please enter your email';
    else if (!EMAIL_RE.test(data.company.email.trim())) err.email = 'Please enter a valid email';
    if (data.product.productTypes.length === 0) err.productTypes = 'Please choose at least one product category';
    if (!data.specs.moq) err.moq = 'Please choose an order quantity';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) {
      const firstKey = Object.keys(ERROR_TARGETS).find((k) => err[k]);
      document.getElementById(ERROR_TARGETS[firstKey])?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...data.company,
        ...data.product,
        ...data.specs,
        ...data.details,
        attachments: data.details.attachments.map((a) => a.url),
      };
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.error || 'Submission failed');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitError('We could not send your request. Please try again, or message us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-white text-black font-sans py-24 sm:py-32 min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto px-4 text-center"
        >
          <span className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <Check className="h-8 w-8" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/50">Request received</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Thank you, {data.company.firstName}!</h2>
          <p className="mt-5 text-[15px] text-black/60 leading-relaxed">
            Our B2B sales team will review your requirements and reply to <span className="font-semibold text-black">{data.company.email}</span> within 12 business hours.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-neutral-800 transition-colors">
              Back to home <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products" className="inline-flex items-center text-sm font-semibold px-7 py-3.5 rounded-full border border-black/15 hover:border-black transition-colors">
              Browse products
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="bg-white text-black font-sans">
      {/* ── Header band ── */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-white" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-white/85">Reply within 12 business hours</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[2.5rem] sm:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            Request a quote.
            <span className="block text-white/45">Start your collection.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 max-w-xl text-base sm:text-lg text-white/70 font-light leading-relaxed"
          >
            Tell us about your product, quantities, and timeline. It takes about 3 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {TRUST.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 sm:p-5">
                <Icon className="w-5 h-5 text-white/70" />
                <p className="mt-3 text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs text-white/55 leading-snug">{text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

        {/* Left — steps + contact */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="rounded-3xl border border-black/10 bg-neutral-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45">Form sections</p>
            <ol className="mt-5 space-y-4">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#section-${s.id}`} className="group flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white text-xs font-bold">{i + 1}</span>
                    <span>
                      <span className="block text-sm font-semibold group-hover:underline underline-offset-4">{s.title}</span>
                      <span className="block text-xs text-black/50">{s.desc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl bg-black text-white p-6">
            <p className="text-lg font-semibold">Prefer to chat?</p>
            <p className="mt-1 text-sm text-white/60">Send us your tech pack or questions directly on WhatsApp.</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white text-black text-sm font-semibold px-6 py-3.5 hover:bg-neutral-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </aside>

        {/* Right — form */}
        <form onSubmit={handleSubmit} noValidate className="lg:col-span-8 space-y-6">
          {[
            <StepCompany key="company" data={data.company} set={update('company')} errors={errors} />,
            <StepProduct key="product" data={data.product} set={update('product')} errors={errors} />,
            <StepSpecs key="specs" data={data.specs} set={update('specs')} errors={errors} />,
            <StepBranding key="details" data={data.details} set={update('details')} />,
          ].map((content, i) => (
            <motion.div
              key={SECTIONS[i].id}
              id={`section-${SECTIONS[i].id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-28 rounded-3xl border border-black/10 bg-white p-6 sm:p-8"
            >
              <div className="mb-7 flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white text-sm font-bold">{i + 1}</span>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">{SECTIONS[i].title}</h2>
                  <p className="text-sm text-black/50">{SECTIONS[i].desc}</p>
                </div>
              </div>
              {content}
            </motion.div>
          ))}

          {/* Submit */}
          <div className="rounded-3xl bg-neutral-50 border border-black/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="text-base font-semibold">Ready to send?</p>
              <p className="text-sm text-black/55">Fields marked * are required.</p>
              {submitError && <FieldError>{submitError}</FieldError>}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center justify-center gap-3 bg-black text-white text-sm font-semibold pl-7 pr-1.5 py-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            >
              {submitting ? 'Sending…' : 'Submit inquiry'}
              <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
