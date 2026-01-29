import { MetadataRoute } from "next";

/**
 * Robots.txt Generator for Google Search Console
 *
 * Generates robots.txt optimized for SEO and Google Search Console indexing.
 * Strategy:
 * - Allow all public pages for indexing
 * - Block protected/authenticated routes
 * - Block internal flows (auth, onboarding, quiz internals)
 * - Block tracking/analytics paths
 * - Block API routes
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/intro
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Common disallow rules for all crawlers
  const commonDisallow = [
    // ==========================================================================
    // AUTHENTICATION & PROTECTED ROUTES
    // ==========================================================================
    "/auth/", // Authentication pages (login, register, etc.)
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/email-confirmation",
    "/verification-pending",
    "/choose-role",

    // Protected user dashboard routes
    "/parent/", // Parent dashboard
    "/club/", // Club portal
    "/doctor/", // Doctor portal (admin, not public doctor profiles)
    "/admin/", // Admin dashboard

    // ==========================================================================
    // INTERNAL FLOWS & USER-SPECIFIC PAGES
    // ==========================================================================
    "/onboarding/", // Onboarding flows (user-specific)

    // Quiz internal pages (not public-facing)
    "/chestionar/rezultate/", // Private quiz results (user-specific)
    "/chestionar/container/", // Internal quiz container
    "/chestionar/previzualizare/", // Internal quiz preview
    "/chestionar/email/", // Email gate pages
    "/chestionar/teaser/", // Teaser pages
    "/chestionar/paywall/", // Paywall pages
    "/chestionar/payment/", // Payment flow pages

    // Lead/payment pages (user-specific)
    "/cereri/", // Guest payment flows

    // ==========================================================================
    // TECHNICAL ROUTES
    // ==========================================================================
    "/api/", // API routes
    "/_next/", // Next.js internal routes
    "/ingest/", // PostHog analytics ingestion
    "/monitoring", // Sentry monitoring tunnel

    // ==========================================================================
    // SEARCH PARAMETERS TO AVOID DUPLICATE CONTENT
    // ==========================================================================
    "/*?*", // Prevent crawling URL parameters (handled by canonical tags)
  ];

  return {
    rules: [
      // ==========================================================================
      // GENERAL CRAWLERS
      // ==========================================================================
      {
        userAgent: "*",
        allow: [
          "/", // Homepage
          "/sporturi", // Sports directory
          "/cluburi", // Clubs directory
          "/doctori", // Doctors directory (public profiles)
          "/chestionar", // Quiz intro page only
          "/pentru-cluburi", // B2B club landing
          "/pentru-doctori", // B2B doctor landing
          "/despre-noi", // About
          "/contact", // Contact
          "/ajutor", // Help
          "/intrebari-frecvente", // FAQ
          "/cautare", // Search
          "/confidentialitate", // Privacy
          "/termeni", // Terms
          "/cookies", // Cookies
          "/gdpr-parinti", // GDPR
        ],
        disallow: commonDisallow,
      },

      // ==========================================================================
      // GOOGLEBOT - Primary search crawler
      // ==========================================================================
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/sporturi",
          "/cluburi",
          "/doctori",
          "/chestionar",
          "/pentru-cluburi",
          "/pentru-doctori",
          "/despre-noi",
          "/contact",
          "/ajutor",
          "/intrebari-frecvente",
          "/cautare",
          "/confidentialitate",
          "/termeni",
          "/cookies",
          "/gdpr-parinti",
        ],
        disallow: commonDisallow,
      },

      // ==========================================================================
      // GOOGLEBOT IMAGE - For image search
      // ==========================================================================
      {
        userAgent: "Googlebot-Image",
        allow: [
          "/cluburi/", // Club images
          "/doctori/", // Doctor images
          "/sporturi/", // Sport images
        ],
        disallow: ["/parent/", "/club/", "/doctor/", "/admin/", "/api/", "/_next/"],
      },

      // ==========================================================================
      // BINGBOT
      // ==========================================================================
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: commonDisallow,
      },

      // ==========================================================================
      // AI CRAWLERS - Block to prevent content scraping
      // ==========================================================================
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "anthropic-ai",
        disallow: ["/"],
      },
      {
        userAgent: "Claude-Web",
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
