import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How VisiChek collects, uses, stores, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-[#e8e8e8] bg-white pt-[120px] pb-12">
        <div className="mx-auto max-w-[760px] px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
            Legal
          </p>
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold leading-tight tracking-[-0.02em] text-[#1a1a1a]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-[14px] text-[#6a6a6a]">
            Last updated: 1 April 2026
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="legal-body mx-auto max-w-[760px] px-6 py-16">
        <Section title="1. Introduction">
          <p>
            VisiChek (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting the privacy
            of visitors, customers, and users of our visitor management platform.
            This Privacy Policy explains how we collect, use, store, and share
            your personal data when you use our services.
          </p>
        </Section>

        <Section title="2. Data We Collect">
          <p>We may collect the following categories of personal data:</p>
          <ul>
            <li>
              <strong>Account data</strong> — name, work email, company name,
              role, and phone number provided during sign-up or sales enquiries.
            </li>
            <li>
              <strong>Visitor data</strong> — name, photograph, ID scan, company
              affiliation, and check-in/check-out timestamps entered through the
              VisiChek kiosk or web portal.
            </li>
            <li>
              <strong>Usage data</strong> — browser type, IP address, device
              information, pages viewed, and actions taken within the platform.
            </li>
            <li>
              <strong>Communications</strong> — messages sent through our support
              channels, feedback, and survey responses.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>We process personal data for the following purposes:</p>
          <ul>
            <li>Providing and improving the VisiChek visitor management service.</li>
            <li>Verifying visitor identity and managing facility access.</li>
            <li>Communicating with you about your account, support requests, and service updates.</li>
            <li>Generating anonymised, aggregated analytics to improve our product.</li>
            <li>Complying with legal and regulatory obligations, including the Nigeria Data Protection Regulation (NDPR).</li>
          </ul>
        </Section>

        <Section title="4. Legal Basis for Processing">
          <p>
            We rely on the following legal bases: performance of a contract (to
            deliver the service), legitimate interests (to improve our platform
            and prevent fraud), consent (for marketing communications), and
            compliance with legal obligations.
          </p>
        </Section>

        <Section title="5. Data Sharing">
          <p>
            We do not sell personal data. We may share data with trusted
            sub-processors (hosting, email delivery, analytics) that are
            contractually bound to equivalent data protection standards. We will
            also disclose data when required by law or court order.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p>
            Account data is retained for the duration of the customer
            relationship and for up to 12 months after termination. Visitor
            check-in records are retained according to the data retention policy
            configured by the facility operator, with a default of 90 days.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>
            Under the NDPR and applicable law you have the right to access,
            correct, delete, restrict processing of, and port your personal data.
            You may also withdraw consent for marketing at any time. To exercise
            these rights contact us at{" "}
            <a href="mailto:privacy@visichek.com" className="text-[#3A9615] underline">
              privacy@visichek.com
            </a>.
          </p>
        </Section>

        <Section title="8. Security">
          <p>
            We implement industry-standard security measures including
            encryption at rest and in transit, role-based access controls,
            regular vulnerability assessments, and audit logging. Despite our
            efforts, no system is completely secure and we cannot guarantee
            absolute security.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this policy from time to time. Material changes will be
            communicated via email or an in-product banner at least 30 days
            before they take effect.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            If you have any questions about this Privacy Policy, please email{" "}
            <a href="mailto:privacy@visichek.com" className="text-[#3A9615] underline">
              privacy@visichek.com
            </a>{" "}
            or write to: VisiChek, Lagos, Nigeria.
          </p>
        </Section>

        <BackLink />
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-[20px] font-semibold text-[#1a1a1a]">{title}</h2>
      <div className="space-y-3 text-[15px] leading-[1.8] text-[#4a4a4a] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:pl-1">
        {children}
      </div>
    </section>
  );
}

function BackLink() {
  return (
    <div className="mt-16 border-t border-[#e8e8e8] pt-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#3A9615] transition-colors hover:text-[#2e7a11]"
      >
        &larr; Back to home
      </Link>
    </div>
  );
}
