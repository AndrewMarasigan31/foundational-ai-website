"use client";

import { motion, useReducedMotion } from "framer-motion";
import CTABand from "@/components/CTABand";
import AnimatedSection from "@/components/AnimatedSection";

const ease = [0.16, 1, 0.3, 1] as const;

const principles = [
  {
    num: "01",
    title: "Scoped before started",
    description:
      "Every engagement has a defined deliverable, not an open-ended retainer. You know exactly what you are paying for before work begins.",
  },
  {
    num: "02",
    title: "You stay in control",
    description:
      "Nothing goes live without your review and approval. Every draft, every update, every change. You see it before your customers do.",
  },
  {
    num: "03",
    title: "Straight reporting",
    description:
      "We tell you what moved, what didn't, and what we'd change. No vanity metrics. No padded dashboards. Just the numbers that matter.",
  },
];

const dontDos = [
  "No long-term lock-in contracts.",
  "No offshore execution teams.",
  "No AI content published without human review.",
  "No scope that exists just to justify a monthly fee.",
];

const headlineLines = [
  { text: "Local businesses keep losing", delay: 0 },
  { text: "to competitors who simply", delay: 0.1 },
  { text: "show up better online.", delay: 0.2 },
  { text: "We're here to fix that.", delay: 0.3 },
];

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main>

      {/* Section 1 — Hero */}
      <section
        className="relative overflow-hidden bg-[#021524] py-20 md:py-36 px-6"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.05em]">
            {headlineLines.map(({ text, delay }) => (
              <span key={text} className="block overflow-hidden">
                {prefersReducedMotion ? (
                  <span className="block">{text}</span>
                ) : (
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, delay, ease }}
                  >
                    {text}
                  </motion.span>
                )}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* Section 2 — The founder story */}
      <section className="bg-[#000f1d] py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">

          <AnimatedSection direction="up">
            <p className="font-mono text-xs uppercase tracking-widest text-[#C9A227] mb-6">The Founder</p>
            <h2 className="text-3xl sm:text-4xl font-display font-light text-[#d1e5fb] mb-10 tracking-[-0.04em] leading-snug">
              I&apos;ve always tracked where<br className="hidden sm:block" /> technology is going, before<br className="hidden sm:block" /> most people know it&apos;s coming.
            </h2>
          </AnimatedSection>

          <div className="flex flex-col gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <p className="text-lg text-[#99907b] leading-relaxed">
                Not as a hobby. As a discipline. When AI started reshaping how businesses get found, booked, and retained,{" "}
                <span className="text-[#d1e5fb] font-medium">I didn&apos;t wait to see how it played out. I went all in.</span>
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.15}>
              <p className="text-lg text-[#99907b] leading-relaxed">
                I joined{" "}
                <span className="text-[#d1e5fb] font-medium">Nick Ponte&apos;s AI Inner Circle mastermind</span>{" "}
                and spent serious time learning what actually works at the frontier of AI-powered growth. Not theory. The playbook serious operators use to build systems that scale.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-lg text-[#99907b] leading-relaxed">
                What I kept seeing was the same gap:{" "}
                <span className="text-[#d1e5fb] font-medium">small businesses running on word-of-mouth and luck</span>{" "}
                while their competitors quietly built systems that worked on autopilot, getting found, getting booked, and staying top of mind without lifting a finger.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.25}>
              <p className="text-lg text-[#99907b] leading-relaxed">
                That gap doesn&apos;t close on its own.{" "}
                <span className="text-[#d1e5fb] font-medium">Foundational AI Systems is how we close it.</span>
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <p className="text-sm text-[#d1e5fb]/40 italic border-t border-white/10 pt-6">
                Proud member of the Nick Ponte AI Inner Circle Network.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section 3 — The reality */}
      <section className="bg-[#021524] py-16 md:py-20 px-6 border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            <blockquote className="text-2xl sm:text-3xl font-display font-light text-[#d1e5fb]/70 leading-snug tracking-[-0.03em] text-center">
              &ldquo;Most local SEO agencies sell bloated retainers and generic advice. We scope clearly, execute lean, and report on what actually moved.&rdquo;
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 4 — Principles */}
      <section className="bg-[#000f1d] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up">
            <p className="font-mono text-xs uppercase tracking-widest text-[#C9A227] text-center mb-4">How We Work</p>
            <h2 className="text-3xl sm:text-4xl font-display font-light text-[#d1e5fb] text-center mb-14 tracking-[-0.04em]">
              Three things that never change
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <AnimatedSection key={p.num} direction="up" delay={0.1 + i * 0.1}>
                <div className="relative overflow-hidden bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col gap-4 h-full">
                  <span className="absolute top-4 right-6 text-8xl font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                    {p.num}
                  </span>
                  <h3 className="text-xl font-bold text-[#d1e5fb] relative z-10">{p.title}</h3>
                  <p className="text-[#99907b] leading-relaxed relative z-10">{p.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — What we don't do */}
      <section className="bg-[#021524] py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            <p className="font-mono text-xs uppercase tracking-widest text-[#C9A227] mb-4">Guardrails</p>
            <h2 className="text-3xl sm:text-4xl font-display font-light text-[#d1e5fb] mb-10 tracking-[-0.04em]">
              What we don&apos;t do
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <ul className="flex flex-col gap-5">
              {dontDos.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-red-400/80 material-symbols-outlined text-xl leading-none shrink-0">close</span>
                  <span className="text-lg text-[#99907b] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 6 — CTA */}
      <CTABand />
    </main>
  );
}
