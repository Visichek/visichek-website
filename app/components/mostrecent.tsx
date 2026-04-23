import BillboardHero from "./leadstory";
import PortraitStoryCard from "./portraitstorycard";
import BlogSectionHeader from "./blogsectionheader";
import { Blog } from "../types/blog";
import { BASE_URL } from "../util/api";

const MostRecent = async () => {
  let blogs: Blog[] = [];
  const url = `${BASE_URL}/articles/content/by-blog-type/normal?start=0&stop=10&sort=newest `;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    blogs = data.data?.blogs || [];
  } catch (error) {
    console.error("Failed to load recent stories data:", error);
    return null;
  }

  // No recent stories? Render nothing so adjacent sections flow cleanly.
  if (blogs.length === 0) {
    return null;
  }

  const billBoardRecentData = blogs[0];
  const portraitStoryData = blogs.slice(1, 4);

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
    </section>
  );
};

export default MostRecent;
