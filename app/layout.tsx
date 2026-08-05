import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/data/site";
import { absoluteUrl } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Software your company can stand on`,
    template: `${siteConfig.name} · %s`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [...siteConfig.keywords],
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Software your company can stand on`,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Software your company can stand on`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Software your company can stand on`,
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  other: {
    "msapplication-TileColor": "#16150F",
  },
  icons: {
    icon: [{ url: "/brand/logo-dark.svg", type: "image/svg+xml" }],
    shortcut: ["/brand/logo-dark.svg"],
    apple: [{ url: "/brand/logo-dark.svg" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F5F0" },
    { media: "(prefers-color-scheme: dark)", color: "#16150F" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bone font-sans text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone"
        >
          Skip to content
        </a>
        <JsonLd />
        <SiteNav />
        <SiteMotion>
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SiteMotion>
      </body>
    </html>
  );
}
