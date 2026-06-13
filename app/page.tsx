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
