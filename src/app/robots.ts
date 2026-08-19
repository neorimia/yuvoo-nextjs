import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

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
  const baseUrl = getSiteUrl();

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
    "/ingest/", // PostHog analytics ingestion
    "/monitoring", // Sentry monitoring tunnel

    // ==========================================================================
    // SEARCH PARAMETERS TO AVOID DUPLICATE CONTENT
    // ==========================================================================
    "/*?*", // Prevent crawling URL parameters (handled by canonical tags)
  ];

  // Public paths allowed for indexing (shared by search and AI citation crawlers)
  const publicAllow = [
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
    "/confidentialitate",
    "/termeni",
    "/cookies",
    "/gdpr-parinti",
  ];

  // AI search/citation crawlers — same public access as Googlebot; CCBot stays blocked (training datasets)
  const aiSearchCrawlerAgents = [
    "GPTBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "anthropic-ai",
    "Claude-Web",
    "OAI-SearchBot",
    "Google-Extended",
  ];

  return {
    rules: [
      // ==========================================================================
      // GENERAL CRAWLERS
      // ==========================================================================
      {
        userAgent: "*",
        allow: publicAllow,
        disallow: commonDisallow,
      },

      // ==========================================================================
      // GOOGLEBOT - Primary search crawler
      // ==========================================================================
      {
        userAgent: "Googlebot",
        allow: publicAllow,
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
        disallow: ["/parent/", "/club/", "/doctor/", "/admin/", "/api/"],
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
      // AI SEARCH CRAWLERS - Allow citation/indexing for GEO/AEO (not training scrapers)
      // ==========================================================================
      ...aiSearchCrawlerAgents.map((userAgent) => ({
        userAgent,
        allow: publicAllow,
        disallow: commonDisallow,
      })),

      // Common Crawl (CCBot) — block training-dataset scraping
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
