"use client";

import BillboardHero from "./leadstory";
import PortraitStoryCard from "./portraitstorycard";
import BlogSectionHeader from "./blogsectionheader";
import { Blog } from "../types/blog";
import { useBlogFilter } from "./blog-filter-context";

const MostRecentView = ({ blogs }: { blogs: Blog[] }) => {
  const { matches } = useBlogFilter();
  const filtered = blogs.filter((b) => matches(b.category?.slug));

  // Nothing in this section matches the active topic filter — render nothing
  // so adjacent sections flow cleanly.
  if (filtered.length === 0) {
    return null;
  }

  const billBoardRecentData = filtered[0];
  const portraitStoryData = filtered.slice(1, 4);

  return (
    <section className="bg-white px-5 md:px-10 lg:px-16 pt-16">
      <BlogSectionHeader
        eyebrow="Most recent"
        title="Fresh off the press"
        description="The latest thinking on visitor management and workplace security."
        sticky
      />
      <BillboardHero
        title={billBoardRecentData.title}
        excerpt={billBoardRecentData.excerpt}
        author={billBoardRecentData.author.name}
        imageUrl={billBoardRecentData.featureImage.url}
        href={`/blogs/${billBoardRecentData.id}`}
        categoryName={billBoardRecentData.category?.name}
        categorySlug={billBoardRecentData.category?.slug}
        dateCreated={billBoardRecentData.dateCreated}
      />
      {portraitStoryData.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 pb-4">
          {portraitStoryData.map((blog, index) => (
            <PortraitStoryCard
              key={index}
              image={blog.featureImage.url}
              title={blog.title}
              excerpt={blog.excerpt}
              author={blog.author.name}
              href={`/blogs/${blog.id}`}
              categoryName={blog.category?.name}
              categorySlug={blog.category?.slug}
              dateCreated={blog.dateCreated}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MostRecentView;
