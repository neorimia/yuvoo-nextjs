import { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
import { getAllSports } from "@/modules/sports/sports.service";
import { getAllClubs, getUniqueLocations } from "@/modules/clubs/clubs.service";
import { getAllDoctors } from "@/modules/doctors/doctors.service";
import { generateLocationSlug } from "@/lib/utils/location";

/**
 * Sitemap Generator
 *
 * Generates sitemap.xml for SEO purposes.
 * Includes all public pages: static pages, dynamic sport pages, club pages, and doctor pages.
 * Note: Removed "use cache" directive due to new Date() incompatibility with Cache Components during build.
 * ISR will handle caching at runtime.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // Use static date during build to avoid cache incompatibility
  const buildDate = isProductionBuild ? new Date("2024-01-01") : new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: buildDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
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
    {
      url: `${baseUrl}${routes.quiz.intro}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
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
    // Legal pages (low priority)
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
  ];

  // Dynamic sport pages - skip database queries during build
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
      console.error("Error generating sport pages for sitemap:", error);
      // Continue with other pages even if sports fail
    }
  }

  // Dynamic club pages - skip database queries during build
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
      console.error("Error generating club pages for sitemap:", error);
      // Continue with other pages even if clubs fail
    }
  }

  // Dynamic doctor pages - skip database queries during build
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
      console.error("Error generating doctor pages for sitemap:", error);
      // Continue with other pages even if doctors fail
    }
  }

  // Location-specific pages - skip database queries during build
  let locationPages: MetadataRoute.Sitemap = [];
  if (!isProductionBuild) {
    try {
      const locations = await getUniqueLocations();
      locationPages = locations.map((loc) => ({
        url: `${baseUrl}${routes.clubs.location(generateLocationSlug(loc.city, loc.district))}`,
        lastModified: buildDate,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    } catch (error) {
      console.error("Error generating location pages for sitemap:", error);
      // Continue with other pages even if locations fail
    }
  }

  return [...staticPages, ...sportPages, ...clubPages, ...doctorPages, ...locationPages];
}
