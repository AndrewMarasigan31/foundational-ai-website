import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Foundational AI Systems",
  description: "Terms governing your use of Foundational AI Systems services and website.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-[#99907b] text-sm mb-12">Last updated: June 2026</p>

        <div className="space-y-10 text-[#99907b] leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">1. Agreement to Terms</h2>
            <p>
              By accessing this website or engaging Foundational AI Systems for services,
              you agree to be bound by these Terms of Service. If you do not agree, please
              do not use this site or our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">2. Services</h2>
            <p>
              Foundational AI Systems provides local SEO consulting, Google Business Profile
              optimization, content creation, website design, AI search visibility, and lead
              reactivation services to small businesses in the United States. The specific
              scope, deliverables, and pricing for each engagement are defined in a separate
              written agreement or proposal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">3. No Guarantee of Results</h2>
            <p>
              Search rankings and lead generation are influenced by many factors outside our
              control, including Google algorithm changes, competitor activity, and the quality
              of your existing business presence. We commit to applying our expertise and
              best practices on your behalf — we do not guarantee specific ranking positions,
              traffic volumes, or revenue outcomes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">4. Client Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide accurate information about your business when requested</li>
              <li>Review and approve deliverables in a timely manner</li>
              <li>Ensure you have the authority to grant us access to any accounts or platforms needed to perform the services</li>
              <li>Not use our services for any unlawful purpose</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">5. Payment</h2>
            <p>
              Payment terms are specified in your individual service agreement. Unless
              otherwise agreed in writing, invoices are due within 14 days of issue.
              Late payments may result in a pause of services. All fees are non-refundable
              unless otherwise stated in your agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">6. Intellectual Property</h2>
            <p>
              Upon receipt of full payment, you own all content and deliverables created
              specifically for your business under our engagement. We retain the right to
              reference your engagement in our portfolio and case studies unless you
              request otherwise in writing.
            </p>
            <p>
              This website and its original content, features, and design are owned by
              Foundational AI Systems and are protected by applicable intellectual property
              laws. You may not reproduce or redistribute any part of this site without
              written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Foundational AI Systems shall not be
              liable for any indirect, incidental, or consequential damages arising from
              your use of our services or this website. Our total liability for any claim
              arising from a service engagement shall not exceed the total fees paid by you
              in the three months prior to the claim.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">8. Termination</h2>
            <p>
              Either party may terminate a month-to-month service engagement with 30 days
              written notice. Project-based engagements (such as the Lead Reactivation Sprint
              or Website Build) may not be cancelled mid-project without forfeiting fees paid
              to date, as outlined in your agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the United States and the state in
              which Foundational AI Systems is registered, without regard to conflict of
              law principles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">10. Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. Changes will be posted on this
              page with an updated date. Your continued use of our services after changes
              are posted constitutes acceptance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#d1e5fb]">11. Contact</h2>
            <p>
              Questions about these terms? Visit our{" "}
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
