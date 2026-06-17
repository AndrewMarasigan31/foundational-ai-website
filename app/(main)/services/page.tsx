import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/siteConfig";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "GBP audits, local SEO content, AI search visibility, lead reactivation, and website design for US small businesses. Fixed-scope. No retainers.",
  openGraph: {
    title: "Services — Foundational AI Systems",
    description:
      "GBP audits, local SEO content, AI search visibility, lead reactivation, and website design for US small businesses.",
    url: `${SITE_URL}/services`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Foundational AI Systems Services" }],
  },
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
