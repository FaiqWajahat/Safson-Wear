'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS, SIZING_GUIDES } from '@/data/productsData';
import CategoryHero from './CategoryHero';
import SubcategoryHero from './SubcategoryHero';
import ProductDetailView from './ProductDetailView';
import FAQSection from '@/components/common/FAQSection';
import SectionHeading from '@/components/home/SectionHeading';

// ── Convert inches string to cm ────────────────────────────────────────────────
const convertToCm = (str) => {
  if (!str) return '';
  let clean = str.replace('"', '');
  if (clean.includes('-')) {
    const [a, b] = clean.split('-');
    return `${Math.round(parseFloat(a) * 2.54)}-${Math.round(parseFloat(b) * 2.54)} cm`;
  }
  return `${Math.round(parseFloat(clean) * 2.54)} cm`;
};

// ── Format server data ─────────────────────────────────────────────────────────
function formatServerData(rawCategories, rawProducts) {
  const formattedCategories = {};
  rawCategories.filter(c => !c.parentCategory).forEach(c => {
    formattedCategories[c.slug] = {
      title: c.name,
      description: c.description || '',
      heroImage: c.image || '/active-wear.png',
      subcategories: {},
      fabricTech: CATEGORIES[c.slug]?.fabricTech || [],
    };
  });
  rawCategories.filter(c => c.parentCategory).forEach(c => {
    const pSlug = typeof c.parentCategory === 'object' ? c.parentCategory.slug : c.parentCategory;
    if (formattedCategories[pSlug]) {
      formattedCategories[pSlug].subcategories[c.slug] = {
        title: c.name, description: c.description || '',
        image: c.image || '/active-wear.png',
        heroHeading: c.heroHeading || '', heroSubheading: c.heroSubheading || '',
        heroBgImage: c.heroBgImage || '', heroBgVideo: c.heroBgVideo || '',
        heroImage1: c.heroImage1 || '', heroImage2: c.heroImage2 || '', heroImage3: c.heroImage3 || '',
      };
    }
  });
  const formattedProducts = rawProducts.map(p => {
    const catSlug = typeof p.category === 'object' ? p.category?.slug : p.category;
    const subSlug = typeof p.subcategory === 'object' ? p.subcategory?.slug : p.subcategory;
    const catName = typeof p.category === 'object' ? p.category?.name : 'Street Wear';
    return {
      id: p.slug || p._id, name: p.name, sku: p.sku || 'PROD-9707',
      category: catSlug || '', subcategory: subSlug || '',
      categoryName: catName, categorySlug: catSlug || 'street-wear',
      image: p.images?.[0] || '/active-wear.png',
      images: p.images?.length > 0 ? p.images : ['/active-wear.png'],
      description: p.description || '', specifications: p.specifications || {},
      tieredPricing: p.tieredPricing || {}, colors: p.colors || [],
      placements: p.placements || [], techniques: p.techniques || [],
      minOrderQuantity: p.minOrderQuantity || 10,
      specs: [
        p.specifications?.material ? `Material: ${p.specifications.material}` : null,
        p.specifications?.weight ? `Weight: ${p.specifications.weight}` : null,
        p.specifications?.sizing ? `Sizing: ${p.specifications.sizing}` : null,
        p.specifications?.customization ? `Customization: ${p.specifications.customization}` : null,
      ].filter(Boolean),
      mfgDetails: {
        moq: `${p.minOrderQuantity || 50} Units`,
        leadTime: '18–22 Business Days',
        customization: p.specifications?.customization || 'Custom labels and print',
      },
      performanceTech: p.description || '',
      sizingType: p.specifications?.sizing?.toLowerCase().includes('waist') ? 'bottoms' : 'tops',
    };
  });
  return { formattedCategories, formattedProducts };
}

// ── Breadcrumb ─────────────────────────────────────────────────────────────────
function Breadcrumb({ setParams, categoryData, subParam, activeProduct }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-black/50">
      <button onClick={() => setParams({ category: null, sub: null, product: null })}
        className="hover:text-black transition-colors cursor-pointer">Products</button>
      <ChevronRight className="w-3.5 h-3.5 text-black/30" />
      <button onClick={() => setParams({ sub: null, product: null })}
        className="hover:text-black transition-colors cursor-pointer">{categoryData?.title}</button>
      {subParam && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-black/30" />
          <button onClick={() => setParams({ product: null })}
            className="hover:text-black transition-colors cursor-pointer">
            {categoryData?.subcategories[subParam]?.title}
          </button>
        </>
      )}
      {activeProduct && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-black/30" />
          <span className="text-black font-semibold">{activeProduct.name}</span>
        </>
      )}
    </nav>
  );
}

// ── Product card ───────────────────────────────────────────────────────────────
function ProductCard({ product, subcategoryTitle, onClick, index = 0 }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group block w-full text-left cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100">
        <Image src={product.image} alt={product.name} fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold bg-white text-black px-3 py-1.5 rounded-full truncate">{subcategoryTitle}</span>
          <span className="text-xs font-semibold bg-black text-white px-3 py-1.5 rounded-full shrink-0">MOQ {product.minOrderQuantity}</span>
        </div>
        <div className="absolute inset-x-4 bottom-4 translate-y-[calc(100%+1rem)] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="flex items-center justify-between bg-white/95 backdrop-blur-md text-black rounded-full pl-5 pr-1.5 py-1.5 shadow-lg">
            <span className="text-sm font-semibold">View details</span>
            <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <p className="text-xs text-black/40">{product.sku}</p>
        <h3 className="mt-1 text-base font-semibold leading-snug">{product.name}</h3>
        <p className="mt-1 text-sm text-black/55 leading-relaxed line-clamp-2">{product.description}</p>
      </div>
    </motion.button>
  );
}

// ── Subcategory card ───────────────────────────────────────────────────────────
function SubcategoryCard({ subData, onClick, index, productCount }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative block w-full aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 text-left cursor-pointer"
    >
      <Image src={subData.image || '/active-wear.png'} alt={subData.title} fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-2xl font-bold tracking-tight">{subData.title}</h3>
        <p className="mt-1 text-xs font-semibold text-white/60">{productCount} {productCount === 1 ? 'product' : 'products'}</p>
        <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
          <div className="overflow-hidden">
            <p className="pt-3 text-sm text-white/75 leading-relaxed">{subData.description}</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-14 pt-8 border-t border-black/10">
      <button onClick={() => onChange(p => Math.max(1, p - 1))} disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white hover:border-black disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer">
        <ArrowLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button key={page} onClick={() => onChange(page)}
          aria-current={currentPage === page ? 'page' : undefined}
          className={`w-11 h-11 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
            currentPage === page
              ? 'bg-black border-black text-white'
              : 'border-black/15 text-black/60 hover:border-black hover:text-black'
          }`}>
          {page}
        </button>
      ))}
      <button onClick={() => onChange(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white hover:border-black disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer">
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── PROTOTYPING WORKFLOW STRIP ─────────────────────────────────────────────────
function PrototypingStrip() {
  const steps = [
    { no: '01', title: 'Submit Tech Pack', desc: 'Send flat designs, sketches, or CLO3D files.' },
    { no: '02', title: 'Fabric Sourcing', desc: 'Custom GSM fabric parameters sourced from mill.' },
    { no: '03', title: '72hr Prototyping', desc: 'Physical sample built on Sialkot sampling floor.' },
    { no: '04', title: 'DHL Dispatch', desc: 'Express courier delivery for fit sign-off.' },
  ];
  return (
    <div className="mt-20 rounded-3xl bg-black text-white p-7 sm:p-12">
      <SectionHeading dark eyebrow="Workflow" title="Prototyping" muted="process." href="/inquiry" linkLabel="Start a sample" />
      <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <span className="hidden lg:block absolute left-6 right-6 top-6 h-px bg-white/15" aria-hidden="true" />
        {steps.map((s, i) => (
          <motion.li
            key={s.no}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative"
          >
            <span className="relative z-10 w-12 h-12 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center ring-8 ring-black">
              {s.no}
            </span>
            <h4 className="mt-5 text-base font-semibold">{s.title}</h4>
            <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{s.desc}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function ProductsClient({ initialCategories = [], initialProducts = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('category');
  const subParam = searchParams.get('sub');
  const productParam = searchParams.get('product');

  const [currentPage, setCurrentPage] = useState(1);
  const [isCm, setIsCm] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const heroVideoRef = useRef(null);
  const itemsPerPage = 6;

  useEffect(() => { setCurrentPage(1); }, [subParam]);
  useEffect(() => { setActiveImageIndex(0); }, [productParam]);

  const isFirstPageRender = useRef(true);
  useEffect(() => {
    if (isFirstPageRender.current) { isFirstPageRender.current = false; return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = true;
      heroVideoRef.current.defaultMuted = true;
      heroVideoRef.current.play().catch(() => {});
    }
  }, [subParam]);

  const { formattedCategories: serverCategories, formattedProducts: serverProducts } = React.useMemo(
    () => formatServerData(initialCategories, initialProducts),
    [] // eslint-disable-line
  );

  const finalCategories = serverCategories && Object.keys(serverCategories).length > 0 ? serverCategories : CATEGORIES;
  const finalProducts = serverProducts?.length > 0 ? serverProducts : PRODUCTS;

  const setParams = (newParams) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(newParams).forEach(([k, v]) => v === null ? current.delete(k) : current.set(k, v));
    const q = current.toString();
    router.push(`${pathname}${q ? `?${q}` : ''}`);
  };

  const activeCategoryKey = categoryParam || Object.keys(finalCategories)[0] || 'sports-wear';
  const categoryData = finalCategories[activeCategoryKey];
  const subcategoryData = subParam ? categoryData?.subcategories[subParam] : null;
  const activeProduct = productParam ? finalProducts.find(p => p.id === productParam) : null;
  const subcategoryProducts = subParam
    ? finalProducts.filter(p => p.category === activeCategoryKey && p.subcategory === subParam)
    : [];

  // ── VIEW 1: Product Detail ─────────────────────────────────────────────────
  if (activeProduct) {
    return (
      <div className="min-h-screen bg-neutral-50 text-black font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <button onClick={() => setParams({ product: null })}
              className="self-start inline-flex items-center gap-2 text-sm font-semibold border border-black/15 hover:bg-black hover:text-white hover:border-black rounded-full pl-3 pr-4 py-2 cursor-pointer transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to products
            </button>
            <Breadcrumb setParams={setParams} categoryData={categoryData} subParam={subParam} activeProduct={activeProduct} />
          </div>
          <ProductDetailView initialProduct={activeProduct} allProducts={finalProducts} />
        </div>
      </div>
    );
  }

  // ── VIEW 2: Subcategory Products Grid ──────────────────────────────────────
  if (subParam) {
    const totalPages = Math.ceil(subcategoryProducts.length / itemsPerPage);
    const paginatedProducts = subcategoryProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return (
      <div className="min-h-screen bg-white text-black font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <SubcategoryHero subcategoryData={subcategoryData} setParams={setParams} heroVideoRef={heroVideoRef} />

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-10 pb-5 border-b border-black/10">
            <Breadcrumb setParams={setParams} categoryData={categoryData} subParam={subParam} activeProduct={null} />
            <span className="self-start sm:self-auto text-xs font-semibold bg-neutral-100 rounded-full px-3 py-1.5 shrink-0">
              {subcategoryProducts.length} {subcategoryProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="py-20 text-center rounded-3xl border border-dashed border-black/15">
              <p className="text-base font-semibold">No products in this line yet</p>
              <p className="mt-1 text-sm text-black/50">Tell us what you need and we will develop it for you.</p>
              <button onClick={() => router.push('/inquiry')}
                className="mt-6 inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer">
                Request a custom product <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i}
                  subcategoryTitle={subcategoryData?.title}
                  onClick={() => setParams({ product: p.id })} />
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />

          <PrototypingStrip />
        </div>

        <div className="mt-20">
          <FAQSection
            title="Catalog & Procurement FAQ"
            description="Answers about MOQs, custom tech packs, sampling timelines, and global shipping."
          />
        </div>
      </div>
    );
  }

  // ── VIEW 3: Category Overview ──────────────────────────────────────────────
  const categorySubcategories = Object.entries(categoryData?.subcategories || {});

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">

        {/* Category switcher */}
        <div className="mb-8 inline-flex gap-1.5 p-1.5 rounded-full bg-neutral-100 border border-black/5">
          {Object.entries(finalCategories).map(([key, data]) => {
            const isActive = activeCategoryKey === key;
            return (
              <button
                key={key}
                onClick={() => setParams({ category: key, sub: null, product: null })}
                className="relative px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
              >
                {isActive && (
                  <motion.span layoutId="products-category-tab" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 rounded-full bg-black" />
                )}
                <span className={`relative transition-colors ${isActive ? 'text-white' : 'text-black/55 hover:text-black'}`}>{data.title}</span>
              </button>
            );
          })}
        </div>

        {/* Category hero */}
        <CategoryHero activeCategoryKey={activeCategoryKey} categoryData={categoryData} />

        {/* Subcategories */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Product lines"
            title="Explore"
            muted={categoryData?.title ? `${categoryData.title.toLowerCase()}.` : 'our range.'}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorySubcategories.map(([subKey, subData], i) => (
              <SubcategoryCard
                key={subKey} subData={subData} index={i}
                productCount={finalProducts.filter((p) => p.category === activeCategoryKey && p.subcategory === subKey).length}
                onClick={() => setParams({ sub: subKey })}
              />
            ))}
          </div>
        </div>

        {/* Fabric technology */}
        {categoryData?.fabricTech?.length > 0 && (
          <div className="mt-20">
            <SectionHeading eyebrow="R&D & sourcing" title="Fabric" muted="technology." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categoryData.fabricTech.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="rounded-3xl bg-neutral-50 border border-black/10 p-6 hover:bg-white hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500"
                >
                  <span className="w-11 h-11 rounded-full bg-black text-white text-sm font-bold flex items-center justify-center">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 text-base font-semibold tracking-tight">{tech.name}</h3>
                  <p className="mt-2 text-sm text-black/60 leading-relaxed">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <PrototypingStrip />

      </div>
    </div>
  );
}
