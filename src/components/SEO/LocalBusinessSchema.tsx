/**
 * LocalBusiness Schema Component
 *
 * Generates JSON-LD structured data for LocalBusiness schema (Schema.org).
 * Specifically uses SportsActivityLocation type for sports clubs.
 * Used to help search engines understand business information for rich snippets.
 *
 * @see https://schema.org/LocalBusiness
 * @see https://schema.org/SportsActivityLocation
 */

import type { Club } from "@/modules/clubs/clubs.types";
import { routes } from "@/lib/routes";

interface LocalBusinessSchemaProps {
  club: Club;
}

export default function LocalBusinessSchema({ club }: LocalBusinessSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Build address object
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

  // Build base schema with all possible fields
  const clubSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation", // More specific than LocalBusiness for sports clubs
    name: club.name,
    description: club.description,
    address,
    url: `${baseUrl}${routes.clubs.detail(club.slug)}`,
    sport: club.sportName, // SportsActivityLocation property
  };

  // Add contact information if available
  if (club.contact.phone) {
    clubSchema.telephone = club.contact.phone;
  }

  if (club.contact.email) {
    clubSchema.email = club.contact.email;
  }

  // Add images if available
  if (club.images && club.images.length > 0) {
    clubSchema.image = club.images.length === 1 ? club.images[0] : club.images;
  }

  // Add geo coordinates if available
  if (club.location.coordinates) {
    clubSchema.geo = {
      "@type": "GeoCoordinates",
      latitude: club.location.coordinates.lat,
      longitude: club.location.coordinates.lng,
    };
  }

  // Add pricing information if available
  if (club.pricing) {
    // Convert pricing to price range format (e.g., "$$" or actual price)
    const priceRange = getPriceRange(club.pricing.amount);
    if (priceRange) {
      clubSchema.priceRange = priceRange;
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(clubSchema) }}
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
