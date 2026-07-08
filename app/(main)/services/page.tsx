import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/siteConfig";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Turn the clicks you already get into booked calls. A website built to convert, lead reactivation, follow-up automation, and call tracking, plus the ranking work that gets you found. Fixed-scope. No retainers.",
  openGraph: {
    title: "Services | Foundational AI Systems",
    description:
      "Turn the clicks you already get into booked calls. Conversion-focused websites, lead reactivation, follow-up automation, and the local ranking work that feeds the funnel.",
    url: `${SITE_URL}/services`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Foundational AI Systems Services" }],
  },
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
