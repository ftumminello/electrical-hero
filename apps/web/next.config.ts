import type { NextConfig } from "next";

const ADMIN_HOST = process.env.ADMIN_HOST ?? "admin.electrical-hero.com";

const nextConfig: NextConfig = {
  transpilePackages: ["@electrical-hero/shared", "@electrical-hero/core", "@electrical-hero/design-system"],
  reactCompiler: true,
  turbopack: {
    // Resolve `.web.*` files first so platform-specific components
    // (e.g. button.web.tsx) win over their native counterparts.
    resolveExtensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  async rewrites() {
    return {
      // admin.electrical-hero.com serves the admin page at its root. Only "/" is rewritten so /_next assets still resolve.
      beforeFiles: [{ source: "/", has: [{ type: "host", value: ADMIN_HOST }], destination: "/admin" }],
      afterFiles: [{ source: "/api/:path*", destination: "http://localhost:3000/:path*" }],
      fallback: [],
    };
  },
};

export default nextConfig;
