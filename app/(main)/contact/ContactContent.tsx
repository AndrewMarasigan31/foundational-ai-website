"use client";

import { motion, useReducedMotion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import AnimatedSection from "@/components/AnimatedSection";

const ease = [0.16, 1, 0.3, 1] as const;

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
  const prefersReducedMotion = useReducedMotion();

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
            {prefersReducedMotion ? (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
                  Book Your Free{" "}
                  <em className="font-serif not-italic text-[#C9A227]">Audit</em>{" "}
                  Call.
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-[#99907b] leading-relaxed">
                  No pitch. No pressure. 30 minutes to map exactly where revenue is
                  leaking.
                </p>
              </>
            ) : (
              <>
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  Book Your Free{" "}
                  <em className="font-serif not-italic text-[#C9A227]">Audit</em>{" "}
                  Call.
                </motion.h1>
                <motion.p
                  className="mt-6 text-lg sm:text-xl text-[#99907b] leading-relaxed"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.1 }}
                >
                  No pitch. No pressure. 30 minutes to map exactly where revenue is
                  leaking.
                </motion.p>
              </>
            )}
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left — Info panel (below form on mobile) */}
            <div className="flex flex-col gap-8 order-last md:order-first">
              <h2 className="font-display font-bold text-xl text-[#d1e5fb]">
                What We Cover on the Call
              </h2>

              <ul className="flex flex-col gap-5">
                {coverItems.map((item, i) =>
                  prefersReducedMotion ? (
                    <li key={item.icon} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#C9A227] text-xl leading-none shrink-0 mt-0.5">
                        {item.icon}
                      </span>
                      <span className="text-[#d1e5fb] leading-relaxed">
                        {item.text}
                      </span>
                    </li>
                  ) : (
                    <motion.li
                      key={item.icon}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                    >
                      <span className="material-symbols-outlined text-[#C9A227] text-xl leading-none shrink-0 mt-0.5">
                        {item.icon}
                      </span>
                      <span className="text-[#d1e5fb] leading-relaxed">
                        {item.text}
                      </span>
                    </motion.li>
                  )
                )}
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

              <div className="border-t border-white/10 pt-6">
                <p className="text-[#99907b] text-sm mb-3">Prefer to email directly?</p>
                <a
                  href="mailto:info@foundationalaisystem.com"
                  className="inline-flex items-center gap-2 text-[#C9A227] hover:text-[#d1e5fb] text-sm font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-base leading-none">mail</span>
                  info@foundationalaisystem.com
                </a>
              </div>
            </div>

            {/* Right — Form (first on mobile) */}
            <AnimatedSection direction="up" delay={0.15} className="order-first md:order-last">
              <div id="contact-form-slot">
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
