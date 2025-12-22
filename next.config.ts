import { withSentryConfig } from "@sentry/nextjs";
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

  // Experimental features
  experimental: {
    // Increase body size limit for Server Actions to 10MB
    // Images are uploaded separately to Cloudinary, but this provides safety margin
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // Webpack configuration to fix WebSocket bundling in production
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize ws and other native modules to prevent bundling errors in production
      // This fixes the "b.mask is not a function" error in Vercel serverless functions
      config.externals = config.externals || [];
      config.externals.push({
        ws: "commonjs ws",
        bufferutil: "commonjs bufferutil",
        "utf-8-validate": "commonjs utf-8-validate",
      });
    }
    return config;
  },

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

// Conditionally apply Sentry config - skip entirely during build to avoid crypto.randomUUID() issues
// Check both NEXT_PHASE and presence of specific build commands
const isBuildPhase =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.argv.includes("build") ||
  process.env.npm_lifecycle_event === "build";

const finalConfig = isBuildPhase
  ? nextConfig
  : withSentryConfig(nextConfig, {
      // For all available options, see:
      // https://www.npmjs.com/package/@sentry/webpack-plugin#options

      org: "yuvoo",

      project: "javascript-nextjs",

      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,

      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
      // This can increase your server load as well as your hosting bill.
      // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
      // side errors will fail.
      tunnelRoute: "/monitoring",

      // Note: Sentry's webpack config is a plugin config, not a full webpack function
      // The webpack externals for ws are handled in nextConfig.webpack above
      automaticVercelMonitors: true,

      // Tree-shaking options for reducing bundle size
      sourcemaps: {
        assets: "./.next/**/*",
        deleteSourcemapsAfterUpload: false, // Keep source maps for better debugging
      },
      disableLogger: false, // Keep logger for production debugging
    });

export default finalConfig;
