'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  ShieldAlert, 
  Check, 
  UserCheck, 
  UserPlus, 
  Lock, 
  Mail, 
  User,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import PasswordInput from '@/components/admin/PasswordInput';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: '', role: 'admin' });
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [isActive, setIsActive] = useState(true);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch users & current identity
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Failed to load admins:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Load the logged-in admin so permissions match the real role
    const getIdentity = async () => {
      try {
        const res = await fetch('/api/admin/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) setCurrentUser({ id: data.user.id, role: data.user.role });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getIdentity();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const openCreateModal = () => {
    if (currentUser.role !== 'superadmin') {
      toast.error('Only superadmins can add admin accounts');
      return;
    }
    setModalMode('create');
    setSelectedId(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole('admin');
    setIsActive(true);
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    if (currentUser.role !== 'superadmin') {
      toast.error('Only superadmins can edit admin accounts');
      return;
    }
    setModalMode('edit');
    setSelectedId(user._id);
    setName(user.name);
    setEmail(user.email);
    setPassword(''); // leave blank unless changing password
    setRole(user.role || 'admin');
    setIsActive(user.isActive !== undefined ? user.isActive : true);
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  // Submit Form: Create / Edit User
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    if (!name || !email || (modalMode === 'create' && !password)) {
      setFormError('Name, Email, and Password (for new users) are required fields');
      toast.error('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    const payload = {
      name,
      email,
      role,
      isActive,
    };

    if (password) {
      payload.password = password;
    }

    if (modalMode === 'edit') {
      payload.id = selectedId;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Operation failed');
      }

      toast.success(modalMode === 'create' ? `Admin "${name}" created` : `Admin "${name}" updated`);
      fetchUsers();
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
    if (currentUser.role !== 'superadmin') {
      toast.error('Only superadmins can delete admin accounts');
      return;
    }
    setDeleteTargetId(id);
    setDeleteTargetName(name);
    setDeleteConfirmOpen(true);
  };

  const executeDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      toast.success(`Admin "${deleteTargetName}" deleted`);
      fetchUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSuperadmin = currentUser.role === 'superadmin';

  return (
    <div className="space-y-6 font-sans select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">Access Control</span>
          <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight mt-1">Admin Registry</h2>
        </div>
        
        {isSuperadmin && (
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Admin</span>
          </button>
        )}
      </div>

      {/* Access Restriction Warning Banner */}
      {!isSuperadmin && (
        <div className="p-4 bg-yellow-950/20 border border-yellow-900/30 rounded-xl text-xs font-bold text-yellow-500 flex items-start gap-3">
          <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="uppercase tracking-wider">Superadmin Mode Required</p>
            <p className="text-xs text-neutral-450 font-normal mt-1 lowercase leading-relaxed">
              Your account role is currently configured as a default Admin. You have read-only access to this panel, and cannot create, modify, or delete admin accounts.
            </p>
          </div>
        </div>
      )}

      {/* Search Input Filter */}
      <div className="flex bg-neutral-950 border border-neutral-900 rounded-2xl p-4 items-center">
        <Search className="h-4 w-4 text-neutral-500 mr-3 flex-shrink-0" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search registered administrators by name, email..." 
          className="bg-transparent border-none text-xs text-white placeholder-neutral-600 outline-none w-full font-medium"
        />
      </div>

      {/* Users table */}
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4 animate-pulse">
            <div className="h-10 bg-neutral-900 rounded-lg w-full" />
            <div className="h-10 bg-neutral-900 rounded-lg w-full" />
            <div className="h-10 bg-neutral-900 rounded-lg w-full" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16 border-t border-neutral-900/60">
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">No administrative registry records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-900 text-neutral-550 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-4 pl-6 w-12">Badge</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">System Role</th>
                  <th className="py-4 px-6">Registry Date</th>
                  <th className="py-4 px-6">Account Status</th>
                  {isSuperadmin && <th className="py-4 pr-6 text-right w-24">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/40">
                {filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((user) => (
                  <tr key={user._id} className="group hover:bg-neutral-900/20 transition-colors">
                    <td className="py-4 pl-6">
                      <div className="h-8 w-8 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400">
                        <User className="h-4 w-4" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-white tracking-tight">{user.name}</td>
                    <td className="py-4 px-6 text-neutral-400 font-mono text-xs">{user.email}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${
                        user.role === 'superadmin' 
                          ? 'bg-neutral-900 text-white border border-neutral-700' 
                          : 'bg-neutral-900 text-neutral-450 border border-neutral-850'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-neutral-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                        user.isActive 
                          ? 'bg-green-950/20 text-green-500 border border-green-900/30' 
                          : 'bg-red-950/20 text-red-500 border border-red-900/30'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    {isSuperadmin && (
                      <td className="py-4 pr-6 text-right">
                        <div className="flex items-center justify-end space-x-2.5">
                           <button 
                             onClick={() => openEditModal(user)}
                             className="p-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-500 rounded text-neutral-400 hover:text-white transition-colors"
                           >
                             <Edit3 className="h-3.5 w-3.5" />
                           </button>
                           {user._id !== currentUser.id && (
                           <button 
                             onClick={() => handleDelete(user._id, user.name)}
                             className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 hover:border-red-900 rounded text-red-500 transition-colors"
                           >
                             <Trash2 className="h-3.5 w-3.5" />
                           </button>
                           )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && filteredUsers.length > itemsPerPage && (
        <div className="flex items-center justify-end gap-2 bg-neutral-950 border border-neutral-900 rounded-2xl p-4 mt-4 select-none">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
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
            onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredUsers.length / itemsPerPage), p + 1))}
            disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
            className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Next
          </button>
        </div>
      )}

      {/* Create / Edit User Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setModalOpen(false)}
              className="fixed inset-0 w-screen h-screen bg-black/75 backdrop-blur-xs z-50"
            />

            {/* Modal Body Slide-in right */}
            <motion.div 
              key="panel"
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 h-screen w-full max-w-md bg-neutral-950 border-l border-neutral-900 z-50 overflow-y-auto p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setModalOpen(false)}
                disabled={submitting}
                className="absolute right-4.5 top-4.5 p-1 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-lg cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  System Settings
                </p>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight leading-none">
                  {modalMode === 'create' ? 'Create Admin' : 'Edit Admin'}
                </h3>
              </div>

              {formError && (
                <div className="mb-5 p-4 bg-red-950/20 border border-red-900/30 rounded-lg text-xs font-bold text-red-400 flex items-start gap-2">
                  <Mail className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="mb-5 p-4 bg-green-950/20 border border-green-900/30 rounded-lg text-xs font-bold text-green-400 flex items-start gap-2">
                  <Check className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-neutral-450 block">Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Faisal Tariq"
                      className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-neutral-500 rounded-lg py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-600 outline-none"
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-neutral-455 block">Email Address</label>
                  <div className="relative font-mono">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-neutral-500 rounded-lg py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-650 outline-none"
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-neutral-450 block">
                    Password {modalMode === 'edit' && '(Leave blank to keep unchanged)'}
                  </label>
                  <PasswordInput
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={modalMode === 'edit' ? 'Leave blank to keep current' : 'Min. 6 characters'}
                    autoComplete="new-password"
                    className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-neutral-500 rounded-lg py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-600 outline-none"
                    disabled={submitting}
                  />
                </div>

                {/* Role selection */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-neutral-455 block">System Access Role</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-neutral-500 rounded-lg px-4 py-3.5 text-xs text-white outline-none cursor-pointer"
                    disabled={submitting}
                  >
                    <option value="admin">Admin (Read / Update only)</option>
                    <option value="superadmin">Superadmin (All permissions / Users CRUD)</option>
                  </select>
                </div>

                {/* Active Toggle (Only for edit modal) */}
                {modalMode === 'edit' && (
                  <div className="flex items-center space-x-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="isActive"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="h-4.5 w-4.5 bg-neutral-900/45 border border-neutral-800 rounded cursor-pointer accent-white"
                      disabled={submitting}
                    />
                    <label htmlFor="isActive" className="text-xs font-semibold uppercase tracking-wide text-neutral-300 cursor-pointer">
                      Admin Account Active
                    </label>
                  </div>
                )}

                {/* Submit Row */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-white hover:bg-neutral-200 disabled:bg-neutral-900 text-black disabled:text-neutral-600 font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm mt-3"
                >
                  {submitting ? (
                    <>
                      <span>Saving Admin Account</span>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    </>
                  ) : (
                    <span>Save Admin Account</span>
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
                Are you sure you want to permanently delete <span className="text-white font-bold">{deleteTargetName || "this admin account"}</span>? This process cannot be undone.
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
