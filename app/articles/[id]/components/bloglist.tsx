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
    <div className="mx-auto max-w-[1200px] px-5 md:px-8 pb-20">
      <div className="sticky top-[78px] lg:top-[70px] z-40 flex items-end justify-between border-b border-[#e8e8e8] bg-white/85 backdrop-blur pb-4 pt-5">
        <div>
          <p className="mb-1 text-[11.5px] font-semibold uppercase tracking-widest text-[#3A9615]">
            All articles
          </p>
          <h2 className="font-serif text-[22px] md:text-[26px] font-bold tracking-[-0.02em] text-[#1a1a1a]">
            {blogs.length} {blogs.length === 1 ? "story" : "stories"} in this topic
          </h2>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <CategoryCard
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

      {hasMore && (
        <div className="flex items-center justify-center py-10">
          <NextButton onClick={loadMore} disabled={isLoading}>
            {isLoading ? "Loading…" : "Load more"}
          </NextButton>
        </div>
      )}

      {!hasMore && (
        <p className="py-10 text-center text-[14px] text-[#6a6a6a]">
          You&apos;ve reached the end.
        </p>
      )}
    </div>
  );
};

export default BlogList;
