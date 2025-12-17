import { MetadataRoute } from "next";

/**
 * Robots.txt Generator
 *
 * Generates robots.txt for SEO purposes.
 * Allows all public pages but disallows protected routes, internal pages, and API routes.
 * Uses Next.js 16 native robots.ts support.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Authentication routes (internal)
          "/auth/",
          // Protected user dashboard routes
          "/parent/",
          "/club/",
          "/doctor/",
          "/admin/",
          // API routes (not for crawling)
          "/api/",
          // Onboarding flows (internal, user-specific)
          "/onboarding/",
          // Internal quiz pages (private results, internal flow)
          "/chestionar/rezultate/", // Private quiz results (should be noindex too)
          "/chestionar/container/", // Internal quiz container page
          "/chestionar/previzualizare/", // Internal quiz preview page
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          // Same disallow rules for Googlebot
          "/auth/",
          "/parent/",
          "/club/",
          "/doctor/",
          "/admin/",
          "/api/",
          "/onboarding/",
          "/chestionar/rezultate/",
          "/chestionar/container/",
          "/chestionar/previzualizare/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
