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

const MARKETING_ROUTES = new Set(["/", "/pricing", "/blog", "/privacy", "/terms", "/dpa"]);

export default function ChromeRouter({
  children,
  contentHeader,
  contentFooter,
  marketingHeader,
  marketingFooter,
}: ChromeRouterProps) {
  const pathname = usePathname();
  const isMarketingRoute = MARKETING_ROUTES.has(pathname);

  if (isMarketingRoute) {
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
