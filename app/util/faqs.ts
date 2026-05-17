/**
 * FAQ payload fetcher.
 *
 * The backend renders the full FAQ page — hero copy, grouped sections,
 * items with HTML answers, and a contact-us footer — under a single
 * endpoint. The site just paints what comes back. Field names are
 * camelCase and the data sits under `{ success, data, message }`.
 *
 * On any failure (network, non-2xx, malformed envelope) this resolves
 * to `null` so the caller can fall back to a hardcoded snapshot
 * instead of rendering a broken page.
 */

import { FAQ_ENDPOINTS } from "./api";

export interface FaqItem {
  itemKey: string;
  question: string;
  answer: string;
  sortOrder?: number;
}

export interface FaqSection {
  categoryKey: string;
  label: string;
  sortOrder?: number;
  items: FaqItem[];
}

export interface FaqPayload {
  headline: string;
  subheadline?: string | null;
  footerHtml?: string | null;
  sections: FaqSection[];
  lastUpdated?: number;
}

const DEFAULT_HEADLINE = "Frequently asked questions";

interface BackendEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

function isEnvelope<T>(value: unknown): value is BackendEnvelope<T> {
  return (
    !!value &&
    typeof value === "object" &&
    "data" in (value as Record<string, unknown>)
  );
}

function looksLikePayload(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return Array.isArray(p.sections);
}

function normalisePayload(raw: unknown): FaqPayload {
  const p = raw as Record<string, unknown>;
  return {
    headline:
      typeof p.headline === "string" && p.headline.trim()
        ? (p.headline as string)
        : DEFAULT_HEADLINE,
    subheadline:
      typeof p.subheadline === "string" && p.subheadline.trim()
        ? (p.subheadline as string)
        : null,
    footerHtml:
      typeof p.footerHtml === "string" && p.footerHtml.trim()
        ? (p.footerHtml as string)
        : null,
    sections: (p.sections as FaqSection[]) ?? [],
    lastUpdated:
      typeof p.lastUpdated === "number" ? (p.lastUpdated as number) : undefined,
  };
}

export async function fetchFaqs(): Promise<FaqPayload | null> {
  const url = FAQ_ENDPOINTS.list();
  // In dev we always go to the network so editorial changes show up on
  // the next refresh; in prod we let Next ISR cache for 5 minutes.
  const fetchOpts: RequestInit & { next?: { revalidate: number } } =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" }
      : { next: { revalidate: 300 } };

  try {
    const res = await fetch(url, fetchOpts);
    if (!res.ok) {
      console.error(
        `[faqs] ${url} returned ${res.status}; falling back to default snapshot`,
      );
      return null;
    }

    const raw: unknown = await res.json();
    const inner = isEnvelope<unknown>(raw) ? raw.data : raw;
    if (!looksLikePayload(inner)) {
      console.error(
        "[faqs] response did not match expected shape; falling back to default snapshot",
      );
      return null;
    }
    return normalisePayload(inner);
  } catch (err) {
    console.error("[faqs] fetch threw:", err);
    return null;
  }
}

/**
 * Last-known-good snapshot used while the backend endpoint is being
 * stood up (and as a safety net afterwards). Shape is identical to a
 * real payload so the same renderer handles both. Answers use the
 * plain text the marketing site shipped with — the live payload may
 * use HTML.
 */
export const DEFAULT_FAQ_PAYLOAD: FaqPayload = {
  headline: "Frequently asked questions",
  subheadline: null,
  footerHtml: null,
  sections: [
    {
      categoryKey: "general",
      label: "General",
      sortOrder: 10,
      items: [
        {
          itemKey: "general-hardware",
          question: "Do we need special hardware to use VisiChek?",
          answer:
            "No. VisiChek works with standard reception laptops, tablets, webcams, and badge printers. If your building already uses QR scanners, access control doors, or turnstiles, VisiChek can integrate with them as part of an upgraded setup.",
          sortOrder: 10,
        },
        {
          itemKey: "general-id-verification",
          question: "Can VisiChek verify Nigerian government-issued IDs?",
          answer:
            "Yes. VisiChek is designed to support government-issued identification commonly used in Nigeria and extracts visitor information automatically during check-in.",
          sortOrder: 20,
        },
        {
          itemKey: "general-multi-department",
          question: "Can multiple departments or branches use the same system?",
          answer:
            "Yes. Each department manages its own visitors independently, while administrators maintain company-wide visibility. VisiChek also supports multi-branch setups from a single centralized dashboard.",
          sortOrder: 30,
        },
      ],
    },
    {
      categoryKey: "security",
      label: "Security & compliance",
      sortOrder: 20,
      items: [
        {
          itemKey: "security-data-storage",
          question: "Where is our visitor data stored, and is it NDPA compliant?",
          answer:
            "VisiChek supports encrypted visitor records, role-based access control, and configurable data retention policies. For organizations with compliance requirements, deployment options can support local hosting or approved infrastructure aligned with NDPA expectations.",
          sortOrder: 10,
        },
      ],
    },
    {
      categoryKey: "billing",
      label: "Billing & pricing",
      sortOrder: 30,
      items: [
        {
          itemKey: "billing-how-priced",
          question: "How is VisiChek priced?",
          answer:
            "VisiChek uses a subscription model based on your organization’s setup, including number of departments, locations, and check-in workflow requirements such as QR or hardware integrations. Most organizations start with a reception-level deployment and expand as needed.",
          sortOrder: 10,
        },
      ],
    },
  ],
};
