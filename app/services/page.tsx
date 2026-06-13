"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
            The Work We Do
          </h1>
          <p className="text-lg sm:text-xl text-[#99907b] leading-relaxed">
            Six services. All scoped. All built to produce results you can
            measure. Every engagement starts with a free audit call.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#b8911f] text-[#021524] font-bold text-base px-7 py-3.5 rounded-full transition-colors shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_28px_rgba(201,162,39,0.5)]"
          >
            Book a Free Audit Call
          </Link>
        </div>
      </section>

      {/* Sticky section nav */}
      <StickyServiceNav activeId={activeId} />

      {/* Service section placeholders — content added in US-023 and US-024 */}
      {SERVICE_SECTIONS.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="py-32 bg-[#021524] border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[#99907b] text-sm">
              {s.label} — content coming in next iteration
            </p>
          </div>
        </section>
      ))}
    </main>
  );
}
