"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const appointments = [
  { name: "Marcus T.", service: "Emergency repair", time: "Today · 2:30 PM" },
  { name: "Sandra K.", service: "New install quote", time: "Today · 4:00 PM" },
  { name: "James R.", service: "Drain cleaning", time: "Tomorrow · 9:00 AM" },
];

const START = 9;
const TARGET = 38;

export default function BookingsCard() {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(prefersReducedMotion ? TARGET : START);
  const [visibleRows, setVisibleRows] = useState(prefersReducedMotion ? appointments.length : 0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Count up 12 → 47
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(START + (TARGET - START) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);

    // Reveal appointment rows one at a time
    const timers = appointments.map((_, i) =>
      setTimeout(() => setVisibleRows((v) => Math.max(v, i + 1)), 500 + i * 550)
    );

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#091826] shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden select-none">
      {/* Window bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0e2131]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <span className="text-xs font-medium text-[#99907b]">Bookings</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-[#4ADE80]">LIVE</span>
        </span>
      </div>

      {/* Counter */}
      <div className="px-5 pt-5 pb-4 border-b border-white/10">
        <p className="text-xs text-[#99907b] mb-1">Calls booked this month</p>
        <div className="flex items-baseline gap-2.5">
          <span className="text-4xl font-extrabold text-[#C9A227] tabular-nums leading-none">{count}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-[#4ADE80]">
            <span className="material-symbols-outlined text-base leading-none">trending_up</span>
            up from {START}
          </span>
        </div>
      </div>

      {/* Incoming appointments */}
      <div className="px-4 py-4 flex flex-col gap-2">
        {appointments.map((appt, i) => (
          <motion.div
            key={appt.name}
            initial={false}
            animate={{
              opacity: visibleRows > i ? 1 : 0,
              y: visibleRows > i ? 0 : 8,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#0e2131] px-3 py-2.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30">
              <span className="material-symbols-outlined text-[#C9A227] text-base leading-none">event_available</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#d1e5fb] leading-tight">{appt.name}</p>
              <p className="text-xs text-[#99907b] leading-tight">{appt.service}</p>
            </div>
            <span className="text-xs text-[#99907b] shrink-0 tabular-nums">{appt.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
