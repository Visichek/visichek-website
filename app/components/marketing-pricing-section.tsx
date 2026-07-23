"use client";

import { useMemo, useState } from "react";
import OpenGetStartedButton from "./open-sales-button";
import type {
  PricingAddon,
  PricingMarketingPayload,
  PricingPlan,
  PricingTier,
} from "../util/pricing-marketing";
import { formatPlanPrice, yearlySaving } from "../util/pricing-marketing";

const SALES_MAILTO = "mailto:sales@visichek.com?subject=Talk%20to%20sales";

type Billing = "monthly" | "yearly";

type TierTheme = {
  /** Solid header band background (tier strip at the top of each card). */
  banner: string;
  /** Border / accent for the card body. */
  ring: string;
  /** CTA button background. */
  ctaBg: string;
  /** CTA button text. */
  ctaText: string;
  /** CTA hover. */
  ctaHover: string;
  /** Comparison-table column header background. */
  colHeader: string;
};

/**
 * Inspired by the Render pricing page: each tier owns a colour so
 * users can scan card → comparison-table column without losing their
 * place. Free defaults to a neutral blue; we keep purple for the
 * recommended tier because that's where most teams land.
 */
const TIER_THEMES: Record<string, TierTheme> = {
  free: {
    banner: "bg-[#0c2c63]",
    ring: "border-[#0c2c63]/15",
    ctaBg: "bg-[#bcd6ff]",
    ctaText: "text-[#0c2c63]",
    ctaHover: "hover:bg-[#a7c9ff]",
    colHeader: "bg-[#0c2c63]",
  },
  starter: {
    banner: "bg-[#173f1c]",
    ring: "border-[#173f1c]/15",
    ctaBg: "bg-[#b6f06c]",
    ctaText: "text-[#173f1c]",
    ctaHover: "hover:bg-[#a4e85b]",
    colHeader: "bg-[#173f1c]",
  },
  premium: {
    banner: "bg-[#3b0e74]",
    ring: "border-[#3b0e74]/20",
    ctaBg: "bg-[#cbb4ff]",
    ctaText: "text-[#3b0e74]",
    ctaHover: "hover:bg-[#bb9fff]",
    colHeader: "bg-[#3b0e74]",
  },
  enterprise: {
    banner: "bg-[#2a2a2a]",
    ring: "border-[#2a2a2a]/15",
    ctaBg: "bg-[#e8e8e8]",
    ctaText: "text-[#2a2a2a]",
    ctaHover: "hover:bg-[#d8d8d8]",
    colHeader: "bg-[#2a2a2a]",
  },
};

const DEFAULT_THEME: TierTheme = {
  banner: "bg-[#2a2a2a]",
  ring: "border-[#e8e8e8]",
  ctaBg: "bg-[#2a2a2a]",
  ctaText: "text-white",
  ctaHover: "hover:bg-black",
  colHeader: "bg-[#2a2a2a]",
};

function themeFor(tier: PricingTier): TierTheme {
  return TIER_THEMES[String(tier).toLowerCase()] ?? DEFAULT_THEME;
}

function priceLabel(plan: PricingPlan, billing: Billing): string {
  const amount = billing === "monthly" ? plan.priceMonthly : plan.priceYearly;
  if (amount == null) return "Custom pricing";
  return formatPlanPrice(amount, plan.currency);
}

function priceSuffix(plan: PricingPlan, billing: Billing): string | null {
  const amount = billing === "monthly" ? plan.priceMonthly : plan.priceYearly;
  if (amount == null) return null;
  return billing === "monthly" ? "/mo" : "/yr";
}

function ctaHref(plan: PricingPlan): string {
  if (plan.ctaUrl) return plan.ctaUrl;
  if (plan.tier === "enterprise") return SALES_MAILTO;
  return `/signup?plan=${encodeURIComponent(plan.planName)}`;
}

function isInternalCta(plan: PricingPlan): boolean {
  if (plan.ctaUrl) return false;
  return plan.tier !== "enterprise";
}

interface Props {
  payload: PricingMarketingPayload;
}

export default function MarketingPricingSection({ payload }: Props) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const { plans, sections, headline, subheadline, addons } = payload;
  const visibleAddons = useMemo(
    () => (addons ?? []).filter((a) => a.visible),
    [addons],
  );

  const hasYearly = useMemo(
    () => plans.some((p) => p.priceYearly != null),
    [plans],
  );

  const updatedLabel = useMemo(() => {
    if (!payload.lastUpdated) return null;
    try {
      return new Date(payload.lastUpdated * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return null;
    }
  }, [payload.lastUpdated]);

  return (
    // `id="pricing"` is what the marketing header's scroll-spy looks
    // for so the "Pricing" nav link stays active while the user is on
    // this page. Wrapping the whole pricing surface keeps the link
    // highlighted regardless of which sub-section is in view.
    <div id="pricing">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-24 pb-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-[#6a6a6a] tracking-[0.05em] mb-4">
            Pricing
          </p>
          <h1 className="font-serif text-[40px] md:text-[56px] text-[#2a2a2a] tracking-[-0.02em] mb-4 leading-[1.05]">
            {headline}
          </h1>
          <p className="text-[16px] text-[#6a6a6a] max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {hasYearly && (
            <div className="mt-8 inline-flex items-center bg-[#f3f3f3] rounded-full p-1 text-[13px]">
              <BillingToggleButton
                active={billing === "monthly"}
                onClick={() => setBilling("monthly")}
              >
                Monthly
              </BillingToggleButton>
              <BillingToggleButton
                active={billing === "yearly"}
                onClick={() => setBilling("yearly")}
              >
                Yearly
              </BillingToggleButton>
            </div>
          )}
        </div>
      </section>

      {/* ── Plan cards ───────────────────────────────────────── */}
      {/* Stacked single-column on mobile/tablet, then a sticky N-col
          grid at lg+. The dynamic column count is passed in via a CSS
          variable so Tailwind's `lg:` prefix can gate it. */}
      <section className="bg-white pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="grid grid-cols-1 gap-6 lg:gap-2 lg:[grid-template-columns:var(--plan-cols)]"
            style={
              {
                "--plan-cols": `repeat(${plans.length}, minmax(0, 1fr))`,
              } as React.CSSProperties
            }
          >
            {plans.map((plan) => (
              <PlanColumn
                key={plan.planName}
                plan={plan}
                billing={billing}
                addons={visibleAddons}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ─────────────────────────────────── */}
      {sections.length > 0 && (
        <section className="bg-[#fafafa] py-24 border-t border-[#eee]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold text-[#6a6a6a] tracking-[0.05em] mb-3">
                Compare plans
              </p>
              <h2 className="font-serif text-[34px] md:text-[44px] text-[#2a2a2a] tracking-[-0.02em] leading-[1.05]">
                Every feature, side by side
              </h2>
              <p className="text-[15px] text-[#6a6a6a] mt-3">
                Pick the plan that matches your facility&apos;s scale and security
                workflow.
              </p>
              {visibleAddons.length > 0 && (
                <p className="text-[13px] text-[#6a6a6a] mt-4 bg-[#f3f3f3] border border-[#e8e8e8] rounded-md px-3.5 py-2.5">
                  {visibleAddons.map((a) => a.blurb || a.name).join(" ")}
                </p>
              )}
            </div>

            <ComparisonTable plans={plans} sections={sections} billing={billing} />
          </div>
        </section>
      )}

      {updatedLabel && (
        <p className="text-center text-[11px] text-[#9a9a9a] py-6 bg-[#fafafa]">
          Prices updated {updatedLabel}
        </p>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */

function BillingToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full font-medium transition-colors duration-150 ${
        active
          ? "bg-white text-[#2a2a2a] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "text-[#6a6a6a] hover:text-[#2a2a2a]"
      }`}
    >
      {children}
    </button>
  );
}

function PlanColumn({
  plan,
  billing,
  addons,
}: {
  plan: PricingPlan;
  billing: Billing;
  addons: PricingAddon[];
}) {
  const theme = themeFor(plan.tier);
  // Add-ons render only under the plan they require — matched by tier
  // since the requiring plan's slug can vary (canonical "premium" vs
  // marketing copy like "advanced") while its tier stays stable.
  const isPremiumCard = String(plan.tier).toLowerCase() === "premium";
  const planAddons = addons.filter((a) => isPremiumCard && a.slug);
  const price = priceLabel(plan, billing);
  const suffix = priceSuffix(plan, billing);
  const saving = billing === "yearly" ? yearlySaving(plan) : null;

  const ctaClasses = `block w-full text-center text-[13.5px] font-semibold py-3 rounded-md transition-colors duration-150 ${theme.ctaBg} ${theme.ctaText} ${theme.ctaHover}`;
  const href = ctaHref(plan);
  const internal = isInternalCta(plan);

  return (
    <div className="relative flex flex-col">
      {/* Tier banner + price + CTA. Pins under the marketing header
          (84px) at lg+ so column features can scroll past it. On
          mobile/tablet the cards are stacked so sticky would just
          pin each card's header in turn — disabled below lg. */}
      <div
        className={`lg:sticky lg:top-[84px] z-10 border ${theme.ring} rounded-t-2xl overflow-hidden bg-white`}
      >
        <div className={`px-5 pt-6 pb-5 ${theme.banner} text-white relative`}>
          {plan.badge && (
            <span className="absolute top-3 right-3 bg-white/15 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {plan.badge}
            </span>
          )}
          <p className="font-serif text-[26px] md:text-[28px] tracking-[-0.01em] leading-none">
            {plan.displayName}
          </p>
        </div>

        {/* Body laid out so the CTA always anchors to the bottom of a
            shared min-height on lg+: the price block reserves room
            for a two-line "Custom pricing" variant, and `mt-auto` on
            the price+CTA group absorbs any slack from shorter
            taglines — so every card's button lands on the same Y
            line. On mobile (stacked) the min-height is dropped so
            each card sizes to its own content. */}
        <div className="px-5 pt-5 pb-5 bg-white flex flex-col lg:min-h-[320px]">
          {plan.tagline && (
            <p className="text-[12px] text-[#6a6a6a] leading-snug">
              {plan.tagline}
            </p>
          )}

          <div className="mt-auto pt-5">
            <div className="min-h-[60px]">
              <p className="font-serif text-[30px] md:text-[34px] font-medium text-[#2a2a2a] leading-tight flex flex-wrap items-baseline gap-1.5">
                <span>{price}</span>
                {suffix && (
                  <span className="font-sans text-[13px] font-normal text-[#9a9a9a]">
                    {suffix}
                  </span>
                )}
              </p>
              {saving != null && (
                <p className="text-[11px] font-medium text-emerald-700 mt-1.5">
                  Save {formatPlanPrice(saving, plan.currency)} vs monthly
                </p>
              )}
            </div>

            {internal ? (
              <OpenGetStartedButton className={`${ctaClasses} mt-4`}>
                {plan.ctaLabel}
              </OpenGetStartedButton>
            ) : (
              <a className={`${ctaClasses} mt-4`} href={href}>
                {plan.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Feature bullets — scroll past the sticky band above. */}
      <div className={`border-x border-b ${theme.ring} rounded-b-2xl bg-white px-5 py-6 flex-1`}>
        {plan.highlightBullets.length > 0 && (
          <ul className="space-y-3 text-[13px] text-[#3a3a3a]">
            {plan.highlightBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 leading-snug">
                <span className="text-emerald-600 font-bold text-xs mt-[3px]">
                  ✓
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
        {planAddons.length > 0 && (
          <div className="mt-5 pt-5 border-t border-dashed border-[#e0e0e0] space-y-3">
            {planAddons.map((addon) => (
              <AddonNote key={addon.slug} addon={addon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Marketing note for a purchasable add-on (eg "Additional branch"),
 * rendered under the plan card it applies to. Price is optional —
 * when the payload doesn't resolve one (eg the fallback snapshot) we
 * point the visitor to checkout instead of guessing a number.
 */
function AddonNote({ addon }: { addon: PricingAddon }) {
  return (
    <div className="rounded-lg bg-[#faf7ff] border border-[#3b0e74]/10 px-3.5 py-3">
      <p className="text-[11px] font-semibold text-[#3b0e74] uppercase tracking-[0.06em] mb-1">
        Add-on · {addon.name}
      </p>
      <p className="text-[12.5px] text-[#3a3a3a] leading-snug">{addon.blurb}</p>
      <p className="text-[12px] text-[#6a6a6a] mt-1.5">
        {addon.priceMonthly != null
          ? `${formatPlanPrice(addon.priceMonthly, addon.currency)}/mo per branch`
          : "Priced at checkout"}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */

function ComparisonTable({
  plans,
  sections,
  billing,
}: {
  plans: PricingPlan[];
  sections: PricingMarketingPayload["sections"];
  billing: Billing;
}) {
  const gridTemplate = `minmax(180px, 1.4fr) repeat(${plans.length}, minmax(0, 1fr))`;

  return (
    // `md:overflow-x-visible` lets position:sticky pin to the viewport
    // on desktop. On mobile the horizontal-scroll wrapper traps
    // sticky inside it — accepted, since the screen is too narrow to
    // benefit from a sticky header row anyway.
    <div className="overflow-x-auto md:overflow-x-visible -mx-6 md:mx-0">
      <div className="min-w-[820px] md:min-w-0 px-6 md:px-0">
        {/* Column headers — no card chrome, just generous padding so
            the plan summary stays anchored as users scroll rows.
            Sticky only at md+: on mobile the wrapping
            `overflow-x-auto` traps sticky inside the scroller, and
            stacking the plans vertically reads better anyway. */}
        <div
          className="md:sticky md:top-[84px] md:z-20 bg-[#fafafa] border-b border-dashed border-[#d0d0d0]"
        >
          <div
            className="grid gap-3 items-end"
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div />
            {plans.map((plan) => (
              <ComparisonColumnHeader
                key={plan.planName}
                plan={plan}
                billing={billing}
              />
            ))}
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.categoryKey} className="mt-10">
            <h3 className="text-[13px] font-semibold text-[#2a2a2a] uppercase tracking-[0.06em] mb-3">
              {section.label}
            </h3>
            <div className="border-t border-[#e8e8e8]">
              {section.rows.map((row) => (
                <div
                  key={row.rowKey}
                  className="grid items-center gap-3 py-3.5 border-b border-[#eee] text-[13.5px]"
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  <div className="text-[#3a3a3a] pr-3">
                    <span>{row.label}</span>
                    {row.description && (
                      <span
                        title={row.description}
                        className="ml-1.5 inline-flex items-center justify-center w-[15px] h-[15px] rounded-full bg-[#ececec] text-[#6a6a6a] text-[10px] font-semibold cursor-help align-middle"
                      >
                        i
                      </span>
                    )}
                  </div>
                  {plans.map((plan, idx) => {
                    const cell = row.cells[idx];
                    const display = cell?.display ?? "—";
                    return (
                      <div
                        key={plan.planName}
                        className="text-center text-[#2a2a2a]"
                      >
                        <CellDisplay value={display} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Sticky column header for the comparison table. No card chrome —
 * just generous padding, the plan name, the price line, and a
 * full-width CTA tinted with the same tier colours used by the hero
 * pricing cards so the two surfaces feel like one system.
 */
function ComparisonColumnHeader({
  plan,
  billing,
}: {
  plan: PricingPlan;
  billing: Billing;
}) {
  const theme = themeFor(plan.tier);
  const price = priceLabel(plan, billing);
  const suffix = priceSuffix(plan, billing);
  const internal = isInternalCta(plan);
  const href = ctaHref(plan);

  // Solid tier-colour CTA: same banner background used on the hero
  // pricing cards so each column reads as the same plan in both
  // surfaces (free = dark blue, premium = dark purple, etc).
  const ctaClass = `mt-4 inline-flex items-center justify-center w-full py-2.5 rounded-md text-[12.5px] font-semibold text-white transition-opacity duration-150 ${theme.banner} hover:opacity-90`;

  return (
    <div className="px-3 pt-6 pb-5 flex flex-col">
      {plan.badge && (
        <span className="inline-block self-start bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-1 rounded mb-2">
          {plan.badge}
        </span>
      )}
      <p className="text-[16px] font-semibold text-[#2a2a2a] leading-tight">
        {plan.displayName}
      </p>
      <p className="text-[13.5px] text-[#2a2a2a] mt-2 flex items-baseline gap-1">
        <span className="font-medium">{price}</span>
        {suffix && (
          <span className="text-[11.5px] text-[#9a9a9a] font-normal">
            {suffix}
          </span>
        )}
      </p>
      {internal ? (
        <OpenGetStartedButton className={ctaClass}>
          {plan.ctaLabel}
        </OpenGetStartedButton>
      ) : (
        <a className={ctaClass} href={href}>
          {plan.ctaLabel}
        </a>
      )}
    </div>
  );
}

function CellDisplay({ value }: { value: string }) {
  if (value === "✓") {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[12px]">
        ✓
      </span>
    );
  }
  if (value === "—" || value === "-") {
    return <span className="text-[#bdbdbd]">—</span>;
  }
  return <span>{value}</span>;
}
