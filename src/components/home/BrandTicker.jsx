import Image from 'next/image';

// Server Component — CSS-only marquee animation
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

export default function BrandTicker() {
  return (
    <section className="bg-white border-b border-black/10 py-10 font-sans select-none overflow-hidden relative">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-7">
        Trusted by brands worldwide
      </p>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee items-center">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex items-center gap-14 pr-14" aria-hidden={loop === 1}>
              {LOGO_PATHS.map((src, index) => (
                <div
                  key={`${loop}-${index}`}
                  className="relative shrink-0 w-28 sm:w-32 h-12 opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image
                    src={src}
                    alt={loop === 0 ? 'Client logo' : ''}
                    fill
                    loading="lazy"
                    sizes="128px"
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
