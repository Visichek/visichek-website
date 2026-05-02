"use client";

import OpenGetStartedButton from "../open-sales-button";
import { RevealWrapper } from "./BillingAutomationSection";

const SALES_MAILTO = "mailto:sales@visichek.com?subject=Talk%20to%20sales";

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
            <OpenGetStartedButton className="bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] text-white font-semibold px-10 py-4 rounded-[20px] text-[15px] shadow-md shadow-green-700/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30 active:scale-[0.98] transition-all duration-150 inline-block">
              Get started
            </OpenGetStartedButton>
            <a
              href={SALES_MAILTO}
              className="border border-[#e8e8e8] text-[#2a2a2a] font-semibold px-10 py-4 rounded-[20px] text-[15px] hover:bg-gray-50 active:scale-[0.98] transition-all duration-100 inline-block"
            >
              Talk to sales
            </a>
          </div>
          <p className="mt-5 text-[12px] text-[#6a6a6a]">
            Tell us about your workflow &middot; We&apos;ll set you up with the
            right plan
          </p>
        </div>
      </RevealWrapper>
    </section>
  );
}
