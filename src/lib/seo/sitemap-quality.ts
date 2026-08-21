/**
 * Sitemap & IndexNow eligibility gates — exclude thin / incomplete club profiles.
 */

import type { Club } from "@/modules/clubs/clubs.types";

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
