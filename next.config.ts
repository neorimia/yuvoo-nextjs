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

  // Transpile packages that have strict exports
  transpilePackages: ["timepicker-ui-react"],

  // Webpack configuration to handle packages with strict exports
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fix for timepicker-ui-react package exports issue
      // Allow CommonJS require to bypass exports field
      config.resolve.extensionAlias = {
        ...config.resolve.extensionAlias,
        ".js": [".js", ".ts", ".tsx"],
      };
    }
    return config;
  },
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

      webpack: {
        // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,

        // Tree-shaking options for reducing bundle size
        treeshake: {
          // Automatically tree-shake Sentry logger statements to reduce bundle size
          removeDebugLogging: true,
        },
      },
    });

export default finalConfig;
