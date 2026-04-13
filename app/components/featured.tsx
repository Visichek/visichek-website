import BillboardHero from "./leadstory";
import PortraitStoryCard from "./portraitstorycard";
import { Blog } from "../types/blog";
import { BASE_URL } from "../util/api";

const Featured = async () => {
  let blogs: Blog[];
  const url = `${BASE_URL}/articles/content/by-blog-type/featured?start=0&stop=4`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Failed to load recent stories.</p>
      </section>
    );
  }

  try {
    const data = await res.json();
    blogs = data.data?.blogs || [];
  } catch (error) {
    console.error("Failed to parse featured stories data:", error);
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Something went wrong loading the content.</p>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  const billBoardFeaturedData = blogs[0];
  const portraitStoryData = blogs.slice(1, 4);

  return (
    <section className="bg-white px-5 md:px-32 pt-16">
      <div className="flex justify-between items-center border-b border-b-gray-300 pt-2 pb-3 sticky top-[78px] lg:top-[70px] z-40 bg-white">
        <p className="text-sm font-semibold text-black">FEATURED STORY</p>
      </div>
      <div>
        <BillboardHero
          title={billBoardFeaturedData.title}
          excerpt={billBoardFeaturedData.excerpt}
          author={billBoardFeaturedData.author.name}
          imageUrl={billBoardFeaturedData.featureImage.url}
          href={`/blogs/${billBoardFeaturedData.id}`}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-5 pb-10">
        {portraitStoryData.map((data) => (
          <PortraitStoryCard
            key={data.slug}
            image={data.featureImage.url}
            title={data.title}
            excerpt={data.excerpt}
            author={data.author.name}
            href={`/blogs/${data.id}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Featured;
