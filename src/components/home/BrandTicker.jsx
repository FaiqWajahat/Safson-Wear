import Image from 'next/image';

// Server Component — CSS-only marquee animation
const CLIENTS = [
  { name: 'Chase Up', src: '/clients/chase-up.png', width: 489, height: 99 },
  { name: 'Chase Value', src: '/clients/chase-value.png', width: 227, height: 69 },
  { name: 'KFC', src: '/clients/kfc.png', width: 600, height: 190 },
  { name: 'Imtiaz', src: '/clients/imtiaz.png', width: 600, height: 223 },
  { name: 'Metro', src: '/clients/metro.png', width: 640, height: 168 },
  { name: 'Eminent', src: '/clients/eminent.png', width: 867, height: 370 },
  { name: 'Kifayah', src: '/clients/kifaya.png', width: 517, height: 102 },
];

// Few logos — repeat them so one marquee track is wider than large screens
const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS];

export default function BrandTicker() {
  return (
    <section className="bg-white border-b border-black/10 py-10 font-sans select-none overflow-hidden relative">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-7">
        Trusted by leading brands
      </p>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee items-center">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex items-center gap-16 sm:gap-20 pr-16 sm:pr-20" aria-hidden={loop === 1}>
              {TRACK.map((client, index) => (
                <div
                  key={`${loop}-${index}`}
                  className="relative shrink-0 w-28 sm:w-36 h-10 sm:h-12 opacity-80 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image
                    src={client.src}
                    alt={loop === 0 && index < CLIENTS.length ? client.name : ''}
                    fill
                    loading="lazy"
                    sizes="144px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
