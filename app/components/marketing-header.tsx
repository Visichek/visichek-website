"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import GlassSurface from "@/components/GlassSurface";

const SCROLL_THRESHOLD = 50;
const EASE = "cubic-bezier(0.16,1,0.3,1)";

function openSalesModal() {
  window.dispatchEvent(new Event("visicheck:open-sales"));
}

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#3A9615" strokeWidth="2" />
      <path
        d="M8 14L12 18L20 10"
        stroke="#3A9615"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Nav link with active state ─── */
function NavLink({
  href,
  children,
  isActive,
  isGlass,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  isGlass: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative flex items-center"
    >
      {/* Pill background — only for active link */}
      <span
        className="absolute -inset-x-2.5 -inset-y-1 rounded-full transition-all duration-300"
        style={{
          background: isActive
            ? isGlass
              ? "rgba(255,255,255,0.55)"
              : "rgba(58,150,21,0.07)"
            : "transparent",
          boxShadow: isActive
            ? isGlass
              ? "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)"
              : "none"
            : "none",
          border: isActive
            ? isGlass
              ? "1px solid rgba(255,255,255,0.5)"
              : "1px solid rgba(58,150,21,0.12)"
            : "1px solid transparent",
          transform: isActive ? "scale(1)" : "scale(0.92)",
          opacity: isActive ? 1 : 0,
          transitionTimingFunction: EASE,
        }}
      />

      {/* Text */}
      <span
        className="relative z-[1] transition-all duration-300"
        style={{
          fontSize: "13.5px",
          fontWeight: isActive ? 600 : 500,
          color: isActive
            ? isGlass
              ? "#111827"
              : "#2e7a11"
            : isGlass
              ? "#1f2937"
              : "#4b5563",
          transitionTimingFunction: EASE,
        }}
      >
        {children}
      </span>

      {/* Green dot indicator — only for active */}
      <span
        className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-300"
        style={{
          width: isActive ? "4px" : "0px",
          height: isActive ? "4px" : "0px",
          bottom: "-8px",
          background: "#3A9615",
          opacity: isActive ? 1 : 0,
          boxShadow: isActive ? "0 0 6px rgba(58,150,21,0.4)" : "none",
          transitionTimingFunction: EASE,
        }}
      />

      {/* Hover underline — only for non-active */}
      {!isActive && (
        <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-center scale-x-0 rounded-full bg-[#3A9615]/40 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      )}
    </Link>
  );
}

/* ─── Scroll-spy: tracks which #section is in view ─── */
function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] || "");

  useEffect(() => {
    // Clean IDs: remove leading # and path prefixes
    const cleanIds = sectionIds
      .map((id) => {
        const hash = id.split("#")[1];
        return hash || "";
      })
      .filter(Boolean);

    if (cleanIds.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visibleSet = new Set<string>();

    cleanIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSet.add(id);
          } else {
            visibleSet.delete(id);
          }
          // Pick the first visible section in DOM order
          for (const cid of cleanIds) {
            if (visibleSet.has(cid)) {
              setActive(cid);
              return;
            }
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}

export default function MarketingHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rafRef = useRef<number | null>(null);
  const isHome = pathname === "/";
  const isPricing = pathname === "/pricing";

  const links = isHome
    ? [
        { label: "Overview", href: "#overview" },
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "/pricing#pricing" },
        { label: "Waitlist", href: "#waitlist" },
        { label: "Blogs", href: "/blog" },
      ]
    : isPricing
      ? [
          { label: "Overview", href: "/#overview" },
          { label: "Features", href: "/#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Waitlist", href: "#waitlist" },
          { label: "Blogs", href: "/blog" },
        ]
      : [
          { label: "Overview", href: "/#overview" },
          { label: "Features", href: "/#features" },
          { label: "Pricing", href: "/pricing#pricing" },
          { label: "Waitlist", href: "/#waitlist" },
          { label: "Blogs", href: "/blog" },
        ];

  const sectionHrefs = links.map((l) => l.href);
  const activeSection = useActiveSection(sectionHrefs);

  useEffect(() => {
    const tick = () => {
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      });
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => {
      window.removeEventListener("scroll", tick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const barH = isScrolled ? 60 : 72;
  const barR = isScrolled ? 24 : 0;

  function isLinkActive(href: string) {
    const hash = href.split("#")[1];
    if (!hash) return false;
    return activeSection === hash;
  }

  return (
    <>
      {/* ═══════ HEADER ═══════ */}
      <header
        className="fixed inset-x-0 top-0 z-50 pointer-events-none"
        style={{
          padding: isScrolled ? "10px 16px 0" : "0",
          transition: `padding 0.55s ${EASE}`,
        }}
      >
        <div
          className="pointer-events-auto relative mx-auto"
          style={{
            maxWidth: isScrolled ? "1140px" : "none",
            height: `${barH}px`,
            borderRadius: `${barR}px`,
            transition: [
              `max-width 0.55s ${EASE}`,
              `height 0.55s ${EASE}`,
              `border-radius 0.55s ${EASE}`,
            ].join(", "),
          }}
        >
          {/* Layer 0 — GlassSurface */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: "inherit",
              transition: `border-radius 0.55s ${EASE}`,
            }}
          >
            <GlassSurface
              width={1280}
              height={barH}
              borderRadius={barR}
              borderWidth={0.1}
              brightness={92}
              opacity={0.5}
              blur={14}
              displace={0.35}
              backgroundOpacity={0.06}
              saturation={1.8}
              distortionScale={-120}
              redOffset={0}
              greenOffset={8}
              blueOffset={16}
              mixBlendMode="screen"
              className="glass-navbar"
              style={{
                width: "100%",
                height: `${barH}px`,
                borderRadius: `${barR}px`,
                transition: [
                  `height 0.55s ${EASE}`,
                  `border-radius 0.55s ${EASE}`,
                ].join(", "),
              }}
            >
              <span />
            </GlassSurface>
          </div>

          {/* Layer 1 — White cover (fades on scroll) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: "#ffffff",
              borderBottom: isScrolled
                ? "none"
                : "1px solid rgba(0,0,0,0.06)",
              opacity: isScrolled ? 0 : 1,
              transition: "opacity 0.4s ease, border-bottom 0.4s ease",
            }}
          />

          {/* Layer 2 — Drop shadow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              
              opacity: isScrolled ? 1 : 0,
              transition: `opacity 0.5s ${EASE}`,
            }}
          />

          {/* Layer 3 — Nav content */}
          <div
            className="relative z-10 flex h-full items-center justify-between"
            style={{
              padding: isScrolled ? "0 20px" : "0 28px",
              transition: `padding 0.55s ${EASE}`,
            }}
          >
            {/* Brand */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
             
              <span
                className="font-semibold tracking-tight text-green-500 transition-colors duration-300"
                style={{
                  fontSize: "17px",
                  color: isScrolled ?  "#359300": "#000000",
                }}
              >
                VisiChek
              </span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden items-center gap-7 lg:flex">
              {links.map((l) => (
                <NavLink
                  key={l.label}
                  href={l.href}
                  isActive={isLinkActive(l.href)}
                  isGlass={isScrolled}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openSalesModal}
                className="hidden rounded-full px-4 py-[7px] text-[13px] font-medium transition-all duration-200 hover:shadow-sm md:inline-flex"
                style={{
                  border: isScrolled
                    ? "1px solid rgba(0,0,0,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",
                  background: isScrolled
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(0,0,0,0.03)",
                  color: isScrolled ? "#1f2937" : "#374151",
                  transition: `all 0.4s ${EASE}`,
                }}
              >
                Contact Sales
              </button>
              <Link
                href="/pricing#pricing"
                className="inline-flex items-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-4 py-[7px] text-[13px] font-semibold text-white shadow-sm shadow-green-700/15 transition-all duration-200 hover:-translate-y-px hover:shadow-md hover:shadow-green-600/20"
              >
                Get Pricing
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 lg:hidden"
                style={{
                  border: isScrolled
                    ? "1px solid rgba(0,0,0,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",
                  background: isScrolled
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(0,0,0,0.03)",
                  color: isScrolled ? "#1f2937" : "#374151",
                  transition: `all 0.4s ${EASE}`,
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════ MOBILE MENU ═══════ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeMobile}
          />

          <div
            className="absolute left-4 right-4 z-10 overflow-hidden rounded-2xl animate-in slide-in-from-top-2 fade-in duration-300"
            style={{
              top: isScrolled ? "82px" : "78px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <GlassSurface
              width={600}
              height={400}
              borderRadius={16}
              borderWidth={0.08}
              brightness={94}
              opacity={0.45}
              blur={16}
              displace={0.3}
              backgroundOpacity={0.05}
              saturation={1.6}
              distortionScale={-100}
              redOffset={0}
              greenOffset={6}
              blueOffset={12}
              mixBlendMode="screen"
              style={{ width: "100%", height: "auto" }}
            >
              <div className="flex w-full flex-col gap-1 p-3">
                {links.map((l, i) => {
                  const active = isLinkActive(l.href);
                  return (
                    <Link
                      key={l.label}
                      href={l.href}
                      onClick={closeMobile}
                      className="rounded-xl px-4 py-3 text-[15px] transition-all duration-200 hover:bg-white/40 hover:pl-5"
                      style={{
                        animationDelay: `${i * 40}ms`,
                        fontWeight: active ? 600 : 500,
                        color: active ? "#2e7a11" : "#1f2937",
                        background: active
                          ? "rgba(58,150,21,0.06)"
                          : "transparent",
                        borderLeft: active
                          ? "3px solid #3A9615"
                          : "3px solid transparent",
                      }}
                    >
                      {l.label}
                    </Link>
                  );
                })}
                <div className="my-1 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent" />
                <button
                  type="button"
                  onClick={() => {
                    closeMobile();
                    openSalesModal();
                  }}
                  className="rounded-xl px-4 py-3 text-left text-[15px] font-medium text-gray-800 transition-all duration-200 hover:bg-white/40 hover:pl-5"
                >
                  Contact Sales
                </button>
                <Link
                  href="/pricing#pricing"
                  onClick={closeMobile}
                  className="mt-1 flex items-center justify-center rounded-xl bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-4 py-3 text-[15px] font-semibold text-white shadow-sm shadow-green-700/15"
                >
                  Get Pricing
                </Link>
              </div>
            </GlassSurface>
          </div>
        </div>
      )}
    </>
  );
}
