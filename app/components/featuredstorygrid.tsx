import React from "react";
import { Blog } from "../types/blog";
import FeaturedStoryCard from "./featuredstorycard";

interface IFeaturedStoryGridProps {
  blogs: Blog[];
}

const FeaturedStoryGrid: React.FC<IFeaturedStoryGridProps> = ({ blogs }) => {
  return (
    <section className="pt-2">
      <div className="flex flex-col md:flex-row gap-2">
        {blogs.map((blog) => (
          <FeaturedStoryCard
            key={blog.id}
            ImgUrl={blog.featureImage.url}
            headerText={blog.title}
            paragraphText={blog.excerpt}
            href={`/blogs/${blog.id}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedStoryGrid;
