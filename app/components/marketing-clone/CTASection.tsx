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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <OpenGetStartedButton className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-6 py-3 text-base font-medium text-white shadow-md shadow-green-700/20 transition-all duration-150 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30 active:scale-[0.98]">
              Get started
            </OpenGetStartedButton>
            <a
              href={SALES_MAILTO}
              className="inline-flex items-center justify-center rounded-full border border-[#e8e8e8] px-6 py-3 text-base font-medium text-[#2a2a2a] transition-all duration-100 hover:bg-gray-50 active:scale-[0.98]"
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
