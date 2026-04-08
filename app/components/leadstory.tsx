import Image from "next/image";
import Link from "next/link";

interface BillboardHeroProps {
  title: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  href: string;
}

const BillboardHero = ({
  title,
  excerpt,
  author,
  imageUrl,
  href,
}: BillboardHeroProps) => {
  return (
    <section className="relative w-full overflow-hidden">
      <Link href={href}>
        <div className="mx-auto mt-5">
          <div className="grid gap-1 lg:grid-cols-6 lg:gap-12 border border-gray-300">
            <div className="text-black flex flex-col justify-between py-5 px-5 col-span-2 order-2">
              <div className="lg:max-w-2xl">
                <h1 className="text-xl leading-tight tracking-tight lg:text-2xl">
                  {title}
                </h1>
                <p className="text-[0.85rem] leading-relaxed text-gray-500 mt-3">
                  {excerpt}
                </p>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <p className="text-sm uppercase tracking-normal text-gray-500">
                  {author}
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 col-span-4">
              <div className="relative overflow-hidden ">
                <Image
                  src={imageUrl}
                  alt={title}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105 w-full"
                  height={600}
                  width={600}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default BillboardHero;
