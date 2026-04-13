import BlogLargeCard from "./components/bloglargecard";
import Featured from "@/app/components/featured";
import AuthorCard from "./components/authorcard";
import { BASE_URL } from "@/app/util/api";
import { BlogApiResponse, BlogItem } from "@/app/types/blocknoteblog";
import BlockNoteRenderer from "./components/blocknoterenderer";

interface IBlogPageByIdProps {
  params: Promise<{ id: string }>;
}

const BlogPageById: React.FC<IBlogPageByIdProps> = async ({ params }) => {
  const { id } = await params;

  console.log("Category ID:", id);

  let blog: BlogItem;
  const url = `${BASE_URL}/articles/content/${id}`;
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
    const data: BlogApiResponse = await res.json();
    blog = data.data || [];
  } catch (error) {
    console.error("Failed to load blogs", error);
    return (
      <section className="py-10 text-center text-gray-500">
        <p>Something went wrong loading the content.</p>
      </section>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <section className="2xl:max-w-[1470px] mx-auto">
      <BlogLargeCard
        id={id}
        imageSrc={blog.featureImage.url}
        title={blog.title}
        excerpt={blog.excerpt}
        imageAlt={`Image showing ${blog.featureImage.altText}`}
      />
      <section className="flex flex-col lg:gap-10 lg:grid relative lg:grid-cols-12 bg-white px-4 py-5">
        <div className="lg:col-span-2 pb-10 md:pb-0">
          <AuthorCard
            name={blog.author.name}
            avatarUrl={blog.author.avatarUrl}
            affiliation={blog.author.affiliation}
            date={blog.dateCreated}
          />
        </div>
        <article className="lg:col-span-10 bg-white">
          <BlockNoteRenderer content={blog.currentPageBody} />
        </article>
      </section>
      <section>
        <Featured />
      </section>
    </section>
  );
};

export default BlogPageById;
