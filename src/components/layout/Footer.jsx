'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useCategories } from '@/lib/categoriesHelper';
import { FACILITIES } from '@/components/home/Offices';

const BRAND = 'Safson Wear';
const CONTACT_EMAIL = 'orders@fastapparel.com';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/fastapparelfactory/',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/fastapparelfactory',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@fastapparel?_t=ZS-8t5pCOtbRFy&_r=1',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.52-1.35 2.52-.07 1.25.59 2.47 1.62 3.1 1.05.65 2.45.69 3.51.1 1.01-.55 1.65-1.61 1.71-2.75.07-2.93.02-5.87.03-8.81-.02-1.78-.01-3.56-.01-5.34z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/fast-apparel-factory/',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

const COMPANY_LINKS = [
  { label: 'Production', href: '/production' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About Us', href: '/about' },
  { label: 'Request a Quote', href: '/inquiry' },
];

function ColumnTitle({ children }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-5">{children}</h3>
  );
}

const Footer = () => {
  const { categories } = useCategories();

  return (
    <footer className="bg-black text-white font-sans border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-8 gap-y-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <Link href="/" className="inline-block" aria-label={BRAND}>
              <Image src="/safson-logo-white.png" alt={BRAND} width={830} height={842} className="h-24 w-auto object-contain" />
            </Link>
            <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-sm">
              {BRAND} is a custom OEM apparel manufacturer for Street Wear and Sports Wear — from design and fabric
              sourcing to printing, embroidery, and worldwide delivery.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-white/15 text-white/60 hover:text-black hover:bg-white hover:border-white flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Category columns (Sports Wear, Street Wear) */}
          {categories.map((cat) => (
            <div key={cat.id || cat.slug} className="lg:col-span-2">
              <ColumnTitle>{cat.name}</ColumnTitle>
              <ul className="space-y-3 text-sm">
                {cat.subcategories?.map((sub) => (
                  <li key={sub.id || sub.slug}>
                    <Link
                      href={`/products?category=${cat.slug}&sub=${sub.slug}`}
                      className="text-white/55 hover:text-white transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="inline-flex items-center gap-1 text-white font-semibold hover:underline underline-offset-4"
                  >
                    View all <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          ))}

          {/* Company */}
          <div className="lg:col-span-2">
            <ColumnTitle>Company</ColumnTitle>
            <ul className="space-y-3 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/55 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices & contact */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <ColumnTitle>Our Offices</ColumnTitle>
            <ul className="space-y-4 text-sm">
              {FACILITIES.map((office) => (
                <li key={office.id} className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                  <div>
                    <p className="font-semibold text-white">{office.label}</p>
                    <p className="text-white/55 leading-snug">{office.address || office.location}</p>
                    {office.phone && (
                      <a href={`tel:${office.phone}`} className="mt-0.5 inline-flex items-center gap-1.5 text-white/55 hover:text-white transition-colors">
                        <Phone className="w-3.5 h-3.5" /> {office.phone}
                      </a>
                    )}
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-3 pt-1">
                <Mail className="w-4 h-4 shrink-0 text-white/40" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-white hover:underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <p>© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
