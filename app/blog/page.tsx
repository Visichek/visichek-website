import Featured from "../components/featured";
import BlogHeroSection from "../components/herosection";
import MostRecent from "../components/mostrecent";
import BlogCategoryStrip from "../components/blogcategorystrip";
import Link from "next/link";
import { BASE_URL } from "../util/api";

const blogTitle = "Blog | VisiChek";
const blogDescription =
  "Insights, guides, and stories about visitor management, workplace security, and facility operations — written by the team building VisiChek.";

export const metadata = {
  title: blogTitle,
  description: blogDescription,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: blogTitle,
    description: blogDescription,
    url: "https://visichek.app/blog",
    siteName: "VisiChek",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/visichek-social-share.svg",
        width: 1200,
        height: 630,
        alt: "VisiChek blog — visitor management insights",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@visichek",
    creator: "@visichek",
    title: blogTitle,
    description: blogDescription,
    images: ["/visichek-social-share.svg"],
  },
};

/**
 * Light-touch check that counts posts across the three blog feeds. We only
 * use this to pick between "render sections" and "render page-wide empty state".
 * The individual section components still fetch their own data — Next.js will
 * dedupe the identical fetch calls during the same render.
 */
async function hasAnyPosts(): Promise<boolean> {
  const endpoints = [
    `${BASE_URL}/articles/content/by-blog-type/hero-section`,
    `${BASE_URL}/articles/content/by-blog-type/normal?start=0&stop=1&sort=newest`,
    `${BASE_URL}/articles/content/by-blog-type/featured?start=0&stop=1`,
  ];

  try {
    const results = await Promise.all(
      endpoints.map((url) =>
        fetch(url, { next: { revalidate: 60 } })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ),
    );

    return results.some((data) => {
      const blogs = data?.data?.blogs;
      return Array.isArray(blogs) && blogs.length > 0;
    });
  } catch {
    // If the whole thing blew up, assume posts exist so we still render the
    // sections (they'll handle their own fallback).
    return true;
  }
}

export default async function BlogPage() {
  const anyPosts = await hasAnyPosts();

  return (
    <main className="min-h-screen bg-white">
      {/* Blog intro — refined hero with decorative backdrop */}
      <section className="relative overflow-hidden bg-white pt-[124px] md:pt-[140px] pb-16 border-b border-[#e8e8e8]">
        {/* Decorative backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(1200px 440px at 50% -10%, rgba(58,150,21,0.08), transparent 60%), radial-gradient(800px 320px at 15% 120%, rgba(58,150,21,0.04), transparent 60%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3A9615]/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #2a2a2a 1px, transparent 1px), linear-gradient(to bottom, #2a2a2a 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(closest-side at 50% 30%, black 20%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(closest-side at 50% 30%, black 20%, transparent 85%)",
          }}
        />

        <div className="relative mx-auto max-w-[1200px] px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#2e7a11] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3A9615]" />
            VisiChek Blog
          </span>
          <h1 className="mx-auto mt-5 max-w-[820px] font-serif text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.03] tracking-[-0.025em] text-[#1a1a1a]">
            Stories, guides &amp; ideas for the modern{" "}
            <span className="italic text-[#2e7a11]">front desk</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-[15px] md:text-[16px] leading-relaxed text-[#6a6a6a]">
            Everything you need to know about visitor management, workplace
            security, and facility operations — written by the team building
            VisiChek.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {anyPosts && (
              <Link
                href="#latest"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-sm shadow-green-700/20 transition-all duration-200 hover:-translate-y-px hover:shadow-md"
              >
                Browse latest
                <span aria-hidden="true">→</span>
              </Link>
            )}
            <Link
              href="/#overview"
              className="inline-flex items-center rounded-full border border-[#e8e8e8] bg-white px-5 py-2.5 text-[13.5px] font-medium text-[#374151] transition-all duration-200 hover:border-[#d8d8d8] hover:shadow-sm"
            >
              About VisiChek
            </Link>
          </div>

          {/* Category strip */}
          <div className="mt-10">
            <BlogCategoryStrip />
          </div>
        </div>
      </section>

      {/* Blog content */}
      {anyPosts ? (
        <div className="mx-auto max-w-[1470px] 2xl:max-w-[1470px]">
          <BlogHeroSection />
          <div id="latest">
            <MostRecent />
          </div>
          <Featured />
        </div>
      ) : (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-[520px] rounded-3xl border border-dashed border-[#e8e8e8] bg-[#fafafa] p-10 text-center">
            <div
              aria-hidden="true"
              className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#3A9615]/10 text-[#2e7a11]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 7h16M4 12h10M4 17h16" />
              </svg>
            </div>
            <h2 className="font-serif text-[24px] md:text-[26px] font-bold tracking-[-0.02em] text-[#1a1a1a]">
              The blog is just getting started
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[#6a6a6a]">
              No stories have been published yet. Check back soon — new
              guides and playbooks are on the way.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#e8e8e8] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] transition-all duration-200 hover:border-[#d8d8d8] hover:shadow-sm"
            >
              Back to home
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
