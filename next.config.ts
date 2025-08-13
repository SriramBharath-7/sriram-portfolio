import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0,
  experimental: {
    optimizePackageImports: ['framer-motion', 'recharts', 'gsap'],
  },
};

export default nextConfig;