import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-[#021524] py-24 md:py-32">
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,162,39,0.10) 0%, transparent 70%)",
        }}
      />

      <AnimatedSection>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
            Start with a <em className="font-serif not-italic text-[#C9A227]">free</em> audit call.{" "}
            <span className="text-[#C9A227]">No pitch, no pressure.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed max-w-xl">
            We review your Google and AI search visibility, your existing lead list, and your
            current site. Then we tell you exactly where revenue is leaking and what we would fix first.
            No obligation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#b8911f] text-[#021524] font-bold text-base px-7 py-3.5 rounded-full transition-colors shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_28px_rgba(201,162,39,0.5)] w-full sm:w-auto"
            >
              Book a Free Audit Call
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border border-[#C9A227]/50 hover:border-[#C9A227] text-[#d1e5fb] hover:text-[#C9A227] font-semibold text-base px-7 py-3.5 rounded-full transition-colors w-full sm:w-auto"
            >
              See the Services
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
