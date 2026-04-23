"use client";

import { RevealWrapper } from "./BillingAutomationSection";

const complianceCards = [
  {
    title: "Audit logs",
    description:
      "Every visitor action is logged, creating a complete audit trail for security reviews and investigations.",
  },
  {
    title: "Data protection",
    description:
      "End-to-end encryption ensures visitor data is securely stored and protected from unauthorized access.",
  },
  {
    title: "Consent & privacy",
    description:
      "Visitors are informed and can consent to how their data is captured and used.",
  },
  {
    title: "Role-based access",
    description:
      "Only authorized personnel can view or manage visitor data based on assigned roles and permissions.",
  },
  {
    title: "Configurable retention",
    description:
      "Automatically delete or retain visitor records based on your organization\u2019s compliance requirements.",
  },
  {
    title: "Data residency options",
    description:
      "Choose where your data is stored, including local hosting options for regulatory compliance.",
  },
];

export function ComplianceSection() {
  return (
    <section id="compliance" className="py-24 bg-white border-y border-[#e8e8e8]">
      <div className="max-w-6xl mx-auto px-6">
        <RevealWrapper>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#6a6a6a] tracking-[0.05em] mb-4">
              Data security &amp; compliance
            </p>
            <h2 className="font-serif text-[38px] md:text-[48px] text-[#2a2a2a] tracking-[-0.02em] mb-3">
              Built for compliance from day one
            </h2>
            <p className="text-[15px] text-[#6a6a6a] max-w-2xl mx-auto">
              VisiChek helps organizations securely capture, store, and manage
              visitor data while aligning with regulatory and internal compliance
              requirements.
            </p>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-3 gap-5">
          {complianceCards.map((card, i) => (
            <RevealWrapper key={card.title} delay={(i % 3) * 80}>
              <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6 text-left transition-all duration-250 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] hover:-translate-y-[3px]">
                <h3 className="font-semibold text-[15px] text-[#2a2a2a] mb-2">
                  {card.title}
                </h3>
                <p className="text-[13px] text-[#6a6a6a] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
