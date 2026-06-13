const CATEGORIES = ["Restaurants", "Law Firms", "Home Services", "Dental"];

export default function TrustBar() {
  return (
    <div className="flex flex-col gap-3 mt-2">
      <span className="text-sm text-[#99907b]/70">
        Trusted by local businesses including
      </span>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#0e2131] border border-white/10 text-sm text-[#99907b] select-none"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
