import type { Metadata } from "next";
import Link from "next/link";

const dpaTitle = "Data Processing Addendum";
const dpaDescription =
  "VisiChek's Data Processing Addendum (DPA) covering data handling obligations, security measures, sub-processors, and data subject rights.";

export const metadata: Metadata = {
  title: dpaTitle,
  description: dpaDescription,
  alternates: { canonical: "/dpa" },
  openGraph: {
    title: `${dpaTitle} | VisiChek`,
    description: dpaDescription,
    url: "https://visichek.app/dpa",
    siteName: "VisiChek",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "/visichek-social-share.svg",
        width: 1200,
        height: 630,
        alt: "VisiChek Data Processing Addendum",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@visichek",
    creator: "@visichek",
    title: `${dpaTitle} | VisiChek`,
    description: dpaDescription,
    images: ["/visichek-social-share.svg"],
  },
};

export default function DPAPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-[#e8e8e8] bg-white pt-[120px] pb-12">
        <div className="mx-auto max-w-[760px] px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
            Legal
          </p>
          <h1 className="font-serif text-[36px] md:text-[48px] font-bold leading-tight tracking-[-0.02em] text-[#1a1a1a]">
            Data Processing Addendum
          </h1>
          <p className="mt-3 text-[14px] text-[#6a6a6a]">
            Last updated: 1 April 2026
          </p>
        </div>
      </section>

      <article className="legal-body mx-auto max-w-[760px] px-6 py-16">
        <Section title="1. Purpose">
          <p>
            This Data Processing Addendum (&quot;DPA&quot;) supplements the VisiChek
            Terms of Service and governs the processing of personal data by
            VisiChek (&quot;Processor&quot;) on behalf of the customer
            (&quot;Controller&quot;) in connection with the VisiChek visitor management
            platform.
          </p>
        </Section>

        <Section title="2. Definitions">
          <ul>
            <li>
              <strong>Personal Data</strong> — any information relating to an
              identified or identifiable natural person processed through the
              Service.
            </li>
            <li>
              <strong>Processing</strong> — any operation performed on Personal
              Data, including collection, storage, retrieval, use, disclosure,
              and erasure.
            </li>
            <li>
              <strong>Sub-processor</strong> — a third party engaged by VisiChek
              to process Personal Data on behalf of the Controller.
            </li>
          </ul>
        </Section>

        <Section title="3. Scope of Processing">
          <p>
            The Processor shall process Personal Data only on documented
            instructions from the Controller, unless required to do so by
            applicable law. The categories of data processed include visitor
            identity information, check-in/check-out records, and facility
            access logs.
          </p>
        </Section>

        <Section title="4. Security Measures">
          <p>The Processor shall implement and maintain appropriate technical and organisational measures, including:</p>
          <ul>
            <li>Encryption of Personal Data in transit (TLS 1.2+) and at rest (AES-256).</li>
            <li>Role-based access controls with least-privilege principles.</li>
            <li>Regular security assessments and penetration testing.</li>
            <li>Incident detection, response, and notification procedures.</li>
            <li>Secure backup and disaster recovery processes.</li>
          </ul>
        </Section>

        <Section title="5. Sub-processors">
          <p>
            The Processor may engage Sub-processors to assist in providing the
            Service. The Processor maintains a list of current Sub-processors
            available upon request. The Controller will be notified at least 30
            days before any new Sub-processor is engaged, with the right to
            object.
          </p>
        </Section>

        <Section title="6. Data Subject Rights">
          <p>
            The Processor shall assist the Controller in responding to data
            subject requests (access, rectification, erasure, portability,
            restriction, objection) within the timeframes required by applicable
            law, at no additional charge for standard requests.
          </p>
        </Section>

        <Section title="7. Data Breach Notification">
          <p>
            In the event of a Personal Data breach, the Processor shall notify
            the Controller without undue delay and no later than 72 hours after
            becoming aware of the breach. Notification shall include the nature
            of the breach, categories of data affected, estimated number of data
            subjects, likely consequences, and measures taken to mitigate.
          </p>
        </Section>

        <Section title="8. Data Transfers">
          <p>
            Personal Data is stored and processed within Nigeria. If data
            transfer to a jurisdiction outside Nigeria is required, the
            Processor shall ensure adequate safeguards are in place, including
            standard contractual clauses or equivalent mechanisms approved by
            the Nigeria Data Protection Bureau (NDPB).
          </p>
        </Section>

        <Section title="9. Audits">
          <p>
            The Controller may audit the Processor&apos;s compliance with this DPA
            once per year with 30 days written notice. Audits shall be conducted
            during normal business hours and shall not unreasonably interfere
            with the Processor&apos;s operations.
          </p>
        </Section>

        <Section title="10. Term &amp; Termination">
          <p>
            This DPA shall remain in effect for the duration of the agreement
            under which the Processor processes Personal Data for the
            Controller. Upon termination, the Processor shall delete or return
            all Personal Data within 30 days, unless retention is required by
            law.
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
