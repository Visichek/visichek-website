import { Blog } from "../types/blog";
import { BASE_URL } from "../util/api";
import MostRecentView from "./mostrecent-view";

const MostRecent = async () => {
  let blogs: Blog[] = [];
  const url = `${BASE_URL}/articles/content/by-blog-type/normal?start=0&stop=10&sort=newest `;

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
    console.error("Failed to load recent stories data:", error);
    return null;
  }

  // No recent stories? Render nothing so adjacent sections flow cleanly.
  if (blogs.length === 0) {
    return null;
  }

  return <MostRecentView blogs={blogs} />;
};

export default MostRecent;
