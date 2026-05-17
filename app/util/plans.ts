/**
 * Public plan fetch for the marketing pricing page (Issue 9).
 *
 * Pulls active, `is_public: true` plans from the app backend so the
 * pricing component can render real data instead of hardcoded copy.
 * Server-rendered with a 5-minute ISR revalidation budget so the
 * marketing page stays fast but reflects pricing updates within a
 * few minutes of publish.
 *
 * When the backend is unreachable or returns a malformed payload,
 * `fetchPublicPlans` resolves to an empty array — the pricing
 * component should fall back to its static cards so the page never
 * goes blank during an API hiccup.
 */

import { PLANS_ENDPOINTS } from "./api";

export type BillingCycle = "monthly" | "yearly";

export type PlanTier =
  | "free"
  | "starter"
  | "professional"
  | "enterprise"
  | "custom";

/**
 * Minimal subset of the backend `PlanOut` envelope the pricing page
 * needs. Defined narrowly on purpose: the public marketing site only
 * displays a name, price, tier, and a few highlights.
 */
export interface PublicPlan {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  tier: PlanTier;
  monthlyPriceMinor?: number;
  yearlyPriceMinor?: number;
  currency: string;
  isPublic: boolean;
  status: string;
  featureHighlights?: string[];
  order?: number;
}

interface BackendEnvelope<T> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
}

function isEnvelope<T>(value: unknown): value is BackendEnvelope<T> {
  return (
    !!value &&
    typeof value === "object" &&
    "data" in (value as Record<string, unknown>)
  );
}

/**
 * Fetch the publicly displayable plans.
 *
 * Returns `[]` on any failure mode (network error, non-2xx, malformed
 * shape) so the caller can render the static fallback without having
 * to catch.
 */
export async function fetchPublicPlans(): Promise<PublicPlan[]> {
  try {
    const res = await fetch(PLANS_ENDPOINTS.publicList(), {
      // ISR — re-fetch after 5 minutes. Editorial pricing changes
      // propagate within that window without re-deploying the site.
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];

    const raw: unknown = await res.json();
    const items = isEnvelope<PublicPlan[]>(raw) ? raw.data : raw;
    if (!Array.isArray(items)) return [];

    return items
      .filter(
        (p): p is PublicPlan =>
          !!p &&
          typeof p === "object" &&
          typeof (p as { id?: unknown }).id === "string" &&
          (p as { isPublic?: boolean }).isPublic !== false &&
          (p as { status?: string }).status === "active",
      )
      .sort(
        (a, b) =>
          (a.order ?? Number.MAX_SAFE_INTEGER) -
          (b.order ?? Number.MAX_SAFE_INTEGER),
      );
  } catch {
    return [];
  }
}

/**
 * Format a minor-units integer as a currency string suitable for the
 * marketing card. Naira (`NGN`) is special-cased to use the local
 * Naira symbol because Intl on some platforms renders "NGN" instead.
 */
export function formatPlanPrice(
  amountMinor: number | undefined,
  currency: string,
): string {
  if (amountMinor == null) return "Custom pricing";
  const major = amountMinor / 100;
  if (currency.toUpperCase() === "NGN") {
    return `₦${major.toLocaleString("en-NG")}`;
  }
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(major);
  } catch {
    return `${currency} ${major.toLocaleString("en-US")}`;
  }
}
