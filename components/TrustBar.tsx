"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 47, suffix: "+", label: "Local businesses ranked" },
  { target: 4.8, suffix: "★", label: "Average client rating", decimals: 1 },
  { target: 68, suffix: "%", label: "Leads recovered" },
];

function AnimatedStat({
  target,
  suffix,
  decimals = 0,
  delay,
}: {
  target: number;
  suffix: string;
  decimals?: number;
  delay: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        setTimeout(() => {
          const duration = 1200;
          const startTime = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(parseFloat((eased * target).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(target);
          };

          requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals, delay]);

  return (
    <span ref={ref} className="text-2xl font-bold text-[#C9A227] leading-tight tabular-nums">
      {value.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function TrustBar() {
  return (
    <div className="flex flex-col gap-4 mt-2 w-full max-w-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center gap-0.5">
            <AnimatedStat
              target={stat.target}
              suffix={stat.suffix}
              decimals={stat.decimals}
              delay={i * 120}
            />
            <span className="text-xs text-[#99907b]">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
