'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Layers,
  Grid,
  FileText,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  RefreshCcw,
  Package,
  Activity,
} from 'lucide-react';

/* ─────────────── helpers ─────────────── */
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS_SHORT   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

/* Compact skeleton */
const SkeletonBox = ({ h = 'h-6', w = 'w-full', extra = '' }) => (
  <div className={`${h} ${w} bg-neutral-900 rounded animate-pulse ${extra}`} />
);

/* Donut SVG chart (pure SVG, no deps) */
function DonutChart({ slices, size = 120, stroke = 22, isDark }) {
  const r   = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  let offset = 0;
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <circle
        cx={center} cy={center} r={r}
        fill="none"
        stroke={isDark ? '#171717' : '#e5e7eb'}
        strokeWidth={stroke}
      />
      {slices.map((s, i) => {
        const pct  = s.value / total;
        const dash = circ * pct;
        const gap  = circ - dash;
        const el   = (
          <circle
            key={i}
            cx={center} cy={center} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${center} ${center})`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        );
        offset += dash;
        return el;
      })}
      {/* center text */}
      <text x={center} y={center - 6} textAnchor="middle" fill={isDark ? '#fff' : '#111827'} fontSize={14} fontWeight="900">
        {total}
      </text>
      <text x={center} y={center + 10} textAnchor="middle" fill={isDark ? '#737373' : '#6b7280'} fontSize={7} fontWeight="700">
        TOTAL
      </text>
    </svg>
  );
}

/* Mini SVG sparkline */
function Sparkline({ data, color = '#ffffff', width = 80, height = 30 }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Interactive mini calendar */
function MiniCalendar({ isDark }) {
  const today    = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const days    = getDaysInMonth(year, month);
  const start   = getFirstDayOfMonth(year, month);
  const cells   = Array.from({ length: start + days }, (_, i) => (i < start ? null : i - start + 1));
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0);  setYear(y => y + 1); } else setMonth(m => m + 1); };

  const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const card  = isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-gray-200';
  const text  = isDark ? 'text-white'    : 'text-gray-900';
  const muted = isDark ? 'text-neutral-500' : 'text-gray-400';
  const cellHover = isDark ? 'hover:bg-neutral-900' : 'hover:bg-gray-100';

  return (
    <div className={`border ${card} rounded-2xl p-5 select-none`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-semibold uppercase tracking-wider ${text}`}>
          {MONTHS_SHORT[month]} {year}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className={`p-1 rounded ${cellHover} ${muted} cursor-pointer transition-colors`}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button onClick={nextMonth} className={`p-1 rounded ${cellHover} ${muted} cursor-pointer transition-colors`}>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_SHORT.map(d => (
          <div key={d} className={`text-center text-[10px] font-semibold uppercase tracking-wider ${muted} py-1`}>{d[0]}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((d, i) => (
          <div
            key={i}
            className={`h-7 w-full flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-all duration-150 ${
              d === null
                ? ''
                : isToday(d)
                ? (isDark ? 'bg-white text-black font-bold' : 'bg-black text-white font-bold')
                : `${cellHover} ${text}`
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Today label */}
      <div className={`mt-3 pt-3 border-t ${isDark ? 'border-neutral-900' : 'border-gray-200'} flex items-center gap-2`}>
        <span className={`h-2 w-2 rounded-full ${isDark ? 'bg-white' : 'bg-black'} block`} />
        <span className={`text-[11px] font-semibold uppercase tracking-wider ${muted}`}>
          Today — {MONTHS_SHORT[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
        </span>
      </div>
    </div>
  );
}

/* ─────────────── Main Dashboard ─────────────── */
export default function AdminDashboard() {
  const [loading, setLoading]     = useState(true);
  const [isDark, setIsDark]       = useState(true);
  const [stats, setStats]         = useState({ categoriesCount: 0, productsCount: 0, pendingInquiries: 0, adminsCount: 0, totalInquiries: 0, resolvedInquiries: 0 });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [products, setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [allQuotations, setAllQuotations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [lastFetched, setLastFetched] = useState(null);
  const [refreshKey, setRefreshKey]   = useState(0);
  const [health, setHealth]           = useState(null); // { api, db } from the last fetch

  // Detect theme from localStorage (synced with layout)
  useEffect(() => {
    const check = () => {
      const saved = localStorage.getItem('admin_theme') || 'dark';
      setIsDark(saved === 'dark');
    };
    check();
    window.addEventListener('storage', check);
    // Poll every second for theme changes triggered in same tab
    const interval = setInterval(check, 800);
    return () => { window.removeEventListener('storage', check); clearInterval(interval); };
  }, []);

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [catRes, prodRes, quoteRes, userRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/products'),
        fetch('/api/admin/quotations'),
        fetch('/api/admin/users'),
      ]);

      const responses = [catRes, prodRes, quoteRes, userRes];
      const [cats, prods, quotes, users] = await Promise.all(
        responses.map(r => r.json().catch(() => ({})))
      );
      setHealth({
        api: responses.every(r => r.status < 500),
        db:  responses.every(r => r.ok),
      });

      const allInquiries  = quotes.quotations || [];
      const allProducts   = prods.products   || [];
      const allCategories = cats.categories  || [];
      const userList      = users.users      || [];

      const pending  = allInquiries.filter(q => q.status === 'pending').length;
      const resolved = allInquiries.filter(q => q.status === 'completed').length;

      setStats({
        categoriesCount:   allCategories.length,
        productsCount:     allProducts.length,
        pendingInquiries:  pending,
        adminsCount:       userList.length,
        totalInquiries:    allInquiries.length,
        resolvedInquiries: resolved,
      });

      setRecentInquiries(allInquiries.slice(0, 6));
      setProducts(allProducts);
      setCategories(allCategories);
      setAllQuotations(allInquiries);
      setAllUsers(userList);
      setLastFetched(new Date());
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setHealth({ api: false, db: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, [refreshKey]);

  /* ── Dynamic chart data ── */

  // Monthly inquiry volume — real counts for the last 7 months (oldest → current)
  const now = new Date();
  const monthBuckets = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 6 + i, 1);
    return { year: d.getFullYear(), month: d.getMonth(), label: MONTHS_SHORT[d.getMonth()] };
  });
  const monthlyData = monthBuckets.map(({ year, month }) =>
    allQuotations.filter(q => {
      const d = new Date(q.createdAt);
      return d.getFullYear() === year && d.getMonth() === month;
    }).length
  );

  // Items created in the last 7 days (shown as the card delta)
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const addedThisWeek = (items) => items.filter(item => item.createdAt && new Date(item.createdAt).getTime() >= weekAgo).length;

  // Category donut slices from real data
  const parentCats = categories.filter(c => !c.parentCategory);
  const donutSlices = parentCats.map((cat, i) => {
    const catProds = products.filter(p => String(p.category?._id || p.category) === String(cat._id)).length;
    const colors = isDark
      ? ['#ffffff', '#a3a3a3', '#525252', '#262626']
      : ['#000000', '#4b5563', '#9ca3af', '#e5e7eb'];
    return { label: cat.name, value: catProds, color: colors[i % colors.length] };
  });

  // Inquiry status breakdown for bar chart
  const statusBreakdown = [
    { label: 'Pending',   value: stats.pendingInquiries,                                                          color: isDark ? '#ffffff' : '#000000' },
    { label: 'Reviewed',  value: allQuotations.filter(q => q.status === 'reviewed').length,                      color: isDark ? '#d4d4d4' : '#4b5563' },
    { label: 'Responded', value: allQuotations.filter(q => q.status === 'responded').length,                     color: isDark ? '#737373' : '#9ca3af' },
    { label: 'Completed', value: stats.resolvedInquiries,                                                          color: isDark ? '#404040' : '#e5e7eb' },
  ];
  const maxBarVal = Math.max(...statusBreakdown.map(s => s.value), 1);

  // Sparkline dynamic trends based on creation date timestamps
  const getTrendData = (items) => {
    if (!items || items.length === 0) return [0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      d.setHours(23, 59, 59, 999);
      const count = items.filter(item => item.createdAt && new Date(item.createdAt) <= d).length;
      trend.push(count);
    }
    return trend;
  };

  const sparkData = {
    categories: getTrendData(categories),
    products:   getTrendData(products),
    inquiries:  getTrendData(allQuotations),
    admins:     getTrendData(allUsers),
  };

  /* ── Theme tokens ── */
  const card    = isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-gray-200';
  const text    = isDark ? 'text-white'        : 'text-gray-900';
  const muted   = isDark ? 'text-neutral-500'  : 'text-gray-500';
  const subtext = isDark ? 'text-neutral-400'  : 'text-gray-600';
  const trackBg = isDark ? 'bg-neutral-900'    : 'bg-gray-100';
  const divider = isDark ? 'border-neutral-900/60' : 'border-gray-200';
  const rowHov  = isDark ? 'hover:bg-neutral-900/25' : 'hover:bg-gray-50';
  const iconBg  = isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-gray-100 border-gray-200';
  const guideClr= isDark ? '#262626' : '#e5e7eb';
  const lineClr = isDark ? '#ffffff' : '#111827';
  const gradStart = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(17,24,39,0.12)';
  const gradEnd   = isDark ? 'rgba(255,255,255,0.00)' : 'rgba(17,24,39,0.00)';
  const nodeStroke = isDark ? '#000000' : '#ffffff';
  const hoverText  = isDark ? 'hover:text-white' : 'hover:text-gray-900';
  const fmtDelta   = (n) => (n > 0 ? `+${n} this week` : 'No change');

  return (
    <div className="space-y-6 font-sans">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className={`text-[11px] ${muted} font-semibold uppercase tracking-wider`}>Enterprise Management</span>
          <h2 className={`text-2xl sm:text-[28px] font-bold ${text} tracking-tight leading-tight mt-1`}>
            System Overview
          </h2>
        </div>
        <div className="flex items-center gap-2.5">
          {lastFetched && (
            <span className={`text-[11px] ${muted} font-bold uppercase tracking-wider hidden sm:block`}>
              Updated {lastFetched.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider ${muted} ${hoverText} border ${isDark ? 'border-neutral-900 hover:border-neutral-700 bg-neutral-950' : 'border-gray-200 hover:border-gray-400 bg-white'} rounded-lg px-3.5 py-2 cursor-pointer transition-all`}
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* ── 4 Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Categories', value: stats.categoriesCount, icon: Layers,  spark: sparkData.categories, delta: fmtDelta(addedThisWeek(categories)), up: addedThisWeek(categories) > 0 },
          { label: 'Catalog Products', value: stats.productsCount,   icon: Grid,    spark: sparkData.products,   delta: fmtDelta(addedThisWeek(products)),   up: addedThisWeek(products) > 0 },
          { label: 'Pending Inquiries',value: stats.pendingInquiries, icon: FileText,spark: sparkData.inquiries,  delta: `${addedThisWeek(allQuotations)} new this week`, up: false },
          { label: 'Active Admins',    value: stats.adminsCount,      icon: Users,   spark: sparkData.admins,     delta: `${allUsers.filter(u => u.isActive).length} active`, up: true },
        ].map(({ label, value, icon: Icon, spark, delta, up }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`border ${card} rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-opacity-80 transition-colors`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[11px] ${muted} font-semibold uppercase tracking-wider block`}>{label}</span>
                {loading
                  ? <SkeletonBox h="h-8" w="w-16" extra="mt-3" />
                  : <span className={`text-3xl font-bold ${text} font-mono block mt-2`}>{value}</span>
                }
              </div>
              <div className={`h-10 w-10 ${iconBg} border rounded-lg flex items-center justify-center ${text} flex-shrink-0`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className={`text-[11px] font-semibold uppercase tracking-wide flex items-center gap-1 ${up ? 'text-green-500' : 'text-neutral-500'}`}>
                {up ? <TrendingUp className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                {delta}
              </span>
              {loading ? <SkeletonBox h="h-5" w="w-20" /> : <Sparkline data={spark} color={isDark ? '#ffffff' : '#111827'} />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Row 2: Area Chart + Calendar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Area Chart */}
        <div className={`lg:col-span-2 border ${card} rounded-2xl p-6 flex flex-col`}>
          <div className="flex items-start justify-between mb-5">
            <div>
              <span className={`text-[11px] ${muted} font-semibold uppercase tracking-wider`}>Analytics</span>
              <h3 className={`text-xs font-bold ${text} uppercase tracking-wider mt-1 flex items-center gap-1.5`}>
                <TrendingUp className="h-4 w-4" /> B2B RFQ Monthly Volume
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="h-2 w-2 rounded-full bg-white block flex-shrink-0" />
              <span className={muted}>Inquiries / Month</span>
            </div>
          </div>

          {loading ? (
            <div className="h-[200px] flex items-end gap-2 animate-pulse">
              {[40, 55, 65, 80, 70, 90, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-neutral-900 rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
          ) : (
            <div className="relative w-full h-[210px] mt-2 select-none">
              <svg viewBox="0 0 560 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="rfq-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={lineClr} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={lineClr} stopOpacity="0.00" />
                  </linearGradient>
                </defs>
                {/* Guide lines */}
                {[50, 100, 150, 200].map(y => (
                  <line key={y} x1="0" y1={y} x2="560" y2={y} stroke={guideClr} strokeWidth="1" strokeDasharray="4,4" />
                ))}
                <line x1="0" y1="200" x2="560" y2="200" stroke={guideClr} strokeWidth="1.5" />
                {/* Area fill - computed from monthlyData */}
                {(() => {
                  const pts = monthlyData.map((v, i) => {
                    const x = 10 + (i / (monthlyData.length - 1)) * 540;
                    const y = 190 - (v / (Math.max(...monthlyData) || 1)) * 170;
                    return [x, y];
                  });
                  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
                  const filled = `${d} L ${pts[pts.length-1][0]} 200 L ${pts[0][0]} 200 Z`;
                  return (
                    <>
                      <path d={filled} fill="url(#rfq-gradient)" />
                      <path d={d} fill="none" stroke={lineClr} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      {pts.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="4.5" fill={lineClr} stroke={nodeStroke} strokeWidth="1.5" />
                      ))}
                    </>
                  );
                })()}
              </svg>
              {/* X-axis labels */}
              <div className="flex justify-between mt-2 px-2">
                {monthBuckets.map(({ label: m }) => (
                  <span key={m} className={`text-[11px] ${muted} font-semibold uppercase tracking-wider`}>{m}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Calendar */}
        <div className="flex flex-col gap-5">
          {loading
            ? <div className="h-64 animate-pulse"><SkeletonBox h="h-full" /></div>
            : <MiniCalendar isDark={isDark} />
          }

          {/* System health card */}
          <div className={`border ${card} rounded-2xl p-4 flex-1`}>
            <span className={`text-[11px] ${muted} font-semibold uppercase tracking-wider block mb-3`}>System Status</span>
            {[
              { label: 'API Gateway',  status: !health ? 'Checking' : health.api ? 'Operational' : 'Unreachable', ok: !health || health.api },
              { label: 'Database',     status: !health ? 'Checking' : health.db  ? 'Connected'   : 'Error',       ok: !health || health.db  },
            ].map(({ label, status, ok }) => (
              <div key={label} className={`flex items-center justify-between py-2 border-b ${divider} last:border-none`}>
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${ok ? 'bg-green-500' : 'bg-red-500'} block flex-shrink-0`} />
                  <span className={`text-[11px] font-bold ${text} uppercase tracking-wide`}>{label}</span>
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${ok ? 'text-green-500' : 'text-red-500'}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Bar Chart + Donut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Bar Chart - Inquiry Status Breakdown */}
        <div className={`lg:col-span-2 border ${card} rounded-2xl p-6`}>
          <div className="mb-5">
            <span className={`text-[11px] ${muted} font-semibold uppercase tracking-wider`}>Inquiry Pipeline</span>
            <h3 className={`text-xs font-bold ${text} uppercase tracking-wider mt-1 flex items-center gap-1.5`}>
              <Activity className="h-4 w-4" /> RFQ Status Breakdown
            </h3>
          </div>
          {loading ? (
            <div className="flex items-end gap-4 h-32 animate-pulse">
              {[60, 40, 30, 50].map((h, i) => <div key={i} className="flex-1 bg-neutral-900 rounded-t" style={{ height: `${h}%` }} />)}
            </div>
          ) : (
            <div className="flex items-end gap-3 h-36 mt-4">
              {statusBreakdown.map(({ label, value, color }) => {
                const pct = (value / maxBarVal) * 100;
                return (
                  <div key={label} className="flex-1 flex flex-col items-center gap-2">
                    <span className={`text-[11px] font-bold ${text}`}>{value}</span>
                    <div className={`w-full ${trackBg} rounded-t relative overflow-hidden`} style={{ height: '96px' }}>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 rounded-t"
                        style={{ backgroundColor: color }}
                        initial={{ height: 0 }}
                        animate={{ height: `${pct}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${muted}`}>{label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Donut Chart - Category Distribution */}
        <div className={`border ${card} rounded-2xl p-6 flex flex-col items-center`}>
          <div className="w-full mb-4">
            <span className={`text-[11px] ${muted} font-semibold uppercase tracking-wider`}>Inventory Share</span>
            <h3 className={`text-xs font-bold ${text} uppercase tracking-wider mt-1 flex items-center gap-1.5`}>
              <Package className="h-4 w-4" /> Products by Category
            </h3>
          </div>

          {loading ? (
            <div className="h-32 w-32 rounded-full animate-pulse bg-neutral-900" />
          ) : (
            <>
              {donutSlices.length === 0 && <p className={`text-xs ${muted} mb-4`}>No category data found.</p>}
              <DonutChart slices={donutSlices} size={130} stroke={24} isDark={isDark} />
              {/* Legend */}
              <div className="mt-5 w-full space-y-2.5">
                {donutSlices.map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className={`text-[11px] font-bold ${subtext} uppercase tracking-wider`}>{label}</span>
                    </div>
                    <span className={`text-[11px] font-bold ${text} font-mono`}>{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Row 4: Product Progress Bars ── */}
      <div className={`border ${card} rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className={`text-[11px] ${muted} font-semibold uppercase tracking-wider`}>Category Breakdown</span>
            <h3 className={`text-xs font-bold ${text} uppercase tracking-wider mt-1`}>Products per Category</h3>
          </div>
        </div>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <SkeletonBox key={i} h="h-5" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {parentCats.length > 0 ? parentCats.map((cat, i) => {
              const count = products.filter(p => String(p.category?._id || p.category) === String(cat._id)).length;
              const pct   = stats.productsCount > 0 ? Math.round((count / stats.productsCount) * 100) : 0;
              const colors = isDark
                ? ['bg-white', 'bg-neutral-450', 'bg-neutral-600', 'bg-neutral-800']
                : ['bg-black', 'bg-neutral-600', 'bg-neutral-450', 'bg-neutral-300'];
              return (
                <div key={cat._id} className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${subtext}`}>{cat.name}</span>
                    <span className={`text-xs font-bold font-mono ${text}`}>{count} Products &bull; {pct}%</span>
                  </div>
                  <div className={`h-2 ${trackBg} rounded-full overflow-hidden`}>
                    <motion.div
                      className={`h-full ${colors[i % colors.length]} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              );
            }) : (
              <p className={`text-xs ${muted}`}>No category data found.</p>
            )}
          </div>
        )}
      </div>

      {/* ── Row 5: Recent Inquiries Table ── */}
      <div className={`border ${card} rounded-2xl p-6`}>
        <div className="flex justify-between items-center mb-5">
          <div>
            <span className={`text-[11px] ${muted} font-semibold uppercase tracking-wider`}>Inbox</span>
            <h3 className={`text-xs font-bold ${text} uppercase tracking-wider mt-1 flex items-center gap-1.5`}>
              <Clock className="h-4 w-4" /> Recent B2B Quote Requests
            </h3>
          </div>
          <Link href="/admin/quotations" className={`text-[11px] font-semibold uppercase tracking-wide ${muted} ${hoverText} transition-colors`}>
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map(i => <SkeletonBox key={i} h="h-12" />)}
          </div>
        ) : recentInquiries.length === 0 ? (
          <div className={`text-center py-10 border border-dashed ${isDark ? 'border-neutral-900' : 'border-gray-200'} rounded-lg`}>
            <CheckCircle2 className={`h-8 w-8 mx-auto mb-3 ${muted}`} />
            <p className={`text-xs ${muted} font-semibold uppercase tracking-wider`}>No quote requests found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs select-none">
              <thead>
                <tr className={`border-b ${divider} ${muted} font-semibold uppercase tracking-wider text-[11px]`}>
                  <th className="pb-3 pl-2">Company</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">RFQ Items</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right pr-2">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-neutral-900/40' : 'divide-gray-100'}`}>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className={`${rowHov} transition-colors group`}>
                    <td className={`py-4 pl-2 font-bold ${text} uppercase tracking-tight`}>{inquiry.companyName || '—'}</td>
                    <td className="py-4">
                      <span className={`font-semibold block ${text}`}>{inquiry.name}</span>
                      <span className={`text-xs ${muted}`}>{inquiry.email}</span>
                    </td>
                    <td className={`py-4 font-mono font-medium ${subtext}`}>
                      {inquiry.items?.length || 0} {inquiry.items?.length === 1 ? 'item' : 'items'}
                    </td>
                    <td className={`py-4 ${muted} font-mono text-xs`}>
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right pr-2">
                      <span className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                        inquiry.status === 'pending'   ? (isDark ? 'bg-neutral-900 text-neutral-450 border border-neutral-800' : 'bg-gray-100 text-gray-500 border border-gray-200') :
                        inquiry.status === 'reviewed'  ? 'bg-yellow-950/20 text-yellow-500 border border-yellow-900/40' :
                        inquiry.status === 'responded' ? 'bg-blue-950/20 text-blue-500 border border-blue-900/40' :
                                                         'bg-green-950/20 text-green-500 border border-green-900/40'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
