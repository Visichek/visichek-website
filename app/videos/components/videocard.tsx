import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
  image: string;
  title: string;
  excerpt?: string;
  author?: string;
  href: string;
}

const VideoCard = ({ image, title, excerpt, author, href }: VideoCardProps) => {
  return (
    <article className="w-full group cursor-pointer overflow-hidden border border-gray-300 hover:border-black transition duration-150">
      <Link href={href} className="block">
        <div className="relative overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            height={600}
            width={600}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover w-full h-80 md:h-52 transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        </div>
        <div className="mt-3 space-y-3 px-6 pb-2 flex flex-col justify-between">
          <h2 className="text-xl text-gray-900 leading-tight line-clamp-2">
            {title}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          <p className="pt-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {author}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default VideoCard;
