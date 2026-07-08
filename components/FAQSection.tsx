"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
const faqs = [
  {
    num: "01",
    q: "I'm getting clicks but no calls. Can you fix that?",
    a: "That's exactly what we do. Usually the traffic is fine; the site and the follow-up are what leak. We rebuild where visitors land and add automatic follow-up, so more of the clicks you already pay for turn into booked calls.",
  },
  {
    num: "02",
    q: "Do I have to sign a long-term contract?",
    a: "No long-term contract required to start. We use the audit call to recommend the right starting point and scope, then keep the engagement clear and month-to-month. The Lead Reactivation Sprint is a one-time project with no ongoing commitment unless you choose the optional management add-on.",
  },
  {
    num: "03",
    q: "How fast will I see results?",
    a: "Follow-up and reactivation start producing replies within 5 to 7 days. Site fixes show up in call volume within a few weeks. Ranking and content compound over 60 to 90 days.",
  },
  {
    num: "04",
    q: "What is the Lead Reactivation Sprint?",
    a: "A one-time project that turns your cold lead list back into replies and booked appointments. We build a 90-day SMS and email sequence, set up your CRM, and have it live within 5 to 7 days. Starts at $1,500.",
  },
  {
    num: "05",
    q: "I already have a website. Can you still help?",
    a: "Yes. Follow-up, reactivation, and tracking all work on top of your existing site. And if the site itself is where leads leak, we can rebuild just the pages that need to convert.",
  },
  {
    num: "06",
    q: "Do you also handle ranking and AI search?",
    a: "Yes. We cover Local SEO, Google Business Profile, and AI search visibility (ChatGPT, Perplexity, AI Overviews). But we lead with conversion, because more traffic doesn't help if your current clicks aren't becoming calls.",
  },
  {
    num: "07",
    q: "What kinds of businesses do you work with?",
    a: "Local service businesses in the US: trades, home services, professional services, healthcare, dental, med spas, legal, and similar categories where inbound calls drive revenue. If you rely on Google, ads, or referrals to get found and need those visitors to convert, we can help.",
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
  const prefersReducedMotion = useReducedMotion();

  const inner = (
    <>
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
    </>
  );

  if (prefersReducedMotion) {
    return <div className="border-b border-white/10">{inner}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="border-b border-white/10"
    >
      {inner}
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-16 md:py-20 px-6 bg-[#0e2131] border-t border-white/10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#d1e5fb] leading-tight tracking-[-0.04em]">
            Questions We Get{" "}
            <em className="font-serif not-italic text-[#C9A227]">Every</em>{" "}
            Time
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
