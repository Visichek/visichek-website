import type { Metadata } from "next";
import MarketingHomePage from "./components/marketing-home-page";

export const metadata: Metadata = {
  title: "VisiChek | Workplace security starts with a Visitor Management System",
  description:
    "VisiChek helps you verify, track, and manage every visitor from arrival to exit without slowing down your front desk.",
};

export default function HomePage() {
  return <MarketingHomePage />;
}
