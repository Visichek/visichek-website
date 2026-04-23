import Image from "next/image";
import ShareButton from "./sharebutton";
import Breadcrumbs from "@/app/components/breadcrumbs";
import CategoryChip from "@/app/components/categorychip";
import { formatDateShort } from "@/app/util/date";

interface IBlogLargeCard {
  id: string;
  excerpt: string;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  author?: string;
  authorAvatar?: string;
  authorAffiliation?: string;
  categoryName?: string;
  categorySlug?: string;
  dateCreated?: number;
  readingMinutes?: number;
}

const BlogLargeCard: React.FC<IBlogLargeCard> = ({
  id,
  imageSrc,
  imageAlt,
  title,
  excerpt,
  author,
  authorAvatar,
  authorAffiliation,
  categoryName,
  categorySlug,
  dateCreated,
  readingMinutes,
}) => {
  return (
    <section className="bg-white pt-[104px] md:pt-[120px] pb-10">
      <div className="mx-auto max-w-[1040px] px-5 md:px-8">
        <div className="mb-6">
          <Breadcrumbs
            align="center"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              ...(categoryName
                ? [
                    {
                      label: categoryName,
                      href: categorySlug
                        ? `/articles/${categorySlug}`
                        : undefined,
                    },
                  ]
                : []),
              { label: "Article" },
            ]}
          />
        </div>

        <header className="mx-auto mb-8 max-w-[820px] text-center">
          {categoryName && (
            <div className="mb-4 flex justify-center">
              <CategoryChip
                name={categoryName}
                slug={categorySlug}
                size="md"
              />
            </div>
          )}
          <h1 className="font-serif text-[30px] md:text-[44px] lg:text-[52px] font-bold leading-[1.05] tracking-[-0.025em] text-[#1a1a1a]">
            {title}
          </h1>
          {excerpt && (
            <p className="mx-auto mt-5 max-w-[680px] text-[15px] md:text-[16.5px] leading-relaxed text-[#6a6a6a]">
              {excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[13px] text-[#6a6a6a]">
            {author && (
              <div className="flex items-center gap-2.5">
                {authorAvatar ? (
                  <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-[#e8e8e8]">
                    <Image
                      src={authorAvatar}
                      alt={author}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3A9615]/10 text-[11px] font-semibold text-[#2e7a11] ring-1 ring-[#3A9615]/15">
                    {author?.[0]?.toUpperCase() || "V"}
                  </div>
                )}
                <span className="font-semibold text-[#1a1a1a]">{author}</span>
                {authorAffiliation && (
                  <span className="text-[#6a6a6a]">· {authorAffiliation}</span>
                )}
              </div>
            )}
            {dateCreated && (
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[#c9c9c9]"
                />
                <span>{formatDateShort(dateCreated)}</span>
              </span>
            )}
            {readingMinutes && (
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[#c9c9c9]"
                />
                <span>{readingMinutes} min read</span>
              </span>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <ShareButton id={id} title={title} excerpt={excerpt} />
          </div>
        </header>

        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-[#e8e8e8] bg-[#f5f5f5] shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)]">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={imageSrc}
              alt={imageAlt || title || "Blog Image"}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogLargeCard;
