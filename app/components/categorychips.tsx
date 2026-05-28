"use client";

import type { Category } from "../types/blog";
import { useBlogFilter } from "./blog-filter-context";

const baseChip =
  "inline-flex items-center rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-all duration-200";

function chipClass(active: boolean): string {
  return active
    ? `${baseChip} border-[#3A9615] bg-[#3A9615] text-white shadow-sm`
    : `${baseChip} border-[#e8e8e8] bg-white text-[#374151] hover:border-[#3A9615]/30 hover:text-[#2e7a11] hover:shadow-sm`;
}

const CategoryChips = ({ categories }: { categories: Category[] }) => {
  const { isAll, isSelected, toggle, selectAll } = useBlogFilter();

  return (
    <nav
      aria-label="Blog categories"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <span className="text-[11.5px] font-semibold uppercase tracking-widest text-[#6a6a6a]">
        Topics:
      </span>

      <button
        type="button"
        onClick={selectAll}
        aria-pressed={isAll}
        className={chipClass(isAll)}
      >
        All
      </button>

      {categories.map((c) => {
        const active = isSelected(c.slug);
        return (
          <button
            key={c.slug}
            type="button"
            onClick={() => toggle(c.slug)}
            aria-pressed={active}
            className={chipClass(active)}
          >
            {c.name}
          </button>
        );
      })}
    </nav>
  );
};

export default CategoryChips;
