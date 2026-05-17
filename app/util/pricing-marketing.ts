/**
 * Pricing-marketing payload fetcher.
 *
 * The backend renders the full marketing pricing page — hero copy,
 * cards, prices, comparison rows, CTAs — under a single endpoint.
 * The site just paints what comes back. Field names are camelCase and
 * the data sits under `{ success, data, message }`.
 *
 * On any failure (network, non-2xx, malformed envelope) this resolves
 * to `null` so the caller can fall back to a hardcoded snapshot
 * instead of rendering a broken page.
 */

import { PRICING_ENDPOINTS } from "./api";

export type PricingTier =
  | "free"
  | "starter"
  | "premium"
  | "enterprise"
  | (string & {});

export interface PricingPlan {
  planName: string;
  displayName: string;
  tier: PricingTier;
  tagline?: string | null;
  priceMonthly: number | null;
  priceYearly: number | null;
  currency: string;
  ctaLabel: string;
  ctaUrl?: string | null;
  badge?: string | null;
  highlightBullets: string[];
}

export interface PricingCell {
  planName: string;
  value: boolean | number | string | null;
  display: string;
}

export interface PricingRow {
  rowKey: string;
  label: string;
  description?: string | null;
  cells: PricingCell[];
}

export interface PricingSection {
  categoryKey: string;
  label: string;
  sortOrder?: number;
  rows: PricingRow[];
}

export interface PricingMarketingPayload {
  headline: string;
  subheadline: string;
  currency: string;
  plans: PricingPlan[];
  sections: PricingSection[];
  lastUpdated?: number;
}

const DEFAULT_HEADLINE = "Pricing for security-first teams";
const DEFAULT_SUBHEADLINE =
  "Scales with locations, departments, rollout needs, and the security workflow you need on day one.";

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

/**
 * The structural check the renderer needs to do its job. Headline and
 * subheadline are intentionally not required here — admins often
 * leave them blank early on and we default them at normalisation
 * time so the page still renders.
 */
function looksLikePayload(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.currency === "string" &&
    Array.isArray(p.plans) &&
    Array.isArray(p.sections)
  );
}

function normalisePayload(raw: unknown): PricingMarketingPayload {
  const p = raw as Record<string, unknown>;
  return {
    headline:
      typeof p.headline === "string" && p.headline.trim()
        ? (p.headline as string)
        : DEFAULT_HEADLINE,
    subheadline:
      typeof p.subheadline === "string" && p.subheadline.trim()
        ? (p.subheadline as string)
        : DEFAULT_SUBHEADLINE,
    currency: (p.currency as string) || "NGN",
    plans: (p.plans as PricingPlan[]) ?? [],
    sections: (p.sections as PricingSection[]) ?? [],
    lastUpdated:
      typeof p.lastUpdated === "number" ? (p.lastUpdated as number) : undefined,
  };
}

export async function fetchPricingMarketing(): Promise<PricingMarketingPayload | null> {
  const url = PRICING_ENDPOINTS.marketing();
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
        `[pricing-marketing] ${url} returned ${res.status}; falling back to default snapshot`,
      );
      return null;
    }

    const raw: unknown = await res.json();
    const inner = isEnvelope<unknown>(raw) ? raw.data : raw;
    if (!looksLikePayload(inner)) {
      console.error(
        "[pricing-marketing] response did not match expected shape; falling back to default snapshot",
      );
      return null;
    }
    return normalisePayload(inner);
  } catch (err) {
    console.error("[pricing-marketing] fetch threw:", err);
    return null;
  }
}

/**
 * Format a plan's monthly/yearly price for display. Naira (`NGN`)
 * uses the local symbol because Intl on some platforms renders the
 * ISO code instead of `₦`.
 */
export function formatPlanPrice(
  amount: number | null | undefined,
  currency: string,
): string {
  if (amount == null) return "Custom pricing";
  if ((currency || "").toUpperCase() === "NGN") {
    return `₦${Number(amount).toLocaleString("en-NG")}`;
  }
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Number(amount).toLocaleString("en-US")}`;
  }
}

/**
 * Yearly saving versus paying monthly for 12 months. Returns `null`
 * when either side is missing so callers can hide the badge.
 */
export function yearlySaving(plan: PricingPlan): number | null {
  if (plan.priceMonthly == null || plan.priceYearly == null) return null;
  const saving = plan.priceMonthly * 12 - plan.priceYearly;
  return saving > 0 ? saving : null;
}

/**
 * Last-known-good snapshot used while the backend endpoint is being
 * stood up (and as a safety net afterwards). Shape is identical to a
 * real payload so the same renderer handles both.
 */
export const DEFAULT_PRICING_PAYLOAD: PricingMarketingPayload = {
  headline: "Pricing for security-first teams",
  subheadline:
    "Scales with locations, departments, rollout needs, and the security workflow you need on day one.",
  currency: "NGN",
  plans: [
    {
      planName: "basic",
      displayName: "Basic",
      tier: "starter",
      tagline: "Single location · 1–3 departments",
      priceMonthly: 250000,
      priceYearly: null,
      currency: "NGN",
      ctaLabel: "Get started",
      ctaUrl: null,
      badge: "Early access",
      highlightBullets: [
        "QR code visitor registration",
        "QR checkout",
        "Searchable visitor logs",
        "CSV/Excel export",
        "2FA check-in/out system",
        "Department admin access",
        "Encrypted database",
        "Email support",
      ],
    },
    {
      planName: "advanced",
      displayName: "Advanced",
      tier: "premium",
      tagline: "Multi-location · Up to 100 departments per branch",
      priceMonthly: null,
      priceYearly: null,
      currency: "NGN",
      ctaLabel: "Get started",
      ctaUrl: null,
      badge: "Best for scale",
      highlightBullets: [
        "Everything in Basic, plus",
        "ID scanning and auto-extraction",
        "Hardware integration",
        "Automatic badge generation",
        "Up to 100 departments per branch",
        "Multi-location and branch management",
        "Active visitor tracking",
        "Priority support & dedicated manager",
        "Custom onboarding and training",
      ],
    },
    {
      planName: "enterprise",
      displayName: "Enterprise",
      tier: "enterprise",
      tagline: "Custom rollouts · Government & campus deployments",
      priceMonthly: null,
      priceYearly: null,
      currency: "NGN",
      ctaLabel: "Talk to sales",
      ctaUrl: "mailto:sales@visichek.com?subject=Talk%20to%20sales",
      badge: null,
      highlightBullets: [
        "Everything in Advanced, plus",
        "Private cloud deployment",
        "API access for integrations",
        "SAML SSO & advanced RBAC",
        "Custom data retention policies",
        "Dedicated implementation team",
        "Contractual uptime SLAs",
      ],
    },
  ],
  sections: [
    {
      categoryKey: "capacity",
      label: "Capacity & limits",
      sortOrder: 10,
      rows: [
        {
          rowKey: "cap.branches",
          label: "Branches / locations",
          description: null,
          cells: [
            { planName: "basic", value: 1, display: "1" },
            { planName: "advanced", value: null, display: "Multi-location" },
            { planName: "enterprise", value: null, display: "Custom" },
          ],
        },
        {
          rowKey: "cap.departments",
          label: "Departments per branch",
          description: null,
          cells: [
            { planName: "basic", value: 3, display: "Up to 3" },
            { planName: "advanced", value: 100, display: "Up to 100" },
            { planName: "enterprise", value: null, display: "Custom" },
          ],
        },
        {
          rowKey: "cap.admins",
          label: "Department admin seats",
          description: null,
          cells: [
            { planName: "basic", value: true, display: "✓" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
      ],
    },
    {
      categoryKey: "checkin",
      label: "Check-in & verification",
      sortOrder: 20,
      rows: [
        {
          rowKey: "checkin.qr",
          label: "QR check-in / check-out",
          description: null,
          cells: [
            { planName: "basic", value: true, display: "✓" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "checkin.2fa",
          label: "2FA check-in/out",
          description: null,
          cells: [
            { planName: "basic", value: true, display: "✓" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "checkin.id_scan",
          label: "ID scanning & auto-extraction",
          description: "Reads Nigerian government IDs and fills the visitor form.",
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "checkin.badge",
          label: "Automatic badge printing",
          description: null,
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "checkin.hardware",
          label: "Hardware integration",
          description: "Turnstiles, access-control doors, barcode scanners.",
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
      ],
    },
    {
      categoryKey: "operations",
      label: "Operations & reporting",
      sortOrder: 30,
      rows: [
        {
          rowKey: "ops.logs",
          label: "Searchable visitor logs",
          description: null,
          cells: [
            { planName: "basic", value: true, display: "✓" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "ops.export",
          label: "CSV / Excel export",
          description: null,
          cells: [
            { planName: "basic", value: true, display: "✓" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "ops.active_tracking",
          label: "Active visitor tracking",
          description: null,
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "ops.host_notify",
          label: "Host email notifications",
          description: null,
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
      ],
    },
    {
      categoryKey: "security",
      label: "Security & compliance",
      sortOrder: 40,
      rows: [
        {
          rowKey: "sec.encrypted",
          label: "Encrypted database",
          description: null,
          cells: [
            { planName: "basic", value: true, display: "✓" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "sec.rbac",
          label: "Role-based access control",
          description: null,
          cells: [
            { planName: "basic", value: "Basic", display: "Basic" },
            { planName: "advanced", value: "Advanced", display: "Advanced" },
            { planName: "enterprise", value: "Custom", display: "Custom" },
          ],
        },
        {
          rowKey: "sec.sso",
          label: "SAML SSO",
          description: null,
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: false, display: "—" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "sec.retention",
          label: "Custom data retention",
          description: null,
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: false, display: "—" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "sec.private_cloud",
          label: "Private cloud deployment",
          description: null,
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: false, display: "—" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
      ],
    },
    {
      categoryKey: "support",
      label: "Support",
      sortOrder: 50,
      rows: [
        {
          rowKey: "sup.tier",
          label: "Support tier",
          description: null,
          cells: [
            { planName: "basic", value: "Email", display: "Email" },
            { planName: "advanced", value: "Priority", display: "Priority" },
            { planName: "enterprise", value: "24/7", display: "24/7" },
          ],
        },
        {
          rowKey: "sup.manager",
          label: "Dedicated account manager",
          description: null,
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "sup.onboarding",
          label: "Custom onboarding & training",
          description: null,
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: true, display: "✓" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
        {
          rowKey: "sup.sla",
          label: "Contractual uptime SLA",
          description: null,
          cells: [
            { planName: "basic", value: false, display: "—" },
            { planName: "advanced", value: false, display: "—" },
            { planName: "enterprise", value: true, display: "✓" },
          ],
        },
      ],
    },
  ],
};
