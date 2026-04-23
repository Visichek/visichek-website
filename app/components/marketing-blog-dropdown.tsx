"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { BASE_URL } from "../util/api";
import type { Blog, Category } from "../types/blog";
import { formatDateShort } from "../util/date";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

interface MarketingBlogDropdownProps {
  isActive: boolean;
  isGlass: boolean;
}

const FALLBACK_IMAGE = "/hands_raised.webp";

const CATEGORY_BLURB: Record<string, string> = {
  default: "Stories, guides and playbooks.",
};

function blurbFor(slug: string) {
  return CATEGORY_BLURB[slug] || CATEGORY_BLURB.default;
}

export default function MarketingBlogDropdown({
  isActive,
  isGlass,
}: MarketingBlogDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Blog | null>(null);
  const [loaded, setLoaded] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [catsRes, heroRes] = await Promise.all([
          fetch(`${BASE_URL}/articles/content/categories`, {
            cache: "force-cache",
          }),
          fetch(`${BASE_URL}/articles/content/by-blog-type/hero-section`, {
            cache: "force-cache",
          }),
        ]);

        const cats: Category[] = catsRes.ok
          ? (await catsRes.json())?.data?.listOfCategories || []
          : [];

        let heroPick: Blog | null = null;
        if (heroRes.ok) {
          const heroData = await heroRes.json();
          const blogs: Blog[] = (heroData?.data?.blogs || []).sort(
            (a: Blog, b: Blog) => (a.itemIndex ?? 999) - (b.itemIndex ?? 999),
          );
          heroPick = blogs[0] || null;
        }

        if (!cancelled) {
          setCategories(cats.slice(0, 6));
          setFeatured(heroPick);
          setLoaded(true);
        }
      } catch {
        if (!cancelled) setLoaded(true);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleEnter() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsOpen(true);
  }
  function handleLeave() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setIsOpen(false), 140);
  }

  const showCategories = loaded && categories.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger */}
      <Link
        href="/blog"
        className="group relative flex items-center gap-1"
        onFocus={handleEnter}
        onBlur={handleLeave}
      >
        <span
          className="absolute -inset-x-2.5 -inset-y-1 rounded-full transition-all duration-300"
          style={{
            background: isActive
              ? isGlass
                ? "rgba(255,255,255,0.55)"
                : "rgba(58,150,21,0.07)"
              : "transparent",
            boxShadow: isActive
              ? isGlass
                ? "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)"
                : "none"
              : "none",
            border: isActive
              ? isGlass
                ? "1px solid rgba(255,255,255,0.5)"
                : "1px solid rgba(58,150,21,0.12)"
              : "1px solid transparent",
            transform: isActive ? "scale(1)" : "scale(0.92)",
            opacity: isActive ? 1 : 0,
            transitionTimingFunction: EASE,
          }}
        />
        <span
          className="relative z-[1] transition-all duration-300"
          style={{
            fontSize: "13.5px",
            fontWeight: isActive ? 600 : 500,
            color: isActive
              ? isGlass
                ? "#111827"
                : "#2e7a11"
              : isGlass
                ? "#1f2937"
                : "#4b5563",
            transitionTimingFunction: EASE,
          }}
        >
          Blog
        </span>
        <ChevronDown
          className="relative z-[1] h-3.5 w-3.5 transition-transform duration-300"
          style={{
            color: isActive
              ? isGlass
                ? "#111827"
                : "#2e7a11"
              : isGlass
                ? "#1f2937"
                : "#4b5563",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
        {!isActive && (
          <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-center scale-x-0 rounded-full bg-[#3A9615]/40 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        )}
      </Link>

      {mounted &&
        createPortal(
          <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            {/* Hover bridge — lets the mouse travel from the trigger down into the panel without closing */}
            <div
              aria-hidden="true"
              className="fixed left-1/2 z-[60] h-6 w-[900px] max-w-[94vw] -translate-x-1/2"
              style={{
                top: "calc(var(--nav-bottom, 68px) - 6px)",
                pointerEvents: isOpen ? "auto" : "none",
              }}
            />

            {/* Dropdown panel — portaled to <body> so it escapes the header's transformed ancestor and is truly viewport-centered */}
            <div
              className="fixed left-1/2 z-[70]"
              style={{
                top: "var(--nav-bottom, 72px)",
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
                transform: `translateX(-50%) translateY(${isOpen ? "0px" : "-6px"})`,
                transition: `opacity 0.28s ${EASE}, transform 0.28s ${EASE}`,
              }}
            >
        <div
          className="w-[860px] max-w-[94vw] overflow-hidden rounded-2xl border border-black/5 bg-white/95 backdrop-blur-xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18),0_8px_20px_-8px_rgba(0,0,0,0.08)]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 400px at -10% -30%, rgba(58,150,21,0.06), transparent 55%), radial-gradient(900px 300px at 120% -20%, rgba(58,150,21,0.04), transparent 55%)",
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 items-center rounded-full bg-[#3A9615]/10 px-2 text-[10.5px] font-semibold uppercase tracking-widest text-[#2e7a11]">
                Blog
              </span>
              <span className="text-[12.5px] text-[#6a6a6a]">
                Insights, guides &amp; stories
              </span>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#2e7a11] hover:text-[#22610d]"
            >
              View all posts
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Body: two columns when featured exists, single-column otherwise */}
          <div className={featured ? "grid grid-cols-12 gap-0" : "p-4"}>
            {/* Featured panel — only when we actually have a featured story */}
            {featured && (
              <div className="col-span-12 border-b border-[#f0f0f0] p-4 md:col-span-5 md:border-b-0 md:border-r md:p-5">
                <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-widest text-[#6a6a6a]">
                  Featured story
                </p>
                <Link
                  href={`/blogs/${featured.id}`}
                  className="group block overflow-hidden rounded-xl ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.22)]"
                >
                  <div className="relative aspect-[16/10] bg-[#f2f2f2]">
                    <Image
                      src={featured.featureImage?.url || FALLBACK_IMAGE}
                      alt={
                        featured.featureImage?.altText ||
                        featured.title ||
                        "Featured"
                      }
                      fill
                      sizes="(max-width: 768px) 92vw, 380px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="bg-white p-4">
                    {featured.category?.name && (
                      <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-[#2e7a11]">
                        {featured.category.name}
                      </p>
                    )}
                    <p className="line-clamp-2 font-serif text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#2e7a11]">
                      {featured.title}
                    </p>
                    {featured.excerpt && (
                      <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-[#6a6a6a]">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-[11.5px] text-[#6a6a6a]">
                      {featured.author?.avatarUrl && (
                        <span className="relative h-5 w-5 overflow-hidden rounded-full ring-1 ring-black/5">
                          <Image
                            src={featured.author.avatarUrl}
                            alt={featured.author.name || "Author"}
                            fill
                            sizes="20px"
                            className="object-cover"
                          />
                        </span>
                      )}
                      {featured.author?.name && (
                        <span className="font-medium text-[#374151]">
                          {featured.author.name}
                        </span>
                      )}
                      {featured.dateCreated && (
                        <>
                          <span aria-hidden="true" className="text-[#c9c9c9]">
                            ·
                          </span>
                          <span>{formatDateShort(featured.dateCreated)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Categories panel */}
            <div
              className={
                featured
                  ? "col-span-12 p-3 md:col-span-7 md:p-4"
                  : "p-0"
              }
            >
              <p className="mb-2 px-1 text-[10.5px] font-semibold uppercase tracking-widest text-[#6a6a6a]">
                Browse topics
              </p>
              <div
                className={
                  featured
                    ? "grid grid-cols-1 gap-1"
                    : "grid grid-cols-1 gap-1 md:grid-cols-2"
                }
              >
                {showCategories
                  ? categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/articles/${c.slug}`}
                        className="group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-[#fafafa]"
                      >
                        <div className="relative h-[56px] w-[80px] flex-shrink-0 overflow-hidden rounded-lg bg-[#f2f2f2] ring-1 ring-black/5">
                          <Image
                            src={c.imageUrl || FALLBACK_IMAGE}
                            alt={c.name}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13.5px] font-semibold text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#2e7a11]">
                            {c.name}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-[12px] leading-relaxed text-[#6a6a6a]">
                            {blurbFor(c.slug)}
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="ml-1 text-[14px] text-[#b8b8b8] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#2e7a11]"
                        >
                          →
                        </span>
                      </Link>
                    ))
                  : Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex animate-pulse items-center gap-3 rounded-xl p-2.5"
                      >
                        <div className="h-[56px] w-[80px] flex-shrink-0 rounded-lg bg-[#f2f2f2]" />
                        <div className="flex-1">
                          <div className="h-3 w-2/3 rounded bg-[#efefef]" />
                          <div className="mt-2 h-2.5 w-4/5 rounded bg-[#f3f3f3]" />
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div className="flex items-center justify-between gap-3 border-t border-[#f0f0f0] bg-[#fafafa]/60 px-6 py-3">
            <p className="text-[12px] text-[#6a6a6a]">
              Fresh perspectives on visitor management &amp; workplace security.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-sm shadow-green-700/15 transition-all duration-200 hover:-translate-y-px hover:shadow-md"
            >
              Read the blog
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
