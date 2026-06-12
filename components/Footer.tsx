import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline/20 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Foundational AI Systems logo" width={28} height={28} />
              <span className="text-on-surface font-semibold text-sm leading-tight">
                Foundational AI Systems
              </span>
            </Link>
            <p className="text-on-surface/50 text-sm leading-relaxed">
              Local SEO that gets small businesses into the top 3.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-on-surface/50 hover:text-primary transition-colors"
              >
                {/* LinkedIn icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-on-surface/50 hover:text-primary transition-colors"
              >
                {/* Twitter/X icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-on-surface font-semibold text-sm mb-4">Services</h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "GBP Audit", href: "/services" },
                { label: "Local SEO Content", href: "/services" },
                { label: "Website Design", href: "/services" },
                { label: "Performance Tracking", href: "/services" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-on-surface/50 hover:text-on-surface text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-on-surface font-semibold text-sm mb-4">Company</h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-on-surface/50 hover:text-on-surface text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-on-surface font-semibold text-sm mb-4">Legal</h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-on-surface/50 hover:text-on-surface text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-outline/20 pt-6">
          <p className="text-on-surface/40 text-xs text-center">
            &copy; {new Date().getFullYear()} Foundational AI Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
