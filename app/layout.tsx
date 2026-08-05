import type { Metadata } from "next";
import Script from "next/script";
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
import { fetchLegalDocumentHrefByDocType } from "./util/legal";

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
    default: "VisiChek: Secure Digital Visitor Management System",
    template: "%s | VisiChek",
  },
  description:
    "Replace your paper logbooks with fast, secure visitor check-in. ID verification, badge printing, and real-time records for your facility.",
  applicationName: "VisiChek",
  authors: [{ name: "VisiChek", url: "https://visichek.app" }],
  creator: "VisiChek",
  publisher: "VisiChek",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VisiChek: Secure Digital Visitor Management System",
    description:
      "Replace your paper logbooks with fast, secure visitor check-in. ID verification, badge printing, and real-time records for your facility.",
    url: "https://visichek.app/",
    siteName: "VisiChek",
    images: [
      {
        url: "/visichek-social-share.svg",
        width: 1200,
        height: 630,
        alt: "VisiChek visitor management platform",
        type: "image/svg+xml",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@visichek",
    creator: "@visichek",
    title: "VisiChek: Secure Digital Visitor Management System",
    description:
      "Replace your paper logbooks with fast, secure visitor check-in. ID verification, badge printing, and real-time records for your facility.",
    images: ["/visichek-social-share.svg"],
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
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://visichek.app/#organization",
      name: "VisiChek",
      url: "https://visichek.app/",
      logo: {
        "@type": "ImageObject",
        url: "https://visichek.app/visichek-logomark.svg",
        width: 512,
        height: 512,
      },
      image: "https://visichek.app/visichek-social-share.svg",
      description:
        "VisiChek helps teams verify, track, and manage every visitor across modern facilities and connected workplaces.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@visichek.com",
        availableLanguage: ["English"],
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://visichek.app/#website",
      url: "https://visichek.app/",
      name: "VisiChek",
      description:
        "Visitor management for modern facilities, departments, and security teams.",
      publisher: { "@id": "https://visichek.app/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://visichek.app/#software",
      name: "VisiChek",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Visitor Management System",
      operatingSystem: "Web, iOS, Android",
      url: "https://visichek.app/",
      image: "https://visichek.app/visichek-social-share.svg",
      description:
        "VisiChek is a visitor management platform that helps facilities verify, track, and manage every visitor from arrival to exit — with badge printing, ID scanning, and NDPR-compliant audit logs.",
      publisher: { "@id": "https://visichek.app/#organization" },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "0",
        availability: "https://schema.org/InStock",
        url: "https://visichek.app/pricing",
      },
      featureList: [
        "Visitor check-in & check-out",
        "ID scanning and verification",
        "Badge printing",
        "Pre-registration & invites",
        "Host notifications",
        "Audit logs and reporting",
        "NDPR-compliant data handling",
      ],
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolved here so the footer ships with a real document URL in the markup.
  // Cached upstream (5 min revalidate), so this is a cache read on the hot
  // path rather than a per-request round trip. `null` -> the footer omits the
  // link entirely.
  const privacyPolicyHref =
    await fetchLegalDocumentHrefByDocType("privacy_policy");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${moderatSerif.variable} ${twkLausanne.variable} ${sfMono.variable} ${rockSalt.variable}`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#374151 #000000",
      }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5R77J4DS');
          `}
        </Script>
      </head>
      <body className="relative bg-[#1A1A1A]" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5R77J4DS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <SmoothScroll />
        <ProgressBarProvider>
          <ChromeRouter
            contentHeader={<Header />}
            contentFooter={<Footer />}
            marketingHeader={<MarketingHeader />}
            marketingFooter={
              <MarketingFooter privacyPolicyHref={privacyPolicyHref} />
            }
          >
            <AnimatedPage>{children}</AnimatedPage>
          </ChromeRouter>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
