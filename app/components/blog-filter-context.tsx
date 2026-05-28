"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Shared state for the blog topic filter. Selecting topic chips in the hero
 * adjusts which curated stories the sections below show.
 *
 * `selected` holds category slugs. An empty array means "All" — no filtering,
 * every section shows its full curated set.
 */
type BlogFilterValue = {
  /** Currently selected category slugs. Empty === "All". */
  selected: string[];
  /** True when nothing is selected (the default, unfiltered "All" view). */
  isAll: boolean;
  /** Toggle a single category slug on/off (multi-select). */
  toggle: (slug: string) => void;
  /** Clear the selection — back to the "All" view. */
  selectAll: () => void;
  /** Whether a given slug is currently selected. */
  isSelected: (slug: string) => boolean;
  /** Whether an item with this category slug passes the current filter. */
  matches: (slug?: string | null) => boolean;
};

const BlogFilterContext = createContext<BlogFilterValue | null>(null);

export function BlogFilterProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((slug: string) => {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug],
    );
  }, []);

  const selectAll = useCallback(() => setSelected([]), []);

  const value = useMemo<BlogFilterValue>(
    () => ({
      selected,
      isAll: selected.length === 0,
      toggle,
      selectAll,
      isSelected: (slug: string) => selected.includes(slug),
      matches: (slug?: string | null) =>
        selected.length === 0 || (slug != null && selected.includes(slug)),
    }),
    [selected, toggle, selectAll],
  );

  return (
    <BlogFilterContext.Provider value={value}>
      {children}
    </BlogFilterContext.Provider>
  );
}

export function useBlogFilter(): BlogFilterValue {
  const ctx = useContext(BlogFilterContext);
  if (!ctx) {
    throw new Error("useBlogFilter must be used within a BlogFilterProvider");
  }
  return ctx;
}
