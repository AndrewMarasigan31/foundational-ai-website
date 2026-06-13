import ContactForm from "@/components/ContactForm";

const coverItems = [
  {
    icon: "search",
    text: "Your GBP and local search gaps",
  },
  {
    icon: "star",
    text: "AI search visibility (ChatGPT, Perplexity, Google AI Overviews)",
  },
  {
    icon: "group",
    text: "Your existing lead list and follow-up gaps",
  },
  {
    icon: "lightbulb",
    text: "A clear recommended starting point, no obligation",
  },
];

const trustSignals = [
  "No long-term contract required",
  "Results start showing in weeks",
  "Direct access to the people doing the work",
];

export default function ContactPage() {
  return (
    <main>
      <section
        className="relative overflow-hidden bg-[#021524] pt-24 md:pt-32 pb-16 md:pb-24 px-6"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,162,39,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Headline centred above the grid */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
              Book Your Free{" "}
              <em className="font-serif not-italic text-[#C9A227]">Audit</em>{" "}
              Call.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#99907b] leading-relaxed">
              No pitch. No pressure. 30 minutes to map exactly where revenue is
              leaking.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left — Info panel (below form on mobile) */}
            <div className="flex flex-col gap-8 order-last md:order-first">
              <h2 className="font-display font-bold text-xl text-[#d1e5fb]">
                What We Cover on the Call
              </h2>

              <ul className="flex flex-col gap-5">
                {coverItems.map((item) => (
                  <li key={item.icon} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#C9A227] text-xl leading-none shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <span className="text-[#d1e5fb] leading-relaxed">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
                {trustSignals.map((signal) => (
                  <div key={signal} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#C9A227] text-xl leading-none shrink-0">
                      check_circle
                    </span>
                    <span className="text-[#99907b] text-sm leading-relaxed">
                      {signal}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form (first on mobile) */}
            <div id="contact-form-slot" className="order-first md:order-last">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
