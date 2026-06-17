"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const metrics = [
  { label: "Bookings", value: "47", delta: "+12%", sub: "this month" },
  { label: "Confirmation rate", value: "94%", delta: "+8%", sub: "vs last month" },
  { label: "Avg rental", value: "2.4d", delta: null, sub: "per booking" },
  { label: "New reviews", value: "18", delta: "+6", sub: "Google reviews" },
  { label: "Revenue", value: "$6.2k", delta: "+18%", sub: "this month" },
  { label: "No-show rate", value: "3%", delta: "-5%", sub: "down from 8%" },
];

const reservations = [
  { name: "Marcus T.", vehicle: "2018 Toyota Camry", dates: "Jun 20–22", status: "confirmed", amount: "$180" },
  { name: "Sandra K.", vehicle: "2020 Honda CR-V", dates: "Jun 21–24", status: "confirmed", amount: "$270" },
  { name: "James R.", vehicle: "2019 Nissan Altima", dates: "Jun 23–25", status: "pending", amount: "$160" },
  { name: "Priya S.", vehicle: "2022 Kia Sportage", dates: "Jun 24–26", status: "pending", amount: "$200" },
  { name: "Delia M.", vehicle: "2021 Hyundai Elantra", dates: "Jun 18–20", status: "completed", amount: "$140" },
  { name: "Tony F.", vehicle: "2020 Toyota RAV4", dates: "Jun 15–18", status: "completed", amount: "$210" },
  { name: "Luis M.", vehicle: "2018 Toyota Camry", dates: "Jun 12–14", status: "completed", amount: "$150" },
];

const fleet = [
  { name: "Toyota Camry '18", type: "Sedan", status: "rented", info: "Back Jun 22" },
  { name: "Honda CR-V '20", type: "SUV", status: "rented", info: "Back Jun 24" },
  { name: "Nissan Altima '19", type: "Sedan", status: "available", info: "Ready" },
  { name: "Hyundai Elantra '21", type: "Sedan", status: "available", info: "Ready" },
  { name: "Toyota RAV4 '20", type: "SUV", status: "maintenance", info: "Oil change" },
  { name: "Kia Sportage '22", type: "SUV", status: "rented", info: "Back Jun 26" },
];

const activity = [
  { time: "2m ago", event: "New booking confirmed", detail: "Marcus T. — Camry", type: "booking" },
  { time: "14m ago", event: "Confirmation SMS sent", detail: "Sandra K.", type: "sms" },
  { time: "1h ago", event: "5★ review received", detail: "Delia M.", type: "review" },
  { time: "3h ago", event: "Follow-up sent", detail: "Tony F. — Day 1", type: "followup" },
  { time: "5h ago", event: "New inquiry", detail: "Luis M. — weekend", type: "inquiry" },
  { time: "8h ago", event: "Reminder sent", detail: "James R. — tomorrow", type: "sms" },
  { time: "1d ago", event: "Booking completed", detail: "Delia M.", type: "booking" },
  { time: "1d ago", event: "Re-engagement sent", detail: "30-day → Tony F.", type: "followup" },
];

const pipeline = [
  { stage: "New Inquiry", count: 2, max: 22, color: "#6B7280" },
  { stage: "Contacted", count: 3, max: 22, color: "#F59E0B" },
  { stage: "Booked", count: 4, max: 22, color: "#4ADE80" },
  { stage: "Completed", count: 22, max: 22, color: "#111827" },
];

const reviewBars = [
  { month: "F", count: 6 },
  { month: "M", count: 9 },
  { month: "A", count: 13 },
  { month: "M", count: 18 },
  { month: "J", count: 24 },
];

const automations = [
  { label: "Booking confirmation", timing: "Immediate", ch: "SMS+Email", on: true },
  { label: "Pre-pickup reminder", timing: "24h before", ch: "SMS", on: true },
  { label: "Missed inquiry follow-up", timing: "Day 1 + 3", ch: "SMS", on: true },
  { label: "Review request", timing: "Day 2 post-return", ch: "SMS", on: true },
  { label: "Re-engagement", timing: "30 days", ch: "SMS+Email", on: true },
];

const smsThread = [
  { from: "system", text: "Hi Marcus! Your Camry Jun 20–22 is confirmed. Pickup 9am. — FASLLC" },
  { from: "customer", text: "Perfect, thanks!" },
  { from: "system", text: "Reminder: pickup is tomorrow at 9am. Questions? Reply here." },
  { from: "system", text: "Thanks Marcus! Mind leaving us a quick Google review? [link]" },
  { from: "customer", text: "Done! Great service." },
];

const navItems = [
  { label: "Overview", icon: "▦", id: "overview" },
  { label: "Reservations", icon: "📋", id: "reservations" },
  { label: "Fleet", icon: "🚗", id: "fleet" },
  { label: "Pipeline", icon: "⇄", id: "pipeline" },
  { label: "Automations", icon: "⚡", id: "automations" },
  { label: "Reviews", icon: "★", id: "reviews" },
  { label: "Settings", icon: "⚙", id: "settings" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; dot: string; text: string; label: string }> = {
    confirmed:   { bg: "bg-[#BBF7D0]", dot: "bg-[#4ADE80]",  text: "text-[#16a34a]", label: "Confirmed" },
    pending:     { bg: "bg-amber-50",   dot: "bg-amber-400",   text: "text-amber-600", label: "Pending" },
    completed:   { bg: "bg-[#F3F4F6]", dot: "bg-[#9CA3AF]",  text: "text-[#6B7280]", label: "Completed" },
    available:   { bg: "bg-[#BBF7D0]", dot: "bg-[#4ADE80]",  text: "text-[#16a34a]", label: "Available" },
    rented:      { bg: "bg-blue-50",    dot: "bg-blue-400",    text: "text-blue-600",  label: "Rented" },
    maintenance: { bg: "bg-amber-50",   dot: "bg-amber-400",   text: "text-amber-600", label: "Maint." },
  };
  const s = map[status] ?? map.completed;
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full font-mono text-[9px] font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1 h-1 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function ActivityDot({ type }: { type: string }) {
  const map: Record<string, { bg: string; icon: string }> = {
    booking:  { bg: "bg-[#BBF7D0] text-[#16a34a]", icon: "✓" },
    sms:      { bg: "bg-blue-50 text-blue-500",      icon: "✉" },
    review:   { bg: "bg-amber-50 text-amber-500",    icon: "★" },
    followup: { bg: "bg-purple-50 text-purple-500",  icon: "↩" },
    inquiry:  { bg: "bg-[#F3F4F6] text-[#9CA3AF]",  icon: "→" },
  };
  const s = map[type] ?? map.inquiry;
  return (
    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${s.bg}`}>
      {s.icon}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="px-4 py-2.5 border-b border-[#E5E7EB] flex items-center justify-between shrink-0">
      <span className="font-inter text-xs font-semibold text-[#111827]">{title}</span>
      {right}
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function CarRentalContent() {
  const [activeNav, setActiveNav] = useState("overview");
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="flex h-screen bg-[#F3F4F6] text-[#111827] overflow-hidden font-space select-none">

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside className="w-52 bg-white border-r border-[#E5E7EB] flex flex-col shrink-0 h-full">
        <div className="px-4 py-3.5 border-b border-[#E5E7EB] shrink-0">
          <p className="font-inter font-bold text-sm text-[#111827]">FASLLC</p>
          <p className="font-mono text-[9px] text-[#9CA3AF] mt-0.5 leading-tight">Car Rental Growth System</p>
        </div>

        <nav className="flex-1 px-2 py-3 flex flex-col gap-px overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-left transition-colors ${
                activeNav === item.id
                  ? "bg-[#BBF7D0]/60 text-[#111827]"
                  : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
              }`}
            >
              <span className="text-xs w-4 text-center">{item.icon}</span>
              <span className="font-space text-xs">{item.label}</span>
              {activeNav === item.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />}
            </button>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-[#E5E7EB] flex flex-col gap-2 shrink-0">
          <div className="px-2 py-1 rounded-full border border-[#4ADE80]/40 bg-[#BBF7D0]/30 text-center">
            <span className="font-mono text-[8px] font-semibold uppercase tracking-widest text-[#16a34a]">Sample Project</span>
          </div>
          <Link href="/" className="flex items-center gap-1.5 text-[#9CA3AF] hover:text-[#4ADE80] transition-colors px-2">
            <span className="text-xs">←</span>
            <span className="font-mono text-[9px]">Back to site</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-[#E5E7EB] px-6 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-inter text-sm font-semibold text-[#111827]">Overview</h1>
            <span className="font-mono text-[10px] text-[#9CA3AF]">Wed, Jun 18, 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="font-mono text-[10px] text-[#6B7280]">All systems live</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#BBF7D0] flex items-center justify-center font-inter text-xs font-bold text-[#16a34a]">F</div>
          </div>
        </header>

        {/* Content grid */}
        <main className="flex-1 overflow-hidden p-4 flex flex-col gap-3 min-h-0">

          {/* Row 1 — Metrics */}
          <div className="grid grid-cols-6 gap-3 shrink-0">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-white border border-[#E5E7EB] rounded-lg px-4 py-3"
              >
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#9CA3AF]">{m.label}</p>
                <div className="flex items-end gap-1.5 mt-1">
                  <span className="font-inter text-xl font-semibold text-[#111827] leading-none">{m.value}</span>
                  {m.delta && <span className="font-mono text-[10px] font-semibold text-[#4ADE80] mb-px">{m.delta}</span>}
                </div>
                <p className="font-mono text-[9px] text-[#9CA3AF] mt-0.5">{m.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Row 2 — Main panels */}
          <div className="flex-1 min-h-0 grid grid-cols-12 gap-3">

            {/* Col A — Reservations (5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="col-span-5 flex flex-col min-h-0"
            >
              <Card className="flex flex-col h-full">
                <CardHeader
                  title="Reservations"
                  right={
                    <div className="flex gap-3">
                      {["Upcoming", "Pending", "History"].map((t, i) => (
                        <button key={t} className={`font-mono text-[9px] pb-px ${i === 0 ? "border-b border-[#4ADE80] text-[#111827] font-semibold" : "text-[#9CA3AF]"}`}>{t}</button>
                      ))}
                    </div>
                  }
                />
                {/* Table head */}
                <div className="grid grid-cols-5 px-4 py-1.5 bg-[#F9FAFB] border-b border-[#E5E7EB] shrink-0">
                  {["Customer", "Vehicle", "Dates", "Amt", "Status"].map(h => (
                    <span key={h} className="font-mono text-[8px] uppercase tracking-widest text-[#9CA3AF]">{h}</span>
                  ))}
                </div>
                {/* Rows */}
                <div className="flex-1 overflow-y-auto divide-y divide-[#F9FAFB]">
                  {reservations.map((r) => (
                    <div key={r.name} className={`grid grid-cols-5 px-4 py-2 items-center hover:bg-[#F9FAFB] transition-colors ${r.status === "completed" ? "opacity-40" : ""}`}>
                      <span className="font-space text-xs font-medium text-[#111827] truncate">{r.name}</span>
                      <span className="font-space text-[11px] text-[#4B5563] truncate pr-2">{r.vehicle}</span>
                      <span className="font-mono text-[10px] text-[#6B7280]">{r.dates}</span>
                      <span className="font-mono text-[10px] font-semibold text-[#111827]">{r.amount}</span>
                      <StatusPill status={r.status} />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Col B — Fleet + Pipeline (4 cols) */}
            <div className="col-span-4 flex flex-col gap-3 min-h-0">

              {/* Fleet */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex-1 min-h-0 flex flex-col"
              >
                <Card className="flex flex-col h-full">
                  <CardHeader
                    title="Fleet Status"
                    right={<span className="font-mono text-[10px] text-[#4ADE80]">3 available</span>}
                  />
                  <div className="flex-1 overflow-y-auto divide-y divide-[#F9FAFB]">
                    {fleet.map((v) => (
                      <div key={v.name} className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F9FAFB] transition-colors">
                        <span className="text-base shrink-0">🚗</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-space text-[11px] font-medium text-[#111827] leading-none truncate">{v.name}</p>
                          <p className="font-mono text-[9px] text-[#9CA3AF] mt-0.5">{v.type} · {v.info}</p>
                        </div>
                        <StatusPill status={v.status} />
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Pipeline */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="shrink-0"
              >
                <Card>
                  <CardHeader
                    title="Lead Pipeline"
                    right={<span className="font-mono text-[10px] text-[#6B7280]">31 leads total</span>}
                  />
                  <div className="px-4 py-3 flex flex-col gap-2">
                    {pipeline.map((p) => (
                      <div key={p.stage} className="flex items-center gap-2.5">
                        <span className="font-mono text-[9px] text-[#6B7280] w-24 shrink-0">{p.stage}</span>
                        <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(p.count / p.max) * 100}%`, background: p.color }} />
                        </div>
                        <span className="font-mono text-[10px] font-bold w-4 text-right" style={{ color: p.color }}>{p.count}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Col C — Activity + Reviews (3 cols) */}
            <div className="col-span-3 flex flex-col gap-3 min-h-0">

              {/* Activity feed */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex-1 min-h-0 flex flex-col"
              >
                <Card className="flex flex-col h-full">
                  <CardHeader
                    title="Activity"
                    right={
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                        <span className="font-mono text-[9px] text-[#6B7280]">Live</span>
                      </div>
                    }
                  />
                  <div className="flex-1 overflow-y-auto divide-y divide-[#F9FAFB]">
                    {activity.map((a) => (
                      <div key={a.time + a.event} className="flex items-start gap-2 px-3 py-2 hover:bg-[#F9FAFB] transition-colors">
                        <ActivityDot type={a.type} />
                        <div className="flex-1 min-w-0">
                          <p className="font-space text-[11px] font-medium text-[#111827] leading-tight">{a.event}</p>
                          <p className="font-mono text-[9px] text-[#9CA3AF] mt-0.5 truncate">{a.detail}</p>
                        </div>
                        <span className="font-mono text-[9px] text-[#9CA3AF] shrink-0 mt-0.5 whitespace-nowrap">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45 }}
                className="shrink-0"
              >
                <Card>
                  <CardHeader
                    title="Google Reviews"
                    right={<span className="font-mono text-[10px] text-[#4ADE80] font-semibold">+300% in 5mo.</span>}
                  />
                  <div className="px-4 py-3 flex items-end gap-4">
                    <div className="shrink-0">
                      <p className="font-inter text-3xl font-semibold text-[#111827] leading-none">4.9</p>
                      <div className="flex gap-px mt-1">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-[#4ADE80] text-xs">★</span>)}
                      </div>
                      <p className="font-mono text-[9px] text-[#9CA3AF] mt-1">24 total</p>
                    </div>
                    <div className="flex-1 flex items-end gap-1 h-12">
                      {reviewBars.map((b) => (
                        <div key={b.month} className="flex-1 flex flex-col items-center gap-0.5">
                          <div className="w-full rounded-t bg-[#4ADE80]" style={{ height: `${(b.count / 24) * 40}px`, minHeight: 3 }} />
                          <span className="font-mono text-[8px] text-[#9CA3AF]">{b.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Row 3 — Automations + SMS + CTA */}
          <div className="grid grid-cols-12 gap-3 shrink-0">

            {/* Automations */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="col-span-4"
            >
              <Card>
                <CardHeader
                  title="Active Workflows"
                  right={<span className="font-mono text-[10px] text-[#4ADE80] font-semibold">5 running</span>}
                />
                <div className="divide-y divide-[#F9FAFB]">
                  {automations.map((a) => (
                    <div key={a.label} className="flex items-center gap-2.5 px-4 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shrink-0" />
                      <span className="font-space text-xs text-[#111827] flex-1 truncate">{a.label}</span>
                      <span className="font-mono text-[9px] text-[#9CA3AF] shrink-0">{a.timing}</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#6B7280] shrink-0">{a.ch}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* SMS thread */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              className="col-span-5"
            >
              <Card>
                <CardHeader
                  title="SMS Preview — Marcus T."
                  right={<span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#BBF7D0] text-[#16a34a] font-semibold">Booking Confirmed</span>}
                />
                <div className="px-4 py-3 flex flex-col gap-2 bg-[#F9FAFB]">
                  {smsThread.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] px-2.5 py-1.5 rounded-2xl text-[11px] font-space leading-snug ${
                        msg.from === "customer"
                          ? "bg-[#4ADE80] text-[#111827] rounded-br-sm"
                          : "bg-white border border-[#E5E7EB] text-[#374151] shadow-sm rounded-bl-sm"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="col-span-3"
            >
              <div className="bg-[#111827] rounded-lg px-5 py-4 h-full flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#4ADE80] font-semibold">Foundational AI Systems</p>
                  <p className="font-inter text-base font-medium text-white mt-2 leading-snug">Want this built for your business?</p>
                  <p className="font-space text-xs text-[#6B7280] mt-1.5 leading-relaxed">Scoped, built, and handed over. No retainer.</p>
                </div>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center justify-center bg-[#4ADE80] hover:bg-[#22c55e] text-[#111827] font-inter font-semibold text-xs px-4 py-2.5 rounded-full transition-colors"
                >
                  Book a Call →
                </Link>
              </div>
            </motion.div>
          </div>

        </main>
      </div>

      {/* ── Popup ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-white border border-[#E5E7EB] rounded-xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-5 pb-3">
              <div className="flex flex-col gap-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#16a34a] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                  Sample Project
                </span>
                <p className="font-inter text-sm font-semibold text-[#111827] leading-snug">
                  Car Rental Growth System
                </p>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-[#9CA3AF] hover:text-[#111827] transition-colors text-lg leading-none mt-0.5 ml-3 shrink-0"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="px-5 pb-4 border-b border-[#E5E7EB]">
              <p className="font-space text-xs text-[#4B5563] leading-relaxed">
                This is a sample dashboard showing what we build for independent car rental businesses — bookings, fleet tracking, lead pipeline, automated follow-ups, and review growth, all inside GoHighLevel.
              </p>
              <p className="font-space text-xs text-[#4B5563] leading-relaxed mt-2">
                Built to show you exactly what your system would look like from day one.
              </p>
            </div>

            {/* CTA */}
            <div className="px-5 py-4 flex items-center justify-between gap-3 bg-[#F9FAFB]">
              <p className="font-space text-xs text-[#6B7280] leading-tight">
                Want this for your business?
              </p>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-1.5 bg-[#4ADE80] hover:bg-[#22c55e] text-[#111827] font-inter font-semibold text-xs px-4 py-2 rounded-full transition-colors"
              >
                Book a Call →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
