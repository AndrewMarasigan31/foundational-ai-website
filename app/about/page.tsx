import AnimatedSection from "@/components/AnimatedSection";
import CTABand from "@/components/CTABand";

const principles = [
  {
    num: "01",
    title: "Scoped before started",
    description:
      "Every engagement has a defined deliverable, not an open-ended retainer. You know exactly what you are paying for before work begins.",
  },
  {
    num: "02",
    title: "You stay in control",
    description:
      "Nothing goes live without your review and approval. Every draft, every update, every change — you see it before your customers do.",
  },
  {
    num: "03",
    title: "Straight reporting",
    description:
      "We tell you what moved, what didn't, and what we'd change. No vanity metrics. No padded dashboards. Just the numbers that matter.",
  },
];

const dontDos = [
  "No long-term lock-in contracts.",
  "No offshore execution teams.",
  "No AI content published without human review.",
  "No scope that exists just to justify a monthly fee.",
];

export default function AboutPage() {
  return (
    <main>
      {/* Section 1 — Founder statement hero */}
      <section
        className="relative overflow-hidden bg-[#021524] py-28 md:py-36 px-6"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
              We built this because local businesses keep losing to bigger
              competitors who simply show up better online.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 2 — Story */}
      <section className="bg-[#000f1d] py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col gap-6 text-lg text-[#99907b] leading-relaxed">
              <p>
                Most local SEO agencies sell bloated retainers and generic advice.
                We scope clearly, execute lean, and report on what actually moved.
              </p>
              <p>
                We use AI tools to move faster on research and content, but every
                output is reviewed and approved by a human before it touches your
                business.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 3 — Principles */}
      <section className="bg-[#021524] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#d1e5fb] text-center mb-14 tracking-tight">
              How We Work
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((p) => (
                <div
                  key={p.num}
                  className="relative overflow-hidden bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col gap-4"
                >
                  <span className="absolute top-4 right-6 text-8xl font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                    {p.num}
                  </span>
                  <h3 className="text-xl font-bold text-[#d1e5fb] relative z-10">
                    {p.title}
                  </h3>
                  <p className="text-[#99907b] leading-relaxed relative z-10">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 4 — What we don't do */}
      <section className="bg-[#000f1d] py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#d1e5fb] mb-10 tracking-tight">
              What We Don&apos;t Do
            </h2>
            <ul className="flex flex-col gap-4">
              {dontDos.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-red-400/80 material-symbols-outlined text-xl leading-none shrink-0">
                    close
                  </span>
                  <span className="text-lg text-[#99907b] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <CTABand />
    </main>
  );
}
