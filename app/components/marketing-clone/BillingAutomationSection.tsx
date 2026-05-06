"use client";

import { useEffect, useRef } from "react";
import OpenGetStartedButton from "../open-sales-button";

export function RevealWrapper({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function IDScanMockup() {
  return (
    <div className="rounded-3xl border border-green-100 bg-green-50 p-10 flex items-center justify-center min-h-[320px]">
      <div className="relative w-[260px] h-[200px] flex items-center justify-center">
        {/* Corner brackets */}
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />

        {/* ID card illustration */}
        <div className="flex gap-3 items-start rounded-[10px] border border-[#e8e8e8] bg-white p-3.5 w-[200px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <div className="w-11 h-[52px] rounded-md bg-blue-100 shrink-0" />
          <div className="flex-1">
            <div className="h-2 w-24 rounded bg-gray-200" />
            <div className="h-2 w-16 rounded bg-gray-200 mt-1.5" />
            <div className="mt-3">
              <div className="flex items-end gap-0.5 h-[22px] mb-[3px]">
                {[2, 4, 2, 4, 2, 4, 2, 4, 2].map((w, i) => (
                  <div
                    key={i}
                    className="h-full rounded-sm bg-gray-700"
                    style={{ width: w }}
                  />
                ))}
              </div>
              <p className="text-[8px] text-gray-500 tracking-wide">
                123-4567-890
              </p>
            </div>
          </div>
        </div>

        {/* Animated scan line */}
        <div className="scan-line" />
      </div>
    </div>
  );
}

export function BillingAutomationSection() {
  return (
    <div className="feature-block">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <RevealWrapper>
          <p className="text-xs font-semibold text-[#6a6a6a] tracking-[0.05em]">
            Identity verification
          </p>
          <h2 className="font-serif text-4xl md:text-[42px] leading-tight tracking-[-0.02em] text-[#2a2a2a] mt-3 mb-5">
            Know exactly who is
            <br />
            entering your building
          </h2>
          <p className="text-[15px] text-[#6a6a6a] leading-relaxed mb-6">
            Scan government-issued IDs and automatically extract verified visitor
            information including name, photo, and identification number in
            seconds.
          </p>
          <ul className="space-y-2.5 mb-8">
            {[
              "Capture verified visitor identity directly from official ID documents",
              "Reduce manual entry errors at the front desk",
              "Store structured visitor profiles for repeat visits",
              "Improve accountability from the moment a visitor arrives",
            ].map((item) => (
              <li
                key={item}
                className="relative pl-5 text-sm text-[#4a4a4a] leading-relaxed before:content-['\2013'] before:absolute before:left-0 before:text-green-600 before:font-bold"
              >
                {item}
              </li>
            ))}
          </ul>
          <OpenGetStartedButton className="inline-flex items-center gap-1.5 bg-green-700 text-white text-[13.5px] font-semibold px-[22px] py-2.5 rounded-full hover:bg-green-800 active:scale-[0.97] transition-all duration-150">
            Get started
          </OpenGetStartedButton>
        </RevealWrapper>

        <RevealWrapper delay={100} className="hidden md:block">
          <IDScanMockup />
        </RevealWrapper>
      </div>
    </div>
  );
}
