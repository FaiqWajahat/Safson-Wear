'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Shield, Lock, Mail, Loader2, ArrowRight, AlertCircle, LayoutDashboard, FileText, Layers } from 'lucide-react';
import PasswordInput from '@/components/admin/PasswordInput';

const EASE = [0.16, 1, 0.3, 1];

const HIGHLIGHTS = [
  { icon: Layers, title: 'Catalog control', text: 'Manage Sports Wear & Street Wear categories and products.' },
  { icon: FileText, title: 'Quote requests', text: 'Review, respond to and track every B2B RFQ.' },
  { icon: LayoutDashboard, title: 'Live overview', text: 'Real-time stats on inquiries, products and admins.' },
];

const inputCls =
  'w-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 focus:border-white rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-neutral-600 outline-none transition-colors disabled:opacity-60';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      toast.success(`Welcome back${data.user?.name ? `, ${data.user.name}` : ''}!`);
      // Successful login: push user to dashboard
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black font-sans selection:bg-neutral-800">

      {/* ── LEFT: Brand panel ── */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden border-r border-neutral-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-white/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-white/[0.03] rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '56px 56px' }}
          />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-between p-12 xl:p-16">
          <Image src="/safson-lockup-white.png" alt="Safson Wear" width={2108} height={536} className="h-10 w-auto self-start" preload />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">Admin Portal</p>
            <h2 className="mt-4 text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.05]">
              Run your factory<br />
              <span className="text-neutral-500">from one place.</span>
            </h2>

            <div className="mt-12 grid gap-4 max-w-lg">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
                  className="flex items-start gap-4 rounded-2xl border border-neutral-900 bg-neutral-950/60 backdrop-blur-sm p-4"
                >
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white text-black flex items-center justify-center">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <Shield className="h-3.5 w-3.5" /> Secure, encrypted admin access
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login form ── */}
      <div className="w-full lg:w-[480px] shrink-0 flex flex-col justify-center bg-neutral-950 px-6 sm:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="h-12 w-12 relative lg:hidden mb-8">
            <Image src="/safson-mark-white.png" alt="Safson Wear" fill className="object-contain" />
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-sm text-neutral-500 mt-2 mb-8">Sign in to the Safson Wear admin portal.</p>

          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-6 flex items-center gap-3 bg-red-950/30 border border-red-900/40 rounded-xl px-4 py-3"
              >
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                <span className="text-sm text-red-300 leading-snug">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-300 block">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className={inputCls}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-neutral-300 block">Password</label>
              <PasswordInput
                id="password"
                icon={Lock}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={inputCls}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full mt-2 bg-white hover:bg-neutral-200 disabled:bg-neutral-800 text-black disabled:text-neutral-500 font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-xs text-neutral-600 text-center">
            © {new Date().getFullYear()} Safson Wear · Admin access only
          </p>
        </motion.div>
      </div>
    </div>
  );
}
