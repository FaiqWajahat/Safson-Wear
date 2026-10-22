import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Safson Wear — B2B Sportswear Manufacturers',
  description:
    'Read the Safson Wear terms of service. Learn about B2B pricing quote validity, payment structures, prototyping policies, size tolerances, and bulk shipping agreements.',
};

export default function TermsPage() {
  const terms = [
    {
      title: '1. B2B Quotes & Pricing Validity',
      content:
        'All production quotes issued by Safson Wear are valid for exactly 30 calendar days from date of issuance. Due to global cotton, polyester yarn, and dye chemical cost fluctuations, prices may be adjusted beyond this window. Quotes do not include shipping freight, import customs tariffs, or localized VAT, which are itemized separately upon final invoice generation.',
    },
    {
      title: '2. Payment Terms & Deposit Structure',
      content:
        'Our standard B2B payment terms require a 30% to 50% initial deposit (depending on fabric customization and order volume) before fabric milling, dye sublimation setups, or cutting starts. The remaining balance is strictly due upon completion of production, verified through digital QC reports or physical client inspections, and before shipping containers are released from our Sialkot warehouse.',
    },
    {
      title: '3. Textile & Manufacturing Tolerances',
      content:
        'In accordance with standard international textile manufacturing guidelines, custom-sewn sportswear has an allowed sizing specification tolerance of +/- 3% on body chest, width, and length dimensions. Fabric weights (GSM) may vary within +/- 5% due to industrial dyeing processes. Custom dye lot bulk quantities allow a +/- 2% yield variance from the original order sheet.',
    },
    {
      title: '4. Shipping, Logistics & Delivery Duties',
      content:
        'Unless explicitly specified as DDP (Delivered Duty Paid), all bulk orders are shipped FOB (Free on Board) from Sialkot/Karachi ports. Risk of loss and title transfer pass to the buyer once the carrier logs the shipment. Delivery lead times are estimates; Safson Wear is not liable for cargo transit delays caused by customs port congestion or global carrier capacity shortages.',
    },
    {
      title: '5. Quality Claims & Inspection Policy',
      content:
        'Clients have exactly 14 calendar days from the date of cargo delivery at their target warehouse to inspect the bulk shipment and submit written claims regarding sewing defects, missing items, or size deviations. Claims must be accompanied by photo/video documentation. Confirmed factory defects will be resolved via credit notes or priority replacement runs.',
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
              Terms of Service
            </h1>
            <p className="text-sm text-black/60 leading-relaxed">
              These terms govern B2B sportswear custom manufacturing and logistics agreements between Safson Wear and purchase organizations. Please review these specifications before initiating prototyping.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            {terms.map((t, idx) => (
              <div key={idx} className="pb-8 border-b border-black/10 last:border-0 last:pb-0">
                <h2 className="text-lg font-bold text-black mb-3">
                  {t.title}
                </h2>
                <p className="text-sm text-black/60 leading-relaxed">
                  {t.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact / Legal Box */}
          <div className="mt-14 p-8 rounded-3xl bg-neutral-50 border border-black/10">
            <h3 className="text-base font-bold text-black mb-2">
              B2B Contractual Agreements & Sign-off
            </h3>
            <p className="text-sm text-black/60 leading-relaxed mb-6">
              All bulk manufacturing operations are governed by these standard terms unless a customized supply contract or master service agreement has been executed and signed by both parties.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-black/10">
              <a
                href="mailto:legal@fastapparel.com"
                className="text-sm font-semibold text-black hover:text-black/70 underline"
              >
                legal@fastapparel.com
              </a>
              <span className="text-xs font-semibold text-black/45">
                Safson Wear — Legal & Contract Division
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
