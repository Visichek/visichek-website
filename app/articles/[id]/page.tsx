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
      <section>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-400 text-lg mb-2">📭</div>
          <h3 className="text-white text-xl font-semibold mb-2">
            No categories found
          </h3>
          <p className="text-gray-400">
            We couldn't find any categories matching your criteria.
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
