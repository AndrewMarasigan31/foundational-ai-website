"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import BookingsCard from "./BookingsCard";
import TrustBar from "./TrustBar";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@!%$&";

function ScrambleWord({ text, startDelay }: { text: string; startDelay: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frame = 0;
    let raf: ReturnType<typeof setTimeout>;

    const start = setTimeout(() => {
      const totalFrames = text.length * 4;

      const tick = () => {
        const resolved = Math.floor(frame / 4);
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === "." || char === " ") return char;
              if (i < resolved) return text[i];
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );
        frame++;
        if (frame <= totalFrames) raf = setTimeout(tick, 35);
        else setDisplay(text);
      };

      tick();
    }, startDelay * 1000);

    return () => {
      clearTimeout(start);
      clearTimeout(raf);
    };
  }, [text, startDelay, prefersReducedMotion]);

  return <span>{display}</span>;
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#021524]">
      {/* Layer 1: gold grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,162,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Layer 2: gold aurora orb — top-left */}
      {prefersReducedMotion ? (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "-200px",
            left: "-200px",
            background: "radial-gradient(circle, rgba(201,162,39,0.18) 0%, rgba(201,162,39,0.06) 45%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      ) : (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "-200px",
            left: "-200px",
            background: "radial-gradient(circle, rgba(201,162,39,0.18) 0%, rgba(201,162,39,0.06) 45%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Layer 3: teal accent orb — bottom-right */}
      {prefersReducedMotion ? (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 600,
            height: 600,
            bottom: "-100px",
            right: "-80px",
            background: "radial-gradient(circle, rgba(14,87,131,0.55) 0%, rgba(14,87,131,0.2) 50%, transparent 75%)",
            filter: "blur(90px)",
          }}
        />
      ) : (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 600,
            height: 600,
            bottom: "-100px",
            right: "-80px",
            background: "radial-gradient(circle, rgba(14,87,131,0.55) 0%, rgba(14,87,131,0.2) 50%, transparent 75%)",
            filter: "blur(90px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      )}

      {/* Layer 4: grain noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Layer 5: gold spotlight cone on headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 25% 38%, rgba(201,162,39,0.13) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow label */}
          {prefersReducedMotion ? (
            <p className="text-xs uppercase tracking-[0.2em] text-[#99907b]">
              GROWTH SYSTEMS FOR LOCAL SERVICE BUSINESSES
            </p>
          ) : (
            <motion.p
              className="text-xs uppercase tracking-[0.2em] text-[#99907b]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
            >
              GROWTH SYSTEMS FOR LOCAL SERVICE BUSINESSES
            </motion.p>
          )}

          {/* Headline: masked line-lift per line (editorial technique) */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-light text-[#d1e5fb] leading-none tracking-[-0.05em]">
            <span className="block overflow-hidden">
              {prefersReducedMotion ? (
                <span className="block">Clicks In.</span>
              ) : (
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.7, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  Clicks In.
                </motion.span>
              )}
            </span>
            <span className="block overflow-hidden">
              {prefersReducedMotion ? (
                <span className="block">
                  Calls{" "}
                  <em className="font-serif not-italic text-[#C9A227]">
                    <ScrambleWord text="Booked." startDelay={0.9} />
                  </em>
                </span>
              ) : (
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  Calls{" "}
                  <em className="font-serif not-italic text-[#C9A227]">
                    <ScrambleWord text="Booked." startDelay={0.9} />
                  </em>
                </motion.span>
              )}
            </span>
          </h1>

          {/* Everything below fades as one group — no stagger overload */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          >
            <p className="text-base sm:text-lg text-[#b9c6d6] leading-relaxed max-w-md">
              You&apos;re paying for clicks that never call. We turn the traffic
              you already get into booked calls.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#b8911f] text-[#021524] font-bold text-base px-7 py-3.5 rounded-full transition-colors shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_28px_rgba(201,162,39,0.5)]"
              >
                Book a Free Audit Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-[#99907b] hover:text-[#C9A227] font-medium text-sm transition-colors group"
              >
                See how it works
                <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">arrow_forward</span>
              </Link>
            </div>

            <TrustBar />
          </motion.div>
        </div>

        {/* Right column: scale-up reveal, no slide */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <BookingsCard />
        </motion.div>
      </div>
    </section>
  );
}
