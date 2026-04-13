"use client";

import { Blog } from "@/app/types/blog";
import { BASE_URL } from "@/app/util/api";
import { useState } from "react";
import CategoryCard from "./categorycard";
import NextButton from "./nextbutton";

const BlogList = ({
  initialBlogs,
  categoryId,
}: {
  initialBlogs: Blog[];
  categoryId: string;
}) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [start, setStart] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL}/articles/content/by-category-slug/${categoryId}?start=${start}&stop=${
          start + 9
        }`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const newBlogs: Blog[] = data.data?.blogs || [];

      if (newBlogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prev) => [...prev, ...newBlogs]);
        setStart((prev) => prev + 10);
      }
    } catch (err) {
      console.error("Load more failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-5 lg:px-28 2xl:px-36 mt-6">
      <div className="flex justify-start items-center border-b border-b-gray-300 pt-2 pb-3 sticky top-[78px] lg:top-[70px] z-40 bg-white">
        <p className="text-sm font-semibold text-black">ALL ARTICLES</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogs.map((blog, index) => (
          <CategoryCard
            key={index}
            image={blog.featureImage.url}
            title={blog.title}
            excerpt={blog.excerpt}
            author={blog.author.name}
            href={`/blogs/${blog.id}`}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center items-center py-8">
          <NextButton onClick={loadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Next"}
          </NextButton>
        </div>
      )}

      {!hasMore && (
        <p className="text-center py-8 text-gray-500">
          You've reached the end!
        </p>
      )}
    </div>
  );
};

export default BlogList;
