/**
 * Public legal document API helpers.
 *
 * The website only reads published legal documents. Summary surfaces use the
 * list endpoint; document pages use the slug-based detail endpoint. Detail
 * requests are intentionally uncached because the payload may include a
 * short-lived `sourceFileUrl` for the original upload.
 */

import { cache } from "react";

import { LEGAL_ENDPOINTS } from "./api";

export type LegalDocType =
  | "privacy_policy"
  | "terms_of_service"
  | "service_agreement"
  | "cookie_policy"
  | "acceptable_use_policy"
  | "data_processing_agreement"
  | "refund_policy"
  | "sla"
  | "disclaimer"
  | "other"
  | (string & {});

export interface LegalDocumentPublicListRow {
  id: string;
  slug: string;
  title: string;
  docType: LegalDocType;
  summary: string | null;
  version: number | null;
  effectiveAt: number | null;
  publishedAt: number | null;
}

export interface LegalInlineText {
  type: "text";
  text: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    code?: boolean;
  };
}

export interface LegalInlineLink {
  type: "link";
  href?: string;
  content?: LegalInlineContent[];
}

export type LegalInlineContent = string | LegalInlineText | LegalInlineLink;

export interface LegalBlock {
  id?: string;
  type: string;
  props?: Record<string, unknown>;
  content?: LegalInlineContent[] | Record<string, unknown> | string | null;
  children?: LegalBlock[];
}

export interface LegalDocumentPublicOut
  extends LegalDocumentPublicListRow {
  body: LegalBlock[];
  sourceFileUrl: string | null;
  lastUpdated: number | null;
}

export interface LegalListMeta {
  total: number;
  skip: number;
  limit: number;
  hasMore: boolean;
  facets?: Record<string, unknown>;
}

export interface LegalListResult {
  items: LegalDocumentPublicListRow[];
  meta: LegalListMeta;
}

interface FetchLegalListOptions {
  skip?: number;
  limit?: number;
  sort?: string;
  q?: string;
  docType?: LegalDocType | LegalDocType[];
  facets?: string;
}

const LEGAL_LIST_REVALIDATE_SECONDS = 300;

export const LEGAL_DOC_TYPE_LABELS: Record<string, string> = {
  privacy_policy: "Privacy Policy",
  terms_of_service: "Terms of Service",
  service_agreement: "Service Agreement",
  cookie_policy: "Cookie Policy",
  acceptable_use_policy: "Acceptable Use Policy",
  data_processing_agreement: "Data Processing Agreement",
  refund_policy: "Refund Policy",
  sla: "Service Level Agreement",
  disclaimer: "Disclaimer",
  other: "Legal Document",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normaliseRow(
  raw: unknown,
): LegalDocumentPublicListRow | null {
  if (!isRecord(raw)) return null;

  const slug = asString(raw.slug);
  const title = asString(raw.title);
  const docType = asString(raw.docType);

  if (!slug || !title || !docType) return null;

  return {
    id: asString(raw.id) ?? slug,
    slug,
    title,
    docType,
    summary: asString(raw.summary),
    version: asNumber(raw.version),
    effectiveAt: asNumber(raw.effectiveAt),
    publishedAt: asNumber(raw.publishedAt),
  };
}

function normaliseMeta(raw: unknown, itemCount: number): LegalListMeta {
  const meta = isRecord(raw) ? raw : {};

  return {
    total: asNumber(meta.total) ?? itemCount,
    skip: asNumber(meta.skip) ?? 0,
    limit: asNumber(meta.limit) ?? itemCount,
    hasMore: typeof meta.hasMore === "boolean" ? meta.hasMore : false,
    facets: isRecord(meta.facets) ? meta.facets : undefined,
  };
}

function legalListFetchOptions(): RequestInit & { next?: { revalidate: number } } {
  return process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { next: { revalidate: LEGAL_LIST_REVALIDATE_SECONDS } };
}

export function legalDocTypeLabel(docType: string): string {
  return (
    LEGAL_DOC_TYPE_LABELS[docType] ??
    docType
      .split("_")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export async function fetchLegalDocuments(
  options: FetchLegalListOptions = {},
): Promise<LegalListResult | null> {
  const url = new URL(LEGAL_ENDPOINTS.list());

  if (typeof options.skip === "number") {
    url.searchParams.set("skip", String(options.skip));
  }
  if (typeof options.limit === "number") {
    url.searchParams.set("limit", String(options.limit));
  }
  if (options.sort) {
    url.searchParams.set("sort", options.sort);
  }
  if (options.q) {
    url.searchParams.set("q", options.q);
  }
  if (options.facets) {
    url.searchParams.set("facets", options.facets);
  }

  const docTypes = Array.isArray(options.docType)
    ? options.docType
    : options.docType
      ? [options.docType]
      : [];
  for (const docType of docTypes) {
    url.searchParams.append("docType", docType);
  }

  try {
    const res = await fetch(url, legalListFetchOptions());
    if (!res.ok) {
      console.error(`[legal] ${url.toString()} returned ${res.status}`);
      return null;
    }

    const raw: unknown = await res.json();
    const envelopeData = isRecord(raw) && "data" in raw ? raw.data : raw;
    const data = isRecord(envelopeData) ? envelopeData : {};
    const rawItems = Array.isArray(data.items)
      ? data.items
      : Array.isArray(envelopeData)
        ? envelopeData
        : [];
    const items = rawItems
      .map((item) => normaliseRow(item))
      .filter((item): item is LegalDocumentPublicListRow => !!item);
    const rawMeta = isRecord(data.meta)
      ? data.meta
      : isRecord(raw) && isRecord(raw.meta)
        ? raw.meta
        : null;

    return {
      items,
      meta: normaliseMeta(rawMeta, items.length),
    };
  } catch (err) {
    console.error("[legal] list fetch threw:", err);
    return null;
  }
}

export async function fetchLegalDocument(
  slug: string,
): Promise<LegalDocumentPublicOut | null> {
  const url = LEGAL_ENDPOINTS.detail(slug);
  const res = await fetch(url, { cache: "no-store" });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`[legal] ${url} returned ${res.status}`);
  }

  const raw: unknown = await res.json();
  const data = isRecord(raw) && "data" in raw ? raw.data : raw;
  const row = normaliseRow(data);

  if (!row || !isRecord(data)) {
    throw new Error("[legal] detail response did not match expected shape");
  }

  return {
    ...row,
    body: Array.isArray(data.body) ? (data.body as LegalBlock[]) : [],
    sourceFileUrl: asString(data.sourceFileUrl),
    lastUpdated: asNumber(data.lastUpdated),
  };
}

export async function fetchLegalDocumentSlugByDocType(
  docType: LegalDocType,
): Promise<string | null> {
  const result = await fetchLegalDocuments({
    docType,
    limit: 1,
    sort: "-publishedAt",
  });

  return result?.items[0]?.slug ?? null;
}

/**
 * Resolve the canonical `/legal/<slug>` href for a document type at render
 * time, so links can be baked into the markup instead of pointing at a
 * redirect the browser has to follow on click.
 *
 * Returns `null` when no such document is published — or when the API is
 * unreachable, since `fetchLegalDocuments` swallows transport errors. Callers
 * MUST treat `null` as "omit the link entirely" rather than falling back to a
 * guessed slug: a link to a document that isn't published is a 404, and a
 * 404'd privacy policy is worse than no link at all.
 *
 * Wrapped in React `cache` so several surfaces in one render (footer, header,
 * a legal index) share a single upstream request.
 */
export const fetchLegalDocumentHrefByDocType = cache(
  async (docType: LegalDocType): Promise<string | null> => {
    const slug = await fetchLegalDocumentSlugByDocType(docType);
    return slug ? `/legal/${slug}` : null;
  },
);
