"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    num: "01",
    title: "Free Audit Call",
    description:
      "30 minutes. We look at your GBP, your search visibility, and your current site. You walk away with a clear picture of what's costing you rankings, whether you hire us or not.",
  },
  {
    num: "02",
    title: "We Build the Plan",
    description:
      "Based on the audit, we recommend the right starting point: usually the GBP optimization, sometimes content, sometimes both. No upsells and no unnecessary scope.",
  },
  {
    num: "03",
    title: "You Approve, We Execute",
    description:
      "Every deliverable goes through your review before it goes live. You're not handing us the keys; you stay in control of your brand and your messaging.",
  },
  {
    num: "04",
    title: "Track Results, Iterate",
    description:
      "We report on ranking movement, profile views, and call volume. If something isn't working, we adjust. No waiting on a quarterly review to find out what happened.",
  },
];

const stepDelays = [0, 0.15, 0.3, 0.45];

function AnimatedProcessLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, margin: "-10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ pathLength: 1 });
    }
  }, [isInView, controls]);

  return (
    <svg
      ref={svgRef}
      className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] z-0"
      height="1"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="0.5"
        x2="100%"
        y2="0.5"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={controls}
        transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col items-center text-center gap-6 mb-16">
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-sm font-semibold px-4 py-1.5 rounded-full">
              Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
              Simple Enough to Explain in Four Steps
            </h2>
            <p className="text-lg text-[#99907b] leading-relaxed max-w-2xl">
              No onboarding maze. No kick-off call theater. Here&apos;s exactly what happens when
              you reach out.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Animated SVG connecting line — desktop only */}
          <AnimatedProcessLine />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <AnimatedSection key={step.num} delay={stepDelays[index]}>
                <div className="group flex flex-col items-center text-center gap-4">
                  {/* Circle */}
                  <div
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold
                      border-2 transition-all duration-300
                      ${
                        index === 0
                          ? "bg-[#C9A227] border-[#C9A227] text-[#021524] shadow-[0_0_24px_rgba(201,162,39,0.45)]"
                          : "bg-[#0e2131] border-white/20 text-[#99907b] group-hover:border-[#C9A227] group-hover:text-[#C9A227]"
                      }
                    `}
                  >
                    {step.num}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#d1e5fb]">{step.title}</h3>

                  {/* Description */}
                  <p className="text-[#99907b] text-sm leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
