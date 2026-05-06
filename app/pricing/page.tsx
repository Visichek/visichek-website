import type { Metadata } from "next";
import MarketingPricingPage from "../components/marketing-pricing-page";

const pricingTitle = "VisiChek Pricing & Resources";
const pricingDescription =
  "Explore VisiChek pricing plans, frequently asked questions, and the operational benefits of running a modern visitor management system.";

export const metadata: Metadata = {
  title: pricingTitle,
  description: pricingDescription,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: pricingTitle,
    description: pricingDescription,
    url: "https://visichek.app/pricing",
    siteName: "VisiChek",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/visichek-social-share.svg",
        width: 1200,
        height: 630,
        alt: "VisiChek pricing and resources",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@visichek",
    creator: "@visichek",
    title: pricingTitle,
    description: pricingDescription,
    images: ["/visichek-social-share.svg"],
  },
};

export default function PricingPage() {
  return <MarketingPricingPage />;
}
