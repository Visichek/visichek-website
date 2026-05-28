"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Header surface preference. `glass` shows the frosted GlassSurface bar;
 * `plain` shows a solid white bar. Persisted in a cookie so the choice
 * survives reloads and is sharable across the marketing pages.
 */
export type HeaderTheme = "glass" | "plain";

const COOKIE_NAME = "vc_header_theme";
const DEFAULT_THEME: HeaderTheme = "glass";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
/** Fires whenever the preference changes so every mounted toggle stays in sync. */
const SYNC_EVENT = "visicheck:header-theme";

/** Read the saved preference from the cookie (falls back to the default). */
export function readHeaderTheme(): HeaderTheme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  const value = match?.split("=")[1];
  return value === "plain" || value === "glass" ? value : DEFAULT_THEME;
}

/** Persist the preference and notify any other listeners in the page. */
export function writeHeaderTheme(theme: HeaderTheme): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
  window.dispatchEvent(new CustomEvent<HeaderTheme>(SYNC_EVENT, { detail: theme }));
}

/**
 * Subscribe to the header theme preference. Starts at {@link DEFAULT_THEME}
 * for both SSR and the first client render (so there's no hydration
 * mismatch), then hydrates from the cookie after mount.
 */
export function useHeaderTheme() {
  const [theme, setTheme] = useState<HeaderTheme>(DEFAULT_THEME);

  useEffect(() => {
    setTheme(readHeaderTheme());
    const sync = () => setTheme(readHeaderTheme());
    window.addEventListener(SYNC_EVENT, sync);
    return () => window.removeEventListener(SYNC_EVENT, sync);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: HeaderTheme = prev === "glass" ? "plain" : "glass";
      writeHeaderTheme(next);
      return next;
    });
  }, []);

  return { theme, isGlass: theme === "glass", toggleTheme };
}
