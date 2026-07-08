"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-md bg-background/80 border-b border-outline/20">
        {/* Logo + name */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Foundational AI Systems logo" width={32} height={32} />
          <span className="text-on-surface font-semibold text-sm leading-tight hidden sm:block">
            Foundational AI Systems
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-primary"
                  : "text-on-surface/70 hover:text-on-surface"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-background text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Book a Call
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-on-surface p-1"
          aria-label="Toggle navigation"
          onClick={() => setDrawerOpen((v) => !v)}
        >
          {drawerOpen ? (
            <span className="material-symbols-outlined">close</span>
          ) : (
            <span className="material-symbols-outlined">menu</span>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] z-40 bg-background/95 backdrop-blur-md flex flex-col p-6 gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setDrawerOpen(false)}
              className={`text-lg font-medium py-2 border-b border-outline/20 ${
                pathname === href ? "text-primary" : "text-on-surface"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setDrawerOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-background text-base font-semibold hover:bg-primary/90 transition-colors"
          >
            Book a Call
          </Link>
        </div>
      )}
    </>
  );
}
