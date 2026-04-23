import Featured from "../components/featured";
import BlogHeroSection from "../components/herosection";
import MostRecent from "../components/mostrecent";
import BlogCategoryStrip from "../components/blogcategorystrip";
import Link from "next/link";

export const metadata = {
  title: "Blog | VisiChek",
  description:
    "Insights, guides, and stories about visitor management, workplace security, and facility operations.",
};

export default function BlogPage() {
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
            <Link
              href="#latest"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-sm shadow-green-700/20 transition-all duration-200 hover:-translate-y-px hover:shadow-md"
            >
              Browse latest
              <span aria-hidden="true">→</span>
            </Link>
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
      <div className="mx-auto max-w-[1470px] 2xl:max-w-[1470px]">
        <BlogHeroSection />
        <div id="latest">
          <MostRecent />
        </div>
        <Featured />
      </div>
    </main>
  );
}
