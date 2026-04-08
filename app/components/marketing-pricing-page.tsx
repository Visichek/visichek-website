import { AutomationsSection } from "./marketing-clone/AutomationsSection";
import { CTASection } from "./marketing-clone/CTASection";
import OpenSalesButton from "./open-sales-button";

const basicFeatures = [
  "QR code visitor registration",
  "QR checkout",
  "Searchable visitor logs",
  "CSV/Excel export",
  "2FA check-in/out system",
  "Department admin access",
  "Encrypted database",
  "Email support",
];

const advancedFeatures = [
  "Everything in Basic plus",
  "ID scanning and auto-extraction",
  "Hardware integration",
  "Automatic badge generation",
  "Up to 100 departments per branch",
  "Multi-location and branch management",
  "Active visitor tracking",
  "Priority support and dedicated manager",
  "Custom onboarding and training",
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-0 text-[13px] text-[#4a4a4a]">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 py-[5px]">
          <span className="text-green-600 font-bold text-xs">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function MarketingPricingPage() {
  return (
    <main className="pt-[84px]">
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal visible">
            <p className="text-xs font-semibold text-[#6a6a6a] tracking-[0.05em] mb-4">
              Pricing
            </p>
            <h2 className="font-serif text-[38px] md:text-[48px] text-[#2a2a2a] tracking-[-0.02em] mb-3">
              Pricing for security-first teams
            </h2>
            <p className="text-[15px] text-[#6a6a6a] max-w-2xl mx-auto">
              Pricing scales with locations, departments, rollout needs, and the
              security workflow you need on day one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="relative mt-4 reveal visible">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-green-700 text-white text-[11px] font-semibold px-3.5 py-1 rounded-full whitespace-nowrap overflow-hidden">
                Early access
              </div>
              <div className="overflow-hidden bg-white border border-[#e8e8e8] rounded-3xl p-8 shadow-[0_18px_45px_rgba(16,24,40,0.06)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] hover:-translate-y-[3px] transition-all duration-200">
                <p className="text-[13px] font-semibold text-[#6a6a6a] mb-1 mt-2">
                  Basic
                </p>
                <p className="font-serif text-[40px] font-bold text-[#2a2a2a] leading-none">
                  ₦250,000
                  <span className="font-sans text-base font-normal text-gray-400">
                    {" "}per month
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1 mb-5">
                  Single location · 1-3 departments
                </p>
                <p className="text-[13px] text-[#6a6a6a] mb-5 leading-relaxed">
                  For small to medium organizations starting with one reception
                  point and a tightly controlled visitor workflow.
                </p>
                <hr className="border-[#e8e8e8] my-5" />
                <FeatureList items={basicFeatures} />
                <div className="mt-5 pt-4 border-t border-dashed border-[#e8e8e8]">
                  <p className="text-[11px] font-semibold text-[#6a6a6a] mb-1">
                    Optional add-ons:
                  </p>
                  <p className="text-[12px] text-[#6a6a6a]">
                    API access for integrations
                  </p>
                </div>
                <a
                  href="#waitlist"
                  className="block text-center border-[1.5px] border-[#e8e8e8] text-[#2a2a2a] text-[13.5px] font-semibold py-3 rounded-[20px] mt-6 hover:border-[#2a2a2a] hover:bg-gray-50 transition-all duration-150"
                >
                  Join waitlist
                </a>
              </div>
            </div>

            <div
              className="relative mt-4 reveal visible"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-green-700 text-white text-[11px] font-semibold px-3.5 py-1 rounded-full whitespace-nowrap">
                Best for scale
              </div>
              <div className="overflow-hidden bg-white border-[1.5px] border-green-600 rounded-3xl p-8 shadow-[0_8px_32px_rgba(22,163,74,0.12)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] -translate-y-[3px] transition-all duration-200">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#111111] via-green-600/80 to-green-600/25" />
                <p className="text-[13px] font-semibold text-green-600 mb-1 mt-2">
                  Advanced
                </p>
                <p className="font-serif text-[28px] font-bold text-[#2a2a2a] leading-none">
                  Custom pricing
                </p>
                <p className="text-xs text-gray-400 mt-1 mb-5">
                  Multi-location · Up to 100 departments
                </p>
                <p className="text-[13px] text-[#6a6a6a] mb-5 leading-relaxed">
                  For corporations, campuses, government teams, and security-led
                  rollouts that need deeper controls and deployment support.
                </p>
                <hr className="border-green-200 my-5" />
                <FeatureList items={advancedFeatures} />
                <div className="mt-5 pt-4 border-t border-dashed border-[#e8e8e8]">
                  <p className="text-[11px] font-semibold text-[#6a6a6a] mb-1">
                    Optional add-ons:
                  </p>
                  <p className="text-[12px] text-[#6a6a6a]">
                    Private cloud deployment · API access for integrations
                  </p>
                </div>
                <OpenSalesButton className="block w-full text-center bg-green-700 text-white text-[13.5px] font-semibold py-3 rounded-[20px] mt-6 hover:bg-green-800 transition-all duration-150">
                  Talk to sales
                </OpenSalesButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AutomationsSection />
      <CTASection />
    </main>
  );
}
