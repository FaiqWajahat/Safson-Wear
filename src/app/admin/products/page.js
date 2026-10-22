'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Edit3, Trash2, X, ChevronDown, Shirt,
} from 'lucide-react';
import { toast } from 'sonner';
import AdminProductForm from '@/components/admin/AdminProductForm';

export default function AdminProducts() {
  const [products,       setProducts]       = useState([]);
  const [categories,     setCategories]     = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter,   setStatusFilter]   = useState('');
  const [currentPage,    setCurrentPage]    = useState(1);
  const itemsPerPage = 8;

  // Modal
  const [modalOpen,      setModalOpen]      = useState(false);
  const [modalMode,      setModalMode]      = useState('create');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form feedback (passed to AdminProductForm)
  const [uploading,   setUploading]   = useState(false);
  const [formError,   setFormError]   = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting,  setSubmitting]  = useState(false);

  // Delete dialog
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId,    setDeleteTargetId]    = useState(null);
  const [deleteTargetName,  setDeleteTargetName]  = useState('');

  // ─── Data fetch ──────────────────────────────────────────────────────────────
  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ]);
      if (prodRes.ok && catRes.ok) {
        const prodData = await prodRes.json();
        const catData  = await catRes.json();
        setProducts(prodData.products || []);
        setCategories(catData.categories || []);
      }
    } catch (err) {
      console.error('Failed to load products data:', err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => { setCurrentPage(1); }, [searchQuery, categoryFilter, statusFilter]);

  // ─── Modal helpers ────────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedProduct(null);
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  // ─── Image upload (passed to form) ───────────────────────────────────────────
  // Uploads the selected file(s) and returns their URLs; AdminProductForm appends them to its images
  const handleImageUpload = async (files) => {
    if (!files?.length) return [];
    setUploading(true);
    setFormError('');
    setFormSuccess('');
    const urls = [];
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        const res  = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        urls.push(data.url);
      }
      toast.success(urls.length > 1 ? `${urls.length} images uploaded` : 'Image uploaded');
    } catch (err) {
      setFormError(err.message || 'Image upload failed');
      toast.error(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
    return urls;
  };

  // ─── Product submit (create / edit) ──────────────────────────────────────────
  const handleSubmit = async (payload) => {
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    if (!payload.name || !payload.slug || !payload.description || !payload.category) {
      setFormError('Name, Slug, Description, and Main Category are required.');
      toast.error('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    if (modalMode === 'edit' && selectedProduct?._id) {
      payload.id = selectedProduct._id;
    }

    try {
      const res  = await fetch('/api/admin/products', {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation failed');
      toast.success(modalMode === 'create' ? `"${payload.name}" created` : `"${payload.name}" updated`);
      fetchData();
      setModalOpen(false);
    } catch (err) {
      setFormError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Delete helpers ───────────────────────────────────────────────────────────
  const handleDelete = (id, name) => {
    setDeleteTargetId(id);
    setDeleteTargetName(name);
    setDeleteConfirmOpen(true);
  };

  const executeDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to delete');
      toast.success(`"${deleteTargetName}" deleted`);
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ─── Derived state ────────────────────────────────────────────────────────────
  const totalCount   = products.length;
  const activeCount  = products.filter(p => p.status === 'active').length;
  const draftCount   = products.filter(p => p.status === 'draft').length;

  const statusBadge = (s) => {
    if (s === 'active') return 'bg-green-950/20 text-green-500 border border-green-900/30';
    if (s === 'draft')  return 'bg-yellow-950/20 text-yellow-500 border border-yellow-900/30';
    return 'bg-neutral-900/60 text-neutral-500 border border-neutral-800';
  };

  const filteredProducts = products.filter(p => {
    const matchSearch   = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const catId         = p.category?._id || p.category;
    const matchCategory = !categoryFilter || catId === categoryFilter;
    const matchStatus   = !statusFilter   || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginated  = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 font-sans select-none">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">
            Inventory Management
          </span>
          <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight mt-1">
            Products
          </h2>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-semibold text-sm px-5 py-2.5 rounded-xl cursor-pointer transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Total Products', value: totalCount  },
          { label: 'Active',         value: activeCount },
          { label: 'Draft',          value: draftCount  },
        ].map((stat) => (
          <div key={stat.label} className="bg-neutral-950 border border-neutral-900 rounded-2xl px-5 py-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">{stat.label}</span>
            <span className="text-lg font-bold text-white tabular-nums">
              {loading ? <span className="inline-block h-5 w-6 bg-neutral-900 rounded animate-pulse" /> : stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Search + Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3 bg-neutral-900/40 border border-neutral-900 rounded-xl px-4 py-3">
          <Search className="h-4 w-4 text-neutral-600 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products by name or slug…"
            className="bg-transparent border-none text-xs text-white placeholder-neutral-600 outline-none w-full"
          />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="appearance-none bg-neutral-900 border border-neutral-900 rounded-xl px-4 py-3 pr-8 text-xs text-neutral-400 outline-none cursor-pointer w-full sm:w-44"
          >
            <option value="">All Categories</option>
            {categories.filter(c => !c.parentCategory).map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-600 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="appearance-none bg-neutral-900 border border-neutral-900 rounded-xl px-4 py-3 pr-8 text-xs text-neutral-400 outline-none cursor-pointer w-full sm:w-36"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archive">Archive</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-600 pointer-events-none" />
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 bg-neutral-900 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Shirt className="h-12 w-12 text-neutral-800" />
            <p className="text-xs text-neutral-500 uppercase tracking-widest">No products found</p>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-semibold text-sm px-5 py-2.5 rounded-xl cursor-pointer transition-all"
            >
              <Plus className="h-3.5 w-3.5" /><span>Add Product</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-900">
                  <th className="py-3.5 pl-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 w-16">Image</th>
                  <th className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Name</th>
                  <th className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Category</th>
                  <th className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">MOQ</th>
                  <th className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Status</th>
                  <th className="py-3.5 pr-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((product, idx) => (
                  <tr
                    key={product._id}
                    className={`border-b border-neutral-900 hover:bg-neutral-900/40 transition-colors ${idx % 2 === 0 ? 'bg-neutral-950' : 'bg-transparent'}`}
                  >
                    <td className="pl-6 py-3">
                      <div className="w-11 h-11 rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Shirt className="h-5 w-5 text-neutral-700" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-white truncate max-w-[160px]">{product.name}</div>
                      <div className="text-xs text-neutral-600 font-mono">{product.sku || product.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-neutral-400">{product.category?.name || '—'}</td>
                    <td className="px-4 py-3 text-neutral-400 font-mono">{product.minOrderQuantity || 50}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide ${statusBadge(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="pr-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg cursor-pointer transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                currentPage === page
                  ? 'bg-white border-white text-black font-extrabold'
                  : 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Next
          </button>
        </div>
      )}

      {/* ── Slide-In Panel Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setModalOpen(false)}
              className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              key="panel"
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 h-screen w-full max-w-lg bg-neutral-950 border-l border-neutral-900 z-50 overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 sticky top-0 bg-neutral-950 pb-4 border-b border-neutral-900 z-10">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                      {modalMode === 'create' ? 'New Entry' : 'Editing Entry'}
                    </p>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight leading-none">
                      {modalMode === 'create' ? 'Add Product' : 'Edit Product'}
                    </h3>
                  </div>
                  <button
                    onClick={() => !submitting && setModalOpen(false)}
                    disabled={submitting}
                    className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-lg cursor-pointer transition-colors mt-0.5"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <AdminProductForm
                  mode={modalMode}
                  initialData={selectedProduct}
                  categories={categories}
                  onSubmit={handleSubmit}
                  onCancel={() => setModalOpen(false)}
                  submitting={submitting}
                  formError={formError}
                  formSuccess={formSuccess}
                  uploading={uploading}
                  onImageUpload={handleImageUpload}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation Dialog ────────────────────────────────────────── */}
      <AnimatePresence>
        {deleteConfirmOpen && (
          <div className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center p-4">
            <motion.div
              key="delete-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmOpen(false)}
              className="absolute inset-0 w-screen h-screen bg-black/75 backdrop-blur-xs"
            />
            <motion.div
              key="delete-body"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-neutral-950 border border-neutral-900 rounded-2xl p-6 shadow-2xl z-10 text-center"
            >
              <div className="h-12 w-12 bg-red-950/20 border border-red-900/30 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-2">Confirm Delete</h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Permanently delete <span className="text-white font-bold">{deleteTargetName || 'this product'}</span>? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="flex-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-400 hover:text-white font-bold text-[11px] uppercase tracking-widest py-3 rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setDeleteConfirmOpen(false);
                    await executeDelete(deleteTargetId);
                  }}
                  className="flex-1 bg-white hover:bg-neutral-200 text-black font-extrabold text-[11px] uppercase tracking-widest py-3 rounded-lg cursor-pointer transition-all"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
