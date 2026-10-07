import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@electrical-hero/shared"],
  async rewrites() {
    return [{ source: "/api/:path*", destination: "http://localhost:3000/:path*" }];
  },
};

export default nextConfig;
