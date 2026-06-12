"use client";

import { motion } from "framer-motion";

const listings = [
  { name: "Apex Plumbing Co.", rating: 4.9, reviews: 312 },
  { name: "BlueLine HVAC", rating: 4.8, reviews: 187 },
  { name: "Summit Electric", rating: 4.7, reviews: 241 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-[#C9A227] text-sm font-medium">
      {"★".repeat(Math.round(rating))}
      <span className="text-[#d1e5fb] ml-1">{rating}</span>
    </span>
  );
}

export default function LocalPackVisual() {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      {/* Map pin icon */}
      <div className="flex justify-center mb-3">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-[0_0_8px_#C9A227aa]"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            fill="#C9A227"
          />
          <circle cx="12" cy="9" r="2.5" fill="#021524" />
        </svg>
      </div>

      {/* Top 3 Local Pack badge */}
      <div className="flex justify-center mb-4">
        <span className="animate-pulse bg-[#C9A227]/20 border border-[#C9A227]/50 text-[#C9A227] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          Top 3 Local Pack
        </span>
      </div>

      {/* Listing cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-2"
      >
        {listings.map((listing, i) => (
          <motion.div
            key={listing.name}
            variants={cardVariants}
            className="bg-[#0e2131] border border-[#99907b]/30 rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#C9A227]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Rank number */}
              <span className="w-6 h-6 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/40 text-[#C9A227] text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-[#d1e5fb] text-sm font-medium">
                {listing.name}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <StarRating rating={listing.rating} />
              <span className="text-[#99907b] text-xs">{listing.reviews} reviews</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle glow */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-[#C9A227]/5 blur-2xl pointer-events-none" />
    </div>
  );
}
