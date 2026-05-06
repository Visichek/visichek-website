import type { Metadata } from "next";
import Link from "next/link";

const termsTitle = "Terms of Service";
const termsDescription =
  "The terms and conditions governing your use of VisiChek — including acceptable use, data ownership, fees, service levels, and termination.";

export const metadata: Metadata = {
  title: termsTitle,
  description: termsDescription,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `${termsTitle} | VisiChek`,
    description: termsDescription,
    url: "https://visichek.app/terms",
    siteName: "VisiChek",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "/visichek-social-share.svg",
        width: 1200,
        height: 630,
        alt: "VisiChek terms of service",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@visichek",
    creator: "@visichek",
    title: `${termsTitle} | VisiChek`,
    description: termsDescription,
    images: ["/visichek-social-share.svg"],
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-[#e8e8e8] bg-white pt-[120px] pb-12">
        <div className="mx-auto max-w-[760px] px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
            Legal
          </p>
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold leading-tight tracking-[-0.02em] text-[#1a1a1a]">
            Terms of Service
          </h1>
          <p className="mt-3 text-[14px] text-[#6a6a6a]">
            Last updated: 1 April 2026
          </p>
        </div>
      </section>

      <article className="legal-body mx-auto max-w-[760px] px-6 py-16">
        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using the VisiChek platform (&quot;Service&quot;), you agree
            to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree
            to these Terms, do not use the Service.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            VisiChek provides a cloud-based visitor management system that
            enables organisations to register, verify, track, and manage
            visitors across physical facilities. The Service includes web
            applications, mobile kiosk interfaces, APIs, and related
            documentation.
          </p>
        </Section>

        <Section title="3. Accounts &amp; Access">
          <p>
            You must provide accurate and complete registration information. You
            are responsible for maintaining the confidentiality of your account
            credentials and for all activity that occurs under your account. You
            agree to notify us immediately of any unauthorised use.
          </p>
        </Section>

        <Section title="4. Acceptable Use">
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose or in violation of any applicable law.</li>
            <li>Attempt to reverse-engineer, decompile, or disassemble any part of the Service.</li>
            <li>Interfere with or disrupt the integrity or performance of the Service.</li>
            <li>Upload or transmit viruses, malware, or any other harmful code.</li>
            <li>Collect personal data of visitors without appropriate legal basis.</li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All intellectual property rights in the Service, including software,
            design, trademarks, and documentation, are owned by VisiChek or its
            licensors. You receive a limited, non-exclusive, non-transferable
            licence to use the Service for the duration of your subscription.
          </p>
        </Section>

        <Section title="6. Data Ownership">
          <p>
            You retain ownership of all data you submit to the Service
            (&quot;Customer Data&quot;). You grant VisiChek a limited licence to process
            Customer Data solely to provide and improve the Service. We will not
            use Customer Data for any other purpose without your consent.
          </p>
        </Section>

        <Section title="7. Fees &amp; Payment">
          <p>
            Subscription fees are set out in your order form or pricing page.
            Fees are invoiced in advance and are non-refundable except as
            required by law. We reserve the right to change pricing with 30 days
            written notice.
          </p>
        </Section>

        <Section title="8. Service Level &amp; Availability">
          <p>
            We target 99.9% uptime for the Service, excluding scheduled
            maintenance. We will provide reasonable advance notice of planned
            downtime. We are not liable for interruptions caused by
            circumstances beyond our reasonable control.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, VisiChek&apos;s total liability
            arising out of or related to these Terms shall not exceed the fees
            paid by you in the twelve (12) months preceding the claim. We are
            not liable for indirect, incidental, consequential, or punitive
            damages.
          </p>
        </Section>

        <Section title="10. Termination">
          <p>
            Either party may terminate these Terms with 30 days written notice.
            We may suspend or terminate access immediately for material breach.
            Upon termination, your right to use the Service ceases and we will
            make Customer Data available for export for 30 days.
          </p>
        </Section>

        <Section title="11. Governing Law">
          <p>
            These Terms are governed by the laws of the Federal Republic of
            Nigeria. Any disputes shall be resolved through binding arbitration
            in Lagos, Nigeria.
          </p>
        </Section>

        <Section title="12. Changes to These Terms">
          <p>
            We may update these Terms from time to time. Material changes will be
            communicated via email or in-product notice at least 30 days before
            they take effect. Continued use of the Service after changes
            constitutes acceptance.
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
