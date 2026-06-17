import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "AI-Powered Local Growth for Small Businesses",
  description:
    "Local SEO, GBP optimization, and AI growth planning for US small businesses. Get into Google's top 3. Book a free strategy call.",
  openGraph: {
    title: "AI-Powered Local Growth for Small Businesses | Foundational AI Systems",
    description:
      "Local SEO, GBP optimization, and AI growth planning for US small businesses. Get into Google's top 3.",
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Foundational AI Systems" }],
  },
  alternates: { canonical: SITE_URL },
};

import HeroSection from "@/components/HeroSection";
import CustomerJourneySection from "@/components/CustomerJourneySection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import CTABand from "@/components/CTABand";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CustomerJourneySection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyUsSection />
      <FAQSection />
      <CTABand />
    </main>
  );
}
