"use client";

import Link from "next/link";
import OpenSalesButton from "../open-sales-button";
import { RevealWrapper } from "./BillingAutomationSection";

export function CTASection() {
  return (
    <section className="py-28 bg-white border-y border-[#e8e8e8] text-center">
      <RevealWrapper>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-[42px] md:text-[56px] text-[#2a2a2a] leading-tight tracking-[-0.03em] mb-6">
            If you can&apos;t track them,
            <br />
            you can&apos;t secure them.
          </h2>
          <p className="text-[15px] text-[#6a6a6a] mb-10 max-w-md mx-auto">
            Let us show you a better way to secure every visitor entry and keep
            clean audit trails.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="#waitlist"
              className="bg-[#2a2a2a] text-white font-semibold px-10 py-4 rounded-[20px] text-[15px] hover:bg-[#4a4a4a] active:scale-[0.98] transition-all duration-100 inline-block"
            >
              Join waitlist
            </Link>
            <OpenSalesButton className="border border-[#e8e8e8] text-[#2a2a2a] font-semibold px-10 py-4 rounded-[20px] text-[15px] hover:bg-gray-50 active:scale-[0.98] transition-all duration-100 inline-block">
              Contact Sales
            </OpenSalesButton>
          </div>
          <p className="mt-5 text-[12px] text-[#6a6a6a]">
            Work in progress &middot; We&apos;ll notify you when early access
            opens
          </p>
        </div>
      </RevealWrapper>
    </section>
  );
}
