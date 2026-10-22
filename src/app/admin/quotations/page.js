'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Eye, 
  Trash2, 
  X, 
  Download, 
  Calendar, 
  Briefcase, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Detail Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [submittingStatus, setSubmittingStatus] = useState(false);

  // Fetch RFQs
  const fetchQuotations = async () => {
    try {
      const res = await fetch('/api/admin/quotations');
      if (res.ok) {
        const data = await res.json();
        setQuotations(data.quotations || []);
      }
    } catch (err) {
      console.error('Failed to load quotations:', err);
      toast.error('Failed to load quotations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Update Quotation Status
  const handleUpdateStatus = async (id, newStatus) => {
    setSubmittingStatus(true);
    try {
      const res = await fetch('/api/admin/quotations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      // Sync local state
      setSelectedQuotation(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success(`Status changed to ${newStatus}`);
      fetchQuotations();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmittingStatus(false);
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
      const res = await fetch(`/api/admin/quotations?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete quotation');
      }

      setModalOpen(false);
      toast.success(`Quotation from "${deleteTargetName}" deleted`);
      fetchQuotations();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Open detailed panel
  const openDetailModal = (quote) => {
    setSelectedQuotation(quote);
    setModalOpen(true);
  };

  // Filters
  const filteredQuotations = quotations.filter(quote => {
    const matchesSearch = (quote.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (quote.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (quote.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || quote.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans select-none">
      
      {/* Page Header */}
      <div>
        <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Inquiries & Leads</span>
        <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight mt-1">Quotations</h2>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-neutral-950 border border-neutral-900 rounded-2xl p-4 items-center">
        {/* Search */}
        <div className="sm:col-span-2 flex items-center bg-neutral-900/40 border border-neutral-900 rounded-lg px-3 py-2">
          <Search className="h-4 w-4 text-neutral-500 mr-2 flex-shrink-0" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries by company name, client name, email..." 
            className="bg-transparent border-none text-xs text-white placeholder-neutral-600 outline-none w-full font-medium"
          />
        </div>
        {/* Status filter select */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-neutral-900/40 border border-neutral-900 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
        >
          <option value="">All Inquiry Statuses</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="responded">Responded</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Quotations List Table */}
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4 animate-pulse">
            <div className="h-10 bg-neutral-900 rounded-lg w-full" />
            <div className="h-10 bg-neutral-900 rounded-lg w-full" />
            <div className="h-10 bg-neutral-900 rounded-lg w-full" />
          </div>
        ) : filteredQuotations.length === 0 ? (
          <div className="text-center py-16 border-t border-neutral-900/60">
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">No quote inquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-900 text-neutral-550 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-4 pl-6">Company</th>
                  <th className="py-4 px-6">Client Contact</th>
                  <th className="py-4 px-6">Items Count</th>
                  <th className="py-4 px-6">Date Submitted</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 pr-6 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/40">
                {filteredQuotations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((quote) => (
                  <tr key={quote._id} className="group hover:bg-neutral-900/20 transition-colors">
                    <td className="py-4 pl-6 font-semibold text-white tracking-tight">{quote.companyName || '—'}</td>
                    <td className="py-4 px-6">
                      <span className="font-semibold block text-neutral-350">{quote.name}</span>
                      <span className="text-xs text-neutral-500">{quote.email}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-neutral-300 font-semibold">{quote.items?.length || 0} RFQ items</td>
                    <td className="py-4 px-6 font-mono text-neutral-450 text-xs">
                      {new Date(quote.createdAt).toLocaleDateString()} {new Date(quote.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        quote.status === 'pending'
                          ? 'bg-neutral-900 text-neutral-450 border border-neutral-800'
                          : quote.status === 'reviewed'
                          ? 'bg-yellow-950/20 text-yellow-500 border border-yellow-900/30'
                          : quote.status === 'responded'
                          ? 'bg-blue-950/20 text-blue-500 border border-blue-900/30'
                          : 'bg-green-950/20 text-green-500 border border-green-900/30'
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end space-x-2.5">
                        <button 
                          onClick={() => openDetailModal(quote)}
                          className="p-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-500 rounded text-neutral-400 hover:text-white transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
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
      {!loading && filteredQuotations.length > itemsPerPage && (
        <div className="flex items-center justify-end gap-2 bg-neutral-950 border border-neutral-900 rounded-2xl p-4 mt-4 select-none">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(filteredQuotations.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
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
            onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredQuotations.length / itemsPerPage), p + 1))}
            disabled={currentPage === Math.ceil(filteredQuotations.length / itemsPerPage)}
            className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Next
          </button>
        </div>
      )}

      {/* RFQ Detail Modal View */}
      <AnimatePresence>
        {modalOpen && selectedQuotation && (
          <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 w-screen h-screen bg-black/75 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-[620px] bg-neutral-950 border border-neutral-900 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-y-auto max-h-[90vh]"
            >
              {/* Close button */}
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute right-4.5 top-4.5 p-1 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-6 flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-white" />
                <span>RFQ Quotation Details</span>
              </h3>

              {/* Status Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-neutral-900/35 border border-neutral-900 rounded-lg mb-6 gap-4">
                <div>
                  <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Inquiry Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      selectedQuotation.status === 'pending'
                        ? 'bg-neutral-900 text-neutral-450 border border-neutral-800'
                        : selectedQuotation.status === 'reviewed'
                        ? 'bg-yellow-950/20 text-yellow-500 border border-yellow-900/30'
                        : selectedQuotation.status === 'responded'
                        ? 'bg-blue-950/20 text-blue-500 border border-blue-900/30'
                        : 'bg-green-950/20 text-green-500 border border-green-900/30'
                    }`}>
                      {selectedQuotation.status}
                    </span>
                  </div>
                </div>

                {/* Status action buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={submittingStatus}
                    onClick={() => handleUpdateStatus(selectedQuotation._id, 'reviewed')}
                    className="text-[11px] font-semibold uppercase tracking-wide text-yellow-500 border border-yellow-900/30 bg-yellow-950/10 hover:bg-yellow-950/30 px-3 py-1.5 rounded cursor-pointer transition-colors"
                  >
                    Mark Reviewed
                  </button>
                  <button
                    disabled={submittingStatus}
                    onClick={() => handleUpdateStatus(selectedQuotation._id, 'responded')}
                    className="text-[11px] font-semibold uppercase tracking-wide text-blue-500 border border-blue-900/30 bg-blue-950/10 hover:bg-blue-950/30 px-3 py-1.5 rounded cursor-pointer transition-colors"
                  >
                    Mark Responded
                  </button>
                  <button
                    disabled={submittingStatus}
                    onClick={() => handleUpdateStatus(selectedQuotation._id, 'completed')}
                    className="text-[11px] font-semibold uppercase tracking-wide text-green-500 border border-green-900/30 bg-green-950/10 hover:bg-green-950/30 px-3 py-1.5 rounded cursor-pointer transition-colors"
                  >
                    Mark Completed
                  </button>
                </div>
              </div>

              {/* Client specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-neutral-900 pb-6 mb-6">
                
                {/* Left: Contact */}
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-450 block">Client Contact</span>
                  
                  <div className="flex items-center space-x-3 text-xs">
                    <Briefcase className="h-4 w-4 text-neutral-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider leading-none">Company</p>
                      <p className="font-bold text-white uppercase mt-1">{selectedQuotation.companyName || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs">
                    <Mail className="h-4 w-4 text-neutral-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider leading-none">Email Address</p>
                      <a href={`mailto:${selectedQuotation.email}`} className="font-bold text-white hover:underline mt-1 block">{selectedQuotation.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs">
                    <Phone className="h-4 w-4 text-neutral-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider leading-none">Phone Number</p>
                      <a href={`tel:${selectedQuotation.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-white hover:underline mt-1 block">{selectedQuotation.phone}</a>
                    </div>
                  </div>
                </div>

                {/* Right: Message and details */}
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-450 block">RFQ Parameters</span>
                  
                  <div className="flex items-center space-x-3 text-xs">
                    <Clock className="h-4 w-4 text-neutral-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider leading-none">Submitted Date</p>
                      <p className="font-bold text-white mt-1">{new Date(selectedQuotation.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider leading-none">Client Note Message</p>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed bg-neutral-900/30 border border-neutral-900 p-3 rounded-lg mt-1 max-h-[160px] overflow-y-auto whitespace-pre-line">
                      {selectedQuotation.message || 'No additional custom message provided.'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Items List requested */}
              <div className="space-y-4 border-b border-neutral-900 pb-6 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-450 block">Requested Products (RFQ Panels)</span>
                
                <div className="space-y-3">
                  {selectedQuotation.items && selectedQuotation.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start bg-neutral-900/35 border border-neutral-900 rounded-lg p-4 gap-4">
                      <div>
                        <p className="font-bold text-white uppercase text-xs">{item.productName}</p>
                        {item.notes && (
                          <p className="text-[13px] text-neutral-450 font-light mt-1.5 leading-relaxed bg-black/30 p-2.5 rounded border border-neutral-900 whitespace-pre-line">
                            <span className="font-bold text-neutral-550 block text-[11px] uppercase tracking-wider mb-0.5">Parameters:</span>
                            {item.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider block">Quantity</span>
                        <span className="font-mono font-bold text-white text-xs mt-1 block">{item.quantity} pcs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments tech packs */}
              <div className="space-y-4 mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-450 block">Technical Pack Attachments</span>
                
                {selectedQuotation.attachments && selectedQuotation.attachments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedQuotation.attachments.map((fileUrl, index) => (
                      <div key={index} className="flex items-center justify-between bg-neutral-900/35 border border-neutral-900 rounded-lg p-3 gap-2">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <FileText className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                          <span className="text-[13px] font-semibold text-neutral-300 truncate">Tech Pack {index + 1}</span>
                        </div>
                        <a 
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 rounded text-neutral-400 hover:text-white transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-semibold uppercase tracking-wider p-4 bg-neutral-900/20 border border-dashed border-neutral-900 rounded-lg">
                    <AlertCircle className="h-4.5 w-4.5" />
                    <span>No Tech Pack files attached with this inquiry</span>
                  </div>
                )}
              </div>

              {/* Delete trigger */}
              <div className="pt-4 border-t border-neutral-900/70 flex justify-end">
                <button
                  onClick={() => handleDelete(selectedQuotation._id, selectedQuotation.companyName || selectedQuotation.name)}
                  className="flex items-center gap-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 hover:border-red-900 text-red-500 font-extrabold text-xs uppercase tracking-widest px-4 py-2.5 rounded transition-all cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete Quotation</span>
                </button>
              </div>

            </motion.div>
          </div>
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
                Are you sure you want to permanently delete quotation request from <span className="text-white font-bold">{deleteTargetName || "this company"}</span>? This process cannot be undone.
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
