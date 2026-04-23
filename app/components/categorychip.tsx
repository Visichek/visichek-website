import Link from "next/link";

interface ICategoryChipProps {
  name: string;
  slug?: string;
  size?: "sm" | "md";
  tone?: "light" | "solid";
}

const CategoryChip: React.FC<ICategoryChipProps> = ({
  name,
  slug,
  size = "sm",
  tone = "light",
}) => {
  const sizeClass =
    size === "md"
      ? "px-2.5 py-1 text-[11.5px]"
      : "px-2 py-[3px] text-[10.5px]";
  const toneClass =
    tone === "solid"
      ? "bg-[#3A9615] text-white"
      : "bg-[#3A9615]/10 text-[#2e7a11]";

  const baseClass = `inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-widest transition-colors duration-200 ${sizeClass} ${toneClass}`;

  const content = (
    <span className={baseClass}>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current opacity-60" />
      {name}
    </span>
  );

  if (!slug) return content;

  return (
    <Link
      href={`/articles/${slug}`}
      className="inline-flex items-center transition-transform duration-200 hover:scale-[1.03]"
      onClick={(e) => e.stopPropagation()}
    >
      {content}
    </Link>
  );
};

export default CategoryChip;
