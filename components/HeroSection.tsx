"use client";

import Link from "next/link";
import LocalPackVisual from "./LocalPackVisual";

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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: copy */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 self-start bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-sm font-semibold px-4 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-base leading-none">bolt</span>
            Local SEO for US Small Businesses
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
            Your Competitors<br />Rank Higher.
            <br />
            <span className="text-[#C9A227]">That&apos;s Fixable.</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed max-w-lg">
            We build the Google presence your local business needs — optimized profiles,
            targeted content, and a site that converts — so you stop losing customers
            to competitors who simply show up first.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
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
        </div>

        {/* Right: visual */}
        <div className="flex items-center justify-center">
          <LocalPackVisual />
        </div>
      </div>
    </section>
  );
}
