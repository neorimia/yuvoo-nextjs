/**
 * IndexNow pings for profile mutations (clubs, doctors).
 */

import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import { routes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo/site-url";
import { pingIndexNow } from "@/lib/seo/indexnow";
import { isClubSitemapEligible } from "@/lib/seo/sitemap-quality";

function clubCanonicalUrl(slug: string): string {
  return `${getSiteUrl()}${routes.clubs.detail(slug)}`;
}

function doctorCanonicalUrl(slug: string): string {
  return `${getSiteUrl()}${routes.doctors.detail(slug)}`;
}

export function pingIndexNowForClub(club: Pick<Club, "slug"> & Partial<Club>): void {
  if (!club.slug) return;
  if ("description" in club && club.description !== undefined) {
    if (!isClubSitemapEligible(club as Club)) return;
  }
  pingIndexNow([clubCanonicalUrl(club.slug)]);
}

export function pingIndexNowForDoctor(doctor: Pick<Doctor, "slug">): void {
  if (!doctor.slug) return;
  pingIndexNow([doctorCanonicalUrl(doctor.slug)]);
}
