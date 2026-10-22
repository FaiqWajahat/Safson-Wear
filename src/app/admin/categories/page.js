'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Upload,
  Loader2,
  X,
  AlertCircle,
  Check,
  Folder,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedId, setSelectedId] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [image, setImage] = useState('');
  const [heroHeading, setHeroHeading] = useState('');
  const [heroSubheading, setHeroSubheading] = useState('');
  const [heroBgImage, setHeroBgImage] = useState('');
  const [heroBgVideo, setHeroBgVideo] = useState('');
  const [heroImage1, setHeroImage1] = useState('');
  const [heroImage2, setHeroImage2] = useState('');
  const [heroImage3, setHeroImage3] = useState('');
  const [uploadingField, setUploadingField] = useState(null);
  const uploading = !!uploadingField;
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Sync Slug automatically when name changes (in create mode)
  useEffect(() => {
    if (modalMode === 'create') {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  }, [name, modalMode]);

  // Open modal for creating
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedId(null);
    setName('');
    setSlug('');
    setDescription('');
    setParentCategory('');
    setImage('');
    setHeroHeading('');
    setHeroSubheading('');
    setHeroBgImage('');
    setHeroBgVideo('');
    setHeroImage1('');
    setHeroImage2('');
    setHeroImage3('');
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (cat) => {
    setModalMode('edit');
    setSelectedId(cat._id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setParentCategory(cat.parentCategory?._id || cat.parentCategory || '');
    setImage(cat.image || '');
    setHeroHeading(cat.heroHeading || '');
    setHeroSubheading(cat.heroSubheading || '');
    setHeroBgImage(cat.heroBgImage || '');
    setHeroBgVideo(cat.heroBgVideo || '');
    setHeroImage1(cat.heroImage1 || '');
    setHeroImage2(cat.heroImage2 || '');
    setHeroImage3(cat.heroImage3 || '');
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  // Generic File Upload handler (Cloudinary / local upload)
  const handleGenericFileUpload = async (e, setter, fieldName, label = 'File') => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file
    if (!file) return;

    setUploadingField(fieldName);
    setFormError('');
    setFormSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload request failed');
      }

      setter(data.url);
      toast.success(`${label} uploaded`);
    } catch (err) {
      setFormError(err.message || `Failed to upload ${label.toLowerCase()}`);
      toast.error(err.message || `Failed to upload ${label.toLowerCase()}`);
    } finally {
      setUploadingField(null);
    }
  };

  // Submit Form: Create / Edit Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    if (!name || !slug) {
      setFormError('Name and Slug fields are required');
      toast.error('Name and slug are required');
      setSubmitting(false);
      return;
    }

    const payload = {
      name,
      slug,
      description,
      parentCategory: parentCategory || null,
      image,
      heroHeading,
      heroSubheading,
      heroBgImage,
      heroBgVideo,
      heroImage1,
      heroImage2,
      heroImage3,
    };

    if (modalMode === 'edit') {
      payload.id = selectedId;
    }

    try {
      const res = await fetch('/api/admin/categories', {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Operation failed');
      }

      toast.success(modalMode === 'create' ? `"${name}" created` : `"${name}" updated`);
      fetchCategories();
      setModalOpen(false);
    } catch (err) {
      setFormError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Confirmation triggers
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteTargetName, setDeleteTargetName] = useState('');

  const handleDelete = (id, name) => {
    setDeleteTargetId(id);
    setDeleteTargetName(name);
    setDeleteConfirmOpen(true);
  };

  const executeDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete category');
      }

      toast.success(`"${deleteTargetName}" deleted`);
      fetchCategories();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Derived stats
  const totalCount = categories.length;
  const parentCount = categories.filter((c) => !c.parentCategory).length;
  const subCount = categories.filter((c) => !!c.parentCategory).length;

  // Filter lists based on search query
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans select-none">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">
            Inventory Management
          </span>
          <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight mt-1">
            Categories
          </h2>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-semibold text-sm px-5 py-2.5 rounded-xl cursor-pointer transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: totalCount },
          { label: 'Parent Categories', value: parentCount },
          { label: 'Subcategories', value: subCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-950 border border-neutral-900 rounded-2xl px-5 py-3 flex items-center justify-between"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              {stat.label}
            </span>
            <span className="text-lg font-bold text-white tabular-nums">
              {loading ? (
                <span className="inline-block h-5 w-6 bg-neutral-900 rounded animate-pulse" />
              ) : (
                stat.value
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-neutral-900/40 border border-neutral-900 rounded-xl px-4 py-3">
        <Search className="h-4 w-4 text-neutral-600 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories by name or slug…"
          className="bg-transparent border-none text-xs text-white placeholder-neutral-600 outline-none w-full"
        />
      </div>

      {/* Table Card */}
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 bg-neutral-900 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Folder className="h-12 w-12 text-neutral-800" />
            <p className="text-xs text-neutral-500 uppercase tracking-widest">
              No categories found
            </p>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-semibold text-sm px-5 py-2.5 rounded-xl cursor-pointer transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Category</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-900">
                  <th className="py-3.5 pl-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 w-14">Image</th>
                  <th className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Name</th>
                  <th className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Slug</th>
                  <th className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Parent</th>
                  <th className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Description</th>
                  <th className="py-3.5 pr-6 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/40">
                {filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((cat) => (
                  <tr key={cat._id} className="hover:bg-neutral-900/20 transition-colors">
                    <td className="py-3.5 pl-6">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-10 w-10 rounded-lg object-cover border border-neutral-800 bg-neutral-900 flex-shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-600 flex-shrink-0">
                          <Folder className="h-4 w-4" />
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white tracking-tight">{cat.name}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-neutral-500">{cat.slug}</td>
                    <td className="py-3.5 px-4">
                      {cat.parentCategory?.name ? (
                        <span className="inline-block rounded-full text-[10px] font-semibold uppercase tracking-wide px-2.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-400">
                          {cat.parentCategory.name}
                        </span>
                      ) : (
                        <span className="text-neutral-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400 truncate max-w-xs">{cat.description || '—'}</td>
                    <td className="py-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id, cat.name)}
                          className="p-2 bg-red-950/10 hover:bg-red-950/30 border border-red-900/20 hover:border-red-900/50 rounded-lg text-red-500 transition-colors cursor-pointer"
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

      {/* Pagination Controls */}
      {!loading && filteredCategories.length > itemsPerPage && (
        <div className="flex items-center justify-end gap-2 bg-neutral-950 border border-neutral-900 rounded-2xl p-4 mt-4 select-none">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(filteredCategories.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-8 w-8 text-[11px] font-bold rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-white border-white text-black font-extrabold'
                  : 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredCategories.length / itemsPerPage), p + 1))}
            disabled={currentPage === Math.ceil(filteredCategories.length / itemsPerPage)}
            className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Next
          </button>
        </div>
      )}

      {/* Right-Side Slide-In Panel Modal */}
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
              className="fixed right-0 top-0 h-screen w-full max-w-md bg-neutral-950 border-l border-neutral-900 z-50 overflow-y-auto p-8 shadow-2xl"
            >
              {/* Panel Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    {modalMode === 'create' ? 'New Entry' : 'Editing'}
                  </p>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight leading-none">
                    {modalMode === 'create' ? 'Create Category' : 'Edit Category'}
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

              {formError && (
                <div className="mb-5 p-4 bg-red-950/20 border border-red-900/30 rounded-lg text-xs font-bold text-red-400 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="mb-5 p-4 bg-green-950/20 border border-green-900/30 rounded-lg text-xs font-bold text-green-400 flex items-start gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Compression Wear"
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                    disabled={submitting}
                  />
                </div>

                {/* URL Slug */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="compression-wear"
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none font-mono transition-colors"
                    disabled={submitting}
                  />
                </div>

                {/* Parent Category */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                    Parent Category
                  </label>
                  <select
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white outline-none cursor-pointer transition-colors"
                    disabled={submitting}
                  >
                    <option value="">None (Root Level Category)</option>
                    {categories
                      .filter((cat) => cat._id !== selectedId && !cat.parentCategory)
                      .map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide short B2B specifications details about this category…"
                    rows={3}
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none resize-none transition-colors"
                    disabled={submitting}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                    Category Thumbnail
                  </label>
                  <label className="relative flex flex-col items-center justify-center w-full h-28 border border-dashed border-neutral-800 hover:border-neutral-600 bg-neutral-900/30 rounded-xl cursor-pointer transition-colors group">
                    {image ? (
                      <>
                        <img
                          src={image}
                          alt="Preview"
                          className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-40"
                        />
                        <div className="relative z-10 flex flex-col items-center gap-1">
                          <Check className="h-5 w-5 text-green-400" />
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-green-400">
                            Image Ready
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setImage(''); }}
                          className="absolute top-2 right-2 z-20 h-6 w-6 bg-black/70 hover:bg-red-900/80 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </>
                    ) : uploadingField === 'image' ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-5 w-5 text-neutral-450 animate-spin" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                          Uploading…
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-neutral-600 group-hover:text-neutral-400 transition-colors">
                        <Upload className="h-5 w-5" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider">
                          Click to upload image
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGenericFileUpload(e, setImage, 'image', 'Thumbnail')}
                      className="hidden"
                      disabled={uploading || submitting}
                    />
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Or paste image URL directly…"
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                    disabled={submitting}
                  />
                </div>

                {/* Hero Customize Section */}
                <div className="border-t border-neutral-900 pt-6 mt-6 space-y-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Hero Section Customization
                  </h4>

                  {/* Hero Heading */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                      Hero Title / Heading
                    </label>
                    <input
                      type="text"
                      value={heroHeading}
                      onChange={(e) => setHeroHeading(e.target.value)}
                      placeholder="e.g. PERFORMANCE CYCLING WEAR"
                      className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                      disabled={submitting}
                    />
                  </div>

                  {/* Hero Subheading */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                      Hero Description / Tagline
                    </label>
                    <textarea
                      value={heroSubheading}
                      onChange={(e) => setHeroSubheading(e.target.value)}
                      placeholder="e.g. Engineered for aerodynamic speed and long endurance comfort…"
                      rows={2}
                      className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none resize-none transition-colors"
                      disabled={submitting}
                    />
                  </div>

                  {/* Hero Background Image */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                      Hero Background Image
                    </label>
                    <label className="relative flex flex-col items-center justify-center w-full h-20 border border-dashed border-neutral-800 hover:border-neutral-600 bg-neutral-900/30 rounded-xl cursor-pointer transition-colors group">
                      {uploadingField === 'heroBgImage' ? (
                        <div className="flex flex-col items-center gap-1 text-neutral-400">
                          <Loader2 className="h-4.5 w-4.5 animate-spin text-neutral-450" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider">
                            Uploading…
                          </span>
                        </div>
                      ) : heroBgImage ? (
                        <>
                          <img
                            src={heroBgImage}
                            alt="Background Preview"
                            className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-40"
                          />
                          <div className="relative z-10 flex flex-col items-center">
                            <Check className="h-4 w-4 text-green-400" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-green-400">
                              Bg Image Set
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setHeroBgImage(''); }}
                            className="absolute top-1 right-1 z-20 h-5 w-5 bg-black/70 hover:bg-red-900/80 rounded-full flex items-center justify-center text-white transition-colors"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-neutral-650 group-hover:text-neutral-500 transition-colors">
                          <Upload className="h-4 w-4" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider">
                            Upload Background Image
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleGenericFileUpload(e, setHeroBgImage, 'heroBgImage', 'Bg Image')}
                        className="hidden"
                        disabled={uploading || submitting}
                      />
                    </label>
                    <input
                      type="text"
                      value={heroBgImage}
                      onChange={(e) => setHeroBgImage(e.target.value)}
                      placeholder="Or paste background image URL directly…"
                      className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                      disabled={submitting}
                    />
                  </div>

                  {/* Hero Background Video */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                      Hero Background Video
                    </label>
                    <label className="relative flex flex-col items-center justify-center w-full h-20 border border-dashed border-neutral-800 hover:border-neutral-600 bg-neutral-900/30 rounded-xl cursor-pointer transition-colors group">
                      {uploadingField === 'heroBgVideo' ? (
                        <div className="flex flex-col items-center gap-1 text-neutral-400">
                          <Loader2 className="h-4.5 w-4.5 animate-spin text-neutral-450" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider">
                            Uploading…
                          </span>
                        </div>
                      ) : heroBgVideo ? (
                        <>
                          <div className="relative z-10 flex flex-col items-center">
                            <Check className="h-4 w-4 text-green-400" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-green-400 text-center px-2 truncate max-w-[200px]">
                              Video: {heroBgVideo.split('/').pop()}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setHeroBgVideo(''); }}
                            className="absolute top-1 right-1 z-20 h-5 w-5 bg-black/70 hover:bg-red-900/80 rounded-full flex items-center justify-center text-white transition-colors"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-neutral-650 group-hover:text-neutral-500 transition-colors">
                          <Upload className="h-4 w-4" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider">
                            Upload Background Video
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleGenericFileUpload(e, setHeroBgVideo, 'heroBgVideo', 'Bg Video')}
                        className="hidden"
                        disabled={uploading || submitting}
                      />
                    </label>
                    <input
                      type="text"
                      value={heroBgVideo}
                      onChange={(e) => setHeroBgVideo(e.target.value)}
                      placeholder="Or paste background video URL directly…"
                      className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                      disabled={submitting}
                    />
                    <p className="text-[11px] text-neutral-500 leading-normal mt-1">
                      ⚠️ Note: Stock sites like Pixabay block direct hotlinking (returning a 403 Forbidden error). For best results, download the video to your device first, then click <strong>Upload Background Video</strong> above to host it on Cloudinary.
                    </p>
                  </div>

                  {/* Left Column Dynamic Images (Grid cards side elements) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                      Grid Showcase Images (3 Cards)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: heroImage1, set: setHeroImage1, label: 'Image 1' },
                        { val: heroImage2, set: setHeroImage2, label: 'Image 2' },
                        { val: heroImage3, set: setHeroImage3, label: 'Image 3' },
                      ].map((item, idx) => {
                        const fieldKey = `heroImage${idx + 1}`;
                        return (
                          <div key={idx} className="space-y-1">
                            <label className="relative flex flex-col items-center justify-center w-full h-16 border border-dashed border-neutral-800 hover:border-neutral-600 bg-neutral-900/30 rounded-lg cursor-pointer transition-colors group">
                              {uploadingField === fieldKey ? (
                                <div className="flex flex-col items-center gap-0.5 text-neutral-400">
                                  <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-450" />
                                  <span className="text-[10px] font-semibold uppercase tracking-wider">
                                    Uploading…
                                  </span>
                                </div>
                              ) : item.val ? (
                                <>
                                  <img
                                    src={item.val}
                                    alt="Card preview"
                                    className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-40"
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); item.set(''); }}
                                    className="absolute top-0.5 right-0.5 z-20 h-4 w-4 bg-black/70 hover:bg-red-900/80 rounded-full flex items-center justify-center text-white transition-colors"
                                  >
                                    <X className="h-2 w-2" />
                                  </button>
                                </>
                              ) : (
                                <div className="flex flex-col items-center text-center p-1 text-neutral-650 group-hover:text-neutral-500">
                                  <Upload className="h-3.5 w-3.5" />
                                  <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5">
                                    {item.label}
                                  </span>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleGenericFileUpload(e, item.set, fieldKey, item.label)}
                                className="hidden"
                                disabled={uploading || submitting}
                              />
                            </label>
                            <input
                              type="text"
                              value={item.val}
                              onChange={(e) => item.set(e.target.value)}
                              placeholder="URL…"
                              className="w-full bg-neutral-900/50 border border-neutral-800 rounded px-1.5 py-1 text-[10px] text-white placeholder-neutral-700 outline-none truncate"
                              disabled={submitting}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="w-full bg-white hover:bg-neutral-100 disabled:bg-neutral-900 text-black disabled:text-neutral-600 font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving…</span>
                    </>
                  ) : (
                    <span>Save Category</span>
                  )}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reusable Delete Confirmation Dialog Modal */}
      <AnimatePresence>
        {deleteConfirmOpen && (
          <div className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              key="delete-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmOpen(false)}
              className="absolute inset-0 w-screen h-screen bg-black/75 backdrop-blur-xs"
            />
            {/* Modal Body */}
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
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-2">Confirm Destruction</h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Are you sure you want to permanently delete category <span className="text-white font-bold">{deleteTargetName || "this category"}</span>? This process cannot be undone.
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
