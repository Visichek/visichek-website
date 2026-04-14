"use client";

import Link from "next/link";
import OpenSalesButton from "../open-sales-button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      id="overview"
      className="relative w-full overflow-hidden bg-[#f2f8f0]"
    >
      {/* Content */}
      <div
        className={cn(
          "relative z-10 my-auto flex mx-auto max-w-[1200px] px-6 text-center",
          "pt-[120px] pb-[80px]",
          "animate-fade-in",
          "min-h-[100svh]"
        )}
      >
       <div className="flex flex-col justify-center align-middle m-auto w-fit" >
         {/* Eyebrow */}
        <p className="mb-4 font-sans text-sm font-medium text-[#45624b]">
          Visitor Management System for modern facilities and buildings
        </p>

        {/* Headline */}
        <h1
          className={cn(
            "mx-auto max-w-[800px] font-sans font-bold leading-tight tracking-tight",
            "text-[32px] md:text-[52px]",
            "text-[#18321c]"
          )}
        >
          Workplace security starts with a Visitor Management System
        </h1>

        {/* Subheadline */}
        <p
          className={cn(
            "mx-auto mt-6 max-w-[620px] font-sans text-lg font-normal",
            "text-[#4f6454]"
          )}
        >
          VisiChek helps you verify, track, and manage every visitor from
          arrival to exit, without slowing down your front desk.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-4 w-full max-w-[420px] sm:max-w-none mx-auto">
          <Link
            href="/pricing#pricing"
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              "bg-[#3A9615] px-6 py-3 text-base font-medium text-white",
              "transition-colors hover:bg-[#2E7A11]",
              "shadow-lg shadow-green-600/20",
              "w-full sm:w-auto"
            )}
          >
            Get Early Access
          </Link>
          <OpenSalesButton
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              "px-6 py-3 text-base font-medium text-[#18321c]",
              "transition-colors hover:text-[#0f2413]",
              "w-full sm:w-auto"
            )}
          >
            Contact sales &rarr;
          </OpenSalesButton>
        </div>
       </div>
      </div>
    </section>
  );
}
