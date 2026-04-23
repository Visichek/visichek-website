import Image from "next/image";
import Breadcrumbs from "@/app/components/breadcrumbs";

interface ICategoryLargeCard {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  articleCount?: number;
}

const CategoryLargeCard: React.FC<ICategoryLargeCard> = ({
  imageSrc,
  imageAlt,
  title,
  articleCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-white pt-[104px] md:pt-[120px] pb-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(900px 340px at 50% -10%, rgba(58,150,21,0.07), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="mb-6">
          <Breadcrumbs
            align="center"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: title },
            ]}
          />
        </div>

        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#2e7a11] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3A9615]" />
            Topic
          </span>
          <h1 className="mx-auto mt-4 font-serif text-[34px] md:text-[48px] lg:text-[58px] font-bold leading-[1.03] tracking-[-0.025em] text-[#1a1a1a]">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-relaxed text-[#6a6a6a]">
            {articleCount !== undefined
              ? `${articleCount} ${articleCount === 1 ? "story" : "stories"} in `
              : "The latest stories, guides and updates in "}
            <span className="font-medium text-[#1a1a1a]">{title.toLowerCase()}</span>.
          </p>
        </div>

        <div className="relative mx-auto overflow-hidden rounded-3xl border border-[#e8e8e8] bg-[#f5f5f5] shadow-[0_20px_60px_-24px_rgba(0,0,0,0.15)]">
          <div className="relative aspect-[21/8]">
            <Image
              src={imageSrc}
              alt={imageAlt || `${title} category`}
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

export default CategoryLargeCard;
