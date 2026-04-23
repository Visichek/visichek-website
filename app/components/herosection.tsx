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
      return (
        <section className="py-10 text-center text-[#6a6a6a]">
          <p>Failed to load featured stories.</p>
        </section>
      );
    }

    const data = await res.json();
    blogs = (data.data?.blogs || []).sort(
      (a: Blog, b: Blog) => (a.itemIndex ?? 999) - (b.itemIndex ?? 999)
    );
  } catch (error) {
    console.error("Failed to load hero section data:", error);
    return (
      <section className="py-10 text-center text-[#6a6a6a]">
        <p>Couldn&apos;t load featured stories right now.</p>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="px-5 md:px-10 lg:px-16 py-16 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[#e8e8e8] bg-[#fafafa] p-10">
          <p className="text-[14px] text-[#6a6a6a]">
            No articles available yet — check back later.
          </p>
        </div>
      </section>
    );
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
