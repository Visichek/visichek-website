import { AutomationsSection } from "./marketing-clone/AutomationsSection";
import { BillingAutomationSection } from "./marketing-clone/BillingAutomationSection";
import { CaseStudiesSection } from "./marketing-clone/CaseStudiesSection";
import { ComplianceSection } from "./marketing-clone/ComplianceSection";
import { CTASection } from "./marketing-clone/CTASection";
import { EnterpriseFeaturesSection } from "./marketing-clone/EnterpriseFeaturesSection";
import { HeroSection } from "./marketing-clone/HeroSection";
import { InvoicingSection } from "./marketing-clone/InvoicingSection";
import { PricingEngineSection } from "./marketing-clone/PricingEngineSection";

export default function MarketingHomePage() {
  return (
    <main>
      <HeroSection />
      <EnterpriseFeaturesSection />
      <div className="sticky-container">
        <BillingAutomationSection />
        <PricingEngineSection />
        <InvoicingSection />
      </div>
      <ComplianceSection />
      <AutomationsSection />
     
      <CTASection />
    </main>
  );
}
