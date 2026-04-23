import React from "react";
import { Blog } from "../types/blog";
import FeaturedStoryCard from "./featuredstorycard";

interface IFeaturedStoryGridProps {
  blogs: Blog[];
}

const FeaturedStoryGrid: React.FC<IFeaturedStoryGridProps> = ({ blogs }) => {
  if (!blogs?.length) return null;
  return (
    <section className="bg-white px-5 md:px-10 lg:px-16 pt-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {blogs.map((blog) => (
          <FeaturedStoryCard
            key={blog.id}
            ImgUrl={blog.featureImage.url}
            headerText={blog.title}
            paragraphText={blog.excerpt}
            href={`/blogs/${blog.id}`}
            categoryName={blog.category?.name}
            categorySlug={blog.category?.slug}
            dateCreated={blog.dateCreated}
            author={blog.author?.name}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedStoryGrid;
