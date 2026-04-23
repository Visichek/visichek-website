import Link from "next/link";

interface IBlogSectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  align?: "start" | "center";
  sticky?: boolean;
}

const BlogSectionHeader: React.FC<IBlogSectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  align = "start",
  sticky = false,
}) => {
  return (
    <div
      className={`${
        sticky
          ? "sticky top-[78px] lg:top-[70px] z-40 bg-white/85 backdrop-blur"
          : ""
      } border-b border-[#e8e8e8]`}
    >
      <div
        className={`flex flex-col gap-4 py-5 md:flex-row md:items-end ${
          align === "center"
            ? "md:justify-center text-center"
            : "md:justify-between"
        }`}
      >
        <div className={align === "center" ? "mx-auto max-w-[640px]" : ""}>
          <p className="mb-1.5 text-[11.5px] font-semibold uppercase tracking-widest text-[#3A9615]">
            {eyebrow}
          </p>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1a1a1a]">
            {title}
          </h2>
          {description && (
            <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed text-[#6a6a6a]">
              {description}
            </p>
          )}
        </div>
        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#e8e8e8] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] transition-all duration-200 hover:border-[#3A9615]/30 hover:text-[#2e7a11] hover:shadow-sm"
          >
            {actionLabel}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogSectionHeader;
