/**
 * LocalBusiness Schema Component
 *
 * Generates JSON-LD structured data for LocalBusiness schema (Schema.org).
 * Specifically uses SportsActivityLocation type for sports clubs.
 * Implements all required and recommended properties for LocalBusiness rich results.
 * Used to help search engines understand business information for rich snippets.
 *
 * @see https://schema.org/LocalBusiness
 * @see https://schema.org/SportsActivityLocation
 * @see https://developers.google.com/search/docs/appearance/structured-data/local-business
 */

import type { Club } from "@/modules/clubs/clubs.types";
import { routes } from "@/lib/routes";

interface LocalBusinessSchemaProps {
  club: Club;
}

/**
 * Convert day names to Schema.org dayOfWeek format
 */
function mapDayToSchemaDay(day: string): string | null {
  const dayMap: Record<string, string> = {
    luni: "Monday",
    marti: "Tuesday",
    miercuri: "Wednesday",
    joi: "Thursday",
    vineri: "Friday",
    sambata: "Saturday",
    duminica: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  const normalizedDay = day.toLowerCase().trim();
  return dayMap[normalizedDay] || null;
}

/**
 * Build opening hours specification from schedule
 * Handles both old format (time: "10:00-12:00") and new format (startTime/endTime)
 */
function buildOpeningHours(
  schedule?: Array<{ day: string; time?: string; startTime?: string; endTime?: string }>
):
  | Array<{
      "@type": "OpeningHoursSpecification";
      dayOfWeek: string;
      opens: string;
      closes: string;
    }>
  | undefined {
  if (!schedule || schedule.length === 0) {
    return undefined;
  }

  // Group by day if multiple entries exist
  const hoursByDay: Record<string, Array<{ opens: string; closes: string }>> = {};

  for (const entry of schedule) {
    const schemaDay = mapDayToSchemaDay(entry.day);
    if (!schemaDay) continue;

    let opens: string | undefined;
    let closes: string | undefined;

    // New format with startTime and endTime
    if (entry.startTime && entry.endTime) {
      opens = entry.startTime;
      closes = entry.endTime;
    }
    // Old format with time (backward compatibility)
    else if (entry.time) {
      const timeMatch = entry.time.match(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        opens = `${timeMatch[1].padStart(2, "0")}:${timeMatch[2]}`;
        closes = `${timeMatch[3].padStart(2, "0")}:${timeMatch[4]}`;
      }
    }

    if (opens && closes) {
      if (!hoursByDay[schemaDay]) {
        hoursByDay[schemaDay] = [];
      }
      hoursByDay[schemaDay].push({ opens, closes });
    }
  }

  // Convert to Schema.org format
  const openingHours: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string;
    opens: string;
    closes: string;
  }> = [];

  for (const [day, times] of Object.entries(hoursByDay)) {
    // If multiple time slots per day, create multiple entries
    for (const time of times) {
      openingHours.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens: time.opens,
        closes: time.closes,
      });
    }
  }

  return openingHours.length > 0 ? openingHours : undefined;
}

export default function LocalBusinessSchema({ club }: LocalBusinessSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Build address object (REQUIRED for LocalBusiness)
  const address: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    addressCountry: string;
  } = {
    "@type": "PostalAddress",
    addressLocality: club.location.city,
    addressCountry: "RO",
  };

  if (club.location.address) {
    address.streetAddress = club.location.address;
  }

  if (club.location.district) {
    address.addressRegion = club.location.district;
  }

  // Build base schema with required and recommended properties
  const clubSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"], // Multiple types for better coverage
    name: club.name, // REQUIRED
    description: club.description,
    address, // REQUIRED
    url: `${baseUrl}${routes.clubs.detail(club.slug)}`, // RECOMMENDED
    sport: club.sportName, // SportsActivityLocation property
  };

  // Add contact information (RECOMMENDED)
  if (club.contact.phone) {
    clubSchema.telephone = club.contact.phone;
  }

  if (club.contact.email) {
    clubSchema.email = club.contact.email;
  }

  if (club.contact.website) {
    clubSchema.sameAs = club.contact.website; // External website link
  }

  // Add images (RECOMMENDED)
  if (club.images && club.images.length > 0) {
    clubSchema.image = club.images.length === 1 ? club.images[0] : club.images;
    // Add logo if first image is available
    if (club.images[0]) {
      clubSchema.logo = club.images[0];
    }
  }

  // Add geo coordinates (RECOMMENDED)
  if (club.location.coordinates) {
    clubSchema.geo = {
      "@type": "GeoCoordinates",
      latitude: club.location.coordinates.lat,
      longitude: club.location.coordinates.lng,
    };
  }

  // Add pricing information (RECOMMENDED)
  if (club.pricing) {
    const priceRange = getPriceRange(club.pricing.amount);
    if (priceRange) {
      clubSchema.priceRange = priceRange;
    }

    // Add offers if pricing is available
    clubSchema.offers = {
      "@type": "Offer",
      priceCurrency: club.pricing.currency || "RON",
      price: club.pricing.amount.toString(),
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0], // Today's date
    };
  }

  // Add opening hours (RECOMMENDED)
  const openingHours = buildOpeningHours(club.schedule);
  if (openingHours && openingHours.length > 0) {
    clubSchema.openingHoursSpecification = openingHours;
  }

  // Add audience/target audience based on age groups
  if (club.ageGroups && club.ageGroups.length > 0) {
    const minAge = Math.min(...club.ageGroups);
    const maxAge = Math.max(...club.ageGroups);

    clubSchema.audience = {
      "@type": "PeopleAudience",
      audienceType: "Copii (Children)",
      suggestedMinAge: minAge,
      suggestedMaxAge: maxAge,
    };
  }

  // Add service area (city and district)
  clubSchema.areaServed = {
    "@type": "City",
    name: club.location.city,
  };

  if (club.location.district) {
    clubSchema.areaServed = {
      "@type": "State",
      name: club.location.district,
      containedIn: {
        "@type": "City",
        name: club.location.city,
      },
    };
  }

  // Add additional properties for sports clubs
  if (club.levels && club.levels.length > 0) {
    clubSchema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Niveluri de antrenament",
      itemListElement: club.levels.map((level, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: level,
        },
      })),
    };
  }

  // Add verification status as additionalProperty
  if (club.verified) {
    clubSchema.additionalProperty = [
      {
        "@type": "PropertyValue",
        name: "verified",
        value: "true",
      },
    ];
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(clubSchema, null, 0) }}
    />
  );
}

/**
 * Convert pricing amount to Schema.org price range format
 * RON amounts converted to approximate $ range
 */
function getPriceRange(amount: number): string | undefined {
  // Rough conversion: 1 EUR ≈ 5 RON, 1 USD ≈ 4.5 RON
  // Price ranges: $ = budget, $$ = moderate, $$$ = expensive, $$$$ = very expensive
  if (amount < 100) {
    return "$"; // Budget-friendly
  } else if (amount < 300) {
    return "$$"; // Moderate
  } else if (amount < 500) {
    return "$$$"; // Expensive
  } else {
    return "$$$$"; // Very expensive
  }
}
