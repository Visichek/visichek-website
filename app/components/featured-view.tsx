"use client";

import BillboardHero from "./leadstory";
import PortraitStoryCard from "./portraitstorycard";
import BlogSectionHeader from "./blogsectionheader";
import { Blog } from "../types/blog";
import { useBlogFilter } from "./blog-filter-context";

const FeaturedView = ({ blogs }: { blogs: Blog[] }) => {
  const { matches } = useBlogFilter();
  const filtered = blogs.filter((b) => matches(b.category?.slug));

  // No featured stories match the active topic filter — render nothing.
  if (filtered.length === 0) {
    return null;
  }

  const billBoardFeaturedData = filtered[0];
  const portraitStoryData = filtered.slice(1, 4);

  return (
    <section className="bg-white px-5 md:px-10 lg:px-16 pt-16">
      <BlogSectionHeader
        eyebrow="Featured"
        title="Hand-picked stories"
        description="Editorial favourites chosen by the VisiChek team."
        actionLabel="View all"
        actionHref="/blog#latest"
        sticky
      />
      <BillboardHero
        title={billBoardFeaturedData.title}
        excerpt={billBoardFeaturedData.excerpt}
        author={billBoardFeaturedData.author.name}
        imageUrl={billBoardFeaturedData.featureImage.url}
        href={`/blogs/${billBoardFeaturedData.id}`}
        categoryName={billBoardFeaturedData.category?.name}
        categorySlug={billBoardFeaturedData.category?.slug}
        dateCreated={billBoardFeaturedData.dateCreated}
      />
      {portraitStoryData.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 pb-20">
          {portraitStoryData.map((data) => (
            <PortraitStoryCard
              key={data.slug}
              image={data.featureImage.url}
              title={data.title}
              excerpt={data.excerpt}
              author={data.author.name}
              href={`/blogs/${data.id}`}
              categoryName={data.category?.name}
              categorySlug={data.category?.slug}
              dateCreated={data.dateCreated}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedView;
