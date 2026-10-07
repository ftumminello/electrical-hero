import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@electrical-hero/shared", "@electrical-hero/core", "@electrical-hero/design-system"],
  reactCompiler: true,
  turbopack: {
    // Resolve `.web.*` files first so platform-specific components
    // (e.g. button.web.tsx) win over their native counterparts.
    resolveExtensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  async rewrites() {
    return [{ source: "/api/:path*", destination: "http://localhost:3000/:path*" }];
  },
};

export default nextConfig;
