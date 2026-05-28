import { BASE_URL } from "../util/api";
import type { Category } from "../types/blog";
import CategoryChips from "./categorychips";

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

  return <CategoryChips categories={top} />;
};

export default BlogCategoryStrip;
