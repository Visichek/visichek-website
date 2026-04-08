import { Blog, HeroSectionResponse } from "../types/blog";
import { BASE_URL } from "../util/api";
import ArticleLinkCard from "./articlelinkcard";
import FeaturedStoryGrid from "./featuredstorygrid";

const HeroSection = async () => {
  let blogs: Blog[];
  const url = `${BASE_URL}/api/v1/articles/content/by-blog-type/hero-section`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Failed to load featured stories.</p>
      </section>
    );
  }

  try {
    const data = await res.json();
    blogs = (data.data?.blogs || []).sort(
      (a: Blog, b: Blog) => (a.itemIndex ?? 999) - (b.itemIndex ?? 999)
    );
  } catch (error) {
    console.error("Failed to parse hero section data:", error);
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Something went wrong loading the content.</p>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  const mainArticle = blogs[0];
  const featuredArticles = blogs.slice(1, 4);

  return (
    <section>
      <ArticleLinkCard
        imageSrc={mainArticle.featureImage.url}
        href={`/blogs/${mainArticle.id}`}
        title={mainArticle.title}
        author={mainArticle.author.name}
      />
      <FeaturedStoryGrid blogs={featuredArticles} />
    </section>
  );
};

export default HeroSection;
