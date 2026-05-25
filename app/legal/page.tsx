import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatDateShort } from "../util/date";
import { fetchLegalDocuments, legalDocTypeLabel } from "../util/legal";

const legalTitle = "Legal Documents";
const legalDescription =
  "Browse VisiChek's published legal documents, including privacy, terms, and data processing policies.";

export const metadata: Metadata = {
  title: legalTitle,
  description: legalDescription,
  alternates: { canonical: "/legal" },
  openGraph: {
    title: `${legalTitle} | VisiChek`,
    description: legalDescription,
    url: "https://visichek.app/legal",
    siteName: "VisiChek",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/visichek-social-share.svg",
        width: 1200,
        height: 630,
        alt: "VisiChek legal documents",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@visichek",
    creator: "@visichek",
    title: `${legalTitle} | VisiChek`,
    description: legalDescription,
    images: ["/visichek-social-share.svg"],
  },
};

export const revalidate = 300;

export default async function LegalIndexPage() {
  const result = await fetchLegalDocuments({
    limit: 100,
    sort: "title",
    facets: "doc_type",
  });
  const documents = result?.items ?? [];

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
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
            Legal
          </p>
          <h1 className="font-serif text-[40px] font-semibold leading-tight tracking-[-0.02em] text-[#1a1a1a] md:text-[58px]">
            Legal Documents
          </h1>
          <p className="mt-5 max-w-[620px] text-[15.5px] leading-relaxed text-[#6a6a6a]">
            The latest published VisiChek policies and agreements. Each page is
            loaded from the live legal document API.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        {documents.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {documents.map((document) => (
              <Link
                key={document.id}
                href={`/legal/${document.slug}`}
                className="group flex min-h-[210px] flex-col rounded-2xl border border-[#e8e8e8] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8d8d8] hover:shadow-[0_10px_36px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="inline-flex rounded-full border border-[#e8e8e8] bg-[#fafafa] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#2e7a11]">
                    {legalDocTypeLabel(document.docType)}
                  </span>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#3A9615] transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
                <h2 className="font-serif text-[24px] font-semibold leading-tight tracking-[-0.01em] text-[#1a1a1a]">
                  {document.title}
                </h2>
                {document.summary && (
                  <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-[#6a6a6a]">
                    {document.summary}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-6 text-[12px] text-[#6a6a6a]">
                  {document.effectiveAt && (
                    <span>Effective {formatDateShort(document.effectiveAt)}</span>
                  )}
                  {document.publishedAt && (
                    <span>Published {formatDateShort(document.publishedAt)}</span>
                  )}
                  {document.version != null && (
                    <span>Version {document.version}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-[560px] rounded-2xl border border-dashed border-[#e8e8e8] bg-[#fafafa] px-6 py-12 text-center">
            <h2 className="font-serif text-[26px] font-semibold tracking-[-0.02em] text-[#1a1a1a]">
              No legal documents are published yet.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#6a6a6a]">
              Published legal documents will appear here automatically once they
              are available from the API.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
