import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone", // Required for Azure SSR
  trailingSlash: false, // Keep URLs clean
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
