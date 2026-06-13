import HeroSection from "@/components/HeroSection";
import DashboardSection from "@/components/DashboardSection";
import ServicesSection from "@/components/ServicesSection";
import CustomerJourneySection from "@/components/CustomerJourneySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import CTABand from "@/components/CTABand";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DashboardSection />
      <ServicesSection />
      <CustomerJourneySection />
      <HowItWorksSection />
      <WhyUsSection />
      <FAQSection />
      <CTABand />
    </main>
  );
}
