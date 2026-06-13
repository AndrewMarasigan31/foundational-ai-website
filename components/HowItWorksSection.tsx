"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

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
    <section className="py-20 md:py-28 px-6 bg-[#0e2131]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
            Simple Enough to Explain in Four Steps
          </h2>
          <p className="text-lg text-[#99907b] leading-relaxed max-w-2xl">
            No onboarding maze. No kick-off call theater. Here&apos;s exactly what happens when
            you reach out.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Animated SVG connecting line — desktop only */}
          <AnimatedProcessLine />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div key={step.num} className="group flex flex-col items-center text-center gap-4">
                {/* Large display number */}
                <span
                  className={`
                    text-8xl font-extrabold leading-none transition-colors duration-300
                    ${
                      index === 0
                        ? "text-[#C9A227]"
                        : "text-white/10 group-hover:text-[#C9A227]"
                    }
                  `}
                >
                  {step.num}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#d1e5fb]">{step.title}</h3>

                {/* Description */}
                <p className="text-[#99907b] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
