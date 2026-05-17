"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback, FormEvent } from "react";
import { X, Check } from "lucide-react";
import { ONBOARDING_ENDPOINTS } from "../util/api";

const SALES_MAILTO = "mailto:sales@visichek.com?subject=Talk%20to%20sales";
const ONBOARDING_ENDPOINT =
  process.env.NEXT_PUBLIC_ONBOARDING_ENDPOINT ?? ONBOARDING_ENDPOINTS.submissions();
const FORM_VERSION = "2026-05-01";
const TURNSTILE_SITE_KEY = "0x4AAAAAADKLd7-DRWNPJLBG";
const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

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

const FIELD_LABELS: Record<string, string> = {
  full_name: "Full name",
  work_email: "Work email",
  phone_number: "Phone number",
  role: "Your role",
  organization_name: "Organization name",
  country: "Country",
  organization_type: "Type of organization",
  current_method: "How visitors are managed today",
  visitors_per_month: "Expected visitors per month",
  departments: "Departments using VisiChek",
  priorities: "Priorities",
  access_control: "Existing access control",
  timeline: "Deployment timeline",
  marketing_opt_in: "Marketing opt-in",
};

const FIELD_ORDER: string[] = Object.keys(FIELD_LABELS);

export default function MarketingFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const modalCardRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

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
      setTurnstileToken("");
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }
      turnstileWidgetIdRef.current = null;
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

  useEffect(() => {
    if (document.getElementById(TURNSTILE_SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isModalOpen || submitState === "success") return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tryRender = () => {
      if (cancelled) return;
      const turnstile = window.turnstile;
      const container = turnstileContainerRef.current;
      if (!turnstile || !container) {
        timer = setTimeout(tryRender, 120);
        return;
      }
      if (turnstileWidgetIdRef.current) return;
      turnstileWidgetIdRef.current = turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };
    tryRender();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [isModalOpen, submitState]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (!turnstileToken) {
        setErrorMsg("Please complete the security check before submitting.");
        setSubmitState("error");
        return;
      }

      const formData = new FormData(form);
      const payload: Record<string, string | string[]> = {};
      for (const key of new Set(formData.keys())) {
        if (key === "cf-turnstile-response") continue;
        const values = formData.getAll(key).map(String);
        payload[key] = values.length > 1 ? values : values[0];
      }

      setSubmitState("submitting");
      setErrorMsg("");
      try {
        const res = await fetch(ONBOARDING_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            form_version: FORM_VERSION,
            payload,
            field_labels: FIELD_LABELS,
            field_order: FIELD_ORDER,
            turnstile_token: turnstileToken,
          }),
        });

        if (res.ok) {
          setSubmitState("success");
          form.reset();
        } else {
          const data = await res.json().catch(() => ({}));
          const detailError = data?.details?.error;

          let message: string;
          if (data?.code === "FEATURE_DISABLED") {
            message =
              "Self-onboarding is paused — please email support@visichek.com.";
          } else if (detailError === "turnstile_failed") {
            message = "Security check failed. Please try again.";
          } else if (detailError === "turnstile_unreachable") {
            message =
              "Security check is temporarily unavailable. Please try again.";
          } else if (res.status === 429) {
            message = "Too many requests. Please wait a moment and retry.";
          } else {
            message = "Something went wrong. Please try again.";
          }

          setErrorMsg(message);
          setSubmitState("error");
        }
      } catch {
        setErrorMsg("Network error. Please check your connection and retry.");
        setSubmitState("error");
      } finally {
        setTurnstileToken("");
        if (turnstileWidgetIdRef.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetIdRef.current);
        }
      }
    },
    [turnstileToken],
  );

  return (
    <>
      <footer
        id="get-started"
        className="bg-white border-t border-border py-14"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="mb-4 inline-flex items-center"
                aria-label="VisiChek home"
              >
                <img
                  src="/visichek-logomark.svg"
                  alt="VisiChek"
                  width={160}
                  height={29}
                  className="h-7 w-auto"
                />
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
          data-lenis-prevent
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
              overflow-hidden
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
                      <img
                        src="/visichek-favicon.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
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

                    <label className="flex items-start gap-2.5 cursor-pointer group rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                      <input
                        type="checkbox"
                        name="marketing_opt_in"
                        value="yes"
                        className="mt-[3px] h-4 w-4 rounded border-gray-300 text-[#3A9615] focus:ring-2 focus:ring-[#3A9615]/30 cursor-pointer"
                      />
                      <span className="text-[13px] text-gray-700 leading-snug group-hover:text-gray-900">
                        Keep me in the loop with VisiChek product updates,
                        newsletters, and occasional marketing emails. You can
                        unsubscribe anytime.
                      </span>
                    </label>

                    <div className="flex flex-col gap-2">
                      <span className="text-[13px] font-medium text-gray-700">
                        Security check
                      </span>
                      <div ref={turnstileContainerRef} />
                    </div>

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
                      disabled={submitState === "submitting" || !turnstileToken}
                      title={
                        !turnstileToken
                          ? "Complete the security check to enable submission"
                          : undefined
                      }
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
