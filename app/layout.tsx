import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Playfair_Display, Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/siteConfig";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-synapse",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono-synapse",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Turn Clicks Into Booked Calls | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "You're getting clicks but not calls. We turn the local traffic you already get into booked appointments: a website built to convert, follow-up automation, and call tracking, plus the Local SEO and AI search that gets you found.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `Turn Clicks Into Booked Calls | ${SITE_NAME}`,
    description:
      "You're getting clicks but not calls. We turn the local traffic you already get into booked appointments: a website built to convert, follow-up automation, and call tracking, plus the Local SEO and AI search that gets you found.",
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Turn Clicks Into Booked Calls | ${SITE_NAME}`,
    description:
      "You're getting clicks but not calls. We turn the local traffic you already get into booked appointments: a website built to convert, follow-up automation, and call tracking, plus the Local SEO and AI search that gets you found.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable} ${playfairDisplay.variable} ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          src="https://booking.foundationalaisystem.com/js/external-tracking.js"
          data-tracking-id="tk_8b0a43be00614183a31262d72e969cf4"
          async
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QFW11762D7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QFW11762D7');
            `,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: SITE_NAME,
              description:
                "We turn the local traffic small businesses already get into booked calls: conversion-focused websites, lead reactivation, follow-up automation, and tracking, plus Local SEO and AI search.",
              url: SITE_URL,
              image: OG_IMAGE,
              telephone: "+19842860738",
              priceRange: "$$",
              areaServed: {
                "@type": "Country",
                name: "United States",
              },
              knowsAbout: [
                "Conversion Rate Optimization",
                "Website Design",
                "Lead Reactivation",
                "Marketing Automation",
                "Local SEO",
                "Google Business Profile",
                "AI Search Optimization",
              ],
            }),
          }}
        />
      </head>
      <body className={`${dmSans.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
