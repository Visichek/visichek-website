"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import OpenSalesButton from "../open-sales-button";
import { cn } from "@/lib/utils";
import { ProductSuiteSection } from "./ProductSuiteSection";

const Silk = dynamic(() => import("@/components/ui/silk"), { ssr: false });

export function HeroSection() {
  return (
    <section id="overview" className="relative w-full overflow-hidden">
      {/* Silk animated background */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={3}
          scale={1}
          color="#3A9615"
          noiseIntensity={1.2}
          rotation={0}
        />
      </div>


      {/* Content */}
      <div
        className={cn(
          "relative z-10 my-auto flex mx-auto max-w-[1200px] px-6 text-center",
          "pt-[120px] pb-[80px]",
          "animate-fade-in",
          "min-h-screen"
        )}
      >
       <div className="flex flex-col justify-center align-middle m-auto w-fit" >
         {/* Eyebrow */}
        <p className="mb-4 font-sans text-sm font-medium text-offwhite">
          Visitor Management System for modern facilities and buildings
        </p>

        {/* Headline */}
        <h1
          className={cn(
            "mx-auto max-w-[800px] font-sans font-bold leading-tight tracking-tight",
            "text-[32px] md:text-[52px]",
            "text-offwhite"
          )}
        >
          Workplace security starts with a Visitor Management System
        </h1>

        {/* Subheadline */}
        <p
          className={cn(
            "mx-auto mt-6 max-w-[620px] font-sans text-lg font-normal",
            "text-offwhite"
          )}
        >
          VisiChek helps you verify, track, and manage every visitor from
          arrival to exit, without slowing down your front desk.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/pricing#pricing"
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              "bg-[#3A9615] px-6 py-3 text-base font-medium text-white",
              "transition-colors hover:bg-[#2E7A11]",
              "shadow-lg shadow-green-600/20"
            )}
          >
            Get Early Access
          </Link>
          <OpenSalesButton
            className={cn(
              "inline-flex items-center justify-center",
              "px-6 py-3 text-base font-medium text-offwhite",
              "transition-colors hover:text-white"
            )}
          >
            Contact sales &rarr;
          </OpenSalesButton>
        </div>
       </div>
        {/* <ProductSuiteSection /> */}
      </div>
    </section>
  );
}
