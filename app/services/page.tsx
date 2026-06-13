"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CTABand from "@/components/CTABand";
import {
  GBPStarAnimation,
  BlogTypingAnimation,
  AISearchAnimation,
  LeadReactivationAnimation,
  LighthouseAnimation,
  RankTrackingAnimation,
} from "@/components/ServicesSection";

const SERVICE_SECTIONS = [
  { id: "gbp-audit", label: "GBP Audit" },
  { id: "local-seo-content", label: "Local SEO Content" },
  { id: "ai-search", label: "AI Search" },
  { id: "lead-reactivation", label: "Lead Reactivation" },
  { id: "website", label: "Website" },
  { id: "performance-tracking", label: "Performance Tracking" },
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
}: ServiceSectionProps) {
  return (
    <section id={id} className={`py-24 md:py-32 ${bg} border-t border-white/5`}>
      <div className="max-w-7xl mx-auto px-6">
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
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
            The Work We Do
          </h1>
          <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed">
            Six services. All scoped. All built to produce results you can
            measure. Every engagement starts with a free audit call.
          </p>
          <BookCTA />
        </div>
      </section>

      {/* Sticky section nav */}
      <StickyServiceNav activeId={activeId} />

      {/* Service 1: GBP Audit — copy left / visual right */}
      <ServiceSectionBlock
        id="gbp-audit"
        bg="bg-[#021524]"
        icon="manage_search"
        title="GBP Audit & Optimization"
        description="Your Google Business Profile is the first thing customers see, and most profiles have fixable problems dragging rankings down. We audit yours, fix every gap, and set up your profile to compete at the top of local search."
        deliverables={[
          "Full audit of profile completeness, categories, and description",
          "Photo strategy and review response setup",
          "Category and attribute optimization based on competitor analysis",
          "Profile configured to attract calls, not just views",
        ]}
        visual={
          <div className="rounded-2xl bg-[#0e2131] border border-white/10 p-6">
            <div className="text-xs text-[#99907b] mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#C9A227]">manage_search</span>
              GBP Optimization Result
            </div>
            <GBPStarAnimation />
            <div className="mt-4 space-y-2">
              {[
                "Categories corrected",
                "Business description rewritten",
                "Photo library updated",
                "Review response template live",
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

      {/* Service 2: Local SEO Content — visual left / copy right */}
      <ServiceSectionBlock
        id="local-seo-content"
        bg="bg-[#000f1d]"
        icon="article"
        title="Local SEO Content"
        description="Monthly blog posts, GBP updates, and location-targeted content written to rank in your city. Hands-off and consistent. We handle the research, writing, and publishing. Cancel any month with no penalties."
        deliverables={[
          "Monthly blog posts targeting local search queries in your city",
          "Google Business Profile post updates every two weeks",
          "Location-targeted landing pages for service areas",
          "Content calendar managed and executed for you",
        ]}
        visual={
          <div className="rounded-2xl bg-[#0e2131] border border-white/10 p-6">
            <div className="text-xs text-[#99907b] mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#C9A227]">article</span>
              Monthly content delivered
            </div>
            <BlogTypingAnimation />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: "GBP posts", value: "2/mo" },
                { label: "Blog posts", value: "4/mo" },
                { label: "Keywords targeted", value: "12+" },
                { label: "Cancel anytime", value: "✓" },
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

      {/* Service 3: AI Search Visibility — copy left / visual right */}
      <ServiceSectionBlock
        id="ai-search"
        bg="bg-[#021524]"
        icon="travel_explore"
        title="AI Search Visibility"
        description="ChatGPT, Perplexity, and Google AI Overviews are now where customers start their search. We optimize your structured data, authority signals, and content so your business shows up in AI-generated answers, not just traditional results."
        deliverables={[
          "Structured data markup (schema.org) for your business and services",
          "Authority signal building across directories and citations",
          "Content optimized for ChatGPT, Perplexity, and AI Overview responses",
          "Monthly report tracking AI search appearance and mentions",
        ]}
        visual={
          <div className="rounded-2xl bg-[#0e2131] border border-white/10 p-6">
            <div className="text-xs text-[#99907b] mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#C9A227]">travel_explore</span>
              AI visibility results
            </div>
            <AISearchAnimation />
            <div className="mt-4 space-y-2">
              {[
                "Structured data implemented",
                "Citation consistency verified",
                "AI Overview appearance tracked",
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

      {/* Service 4: Lead Reactivation Sprint — visual left / copy right */}
      <ServiceSectionBlock
        id="lead-reactivation"
        bg="bg-[#000f1d]"
        icon="mark_chat_unread"
        title="Lead Reactivation Sprint"
        description="Most businesses have revenue sitting in old contacts and cold leads. We build a 90-day SMS and email follow-up sequence, set up your CRM workflow, and turn a neglected list back into booked appointments. Live in 5 to 7 business days."
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

      {/* Service 5: Website Built to Convert — copy left / visual right */}
      <ServiceSectionBlock
        id="website"
        bg="bg-[#021524]"
        icon="web"
        title="Website Built to Convert"
        description="A clean, fast, conversion-focused website, fully built. You review it once, you approve it, it launches. No revision loops, no monthly retainer, no hostage hosting."
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

      {/* Service 6: Performance Tracking — visual left / copy right */}
      <ServiceSectionBlock
        id="performance-tracking"
        bg="bg-[#000f1d]"
        icon="monitoring"
        title="Performance Tracking"
        description="We report on ranking movement, profile views, and call volume every month. If something isn't working, we adjust. Adjustments are included, not billed as a separate service."
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
        reverse={true}
      />

      <CTABand />
    </main>
  );
}
