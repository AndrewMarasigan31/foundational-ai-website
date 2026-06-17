import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/siteConfig";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute strategy call with Foundational AI Systems. We'll audit your GBP, review your AI search visibility, and map out your next move.",
  openGraph: {
    title: "Contact — Foundational AI Systems",
    description:
      "Book a free 30-minute strategy call. We'll audit your GBP, review your AI search visibility, and map out your next move.",
    url: `${SITE_URL}/contact`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Contact Foundational AI Systems" }],
  },
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return <ContactContent />;
}
