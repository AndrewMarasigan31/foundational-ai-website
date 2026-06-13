const STATS = [
  { value: "47+", label: "Local businesses ranked" },
  { value: "4.8★", label: "Average client rating" },
  { value: "68%", label: "Leads recovered" },
];

const PILLS = ["Restaurants", "Law Firms", "Home Services", "Dental"];

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
      <div className="border-t border-white/10" />
      <div className="flex flex-wrap gap-2">
        {PILLS.map((pill) => (
          <span
            key={pill}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#0e2131] border border-white/10 text-sm text-[#99907b] select-none"
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}
