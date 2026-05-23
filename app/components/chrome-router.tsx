"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ChromeRouterProps {
  children: ReactNode;
  contentHeader: ReactNode;
  contentFooter: ReactNode;
  marketingHeader: ReactNode;
  marketingFooter: ReactNode;
}

// The dark "content" chrome is reserved for the video library; every other
// route — including unmatched paths that resolve to the 404 page — uses the
// light marketing chrome so the brand stays consistent.
const CONTENT_PREFIXES = ["/videos"];

export default function ChromeRouter({
  children,
  contentHeader,
  contentFooter,
  marketingHeader,
  marketingFooter,
}: ChromeRouterProps) {
  const pathname = usePathname();
  const isContentRoute = CONTENT_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isContentRoute) {
    return (
      <div className="marketing-shell min-h-screen bg-white text-[#2a2a2a] antialiased overflow-x-clip">
        {marketingHeader}
        {children}
        {marketingFooter}
      </div>
    );
  }

  return (
    <>
      {contentHeader}
      {children}
      {contentFooter}
    </>
  );
}
