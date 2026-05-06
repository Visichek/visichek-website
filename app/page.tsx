import type { Metadata } from "next";
import MarketingHomePage from "./components/marketing-home-page";

const homeTitle =
  "VisiChek | Workplace security starts with a Visitor Management System";
const homeDescription =
  "VisiChek helps you verify, track, and manage every visitor from arrival to exit without slowing down your front desk.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "https://visichek.app/",
    siteName: "VisiChek",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/visichek-social-share.svg",
        width: 1200,
        height: 630,
        alt: "VisiChek visitor management platform",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@visichek",
    creator: "@visichek",
    title: homeTitle,
    description: homeDescription,
    images: ["/visichek-social-share.svg"],
  },
};

export default function HomePage() {
  return <MarketingHomePage />;
}
