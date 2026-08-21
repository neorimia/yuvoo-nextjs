/**
 * Sitemap & IndexNow eligibility gates — exclude thin / incomplete club profiles.
 */

import type { Club } from "@/modules/clubs/clubs.types";
import { generateLocationSlug } from "@/lib/utils/location";

const MIN_DESCRIPTION_LENGTH = 50;

/**
 * Club pages must have substantive copy plus location and schedule or pricing
 * before we expose them in sitemap.xml or ping IndexNow.
 */
export function isClubSitemapEligible(club: Club): boolean {
  const description = club.description?.trim() ?? "";
  const hasDescription = description.length >= MIN_DESCRIPTION_LENGTH;
  const hasLocation = Boolean(club.location?.city?.trim() && club.location?.address?.trim());
  const hasProgramOrPricing = (club.schedule?.length ?? 0) > 0 || (club.pricing?.length ?? 0) > 0;

  return hasDescription && hasLocation && hasProgramOrPricing;
}

export function filterSitemapEligibleClubs(clubs: Club[]): Club[] {
  return clubs.filter(isClubSitemapEligible);
}

/**
 * Location hub pages need at least one sitemap-eligible club in that city/district
 * before we expose them in sitemap.xml.
 */
export function getSitemapEligibleLocationSlugs(clubs: Club[]): Set<string> {
  const slugs = new Set<string>();

  for (const club of filterSitemapEligibleClubs(clubs)) {
    slugs.add(generateLocationSlug(club.location.city, club.location.district));
    slugs.add(generateLocationSlug(club.location.city));
  }

  return slugs;
}
