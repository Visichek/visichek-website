import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Canonical API host for every backend call the website makes (blog,
 * pricing, onboarding). Override per environment via
 * `NEXT_PUBLIC_VISICHEK_API_HOST` — no trailing slash, no version
 * suffix (e.g. `https://api.visichek.app`).
 */
const DEFAULT_API_HOST = "https://api.visichek.app";

function readEnv(name: string): string | undefined {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export const API_HOST = stripTrailingSlash(
  (readEnv("NEXT_PUBLIC_VISICHEK_API_HOST") || "").trim() || DEFAULT_API_HOST,
);

/**
 * Build an absolute URL against {@link API_HOST}. Accepts either the
 * full path (`/v1/...`) or a bare segment — both compose correctly.
 */
export function apiUrl(path: string): string {
  if (!path) return API_HOST;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_HOST}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Versioned API roots. Two coexist because the backend mounts older
 * blog routes under `/api/v1` while newer modules (onboarding,
 * pricing) live under `/v1`.
 */
export const API_V1 = apiUrl("/v1");
export const API_LEGACY_V1 = apiUrl("/api/v1");
