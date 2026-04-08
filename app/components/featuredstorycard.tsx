import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface IFeaturedStoryCard {
  ImgUrl: string;
  headerText: string;
  paragraphText: string;
  href: string;
  className?: string;
}

const FeaturedStoryCard: React.FC<IFeaturedStoryCard> = ({
  ImgUrl,
  headerText,
  paragraphText,
  href,
  className,
}) => {
  return (
    <div
      className={clsx("relative aspect-4/5 w-full overflow-hidden", className)}
    >
      <Link href={href} className="group relative block h-full w-full">
        <Image
          src={ImgUrl}
          alt={headerText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight line-clamp-3">
              {headerText}
            </h1>
            <p className="text-sm truncate sm:text-base md:text-lg lg:text-xl text-white/90 font-medium text-center">
              {paragraphText}
            </p>
            <p className="mt-4 text-sm md:text-base text-white/70 group-hover:text-white transition-colors font-medium text-center">
              Read now →
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedStoryCard;
