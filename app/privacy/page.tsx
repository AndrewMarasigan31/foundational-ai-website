import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Foundational AI Systems",
  description: "How Foundational AI Systems collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#021524] min-h-screen py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#99907b] hover:text-[#d1e5fb] transition-colors mb-10"
        >
          <span className="material-symbols-outlined text-base leading-none">arrow_back</span>
          Back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#d1e5fb] tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-[#99907b] text-sm mb-12">Last updated: June 2026</p>

        <div className="prose-section space-y-10 text-[#99907b] leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">1. Information We Collect</h2>
            <p>
              When you fill out our contact form or book an audit call, we collect your name,
              email address, business name, and website URL. We may also collect basic usage
              data (pages visited, time on site) through analytics tools to improve this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">2. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Respond to your inquiry and schedule your free audit call</li>
              <li>Deliver the services you have engaged us for</li>
              <li>Send occasional updates relevant to your engagement (no cold newsletters)</li>
              <li>Improve our website and service offerings</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">3. Data Storage and Security</h2>
            <p>
              Your information is stored on secure, US-based servers. We take reasonable
              technical and organizational measures to protect your data from unauthorized
              access, disclosure, or loss. No method of transmission over the internet is
              100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">4. Cookies and Analytics</h2>
            <p>
              This site may use cookies and third-party analytics (such as Google Analytics)
              to understand how visitors use the site. These tools collect anonymized data
              only. You can disable cookies in your browser settings at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">5. Third-Party Services</h2>
            <p>
              We use third-party tools to operate our business (email, scheduling, project
              management). These providers are contractually bound to handle your data
              securely and only for the purposes we specify. We do not share your data
              with advertisers or data brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Request a copy of the personal data we hold about you</li>
              <li>Ask us to correct inaccurate information</li>
              <li>Ask us to delete your data (subject to any legal obligations)</li>
              <li>Opt out of any marketing communications at any time</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:hello@foundationalai.com"
                className="text-[#C9A227] hover:underline"
              >
                hello@foundationalai.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">7. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this
              page with an updated date. Continued use of the site after changes constitutes
              acceptance of the revised policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">8. Contact</h2>
            <p>
              Questions about this policy? Reach us through our{" "}
              <Link href="/contact" className="text-[#C9A227] hover:underline">
                contact page
              </Link>{" "}
              or email us directly:
            </p>
            <a
              href="mailto:info@foundationalaisystem.com"
              className="inline-flex items-center gap-2 text-[#C9A227] hover:text-[#d1e5fb] text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-base leading-none">mail</span>
              info@foundationalaisystem.com
            </a>
          </section>

        </div>
      </div>
    </main>
  );
}
