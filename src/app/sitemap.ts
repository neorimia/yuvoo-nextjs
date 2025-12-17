"use cache";

import { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
import { getAllSports } from "@/modules/sports/sports.service";
import { getAllClubs } from "@/modules/clubs/clubs.service";
import { getAllDoctors } from "@/modules/doctors/doctors.service";
import { cacheTag } from "next/cache";

/**
 * Sitemap Generator
 *
 * Generates sitemap.xml for SEO purposes.
 * Includes all public pages: static pages, dynamic sport pages, club pages, and doctor pages.
 * Uses Next.js 16 Cache Components with "use cache" directive for performance.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Cache tags for revalidation
  cacheTag("sitemap");
  cacheTag("sports-list");
  cacheTag("clubs-list");
  cacheTag("doctors-list");

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}${routes.sports.list}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${routes.clubs.list}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${routes.doctors.list}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${routes.quiz.intro}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${routes.about}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.contact}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.help}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}${routes.faq}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Legal pages (low priority)
    {
      url: `${baseUrl}${routes.privacy}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${routes.terms}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${routes.cookies}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${routes.gdpr}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic sport pages
  let sportPages: MetadataRoute.Sitemap = [];
  try {
    const sports = await getAllSports();
    sportPages = sports.map((sport) => ({
      url: `${baseUrl}${routes.sports.detail(sport.slug)}`,
      lastModified: new Date(), // Sports are static data, use current date
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating sport pages for sitemap:", error);
    // Continue with other pages even if sports fail
  }

  // Dynamic club pages
  let clubPages: MetadataRoute.Sitemap = [];
  try {
    const clubs = await getAllClubs();
    clubPages = clubs.map((club) => ({
      url: `${baseUrl}${routes.clubs.detail(club.slug)}`,
      lastModified: club.updatedAt || club.createdAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating club pages for sitemap:", error);
    // Continue with other pages even if clubs fail
  }

  // Dynamic doctor pages
  let doctorPages: MetadataRoute.Sitemap = [];
  try {
    const doctors = await getAllDoctors();
    doctorPages = doctors.map((doctor) => ({
      url: `${baseUrl}${routes.doctors.detail(doctor.slug)}`,
      lastModified: doctor.updatedAt || doctor.createdAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating doctor pages for sitemap:", error);
    // Continue with other pages even if doctors fail
  }

  return [...staticPages, ...sportPages, ...clubPages, ...doctorPages];
}
