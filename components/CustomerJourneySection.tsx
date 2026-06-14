"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Tag = { label: string; gold?: boolean };

type Node = {
  icon: string;
  label: string;
  sublabel: string;
  tags: Tag[];
  state: "neutral" | "leak" | "recovery";
};

const nodes: Node[] = [
  {
    icon: "travel_explore",
    label: "Search",
    sublabel: "Google, ChatGPT, Perplexity, AI Overviews",
    tags: [],
    state: "neutral",
  },
  {
    icon: "location_on",
    label: "Gets Found",
    sublabel: "Local pack, maps, or AI answer",
    tags: [
      { label: "GBP Audit" },
      { label: "Local SEO Content" },
      { label: "AI Search Visibility" },
    ],
    state: "neutral",
  },
  {
    icon: "language",
    label: "Visits Site",
    sublabel: "Clicks through to website",
    tags: [{ label: "Website Built to Convert" }],
    state: "neutral",
  },
  {
    icon: "call",
    label: "Calls / Books",
    sublabel: "Converts to a real lead",
    tags: [{ label: "Performance Tracking" }],
    state: "neutral",
  },
  {
    icon: "hourglass_empty",
    label: "Goes Cold",
    sublabel: "No follow-up. Revenue lost.",
    tags: [{ label: "Lead Reactivation Sprint", gold: true }],
    state: "leak",
  },
  {
    icon: "task_alt",
    label: "Books Again",
    sublabel: "Recovered revenue.",
    tags: [],
    state: "recovery",
  },
];

const cardStyles: Record<Node["state"], string> = {
  neutral:
    "bg-[#0e2131] border border-white/10 hover:border-white/20",
  leak:
    "bg-[#1a0a0a] border border-red-500/40 hover:border-red-500/60",
  recovery:
    "bg-[#0a1208] border border-[#C9A227]/50 shadow-[0_0_32px_rgba(201,162,39,0.15)] hover:shadow-[0_0_48px_rgba(201,162,39,0.25)]",
};

const iconBgStyles: Record<Node["state"], string> = {
  neutral: "bg-white/5 text-[#99907b]",
  leak: "bg-red-500/10 text-red-400",
  recovery: "bg-[#C9A227]/15 text-[#C9A227]",
};

const labelStyles: Record<Node["state"], string> = {
  neutral: "text-[#d1e5fb]",
  leak: "text-red-400",
  recovery: "text-[#C9A227]",
};

const sublabelStyles: Record<Node["state"], string> = {
  neutral: "text-[#99907b]",
  leak: "text-red-400/60",
  recovery: "text-[#C9A227]/70",
};

function Arrow({ isLeak }: { isLeak: boolean }) {
  return (
    <div className="hidden md:flex items-center justify-center shrink-0 w-6">
      <span
        className={`material-symbols-outlined text-base ${
          isLeak ? "text-red-500/50" : "text-white/20"
        }`}
      >
        arrow_forward
      </span>
    </div>
  );
}

function AnimatedLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="hidden md:block absolute inset-x-0 top-[52px] h-px z-0 pointer-events-none">
      {/* Solid neutral line */}
      <div className="absolute inset-y-0 overflow-hidden" style={{ left: "4.16%", width: "58.33%" }}>
        {prefersReducedMotion ? (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.12) 100%)" }}
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.12) 100%)" }}
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          />
        )}
      </div>
      {/* Dashed red leak line */}
      <div className="absolute inset-y-0 overflow-hidden" style={{ left: "62.5%", width: "12.5%" }}>
        {prefersReducedMotion ? (
          <div
            className="absolute inset-y-0 w-full"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, rgba(239,68,68,0.5) 0px, rgba(239,68,68,0.5) 6px, transparent 6px, transparent 12px)",
            }}
          />
        ) : (
          <motion.div
            className="absolute inset-y-0 w-full"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, rgba(239,68,68,0.5) 0px, rgba(239,68,68,0.5) 6px, transparent 6px, transparent 12px)",
            }}
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 1.1, ease: "easeInOut" }}
          />
        )}
      </div>
      {/* Gold recovery line */}
      <div className="absolute inset-y-0 overflow-hidden" style={{ left: "75%", width: "20.83%" }}>
        {prefersReducedMotion ? (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(201,162,39,0.3) 0%, rgba(201,162,39,0.6) 100%)" }}
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(201,162,39,0.3) 0%, rgba(201,162,39,0.6) 100%)" }}
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 1.4, ease: "easeInOut" }}
          />
        )}
      </div>
    </div>
  );
}

export default function CustomerJourneySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24 px-6 bg-[#0e2131]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {prefersReducedMotion ? (
          <div className="flex flex-col items-center text-center gap-5 mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[#99907b] mb-3">01 — HOW IT WORKS</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.04em] max-w-3xl">
              Where Most Local Businesses<br className="hidden sm:block" /> <em className="font-serif not-italic text-[#C9A227]">Lose</em> Customers
            </h2>
            <p className="text-lg sm:text-xl text-[#99907b] max-w-xl leading-relaxed">
              Every stage of the customer journey is a place revenue leaks out, or gets recovered.
            </p>
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center text-center gap-5 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#99907b] mb-3">01 — HOW IT WORKS</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.04em] max-w-3xl">
              Where Most Local Businesses<br className="hidden sm:block" /> <em className="font-serif not-italic text-[#C9A227]">Lose</em> Customers
            </h2>
            <p className="text-lg sm:text-xl text-[#99907b] max-w-xl leading-relaxed">
              Every stage of the customer journey is a place revenue leaks out, or gets recovered.
            </p>
          </motion.div>
        )}

        {/* Desktop: horizontal flow */}
        <div className="hidden md:block relative">
          <AnimatedLine />
          <div className="grid grid-cols-6 gap-3 relative z-10">
            {nodes.map((node, i) => {
              const nodeContent = (
                <>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBgStyles[node.state]}`}>
                    <span className="material-symbols-outlined text-2xl leading-none">
                      {node.icon}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="flex flex-col gap-1">
                    <span className={`text-sm font-bold leading-tight ${labelStyles[node.state]}`}>
                      {node.label}
                    </span>
                    <span className={`text-xs leading-snug ${sublabelStyles[node.state]}`}>
                      {node.sublabel}
                    </span>
                  </div>

                  {/* Tags */}
                  {node.tags.length > 0 && (
                    <div className="flex flex-col gap-1.5 w-full mt-auto pt-2 border-t border-white/5">
                      {node.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className={`text-xs px-2 py-1 rounded-lg border text-center ${
                            tag.gold
                              ? "border-[#C9A227]/50 text-[#C9A227] bg-[#C9A227]/5"
                              : "border-white/10 text-[#99907b] bg-white/5"
                          }`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Recovery badge */}
                  {node.state === "recovery" && (
                    <div className="mt-auto pt-2 border-t border-[#C9A227]/20 w-full flex justify-center">
                      <span className="text-xs text-[#C9A227]/80 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm leading-none">
                          trending_up
                        </span>
                        Revenue recovered
                      </span>
                    </div>
                  )}

                  {/* Leak badge */}
                  {node.state === "leak" && (
                    <div className="mt-auto pt-2 border-t border-red-500/20 w-full flex justify-center">
                      <span className="text-xs text-red-400/70 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm leading-none">
                          warning
                        </span>
                        Most stop here
                      </span>
                    </div>
                  )}
                </>
              );

              return prefersReducedMotion ? (
                <div
                  key={node.label}
                  className={`rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-all duration-300 ${cardStyles[node.state]}`}
                >
                  {nodeContent}
                </div>
              ) : (
                <motion.div
                  key={node.label}
                  className={`rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-all duration-300 ${cardStyles[node.state]}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                >
                  {nodeContent}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col gap-0">
          {nodes.map((node, i) => {
            const mobileContent = (
              <>
                <span className={`text-sm font-bold ${labelStyles[node.state]}`}>{node.label}</span>
                <p className={`text-xs mt-0.5 mb-2 ${sublabelStyles[node.state]}`}>{node.sublabel}</p>
                {node.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {node.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`text-xs px-2.5 py-1 rounded-lg border ${
                          tag.gold
                            ? "border-[#C9A227]/50 text-[#C9A227] bg-[#C9A227]/5"
                            : "border-white/10 text-[#99907b] bg-white/5"
                        }`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}
              </>
            );

            return (
              <div key={node.label} className="flex items-stretch gap-4">
                {/* Left: connector column */}
                <div className="flex flex-col items-center shrink-0 w-10">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBgStyles[node.state]} border ${
                    node.state === "leak" ? "border-red-500/30" :
                    node.state === "recovery" ? "border-[#C9A227]/40" :
                    "border-white/10"
                  }`}>
                    <span className="material-symbols-outlined text-lg leading-none">{node.icon}</span>
                  </div>
                  {i < nodes.length - 1 && (
                    <div className={`w-px flex-1 my-1 min-h-[2rem] ${
                      i === 3 ? "bg-red-500/30" :
                      i === 4 ? "bg-[#C9A227]/40" :
                      "bg-white/10"
                    }`} />
                  )}
                </div>

                {/* Right: content */}
                {prefersReducedMotion ? (
                  <div className="flex-1 pb-6">{mobileContent}</div>
                ) : (
                  <motion.div
                    className="flex-1 pb-6"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    {mobileContent}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
