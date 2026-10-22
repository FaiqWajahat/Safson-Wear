import { Poppins } from "next/font/google";
import "./globals.css";

// Load only the 5 weights actually used across the site — removes 2 extra font files (~60KB)
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  display: "swap", // Prevents invisible text during font load (FOIT)
  preload: true,
});

export const metadata = {
  title: "Safson Wear | Premium Custom Sportswear & Apparel Manufacturer",
  description:
    "Safson Wear is a leading custom apparel manufacturer specializing in premium Street Wear, Sports Wear, and Private-Label programs. Low MOQs starting at 10 pcs.",
  keywords: [
    "custom sportswear manufacturer",
    "Safson Wear",
    "private label apparel",
    "Sialkot sportswear manufacturer",
    "custom street wear",
    "sports wear manufacturer",
    "custom team uniforms"
  ],
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico?v=3" },
    ],
    shortcut: "/favicon-32x32.png?v=3",
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png?v=3",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png?v=3",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Cloudinary CDN for faster image delivery */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body
        className="min-h-full flex flex-col bg-black text-white selection:bg-neutral-850 selection:text-white font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
