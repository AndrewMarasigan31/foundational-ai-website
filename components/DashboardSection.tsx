import AnimatedSection from "./AnimatedSection";
import DashboardVisual from "./DashboardVisual";

export default function DashboardSection() {
  return (
    <section className="bg-[#000f1d] py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center gap-6 mb-12">
            {/* Section pill */}
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-sm font-semibold px-4 py-1.5 rounded-full">
              Business Growth Engine
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
              Data-Driven Results You Can Actually See
            </h2>

            {/* Subhead */}
            <p className="text-lg text-[#99907b] leading-relaxed max-w-2xl">
              Every campaign we run is backed by real metrics. Track your Google Business
              Profile views, local ranking improvements, and customer actions — all in one
              clear dashboard.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <DashboardVisual />
        </AnimatedSection>
      </div>
    </section>
  );
}
