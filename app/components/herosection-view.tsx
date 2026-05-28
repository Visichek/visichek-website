"use client";

import { Blog } from "../types/blog";
import ArticleLinkCard from "./articlelinkcard";
import FeaturedStoryGrid from "./featuredstorygrid";
import { useBlogFilter } from "./blog-filter-context";

const HeroSectionView = ({ blogs }: { blogs: Blog[] }) => {
  const { matches } = useBlogFilter();
  const filtered = blogs.filter((b) => matches(b.category?.slug));

  // No hero stories match the active topic filter — render nothing.
  if (filtered.length === 0) {
    return null;
  }

  const mainArticle = filtered[0];
  const featuredArticles = filtered.slice(1, 4);

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

export default HeroSectionView;
