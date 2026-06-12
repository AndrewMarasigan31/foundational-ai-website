"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    q: "Do I have to sign a long-term contract?",
    a: "No long-term contract required to start. We use the call to recommend the right starting point and scope, then keep the engagement clear and straightforward from there.",
  },
  {
    q: "How fast will I see results?",
    a: "GBP fixes can show ranking movement in weeks. Content compounds over 60 to 90 days as pages index and authority builds. We’ll be straight with you if your category or market is unusually competitive.",
  },
  {
    q: "Is this just AI-generated content?",
    a: "AI-assisted, human-reviewed, locally specific. Every article gets a human pass for accuracy, voice, and local relevance before it goes near your site or profile. We don’t publish slop.",
  },
  {
    q: "I already have a website. Can you still help?",
    a: "Yes. The GBP audit and Local SEO Content work independently of your existing site. We don’t require you to use our website product to get results from the other two services.",
  },
  {
    q: "Do I need all three services?",
    a: "Most clients start with just the GBP audit because it’s the fastest lever for local rankings and the lowest-risk way to see how we work. From there, you decide what makes sense to add.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Service-area businesses in the US include trades, home services, professional services, healthcare, and similar categories where local search drives inbound calls. If you rely on Google to get found, we can help.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-[#0e2131] hover:bg-[#0e2131]/80 transition-colors"
      >
        <span className="text-[#d1e5fb] font-semibold leading-snug">{q}</span>
        <span
          className="shrink-0 material-symbols-outlined text-[#C9A227] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 pt-2 text-[#99907b] leading-relaxed bg-[#0e2131]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#021524]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col items-center text-center gap-6 mb-16">
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-sm font-semibold px-4 py-1.5 rounded-full">
              Common Questions
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
              Things Worth Asking Before You Hire Anyone
            </h2>
            <p className="text-[#99907b] text-lg max-w-2xl">
              Honest answers. If the truth makes us the wrong fit, better to know now.
            </p>
          </div>
        </AnimatedSection>

        {/* FAQ Grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
