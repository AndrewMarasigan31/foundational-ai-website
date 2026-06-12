import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    num: "01",
    title: "Free Audit Call",
    description:
      "30 minutes. We look at your GBP, your search visibility, and your current site. You walk away with a clear picture of what's costing you rankings, whether you hire us or not.",
  },
  {
    num: "02",
    title: "We Build the Plan",
    description:
      "Based on the audit, we recommend the right starting point: usually the GBP optimization, sometimes content, sometimes both. No upsells and no unnecessary scope.",
  },
  {
    num: "03",
    title: "You Approve, We Execute",
    description:
      "Every deliverable goes through your review before it goes live. You're not handing us the keys; you stay in control of your brand and your messaging.",
  },
  {
    num: "04",
    title: "Track Results, Iterate",
    description:
      "We report on ranking movement, profile views, and call volume. If something isn't working, we adjust. No waiting on a quarterly review to find out what happened.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col items-center text-center gap-6 mb-16">
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-sm font-semibold px-4 py-1.5 rounded-full">
              Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
              Simple Enough to Explain in Four Steps
            </h2>
            <p className="text-lg text-[#99907b] leading-relaxed max-w-2xl">
              No onboarding maze. No kick-off call theater. Here&apos;s exactly what happens when
              you reach out.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <AnimatedSection delay={0.1}>
          <div className="relative">
            {/* Horizontal connecting line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/10 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={step.num}
                  className="group flex flex-col items-center text-center gap-4"
                >
                  {/* Circle */}
                  <div
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold
                      border-2 transition-all duration-300
                      ${
                        index === 0
                          ? "bg-[#C9A227] border-[#C9A227] text-[#021524] shadow-[0_0_24px_rgba(201,162,39,0.45)]"
                          : "bg-[#0e2131] border-white/20 text-[#99907b] group-hover:border-[#C9A227] group-hover:text-[#C9A227]"
                      }
                    `}
                  >
                    {step.num}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#d1e5fb]">{step.title}</h3>

                  {/* Description */}
                  <p className="text-[#99907b] text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
