import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    viewTransition: true, // Enables React's ViewTransition API
    optimizePackageImports: [
      "lucide-react",
      "@blocknote/react",
      "@blocknote/mantine",
      "framer-motion",
      "motion",
      "@radix-ui/react-icons",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "commondatastorage.googleapis.com",
        pathname: "/gtv-videos-bucket/**",
      },
      {
        protocol: "https",
        hostname: "iili.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.iili.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https", // Updated to https based on your logs
        hostname: "player-rising-api.aleeaqee.com", // REMOVED "http://"
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "r2.thesportsdb.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
