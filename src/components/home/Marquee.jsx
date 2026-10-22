import Image from 'next/image';

// Server Component — no hooks needed, CSS-only animation
const LOGO_PATHS = [
  '/client-01.png',
  '/client-02.png',
  '/client-03.png',
  '/client-04.png',
  '/client-05.png',
  '/client-06.png',
  '/client-07.png',
  '/client-08.png',
  '/client-09.jpeg',
  '/client-10.png',
];

export default function Marquee() {
  return (
    <section className="py-8 bg-[#f8fafc] border-y border-slate-200 overflow-hidden relative select-none">

      {/* Soft gradient fade overlays */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center overflow-hidden w-full">

        {/* 'Trusted by' label pinned to the left */}
        <span className="relative z-20 text-[9px] font-mono uppercase tracking-widest text-slate-400 mr-8 flex-shrink-0 pl-4 sm:pl-6 lg:pl-8">
          Trusted by
        </span>

        {/* Infinite Marquee Track */}
        <div className="animate-marquee flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">

          {/* First loop of logos */}
          {LOGO_PATHS.map((src, index) => (
            <div
              key={`loop1-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-28 sm:w-36 h-12 sm:h-16 opacity-60 hover:opacity-100 transition-opacity duration-300 relative"
            >
              <Image
                src={src}
                alt="Client logo"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 112px, 144px"
                className="object-contain"
              />
            </div>
          ))}

          {/* Second loop of logos (duplicate for seamless scroll) */}
          {LOGO_PATHS.map((src, index) => (
            <div
              key={`loop2-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-28 sm:w-36 h-12 sm:h-16 opacity-60 hover:opacity-100 transition-opacity duration-300 relative"
            >
              <Image
                src={src}
                alt="Client logo"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 112px, 144px"
                className="object-contain"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}