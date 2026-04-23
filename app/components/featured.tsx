import BillboardHero from "./leadstory";
import PortraitStoryCard from "./portraitstorycard";
import BlogSectionHeader from "./blogsectionheader";
import { Blog } from "../types/blog";
import { BASE_URL } from "../util/api";

const Featured = async () => {
  let blogs: Blog[] = [];
  const url = `${BASE_URL}/articles/content/by-blog-type/featured?start=0&stop=4`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return (
        <section className="py-10 text-center text-[#6a6a6a]">
          <p>Failed to load featured stories.</p>
        </section>
      );
    }

    const data = await res.json();
    blogs = data.data?.blogs || [];
  } catch (error) {
    console.error("Failed to load featured stories data:", error);
    return (
      <section className="py-10 text-center text-[#6a6a6a]">
        <p>Couldn&apos;t load featured stories right now.</p>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="bg-white px-5 md:px-10 lg:px-16 pt-16 pb-12">
        <BlogSectionHeader
          eyebrow="Featured"
          title="Hand-picked stories"
          description="Editorial favourites chosen by the VisiChek team."
        />
        <p className="py-10 text-center text-[14px] text-[#6a6a6a]">
          No featured stories yet — check back later.
        </p>
      </section>
    );
  }

  const billBoardFeaturedData = blogs[0];
  const portraitStoryData = blogs.slice(1, 4);

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
        eyebrow="Featured story"
        categoryName={billBoardFeaturedData.category?.name}
        categorySlug={billBoardFeaturedData.category?.slug}
        dateCreated={billBoardFeaturedData.dateCreated}
      />
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
    </section>
  );
};

export default Featured;
