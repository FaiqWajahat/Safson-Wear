'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { useCategories } from '@/lib/categoriesHelper';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { categories } = useCategories();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const sub = searchParams.get('sub');

  const toggleCategory = (slug) => {
    setExpandedCategory((prev) => (prev === slug ? null : slug));
  };

  const isActive = (path, catValue = null, subValue = null) => {
    if (catValue) {
      if (subValue) {
        return pathname === path && category === catValue && sub === subValue;
      }
      return pathname === path && category === catValue;
    }
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner (Strategy Call Booking) */}
      <div className="bg-black text-white text-[10px] sm:text-xs border-b border-neutral-900 py-2.5 px-3 sm:px-6 lg:px-8 text-center relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 tracking-wide">
          <span className="font-mono font-bold uppercase flex items-center text-neutral-300">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse mr-2"></span>
            Book a Production Strategy Call
          </span>
          <span className="text-neutral-600 font-mono">|</span>
          <Link
            href="https://cal.com/abisports/30min"
            target="_blank"
            rel="noopener noreferrer"
            data-cal-link="abisports/30min"
            data-cal-config='{"layout":"month_view"}'
            className="text-neutral-300 hover:text-white underline transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            Schedule a Meeting <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 bg-black/95 backdrop-blur-xl ${
          scrolled ? 'border-b border-neutral-850 py-3 shadow-2xl shadow-black/80' : 'border-b border-neutral-900 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center gap-2">
                <Image src="/safson-lockup-white.png" alt="Safson Wear" width={2108} height={536} preload className="h-8 sm:h-9 w-auto object-contain" />
              </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7">
              <Link href="/" className={`text-[13px] font-medium transition-colors ${isActive('/') ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                Home
              </Link>

              {/* Dynamic Minimalistic Categories Dropdowns */}
              {categories.map((cat) => (
                cat.subcategories && cat.subcategories.length > 0 ? (
                  <DropdownMenu key={cat.id || cat.slug}>
                    <DropdownMenuTrigger className={`group flex items-center space-x-1.5 text-[13px] font-medium transition-colors focus:outline-none cursor-pointer ${
                      isActive('/products', cat.slug) ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'
                    }`}>
                      <span>{cat.name}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent 
                      align="start"
                      sideOffset={10}
                      className="bg-black/95 backdrop-blur-xl border border-neutral-850 text-neutral-300 p-1.5 min-w-[210px] rounded-xl shadow-2xl shadow-black/90 space-y-0.5"
                    >
                      {/* All Category Link */}
                      <DropdownMenuItem
                        render={<Link href={`/products?category=${cat.slug}`} />}
                        className={`focus:bg-neutral-900 focus:text-white cursor-pointer px-3 py-2.5 rounded-lg text-xs font-bold transition-colors w-full flex items-center justify-between ${isActive('/products', cat.slug) && !sub ? 'text-white font-extrabold' : 'text-neutral-100 hover:text-white'}`}
                      >
                        <span>All {cat.name}</span>
                        <ArrowRight className="h-3 w-3 text-neutral-500 group-hover:text-white transition-transform" />
                      </DropdownMenuItem>

                      <div className="h-px bg-neutral-900 my-1" />

                      {/* Subcategories list */}
                      {cat.subcategories.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem.id || subItem.slug}
                          render={<Link href={`/products?category=${cat.slug}&sub=${subItem.slug}`} />}
                          className={`focus:bg-neutral-900 focus:text-white cursor-pointer px-3 py-2 rounded-lg text-[12px] font-medium transition-colors w-full flex items-center justify-between ${isActive('/products', cat.slug, subItem.slug) ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                        >
                          <span>{subItem.name}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link key={cat.id || cat.slug} href={`/products?category=${cat.slug}`} className={`text-[13px] font-medium transition-colors ${isActive('/products', cat.slug) ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                    {cat.name}
                  </Link>
                )
              ))}

              <Link href="/production" className={`text-[13px] font-medium transition-colors ${isActive('/production') ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                Production
              </Link>
              <Link href="/services" className={`text-[13px] font-medium transition-colors ${isActive('/services') ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                Services
              </Link>
              <Link href="/portfolio" className={`text-[13px] font-medium transition-colors ${isActive('/portfolio') ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                Portfolio
              </Link>
              <Link href="/about" className={`text-[13px] font-medium transition-colors ${isActive('/about') ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                About Us
              </Link>
            </nav>

            {/* Right Side Button Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/inquiry">
                  <Button className="bg-white hover:bg-neutral-200 text-black font-extrabold text-xs tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-sm">
                    Request a Quote <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Navigation controls */}
            <div className="md:hidden flex items-center space-x-2.5">
              <Link href="/inquiry">
                <Button className="bg-white hover:bg-neutral-200 text-black font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg cursor-pointer shadow-xs">
                  Quote →
                </Button>
              </Link>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="text-white p-2 bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer inline-flex items-center justify-center hover:bg-neutral-850 transition-colors">
                  <Menu className="h-5 w-5 text-white" />
                </SheetTrigger>
                <SheetContent side="right" className="bg-black text-white border-neutral-900 w-[320px] max-w-[85vw] p-6 overflow-y-auto flex flex-col justify-between">
                  <div>
                    {/* Sheet Brand Header */}
                    <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-900">
                      <Image src="/safson-lockup-white.png" alt="Safson Wear" width={2108} height={536} className="h-8 w-auto object-contain" />
                      <SheetTitle className="sr-only">Safson Wear</SheetTitle>
                    </div>

                    {/* Sheet Links */}
                    <div className="flex flex-col space-y-4 mt-6">
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className={`text-sm font-bold text-left transition-colors py-1.5 ${isActive('/') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                      >
                        Home
                      </Link>
                      
                      {/* Dynamic Categories Accordions */}
                      {categories.map((cat) => (
                        cat.subcategories && cat.subcategories.length > 0 ? (
                          <div key={cat.id || cat.slug} className="border-t border-neutral-900/80 pt-3 flex flex-col">
                            <button
                              onClick={() => toggleCategory(cat.slug)}
                              className="flex justify-between items-center w-full text-left text-sm font-bold text-neutral-300 hover:text-white py-1.5 focus:outline-none cursor-pointer"
                            >
                              <span className={isActive('/products', cat.slug) ? 'text-white font-black' : ''}>{cat.name}</span>
                              <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform duration-300 ${expandedCategory === cat.slug ? 'rotate-180' : ''}`} />
                            </button>
                            <motion.div
                              initial={false}
                              animate={{ height: expandedCategory === cat.slug ? 'auto' : 0, opacity: expandedCategory === cat.slug ? 1 : 0 }}
                              className="overflow-hidden flex flex-col pl-2"
                            >
                              <div className="pt-2 pb-2 flex flex-col space-y-2.5 border-l border-neutral-800 ml-1 pl-3.5">
                                <Link
                                  href={`/products?category=${cat.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className={`text-xs font-bold text-left transition-colors ${isActive('/products', cat.slug) && !sub ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                                >
                                  All {cat.name}
                                </Link>
                                {cat.subcategories.map((subItem) => (
                                  <Link
                                    key={subItem.id || subItem.slug}
                                    href={`/products?category=${cat.slug}&sub=${subItem.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-xs font-semibold text-left transition-colors ${isActive('/products', cat.slug, subItem.slug) ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                        ) : (
                          <Link
                            key={cat.id || cat.slug}
                            href={`/products?category=${cat.slug}`}
                            onClick={() => setIsOpen(false)}
                            className={`text-sm font-bold text-left transition-colors py-1.5 ${isActive('/products', cat.slug) ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                          >
                            {cat.name}
                          </Link>
                        )
                      ))}

                      <div className="border-t border-neutral-900/80 pt-3 flex flex-col space-y-3.5">
                        <Link
                          href="/production"
                          onClick={() => setIsOpen(false)}
                          className={`text-sm font-bold text-left transition-colors py-1 ${isActive('/production') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                        >
                          Production
                        </Link>
                        <Link
                          href="/services"
                          onClick={() => setIsOpen(false)}
                          className={`text-sm font-bold text-left transition-colors py-1 ${isActive('/services') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                        >
                          Services
                        </Link>
                        <Link
                          href="/portfolio"
                          onClick={() => setIsOpen(false)}
                          className={`text-sm font-bold text-left transition-colors py-1 ${isActive('/portfolio') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                        >
                          Portfolio
                        </Link>
                        <Link
                          href="/about"
                          onClick={() => setIsOpen(false)}
                          className={`text-sm font-bold text-left transition-colors py-1 ${isActive('/about') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                        >
                          About Us
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Sheet Bottom CTAs */}
                  <div className="border-t border-neutral-900 pt-5 mt-6 space-y-2.5">
                    <Link
                      href="/inquiry"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-white text-black font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-sm hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="https://cal.com/abisports/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cal-link="abisports/30min"
                      data-cal-config='{"layout":"month_view"}'
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 font-bold text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Book Strategy Call</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Cal.com embed script */}
      <Script
        src="https://app.cal.com/embed/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.Cal) {
            window.Cal('init', { origin: 'https://cal.com' });
            window.Cal('ui', {
              styles: { branding: { brandColor: '#000000' } },
              hideEventTypeDetails: false,
              layout: 'month_view',
            });
          }
        }}
      />
    </>
  );
};

export default Navbar;

