"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function MiniDashboard() {
  return (
    <div className="w-full bg-[#F3F4F6] rounded-lg p-2.5 flex flex-col gap-2 font-mono border-2 border-black">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-[#FCA5A5] border border-black" />
          <span className="w-2 h-2 rounded-full bg-[#FCD34D] border border-black" />
          <span className="w-2 h-2 rounded-full bg-[#4ADE80] border border-black" />
        </div>
        <span className="text-[8px] font-bold text-black">GHL Dashboard</span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          <span className="text-[7px] font-bold text-black">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {[["47", "Bookings", "bg-[#38bdf8]"], ["94%", "Confirmed", "bg-[#4ADE80]"], ["4.9★", "Reviews", "bg-[#FCA5A5]"]].map(([val, label, bg]) => (
          <div key={label} className={`${bg} border-2 border-black rounded px-1.5 py-1 shadow-[2px_2px_0px_#000]`}>
            <p className="text-[9px] font-black text-black">{val}</p>
            <p className="text-[7px] font-bold text-black/70">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border-2 border-black rounded divide-y-2 divide-black shadow-[2px_2px_0px_#000]">
        {[["Marcus T.", "bg-[#4ADE80]"], ["Sandra K.", "bg-[#4ADE80]"], ["James R.", "bg-[#FCD34D]"]].map(([name, dot]) => (
          <div key={name} className="flex items-center justify-between px-2 py-1">
            <span className="text-[8px] font-bold text-black">{name}</span>
            <span className={`w-2 h-2 rounded-full ${dot} border border-black`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkTeaser() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-row items-center gap-3"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger — left edge */}
      <motion.button
        animate={open ? { scale: 1.06, rotate: -3 } : { scale: 1, rotate: 2 }}
        whileHover={{ scale: 1.1, rotate: -3 }}
        whileTap={{ scale: 0.94, rotate: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        className="relative flex items-center gap-2.5 bg-[#38bdf8] border-[3px] border-black px-4 py-3 rounded-r-xl shadow-[4px_4px_0px_#000] cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white border border-black" />
        </span>
        <span className="font-black text-sm text-black tracking-tight leading-none whitespace-nowrap">
          See what we build 🚀
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -16, rotate: -2, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, rotate: -1.5, scale: 1 }}
            exit={{ opacity: 0, x: -14, rotate: -2, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_#000] overflow-hidden"
          >
            <div className="p-3 bg-[#eff6ff] border-b-[3px] border-black">
              <MiniDashboard />
            </div>

            <div className="px-4 pt-3 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">🚗</span>
                <span className="font-black text-[10px] uppercase tracking-widest text-[#2563eb]">Sample Project</span>
              </div>
              <p className="font-black text-sm text-black leading-snug">
                Car Rental<br />Growth System
              </p>
              <p className="text-[11px] font-semibold text-[#4B5563] mt-1.5 leading-relaxed">
                Bookings, automation, lead tracking & reviews — all running on autopilot.
              </p>
              <Link
                href="/work/car-rental"
                className="mt-3 inline-flex items-center gap-1.5 bg-[#38bdf8] border-2 border-black text-black font-black text-xs px-3 py-1.5 rounded-full shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-y-px transition-all"
              >
                Peek inside ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
