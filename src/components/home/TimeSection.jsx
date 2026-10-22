'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/home/SectionHeading';

const LOCATIONS = [
  {
    id: 'sialkot',
    name: 'Sialkot Factory',
    country: 'Pakistan',
    flag: '🇵🇰',
    subtitle: 'Manufacturing headquarters',
    timeZone: 'Asia/Karachi',
    tzLabel: 'PKT (UTC+5)',
    hours: '09:00 AM – 06:00 PM',
    openHour: 9,
    closeHour: 18,
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia Office',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    subtitle: 'Gulf region desk',
    timeZone: 'Asia/Riyadh',
    tzLabel: 'AST (UTC+3)',
    hours: '09:00 AM – 06:00 PM',
    openHour: 9,
    closeHour: 18,
  },
  {
    id: 'spain',
    name: 'Spain Office',
    country: 'Spain',
    flag: '🇪🇸',
    subtitle: 'European client desk',
    timeZone: 'Europe/Madrid',
    tzLabel: 'CET / CEST (UTC+1 / +2)',
    hours: '09:00 AM – 06:00 PM',
    openHour: 9,
    closeHour: 18,
  },
];

function useZonedTime(timeZone, openHour, closeHour) {
  const [state, setState] = useState({ time: '', date: '', hr: 0, min: 0, sec: 0, open: false });

  useEffect(() => {
    const timeFmt = new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const dateFmt = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', month: 'short', day: 'numeric' });
    const partsFmt = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });

    const tick = () => {
      const now = new Date();
      const parts = Object.fromEntries(partsFmt.formatToParts(now).map((p) => [p.type, p.value]));
      const hr = parseInt(parts.hour, 10) % 24;
      const min = parseInt(parts.minute, 10);
      const sec = parseInt(parts.second, 10);
      setState({
        time: timeFmt.format(now),
        date: dateFmt.format(now),
        hr, min, sec,
        open: hr >= openHour && hr < closeHour,
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [timeZone, openHour, closeHour]);

  return state;
}

function AnalogClock({ hr, min, sec }) {
  const hrDeg = ((hr % 12) / 12) * 360 + (min / 60) * 30;
  const minDeg = (min / 60) * 360 + (sec / 60) * 6;
  const secDeg = (sec / 60) * 360;

  return (
    <div className="relative h-28 w-28 shrink-0 rounded-full border border-black/10 bg-white flex items-center justify-center shadow-sm">
      {[0, 90, 180, 270].map((deg) => (
        <span
          key={deg}
          className="absolute w-0.5 h-2 bg-black rounded-full"
          style={{ transform: `rotate(${deg}deg) translateY(-46px)` }}
        />
      ))}
      <span className="absolute w-1 h-8 bg-black rounded-full origin-bottom" style={{ bottom: '50%', transform: `rotate(${hrDeg}deg)` }} />
      <span className="absolute w-0.75 h-11 bg-black/60 rounded-full origin-bottom" style={{ bottom: '50%', transform: `rotate(${minDeg}deg)` }} />
      <span className="absolute w-px h-12 bg-black/40 rounded-full origin-bottom" style={{ bottom: '50%', transform: `rotate(${secDeg}deg)` }} />
      <span className="relative z-10 h-3 w-3 rounded-full bg-black border-2 border-white" />
    </div>
  );
}

function TimeCard({ location, index }) {
  const { time, date, hr, min, sec, open } = useZonedTime(location.timeZone, location.openHour, location.closeHour);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-black/10 bg-white p-6 sm:p-7 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none">{location.flag}</span>
          <div>
            <p className="text-base font-semibold leading-tight">{location.name}</p>
            <p className="text-xs text-black/50">{location.subtitle}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 border ${open ? 'bg-black text-white border-black' : 'bg-neutral-100 text-black/50 border-black/10'}`}>
          <span className="relative flex h-2 w-2">
            {open && <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-70" />}
            <span className={`relative h-2 w-2 rounded-full ${open ? 'bg-white' : 'bg-black/30'}`} />
          </span>
          {open ? 'Open now' : 'Closed'}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <AnalogClock hr={hr} min={min} sec={sec} />
        <div className="min-w-0">
          <p className="text-2xl font-bold tracking-tight tabular-nums">{time || '--:--:--'}</p>
          <p className="mt-1 text-sm text-black/50">{date}</p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-black/10 space-y-2.5 text-sm">
        <p className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-black/50"><Clock className="w-4 h-4" /> Desk hours</span>
          <span className="font-semibold">{location.hours}</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-black/50"><Globe2 className="w-4 h-4" /> Time zone</span>
          <span className="font-semibold">{location.tzLabel}</span>
        </p>
      </div>
    </motion.div>
  );
}

export default function TimeSection() {
  // Times depend on the visitor's clock, so render only after mount to avoid hydration mismatches
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-20 sm:py-28 bg-neutral-50 text-black font-sans border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Global desk hours"
          title="Live time"
          muted="at our offices."
          description="See who is at their desk right now across Pakistan, Saudi Arabia, and Spain."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-h-[320px]">
          {mounted && LOCATIONS.map((loc, i) => <TimeCard key={loc.id} location={loc} index={i} />)}
        </div>
      </div>
    </section>
  );
}
