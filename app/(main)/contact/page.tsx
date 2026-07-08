import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/siteConfig";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Book a Free Audit Call",
  description:
    "Getting clicks but not calls? Book a free 30-minute audit call. We review your site, follow-up, and lead list and show you exactly where your clicks are leaking instead of becoming booked appointments.",
  openGraph: {
    title: "Book a Free Audit Call | Foundational AI Systems",
    description:
      "Getting clicks but not calls? Book a free 30-minute audit call. We show you exactly where your clicks are leaking instead of becoming booked appointments, whether or not you hire us.",
    url: `${SITE_URL}/contact`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Contact Foundational AI Systems" }],
  },
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return <ContactContent />;
}
