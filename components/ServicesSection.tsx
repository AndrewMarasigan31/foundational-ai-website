import AnimatedSection from "./AnimatedSection";

function MockGBPPanel() {
  return (
    <div className="mt-6 rounded-xl bg-[#021524] border border-white/10 p-4 text-sm">
      <div className="flex items-center gap-2 mb-3 text-[#C9A227] font-semibold">
        <span className="material-symbols-outlined text-base">location_on</span>
        Google Business Profile
      </div>
      <div className="space-y-2">
        {["Complete business info", "100+ 5-star reviews", "#1 in local pack"].map((item) => (
          <div key={item} className="flex items-center gap-2 text-[#d1e5fb]/80">
            <span className="material-symbols-outlined text-sm text-[#C9A227]">check_circle</span>
            {item}
          </div>
        ))}
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
    mockPanel: <MockGBPPanel />,
    colSpan: "md:col-span-8",
  },
  {
    id: "content",
    icon: "article",
    title: "Local SEO Content",
    description:
      "Monthly blog posts, GBP updates, and location-targeted content written to rank in your city. Hands-off and consistent. Cancel any month with no penalties.",
    checklist: null,
    mockPanel: null,
    colSpan: "md:col-span-4",
  },
  {
    id: "website",
    icon: "web",
    title: "Website Built to Convert",
    description:
      "A clean, fast, conversion-focused website, fully built. You review it once, you approve it, it launches. No revision loops, no monthly retainer, no hostage hosting.",
    checklist: null,
    mockPanel: null,
    colSpan: "md:col-span-4",
  },
  {
    id: "tracking",
    icon: "monitoring",
    title: "Performance Tracking",
    description:
      "We report on ranking movement, profile views, and call volume every month. If something isn't working, we adjust — you don't wait on a quarterly review to find out what happened.",
    checklist: null,
    mockPanel: null,
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
              identify what's costing you rankings, and figure out the right first step.
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

                {/* Optional mock UI panel */}
                {service.mockPanel}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
