import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Turn Clicks Into Booked Calls",
  description:
    "You're getting clicks but not calls. We turn the traffic you already pay for into booked appointments, with a website built to convert, follow-up automation, and call tracking. Book a free audit call.",
  openGraph: {
    title: "Turn Clicks Into Booked Calls | Foundational AI Systems",
    description:
      "You're getting clicks but not calls. We turn the traffic you already pay for into booked appointments, with a site built to convert and follow-up that catches every lead.",
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Foundational AI Systems" }],
  },
  alternates: { canonical: SITE_URL },
};

import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";
import CTABand from "@/components/CTABand";
import WorkTeaser from "@/components/WorkTeaser";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <FAQSection />
      <CTABand />
      <WorkTeaser />
    </main>
  );
}
