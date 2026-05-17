"use client";

import { useRef, useCallback } from "react";
import { RevealWrapper } from "./BillingAutomationSection";
import { DEFAULT_FAQ_PAYLOAD, type FaqPayload } from "../../util/faqs";
import { renderSafeHtml } from "../../util/safe-html";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const ansRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    const btn = btnRef.current;
    const ans = ansRef.current;
    if (!btn || !ans) return;

    const expanded = btn.getAttribute("aria-expanded") === "true";

    // Close all others first
    const allBtns = btn
      .closest(".faq-list")
      ?.querySelectorAll<HTMLButtonElement>("button");
    allBtns?.forEach((b) => {
      b.setAttribute("aria-expanded", "false");
      b.nextElementSibling?.classList.remove("open");
    });

    if (!expanded) {
      btn.setAttribute("aria-expanded", "true");
      ans.classList.add("open");
    }
  }, []);

  return (
    <div className="py-1.5">
      <button
        ref={btnRef}
        onClick={toggle}
        className="faq-q w-full flex items-center justify-between gap-4 py-[18px] bg-transparent border-none cursor-pointer text-left text-[15px] font-medium text-[#2a2a2a] font-sans"
        aria-expanded="false"
      >
        {question}
        <svg className="faq-chev" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div ref={ansRef} className="faq-ans">
        <div className="text-sm text-[#6a6a6a] leading-[1.75] pt-4 faq-answer-body">
          {renderSafeHtml(answer)}
        </div>
      </div>
    </div>
  );
}

export function AutomationsSection({
  payload,
}: {
  payload?: FaqPayload | null;
} = {}) {
  const data = payload ?? DEFAULT_FAQ_PAYLOAD;

  return (
    <section className="py-24 bg-white border-t border-[#e8e8e8]">
      <div className="max-w-2xl mx-auto px-6">
        <RevealWrapper>
          <h2 className="font-serif text-[38px] md:text-[48px] text-[#2a2a2a] tracking-[-0.02em] text-center mb-4">
            {data.headline}
          </h2>
        </RevealWrapper>
        {data.subheadline ? (
          <RevealWrapper>
            <p className="text-center text-[15px] text-[#6a6a6a] leading-[1.75] mb-10">
              {data.subheadline}
            </p>
          </RevealWrapper>
        ) : (
          <div className="mb-10" />
        )}

        {data.sections.map((section) => (
          <div
            key={section.categoryKey}
            id={`section-${section.categoryKey}`}
            className="mb-10 last:mb-0"
          >
            {data.sections.length > 1 ? (
              <RevealWrapper>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6a6a6a] mb-2">
                  {section.label}
                </h3>
              </RevealWrapper>
            ) : null}
            <div className="faq-list divide-y divide-[#e8e8e8]">
              {section.items.map((item) => (
                <RevealWrapper key={item.itemKey}>
                  <FAQItem question={item.question} answer={item.answer} />
                </RevealWrapper>
              ))}
            </div>
          </div>
        ))}

        {data.footerHtml ? (
          <RevealWrapper>
            <div className="mt-12 text-center text-sm text-[#6a6a6a] leading-[1.75] faq-footer-body">
              {renderSafeHtml(data.footerHtml)}
            </div>
          </RevealWrapper>
        ) : null}
      </div>
    </section>
  );
}
