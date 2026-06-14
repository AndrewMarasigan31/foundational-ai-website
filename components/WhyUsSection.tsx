"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const reasons = [
  {
    num: "01",
    title: "AI-Assisted, Human-Reviewed",
    description:
      "We use AI tools to move faster on research, drafts, audits, and content. But every output is reviewed, edited, and approved by a human before it touches your business. Speed without slop.",
  },
  {
    num: "02",
    title: "Built for How Search Actually Works Now",
    description:
      "Customers now find businesses through Google, ChatGPT, Perplexity, and AI Overviews. We optimize for the full search landscape, not just the version of local SEO that existed three years ago.",
  },
  {
    num: "03",
    title: "No Bloated Layers",
    description:
      "No account manager, no junior execution team, no offshore handoff. You work directly with the people doing the work. Clearer communication, faster decisions, and no scope that exists just to justify a retainer.",
  },
];

export default function WhyUsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection direction="up" className="flex flex-col items-center text-center gap-6 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
            Built <em className="font-serif not-italic text-[#C9A227]">Lean.</em> Scoped Clearly.
          </h2>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, i) =>
            prefersReducedMotion ? (
              <div
                key={reason.num}
                className="relative overflow-hidden bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col gap-4"
              >
                <span className="absolute top-4 right-6 text-8xl font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                  {reason.num}
                </span>
                <h3 className="text-xl font-bold text-[#d1e5fb] relative z-10">{reason.title}</h3>
                <p className="text-[#99907b] leading-relaxed relative z-10">{reason.description}</p>
              </div>
            ) : (
              <motion.div
                key={reason.num}
                className="relative overflow-hidden bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <span className="absolute top-4 right-6 text-8xl font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                  {reason.num}
                </span>
                <h3 className="text-xl font-bold text-[#d1e5fb] relative z-10">{reason.title}</h3>
                <p className="text-[#99907b] leading-relaxed relative z-10">{reason.description}</p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
