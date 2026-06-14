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

const cardBase =
  "relative overflow-hidden bg-[#0e2131] border border-white/10 rounded-2xl p-8 hover:-translate-y-1 hover:border-white/20 transition-all duration-300";

export default function WhyUsSection() {
  const prefersReducedMotion = useReducedMotion();

  const card = (
    className: string,
    children: React.ReactNode,
    delay: number
  ) =>
    prefersReducedMotion ? (
      <div className={className}>{children}</div>
    ) : (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease, delay }}
      >
        {children}
      </motion.div>
    );

  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection direction="up" className="flex flex-col items-center text-center gap-6 mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#99907b]">03 — WHY US</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.04em] max-w-3xl">
            Built <em className="font-serif not-italic text-[#C9A227]">Lean.</em> Scoped Clearly.
          </h2>
        </AnimatedSection>

        {/* Row 1: card 01 (wide) + card 02 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Card 01 — col-span-2, text only */}
          {card(
            `md:col-span-2 ${cardBase} flex flex-col gap-4`,
            <>
              <span className="absolute top-4 right-6 text-8xl font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                {reasons[0].num}
              </span>
              <h3 className="text-xl font-bold text-[#d1e5fb] relative z-10">{reasons[0].title}</h3>
              <p className="text-[#99907b] leading-relaxed relative z-10 max-w-lg">{reasons[0].description}</p>
            </>,
            0
          )}

          {/* Card 02 */}
          {card(
            `${cardBase} flex flex-col gap-4`,
            <>
              <span className="absolute top-4 right-6 text-8xl font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                {reasons[1].num}
              </span>
              <h3 className="text-xl font-bold text-[#d1e5fb] relative z-10">{reasons[1].title}</h3>
              <p className="text-[#99907b] leading-relaxed relative z-10">{reasons[1].description}</p>
            </>,
            0.1
          )}
        </div>

        {/* Row 2: card 03 — full width, horizontal layout */}
        {card(
          `${cardBase} flex flex-col md:flex-row md:items-center gap-6 md:gap-16`,
          <>
            <span className="absolute bottom-4 right-8 text-8xl font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
              {reasons[2].num}
            </span>
            {/* Left: title */}
            <h3 className="text-xl md:text-2xl font-bold text-[#d1e5fb] relative z-10 md:w-64 shrink-0">
              {reasons[2].title}
            </h3>
            {/* Divider */}
            <div className="hidden md:block w-px self-stretch bg-white/10 shrink-0" />
            {/* Right: description + highlights */}
            <p className="text-[#99907b] leading-relaxed relative z-10 flex-1">{reasons[2].description}</p>
          </>,
          0.2
        )}
      </div>
    </section>
  );
}
