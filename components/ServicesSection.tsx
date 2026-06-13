"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

// ── GBP card: star rating 3.2 → 4.9 ──
function GBPStarAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(3.2);
  const [display, setDisplay] = useState("3.2");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, 4.9, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(1)),
    });
    return () => controls.stop();
  }, [isInView, motionValue]);

  return (
    <div ref={ref} className="mt-6 rounded-xl bg-[#021524] border border-white/10 p-4">
      <div className="text-xs text-[#99907b] mb-2">Average star rating</div>
      <div className="flex items-center gap-3">
        <span className="text-4xl font-extrabold text-[#C9A227]">{display}</span>
        <div className="text-[#C9A227] text-2xl leading-none">★★★★★</div>
      </div>
      <div className="mt-2 text-xs text-[#99907b]">Before: 3.2 ★ → After: 4.9 ★</div>
    </div>
  );
}

// ── Content card: typewriter blog post title ──
function BlogTypingAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const fullText = "5 Reasons Chicago Restaurants Need Local SEO";
  const [displayed, setDisplayed] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="mt-4 rounded-xl bg-[#021524] border border-white/10 p-4 text-sm">
      <span className="bg-[#C9A227]/20 text-[#C9A227] text-xs px-2 py-0.5 rounded-full font-medium">
        Blog Post · Local SEO
      </span>
      <p className="mt-3 text-[#d1e5fb]/90 font-medium leading-snug min-h-[2.5rem]">
        {displayed}
        <span className="animate-pulse text-[#C9A227]">|</span>
      </p>
    </div>
  );
}

// ── Website card: Lighthouse score 54 → 98 with color transition ──
function LighthouseAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [score, setScore] = useState(54);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const start = 54;
    const target = 98;
    const duration = 1500;
    const startTime = performance.now();
    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setScore(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [isInView]);

  const color =
    score < 70 ? "#ef4444" : score < 90 ? "#f59e0b" : "#22c55e";

  return (
    <div ref={ref} className="mt-4 rounded-xl bg-[#021524] border border-white/10 p-4">
      <div className="text-xs text-[#99907b] mb-2">Lighthouse Performance</div>
      <div className="flex items-center gap-3">
        <span
          className="text-4xl font-extrabold transition-colors duration-300"
          style={{ color }}
        >
          {score}
        </span>
        <span className="text-xs text-[#99907b]">/ 100</span>
      </div>
    </div>
  );
}

// ── Tracking card: rank #12 → #3 with gold highlight ──
function RankTrackingAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [rank, setRank] = useState(12);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    let current = 12;
    const target = 3;
    const interval = setInterval(() => {
      current--;
      setRank(current);
      if (current <= target) {
        setDone(true);
        clearInterval(interval);
      }
    }, 180);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="mt-4 rounded-xl bg-[#021524] border border-white/10 p-4">
      <div className="text-xs text-[#99907b] mb-2">Local Pack Position</div>
      <div className="flex items-center gap-3">
        <span
          className={`text-4xl font-extrabold transition-colors duration-500 ${
            done ? "text-[#C9A227]" : "text-[#d1e5fb]"
          }`}
        >
          #{rank}
        </span>
        {done && (
          <span className="text-sm font-semibold text-[#C9A227]">Top 3 ✓</span>
        )}
      </div>
    </div>
  );
}

const services = [
  {
    id: "gbp",
    icon: "manage_search",
    title: "GBP Audit & Optimization",
    description:
      "Your Google Business Profile is the first thing customers see, and most profiles have fixable problems dragging rankings down. We audit yours, fix the gaps, and set you up to compete in local search.",
    checklist: [
      "Fixes that move your ranking in weeks, not months",
      "Profile built to attract calls, not just views",
    ],
    mockPanel: <GBPStarAnimation />,
    colSpan: "md:col-span-8",
  },
  {
    id: "content",
    icon: "article",
    title: "Local SEO Content",
    description:
      "Monthly blog posts, GBP updates, and location-targeted content written to rank in your city. Hands-off and consistent. Cancel any month with no penalties.",
    checklist: null,
    mockPanel: <BlogTypingAnimation />,
    colSpan: "md:col-span-4",
  },
  {
    id: "website",
    icon: "web",
    title: "Website Built to Convert",
    description:
      "A clean, fast, conversion-focused website, fully built. You review it once, you approve it, it launches. No revision loops, no monthly retainer, no hostage hosting.",
    checklist: null,
    mockPanel: <LighthouseAnimation />,
    colSpan: "md:col-span-4",
  },
  {
    id: "tracking",
    icon: "monitoring",
    title: "Performance Tracking",
    description:
      "We report on ranking movement, profile views, and call volume every month. If something isn't working, we adjust — you don't wait on a quarterly review to find out what happened.",
    checklist: null,
    mockPanel: <RankTrackingAnimation />,
    colSpan: "md:col-span-8",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col items-center text-center gap-6 mb-14">
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-sm font-semibold px-4 py-1.5 rounded-full">
              What We Do
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
              The Work That Gets Local Businesses Found
            </h2>
            <p className="text-lg text-[#99907b] leading-relaxed max-w-2xl">
              Most clients start with a call. We review your current Google presence together,
              identify what&apos;s costing you rankings, and figure out the right first step.
            </p>
          </div>
        </AnimatedSection>

        {/* Bento grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`${service.colSpan} group rounded-2xl bg-[#0e2131] border border-white/10 p-6 flex flex-col transition-all duration-300 hover:border-[#C9A227]/60 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#C9A227]/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#C9A227] text-xl">
                    {service.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#d1e5fb] mb-2">{service.title}</h3>

                {/* Description */}
                <p className="text-[#99907b] text-sm leading-relaxed">{service.description}</p>

                {/* Optional checklist */}
                {service.checklist && (
                  <ul className="mt-4 space-y-2">
                    {service.checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#d1e5fb]/80">
                        <span className="material-symbols-outlined text-[#C9A227] text-base mt-0.5 shrink-0">
                          check
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Animation panel */}
                {service.mockPanel}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
