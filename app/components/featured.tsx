import { Blog } from "../types/blog";
import { BASE_URL } from "../util/api";
import FeaturedView from "./featured-view";

const Featured = async () => {
  let blogs: Blog[] = [];
  const url = `${BASE_URL}/articles/content/by-blog-type/featured?start=0&stop=4`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    blogs = data.data?.blogs || [];
  } catch (error) {
    console.error("Failed to load featured stories data:", error);
    return null;
  }

  // No featured stories? Render nothing — silent is better than a shrug.
  if (blogs.length === 0) {
    return null;
  }

  return <FeaturedView blogs={blogs} />;
};

export default Featured;
