import { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo/site-url";
import { getAllSports } from "@/modules/sports/sports.service";
import { getAllClubs, getUniqueLocations } from "@/modules/clubs/clubs.service";
import { getAllDoctors } from "@/modules/doctors/doctors.service";
import { generateLocationSlug } from "@/lib/utils/location";
import type { Club } from "@/modules/clubs/clubs.types";
import { GUIDE_PAGES, GUIDE_PAGES_LASTMOD } from "@/data/guide-pages-data";

/**
 * Sitemap Generator for Google Search Console
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export const dynamic = "force-dynamic";

const LEGAL_PAGES_LASTMOD = new Date("2024-01-01T00:00:00.000Z");
const INFO_PAGES_LASTMOD = new Date("2025-06-01T00:00:00.000Z");
const SPORT_PAGES_LASTMOD = new Date("2025-06-01T00:00:00.000Z");

function buildLocationLastModifiedMap(clubs: Club[]): Map<string, Date> {
  const map = new Map<string, Date>();

  for (const club of clubs) {
    const clubDate = club.updatedAt || club.createdAt;
    const districtSlug = generateLocationSlug(club.location.city, club.location.district);
    const citySlug = generateLocationSlug(club.location.city);

    for (const slug of [districtSlug, citySlug]) {
      const existing = map.get(slug);
      if (!existing || clubDate > existing) {
        map.set(slug, clubDate);
      }
    }
  }

  return map;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const now = new Date();

  let clubs: Club[] = [];
  try {
    clubs = await getAllClubs();
  } catch (error) {
    console.error("[Sitemap] Error fetching clubs:", error);
  }

  const locationLastModified = buildLocationLastModifiedMap(clubs);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}${routes.sports.list}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${routes.clubs.list}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${routes.doctors.list}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${routes.quiz.intro}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${routes.guides.list}`,
      lastModified: GUIDE_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}${routes.clubs.landing}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}${routes.clubs.howItWorks}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.clubs.caseStudies}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.clubs.roiCalculator}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}${routes.clubs.helpCenter}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}${routes.doctors.landing}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${routes.about}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.contact}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.help}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}${routes.faq}`,
      lastModified: INFO_PAGES_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.privacy}`,
      lastModified: LEGAL_PAGES_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${routes.terms}`,
      lastModified: LEGAL_PAGES_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${routes.cookies}`,
      lastModified: LEGAL_PAGES_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${routes.gdpr}`,
      lastModified: LEGAL_PAGES_LASTMOD,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let sportPages: MetadataRoute.Sitemap = [];
  try {
    const sports = await getAllSports();
    sportPages = sports.map((sport) => ({
      url: `${baseUrl}${routes.sports.detail(sport.slug)}`,
      lastModified: SPORT_PAGES_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("[Sitemap] Error generating sport pages:", error);
  }

  const clubPages: MetadataRoute.Sitemap = clubs.map((club) => ({
    url: `${baseUrl}${routes.clubs.detail(club.slug)}`,
    lastModified: club.updatedAt || club.createdAt || now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  let doctorPages: MetadataRoute.Sitemap = [];
  try {
    const doctors = await getAllDoctors();
    doctorPages = doctors.map((doctor) => ({
      url: `${baseUrl}${routes.doctors.detail(doctor.slug)}`,
      lastModified: doctor.updatedAt || doctor.createdAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("[Sitemap] Error generating doctor pages:", error);
  }

  let locationPages: MetadataRoute.Sitemap = [];
  try {
    const locations = await getUniqueLocations();
    locationPages = locations.map((loc) => {
      const slug = generateLocationSlug(loc.city, loc.district);
      return {
        url: `${baseUrl}${routes.clubs.location(slug)}`,
        lastModified: locationLastModified.get(slug) || INFO_PAGES_LASTMOD,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      };
    });
  } catch (error) {
    console.error("[Sitemap] Error generating location pages:", error);
  }

  const guidePages: MetadataRoute.Sitemap = GUIDE_PAGES.map((guide) => ({
    url: `${baseUrl}${routes.guides.detail(guide.slug)}`,
    lastModified: new Date(guide.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const allPages = [
    ...staticPages,
    ...guidePages,
    ...sportPages,
    ...clubPages,
    ...doctorPages,
    ...locationPages,
  ];

  console.log(
    `[Sitemap] Generated ${allPages.length} URLs: ` +
      `${staticPages.length} static, ` +
      `${guidePages.length} guides, ` +
      `${sportPages.length} sports, ` +
      `${clubPages.length} clubs, ` +
      `${doctorPages.length} doctors, ` +
      `${locationPages.length} locations`
  );

  return allPages;
}
