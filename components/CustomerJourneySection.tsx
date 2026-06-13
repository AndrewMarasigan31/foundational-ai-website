"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

type Tag = { label: string; isGold: boolean };

type JourneyNode = {
  icon: string;
  label: string;
  tags: Tag[];
  isLeak: boolean;
  isRecovery: boolean;
};

const nodes: JourneyNode[] = [
  { icon: "search", label: "Search", tags: [], isLeak: false, isRecovery: false },
  {
    icon: "location_on",
    label: "Found",
    tags: [
      { label: "GBP Audit", isGold: false },
      { label: "Local SEO Content", isGold: false },
    ],
    isLeak: false,
    isRecovery: false,
  },
  {
    icon: "language",
    label: "Visits Site",
    tags: [{ label: "Website Built to Convert", isGold: false }],
    isLeak: false,
    isRecovery: false,
  },
  {
    icon: "call",
    label: "Calls/Books",
    tags: [{ label: "Performance Tracking", isGold: false }],
    isLeak: false,
    isRecovery: false,
  },
  {
    icon: "schedule",
    label: "Goes Cold",
    tags: [{ label: "Lead Reactivation Sprint", isGold: true }],
    isLeak: true,
    isRecovery: false,
  },
  {
    icon: "task_alt",
    label: "Books Again",
    tags: [],
    isLeak: false,
    isRecovery: true,
  },
];

// Stagger tag delays: 0.1s each, starting after line finishes drawing (~1.4s)
const nodeTagDelays: number[][] = (() => {
  let d = 1.4;
  return nodes.map((node) =>
    node.tags.map(() => {
      const delay = d;
      d += 0.1;
      return delay;
    })
  );
})();

function circleClass(node: JourneyNode): string {
  if (node.isRecovery) {
    return "bg-[#C9A227] border-2 border-[#C9A227] text-[#021524] shadow-[0_0_24px_rgba(201,162,39,0.45)]";
  }
  if (node.isLeak) {
    return "bg-[#0e2131] border-2 border-red-500/40 text-red-400/80";
  }
  return "bg-[#0e2131] border-2 border-white/20 text-[#99907b]";
}

function labelClass(node: JourneyNode): string {
  if (node.isRecovery) return "text-[#C9A227]";
  if (node.isLeak) return "text-red-400/80";
  return "text-[#d1e5fb]";
}

function mobileConnectorStyle(i: number): React.CSSProperties {
  if (i === 3) {
    return {
      backgroundImage:
        "repeating-linear-gradient(to bottom, rgba(239,68,68,0.5) 0, rgba(239,68,68,0.5) 4px, transparent 4px, transparent 8px)",
    };
  }
  if (i === 4) {
    return { backgroundColor: "rgba(201,162,39,0.5)" };
  }
  return { backgroundColor: "rgba(255,255,255,0.1)" };
}

// Desktop: 3-segment animated horizontal line
// Nodes at grid-cols-6 centers: 8.33%, 25%, 41.67%, 58.33%, 75%, 91.67%
// Seg 1 solid (node1→node4): left 8.33%, width 50%
// Seg 2 dashed red (node4→node5): left 58.33%, width 16.67%
// Seg 3 gold (node5→node6): left 75%, width 16.67%
function AnimatedJourneyLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="hidden md:block absolute inset-x-0 z-0"
      style={{ top: "28px", height: "2px" }}
      aria-hidden="true"
    >
      {/* Solid: Search → Calls/Books */}
      <div
        className="absolute inset-y-0 overflow-hidden"
        style={{ left: "8.33%", width: "50%" }}
      >
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ x: "-100%" }}
          animate={{ x: isInView ? "0%" : "-100%" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
        />
      </div>

      {/* Dashed red: Calls/Books → Goes Cold */}
      <div
        className="absolute inset-y-0 overflow-hidden"
        style={{ left: "58.33%", width: "16.67%" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(239,68,68,0.5) 0, rgba(239,68,68,0.5) 5px, transparent 5px, transparent 10px)",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: isInView ? "0%" : "-100%" }}
          transition={{ duration: 0.25, delay: 0.9, ease: "easeInOut" }}
        />
      </div>

      {/* Solid gold: Goes Cold → Books Again */}
      <div
        className="absolute inset-y-0 overflow-hidden"
        style={{ left: "75%", width: "16.67%" }}
      >
        <motion.div
          className="absolute inset-0 bg-[#C9A227]/50"
          initial={{ x: "-100%" }}
          animate={{ x: isInView ? "0%" : "-100%" }}
          transition={{ duration: 0.25, delay: 1.15, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

export default function CustomerJourneySection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col items-center text-center gap-6 mb-16">
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-sm font-semibold px-4 py-1.5 rounded-full">
              The Full Picture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
              Where Most Local Businesses Lose Customers
            </h2>
            <p className="text-lg text-[#99907b] leading-relaxed max-w-xl">
              And what we do about it
            </p>
          </div>
        </AnimatedSection>

        {/* Desktop layout: 6-column grid with animated SVG line */}
        <div className="hidden md:block relative">
          <AnimatedJourneyLine />
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {nodes.map((node, i) => (
              <AnimatedSection key={node.label} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-3">
                  {/* Circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${circleClass(node)}`}
                  >
                    <span className="material-symbols-outlined text-xl leading-none">
                      {node.icon}
                    </span>
                  </div>

                  {/* Label */}
                  <span
                    className={`text-sm font-bold text-center ${labelClass(node)}`}
                  >
                    {node.label}
                  </span>

                  {/* Service impact tags — staggered in after line draws */}
                  {node.tags.length > 0 && (
                    <div className="flex flex-col gap-1.5 items-center">
                      {node.tags.map((tag, ti) => (
                        <AnimatedSection
                          key={tag.label}
                          delay={nodeTagDelays[i][ti]}
                        >
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${
                              tag.isGold
                                ? "bg-[#0e2131] border-[#C9A227]/60 text-[#C9A227]"
                                : "bg-[#0e2131] border-white/10 text-[#99907b]"
                            }`}
                          >
                            {tag.label}
                          </span>
                        </AnimatedSection>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Mobile layout: vertical single column, tags to the right */}
        <div className="md:hidden flex flex-col">
          {nodes.map((node, i) => (
            <AnimatedSection key={node.label} delay={i * 0.1}>
              <div className="flex items-start">
                {/* Left: circle + vertical connector */}
                <div className="flex flex-col items-center mr-4 shrink-0" style={{ width: "48px" }}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${circleClass(node)}`}
                  >
                    <span className="material-symbols-outlined text-xl leading-none">
                      {node.icon}
                    </span>
                  </div>
                  {i < nodes.length - 1 && (
                    <div
                      className="w-0.5 flex-1 my-1"
                      style={{ minHeight: "2rem", ...mobileConnectorStyle(i) }}
                    />
                  )}
                </div>

                {/* Right: label + tags */}
                <div className="flex flex-col gap-2 pt-3 pb-8">
                  <span className={`text-sm font-bold ${labelClass(node)}`}>
                    {node.label}
                  </span>
                  {node.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {node.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className={`text-xs px-2.5 py-1 rounded-full border ${
                            tag.isGold
                              ? "bg-[#0e2131] border-[#C9A227]/60 text-[#C9A227]"
                              : "bg-[#0e2131] border-white/10 text-[#99907b]"
                          }`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
