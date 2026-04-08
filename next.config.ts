import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    viewTransition: true, // Enables React's ViewTransition API
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
