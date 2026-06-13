"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const faqs = [
  {
    num: "01",
    q: "Do I have to sign a long-term contract?",
    a: "No long-term contract required to start. We use the audit call to recommend the right starting point and scope, then keep the engagement clear and month-to-month. The Lead Reactivation Sprint is a one-time project with no ongoing commitment unless you choose the optional management add-on.",
  },
  {
    num: "02",
    q: "How fast will I see results?",
    a: "GBP fixes can show ranking movement in weeks. Lead reactivation replies typically come in within the first 5 to 7 days of the sprint going live. Content and AI search visibility compound over 60 to 90 days. We'll be straight with you if your market is unusually competitive.",
  },
  {
    num: "03",
    q: "Do you help with AI search results like ChatGPT and Perplexity?",
    a: "Yes. AI Overviews, ChatGPT, and Perplexity pull business information from structured data, review signals, and authoritative content. Those are the same foundations we build for traditional local SEO. We optimize for the full search landscape, not just the Google results page.",
  },
  {
    num: "04",
    q: "What is the Lead Reactivation Sprint?",
    a: "A focused one-time project that turns your cold lead list, past customer list, or stale pipeline back into replies and booked appointments. We build a 90-day SMS and email follow-up sequence, set up your CRM workflow, and have it live within 5 to 7 business days. Starts at $1,500.",
  },
  {
    num: "05",
    q: "I already have a website. Can you still help?",
    a: "Yes. The GBP audit, Local SEO Content, AI Search Visibility, and Lead Reactivation Sprint all work independently of your existing site. We don't require you to use our website product to get results from the other services.",
  },
  {
    num: "06",
    q: "What kinds of businesses do you work with?",
    a: "Local service businesses in the US: trades, home services, professional services, healthcare, dental, med spas, legal, and similar categories where local search and follow-up drive inbound revenue. If you rely on Google or referrals to get found and convert, we can help.",
  },
];

function FAQItem({
  num,
  q,
  a,
  index,
}: {
  num: string;
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-start gap-6 py-7 text-left group"
      >
        {/* Number */}
        <span className="shrink-0 text-sm font-mono text-[#C9A227]/60 pt-0.5 w-6">
          {num}
        </span>

        {/* Question */}
        <span className="flex-1 text-lg sm:text-xl font-display font-semibold text-[#d1e5fb] leading-snug group-hover:text-white transition-colors">
          {q}
        </span>

        {/* Icon */}
        <span
          className="shrink-0 material-symbols-outlined text-[#C9A227] mt-0.5 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          add
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pl-12 pb-7 text-[#99907b] leading-relaxed text-lg max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#0e2131]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#d1e5fb] leading-tight tracking-tight">
            Things Worth Asking{" "}
            <em className="font-serif not-italic text-[#C9A227]">Before</em>{" "}
            You Hire Anyone
          </h2>
          <p className="text-[#99907b] text-lg">
            Honest answers. If the truth makes us the wrong fit, better to know now.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-10">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.num}
              num={item.num}
              q={item.q}
              a={item.a}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
