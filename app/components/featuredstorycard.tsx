import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import CategoryChip from "./categorychip";
import { formatDateShort } from "../util/date";

interface IFeaturedStoryCard {
  ImgUrl: string;
  headerText: string;
  paragraphText: string;
  href: string;
  className?: string;
  categoryName?: string;
  categorySlug?: string;
  dateCreated?: number;
  author?: string;
}

const FeaturedStoryCard: React.FC<IFeaturedStoryCard> = ({
  ImgUrl,
  headerText,
  paragraphText,
  href,
  className,
  categoryName,
  categorySlug,
  dateCreated,
  author,
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "group flex w-full flex-col overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white transition-all duration-300 hover:border-[#d8d8d8] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-[3px]",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f5f5f5]">
        <Image
          src={ImgUrl}
          alt={headerText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          priority
        />
        {categoryName && (
          <span className="absolute left-4 top-4">
            <CategoryChip name={categoryName} slug={categorySlug} />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h2 className="font-serif text-[22px] md:text-[24px] font-bold leading-[1.15] tracking-[-0.01em] text-[#1a1a1a] line-clamp-2 transition-colors duration-200 group-hover:text-[#2e7a11]">
          {headerText}
        </h2>
        <p className="text-[14px] leading-relaxed text-[#6a6a6a] line-clamp-3">
          {paragraphText}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#f0f0f0] pt-4">
          <div className="min-w-0">
            {author && (
              <p className="truncate text-[12.5px] font-semibold text-[#374151]">
                {author}
              </p>
            )}
            {dateCreated && (
              <p className="truncate text-[11.5px] text-[#6a6a6a]">
                {formatDateShort(dateCreated)}
              </p>
            )}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-[#3A9615] transition-colors duration-200 group-hover:text-[#2e7a11]">
            Read
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedStoryCard;
