/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Ensure static files are properly handled
  trailingSlash: false,
  // Optimize for production
  swcMinify: true,
  // Handle potential build issues
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors (only use if you're confident about your types)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors
    ignoreDuringBuilds: false,
  },
  // Enable React Strict Mode
  reactStrictMode: true,
}

module.exports = nextConfig
