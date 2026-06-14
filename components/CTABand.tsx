"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const ease = [0.16, 1, 0.3, 1] as const;

const trustSignals = [
  "No contract required",
  "Results in weeks",
  "Direct access to the team",
];

export default function CTABand() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#021524] py-28 md:py-40">
      {/* Gold radial glow */}
      {prefersReducedMotion ? (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,162,39,0.10) 0%, transparent 70%)",
          }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,162,39,0.10) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Left column: heading + subtext */}
        {prefersReducedMotion ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#d1e5fb] leading-none tracking-[-0.04em]">
              Rank. Convert. <em className="font-serif not-italic text-[#C9A227]">Grow.</em>
            </h2>
            <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed">
              We review your Google and AI search visibility, your existing lead list, and your
              current site. Then we tell you exactly where revenue is leaking and what we would fix first.
              No obligation.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#d1e5fb] leading-none tracking-[-0.04em]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0 }}
            >
              Rank. Convert. <em className="font-serif not-italic text-[#C9A227]">Grow.</em>
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-[#99907b] leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
            >
              We review your Google and AI search visibility, your existing lead list, and your
              current site. Then we tell you exactly where revenue is leaking and what we would fix first.
              No obligation.
            </motion.p>
          </div>
        )}

        {/* Right column: CTA card */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#b8911f] text-[#021524] font-bold text-base px-7 py-3.5 rounded-full transition-colors shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_28px_rgba(201,162,39,0.5)] w-full sm:w-auto"
              >
                Book a Free Audit Call
              </Link>
            </div>

            <ul className="flex flex-col gap-2">
              {trustSignals.map((signal) => (
                <li key={signal} className="flex items-center gap-2 text-sm text-[#99907b]">
                  <span className="text-[#C9A227]">✓</span>
                  {signal}
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="inline-flex items-center gap-1 border border-[#C9A227]/50 hover:border-[#C9A227] text-[#d1e5fb] hover:text-[#C9A227] font-semibold text-base px-7 py-3.5 rounded-full transition-colors justify-center"
            >
              See the Services
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
