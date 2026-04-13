"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { RevealWrapper } from "./BillingAutomationSection";

const Lanyard = dynamic(() => import("@/components/ui/lanyard"), { ssr: false });

export function PricingEngineSection() {
  return (
    <div className="feature-block bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Lanyard — left on desktop */}
        <RevealWrapper className="order-2 md:order-1 hidden md:block">
          <div className="relative h-[480px] md:h-[520px] w-full rounded-3xl border border-green-100 bg-green-50 overflow-hidden">
            <Lanyard
              position={[0, 0, 30]}
              gravity={[0, -40, 0]}
              fov={20}
              transparent={true}
            />
          </div>
        </RevealWrapper>

        {/* Text — right on desktop */}
        <RevealWrapper className="order-1 md:order-2">
          <p className="text-xs font-semibold text-[#6a6a6a] tracking-[0.05em]">
            Visitor identification
          </p>
          <h2 className="font-serif text-4xl md:text-[42px] leading-tight tracking-[-0.02em] text-[#2a2a2a] mt-3 mb-5">
            Issue secure visitor
            <br />
            badges automatically
          </h2>
          <p className="text-[15px] text-[#6a6a6a] leading-relaxed mb-6">
            Generate structured visitor badges at check-in so teams can quickly
            recognize guests and confirm their presence.
          </p>
          <ul className="space-y-2.5 mb-8">
            {[
              "Clearly identify visitors beyond the reception area",
              "Connect visitors to their destination inside the building",
              "Improve internal awareness of guest movement",
              "Support safer interactions between staff and visitors",
            ].map((item) => (
              <li
                key={item}
                className="relative pl-5 text-sm text-[#4a4a4a] leading-relaxed before:content-['\2013'] before:absolute before:left-0 before:text-green-600 before:font-bold"
              >
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-1.5 bg-green-700 text-white text-[13.5px] font-semibold px-[22px] py-2.5 rounded-[20px] hover:bg-green-800 active:scale-[0.97] transition-all duration-150"
          >
            Join waitlist
          </Link>
        </RevealWrapper>
      </div>
    </div>
  );
}
