import React from "react";
import CategoryLargeCard from "./components/categorylargecard";
import { BASE_URL } from "@/app/util/api";
import { Blog } from "@/app/types/blog";
import BlogList from "./components/bloglist";

interface Props {
  params: Promise<{ id: string }>;
}

const CategoryPage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;

  console.log("Article ID:", id);

  let blogs: Blog[];
  const url = `${BASE_URL}/articles/content/by-category-slug/${id}?start=${0}&stop=${9}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Failed to load blogs for {id}.</p>
      </section>
    );
  }

  try {
    const data = await res.json();
    blogs = data.data?.blogs || [];
  } catch (error) {
    console.error("Failed to load blogs", error);
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Something went wrong loading the content.</p>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="bg-white min-h-[60vh] pt-[120px] pb-16">
        <div className="mx-auto max-w-[560px] px-6 text-center">
          <div className="text-4xl mb-3">📭</div>
          <h3 className="font-serif text-[24px] md:text-[28px] font-bold tracking-[-0.02em] text-[#1a1a1a] mb-2">
            No articles yet
          </h3>
          <p className="text-[15px] leading-relaxed text-[#6a6a6a]">
            We couldn&apos;t find any articles in this category. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  const categoryName = blogs[0].category.name;
  const categoryImage = blogs[0].category.imageUrl;
  console.log("[CategoryPage] category image for", id, "->", categoryImage);

  return (
    <section className="bg-white">
      <div>
        <CategoryLargeCard
          title={categoryName}
          imageSrc={categoryImage || "/hands_raised.webp"}
          imageAlt={`${id} image`}
        />
      </div>
      <div>
        <BlogList categoryId={id} initialBlogs={blogs} />
      </div>
    </section>
  );
};

export default CategoryPage;
