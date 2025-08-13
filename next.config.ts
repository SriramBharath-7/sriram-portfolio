import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'recharts', 'gsap'],
  },
};

export default nextConfig;