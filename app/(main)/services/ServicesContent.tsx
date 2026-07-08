"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CTABand from "@/components/CTABand";
import {
  LeadReactivationAnimation,
  LighthouseAnimation,
  RankTrackingAnimation,
} from "@/components/ServicesSection";

const SERVICE_SECTIONS = [
  { id: "website", label: "Website" },
  { id: "lead-reactivation", label: "Lead Reactivation" },
  { id: "performance-tracking", label: "Tracking" },
  { id: "get-found", label: "Get Found" },
];

const GET_FOUND_PARTS = [
  {
    icon: "manage_search",
    title: "Google Business Profile",
    desc: "The profile that decides whether you show up in the local map pack. We audit it, fix every gap, and set it up to attract calls.",
  },
  {
    icon: "article",
    title: "Local SEO Content",
    desc: "Monthly content written to rank in your city, feeding a steady stream of local traffic into your funnel. We handle it end to end.",
  },
  {
    icon: "travel_explore",
    title: "AI Search Visibility",
    desc: "Show up in ChatGPT, Perplexity, and Google AI Overviews, where more and more customers now start their search.",
  },
];

function StickyServiceNav({ activeId }: { activeId: string }) {
  return (
    <nav className="sticky top-[64px] z-40 backdrop-blur-md bg-[#021524]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex gap-1 overflow-x-auto scrollbar-none">
          {SERVICE_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`inline-block whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeId === s.id
                    ? "border-[#C9A227] text-[#C9A227]"
                    : "border-transparent text-[#99907b] hover:text-[#d1e5fb]"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function BookCTA() {
  return (
    <Link
      href="/contact"
      className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#b8911f] text-[#021524] font-bold text-base px-7 py-3.5 rounded-full transition-colors shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_28px_rgba(201,162,39,0.5)]"
    >
      Book a Free Audit Call
    </Link>
  );
}

interface ServiceSectionProps {
  id: string;
  bg: string;
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
  visual: React.ReactNode;
  reverse?: boolean;
  groupLabel?: string;
  groupTitle?: string;
}

function ServiceSectionBlock({
  id,
  bg,
  icon,
  title,
  description,
  deliverables,
  visual,
  reverse = false,
  groupLabel,
  groupTitle,
}: ServiceSectionProps) {
  return (
    <section id={id} className={`py-24 md:py-32 ${bg} border-t border-white/5`}>
      <div className="max-w-7xl mx-auto px-6">
        {groupLabel && (
          <div className="text-center mb-16 md:mb-20">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C9A227] mb-3">{groupLabel}</p>
            <p className="text-xl sm:text-2xl font-display font-light text-[#d1e5fb] tracking-[-0.02em] leading-snug">
              {groupTitle}
            </p>
          </div>
        )}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
            {/* Copy block */}
            <div className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-[#C9A227]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#C9A227] text-2xl">
                  {icon}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.04em]">
                {title}
              </h2>
              <p className="text-[#99907b] text-lg leading-relaxed">{description}</p>
              <ul className="space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#d1e5fb]/80">
                    <span className="material-symbols-outlined text-[#C9A227] text-base mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <BookCTA />
              </div>
            </div>

            {/* Visual panel */}
            <div className={`${reverse ? "order-last md:order-none" : ""}`}>
              {visual}
            </div>
          </div>
        </div>
    </section>
  );
}

export default function ServicesPage() {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = SERVICE_SECTIONS.map((s) =>
      document.getElementById(s.id)
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-[#021524] py-24 md:py-32">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,162,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.05em]">
            Turn Clicks Into Booked Calls
          </h1>
          <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed">
            You&apos;re already paying for clicks. The system below turns them into
            booked calls. Every engagement starts with a free audit call.
          </p>
          <BookCTA />
        </div>
      </section>

      {/* Sticky section nav */}
      <StickyServiceNav activeId={activeId} />

      {/* Service 1: Website Built to Convert — copy left / visual right */}
      <ServiceSectionBlock
        id="website"
        bg="bg-[#021524]"
        groupLabel="First, fix the leak"
        groupTitle="Turn the clicks you already have into booked calls."
        icon="web"
        title="Website Built to Convert"
        description="This is the engine. The clicks you pay for bounce when the site doesn't convert. You get a clean, fast site that turns local visitors into calls. One review, one approval, one launch. No retainer, no hostage hosting."
        deliverables={[
          "Clean, fast site built to convert local visitors into calls",
          "One review, one approval, one launch. No drawn-out cycles.",
          "No monthly retainer required after launch",
          "Hosted wherever you want. No lock-in.",
        ]}
        visual={
          <div className="rounded-2xl bg-[#0e2131] border border-white/10 p-6">
            <div className="text-xs text-[#99907b] mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#C9A227]">web</span>
              Performance score
            </div>
            <LighthouseAnimation />
            <div className="mt-4 space-y-2">
              {[
                "Fully responsive across all devices",
                "Built for speed and Core Web Vitals",
                "Conversion-optimized layout and copy",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-[#d1e5fb]/70">
                  <span className="material-symbols-outlined text-[#C9A227] text-xs">check</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
        reverse={false}
      />

      {/* Service 2: Lead Reactivation Sprint — visual left / copy right */}
      <ServiceSectionBlock
        id="lead-reactivation"
        bg="bg-[#000f1d]"
        icon="mark_chat_unread"
        title="Lead Reactivation Sprint"
        description="The fastest money is the leads you already have. You get a 90-day SMS and email sequence and a CRM workflow that runs it automatically, turning a cold list back into booked appointments. Live in 5 to 7 days."
        deliverables={[
          "90-day SMS and email sequence written and loaded",
          "CRM workflow setup with automated follow-up triggers",
          "Contact list cleanup and segmentation",
          "Review and referral ask sequence included",
        ]}
        visual={
          <div className="rounded-2xl bg-[#0e2131] border border-white/10 p-6">
            <div className="text-xs text-[#99907b] mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#C9A227]">mark_chat_unread</span>
              Cold leads responding
            </div>
            <LeadReactivationAnimation />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: "Go-live", value: "5–7 days" },
                { label: "Sequence length", value: "90 days" },
                { label: "Channels", value: "SMS + Email" },
                { label: "Pricing", value: "No lock-in" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#021524] rounded-lg px-3 py-2 text-center">
                  <div className="text-[#C9A227] font-bold text-sm">{stat.value}</div>
                  <div className="text-[#99907b] text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        }
        reverse={true}
      />

      {/* Service 3: Performance Tracking — copy left / visual right */}
      <ServiceSectionBlock
        id="performance-tracking"
        bg="bg-[#021524]"
        icon="monitoring"
        title="Performance Tracking"
        description="You can't fix what you can't see. You get monthly reporting on calls, conversions, and rankings, so you know exactly which clicks became booked calls. If something stalls, we adjust, at no extra charge."
        deliverables={[
          "Monthly report on local rankings, profile views, and call volume",
          "Competitor position tracking included",
          "Adjustments made when results stall. No extra charge.",
          "Plain-English summary, not a wall of data",
        ]}
        visual={
          <div className="rounded-2xl bg-[#0e2131] border border-white/10 p-6">
            <div className="text-xs text-[#99907b] mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#C9A227]">monitoring</span>
              Local pack position
            </div>
            <RankTrackingAnimation />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: "Reporting", value: "Monthly" },
                { label: "Adjustments", value: "Included" },
                { label: "Tracked metrics", value: "3+" },
                { label: "Format", value: "Plain English" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#021524] rounded-lg px-3 py-2 text-center">
                  <div className="text-[#C9A227] font-bold text-sm">{stat.value}</div>
                  <div className="text-[#99907b] text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        }
        reverse={false}
      />

      {/* Get Found: the three ranking services, one offering */}
      <section id="get-found" className="py-24 md:py-32 bg-[#000f1d] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C9A227] mb-3">Then, get found</p>
            <h2 className="text-3xl sm:text-4xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.04em] mb-4">
              Get Found
            </h2>
            <p className="text-[#99907b] text-lg leading-relaxed">
              We get you found everywhere customers look, so more of the right clicks enter
              the system you just fixed. Three parts, one job.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GET_FOUND_PARTS.map((part) => (
              <div
                key={part.title}
                className="rounded-2xl bg-[#0e2131] border border-white/10 p-7 flex flex-col transition-all duration-300 hover:border-[#C9A227]/40 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-lg bg-[#C9A227]/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[#C9A227] text-2xl">{part.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-[#d1e5fb] mb-2">{part.title}</h3>
                <p className="text-[#99907b] text-sm leading-relaxed">{part.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <BookCTA />
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
