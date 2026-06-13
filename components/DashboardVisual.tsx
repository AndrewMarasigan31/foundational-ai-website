"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stepVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  }),
};

function CheckIcon() {
  return (
    <span className="material-symbols-outlined text-[#C9A227] text-base leading-none">
      check_circle
    </span>
  );
}

function StepHeader({ label, index, isInView }: { label: string; index: number; isInView: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ delay: index * 0.2 + 0.4, duration: 0.3 }}
      >
        <CheckIcon />
      </motion.span>
      <p className="text-sm font-semibold text-[#d1e5fb]">
        Step {index + 1}: {label}
      </p>
    </div>
  );
}

/* Step 1: SEO Content Added */
function Step1() {
  return (
    <div className="rounded-lg border border-white/10 bg-[#071520] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-[#C9A227] bg-[#C9A227]/10 border border-[#C9A227]/25 px-2 py-0.5 rounded-full">
          Blog Post · Local SEO
        </span>
      </div>
      <p className="text-sm font-semibold text-[#d1e5fb] mb-1 leading-snug">
        5 Ways to Optimize Your Google Business Profile in 2024
      </p>
      <p className="text-xs text-[#99907b] leading-relaxed">
        Claim your listing, complete every field, and use local keywords in your business description to surface in more searches.
      </p>
    </div>
  );
}

/* Step 2: Category Cleanup */
function Step2({ isInView }: { isInView: boolean }) {
  const wrong = ["General Contractor", "Home Services"];
  const right = ["Plumber", "Water Heater Installation Service", "Drain Cleaning Service"];

  return (
    <div className="rounded-lg border border-white/10 bg-[#071520] p-4 space-y-3">
      <div>
        <p className="text-xs text-[#99907b] uppercase tracking-wider mb-2">Removed</p>
        <div className="flex flex-wrap gap-2">
          {wrong.map((cat) => (
            <span
              key={cat}
              className="text-xs px-2 py-1 rounded border border-white/10 text-[#99907b]"
              style={{
                textDecoration: isInView ? "line-through" : "none",
                opacity: isInView ? 0.35 : 1,
                transition: "all 0.5s ease 0.15s",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-[#99907b] uppercase tracking-wider mb-2">Added</p>
        <div className="flex flex-wrap gap-2">
          {right.map((cat, i) => (
            <span
              key={cat}
              className="text-xs px-2 py-1 rounded border border-[#C9A227]/30 text-[#C9A227] bg-[#C9A227]/5"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "none" : "scale(0.85)",
                transition: `all 0.4s ease ${0.25 + i * 0.12}s`,
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Step 3: Business Description Refresh */
function Step3({ isInView }: { isInView: boolean }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#071520] p-4 min-h-[72px] relative overflow-hidden">
      {/* Placeholder skeleton */}
      <div
        className="space-y-2"
        style={{ opacity: isInView ? 0 : 1, transition: "opacity 0.4s ease 0s" }}
      >
        <div className="h-2.5 bg-white/10 rounded w-full" />
        <div className="h-2.5 bg-white/10 rounded w-5/6" />
        <div className="h-2.5 bg-white/10 rounded w-4/6" />
      </div>
      {/* Real copy */}
      <p
        className="text-sm text-[#d1e5fb] leading-relaxed absolute inset-4"
        style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}
      >
        Local plumbing specialists serving the greater Denver area since 2008. Available 24/7 for emergency repairs, fixture installation, and drain cleaning. Licensed, bonded, and Google-verified.
      </p>
    </div>
  );
}

/* Step 4: Photo & Content Recommendations */
function Step4({ isInView }: { isInView: boolean }) {
  const slots = [
    "Storefront",
    "Team Photo",
    "Work Sample",
    "Service Area",
  ];

  return (
    <div className="rounded-lg border border-white/10 bg-[#071520] p-4">
      <div className="grid grid-cols-4 gap-2">
        {slots.map((label, i) => (
          <div
            key={label}
            className="relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-1"
          >
            {/* Placeholder icon */}
            <span
              className="material-symbols-outlined text-white/20 text-xl"
              style={{ opacity: isInView ? 0 : 1, transition: `opacity 0.2s ease ${i * 0.1}s` }}
            >
              image
            </span>
            {/* Fill overlay */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-lg"
              style={{
                opacity: isInView ? 1 : 0,
                transition: `opacity 0.4s ease ${0.15 + i * 0.12}s`,
              }}
            >
              <span className="material-symbols-outlined text-[#C9A227] text-base">
                check_circle
              </span>
              <span className="text-[9px] text-[#C9A227]/80 text-center leading-tight px-1">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  { label: "SEO Content Added" },
  { label: "Category Cleanup" },
  { label: "Business Description Refresh" },
  { label: "Photo & Content Recommendations" },
];

export default function GBPOptimizationSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const stepContent = [
    <Step1 key="s1" />,
    <Step2 key="s2" isInView={isInView} />,
    <Step3 key="s3" isInView={isInView} />,
    <Step4 key="s4" isInView={isInView} />,
  ];

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto space-y-4">
      {STEPS.map((step, index) => (
        <motion.div
          key={step.label}
          custom={index * 0.2}
          variants={stepVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="rounded-xl border border-white/8 bg-[#0e2131] p-4">
            <StepHeader label={step.label} index={index} isInView={isInView} />
            {stepContent[index]}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
