import { AutomationsSection } from "./marketing-clone/AutomationsSection";
import { BillingAutomationSection } from "./marketing-clone/BillingAutomationSection";
import { CaseStudiesSection } from "./marketing-clone/CaseStudiesSection";
import { ComplianceSection } from "./marketing-clone/ComplianceSection";
import { CTASection } from "./marketing-clone/CTASection";
import { EnterpriseFeaturesSection } from "./marketing-clone/EnterpriseFeaturesSection";
import { HeroSection } from "./marketing-clone/HeroSection";
import { InvoicingSection } from "./marketing-clone/InvoicingSection";
import { PricingEngineSection } from "./marketing-clone/PricingEngineSection";
import { DEFAULT_FAQ_PAYLOAD, type FaqPayload } from "../util/faqs";

export default function MarketingHomePage({
  faqs,
}: {
  faqs?: FaqPayload | null;
} = {}) {
  return (
    <main>
      <HeroSection />
      <EnterpriseFeaturesSection />
      <div id="services" className="sticky-container">
        <BillingAutomationSection />
        <PricingEngineSection />
        <InvoicingSection />
      </div>
      <ComplianceSection />
      <AutomationsSection payload={faqs ?? DEFAULT_FAQ_PAYLOAD} />

      <CTASection />
    </main>
  );
}
