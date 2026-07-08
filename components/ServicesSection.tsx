"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";

// ── GBP card: star rating 3.2 → 4.9 ──
export function GBPStarAnimation() {
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
export function BlogTypingAnimation() {
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
export function LighthouseAnimation() {
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

// ── AI Search card: mock AI answer mentioning business ──
export function AISearchAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const fullText = "Foundational AI Systems is a top-rated local SEO agency serving small businesses across the US, known for fast GBP improvements and transparent reporting.";
  const [displayed, setDisplayed] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="mt-4 rounded-xl bg-[#021524] border border-white/10 p-4 text-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-sm text-[#99907b]">smart_toy</span>
        <span className="text-[#99907b] text-xs">AI Overview response</span>
      </div>
      <p className="text-[#d1e5fb]/80 leading-relaxed min-h-[4rem]">
        {displayed}
        {displayed.length < fullText.length && (
          <span className="animate-pulse text-[#C9A227]">|</span>
        )}
      </p>
    </div>
  );
}

// ── Lead Reactivation card: SMS replies appearing ──
export function LeadReactivationAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [visibleCount, setVisibleCount] = useState(0);
  const started = useRef(false);

  const messages = [
    { name: "Mike R.", text: "Hey, still interested in that quote.", delay: 0.4 },
    { name: "Sarah T.", text: "Yes! When can we schedule?", delay: 1.0 },
    { name: "James L.", text: "Just saw your message, call me back.", delay: 1.6 },
  ];

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    messages.forEach((_, i) => {
      setTimeout(() => setVisibleCount(i + 1), messages[i].delay * 1000);
    });
  }, [isInView]);

  return (
    <div ref={ref} className="mt-4 rounded-xl bg-[#021524] border border-white/10 p-4 space-y-2">
      <div className="text-xs text-[#99907b] mb-3 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-sm text-[#C9A227]">mark_chat_unread</span>
        Replies from cold leads
      </div>
      {messages.map((msg, i) => (
        <motion.div
          key={msg.name}
          className="flex items-start gap-2"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: visibleCount > i ? 1 : 0, x: visibleCount > i ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[#C9A227] text-xs font-bold">{msg.name[0]}</span>
          </div>
          <div className="bg-[#0e2131] rounded-lg px-3 py-1.5 flex-1">
            <p className="text-xs text-[#d1e5fb]/90 leading-snug">{msg.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Tracking card: rank #12 → #3 with gold highlight ──
export function RankTrackingAnimation() {
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

const PLUGS = [
  { icon: "web", label: "A site that converts", sub: "Clicks stop bouncing." },
  { icon: "mark_chat_unread", label: "Instant follow-up", sub: "Leads stop going cold." },
  { icon: "monitoring", label: "See the leak", sub: "Know what's working." },
];

export default function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay },
        };

  return (
    <section className="py-24 md:py-32 -mx-6 sm:-mx-12 lg:-mx-24 px-6 sm:px-12 lg:px-24 bg-[#021524]">
      <div className="max-w-5xl mx-auto">
        {/* Header: the problem, stated in one glance */}
        <div className="flex flex-col items-center text-center gap-5 mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.04em] max-w-3xl text-balance">
            Three leaks between click and <em className="font-serif not-italic text-[#C9A227]">call.</em>
          </h2>
          <p className="text-lg sm:text-xl text-[#b9c6d6] leading-relaxed max-w-xl text-balance">
            Fix these three, and the clicks you already pay for start booking calls.
          </p>
        </div>

        {/* Desktop pipe: Click -> 3 plugs -> Booked call */}
        <div className="hidden md:block relative">
          <div
            className="absolute top-8 left-[7%] right-[7%] h-[2px] bg-gradient-to-r from-white/10 via-[#C9A227]/40 to-[#C9A227]/70"
            aria-hidden
          />
          <div className="relative grid grid-cols-[auto_1fr_1fr_1fr_auto] items-start gap-6">
            {/* Click in */}
            <div className="flex flex-col items-center text-center w-20">
              <div className="h-16 flex items-center">
                <span className="material-symbols-outlined text-[#99907b] text-3xl">ads_click</span>
              </div>
              <span className="mt-4 text-xs uppercase tracking-[0.15em] text-[#99907b]">Click</span>
            </div>

            {/* The three plugs */}
            {PLUGS.map((p, i) => (
              <motion.div key={p.label} {...reveal(0.1 + i * 0.12)} className="flex flex-col items-center text-center">
                <div className="h-16 flex items-center">
                  <div className="size-16 rounded-2xl bg-[#0e2131] border border-[#C9A227]/30 flex items-center justify-center shadow-[0_0_30px_rgba(201,162,39,0.08)]">
                    <span className="material-symbols-outlined text-[#C9A227] text-2xl">{p.icon}</span>
                  </div>
                </div>
                <h3 className="mt-4 text-base font-bold text-[#d1e5fb]">{p.label}</h3>
                <p className="mt-1 text-sm text-[#99907b] max-w-[200px]">{p.sub}</p>
              </motion.div>
            ))}

            {/* Booked call out */}
            <div className="flex flex-col items-center text-center w-24">
              <div className="h-16 flex items-center">
                <div className="size-16 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#C9A227] text-3xl">call</span>
                </div>
              </div>
              <span className="mt-4 text-xs uppercase tracking-[0.15em] text-[#C9A227]">Booked call</span>
            </div>
          </div>
        </div>

        {/* Mobile pipe: vertical */}
        <div className="md:hidden flex flex-col max-w-sm mx-auto">
          <div className="flex items-center gap-4">
            <div className="size-12 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#99907b] text-2xl">ads_click</span>
            </div>
            <span className="text-xs uppercase tracking-[0.15em] text-[#99907b]">A visitor clicks</span>
          </div>
          <div className="ml-6 h-6 w-[2px] bg-gradient-to-b from-white/10 to-[#C9A227]/40" />

          {PLUGS.map((p, i) => (
            <div key={p.label}>
              <motion.div {...reveal(i * 0.1)} className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-[#0e2131] border border-[#C9A227]/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#C9A227] text-xl">{p.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#d1e5fb] leading-tight">{p.label}</h3>
                  <p className="text-xs text-[#99907b] leading-tight mt-0.5">{p.sub}</p>
                </div>
              </motion.div>
              <div className="ml-6 h-6 w-[2px] bg-[#C9A227]/40" />
            </div>
          ))}

          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/50 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#C9A227] text-2xl">call</span>
            </div>
            <span className="text-sm font-bold text-[#C9A227]">Booked call</span>
          </div>
        </div>

        {/* The second job: ranking */}
        <div className="mt-16 md:mt-24 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[#99907b] hover:text-[#C9A227] font-medium text-sm transition-colors group"
          >
            Need more clicks too? Once the leak&apos;s fixed, we get you found
            <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
