"use client";

import { useRef, useCallback } from "react";
import { RevealWrapper } from "./BillingAutomationSection";

const faqs = [
  {
    question: "Do we need special hardware to use VisiChek?",
    answer:
      "No. VisiChek works with standard reception laptops, tablets, webcams, and badge printers. If your building already uses QR scanners, access control doors, or turnstiles, VisiChek can integrate with them as part of an upgraded setup.",
  },
  {
    question: "Can VisiChek verify Nigerian government-issued IDs?",
    answer:
      "Yes. VisiChek is designed to support government-issued identification commonly used in Nigeria and extracts visitor information automatically during check-in.",
  },
  {
    question:
      "Where is our visitor data stored, and is it NDPA compliant?",
    answer:
      "VisiChek supports encrypted visitor records, role-based access control, and configurable data retention policies. For organizations with compliance requirements, deployment options can support local hosting or approved infrastructure aligned with NDPA expectations.",
  },
  {
    question:
      "Can multiple departments or branches use the same system?",
    answer:
      "Yes. Each department manages its own visitors independently, while administrators maintain company-wide visibility. VisiChek also supports multi-branch setups from a single centralized dashboard.",
  },
  {
    question: "How is VisiChek priced?",
    answer:
      "VisiChek uses a subscription model based on your organization\u2019s setup, including number of departments, locations, and check-in workflow requirements such as QR or hardware integrations. Most organizations start with a reception-level deployment and expand as needed.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const ansRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    const btn = btnRef.current;
    const ans = ansRef.current;
    if (!btn || !ans) return;

    const expanded = btn.getAttribute("aria-expanded") === "true";

    // Close all others first
    const allBtns = btn
      .closest("#faq-list")
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
        <div className="text-sm text-[#6a6a6a] leading-[1.75] pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function AutomationsSection() {
  return (
    <section className="py-24 bg-white border-t border-[#e8e8e8]">
      <div className="max-w-2xl mx-auto px-6">
        <RevealWrapper>
          <h2 className="font-serif text-[38px] md:text-[48px] text-[#2a2a2a] tracking-[-0.02em] text-center mb-14">
            Frequently asked questions
          </h2>
        </RevealWrapper>
        <div id="faq-list" className="divide-y divide-[#e8e8e8]">
          {faqs.map((faq) => (
            <RevealWrapper key={faq.question}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
