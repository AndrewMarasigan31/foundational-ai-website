import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/siteConfig";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Foundational AI Systems operates — scoped engagements, straight reporting, and no open-ended retainers. Built for US small businesses.",
  openGraph: {
    title: "About — Foundational AI Systems",
    description:
      "Learn how Foundational AI Systems operates — scoped engagements, straight reporting, and no open-ended retainers.",
    url: `${SITE_URL}/about`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "About Foundational AI Systems" }],
  },
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return <AboutContent />;
}
