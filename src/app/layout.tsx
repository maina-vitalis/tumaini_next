import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/Navbar";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import {
  generateMetadata,
  generateOrganizationSchema,
  generateWebSiteSchema,
  getAbsoluteUrl,
  SEO_CONFIG,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

// Reusable JSON-LD component to avoid React script warnings during hydration
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  );
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Root metadata - enhanced for SEO (Next.js will merge + override per-page)
export const metadata: Metadata = {
  ...generateMetadata({}),
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: SEO_CONFIG.siteUrl,
  },
  verification: {
    // Add these in env or here when you have the codes:
    // google: "your-google-site-verification",
    // yandex: "...",
  },
};

// Separate viewport export (Next.js best practice)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect for performance (critical external origins) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Theme color already set via viewport export + meta in some browsers */}
        <meta name="theme-color" content="#16a34a" />

        {/* Structured Data - Organization + WebSite (critical for SEO) */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />

        {/* Additional SEO / compatibility */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Security / referrer (good defaults) */}
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      <body className={cn(inter.className, "antialiased flex min-h-dvh flex-col")}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Skip to main content for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
            >
              Skip to main content
            </a>

            <Navbar />

            <main
              id="main-content"
              className="mx-auto w-full flex-1 px-3 md:max-w-[95%] lg:max-w-[1200px]"
              role="main"
            >
              {children}
            </main>

            <Footer />
            <Toaster />
          </ThemeProvider>
        </QueryProvider>

        {/* Performance monitoring */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
