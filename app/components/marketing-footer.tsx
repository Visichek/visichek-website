"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback, FormEvent } from "react";
import { X, Check } from "lucide-react";

const SALES_MAILTO = "mailto:sales@visichek.com?subject=Talk%20to%20sales";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqldaya";

type SubmitState = "idle" | "submitting" | "success" | "error";

const ROLE_OPTIONS = [
  "Reception/Front desk",
  "Operations/Administration",
  "IT/Infrastructure",
  "Security team",
  "Executive/Management",
  "Other",
];

const ORG_TYPE_OPTIONS = [
  "Corporate office",
  "Government agency",
  "Financial institution",
  "School/university",
  "Healthcare facility",
  "Embassy/secure facility",
  "Co-working space",
  "Other",
];

const CURRENT_METHOD_OPTIONS = [
  "Paper logbook",
  "Security register",
  "Spreadsheet",
  "Existing visitor management software",
  "Combination of methods",
];

const VISITORS_PER_MONTH_OPTIONS = [
  "Less than 20",
  "20-50",
  "50-150",
  "150-500",
  "500+",
];

const DEPARTMENTS_OPTIONS = ["1", "2-5", "5-10", "10+"];

const PRIORITY_OPTIONS = [
  "Government ID verification",
  "Appointment-based visitor validation",
  "Real-time visitor tracking",
  "Visitor badge printing",
  "Department-level visitor visibility",
  "Searchable visitor records for audits",
  "NDPA-compliant data handling",
  "Multi-branch visitor management",
  "Access control integration (turnstiles / QR / RFID)",
];

const ACCESS_CONTROL_OPTIONS = [
  "None",
  "RFID badges",
  "QR access",
  "Turnstiles",
  "Security gate check-in",
  "Other",
];

const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 1-3 months",
  "Within 3-6 months",
  "Exploring options only",
];

export default function MarketingFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const modalCardRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setSubmitState("idle");
    setErrorMsg("");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
        setTimeout(() => firstInputRef.current?.focus(), 400);
      });
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitState("idle");
      setErrorMsg("");
    }, 350);
  }, []);

  useEffect(() => {
    window.addEventListener("visicheck:open-getstarted", openModal);
    return () =>
      window.removeEventListener("visicheck:open-getstarted", openModal);
  }, [openModal]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, closeModal]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      setSubmitState("submitting");
      setErrorMsg("");
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          setSubmitState("success");
          form.reset();
        } else {
          const data = await res.json().catch(() => ({}));
          setErrorMsg(
            data?.errors?.[0]?.message ||
              "Something went wrong. Please try again.",
          );
          setSubmitState("error");
        }
      } catch {
        setErrorMsg("Network error. Please check your connection and retry.");
        setSubmitState("error");
      }
    },
    [],
  );

  return (
    <>
      <footer
        id="get-started"
        className="bg-white border-t border-border py-14"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="waitlist-card mb-14 reveal visible">
            <div>
              <p className="label-tag mb-2">Get started</p>
              <h3 className="font-serif text-[28px] md:text-[34px] text-charcoal tracking-[-0.02em]">
                Get started with VisiChek
              </h3>
              <p className="text-[14px] text-charcoal-lighter mt-2 max-w-md">
                Tell us about your organization and we&apos;ll get you set up
                with the right plan and onboarding support.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-6 py-3 text-[14px] font-semibold text-white shadow-md shadow-green-700/15 transition-all duration-200 hover:-translate-y-px hover:shadow-lg"
              >
                Get started
              </button>
              <a
                href={SALES_MAILTO}
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-[14px] font-medium text-gray-800 hover:bg-gray-50"
              >
                Talk to sales
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="mb-4 flex items-center gap-2 text-[17px] font-semibold text-charcoal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="14"
                    cy="14"
                    r="13"
                    stroke="#3A9615"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 14L12 18L20 10"
                    stroke="#3A9615"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl font-bold tracking-tight">
                  VisiChek
                </span>
              </Link>
              <p className="text-[13px] text-charcoal-lighter leading-relaxed max-w-[260px]">
                Visitor management for security-first workplaces, departments,
                and multi-site operations in Nigeria.
              </p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-4">
                Product
              </p>
              <ul className="space-y-3 text-[13px] text-charcoal-lighter">
                <li>
                  <Link
                    href="/#overview"
                    className="hover:text-charcoal transition-colors"
                  >
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#features"
                    className="hover:text-charcoal transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing#pricing"
                    className="hover:text-charcoal transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:text-charcoal transition-colors text-left"
                    onClick={openModal}
                  >
                    Get started
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-4">
                Resources
              </p>
              <ul className="space-y-3 text-[13px] text-charcoal-lighter">
                <li>
                  <Link
                    href="/#overview"
                    className="hover:text-charcoal transition-colors"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-charcoal transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href={SALES_MAILTO}
                    className="hover:text-charcoal transition-colors"
                  >
                    Talk to sales
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-4">
                Company
              </p>
              <ul className="space-y-3 text-[13px] text-charcoal-lighter">
                <li>
                  <Link
                    href="/"
                    className="hover:text-charcoal transition-colors"
                  >
                    VisiChek
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-charcoal transition-colors"
                  >
                    Insights
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:sales@visichek.com?subject=Hello%20VisiChek"
                    className="hover:text-charcoal transition-colors"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-4">
                Legal
              </p>
              <ul className="space-y-3 text-[13px] text-charcoal-lighter">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-charcoal transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-charcoal transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dpa"
                    className="hover:text-charcoal transition-colors"
                  >
                    Data Processing Addendum
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-charcoal-lighter">
            <p>&copy; 2026 VisiChek. Built in Nigeria, for Nigerians.</p>
            <p>Data security &amp; NDPR-aware by design</p>
          </div>
        </div>
      </footer>

      {/* ── Get Started Modal ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="get-started-modal-title"
        >
          <div
            className={`absolute inset-0 transition-all duration-350 ease-out ${
              isVisible
                ? "bg-black/50 backdrop-blur-sm"
                : "bg-black/0 backdrop-blur-none"
            }`}
            onClick={closeModal}
          />

          <div
            ref={modalCardRef}
            className={`
              sales-modal-card-v2
              relative z-10 w-full max-w-[820px]
              max-h-[calc(100vh-3rem)]
              rounded-3xl bg-white
              shadow-2xl shadow-black/20
              ring-1 ring-black/[0.04]
              flex flex-col
              transition-all duration-350 ease-out
              ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-6 scale-[0.97]"
              }
            `}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl bg-gradient-to-r from-[#3A9615] via-[#4cbe1e] to-[#3A9615]" />

            {submitState === "success" ? (
              <SuccessScreen onClose={closeModal} />
            ) : (
              <>
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
                        <circle
                          cx="14"
                          cy="14"
                          r="13"
                          stroke="#3A9615"
                          strokeWidth="2"
                        />
                        <path
                          d="M8 14L12 18L20 10"
                          stroke="#3A9615"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#3A9615]">
                      Get started
                    </span>
                  </div>

                  <h3
                    id="get-started-modal-title"
                    className="font-serif text-[26px] sm:text-[30px] text-[#1a1a1a] tracking-[-0.02em] leading-tight"
                  >
                    Tell us about your organization
                  </h3>
                  <p className="mt-1.5 text-[14px] text-gray-500 max-w-md leading-relaxed">
                    A few quick details so we can tailor your VisiChek
                    onboarding.
                  </p>
                </div>

                <div className="mx-6 sm:mx-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <div className="flex-1 overflow-y-auto overscroll-contain sales-modal-scroll px-6 py-6 sm:px-8">
                  <form
                    id="get-started-form"
                    className="space-y-8"
                    onSubmit={handleSubmit}
                  >
                    {/* ── Section: About You ── */}
                    <FormSection
                      title="About you"
                      description="The person we should reach out to."
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Full name" required>
                          <input
                            ref={firstInputRef}
                            type="text"
                            name="full_name"
                            placeholder="Jane Doe"
                            required
                            className="sales-input"
                          />
                        </FormField>
                        <FormField label="Work email" required>
                          <input
                            type="email"
                            name="work_email"
                            placeholder="jane@company.com"
                            required
                            className="sales-input"
                          />
                        </FormField>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Phone number" required>
                          <input
                            type="tel"
                            name="phone_number"
                            placeholder="+234 800 000 0000"
                            required
                            className="sales-input"
                          />
                        </FormField>
                        <FormField label="Your role" required>
                          <select
                            name="role"
                            required
                            defaultValue=""
                            className="sales-select"
                          >
                            <option value="" disabled>
                              Select a role
                            </option>
                            {ROLE_OPTIONS.map((opt) => (
                              <option key={opt}>{opt}</option>
                            ))}
                          </select>
                        </FormField>
                      </div>
                    </FormSection>

                    {/* ── Section: About Your Organization ── */}
                    <FormSection
                      title="About your organization"
                      description="Where VisiChek will be deployed."
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Organization name" required>
                          <input
                            type="text"
                            name="organization_name"
                            placeholder="Your organization"
                            required
                            className="sales-input"
                          />
                        </FormField>
                        <FormField label="Country" required>
                          <input
                            type="text"
                            name="country"
                            placeholder="Nigeria"
                            required
                            className="sales-input"
                          />
                        </FormField>
                      </div>
                      <FormField label="Type of organization" required>
                        <select
                          name="organization_type"
                          required
                          defaultValue=""
                          className="sales-select"
                        >
                          <option value="" disabled>
                            Select organization type
                          </option>
                          {ORG_TYPE_OPTIONS.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                      </FormField>
                    </FormSection>

                    {/* ── Section: Your Expected Usage ── */}
                    <FormSection
                      title="Your expected usage"
                      description="Helps us recommend the right plan."
                    >
                      <FormField label="How do you currently manage visitors?" required>
                        <select
                          name="current_method"
                          required
                          defaultValue=""
                          className="sales-select"
                        >
                          <option value="" disabled>
                            Select current method
                          </option>
                          {CURRENT_METHOD_OPTIONS.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                      </FormField>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Expected visitors per month" required>
                          <select
                            name="visitors_per_month"
                            required
                            defaultValue=""
                            className="sales-select"
                          >
                            <option value="" disabled>
                              Select volume
                            </option>
                            {VISITORS_PER_MONTH_OPTIONS.map((opt) => (
                              <option key={opt}>{opt}</option>
                            ))}
                          </select>
                        </FormField>
                        <FormField label="Departments using VisiChek" required>
                          <select
                            name="departments"
                            required
                            defaultValue=""
                            className="sales-select"
                          >
                            <option value="" disabled>
                              Select departments
                            </option>
                            {DEPARTMENTS_OPTIONS.map((opt) => (
                              <option key={opt}>{opt}</option>
                            ))}
                          </select>
                        </FormField>
                      </div>

                      <FormField
                        label="What are your priorities?"
                        hint="Select all that apply"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mt-1">
                          {PRIORITY_OPTIONS.map((opt) => (
                            <label
                              key={opt}
                              className="flex items-start gap-2.5 cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                name="priorities"
                                value={opt}
                                className="mt-[3px] h-4 w-4 rounded border-gray-300 text-[#3A9615] focus:ring-2 focus:ring-[#3A9615]/30 cursor-pointer"
                              />
                              <span className="text-[13px] text-gray-700 leading-snug group-hover:text-gray-900">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      </FormField>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Existing access control" required>
                          <select
                            name="access_control"
                            required
                            defaultValue=""
                            className="sales-select"
                          >
                            <option value="" disabled>
                              Select system
                            </option>
                            {ACCESS_CONTROL_OPTIONS.map((opt) => (
                              <option key={opt}>{opt}</option>
                            ))}
                          </select>
                        </FormField>
                        <FormField label="Deployment timeline" required>
                          <select
                            name="timeline"
                            required
                            defaultValue=""
                            className="sales-select"
                          >
                            <option value="" disabled>
                              Select timeline
                            </option>
                            {TIMELINE_OPTIONS.map((opt) => (
                              <option key={opt}>{opt}</option>
                            ))}
                          </select>
                        </FormField>
                      </div>
                    </FormSection>

                    {submitState === "error" && (
                      <p
                        className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
                        role="alert"
                      >
                        {errorMsg}
                      </p>
                    )}
                  </form>
                </div>

                <div className="mx-6 sm:mx-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <div className="shrink-0 px-6 py-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[12px] text-gray-400 order-2 sm:order-1">
                    We&apos;ll only use these details to set you up with
                    VisiChek.
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
                      form="get-started-form"
                      disabled={submitState === "submitting"}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition-all duration-200 hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-px active:scale-[0.98] active:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {submitState === "submitting"
                        ? "Submitting…"
                        : "Submit request"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative flex flex-col items-center text-center px-8 py-14 sm:px-12 sm:py-16">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-gray-200 hover:text-gray-800 hover:rotate-90 active:scale-90"
      >
        <X className="h-4 w-4" strokeWidth={2.5} />
      </button>

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 ring-4 ring-green-100 mb-6">
        <Check className="h-8 w-8 text-[#3A9615]" strokeWidth={3} />
      </div>

      <h3 className="font-serif text-[26px] sm:text-[30px] text-[#1a1a1a] tracking-[-0.02em] leading-tight mb-3">
        Thank you!
      </h3>
      <p className="text-[15px] text-gray-600 max-w-md leading-relaxed">
        We will be in touch with you shortly to get you started with VisiChek.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition-all duration-200 hover:shadow-lg hover:-translate-y-px"
      >
        Close
      </button>
    </div>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4">
      <div>
        <legend className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#3A9615]">
          {title}
        </legend>
        {description && (
          <p className="text-[13px] text-gray-500 mt-1">{description}</p>
        )}
      </div>
      {children}
    </fieldset>
  );
}

function FormField({
  label,
  children,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-gray-700">
        {label}
        {required && <span className="text-[#3A9615] ml-0.5">*</span>}
        {hint && (
          <span className="text-[12px] text-gray-400 font-normal ml-1.5">
            ({hint})
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
