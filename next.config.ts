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

  // Canonical host: apex (yuvoo.ro). www redirects to apex for SEO consistency.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.yuvoo.ro" }],
        destination: "https://yuvoo.ro/:path*",
        permanent: true,
      },
    ];
  },

  // PostHog rewrites + IndexNow key verification file
  async rewrites() {
    const indexNowKey = process.env.INDEXNOW_KEY?.trim() || "yuvoo-indexnow-key-2026";

    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: `/${indexNowKey}.txt`,
        destination: "/api/indexnow/key",
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

// Sentry Configuration
// We use dynamic import to avoid crypto.randomUUID() errors during Next.js 16 Cache Components prerendering.
// The @sentry/nextjs package uses crypto.randomUUID() internally during module initialization,
// which conflicts with Next.js's prerendering constraints.

// For development and production runtime, we need to apply Sentry config.
// For production builds, we also need Sentry for source map uploads.
// The key is to NOT import @sentry/nextjs during prerendering in development.
let finalConfig: NextConfig = nextConfig;

// IMPORTANT: We completely disable Sentry wrapping during build to avoid crypto.randomUUID() errors
// with Next.js 16 Cache Components. Sentry's webpack wrapper uses crypto.randomUUID() during
// module initialization, which conflicts with Next.js prerendering constraints.
// Source maps can still be uploaded via Sentry CLI if needed, but pages won't be wrapped during build.
// Sentry will work at runtime via instrumentation.ts.
//
// CURRENT STATUS: Disabled (if (false)) - Never active
// TO ENABLE: Change condition to check if NOT prerendering, e.g.:
//   const isPrerendering = process.env.NEXT_PHASE === "phase-production-build";
//   if (!isPrerendering) { ... }
// However, this may still cause issues during webpack compilation phase.

if (false) {
  // Dynamic require to avoid top-level import issues
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { withSentryConfig } = require("@sentry/nextjs");
  finalConfig = withSentryConfig(nextConfig, {
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
}

export default finalConfig;
