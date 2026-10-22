import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Fast Apparel — B2B Sportswear Manufacturers',
  description:
    'Read the Fast Apparel privacy policy. Learn how we handle corporate contact information, design briefs, vector logos, CAD templates, and intellectual property protection.',
};

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information Collection & Scope',
      content:
        'We collect corporate contact information (name, business email, phone number, shipping address) when you submit a B2B inquiry or request a physical prototype. Additionally, we receive vector artwork files (AI, EPS, PDF), technical design packages, size measurements, and CAD grading briefs specifically required to execute custom sample development and bulk clothing manufacturing runs.',
    },
    {
      title: '2. Use of Information & Procurement',
      content:
        'All client data is strictly utilized to process production cost quotes, develop physical pre-production samples, coordinate bulk fabric milling, schedule embroidery or sublimation assemblies, compile customs export paperwork, and manage global freight shipping. We do not use your brand templates or details for third-party marketing or retail distribution.',
    },
    {
      title: '3. Intellectual Property Protection (Critical B2B Secrecy)',
      content:
        'As an OEM/ODM apparel manufacturer, we enforce absolute confidentiality regarding proprietary designs. Your tech packs, custom CAD sizing templates, logo placements, unique fit patterns, and fabric specifications are treated as exclusive intellectual property. We sign Non-Disclosure Agreements (NDAs) upon request, and under no circumstances do we reuse or share your designs, patterns, or overstock with other clients or retail markets.',
    },
    {
      title: '4. Information Security & Physical Protection',
      content:
        'Digital artwork, grading templates, and order files are stored on secure local servers with restricted access controls to prevent unauthorized data leaks. Sialkot manufacturing facilities employ strict security standards, ensuring physical screens, layout tables, sublimation paper rolls, and fabric cutters are cleared of proprietary design remains after production runs.',
    },
  ];

  return (
    <div className="bg-white min-h-screen py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-black/45 hover:text-black transition-colors mb-8 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12 pb-10 border-b border-black/10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/50 mb-2">
              Last Updated: July 14, 2026
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-black leading-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-black/60 leading-relaxed">
              Fast Apparel is committed to protecting your personal information and corporate intellectual property. This policy explains our data management, design protection rules, and manufacturing confidentiality guidelines.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            {sections.map((s, idx) => (
              <div key={idx} className="pb-8 border-b border-black/10 last:border-0 last:pb-0">
                <h2 className="text-lg font-bold text-black mb-3">
                  {s.title}
                </h2>
                <p className="text-sm text-black/60 leading-relaxed">
                  {s.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Box */}
          <div className="mt-14 p-8 rounded-3xl bg-neutral-50 border border-black/10">
            <h3 className="text-base font-bold text-black mb-2">
              Inquiries & Data Access Requests
            </h3>
            <p className="text-sm text-black/60 leading-relaxed mb-6">
              If you have questions regarding this privacy policy, require custom NDA contracts, or want to verify data deletion from our servers, contact our compliance officer at:
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-black/10">
              <a
                href="mailto:compliance@fastapparel.com"
                className="text-sm font-semibold text-black hover:text-black/70 underline"
              >
                compliance@fastapparel.com
              </a>
              <span className="text-xs font-semibold text-black/45">
                Fast Apparel — Compliance Division
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
