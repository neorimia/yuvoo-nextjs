import { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
import { getAllSports } from "@/modules/sports/sports.service";
import { getAllClubs, getUniqueLocations } from "@/modules/clubs/clubs.service";
import { getAllDoctors } from "@/modules/doctors/doctors.service";
import { generateLocationSlug } from "@/lib/utils/location";

/**
 * Sitemap Generator for Google Search Console
 *
 * Generates sitemap.xml for SEO purposes and Google Search Console indexing.
 * Includes all public pages: static pages, dynamic sport pages, club pages, doctor pages,
 * location pages, and B2B landing pages.
 *
 * Strategy for build vs runtime:
 * - Static pages: Always included (most important for initial indexing)
 * - Dynamic pages: Fetched at runtime to ensure fresh data
 * - During production build: Uses fallback approach to avoid DB queries
 *
 * Google Search Console requirements:
 * - All URLs must be absolute (https://yuvoo.ro/path)
 * - lastModified should reflect actual content changes
 * - Priority 1.0 = homepage, 0.9 = core pages, 0.8 = detail pages, etc.
 * - changeFrequency guides crawl scheduling
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // Use static date during build to avoid cache incompatibility
  const buildDate = isProductionBuild ? new Date("2024-01-01") : new Date();

  // ==========================================================================
  // STATIC PAGES - Always included, essential for Google Search Console
  // ==========================================================================

  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - Highest priority
    {
      url: baseUrl,
      lastModified: buildDate,
      changeFrequency: "daily",
      priority: 1.0,
    },

    // Core Directory Pages - High priority, frequently updated
    {
      url: `${baseUrl}${routes.sports.list}`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${routes.clubs.list}`,
      lastModified: buildDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${routes.doctors.list}`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // AI Quiz - Core product feature
    {
      url: `${baseUrl}${routes.quiz.intro}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Search Page
    {
      url: `${baseUrl}${routes.search}`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // B2B Landing Pages - Important for business growth
    {
      url: `${baseUrl}${routes.clubs.landing}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}${routes.clubs.howItWorks}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.clubs.caseStudies}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.clubs.roiCalculator}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}${routes.clubs.helpCenter}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}${routes.doctors.landing}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Information Pages
    {
      url: `${baseUrl}${routes.about}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.contact}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.help}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}${routes.faq}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Legal Pages - Required but low priority
    {
      url: `${baseUrl}${routes.privacy}`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${routes.terms}`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${routes.cookies}`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${routes.gdpr}`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    // Email Management (low priority but should be accessible)
    {
      url: `${baseUrl}${routes.unsubscribe}`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // ==========================================================================
  // DYNAMIC PAGES - Fetched at runtime for fresh data
  // ==========================================================================

  // Dynamic sport pages
  let sportPages: MetadataRoute.Sitemap = [];
  if (!isProductionBuild) {
    try {
      const sports = await getAllSports();
      sportPages = sports.map((sport) => ({
        url: `${baseUrl}${routes.sports.detail(sport.slug)}`,
        lastModified: buildDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    } catch (error) {
      console.error("[Sitemap] Error generating sport pages:", error);
    }
  }

  // Dynamic club pages - High priority for local SEO
  let clubPages: MetadataRoute.Sitemap = [];
  if (!isProductionBuild) {
    try {
      const clubs = await getAllClubs();
      clubPages = clubs.map((club) => ({
        url: `${baseUrl}${routes.clubs.detail(club.slug)}`,
        lastModified: club.updatedAt || club.createdAt || buildDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    } catch (error) {
      console.error("[Sitemap] Error generating club pages:", error);
    }
  }

  // Dynamic doctor pages
  let doctorPages: MetadataRoute.Sitemap = [];
  if (!isProductionBuild) {
    try {
      const doctors = await getAllDoctors();
      doctorPages = doctors.map((doctor) => ({
        url: `${baseUrl}${routes.doctors.detail(doctor.slug)}`,
        lastModified: doctor.updatedAt || doctor.createdAt || buildDate,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    } catch (error) {
      console.error("[Sitemap] Error generating doctor pages:", error);
    }
  }

  // Location-specific pages - Important for local SEO
  let locationPages: MetadataRoute.Sitemap = [];
  if (!isProductionBuild) {
    try {
      const locations = await getUniqueLocations();
      locationPages = locations.map((loc) => ({
        url: `${baseUrl}${routes.clubs.location(generateLocationSlug(loc.city, loc.district))}`,
        lastModified: buildDate,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      }));
    } catch (error) {
      console.error("[Sitemap] Error generating location pages:", error);
    }
  }

  // ==========================================================================
  // COMBINE ALL PAGES
  // ==========================================================================

  const allPages = [...staticPages, ...sportPages, ...clubPages, ...doctorPages, ...locationPages];

  // Log sitemap stats for debugging
  if (!isProductionBuild) {
    console.log(
      `[Sitemap] Generated ${allPages.length} URLs: ` +
        `${staticPages.length} static, ` +
        `${sportPages.length} sports, ` +
        `${clubPages.length} clubs, ` +
        `${doctorPages.length} doctors, ` +
        `${locationPages.length} locations`
    );
  }

  return allPages;
}
