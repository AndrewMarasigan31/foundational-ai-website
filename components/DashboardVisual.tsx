"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

const chartData = [
  { month: "Jan", traffic: 1200 },
  { month: "Feb", traffic: 1800 },
  { month: "Mar", traffic: 2400 },
  { month: "Apr", traffic: 3100 },
  { month: "May", traffic: 4200 },
  { month: "Jun", traffic: 5800 },
];

// Dynamically import chart to avoid SSR
const TrafficChart = dynamic(
  async () => {
    const {
      BarChart,
      Bar,
      XAxis,
      YAxis,
      Tooltip,
      ResponsiveContainer,
      Cell,
    } = await import("recharts");
    return function TrafficChartInner({
      data,
    }: {
      data: typeof chartData;
    }) {
      return (
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data} barSize={20}>
            <XAxis
              dataKey="month"
              tick={{ fill: "#99907b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "#0e2131",
                border: "1px solid #99907b40",
                borderRadius: 6,
                color: "#d1e5fb",
                fontSize: 12,
              }}
              cursor={{ fill: "rgba(201,162,39,0.08)" }}
              formatter={(value) => [
                typeof value === "number" ? value.toLocaleString() : value,
                "Visitors",
              ]}
            />
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === data.length - 1
                    ? "#C9A227"
                    : `rgba(201,162,39,${0.3 + index * 0.1})`
                }
              />
            ))}
            <Bar dataKey="traffic" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === data.length - 1
                      ? "#C9A227"
                      : `rgba(201,162,39,${0.3 + index * 0.1})`
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    };
  },
  { ssr: false }
);

function useCountUp(target: number, decimals: number, isActive: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const steps = 60;
    const duration = 1500;
    const stepMs = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const raw = target * eased;
      setValue(Math.round(raw * Math.pow(10, decimals)) / Math.pow(10, decimals));
      if (step >= steps) clearInterval(timer);
    }, stepMs);

    return () => clearInterval(timer);
  }, [target, decimals, isActive]);

  return value;
}

interface StatCardProps {
  label: string;
  value: number;
  decimals: number;
  suffix: string;
  prefix?: string;
  isActive: boolean;
}

function StatCard({ label, value, decimals, suffix, prefix = "", isActive }: StatCardProps) {
  const count = useCountUp(value, decimals, isActive);
  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <div className="flex-1 rounded-lg bg-[#0a1c2e] border border-white/5 p-4">
      <p className="text-xs text-[#99907b] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#d1e5fb] tracking-tight">
        {prefix}
        {display}
        {suffix}
      </p>
    </div>
  );
}

export default function DashboardVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#071520] border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 max-w-sm bg-[#0e2131] rounded-md px-3 py-1 text-xs text-[#99907b] truncate">
          foundationalaisystems.com/dashboard
        </div>
      </div>

      {/* Dashboard body */}
      <div className="bg-[#0e2131] p-5 space-y-4">
        {/* Stat cards */}
        <div className="flex gap-3">
          <StatCard
            label="Total Views"
            value={42.8}
            decimals={1}
            suffix="K"
            isActive={isInView}
          />
          <StatCard
            label="Retention Rate"
            value={94}
            decimals={0}
            suffix="%"
            isActive={isInView}
          />
        </div>

        {/* Chart header */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-[#d1e5fb]">Traffic Growth</p>
          <span className="text-xs text-[#C9A227] bg-[#C9A227]/10 px-2 py-0.5 rounded-full">
            +383% YTD
          </span>
        </div>

        {/* Bar chart */}
        <TrafficChart data={chartData} />
      </div>
    </div>
  );
}
