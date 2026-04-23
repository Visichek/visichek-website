import { Blog } from "../types/blog";
import { BASE_URL } from "../util/api";
import ArticleLinkCard from "./articlelinkcard";
import FeaturedStoryGrid from "./featuredstorygrid";

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

  const mainArticle = blogs[0];
  const featuredArticles = blogs.slice(1, 4);

  return (
    <section>
      <ArticleLinkCard
        imageSrc={mainArticle.featureImage.url}
        href={`/blogs/${mainArticle.id}`}
        title={mainArticle.title}
        author={mainArticle.author.name}
        authorAvatar={mainArticle.author.avatarUrl}
        excerpt={mainArticle.excerpt}
        categoryName={mainArticle.category?.name}
        categorySlug={mainArticle.category?.slug}
        dateCreated={mainArticle.dateCreated}
      />
      <FeaturedStoryGrid blogs={featuredArticles} />
    </section>
  );
};

export default HeroSection;
