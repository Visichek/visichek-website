import Link from "next/link";
import { BASE_URL } from "../util/api";
import type { Category } from "../types/blog";

const BlogCategoryStrip = async () => {
  let categories: Category[] = [];
  try {
    const res = await fetch(`${BASE_URL}/articles/content/categories`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = await res.json();
      categories = data?.data?.listOfCategories || [];
    }
  } catch (e) {
    categories = [];
  }

  if (!categories.length) return null;

  const top = categories.slice(0, 7);

  return (
    <nav
      aria-label="Blog categories"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <span className="text-[11.5px] font-semibold uppercase tracking-widest text-[#6a6a6a]">
        Topics:
      </span>
      {top.map((c) => (
        <Link
          key={c.slug}
          href={`/articles/${c.slug}`}
          className="group inline-flex items-center gap-1.5 rounded-full border border-[#e8e8e8] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#374151] transition-all duration-200 hover:border-[#3A9615]/30 hover:text-[#2e7a11] hover:shadow-sm"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#3A9615]/70 transition-colors group-hover:bg-[#3A9615]" />
          {c.name}
        </Link>
      ))}
    </nav>
  );
};

export default BlogCategoryStrip;
