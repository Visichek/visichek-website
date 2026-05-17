import { AutomationsSection } from "./marketing-clone/AutomationsSection";
import { CTASection } from "./marketing-clone/CTASection";
import MarketingPricingSection from "./marketing-pricing-section";
import {
  DEFAULT_PRICING_PAYLOAD,
  type PricingMarketingPayload,
} from "../util/pricing-marketing";
import { DEFAULT_FAQ_PAYLOAD, type FaqPayload } from "../util/faqs";

/**
 * Marketing pricing page.
 *
 * The pricing surface is fully driven by a `PricingMarketingPayload`
 * — when the live `/v1/pricing-marketing` fetch succeeds we render
 * that, otherwise we fall back to `DEFAULT_PRICING_PAYLOAD` so the
 * new design always shows (and never goes blank during an API hiccup
 * or while the backend is being stood up). The FAQ block works the
 * same way against `/v1/faqs`.
 */
interface MarketingPricingPageProps {
  payload?: PricingMarketingPayload | null;
  faqs?: FaqPayload | null;
}

export default function MarketingPricingPage({
  payload,
  faqs,
}: MarketingPricingPageProps = {}) {
  return (
    <main className="pt-[84px]">
      <MarketingPricingSection payload={payload ?? DEFAULT_PRICING_PAYLOAD} />
      <AutomationsSection payload={faqs ?? DEFAULT_FAQ_PAYLOAD} />
      <CTASection />
    </main>
  );
}
