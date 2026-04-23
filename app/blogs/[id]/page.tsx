import BlogLargeCard from "./components/bloglargecard";
import Featured from "@/app/components/featured";
import AuthorCard from "./components/authorcard";
import { BASE_URL } from "@/app/util/api";
import { BlogApiResponse, BlogItem } from "@/app/types/blocknoteblog";
import BlockNoteRenderer from "./components/blocknoterenderer";
import ReadingProgress from "./components/readingprogress";
import { estimateReadingTime } from "@/app/util/readingTime";

interface IBlogPageByIdProps {
  params: Promise<{ id: string }>;
}

const BlogPageById: React.FC<IBlogPageByIdProps> = async ({ params }) => {
  const { id } = await params;

  let blog: BlogItem;
  const url = `${BASE_URL}/articles/content/${id}`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <section className="bg-white pt-[140px] pb-24 text-center">
        <div className="mx-auto max-w-[480px] px-6">
          <h2 className="font-serif text-[26px] font-bold tracking-[-0.02em] text-[#1a1a1a]">
            Couldn&apos;t load this article
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6a6a6a]">
            Please try again in a moment, or head back to the blog.
          </p>
        </div>
      </section>
    );
  }

  try {
    const data: BlogApiResponse = await res.json();
    blog = data.data || [];
  } catch (error) {
    console.error("Failed to load blogs", error);
    return (
      <section className="bg-white pt-[140px] pb-24 text-center">
        <div className="mx-auto max-w-[480px] px-6">
          <h2 className="font-serif text-[26px] font-bold tracking-[-0.02em] text-[#1a1a1a]">
            Something went wrong
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6a6a6a]">
            We couldn&apos;t load this article.
          </p>
        </div>
      </section>
    );
  }

  if (!blog) {
    return null;
  }

  const readingMinutes = estimateReadingTime(blog.currentPageBody);

  return (
    <main className="min-h-screen bg-white">
      <ReadingProgress targetId="blog-article-body" />
      <BlogLargeCard
        id={id}
        imageSrc={blog.featureImage.url}
        title={blog.title}
        excerpt={blog.excerpt}
        imageAlt={`Image showing ${blog.featureImage.altText}`}
        author={blog.author.name}
        authorAvatar={blog.author.avatarUrl}
        authorAffiliation={blog.author.affiliation}
        categoryName={blog.category?.name}
        categorySlug={blog.category?.slug}
        dateCreated={blog.dateCreated}
        readingMinutes={readingMinutes}
      />
      <section
        id="blog-article-body"
        className="mx-auto max-w-[1100px] px-5 md:px-8 pb-20"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-[110px]">
              <AuthorCard
                name={blog.author.name}
                avatarUrl={blog.author.avatarUrl}
                affiliation={blog.author.affiliation}
                date={blog.dateCreated}
                readingMinutes={readingMinutes}
              />
            </div>
          </aside>
          <article className="lg:col-span-9 prose prose-neutral max-w-none">
            <BlockNoteRenderer content={blog.currentPageBody} />
          </article>
        </div>
      </section>
      <div className="mx-auto max-w-[1470px] 2xl:max-w-[1470px]">
        <Featured />
      </div>
    </main>
  );
};

export default BlogPageById;
