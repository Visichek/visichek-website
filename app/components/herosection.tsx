import { Blog } from "../types/blog";
import { BASE_URL } from "../util/api";
import HeroSectionView from "./herosection-view";

const HeroSection = async () => {
  let blogs: Blog[] = [];
  const url = `${BASE_URL}/articles/content/by-blog-type/hero-section`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    blogs = (data.data?.blogs || []).sort(
      (a: Blog, b: Blog) => (a.itemIndex ?? 999) - (b.itemIndex ?? 999)
    );
  } catch (error) {
    console.error("Failed to load hero section data:", error);
    return null;
  }

  // Silently render nothing when this section has no content — the
  // page-level empty state handles the truly-no-content-anywhere case.
  if (blogs.length === 0) {
    return null;
  }

  return <HeroSectionView blogs={blogs} />;
};

export default HeroSection;
