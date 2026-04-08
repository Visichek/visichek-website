import Featured from "../components/featured";
import BlogHeroSection from "../components/herosection";
import MostRecent from "../components/mostrecent";
import Link from "next/link";

export const metadata = {
  title: "Blog | VisiChek",
  description:
    "Insights, guides, and stories about visitor management, workplace security, and facility operations.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Blog intro header — marketing design language */}
      <section className="relative bg-white pt-[120px] pb-12 border-b border-[#e8e8e8]">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
            Blog &amp; Insights
          </p>
          <h1 className="mx-auto max-w-[700px] font-serif text-[36px] md:text-[48px] font-bold leading-tight tracking-[-0.02em] text-[#1a1a1a]">
            Stories, guides &amp; ideas
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-[#6a6a6a]">
            Everything you need to know about visitor management, workplace
            security, and facility operations.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/#overview"
              className="inline-flex items-center rounded-full border border-[#e8e8e8] bg-white px-5 py-2 text-[13px] font-medium text-[#374151] transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
            >
              About VisiChek
            </Link>
            <Link
              href="/pricing#pricing"
              className="inline-flex items-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-5 py-2 text-[13px] font-semibold text-white shadow-sm shadow-green-700/15 transition-all duration-200 hover:-translate-y-px hover:shadow-md"
            >
              Get Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Blog content */}
      <div className="mx-auto max-w-[1470px] 2xl:max-w-[1470px]">
        <BlogHeroSection />
        <MostRecent />
        <Featured />
      </div>
    </main>
  );
}
