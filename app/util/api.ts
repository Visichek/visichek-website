/**
 * Public website API endpoints.
 *
 * The base host lives in `@/lib/utils` so blog, pricing, and
 * onboarding all read from a single source. Two version roots are
 * exposed because the backend keeps blog routes under `/api/v1`
 * while newer modules (pricing, onboarding) mount under `/v1`.
 *
 * Configuration:
 *   - `NEXT_PUBLIC_VISICHEK_API_HOST` — host only, no version
 *     suffix (e.g. `https://api.visichek.app`).
 */

import { API_LEGACY_V1, API_V1 } from "@/lib/utils";

// Back-compat: callers historically composed paths against `BASE_URL`
// as the legacy `/api/v1` root.
export const BASE_URL = API_LEGACY_V1;

export const BLOG_ENDPOINTS = {
  list: () => `${API_LEGACY_V1}/articles/content`,
  detail: (slugOrId: string) => `${API_LEGACY_V1}/articles/content/${slugOrId}`,
};

/**
 * Public plans endpoint kept for legacy callers. The pricing page now
 * renders from `PRICING_ENDPOINTS.marketing()` instead.
 */
export const PLANS_ENDPOINTS = {
  publicList: () => `${API_LEGACY_V1}/plans?public_only=true`,
};

/**
 * Pricing-marketing endpoint. Fully rendered payload — cards, prices,
 * comparison rows, CTAs — under the standard `{success, data}` envelope.
 */
export const PRICING_ENDPOINTS = {
  marketing: () => `${API_V1}/pricing-marketing`,
};

/**
 * Public FAQ endpoint. Returns a fully rendered payload — hero copy,
 * grouped sections, items with HTML answers, and a contact-us footer —
 * under the standard `{success, data}` envelope. No auth.
 */
export const FAQ_ENDPOINTS = {
  list: () => `${API_V1}/faqs`,
};

export const ONBOARDING_ENDPOINTS = {
  submissions: () => `${API_V1}/onboarding/submissions`,
};

export { API_HOST, API_V1, API_LEGACY_V1, apiUrl } from "@/lib/utils";
