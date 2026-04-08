import Image from "next/image";
import Link from "next/link";

interface IArticleLinkCard {
  imageSrc: string;
  title: string;
  author: string;
  href: string;
}

const ArticleLinkCard: React.FC<IArticleLinkCard> = ({
  imageSrc,
  author,
  href,
  title,
}) => {
  return (
    <div className="h-[60dvh] lg:h-dvh max-h-[700px] w-full overflow-hidden">
      <Link href={href} className="group relative block h-full">
        <Image
          src={imageSrc}
          alt="Letter to my younger self – Aaron Donald"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-sm md:text-xl text-white/90 font-medium">
              By {author}
            </p>
            <p className="mt-2 font-semibold lg:font-light lg:mt-6 text-white/80 group-hover:text-white transition-colors">
              Read now →
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleLinkCard;
