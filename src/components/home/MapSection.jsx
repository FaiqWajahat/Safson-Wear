'use client';

import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { PlaneTakeoff, Ship } from 'lucide-react';
import SectionHeading from '@/components/home/SectionHeading';

const MARKERS = [
  {
    name: "Sialkot, Pakistan",
    coordinates: [74.3587, 32.4972],
    details: "Central B2B Manufacturing Hub. Fabric milling, CLO3D drafting, flatlock tailoring, embroidery, and packaging.",
    isOrigin: true
  },
  {
    name: "United States",
    coordinates: [-100.0, 40.0],
    details: "Air/Ocean cargo shipping. 5-7 business days door-to-door delivery. Serving sportswear private labels in NY, CA, and TX.",
    isOrigin: false
  },
  {
    name: "Canada",
    coordinates: [-95.0, 55.0],
    details: "Fulfillment shipping to Toronto and Vancouver. Customs clearance and bulk FBA warehouse delivery support.",
    isOrigin: false
  },
  {
    name: "United Kingdom",
    coordinates: [-2.0, 54.0],
    details: "Weekly direct air cargo shipping to London, Manchester, and Birmingham. Custom team kits logistics.",
    isOrigin: false
  },
  {
    name: "Germany",
    coordinates: [10.4515, 51.1657],
    details: "Express shipping clearance and courier cargo to Frankfurt, Berlin, and Munich activewear distributors.",
    isOrigin: false
  },
  {
    name: "France",
    coordinates: [2.2137, 46.2276],
    details: "Bulk sportswear logistics support for Paris fashion labels and athletic club networks.",
    isOrigin: false
  },
  {
    name: "Sweden",
    coordinates: [18.6435, 60.1282],
    details: "Nordic shipping channels to Stockholm and Gothenburg. Specialized heavy activewear distribution.",
    isOrigin: false
  },
  {
    name: "Poland",
    coordinates: [19.1451, 51.9194],
    details: "Direct air freight and truck logistics for Central and Eastern European distribution networks.",
    isOrigin: false
  },
  {
    name: "Italy",
    coordinates: [12.5674, 41.8719],
    details: "Express air connections to Milan and Rome. Premium custom sportswear logistics.",
    isOrigin: false
  },
  {
    name: "Saudi Arabia",
    coordinates: [45.0, 23.88],
    details: "Direct shipping routes to Riyadh and Jeddah. High-breathable soccer kit fabrics.",
    isOrigin: false
  },
  {
    name: "United Arab Emirates",
    coordinates: [53.8478, 23.4241],
    details: "Express shipping under 3 days. Serving major sportswear brands and clubs in Dubai and Abu Dhabi.",
    isOrigin: false
  },
  {
    name: "Mexico",
    coordinates: [-102.5528, 23.6345],
    details: "Door-to-door cargo logistics for private label activewear lines in Mexico City.",
    isOrigin: false
  },
  {
    name: "Senegal",
    coordinates: [-14.4524, 14.4974],
    details: "Direct shipping networks for regional football clubs and activewear labels in West Africa.",
    isOrigin: false
  },
  {
    name: "Nigeria",
    coordinates: [8.6753, 9.082],
    details: "Ocean freight cargo and direct shipping setups for sports leagues in Lagos and Abuja.",
    isOrigin: false
  },
  {
    name: "Caribbean (Jamaica)",
    coordinates: [-77.2975, 18.1096],
    details: "Athletic track and field jersey shipping, sublimation kits, and regional club uniforms.",
    isOrigin: false
  },
  {
    name: "Australia",
    coordinates: [151.2093, -33.8688],
    details: "Bulk shipment to Sydney, Melbourne, and Brisbane hubs. Custom club jerseys and teamwear sets.",
    isOrigin: false
  },
  {
    name: "New Zealand",
    coordinates: [174.7633, -36.8485],
    details: "Express shipping services to Auckland, Wellington, and Christchurch. Sublimated rugby kits support.",
    isOrigin: false
  },
  {
    name: "Japan",
    coordinates: [139.6917, 35.6762],
    details: "Reliable air cargo clearance to Tokyo and Osaka. Custom high-performance activewear and gym lines.",
    isOrigin: false
  }
];

export default function MapSection() {
  const [mounted, setMounted] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  if (!mounted) {
    return (
      <section className="py-24 bg-black text-white border-b border-neutral-900 min-h-[600px] flex items-center justify-center">
        <div className="text-neutral-500 text-xs animate-pulse uppercase tracking-widest">
          Loading Global Logistics Map...
        </div>
      </section>
    );
  }

  // Calculate safe tooltip boundaries to prevent edge overflow
  const isRightSide = typeof window !== 'undefined' && tooltipPos.x > window.innerWidth / 2;
  const isBottomSide = typeof window !== 'undefined' && tooltipPos.y > window.innerHeight / 2;
  const tooltipX = isRightSide ? tooltipPos.x - 240 : tooltipPos.x + 15;
  const tooltipY = isBottomSide ? tooltipPos.y - 120 : tooltipPos.y + 15;

  return (
    <section 
      className="py-20 bg-black text-white border-b border-neutral-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-neutral-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Title Container (Centered) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          dark
          eyebrow="Global shipping & logistics"
          title="Countries"
          muted="we serve."
          description="Hover a marker to see how we ship to each market from our Sialkot factory."
        />
      </div>

      {/* Full-width Map Container */}
      <div className="w-full relative z-10">
        <div className="relative w-full overflow-hidden">
          
          {/* Key Indicators Info Overlay (Floating absolute overlay on the left side) */}
          <div className="absolute top-6 left-8 z-25 hidden md:flex flex-col gap-3 text-left bg-black/75 backdrop-blur-sm shadow-md p-5 rounded-2xl border border-white/15">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white"></span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Sialkot Factory Origin</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neutral-500"></span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Global Export Markets</span>
            </div>
            <div className="h-px bg-white/15 my-1"></div>
            <div className="flex items-center gap-2 text-neutral-300">
              <PlaneTakeoff className="h-3.5 w-3.5" />
              <span className="text-[8px] font-extrabold uppercase tracking-widest">Air Cargo Express (5-7 Days)</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Ship className="h-3.5 w-3.5" />
              <span className="text-[8px] font-extrabold uppercase tracking-widest">Sea Freight Bulk Logistics</span>
            </div>
          </div>

          {/* Full Screen Composable Map */}
          <div className="w-full h-[60vh] sm:h-[75vh] lg:h-[85vh] min-h-[600px] lg:min-h-[750px]">
            <ComposableMap 
              projection="geoMercator" 
              projectionConfig={{ 
                scale: 140, 
                center: [10, 18] 
              }}
              width={1000}
              height={500}
              style={{ width: "100%", height: "100%" }}
            >
              {/* Map Continent Geographies */}
              <Geographies geography="/world-countries.json">
                {({ geographies }) =>
                  geographies
                    .filter((geo) => {
                      const name = geo.properties?.name || '';
                      const code = geo.properties?.ISO_A3 || geo.properties?.iso_a3 || geo.id || '';
                      return name !== 'Antarctica' && code !== 'ATA';
                    })
                    .map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: { fill: "#ffffff", stroke: "#000000", strokeWidth: 0.15, outline: "none" },
                          hover: { fill: "#f5f5f7", stroke: "#000000", strokeWidth: 0.15, outline: "none" },
                          pressed: { fill: "#e5e5e5", stroke: "#000000", strokeWidth: 0.15, outline: "none" }
                        }}
                      />
                    ))
                }
              </Geographies>

              {/* Pulsating Destination Markers */}
              {MARKERS.map((marker) => (
                <Marker key={marker.name} coordinates={marker.coordinates}>
                  
                  {/* Outer Pulsating Ring */}
                  <circle
                    cx={0}
                    cy={0}
                    fill={marker.isOrigin ? "#000000" : "#737373"}
                  >
                    <animate
                      attributeName="r"
                      values={marker.isOrigin ? "4;14;4" : "3;10;3"}
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.75;0;0.75"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Inner Solid Interactive Core */}
                  <circle
                    cx={0}
                    cy={0}
                    r={marker.isOrigin ? 3.5 : 2.5}
                    fill={marker.isOrigin ? "#000000" : "#737373"}
                    stroke="#ffffff"
                    strokeWidth={0.75}
                    className="cursor-pointer transition-transform duration-300"
                    onMouseEnter={() => setHoveredMarker(marker)}
                    onMouseLeave={() => setHoveredMarker(null)}
                  />

                </Marker>
              ))}

            </ComposableMap>
          </div>

        </div>

      </div>

      {/* Pure React-State Floating Tooltip Overlay */}
      {hoveredMarker && (
        <div 
          className="fixed z-50 pointer-events-none p-4 text-left bg-black border border-neutral-800 rounded-lg shadow-2xl font-sans min-w-[200px] max-w-[250px] text-white"
          style={{
            left: tooltipX,
            top: tooltipY
          }}
        >
          <span className={`text-[8px] font-black uppercase tracking-widest ${hoveredMarker.isOrigin ? "text-white bg-neutral-900 border border-neutral-800" : "text-neutral-300 bg-white/10 border border-white/15"} px-2 py-0.5 rounded block w-fit mb-2`}>
            {hoveredMarker.isOrigin ? "Origin Facility" : "Export Hub"}
          </span>
          <p className="text-xs font-black uppercase text-white tracking-wide">{hoveredMarker.name}</p>
          <div className="h-px bg-neutral-900 my-2"></div>
          <p className="text-[10.5px] font-light text-neutral-400 leading-relaxed">{hoveredMarker.details}</p>
        </div>
      )}

    </section>
  );
}
