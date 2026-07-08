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
              We turn the clicks you already pay for into booked calls.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-on-surface font-semibold text-sm mb-4">Services</h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Website Built to Convert", href: "/services" },
                { label: "Lead Reactivation Sprint", href: "/services" },
                { label: "Performance Tracking", href: "/services" },
                { label: "Local SEO & AI Search", href: "/services" },
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
