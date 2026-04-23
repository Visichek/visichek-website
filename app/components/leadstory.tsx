import Image from "next/image";
import Link from "next/link";
import CategoryChip from "./categorychip";
import { formatDateShort } from "../util/date";

interface BillboardHeroProps {
  title: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  href: string;
  eyebrow?: string;
  categoryName?: string;
  categorySlug?: string;
  dateCreated?: number;
}

const BillboardHero = ({
  title,
  excerpt,
  author,
  imageUrl,
  href,
  eyebrow = "Lead story",
  categoryName,
  categorySlug,
  dateCreated,
}: BillboardHeroProps) => {
  return (
    <section className="relative w-full">
      <Link href={href} className="block">
        <div className="mt-6">
          <article className="group grid gap-0 overflow-hidden rounded-3xl border border-[#e8e8e8] bg-white transition-all duration-300 hover:border-[#d8d8d8] hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] lg:grid-cols-12">
            {/* Image */}
            <div className="relative order-1 col-span-12 overflow-hidden bg-[#f5f5f5] lg:order-2 lg:col-span-7">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                />
                <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#2e7a11] shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3A9615]" />
                  {eyebrow}
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="order-2 col-span-12 flex flex-col justify-between gap-6 p-6 md:p-10 lg:order-1 lg:col-span-5 lg:p-12">
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
                <h2 className="font-serif text-[24px] md:text-[30px] lg:text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1a1a1a]">
                  {title}
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#6a6a6a] line-clamp-4">
                  {excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-[#f0f0f0] pt-5">
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-[#1a1a1a]">
                    {author}
                  </p>
                  {dateCreated && (
                    <p className="truncate text-[11.5px] text-[#6a6a6a]">
                      {formatDateShort(dateCreated)}
                    </p>
                  )}
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-[#3A9615] transition-colors duration-200 group-hover:text-[#2e7a11]">
                  Read story
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </article>
        </div>
      </Link>
    </section>
  );
};

export default BillboardHero;
