import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // SSR mode for Azure App Service - enables ISR and server components
  trailingSlash: false,
  images: {
    // Enable Next.js image optimization for App Service
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "**.azureedge.net",
      },
    ],
  },
  // Environment-based API URL
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  },
  // Logging for debugging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;
