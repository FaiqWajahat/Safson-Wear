import React, { Suspense } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Suspense fallback={<div className="h-20 bg-black w-full" />}>
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
