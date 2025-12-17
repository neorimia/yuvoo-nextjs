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
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
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

  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  reactStrictMode: true, // Enable React strict mode

  // Note: The "useContext is not exported from 'react'" warning from Stack Auth
  // is a known compatibility issue with React 19. It's a bundling warning that
  // doesn't break functionality. Stack Auth will need to update for full React 19 support.

  // Cache Components (Next.js 16.0.8 - moved to root level)
  cacheComponents: true,

  // PostHog rewrites for analytics ingestion
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
