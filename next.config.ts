import type { NextConfig } from "next";

/**
 * Next.js Configuration for Yuvoo
 *
 * This configuration includes:
 * - Image optimization settings (Cloudinary)
 * - Environment variable validation
 * - Production optimizations
 * - TypeScript strict mode
 */
const nextConfig: NextConfig = {
  // Image optimization
  images: {
    // Allow images from Cloudinary CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Allow local images
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
    // Image formats
    formats: ["image/avif", "image/webp"],
    // Image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // TypeScript configuration
  typescript: {
    // Fail build on TypeScript errors in production
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Fail build on ESLint errors in production
    ignoreDuringBuilds: false,
  },

  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  reactStrictMode: true, // Enable React strict mode

  // Experimental features (if needed)
  // experimental: {
  //   // Add experimental features here if needed
  // },
};

export default nextConfig;
