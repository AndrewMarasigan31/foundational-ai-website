"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    q: "Do I have to sign a long-term contract?",
    a: "No long-term contract required to start. We use the audit call to recommend the right starting point and scope, then keep the engagement clear and month-to-month. The Lead Reactivation Sprint is a one-time project with no ongoing commitment unless you choose the optional management add-on.",
  },
  {
    q: "How fast will I see results?",
    a: "GBP fixes can show ranking movement in weeks. Lead reactivation replies typically come in within the first 5 to 7 days of the sprint going live. Content and AI search visibility compound over 60 to 90 days. We’ll be straight with you if your market is unusually competitive.",
  },
  {
    q: "Do you help with AI search results like ChatGPT and Perplexity?",
    a: "Yes. AI Overviews, ChatGPT, and Perplexity pull business information from structured data, review signals, and authoritative content. Those are the same foundations we build for traditional local SEO. We optimize for the full search landscape, not just the Google results page.",
  },
  {
    q: "What is the Lead Reactivation Sprint?",
    a: "A focused one-time project that turns your cold lead list, past customer list, or stale pipeline back into replies and booked appointments. We build a 90-day SMS and email follow-up sequence, set up your CRM workflow, and have it live within 5 to 7 business days. Starts at $1,500.",
  },
  {
    q: "I already have a website. Can you still help?",
    a: "Yes. The GBP audit, Local SEO Content, AI Search Visibility, and Lead Reactivation Sprint all work independently of your existing site. We don’t require you to use our website product to get results from the other services.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Local service businesses in the US: trades, home services, professional services, healthcare, dental, med spas, legal, and similar categories where local search and follow-up drive inbound revenue. If you rely on Google or referrals to get found and convert, we can help.",
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight max-w-3xl">
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
