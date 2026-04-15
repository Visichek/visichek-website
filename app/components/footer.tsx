import Link from "next/link";
import React from "react";
import { BASE_URL } from "../util/api";
import { CategoryApiResponse } from "../types/category";

const Footer: React.FC = async () => {
  const res = await fetch(`${BASE_URL}/articles/content/categories`, {
    next: { revalidate: 60 },
  });

  let allCategories = [];
  if (res.ok) {
    const data: CategoryApiResponse = await res.json();
    allCategories = data.data.listOfCategories;
  } else {
    console.error("Failed to fetch categories:", res.status);
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Something went wrong loading the content.</p>
      </section>
    );
  }

  const getRandomItems = (array: any[], count: any) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  const moreCategories = getRandomItems(allCategories.splice(0, 5), 5);

  return (
    <footer className="bg-[#1A1A1A] text-gray-400 mt-6">
      <div className="hidden md:flex flex-col items-center py-8 px-2">
        <div className="mb-14 border-t border-t-gray-400 w-full relative px-8">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] px-3 text-white font-bold text-base tracking-tight leading-none">
            visiChek
          </span>
        </div>
        <div className="flex flex-col items-center gap-4 text-sm uppercase tracking-wider">
          <div className="flex justify-center gap-8">
            {moreCategories.map((category, index) => (
              <div className="flex flex-col gap-4" key={index}>
                <Link
                  href={`/articles/${category.slug}`}
                  className="hover:text-white transition"
                >
                  {category.name} Articles
                </Link>
                <Link
                  href={`/videos/${category.slug}`}
                  className="hover:text-white transition"
                >
                  {category.name} Videos
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500 w-full border-t border-t-gray-400 pt-3">
          <p className="text-center">
            Visichek, © {new Date().getFullYear()} All
            rights reserved.
          </p>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col items-center py-8">
        <div className="mb-14 border-t border-t-gray-400 w-full relative px-8">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] px-3 text-white font-bold text-base tracking-tight leading-none">
            visiChek
          </span>
        </div>
        <div className="grid grid-cols-2 gap-7 text-xs uppercase tracking-wider text-center px-6 w-full max-w-md">
          {moreCategories.map((category, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <Link
                href={`/articles/${category.slug}`}
                className="hover:text-white transition"
              >
                {category.name} Articles
              </Link>
              <Link
                href={`/videos/${category.slug}`}
                className="hover:text-white transition"
              >
                {category.name} Videos
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-xs text-gray-500 w-full border-t border-t-gray-400 pt-3">
          <p className="text-center">
            Visichek, © {new Date().getFullYear()} All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
