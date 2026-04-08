"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { X } from "lucide-react";

export default function MarketingFooter() {
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const openModal = useCallback(() => {
    setIsSalesModalOpen(true);
    setIsAnimating(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
        setIsAnimating(false);
        setTimeout(() => firstInputRef.current?.focus(), 400);
      });
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsSalesModalOpen(false);
    }, 350);
  }, []);

  useEffect(() => {
    window.addEventListener("visicheck:open-sales", openModal);
    return () => window.removeEventListener("visicheck:open-sales", openModal);
  }, [openModal]);

  useEffect(() => {
    if (!isSalesModalOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isSalesModalOpen, closeModal]);

  return (
    <>
      <footer id="waitlist" className="bg-white border-t border-border py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="waitlist-card mb-14 reveal visible">
            <div>
              <p className="label-tag mb-2">Get started</p>
              <h3 className="font-serif text-[28px] md:text-[34px] text-charcoal tracking-[-0.02em]">
                Join the early access waitlist
              </h3>
              <p className="text-[14px] text-charcoal-lighter mt-2 max-w-md">
                Drop your email and we&apos;ll notify you when VisiChek opens new pilot spots.
              </p>
            </div>
            <form id="waitlist-form" className="waitlist-form" action="https://formspree.io/f/xaqldaya" method="POST">
              <label className="sr-only" htmlFor="waitlist-email">Work email</label>
              <input id="waitlist-email" name="email" type="email" required placeholder="you@company.com" />
              <button type="submit">
                <span className="btn-label">Join waitlist</span>
                <span className="btn-loader" aria-hidden="true"></span>
              </button>
              <p className="waitlist-note">We&apos;ll only use this to notify you about early access.</p>
              <p className="waitlist-status" role="status" aria-live="polite"></p>
            </form>
          </div>

          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="mb-4 flex items-center gap-2 text-[17px] font-semibold text-charcoal">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="14" cy="14" r="13" stroke="#3A9615" strokeWidth="2" />
                  <path
                    d="M8 14L12 18L20 10"
                    stroke="#3A9615"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl font-bold tracking-tight">VisiChek</span>
              </Link>
              <p className="text-[13px] text-charcoal-lighter leading-relaxed max-w-[260px]">
                Visitor management for security-first workplaces, departments,
                and multi-site operations in Nigeria.
              </p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-4">Product</p>
              <ul className="space-y-3 text-[13px] text-charcoal-lighter">
                <li><Link href="/#overview" className="hover:text-charcoal transition-colors">Use Cases</Link></li>
                <li><Link href="/#features" className="hover:text-charcoal transition-colors">Features</Link></li>
                <li><Link href="/pricing#pricing" className="hover:text-charcoal transition-colors">Pricing</Link></li>
                <li><Link href="/#waitlist" className="hover:text-charcoal transition-colors">Waitlist</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-4">Resources</p>
              <ul className="space-y-3 text-[13px] text-charcoal-lighter">
                <li><Link href="/#overview" className="hover:text-charcoal transition-colors">Overview</Link></li>
                <li><Link href="/blog" className="hover:text-charcoal transition-colors">Blog</Link></li>
                <li><button type="button" className="hover:text-charcoal transition-colors" onClick={openModal}>Contact sales</button></li>
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-4">Company</p>
              <ul className="space-y-3 text-[13px] text-charcoal-lighter">
                <li><Link href="/" className="hover:text-charcoal transition-colors">VisiChek</Link></li>
                <li><Link href="/blog" className="hover:text-charcoal transition-colors">Insights</Link></li>
                <li>
                  <button type="button" className="hover:text-charcoal transition-colors" onClick={openModal}>
                    Contact us
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-4">Legal</p>
              <ul className="space-y-3 text-[13px] text-charcoal-lighter">
                <li><Link href="/privacy" className="hover:text-charcoal transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-charcoal transition-colors">Terms of Service</Link></li>
                <li><Link href="/dpa" className="hover:text-charcoal transition-colors">Data Processing Addendum</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-charcoal-lighter">
            <p>&copy; 2026 VisiChek. Built in Nigeria, for Nigerians.</p>
            <p>Data security &amp; NDPR-aware by design</p>
          </div>
        </div>
      </footer>

      {/* ── Sales Modal ── */}
      {isSalesModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sales-modal-title"
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 transition-all duration-350 ease-out ${
              isVisible
                ? "bg-black/50 backdrop-blur-sm"
                : "bg-black/0 backdrop-blur-none"
            }`}
            onClick={closeModal}
          />

          {/* Modal Card */}
          <div
            ref={modalCardRef}
            className={`
              sales-modal-card-v2
              relative z-10 w-full max-w-[780px]
              max-h-[calc(100vh-3rem)]
              rounded-3xl bg-white
              shadow-2xl shadow-black/20
              ring-1 ring-black/[0.04]
              flex flex-col
              transition-all duration-350 ease-out
              ${isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-[0.97]"
              }
            `}
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl bg-gradient-to-r from-[#3A9615] via-[#4cbe1e] to-[#3A9615]" />

            {/* Header (fixed) */}
            <div className="relative shrink-0 px-6 pt-7 pb-5 sm:px-8">
              <button
                type="button"
                aria-label="Close form"
                onClick={closeModal}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-gray-200 hover:text-gray-800 hover:rotate-90 active:scale-90"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-2.5 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 ring-1 ring-green-200/60">
                  <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="13" stroke="#3A9615" strokeWidth="2" />
                    <path d="M8 14L12 18L20 10" stroke="#3A9615" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
                  Contact Sales
                </span>
              </div>

              <h3
                id="sales-modal-title"
                className="font-serif text-[26px] sm:text-[30px] text-[#1a1a1a] tracking-[-0.02em] leading-tight"
              >
                Reserve a pilot slot
              </h3>
              <p className="mt-1.5 text-[14px] text-gray-500 max-w-md leading-relaxed">
                Tell us about your visitor workflow. We&apos;ll respond within 1&ndash;2 business days.
              </p>
            </div>

            {/* Divider */}
            <div className="mx-6 sm:mx-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain sales-modal-scroll px-6 py-6 sm:px-8">
              <form
                id="sales-form"
                className="space-y-5"
                action="https://formspree.io/f/xaqldaya"
                method="POST"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Full name">
                    <input
                      ref={firstInputRef}
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      required
                      className="sales-input"
                    />
                  </FormField>
                  <FormField label="Work email">
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@company.com"
                      required
                      className="sales-input"
                    />
                  </FormField>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Company">
                    <input
                      type="text"
                      name="company"
                      placeholder="Your organization"
                      required
                      className="sales-input"
                    />
                  </FormField>
                  <FormField label="Your role">
                    <select name="role" required defaultValue="" className="sales-select">
                      <option value="" disabled>Select a role</option>
                      <option>Facilities / Operations</option>
                      <option>Security</option>
                      <option>HR / People</option>
                      <option>IT / Systems</option>
                      <option>Executive leadership</option>
                      <option>Other</option>
                    </select>
                  </FormField>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Company size">
                    <select name="company_size" required defaultValue="" className="sales-select">
                      <option value="" disabled>Select size</option>
                      <option>1–50 employees</option>
                      <option>51–200 employees</option>
                      <option>201–500 employees</option>
                      <option>501–1,000 employees</option>
                      <option>1,000+ employees</option>
                    </select>
                  </FormField>
                  <FormField label="Locations / branches">
                    <select name="locations" required defaultValue="" className="sales-select">
                      <option value="" disabled>Select locations</option>
                      <option>1 location</option>
                      <option>2–5 locations</option>
                      <option>6–10 locations</option>
                      <option>10+ locations</option>
                    </select>
                  </FormField>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Departments using VisiChek">
                    <select name="departments" required defaultValue="" className="sales-select">
                      <option value="" disabled>Select departments</option>
                      <option>1–3 departments</option>
                      <option>4–10 departments</option>
                      <option>11–50 departments</option>
                      <option>50+ departments</option>
                    </select>
                  </FormField>
                  <FormField label="Average visitors per day">
                    <select name="daily_visitors" required defaultValue="" className="sales-select">
                      <option value="" disabled>Select volume</option>
                      <option>0–20</option>
                      <option>21–100</option>
                      <option>101–300</option>
                      <option>300+</option>
                    </select>
                  </FormField>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Current check-in method">
                    <select name="current_method" required defaultValue="" className="sales-select">
                      <option value="" disabled>Select method</option>
                      <option>Manual logbook</option>
                      <option>Spreadsheet / Google Form</option>
                      <option>Access control system</option>
                      <option>Another VMS</option>
                      <option>None yet</option>
                    </select>
                  </FormField>
                  <FormField label="Deployment timeline">
                    <select name="timeline" required defaultValue="" className="sales-select">
                      <option value="" disabled>Select timeline</option>
                      <option>Immediately</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>6+ months</option>
                    </select>
                  </FormField>
                </div>

                {/* Row 6 - Full Width */}
                <FormField label="Top priorities">
                  <select name="priorities" required defaultValue="" className="sales-select">
                    <option value="" disabled>Select primary need</option>
                    <option>ID scanning &amp; verification</option>
                    <option>Visitor badge printing</option>
                    <option>Multi-branch management</option>
                    <option>Compliance &amp; audit trails</option>
                    <option>Hardware integrations</option>
                  </select>
                </FormField>
              </form>
            </div>

            {/* Divider */}
            <div className="mx-6 sm:mx-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Footer (fixed) */}
            <div className="shrink-0 px-6 py-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[12px] text-gray-400 order-2 sm:order-1">
                Submitting sends your details to our team via Formspree.
              </p>
              <div className="flex items-center gap-2.5 order-1 sm:order-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="sales-form"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition-all duration-200 hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-px active:scale-[0.98] active:shadow-sm"
                >
                  Submit request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}
