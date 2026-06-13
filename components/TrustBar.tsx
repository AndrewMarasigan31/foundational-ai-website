const STATS = [
  { value: "47+", label: "Local businesses ranked" },
  { value: "4.8★", label: "Average client rating" },
  { value: "68%", label: "Leads recovered" },
];

export default function TrustBar() {
  return (
    <div className="flex flex-col gap-4 mt-2 w-full max-w-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STATS.map((stat) => (
          <div key={stat.value} className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-bold text-[#C9A227] leading-tight">
              {stat.value}
            </span>
            <span className="text-xs text-[#99907b]">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
