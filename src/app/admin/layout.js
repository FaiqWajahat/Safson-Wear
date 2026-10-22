'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Layers, 
  Grid, 
  FileText, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  Moon,
  ExternalLink,
  PanelLeftOpen,
  PanelLeftClose,
} from 'lucide-react';
import AdminToaster from '@/components/admin/AdminToaster';

const PAGE_META = {
  '/admin': { title: 'Dashboard', description: 'Overview of your catalog and quote requests.' },
  '/admin/categories': { title: 'Categories', description: 'Organise Sports Wear and Street Wear lines.' },
  '/admin/products': { title: 'Products', description: 'Create and manage catalog products.' },
  '/admin/quotations': { title: 'Quotations', description: 'Review and respond to B2B quote requests.' },
  '/admin/users': { title: 'Admins', description: 'Manage who can access this portal.' },
};

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [adminUser, setAdminUser] = useState({ name: 'Admin', role: 'admin', email: '' });
  const [theme, setTheme] = useState('dark');

  // Load theme from localStorage on client-side mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin_theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('admin_theme', newTheme);
  };

  // Fetch logged in user identity on mount
  useEffect(() => {
    if (pathname === '/admin/login') return;
    
    const getSessionUser = async () => {
      try {
        const res = await fetch('/api/admin/auth/me');
        if (res.status === 401) {
          // Session revoked (e.g. account deactivated) — clear the cookie so the proxy allows the login page
          await fetch('/api/admin/auth/logout', { method: 'POST' }).catch(() => {});
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.success && data.user) {
          setAdminUser(data.user);
        }
      } catch (err) {
        console.error('Failed to get admin session details:', err);
      }
    };
    getSessionUser();
  }, [pathname, router]);

  const toaster = <AdminToaster theme={theme === 'light' ? 'light' : 'dark'} />;

  // If we are on the login page, bypass the sidebar layout wrapper entirely
  if (pathname === '/admin/login') {
    return <>{toaster}{children}</>;
  }

  const isActivePath = (path) => (path === '/admin' ? pathname === '/admin' : pathname.startsWith(path));
  const pageMeta = PAGE_META[pathname] || { title: 'Admin', description: '' };
  const initials = (adminUser.name || 'A').split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Products', path: '/admin/products', icon: Grid },
    { label: 'Quotations', path: '/admin/quotations', icon: FileText },
    { label: 'Admins', path: '/admin/users', icon: Users },
  ];

  return (
    <>
    {toaster}
    <div className={`min-h-screen bg-black text-white flex flex-col md:flex-row font-sans selection:bg-neutral-850 ${theme === 'light' ? 'admin-theme-light' : ''}`}>
      <style>{`
        /* Global Scrollbars */
        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #262626 !important;
          border-radius: 4px !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #404040 !important;
        }

        /* Strict input focus styles */
        input:focus, select:focus, textarea:focus {
          border-color: #ffffff !important;
          box-shadow: none !important;
          outline: none !important;
        }

        /* Default Dark Mode badging overrides for strict B&W theme */
        .bg-yellow-950\\/20.text-yellow-500 {
          background-color: #171717 !important;
          color: #a3a3a3 !important;
          border-color: #262626 !important;
        }
        .bg-blue-950\\/20.text-blue-500 {
          background-color: #262626 !important;
          color: #e5e7eb !important;
          border-color: #404040 !important;
        }
        .bg-green-950\\/20.text-green-500 {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #ffffff !important;
        }
        .bg-red-950\\/20.text-red-500 {
          background-color: #171717 !important;
          color: #f5f5f5 !important;
          border-color: #ef4444 !important;
        }

        /* ── LIGHT MODE STYLING SYSTEM ── */
        .admin-theme-light {
          background-color: #fafafa !important;
          color: #000000 !important;
        }
        .admin-theme-light ::-webkit-scrollbar-thumb {
          background: #d1d5db !important;
        }
        .admin-theme-light ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af !important;
        }
        .admin-theme-light main {
          background-color: #fafafa !important;
          color: #000000 !important;
        }
        .admin-theme-light aside {
          background-color: #ffffff !important;
          border-color: #e5e7eb !important;
        }
        .admin-theme-light header {
          background-color: #ffffff !important;
          border-color: #e5e7eb !important;
        }
        .admin-theme-light input:focus, .admin-theme-light select:focus, .admin-theme-light textarea:focus {
          border-color: #000000 !important;
        }
        .admin-theme-light input::placeholder, .admin-theme-light textarea::placeholder {
          color: #8e8e8e !important;
        }
        .admin-theme-light .bg-black {
          background-color: #fafafa !important;
        }
        .admin-theme-light .bg-neutral-950 {
          background-color: #ffffff !important;
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .bg-neutral-900 {
          background-color: #f3f4f6 !important;
        }
        
        /* Map opacity backgrounds */
        .admin-theme-light .bg-black\\/30,
        .admin-theme-light .bg-black\\/20,
        .admin-theme-light .bg-black\\/40 {
          background-color: #fafafa !important;
        }
        .admin-theme-light .bg-neutral-900\\/60,
        .admin-theme-light .bg-neutral-900\\/50,
        .admin-theme-light .bg-neutral-900\\/40,
        .admin-theme-light .bg-neutral-900\\/35,
        .admin-theme-light .bg-neutral-900\\/20,
        .admin-theme-light .bg-neutral-900\\/10 {
          background-color: #f3f4f6 !important;
        }
        
        .admin-theme-light .bg-neutral-955\\/50 {
          background-color: #ffffff !important;
        }
        .admin-theme-light .bg-neutral-950\\/25 {
          background-color: #ffffff !important;
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .bg-neutral-950\\/70 {
          background-color: #ffffff !important;
        }
        .admin-theme-light .border-neutral-900 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .border-neutral-900\\/60 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .border-neutral-900\\/70 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .border-neutral-800 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .border-neutral-850 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .divide-neutral-900\\/40 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .divide-neutral-900 {
          border-color: #e5e7eb !important;
        }
        .admin-theme-light .h-px.bg-neutral-200\\/60 {
          background-color: #e5e7eb !important;
        }
        
        /* Typography overrides with contrast */
        .admin-theme-light .text-white {
          color: #000000 !important;
        }
        .admin-theme-light .text-neutral-305, .admin-theme-light .text-neutral-300 {
          color: #1f2937 !important;
        }
        .admin-theme-light .text-neutral-400 {
          color: #374151 !important;
        }
        .admin-theme-light .text-neutral-550 {
          color: #4b5563 !important;
        }
        .admin-theme-light .text-neutral-500 {
          color: #4b5563 !important;
        }
        .admin-theme-light .text-neutral-650 {
          color: #6b7280 !important;
        }
        .admin-theme-light .text-neutral-600 {
          color: #4b5563 !important;
        }
        .admin-theme-light .text-neutral-450 {
          color: #374151 !important;
        }
        .admin-theme-light .text-neutral-455 {
          color: #374151 !important;
        }
        
        /* Table rows & hovers */
        .admin-theme-light tr.hover\\:bg-neutral-900\\/20:hover {
          background-color: #f3f4f6 !important;
        }
        .admin-theme-light tr.hover\\:bg-neutral-900\\/25:hover {
          background-color: #f3f4f6 !important;
        }
        .admin-theme-light td {
          color: #000000 !important;
        }
        .admin-theme-light th {
          color: #4b5563 !important;
        }
        
        /* Interactive component overrides */
        .admin-theme-light select, .admin-theme-light input, .admin-theme-light textarea {
          background-color: #ffffff !important;
          border-color: #d1d5db !important;
          color: #000000 !important;
        }
        .admin-theme-light select option {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        .admin-theme-light .bg-neutral-900.border-neutral-800 {
          background-color: #ffffff !important;
          border-color: #d1d5db !important;
          color: #000000 !important;
        }
        
        /* Action buttons flip to Black in Light Mode */
        .admin-theme-light button.bg-white {
          background-color: #000000 !important;
          color: #ffffff !important;
          border-color: #000000 !important;
        }
        .admin-theme-light button.bg-white:hover {
          background-color: #1f2937 !important;
          color: #ffffff !important;
        }
        
        /* Inputs & Checkbox theme */
        .admin-theme-light input[type="checkbox"] {
          accent-color: #000000 !important;
        }
        
        /* Strict hover colors to prevent invisible/white text in Light Mode */
        .admin-theme-light .hover\\:text-white:hover {
          color: #000000 !important;
        }
        .admin-theme-light .hover\\:bg-neutral-900\\/40:hover {
          background-color: #f3f4f6 !important;
        }
        .admin-theme-light .hover\\:bg-neutral-900:hover {
          background-color: #f3f4f6 !important;
        }
        .admin-theme-light .hover\\:bg-neutral-800:hover {
          background-color: #e5e7eb !important;
        }
        .admin-theme-light .group:hover .group-hover\\:text-white {
          color: #000000 !important;
        }
        .admin-theme-light .group:hover .group-hover\\:text-neutral-305,
        .admin-theme-light .group:hover .group-hover\\:text-neutral-300 {
          color: #000000 !important;
        }
        
        /* SVG Graph nodes / lines */
        .admin-theme-light svg line {
          stroke: #e5e7eb !important;
        }
        .admin-theme-light svg stop[offset="0%"] {
          stop-color: #000000 !important;
          stop-opacity: 0.12 !important;
        }
        .admin-theme-light svg stop[offset="100%"] {
          stop-color: #000000 !important;
          stop-opacity: 0.00 !important;
        }
        .admin-theme-light svg path[stroke="#ffffff"] {
          stroke: #000000 !important;
        }
        .admin-theme-light svg .recharts-dot,
        .admin-theme-light svg .recharts-active-dot {
          fill: #000000 !important;
          stroke: #ffffff !important;
        }
        .admin-theme-light .admin-tooltip {
          background-color: #ffffff !important;
          border-color: #d1d5db !important;
          color: #000000 !important;
        }
        .admin-theme-light .bg-neutral-850 {
          background-color: #f3f4f6 !important;
          border-color: #d1d5db !important;
          color: #000000 !important;
        }
        .admin-theme-light .ring-neutral-950 {
          --tw-ring-color: #ffffff !important;
        }
        
        /* Alert box overrides */
        .admin-theme-light .bg-red-950\\/5 {
          background-color: #fef2f2 !important;
          border-color: #fca5a5 !important;
        }
        .admin-theme-light .hover\\:bg-red-950\\/20:hover {
          background-color: #fee2e2 !important;
        }
        .admin-theme-light .admin-active-bar {
          background-color: #000000 !important;
        }

        /* Status colors & tags */
        .admin-theme-light .bg-yellow-950\\/20.text-yellow-500 {
          background-color: #f3f4f6 !important;
          color: #1f2937 !important;
          border-color: #d1d5db !important;
        }
        .admin-theme-light .bg-blue-950\\/20.text-blue-500 {
          background-color: #e5e7eb !important;
          color: #111827 !important;
          border-color: #9ca3af !important;
        }
        .admin-theme-light .bg-green-950\\/20.text-green-500 {
          background-color: #000000 !important;
          color: #ffffff !important;
          border-color: #000000 !important;
        }
        .admin-theme-light .bg-red-950\\/20.text-red-500 {
          background-color: #fee2e2 !important;
          color: #991b1b !important;
          border-color: #fca5a5 !important;
        }
        
        /* RFQ detail action buttons color overrides */
        .admin-theme-light .text-yellow-500.border-yellow-900\\/30.bg-yellow-950\\/10 {
          color: #4b5563 !important;
          border-color: #d1d5db !important;
          background-color: #ffffff !important;
        }
        .admin-theme-light .text-yellow-500.border-yellow-900\\/30.bg-yellow-950\\/10:hover {
          background-color: #f3f4f6 !important;
          color: #000000 !important;
        }

        .admin-theme-light .text-blue-500.border-blue-900\\/30.bg-blue-950\\/10 {
          color: #1f2937 !important;
          border-color: #9ca3af !important;
          background-color: #e5e7eb !important;
        }
        .admin-theme-light .text-blue-500.border-blue-900\\/30.bg-blue-950\\/10:hover {
          background-color: #d1d5db !important;
          color: #000000 !important;
        }

        .admin-theme-light .text-green-500.border-green-900\\/30.bg-green-950\\/10 {
          color: #ffffff !important;
          border-color: #000000 !important;
          background-color: #000000 !important;
        }
        .admin-theme-light .text-green-500.border-green-900\\/30.bg-green-950\\/10:hover {
          background-color: #1f2937 !important;
          color: #ffffff !important;
        }
        
        /* Modal and Slide-In Backdrops */
        .admin-theme-light .bg-black\\/70,
        .admin-theme-light .bg-black\\/75,
        .admin-theme-light .bg-black\\/60 {
          background-color: rgba(0, 0, 0, 0.4) !important;
          backdrop-filter: blur(4px) !important;
        }
        /* ── Refreshed shell (sidebar / header) ── */
        .admin-nav-active { background-color: #ffffff; color: #000000; }
        .admin-nav-active svg { color: #000000 !important; }
        .admin-theme-light .admin-nav-active { background-color: #000000 !important; color: #ffffff !important; }
        .admin-theme-light .admin-nav-active svg { color: #ffffff !important; }
        .admin-theme-light .admin-logo { filter: invert(1); }
        .admin-theme-light .admin-avatar { background-color: #000000 !important; color: #ffffff !important; }
      `}</style>

      {/* 1. Mobile sticky header */}
      <header className="md:hidden flex items-center justify-between bg-neutral-950/90 backdrop-blur-md border-b border-neutral-900 px-4 h-16 sticky top-0 z-30">
        <Link href="/admin" className="flex items-center">
          <Image src="/safson-lockup-white.png" alt="Safson Wear" width={2108} height={536} className="admin-logo h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2.5 hover:bg-neutral-900 rounded-xl text-neutral-400 hover:text-white cursor-pointer transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 hover:bg-neutral-900 rounded-xl text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* 2. Mobile drawer sidebar (overlay) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 left-0 w-72 bg-neutral-950 border-r border-neutral-900 z-50 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-900">
                <Image src="/safson-lockup-white.png" alt="Safson Wear" width={2108} height={536} className="admin-logo h-7 w-auto" />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-neutral-900 rounded-xl text-neutral-400 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 px-3 py-5 overflow-y-auto">
                <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-600">Menu</p>
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = isActivePath(item.path);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive ? 'admin-nav-active' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              <div className="p-4 border-t border-neutral-900 space-y-3">
                <UserCard user={adminUser} initials={initials} />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-neutral-950 border-r border-neutral-900 transition-[width] duration-300 sticky top-0 h-screen select-none ${
          desktopCollapsed ? 'w-20' : 'w-68'
        }`}
      >
        {/* Brand */}
        <div className={`h-20 flex items-center border-b border-neutral-900 shrink-0 ${desktopCollapsed ? 'justify-center' : 'px-6'}`}>
          <Link href="/admin" className="flex items-center" title="Safson Wear">
            {desktopCollapsed ? (
              <span className="relative h-8 w-10 block">
                <Image src="/safson-mark-white.png" alt="Safson Wear" fill className="admin-logo object-contain" />
              </span>
            ) : (
              <Image src="/safson-lockup-white.png" alt="Safson Wear" width={2108} height={536} className="admin-logo h-8 w-auto" />
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto overflow-x-hidden">
          {!desktopCollapsed && (
            <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-600">Menu</p>
          )}
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = isActivePath(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative group flex items-center rounded-xl text-sm font-medium transition-colors ${
                    desktopCollapsed ? 'justify-center h-11' : 'gap-3 px-3 py-2.5'
                  } ${isActive ? 'admin-nav-active' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" />
                  {!desktopCollapsed && <span className="truncate">{item.label}</span>}

                  {desktopCollapsed && (
                    <span className="admin-tooltip absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-white whitespace-nowrap shadow-xl opacity-0 -translate-x-1 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all z-50">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Session */}
        <div className="p-3 border-t border-neutral-900 shrink-0 space-y-2">
          {desktopCollapsed ? (
            <div className="flex justify-center py-1" title={`${adminUser.name} · ${adminUser.role}`}>
              <Avatar initials={initials} />
            </div>
          ) : (
            <UserCard user={adminUser} initials={initials} />
          )}

          <button
            onClick={handleLogout}
            title="Log out"
            className="w-full flex items-center justify-center gap-2 rounded-xl text-sm font-medium text-red-400 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 transition-colors cursor-pointer h-10"
          >
            <LogOut className="h-4 w-4" />
            {!desktopCollapsed && 'Log out'}
          </button>
        </div>
      </aside>

      {/* 4. Main Page Canvas Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-black min-h-screen">
        {/* Top desktop header */}
        <header className="hidden md:flex items-center justify-between gap-6 px-8 lg:px-10 h-20 bg-neutral-950/60 backdrop-blur-md border-b border-neutral-900 sticky top-0 z-20">
          <div className="flex items-center gap-4 min-w-0">
          {/* Sidebar toggle — lives in the header so it is always visible */}
          <button
            onClick={() => setDesktopCollapsed((c) => !c)}
            title={desktopCollapsed ? 'Open sidebar' : 'Close sidebar'}
            aria-label={desktopCollapsed ? 'Open sidebar' : 'Close sidebar'}
            className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl border border-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            {desktopCollapsed ? <PanelLeftOpen className="h-4.5 w-4.5" /> : <PanelLeftClose className="h-4.5 w-4.5" />}
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <span>Admin</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-neutral-400">{pageMeta.title}</span>
            </div>
            <p className="text-base font-semibold text-white tracking-tight mt-1 truncate">
              Welcome back, {(adminUser.name || 'Admin').split(' ')[0]} 👋
              <span className="ml-2 text-sm font-normal text-neutral-500">
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </p>
          </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="hidden lg:flex items-center gap-2 h-10 px-4 rounded-xl border border-neutral-900 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <ExternalLink className="h-4 w-4" /> View website
            </Link>
            <button
              onClick={toggleTheme}
              className="h-10 w-10 flex items-center justify-center rounded-xl border border-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-900 cursor-pointer transition-colors"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <div className="hidden lg:flex items-center gap-3 pl-3 ml-1 border-l border-neutral-900">
              <Avatar initials={initials} />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">{adminUser.name}</p>
                <p className="text-xs text-neutral-500 capitalize">{adminUser.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content body wrapper */}
        <div className="flex-1 p-5 sm:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
    </>
  );
}

function Avatar({ initials }) {
  return (
    <div className="admin-avatar h-9 w-9 shrink-0 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
      {initials}
    </div>
  );
}

function UserCard({ user, initials }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/40 border border-neutral-900">
      <div className="relative">
        <Avatar initials={initials} />
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-neutral-950" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
        <p className="text-xs text-neutral-500 truncate">{user.email || user.role}</p>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400 border border-neutral-800 rounded-md px-1.5 py-0.5 shrink-0">
        {user.role === 'superadmin' ? 'Super' : 'Admin'}
      </span>
    </div>
  );
}
