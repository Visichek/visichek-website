import type { Metadata } from "next";
import MarketingPricingPage from "../components/marketing-pricing-page";

export const metadata: Metadata = {
  title: "VisiChek Pricing & Resources",
  description: "Explore VisiChek pricing, FAQs, and operational benefits.",
};

export default function PricingPage() {
  return <MarketingPricingPage />;
}
