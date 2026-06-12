import AnimatedSection from "./AnimatedSection";

const reasons = [
  {
    num: "01",
    title: "AI-Assisted, Human-Reviewed",
    description:
      "We use AI tools to move faster — research, drafts, audits. But every output is reviewed, edited, and approved by a human before it touches your business. Speed without slop.",
  },
  {
    num: "02",
    title: "Playbooks That Work in Local Search",
    description:
      "We are not adapting generic SEO advice for local. Local search has its own signals, its own ranking factors, and its own failure modes. We have worked through them.",
  },
  {
    num: "03",
    title: "No Bloated Layers",
    description:
      "No account manager, no junior execution team, no offshore handoff. You work directly with the people doing the work. That means clearer communication and faster decisions.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col items-center text-center gap-6 mb-16">
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-sm font-semibold px-4 py-1.5 rounded-full">
              Why Foundational AI Systems
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
              Built Lean. Scoped Clearly.
            </h2>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason) => (
              <div
                key={reason.num}
                className="relative overflow-hidden bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col gap-4"
              >
                {/* Faded number */}
                <span className="absolute top-4 right-6 text-8xl font-extrabold text-[#C9A227]/[0.35] leading-none select-none pointer-events-none">
                  {reason.num}
                </span>

                <h3 className="text-xl font-bold text-[#d1e5fb] relative z-10">{reason.title}</h3>
                <p className="text-[#99907b] leading-relaxed relative z-10">{reason.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
