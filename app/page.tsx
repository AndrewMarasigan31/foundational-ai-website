import HeroSection from "@/components/HeroSection";
import DashboardSection from "@/components/DashboardSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyUsSection from "@/components/WhyUsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DashboardSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyUsSection />
    </main>
  );
}
