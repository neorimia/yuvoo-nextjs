/**
 * Person Schema Component
 *
 * Generates JSON-LD structured data for Person schema (Schema.org).
 * Specifically designed for medical professionals (doctors/physicians).
 * Used to help search engines understand individual professional information for rich snippets.
 *
 * This schema works alongside MedicalBusinessSchema to provide comprehensive structured data.
 *
 * @see https://schema.org/Person
 * @see https://schema.org/Physician
 * @see https://developers.google.com/search/docs/appearance/structured-data/person
 */

import type { Doctor } from "@/modules/doctors/doctors.types";
import { routes } from "@/lib/routes";

interface PersonSchemaProps {
  doctor: Doctor;
}

/**
 * Get Romanian display name for specialty
 */
function getSpecialtyDisplayName(specialty: string): string {
  const specialtyMap: Record<string, string> = {
    orthopedist: "Ortopedie pediatrică",
    nutritionist: "Nutriție pediatrică",
    psychologist: "Psihologie pediatrică",
    general: "Medic pediatru",
  };
  return specialtyMap[specialty] || specialty;
}

export default function PersonSchema({ doctor }: PersonSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const specialtyDisplay = getSpecialtyDisplayName(doctor.specialty);

  // Parse name into givenName and familyName if possible
  const nameParts = doctor.name.trim().split(/\s+/);
  const givenName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : doctor.name;
  const familyName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : undefined;

  // Build base Person schema with required and recommended properties
  const personSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Person", "Physician"], // Multiple types for better coverage
    name: doctor.name, // REQUIRED
    description: doctor.description,
    url: `${baseUrl}${routes.doctors.detail(doctor.slug)}`, // RECOMMENDED
    jobTitle: specialtyDisplay, // Professional role
    medicalSpecialty: specialtyDisplay, // Physician-specific property
  };

  // Add name components if we can parse them
  if (familyName) {
    personSchema.givenName = givenName;
    personSchema.familyName = familyName;
  }

  // Add image (RECOMMENDED)
  if (doctor.image) {
    personSchema.image = doctor.image;
  }

  // Add credentials/qualifications
  if (doctor.credentials && doctor.credentials.length > 0) {
    personSchema.credential = doctor.credentials.map((cred) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional",
      name: cred,
    }));

    // Also add as text array for compatibility
    personSchema.hasCredential = doctor.credentials;
  }

  // Add professional affiliation (worksFor)
  personSchema.worksFor = {
    "@type": "MedicalOrganization",
    name: "Yuvoo",
    url: baseUrl,
    description: "Platformă pentru descoperirea activităților sportive pentru copii",
  };

  // Add address (professional location)
  const address: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    addressCountry: string;
  } = {
    "@type": "PostalAddress",
    addressLocality: doctor.location.city,
    addressCountry: "RO",
  };

  if (doctor.location.address) {
    address.streetAddress = doctor.location.address;
  }

  if (doctor.location.district) {
    address.addressRegion = doctor.location.district;
  }

  personSchema.address = address;

  // Add geo coordinates if available
  if (doctor.location.coordinates) {
    personSchema.geo = {
      "@type": "GeoCoordinates",
      latitude: doctor.location.coordinates.lat,
      longitude: doctor.location.coordinates.lng,
    };
  }

  // Add contact information
  if (doctor.contact.phone) {
    personSchema.telephone = doctor.contact.phone;
  }

  if (doctor.contact.email) {
    personSchema.email = doctor.contact.email;
  }

  // Add external website if available
  if (doctor.contact.website) {
    personSchema.sameAs = [doctor.contact.website];
  }

  // Add professional knowsAbout (expertise areas)
  personSchema.knowsAbout = [
    specialtyDisplay,
    "Pediatrie",
    "Sănătate copii",
    "Sport pentru copii",
    ...(doctor.specialty === "orthopedist"
      ? ["Ortopedie pediatrică", "Dezvoltare ososară", "Leziuni sportive"]
      : []),
    ...(doctor.specialty === "nutritionist"
      ? ["Nutriție pediatrică", "Alimentație sănătoasă", "Nutriție sportivă"]
      : []),
    ...(doctor.specialty === "psychologist"
      ? ["Psihologie pediatrică", "Dezvoltare emoțională", "Motivație sportivă"]
      : []),
  ];

  // Add professional service information
  const services: string[] = [];
  if (doctor.acceptingNewPatients) {
    services.push("Consultații pentru pacienți noi");
  }
  if (doctor.onlineConsultations) {
    services.push("Consultații online");
  }
  services.push(`Consultații ${specialtyDisplay.toLowerCase()}`);
  services.push("Consultare pentru activități sportive pentru copii");

  if (services.length > 0) {
    personSchema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Servicii medicale",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service,
          serviceType: "Consultare medicală",
        },
      })),
    };
  }

  // Add availability information
  if (doctor.acceptingNewPatients !== undefined) {
    personSchema.availableService = doctor.acceptingNewPatients
      ? "Accepting new patients"
      : "Not accepting new patients";
  }

  // Add additional properties
  const additionalProperties: Array<{
    "@type": "PropertyValue";
    name: string;
    value: string;
  }> = [];

  if (doctor.verified) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "verified",
      value: "true",
    });
  }

  if (doctor.onlineConsultations) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "onlineConsultations",
      value: "true",
    });
  }

  if (additionalProperties.length > 0) {
    personSchema.additionalProperty = additionalProperties;
  }

  // Add area served (professional service area)
  personSchema.areaServed = {
    "@type": "City",
    name: doctor.location.city,
  };

  if (doctor.location.district) {
    personSchema.areaServed = {
      "@type": "State",
      name: doctor.location.district,
      containedIn: {
        "@type": "City",
        name: doctor.location.city,
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema, null, 0) }}
    />
  );
}
