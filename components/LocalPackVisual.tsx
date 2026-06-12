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
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-[#C9A227] text-xs font-medium">
      ★ <span className="text-[#d1e5fb] ml-0.5">{rating}</span>
    </span>
  );
}

const goldPins = [
  { x: 78, y: 52, delay: 0 },
  { x: 155, y: 72, delay: 0.35 },
  { x: 222, y: 44, delay: 0.7 },
];

const grayPins = [
  { x: 24, y: 46 },
  { x: 138, y: 28 },
  { x: 192, y: 98 },
  { x: 268, y: 56 },
  { x: 50, y: 112 },
];

export default function LocalPackVisual() {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none overflow-hidden rounded-2xl">
      {/* SVG Map Background */}
      <svg
        viewBox="0 0 300 260"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mapVignette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#091826" stopOpacity="0" />
            <stop offset="46%" stopColor="#091826" stopOpacity="0" />
            <stop offset="70%" stopColor="#091826" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#091826" stopOpacity="0.97" />
          </linearGradient>
        </defs>

        {/* Map base */}
        <rect width="300" height="260" fill="#091826" />

        {/* City blocks */}
        <rect x="8" y="8" width="43" height="24" fill="#0d1e33" rx="2" />
        <rect x="8" y="44" width="43" height="30" fill="#0d1e33" rx="2" />
        <rect x="8" y="90" width="43" height="30" fill="#0d1e33" rx="2" />
        <rect x="68" y="8" width="44" height="24" fill="#0d1e33" rx="2" />
        {/* Park */}
        <rect x="68" y="44" width="44" height="38" fill="#0c2e1a" rx="3" />
        <rect x="71" y="47" width="38" height="32" fill="#0e3d22" rx="2" />
        <rect x="75" y="52" width="12" height="10" fill="#0f4828" rx="1" />
        <rect x="92" y="54" width="10" height="8" fill="#0f4828" rx="1" />
        {/* More city blocks */}
        <rect x="125" y="8" width="46" height="24" fill="#0d1e33" rx="2" />
        <rect x="125" y="44" width="21" height="38" fill="#0d1e33" rx="2" />
        <rect x="152" y="44" width="21" height="38" fill="#0d1e33" rx="2" />
        <rect x="183" y="8" width="44" height="54" fill="#0d1e33" rx="2" />
        <rect x="236" y="8" width="56" height="30" fill="#0d1e33" rx="2" />
        <rect x="236" y="50" width="56" height="32" fill="#0d1e33" rx="2" />
        <rect x="125" y="95" width="35" height="28" fill="#0d1e33" rx="2" />
        <rect x="170" y="95" width="55" height="28" fill="#0d1e33" rx="2" />
        <rect x="236" y="96" width="56" height="27" fill="#0d1e33" rx="2" />
        <rect x="8" y="133" width="43" height="28" fill="#0d1e33" rx="2" />
        <rect x="68" y="133" width="44" height="28" fill="#0d1e33" rx="2" />
        <rect x="125" y="133" width="46" height="28" fill="#0d1e33" rx="2" />
        <rect x="183" y="133" width="44" height="28" fill="#0d1e33" rx="2" />
        <rect x="236" y="133" width="56" height="28" fill="#0d1e33" rx="2" />

        {/* Main roads (horizontal) */}
        <rect x="0" y="36" width="300" height="6" fill="#122847" />
        <rect x="0" y="84" width="300" height="6" fill="#122847" />
        <rect x="0" y="125" width="300" height="6" fill="#122847" />

        {/* Main roads (vertical) */}
        <rect x="55" y="0" width="10" height="260" fill="#122847" />
        <rect x="120" y="0" width="4" height="260" fill="#122847" />
        <rect x="178" y="0" width="4" height="260" fill="#122847" />
        <rect x="233" y="0" width="4" height="260" fill="#122847" />

        {/* Side streets */}
        <rect x="0" y="165" width="300" height="3" fill="#0f2138" />
        <rect x="0" y="192" width="300" height="3" fill="#0f2138" />
        <rect x="0" y="218" width="300" height="3" fill="#0f2138" />
        <rect x="148" y="0" width="3" height="260" fill="#0f2138" />
        <rect x="290" y="0" width="3" height="260" fill="#0f2138" />

        {/* Gray competitor pins */}
        {grayPins.map(({ x, y }, i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <path
              d="M0-9C-3-9 -5.5-6.5 -5.5-4C-5.5-1 0 4.5 0 4.5C0 4.5 5.5-1 5.5-4C5.5-6.5 3-9 0-9Z"
              fill="#3a4b60"
              opacity="0.7"
            />
            <circle cx="0" cy="-4" r="2" fill="#091826" />
          </g>
        ))}

        {/* Gold pins with SVG animate pulse rings (no JS) */}
        {goldPins.map(({ x, y, delay }) => (
          <g key={`g${x}-${y}`} transform={`translate(${x},${y})`}>
            {/* Outer pulse ring */}
            <circle r="5" fill="none" stroke="#C9A227" strokeWidth="1.2" strokeOpacity="0">
              <animate
                attributeName="r"
                from="5"
                to="18"
                dur="2s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                from="0.65"
                to="0"
                dur="2s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Inner pulse ring */}
            <circle r="5" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeOpacity="0">
              <animate
                attributeName="r"
                from="5"
                to="11"
                dur="2s"
                begin={`${delay + 0.6}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                from="0.5"
                to="0"
                dur="2s"
                begin={`${delay + 0.6}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Pin body */}
            <path
              d="M0-12C-3.8-12 -6.5-9.4 -6.5-6.4C-6.5-2.6 0 5 0 5C0 5 6.5-2.6 6.5-6.4C6.5-9.4 3.8-12 0-12Z"
              fill="#C9A227"
            />
            <circle cx="0" cy="-6.4" r="2.5" fill="#091826" />
          </g>
        ))}

        {/* Gradient vignette darkens bottom half */}
        <rect width="300" height="260" fill="url(#mapVignette)" />
      </svg>

      {/* Overlay: badge + listing cards */}
      <div className="absolute inset-0 flex flex-col justify-end px-3 pb-3">
        {/* Top 3 Local Pack badge */}
        <div className="flex justify-center mb-2">
          <span className="animate-pulse bg-[#C9A227]/20 border border-[#C9A227]/50 text-[#C9A227] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Top 3 Local Pack
          </span>
        </div>

        {/* Listing cards with backdrop-blur over the map */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-1.5"
        >
          {listings.map((listing, i) => (
            <motion.div
              key={listing.name}
              variants={cardVariants}
              className="bg-[#0e2131]/80 backdrop-blur-md border border-[#99907b]/30 rounded-xl px-3 py-2 flex items-center justify-between hover:border-[#C9A227]/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/40 text-[#C9A227] text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-[#d1e5fb] text-xs font-medium">{listing.name}</span>
              </div>
              <div className="flex flex-col items-end ml-2 shrink-0">
                <StarRating rating={listing.rating} />
                <span className="text-[#99907b] text-[10px]">{listing.reviews} reviews</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
