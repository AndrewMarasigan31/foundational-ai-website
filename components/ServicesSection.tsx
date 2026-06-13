"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

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
      "We report on ranking movement, profile views, and call volume every month. If something isn't working, we adjust. You don't wait on a quarterly review to find out what happened.",
    checklist: null,
    mockPanel: <RankTrackingAnimation />,
    colSpan: "md:col-span-8",
  },
  {
    id: "ai-search",
    icon: "travel_explore",
    title: "AI Search Visibility",
    description:
      "ChatGPT, Perplexity, and Google AI Overviews are now where customers start. We optimize your business information, content, and authority so you show up in AI-generated answers, not just the traditional search results.",
    checklist: null,
    mockPanel: <AISearchAnimation />,
    colSpan: "md:col-span-6",
  },
  {
    id: "reactivation",
    icon: "mark_chat_unread",
    title: "Lead Reactivation Sprint",
    description:
      "Most businesses already have revenue sitting in old contacts and cold leads. We build a 90-day SMS and email follow-up sequence, set up your CRM workflow, and turn a neglected list back into booked appointments. Live in 5 to 7 business days.",
    checklist: null,
    mockPanel: <LeadReactivationAnimation />,
    colSpan: "md:col-span-6",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
            Get Found. Convert. <em className="font-serif not-italic text-[#C9A227]">Recover</em> What You Left on the Table.
          </h2>
          <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed max-w-2xl">
            From Google rankings and AI search visibility to recovering cold leads.
            every service is scoped clearly, executed lean, and built to produce results you can measure.
          </p>
        </div>

        {/* Bento grid */}
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
      </div>
    </section>
  );
}
