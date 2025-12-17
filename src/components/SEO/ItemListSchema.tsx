/**
 * ItemList Schema Component
 *
 * Generates JSON-LD structured data for ItemList schema (Schema.org).
 * Used on listing pages to help search engines understand the list structure.
 *
 * @see https://schema.org/ItemList
 * @see https://developers.google.com/search/docs/appearance/structured-data/itemlist
 */

import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { Sport } from "@/modules/sports/sports.types";

interface ItemListSchemaProps {
  items: Club[] | Doctor[] | Sport[];
  type: "Club" | "Doctor" | "Sport";
  listName?: string;
}

/**
 * Build ItemList schema for clubs
 */
function buildClubListItem(club: Club, position: number, baseUrl: string) {
  const listItem: Record<string, unknown> = {
    "@type": "ListItem",
    position,
    item: {} as Record<string, unknown>,
  };

  const itemData = listItem.item as Record<string, unknown>;

  // Base item properties
  itemData["@type"] = ["SportsActivityLocation", "LocalBusiness"];
  itemData["@id"] = `${baseUrl}${routes.clubs.detail(club.slug)}`;
  itemData.name = club.name;
  itemData.url = `${baseUrl}${routes.clubs.detail(club.slug)}`;
  itemData.description = club.description;

  // Add address
  if (club.location) {
    itemData.address = {
      "@type": "PostalAddress",
      addressLocality: club.location.city,
      addressCountry: "RO",
      ...(club.location.district && { addressRegion: club.location.district }),
      ...(club.location.address && { streetAddress: club.location.address }),
    };
  }

  // Add images
  if (club.images && club.images.length > 0) {
    itemData.image = club.images.length === 1 ? club.images[0] : club.images;
  }

  // Add sport information
  if (club.sportName) {
    itemData.sport = club.sportName;
  }

  // Add pricing information
  if (club.pricing) {
    itemData.priceRange = getPriceRange(club.pricing.amount);
  }

  return listItem;
}

/**
 * Build ItemList schema for doctors
 */
function buildDoctorListItem(doctor: Doctor, position: number, baseUrl: string) {
  const listItem: Record<string, unknown> = {
    "@type": "ListItem",
    position,
    item: {} as Record<string, unknown>,
  };

  const itemData = listItem.item as Record<string, unknown>;

  // Base item properties
  itemData["@type"] = ["Physician", "MedicalBusiness"];
  itemData["@id"] = `${baseUrl}${routes.doctors.detail(doctor.slug)}`;
  itemData.name = doctor.name;
  itemData.url = `${baseUrl}${routes.doctors.detail(doctor.slug)}`;
  itemData.description = doctor.description;

  // Add address
  if (doctor.location) {
    itemData.address = {
      "@type": "PostalAddress",
      addressLocality: doctor.location.city,
      addressCountry: "RO",
      ...(doctor.location.district && { addressRegion: doctor.location.district }),
      ...(doctor.location.address && { streetAddress: doctor.location.address }),
    };
  }

  // Add image
  if (doctor.image) {
    itemData.image = doctor.image;
  }

  // Add medical specialty
  const specialtyMap: Record<string, string> = {
    orthopedist: "Orthopedist",
    nutritionist: "Nutritionist",
    psychologist: "Psychologist",
    general: "General Practitioner",
  };

  if (doctor.specialty && specialtyMap[doctor.specialty]) {
    itemData.medicalSpecialty = {
      "@type": "MedicalSpecialty",
      name: specialtyMap[doctor.specialty],
    };
  }

  return listItem;
}

/**
 * Build ItemList schema for sports
 */
function buildSportListItem(sport: Sport, position: number, baseUrl: string) {
  const listItem: Record<string, unknown> = {
    "@type": "ListItem",
    position,
    item: {} as Record<string, unknown>,
  };

  const itemData = listItem.item as Record<string, unknown>;

  // Base item properties
  itemData["@type"] = "SportsActivity";
  itemData["@id"] = `${baseUrl}${routes.sports.detail(sport.slug)}`;
  itemData.name = sport.name;
  itemData.url = `${baseUrl}${routes.sports.detail(sport.slug)}`;
  itemData.description = sport.description;

  // Add icon as image if available (sports don't have images, but we can use icons)
  if (sport.icon) {
    // Icon is a Flaticon class, we'll skip image for now as it requires a URL
    // itemData.image = sport.icon;
  }

  // Add age range if available
  if (sport.minAge || sport.maxAge) {
    itemData.audience = {
      "@type": "PeopleAudience",
      audienceType: "Copii (Children)",
      ...(sport.minAge && { suggestedMinAge: sport.minAge }),
      ...(sport.maxAge && { suggestedMaxAge: sport.maxAge }),
    };
  }

  return listItem;
}

/**
 * Convert pricing amount to Schema.org price range format
 */
function getPriceRange(amount: number): string | undefined {
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

export default function ItemListSchema({ items, type, listName }: ItemListSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Build item list elements based on type
  const itemListElement = items.map((item, index) => {
    const position = index + 1;

    switch (type) {
      case "Club":
        return buildClubListItem(item as Club, position, baseUrl);
      case "Doctor":
        return buildDoctorListItem(item as Doctor, position, baseUrl);
      case "Sport":
        return buildSportListItem(item as Sport, position, baseUrl);
      default:
        throw new Error(`Unsupported ItemList type: ${type}`);
    }
  });

  // Build schema
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement,
  };

  // Add list name if provided
  if (listName) {
    schema.name = listName;
  }

  // Add number of items
  schema.numberOfItems = items.length;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
