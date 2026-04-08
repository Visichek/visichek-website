import Image from "next/image";
import Link from "next/link";

interface PortraitStoryCardProps {
  image: string;
  title: string;
  excerpt: string;
  author: string;
  href: string;
}

const PortraitStoryCard = ({
  image,
  title,
  excerpt,
  author,
  href,
}: PortraitStoryCardProps) => {
  return (
    <article className="group w-full overflow-hidden border border-gray-300 hover:border-black transition-colors duration-200">
      <Link href={href} className="block">
        {/* Image Container – Fixed aspect ratio so height never jumps */}
        <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
            // Optional: placeholder="blur" blurDataURL="..." if you want shimmer
          />
        </div>

        {/* Text Content */}
        <div className="px-6 pb-6 pt-4 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 leading-tight line-clamp-2">
            {title}
          </h2>

          <p className="text-base text-gray-600 leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            {author}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default PortraitStoryCard;
