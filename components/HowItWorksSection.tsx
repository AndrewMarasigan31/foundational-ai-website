"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    num: "01",
    title: "Free Audit Call",
    description:
      "30 minutes. We review your GBP, Google and AI search visibility, existing lead list, and current site. You leave with a clear picture of where revenue is leaking, whether you hire us or not.",
  },
  {
    num: "02",
    title: "We Build the Plan",
    description:
      "Based on the audit, we recommend the right starting point: GBP optimization, content, AI search, or a lead reactivation sprint. No upsells. No unnecessary scope.",
  },
  {
    num: "03",
    title: "You Approve, We Execute",
    description:
      "Every deliverable goes through your review before it goes live. You're not handing us the keys. You stay in control of your brand and your messaging.",
  },
  {
    num: "04",
    title: "Track Results, Iterate",
    description:
      "We report on ranking movement, AI search appearances, profile views, and call volume. If something isn't working, we adjust. No waiting on a quarterly review.",
  },
];

const stepDelays = [0, 0.15, 0.3, 0.45];

export default function HowItWorksSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 px-6 bg-[#0e2131] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection direction="up" className="flex flex-col items-center text-center gap-6 mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#99907b] mb-3">04 — PROCESS</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.04em] max-w-3xl">
            Simple Enough to Explain in Four Steps
          </h2>
          <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed max-w-2xl">
            No onboarding maze. No kick-off call theater. Here&apos;s exactly what happens when
            you reach out.
          </p>
        </AnimatedSection>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {steps.map((step, index) =>
            prefersReducedMotion ? (
              <div
                key={step.num}
                className="border-l-2 border-[#C9A227]/30 pl-8 py-2 flex flex-col gap-4"
              >
                <span className="text-8xl md:text-9xl font-extrabold text-[#C9A227]/[0.20] leading-none select-none">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-[#d1e5fb]">{step.title}</h3>
                <p className="text-[#99907b] text-base leading-relaxed">{step.description}</p>
              </div>
            ) : (
              <motion.div
                key={step.num}
                className="border-l-2 border-[#C9A227]/30 pl-8 py-2 flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: stepDelays[index] }}
              >
                <span className="text-8xl md:text-9xl font-extrabold text-[#C9A227]/[0.20] leading-none select-none">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-[#d1e5fb]">{step.title}</h3>
                <p className="text-[#99907b] text-base leading-relaxed">{step.description}</p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
