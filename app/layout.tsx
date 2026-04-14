import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedPage } from "./components/animatedpage";
import Header from "./components/header";
import Footer from "./components/footer";
import ProgressBarProvider from "./components/progressbar";
import ChromeRouter from "./components/chrome-router";
import MarketingHeader from "./components/marketing-header";
import MarketingFooter from "./components/marketing-footer";
import SmoothScroll from "@/components/ui/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const moderatSerif = localFont({
  src: [
    {
      path: "../public/marketing-clone/fonts/moderat-serif-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/marketing-clone/fonts/moderat-serif-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-moderat-serif",
  display: "swap",
});

const twkLausanne = localFont({
  src: [
    {
      path: "../public/marketing-clone/fonts/twk-lausanne.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-twk-lausanne",
  display: "swap",
});

const sfMono = localFont({
  src: [
    {
      path: "../public/marketing-clone/fonts/sf-mono.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sf-mono",
  display: "swap",
});

const rockSalt = localFont({
  src: [
    {
      path: "../public/marketing-clone/fonts/rock-salt.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-rock-salt",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://visichek.app"),
  title: {
    default: "VisiChek",
    template: "%s | VisiChek",
  },
  description:
    "VisiChek helps teams verify, track, and manage every visitor across modern facilities and connected workplaces.",
  openGraph: {
    title: "VisiChek",
    description:
      "Visitor management for modern facilities, departments, and security teams.",
    url: "https://visichek.app/",
    siteName: "VisiChek",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VisiChek visitor management platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VisiChek",
    description:
      "Visitor management for modern facilities, compliance, and workplace operations.",
    images: ["/logo-footer.png"],
  },
  keywords: [
    "visitor management system",
    "workplace security",
    "front desk operations",
    "access control",
    "physical security",
    "visitor tracking",
    "badge printing",
    "NDPR compliance",
    "ID scanning",
    "facility operations",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${moderatSerif.variable} ${twkLausanne.variable} ${sfMono.variable} ${rockSalt.variable}`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#374151 #000000",
      }}
    >
      <body className="relative bg-[#1A1A1A]">
        <SmoothScroll />
        <ProgressBarProvider>
          <ChromeRouter
            contentHeader={<Header />}
            contentFooter={<Footer />}
            marketingHeader={<MarketingHeader />}
            marketingFooter={<MarketingFooter />}
          >
            <AnimatedPage>{children}</AnimatedPage>
          </ChromeRouter>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
