import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <section className="mx-auto w-full max-w-[640px] px-6 pt-[120px] pb-24 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
          Error 404
        </p>

        <h1 className="font-serif text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.03em] text-[#1a1a1a]">
          This page could not be found.
        </h1>

        <p className="mx-auto mt-6 max-w-[420px] text-[15px] leading-relaxed text-[#6a6a6a]">
          The page you&apos;re looking for may have moved, been renamed, or
          never existed. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-6 py-3 text-base font-medium text-white shadow-md shadow-green-700/20 transition-all duration-150 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30 active:scale-[0.98]"
          >
            Back to home
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full border border-[#e8e8e8] px-6 py-3 text-base font-medium text-[#2a2a2a] transition-all duration-100 hover:bg-gray-50 active:scale-[0.98]"
          >
            View pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
