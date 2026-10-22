import FAQ from '@/components/home/FAQ';
import MapSection from '@/components/home/MapSection';
import GlobalPresence from '@/components/home/GlobalPresence';
import TimeSection from '@/components/home/TimeSection';
import QuoteForm from '@/components/inquiry/QuoteForm';

export const metadata = {
  title: 'Request a Quote | Fast Apparel — B2B Sportswear Manufacturing',
  description:
    'Get a custom manufacturing quote from Fast Apparel. Tell us your product requirements, quantities, and timeline — our B2B sales team responds within 12 business hours.',
};

export default function InquiryPage() {
  return (
    <>
      {/* Header + multi-section quote form */}
      <QuoteForm />

      {/* Offices with photos */}
      <div className="border-t border-black/10">
        <GlobalPresence />
      </div>

      {/* Live desk hours */}
      <TimeSection />

      {/* Export markets map — dark */}
      <MapSection />

      {/* FAQ */}
      <FAQ />
    </>
  );
}
