import Image from "next/image";
import Link from "next/link";
import CategoryChip from "./categorychip";
import { formatDateShort } from "../util/date";

interface IArticleLinkCard {
  imageSrc: string;
  title: string;
  author: string;
  authorAvatar?: string;
  href: string;
  excerpt?: string;
  categoryName?: string;
  categorySlug?: string;
  dateCreated?: number;
}

const ArticleLinkCard: React.FC<IArticleLinkCard> = ({
  imageSrc,
  author,
  authorAvatar,
  href,
  title,
  excerpt,
  categoryName,
  categorySlug,
  dateCreated,
}) => {
  return (
    <section className="bg-white px-5 md:px-10 lg:px-16 pt-8">
      <Link
        href={href}
        className="group block overflow-hidden rounded-3xl border border-[#e8e8e8] bg-white transition-all duration-300 hover:border-[#d8d8d8] hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]"
      >
        <div className="grid lg:grid-cols-5">
          {/* Image */}
          <div className="relative aspect-[16/10] lg:col-span-3 lg:aspect-auto lg:min-h-[480px] overflow-hidden bg-[#f5f5f5]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Subtle vignette so the image reads crisply against the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(26,26,26,0.05) 100%)",
              }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-between gap-6 p-6 md:p-10 lg:col-span-2 lg:p-12">
            <div>
              {categoryName && (
                <div className="mb-4">
                  <CategoryChip
                    name={categoryName}
                    slug={categorySlug}
                    size="md"
                  />
                </div>
              )}
              <h1 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.05] tracking-[-0.025em] text-[#1a1a1a]">
                {title}
              </h1>
              {excerpt && (
                <p className="mt-4 text-[14.5px] leading-relaxed text-[#6a6a6a] line-clamp-3">
                  {excerpt}
                </p>
              )}
            </div>

            {/* Meta + CTA */}
            <div className="flex flex-col gap-5 border-t border-[#f0f0f0] pt-5">
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-[#e8e8e8]">
                    <Image
                      src={authorAvatar}
                      alt={author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#3A9615]/10 text-[13px] font-semibold text-[#2e7a11] ring-1 ring-[#3A9615]/15">
                    {author?.[0]?.toUpperCase() || "V"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-[#1a1a1a]">
                    {author}
                  </p>
                  <p className="truncate text-[12px] text-[#6a6a6a]">
                    {dateCreated ? formatDateShort(dateCreated) : "VisiChek team"}
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-4 py-2 text-[13px] font-semibold text-white shadow-sm shadow-green-700/20 transition-all duration-200 group-hover:-translate-y-px group-hover:shadow-md">
                Read story
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ArticleLinkCard;
