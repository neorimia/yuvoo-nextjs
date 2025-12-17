/**
 * Club Metadata Helper
 *
 * Enhanced SEO metadata for club detail pages.
 * Optimizes metadata with location-based keywords for better local SEO.
 * Includes city, district, and sport-specific keywords.
 */

import type { Club } from "@/modules/clubs/clubs.types";
import type { Metadata } from "next";

/**
 * Generate location-based keywords for a club
 */
function generateLocationKeywords(club: Club): string[] {
  const keywords: string[] = [];
  const sportNameLower = club.sportName.toLowerCase();

  // Base keywords
  keywords.push(`${sportNameLower} copii`);
  keywords.push(`cluburi ${sportNameLower} copii`);
  keywords.push(`club ${sportNameLower} copii`);

  // City-based keywords
  if (club.location.city) {
    keywords.push(`${sportNameLower} copii ${club.location.city}`);
    keywords.push(`cluburi ${sportNameLower} copii ${club.location.city}`);
    keywords.push(`club ${sportNameLower} ${club.location.city}`);
  }

  // District-based keywords (if available)
  if (club.location.district) {
    keywords.push(`${sportNameLower} copii ${club.location.district}`);
    keywords.push(`club ${sportNameLower} ${club.location.district}`);
    keywords.push(`club ${sportNameLower} ${club.location.city} ${club.location.district}`);
  }

  // Age group keywords
  if (club.ageGroups && club.ageGroups.length > 0) {
    const minAge = Math.min(...club.ageGroups);
    const maxAge = Math.max(...club.ageGroups);
    const ageRange = `${minAge}-${maxAge} ani`;
    keywords.push(`${sportNameLower} copii ${ageRange}`);
    keywords.push(`club ${sportNameLower} ${ageRange}`);
  }

  // Verification keywords
  if (club.verified) {
    keywords.push(`club ${sportNameLower} verificat`);
    keywords.push(`cluburi ${sportNameLower} verificate ${club.location.city}`);
  }

  // Level keywords
  if (club.levels && club.levels.length > 0) {
    club.levels.forEach((level) => {
      const levelMap: Record<string, string> = {
        beginner: "începători",
        intermediate: "intermediari",
        advanced: "avansați",
      };
      const levelRo = levelMap[level.toLowerCase()] || level;
      keywords.push(`${sportNameLower} copii ${levelRo}`);
    });
  }

  // Regional keywords
  keywords.push(`${sportNameLower} copii România`);
  if (club.location.city === "București" || club.location.city.includes("București")) {
    keywords.push(`${sportNameLower} copii București`);
    keywords.push(`cluburi ${sportNameLower} copii București`);
  }

  return keywords;
}

/**
 * Generate optimized description with location keywords
 */
function generateOptimizedDescription(club: Club): string {
  const sportName = club.sportName;
  const city = club.location.city;
  const district = club.location.district;

  // Age range text
  const ageRange =
    club.ageGroups && club.ageGroups.length > 0
      ? club.ageGroups.length === 1
        ? `${club.ageGroups[0]} ani`
        : `${Math.min(...club.ageGroups)}-${Math.max(...club.ageGroups)} ani`
      : "4-14 ani";

  // Location text
  const locationText = district
    ? `${club.location.address}, ${district}, ${city}`
    : club.location.address
      ? `${club.location.address}, ${city}`
      : city;

  // Build description with location keywords
  let description = `${club.name} - Club sportiv de ${sportName.toLowerCase()} pentru copii în ${city}`;

  if (district) {
    description += `, ${district}`;
  }

  description += `. Clubul oferă programe de calitate pentru copii cu vârste între ${ageRange}`;

  if (club.verified) {
    description += `, verificat de Yuvoo`;
  }

  description += `. `;

  if (club.description) {
    description += club.description;
  } else {
    description += `Găsește informații complete despre programe, prețuri, antrenori și înscrieri.`;
  }

  if (club.location.address) {
    description += ` Locație: ${locationText}.`;
  }

  description += ` Explorează detalii, recenzii și programează o ședință de probă gratuită pe platforma Yuvoo.`;

  return description;
}

/**
 * Generate optimized Open Graph description
 */
function generateOGDescription(club: Club): string {
  const sportName = club.sportName;
  const city = club.location.city;
  const district = club.location.district;

  let ogDescription = `Club sportiv de ${sportName.toLowerCase()} pentru copii în ${city}`;

  if (district) {
    ogDescription += `, ${district}`;
  }

  if (club.verified) {
    ogDescription += `. Club verificat Yuvoo`;
  }

  if (club.ageGroups && club.ageGroups.length > 0) {
    const minAge = Math.min(...club.ageGroups);
    const maxAge = Math.max(...club.ageGroups);
    ogDescription += `. Programe pentru copiii cu vârste între ${minAge} și ${maxAge} ani.`;
  }

  return ogDescription;
}

/**
 * Generate enhanced metadata for a club with location keywords
 */
export function generateClubMetadata(club: Club, baseUrl: string = "https://yuvoo.ro"): Metadata {
  const sportName = club.sportName;
  const city = club.location.city;
  const district = club.location.district;

  // Generate location-optimized title
  let title = `${club.name} - Club ${sportName}`;
  if (district) {
    title += ` ${district}`;
  }
  title += ` ${city} | Yuvoo`;

  // Generate keywords with location
  const keywords = generateLocationKeywords(club);

  // Generate optimized descriptions
  const description = generateOptimizedDescription(club);
  const ogDescription = generateOGDescription(club);

  // Build Open Graph image
  const ogImage = club.images && club.images.length > 0 ? club.images[0] : undefined;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${club.name} - Club ${sportName} ${city}`,
      description: ogDescription,
      type: "website",
      locale: "ro_RO",
      url: `${baseUrl}/cluburi/${club.slug}`,
      siteName: "Yuvoo",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: `${club.name} - Club ${sportName} ${city}`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${club.name} - Club ${sportName} ${city}`,
      description: ogDescription,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `${baseUrl}/cluburi/${club.slug}`,
    },
  };
}
