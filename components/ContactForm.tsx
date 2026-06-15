"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SERVICES = [
  "GBP Optimization",
  "Local SEO Content",
  "AI Search Visibility",
  "Lead Reactivation Sprint",
  "Not sure yet",
];

const CALENDAR_URL =
  process.env.NEXT_PUBLIC_GHL_CALENDAR_URL ??
  "https://api.leadconnectorhq.com/widget/booking/foundational-ai";

interface FormValues {
  name: string;
  email: string;
  businessName: string;
  websiteUrl: string;
  helpWith: string[];
}

interface FormErrors {
  name?: string;
  email?: string;
  businessName?: string;
}

type Step = "form" | "book" | "confirmed";

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.businessName.trim())
    errors.businessName = "Business name is required.";
  return errors;
}

const inputClass =
  "bg-[#0e2131] border border-white/10 rounded-xl px-4 py-3 text-[#d1e5fb] placeholder-[#99907b]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/60 w-full transition-all";
const labelClass = "text-sm font-medium text-[#d1e5fb] mb-1 block";
const errorClass = "text-red-400 text-xs mt-1";

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    businessName: "",
    websiteUrl: "",
    helpWith: [],
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("form");
  const [contactId, setContactId] = useState<string | null>(null);
  const [opportunityId, setOpportunityId] = useState<string | null>(null);
  const [isCheckingBooking, setIsCheckingBooking] = useState(false);
  const [calendarUrl, setCalendarUrl] = useState(CALENDAR_URL);

  const errors = validate(values);

  function handleChange(field: keyof FormValues, val: string) {
    setValues((prev) => ({ ...prev, [field]: val }));
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function toggleService(service: string) {
    setValues((prev) => ({
      ...prev,
      helpWith: prev.helpWith.includes(service)
        ? prev.helpWith.filter((s) => s !== service)
        : [...prev.helpWith, service],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, businessName: true });
    if (Object.keys(errors).length > 0) return;

    setIsPending(true);
    setSubmitError(null);

    try {
      const { submitContact } = await import("@/app/actions/submitContact");
      const result = await submitContact({
        name: values.name,
        email: values.email,
        businessName: values.businessName,
        websiteUrl: values.websiteUrl || undefined,
        helpWith: values.helpWith,
      });
      if (result.success) {
        setContactId(result.contactId ?? null);
        setOpportunityId(result.opportunityId ?? null);
        const [first, ...rest] = values.name.trim().split(" ");
        const params = new URLSearchParams();
        if (first) params.set("firstName", first);
        if (rest.length) params.set("lastName", rest.join(" "));
        if (values.email) params.set("email", values.email);
        setCalendarUrl(`${CALENDAR_URL}?${params.toString()}`);
        setStep("book");
      } else {
        setSubmitError(
          result.error ?? "Something went wrong. Please try again."
        );
      }
    } catch {
      setSubmitError(
        "Something went wrong. Please email us at hello@foundationalai.com"
      );
    } finally {
      setIsPending(false);
    }
  }

  async function handleBookingConfirm() {
    if (!contactId || !opportunityId) {
      setStep("confirmed");
      return;
    }
    setIsCheckingBooking(true);
    try {
      const res = await fetch("/api/ghl-booking-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, opportunityId }),
      });
      const data = await res.json();
      if (data.booked) {
        setStep("confirmed");
      } else {
        // Not yet detected — still move to confirmed from UX perspective
        setStep("confirmed");
      }
    } catch {
      setStep("confirmed");
    } finally {
      setIsCheckingBooking(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {step === "confirmed" ? (
        <motion.div
          key="confirmed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 text-center min-h-[400px]"
        >
          <span className="material-symbols-outlined text-[#C9A227] text-5xl">
            check_circle
          </span>
          <div>
            <h3 className="font-display font-extrabold text-[#d1e5fb] text-2xl">
              You&apos;re all set.
            </h3>
            <p className="mt-2 text-[#99907b]">
              We&apos;ll see you on the call. Check your inbox for confirmation.
            </p>
          </div>
          <a href="/services" className="text-[#C9A227] hover:underline text-sm">
            Explore our services while you wait →
          </a>
        </motion.div>
      ) : step === "book" ? (
        <motion.div
          key="book"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 text-center min-h-[400px]"
        >
          <span className="material-symbols-outlined text-[#C9A227] text-5xl">
            calendar_month
          </span>
          <div>
            <h3 className="font-display font-extrabold text-[#d1e5fb] text-2xl">
              You&apos;re in — now book your audit call.
            </h3>
            <p className="mt-2 text-[#99907b]">
              Pick a time that works for you. Takes 30 seconds.
            </p>
          </div>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C9A227] hover:bg-[#b8911f] text-[#021524] font-bold px-7 py-3.5 rounded-full shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-colors"
          >
            Book your audit call →
          </a>
          <button
            type="button"
            onClick={handleBookingConfirm}
            disabled={isCheckingBooking}
            className="text-[#99907b] hover:text-[#d1e5fb] text-sm underline transition-colors"
          >
            {isCheckingBooking ? "Checking…" : "I've booked my call"}
          </button>
        </motion.div>
      ) : (
        <form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          className="bg-[#0e2131] border border-white/10 rounded-2xl p-8 flex flex-col gap-5"
        >
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          type="text"
          className={inputClass}
          placeholder="Jane Smith"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          required
        />
        {touched.name && errors.name && (
          <p className={errorClass}>{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          className={inputClass}
          placeholder="jane@yourbusiness.com"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          required
        />
        {touched.email && errors.email && (
          <p className={errorClass}>{errors.email}</p>
        )}
      </div>

      {/* Business Name */}
      <div>
        <label htmlFor="businessName" className={labelClass}>
          Business Name
        </label>
        <input
          id="businessName"
          type="text"
          className={inputClass}
          placeholder="Smith Plumbing Co."
          value={values.businessName}
          onChange={(e) => handleChange("businessName", e.target.value)}
          onBlur={() => handleBlur("businessName")}
          required
        />
        {touched.businessName && errors.businessName && (
          <p className={errorClass}>{errors.businessName}</p>
        )}
      </div>

      {/* Website URL (optional) */}
      <div>
        <label htmlFor="websiteUrl" className={labelClass}>
          Website URL{" "}
          <span className="text-[#99907b] font-normal">(optional)</span>
        </label>
        <input
          id="websiteUrl"
          type="url"
          className={inputClass}
          placeholder="https://yourbusiness.com"
          value={values.websiteUrl}
          onChange={(e) => handleChange("websiteUrl", e.target.value)}
        />
      </div>

      {/* Service toggle pills */}
      <div>
        <p className="text-sm font-medium text-[#d1e5fb] mb-2">
          What do you need help with?
        </p>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => {
            const selected = values.helpWith.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={[
                  "rounded-full px-4 py-2 text-sm border transition-all",
                  selected
                    ? "bg-[#C9A227]/15 border-[#C9A227] text-[#C9A227] font-medium"
                    : "bg-[#0e2131] border-white/10 text-[#99907b] hover:border-white/30 hover:text-[#d1e5fb]",
                ].join(" ")}
              >
                {service}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit error */}
      {submitError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          {submitError}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        className={[
          "bg-[#C9A227] hover:bg-[#b8911f] text-[#021524] font-bold px-7 py-3.5 rounded-full",
          "shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_28px_rgba(201,162,39,0.5)]",
          "transition-colors w-full mt-2 flex items-center justify-center gap-2",
          isPending ? "opacity-70 cursor-not-allowed" : "",
        ].join(" ")}
      >
        {isPending ? (
          <>
            <span className="animate-spin border-2 border-[#021524]/30 border-t-[#021524] rounded-full w-4 h-4 shrink-0" />
            Sending...
          </>
        ) : (
          "Book My Free Audit Call"
        )}
      </button>
        </form>
      )}
    </AnimatePresence>
  );
}
