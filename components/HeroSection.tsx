import Link from "next/link";
import LocalPackCard from "./LocalPackCard";
import TrustBar from "./TrustBar";
import AnimatedSection from "./AnimatedSection";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#021524]">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,162,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center gap-8">
        {/* Copy block */}
        <div className="flex flex-col gap-5 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
            Your Competitors<br />Rank Higher.
            <br />
            That&apos;s <em className="font-serif not-italic text-[#C9A227]">Fixable.</em>
          </h1>

          <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed">
            We build the local presence your business needs: optimized Google profiles,
            AI search visibility, targeted content, and a system that recovers the leads
            you already paid for. Stop losing customers to competitors who simply show up first.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#b8911f] text-[#021524] font-bold text-base px-7 py-3.5 rounded-full transition-colors shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_28px_rgba(201,162,39,0.5)]"
          >
            Book a Free Audit Call
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 border border-[#C9A227]/50 hover:border-[#C9A227] text-[#d1e5fb] hover:text-[#C9A227] font-semibold text-base px-7 py-3.5 rounded-full transition-colors"
          >
            See the Services
          </Link>
        </div>

        <TrustBar />

        {/* LocalPackVisual scroll-reveal */}
        <AnimatedSection direction="up" delay={0.3}>
          <div className="w-full max-w-xl">
            <LocalPackCard />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
