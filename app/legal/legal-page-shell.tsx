import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileDown } from "lucide-react";
import { formatDateShort } from "../util/date";
import {
  fetchLegalDocument,
  legalDocTypeLabel,
  type LegalDocumentPublicOut,
} from "../util/legal";
import LegalBlockRenderer from "./legal-block-renderer";

const SITE_URL = "https://visichek.app";
const SHARE_IMAGE = "/visichek-social-share.svg";

interface LegalDocumentPageProps {
  slug: string;
}

export async function generateLegalMetadata(
  slug: string,
): Promise<Metadata> {
  try {
    const document = await fetchLegalDocument(slug);
    if (!document) {
      return {
        title: "Legal document",
        description: "Read VisiChek's public legal documents.",
        robots: { index: false, follow: true },
      };
    }

    const description =
      document.summary ??
      `Read the latest published ${document.title} for VisiChek.`;
    const canonical = `/legal/${document.slug}`;

    return {
      title: document.title,
      description,
      alternates: { canonical },
      openGraph: {
        title: `${document.title} | VisiChek`,
        description,
        url: `${SITE_URL}${canonical}`,
        siteName: "VisiChek",
        type: "article",
        locale: "en_US",
        images: [
          {
            url: SHARE_IMAGE,
            width: 1200,
            height: 630,
            alt: `VisiChek ${document.title}`,
            type: "image/svg+xml",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@visichek",
        creator: "@visichek",
        title: `${document.title} | VisiChek`,
        description,
        images: [SHARE_IMAGE],
      },
    };
  } catch {
    return {
      title: "Legal document",
      description: "Read VisiChek's public legal documents.",
      robots: { index: false, follow: true },
    };
  }
}

export default async function LegalDocumentPage({
  slug,
}: LegalDocumentPageProps) {
  let document: LegalDocumentPublicOut | null = null;

  try {
    document = await fetchLegalDocument(slug);
  } catch (error) {
    console.error("[legal] failed to load document:", error);
    return <LegalUnavailable />;
  }

  if (!document) notFound();

  const effectiveDate = formatLegalDate(document.effectiveAt);
  const publishedDate = formatLegalDate(document.publishedAt);
  const updatedDate = formatLegalDate(document.lastUpdated);
  const downloadHref = `/legal/${encodeURIComponent(document.slug)}/download`;

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-[#e8e8e8] bg-white pt-[124px] pb-12 md:pt-[140px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #2a2a2a 1px, transparent 1px), linear-gradient(to bottom, #2a2a2a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-[800px] px-6">
          <Link
            href="/legal"
            className="mb-6 inline-flex items-center text-[13px] font-medium text-[#3A9615] transition-colors hover:text-[#2e7a11]"
          >
            Back to legal documents
          </Link>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
            {legalDocTypeLabel(document.docType)}
          </p>
          <h1 className="font-serif text-[38px] font-semibold leading-tight tracking-[-0.02em] text-[#1a1a1a] md:text-[54px]">
            {document.title}
          </h1>
          {document.summary && (
            <p className="mt-5 max-w-[680px] text-[15.5px] leading-relaxed text-[#6a6a6a]">
              {document.summary}
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center gap-3 text-[12.5px] text-[#6a6a6a]">
            {effectiveDate && <MetaPill label="Effective" value={effectiveDate} />}
            {publishedDate && <MetaPill label="Published" value={publishedDate} />}
            {updatedDate && <MetaPill label="Updated" value={updatedDate} />}
            {document.version != null && (
              <MetaPill label="Version" value={String(document.version)} />
            )}
          </div>
          {document.sourceFileUrl && (
            <Link
              href={downloadHref}
              prefetch={false}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white px-4 py-2.5 text-[13.5px] font-medium text-[#2a2a2a] shadow-sm transition-all duration-200 hover:border-[#d8d8d8] hover:shadow-md"
            >
              <FileDown className="h-4 w-4 text-[#3A9615]" />
              Download PDF
            </Link>
          )}
        </div>
      </section>

      <article className="mx-auto max-w-[800px] px-6 py-14 md:py-16">
        {document.body.length > 0 ? (
          <LegalBlockRenderer blocks={document.body} />
        ) : (
          <p className="text-[15px] leading-relaxed text-[#6a6a6a]">
            This legal document is published, but its body is currently empty.
          </p>
        )}

        <div className="mt-16 border-t border-[#e8e8e8] pt-8">
          <Link
            href="/legal"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#3A9615] transition-colors hover:text-[#2e7a11]"
          >
            Back to legal documents
          </Link>
        </div>
      </article>
    </main>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex rounded-full border border-[#e8e8e8] bg-[#fafafa] px-3 py-1">
      <span className="mr-1 font-semibold text-[#4a4a4a]">{label}:</span>
      {value}
    </span>
  );
}

function LegalUnavailable() {
  return (
    <main className="min-h-screen bg-white pt-[140px]">
      <section className="mx-auto max-w-[620px] px-6 py-20 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
          Legal
        </p>
        <h1 className="font-serif text-[34px] leading-tight tracking-[-0.02em] text-[#1a1a1a] md:text-[44px]">
          This document could not be loaded.
        </h1>
        <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-relaxed text-[#6a6a6a]">
          Please try again in a moment, or return to the legal documents index.
        </p>
        <Link
          href="/legal"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-5 py-2.5 text-[14px] font-semibold text-white shadow-md shadow-green-700/20 transition-all duration-150 hover:-translate-y-px hover:shadow-lg"
        >
          View legal documents
        </Link>
      </section>
    </main>
  );
}

function formatLegalDate(timestamp: number | null): string | null {
  return timestamp ? formatDateShort(timestamp) : null;
}
