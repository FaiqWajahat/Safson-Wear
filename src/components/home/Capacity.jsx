'use client';

import React, { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { Scissors, Activity, Printer, Layers, Calendar, Truck } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const CAPACITIES = [
  {
    id: 1,
    icon: Activity,
    metric: "5,000+",
    unit: "Garments / Day",
    title: "Stitching Capacity",
    description: "Equipped with flatlock, overlock, and twin-needle machines to assemble high-durability activewear at scale.",
    details: "Flatlock seam reinforcements",
    utilization: 94
  },
  {
    id: 2,
    icon: Printer,
    metric: "4,000",
    unit: "Meters / Day",
    title: "Dye Sublimation",
    description: "Roll-to-roll heat calendar presses utilizing premium Italian inks to print bright, fade-resistant sportswear teamwear colors.",
    details: "High-resolution color density",
    utilization: 88
  },
  {
    id: 3,
    icon: Layers,
    metric: "120+",
    unit: "Embroidery Heads",
    title: "Tajima Embroidery",
    description: "Automated multi-head Tajima machinery running 24/7 to produce sharp, high-density custom logos and crests.",
    details: "Multi-color satin stitching",
    utilization: 95
  },
  {
    id: 4,
    icon: Scissors,
    metric: "8,000",
    unit: "Panels / Day",
    title: "CAD Fabric Cutting",
    description: "Automatic computerized pattern layouts and laser-cutting tables to guarantee zero sizing variance across runs.",
    details: "Automatic tension release",
    utilization: 91
  },
  {
    id: 5,
    icon: Calendar,
    metric: "72",
    unit: "Hours Turnaround",
    title: "Rapid Prototyping",
    description: "Dedicated in-house pattern masters and sample sewing lines to build physical prototypes from tech packs in 3 days.",
    details: "Includes CLO3D digital sample",
    utilization: 96
  },
  {
    id: 6,
    icon: Truck,
    metric: "150k+",
    unit: "Units / Month",
    title: "Total Output Volume",
    description: "Mass production capability supporting container logistics and direct-to-warehouse cargo shipments globally.",
    details: "ISO 9001 quality audit certified",
    utilization: 90
  }
];

function CapacityCard({ cap }) {
  const Icon = cap.icon;
  const barRef = useRef(null);
  const inView = useInView(barRef, { once: true, margin: "-40px" });

  return (
    <StaggerItem 
      className="bg-white rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 border border-neutral-200/80 hover:border-black group text-left relative overflow-hidden"
    >
      <div>
        {/* Header: Icon + Metric details */}
        <div className="flex justify-between items-start mb-6">
          <div className="h-11 w-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-black group-hover:scale-105 transition-all duration-300">
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-black tracking-tight leading-none font-sans">
              {cap.metric}
            </div>
            <div className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1.5 leading-none">
              {cap.unit}
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xs font-black text-black uppercase tracking-wider mb-2 font-sans">
          {cap.title}
        </h3>
        
        <p className="text-neutral-600 text-[11px] leading-relaxed font-light mb-6">
          {cap.description}
        </p>
      </div>

      {/* Utilization Load Bar */}
      <div className="space-y-2 mt-auto pt-4 border-t border-neutral-100" ref={barRef}>
        <div className="flex justify-between text-[8px] font-mono font-bold uppercase tracking-widest text-neutral-400">
          <span>Active Load / Capacity</span>
          <span className="text-black font-bold">{cap.utilization}%</span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${cap.utilization}%` } : { width: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-black rounded-full"
          />
        </div>

        {/* Specs detail label */}
        <div className="text-[9px] font-semibold text-neutral-500 pt-1.5 block leading-none font-mono">
          ✓ {cap.details}
        </div>
      </div>

    </StaggerItem>
  );
}

export default function Capacity() {
  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Factory Volume & Performance
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              OUR PRODUCTION CAPACITY
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* Capacity Cards Grid: 3 columns on lg */}
        <StaggerContainer delay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {CAPACITIES.map((cap) => (
            <CapacityCard key={cap.id} cap={cap} />
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
