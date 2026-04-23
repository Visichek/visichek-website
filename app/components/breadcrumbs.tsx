import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface IBreadcrumbsProps {
  items: BreadcrumbItem[];
  align?: "start" | "center";
}

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ items, align = "start" }) => {
  if (!items?.length) return null;
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex w-full ${align === "center" ? "justify-center" : ""}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-[#6a6a6a]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded transition-colors duration-200 hover:text-[#2e7a11]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-medium text-[#1a1a1a]" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-[#c9c9c9]">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
