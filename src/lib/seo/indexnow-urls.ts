/**
 * Collect sitemap URLs for IndexNow cron (recently modified + hub pages).
 */

import { routes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo/site-url";
import { filterSitemapEligibleClubs } from "@/lib/seo/sitemap-quality";
import { GUIDE_PAGES } from "@/data/guide-pages-data";
import { SPORTS_DATA } from "@/lib/db/seed-data/sports";
import { getAllClubs, getUniqueLocations } from "@/modules/clubs/clubs.service";
import { getAllDoctors } from "@/modules/doctors/doctors.service";
import { generateLocationSlug } from "@/lib/utils/location";

const HUB_PATHS = [
  routes.home,
  routes.sports.list,
  routes.clubs.list,
  routes.doctors.list,
  routes.guides.list,
  routes.quiz.intro,
  routes.about,
  routes.press,
  routes.contact,
  routes.faq,
];

const FEATURED_SPORT_SLUGS = ["fotbal", "inot", "tenis", "baschet", "gimnastica-artistica"];

export interface SitemapUrlEntry {
  url: string;
  lastModified: Date;
}

function toAbsolute(path: string, baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Core marketing hubs — always safe to ping on bootstrap / daily cron.
 */
export function getIndexNowHubUrls(baseUrl: string): string[] {
  const sportUrls = FEATURED_SPORT_SLUGS.map((slug) =>
    toAbsolute(routes.sports.detail(slug), baseUrl)
  );
  const guideUrls = GUIDE_PAGES.map((g) => toAbsolute(routes.guides.detail(g.slug), baseUrl));

  return [...HUB_PATHS.map((p) => toAbsolute(p, baseUrl)), ...sportUrls, ...guideUrls];
}

/**
 * All public sitemap URLs with lastModified (for cron filtering).
 */
export async function collectSitemapUrlEntries(): Promise<SitemapUrlEntry[]> {
  const baseUrl = getSiteUrl();
  const now = new Date();
  const entries: SitemapUrlEntry[] = [];

  for (const path of HUB_PATHS) {
    entries.push({ url: toAbsolute(path, baseUrl), lastModified: now });
  }

  for (const guide of GUIDE_PAGES) {
    entries.push({
      url: toAbsolute(routes.guides.detail(guide.slug), baseUrl),
      lastModified: new Date(guide.lastModified),
    });
  }

  for (const sport of SPORTS_DATA) {
    entries.push({
      url: toAbsolute(routes.sports.detail(sport.slug), baseUrl),
      lastModified: now,
    });
  }

  try {
    const clubs = filterSitemapEligibleClubs(await getAllClubs());
    for (const club of clubs) {
      entries.push({
        url: toAbsolute(routes.clubs.detail(club.slug), baseUrl),
        lastModified: club.updatedAt || club.createdAt || now,
      });
    }
  } catch (error) {
    console.error("[IndexNow URLs] clubs:", error);
  }

  try {
    const doctors = await getAllDoctors();
    for (const doctor of doctors) {
      entries.push({
        url: toAbsolute(routes.doctors.detail(doctor.slug), baseUrl),
        lastModified: doctor.updatedAt || doctor.createdAt || now,
      });
    }
  } catch (error) {
    console.error("[IndexNow URLs] doctors:", error);
  }

  try {
    const locations = await getUniqueLocations();
    for (const loc of locations) {
      const slug = generateLocationSlug(loc.city, loc.district);
      entries.push({
        url: toAbsolute(routes.clubs.location(slug), baseUrl),
        lastModified: now,
      });
    }
  } catch (error) {
    console.error("[IndexNow URLs] locations:", error);
  }

  return entries;
}

/**
 * URLs modified within the given window (hours), plus hubs on empty result.
 */
export async function getRecentlyModifiedUrls(hours = 48): Promise<string[]> {
  const cutoff = Date.now() - hours * 60 * 60 * 1000;
  const baseUrl = getSiteUrl();
  const entries = await collectSitemapUrlEntries();
  const recent = entries.filter((e) => e.lastModified.getTime() >= cutoff).map((e) => e.url);

  if (recent.length > 0) {
    return [...new Set(recent)];
  }

  return getIndexNowHubUrls(baseUrl);
}
