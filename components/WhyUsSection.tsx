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
    title: "Built for Modern Search",
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

const ease = [0.16, 1, 0.3, 1] as const;

const wideCardClass =
  "relative overflow-hidden bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row gap-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 h-full";
const smallCardClass =
  "relative overflow-hidden bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col gap-4 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex-1";

export default function WhyUsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection direction="up" className="flex flex-col items-center text-center gap-6 mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#99907b] mb-3">03 — WHY US</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.04em] max-w-3xl">
            Built <em className="font-serif not-italic text-[#C9A227]">Lean.</em> Scoped Clearly.
          </h2>
        </AnimatedSection>

        {/* Bento grid: card 1 spans 2 cols, cards 2-3 stack in 1 col */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Wide card (card 1) — horizontal layout on desktop */}
          {prefersReducedMotion ? (
            <div className={`md:col-span-2 ${wideCardClass}`}>
              <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
                <span className="text-[6rem] font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                  {reasons[0].num}
                </span>
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <h3 className="text-xl font-bold text-[#d1e5fb]">{reasons[0].title}</h3>
                <p className="text-[#99907b] leading-relaxed">{reasons[0].description}</p>
              </div>
            </div>
          ) : (
            <motion.div
              className={`md:col-span-2 ${wideCardClass}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0 }}
            >
              <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
                <span className="text-[6rem] font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                  {reasons[0].num}
                </span>
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <h3 className="text-xl font-bold text-[#d1e5fb]">{reasons[0].title}</h3>
                <p className="text-[#99907b] leading-relaxed">{reasons[0].description}</p>
              </div>
            </motion.div>
          )}

          {/* Cards 2 & 3 stacked in right column */}
          <div className="flex flex-col gap-6">
            {reasons.slice(1).map((reason, i) =>
              prefersReducedMotion ? (
                <div key={reason.num} className={smallCardClass}>
                  <span className="absolute top-4 right-6 text-8xl font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                    {reason.num}
                  </span>
                  <h3 className="text-xl font-bold text-[#d1e5fb] relative z-10">{reason.title}</h3>
                  <p className="text-[#99907b] leading-relaxed relative z-10">{reason.description}</p>
                </div>
              ) : (
                <motion.div
                  key={reason.num}
                  className={smallCardClass}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: (i + 1) * 0.1 }}
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
      </div>
    </section>
  );
}
