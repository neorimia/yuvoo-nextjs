/**
 * MedicalBusiness / Physician Schema Component
 *
 * Single consolidated JSON-LD graph for doctor detail pages.
 *
 * @see https://schema.org/Physician
 */

import type { Doctor } from "@/modules/doctors/doctors.types";
import { routes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

interface MedicalBusinessSchemaProps {
  doctor: Doctor;
}

function getSpecialtyDisplayName(specialty: string): string {
  const specialtyMap: Record<string, string> = {
    orthopedist: "Ortopedie pediatrică",
    nutritionist: "Nutriție pediatrică",
    psychologist: "Psihologie pediatrică",
    general: "Medic pediatru",
  };
  return specialtyMap[specialty] || specialty;
}

export default function MedicalBusinessSchema({ doctor }: MedicalBusinessSchemaProps) {
  const baseUrl = getSiteUrl();
  const specialtyDisplay = getSpecialtyDisplayName(doctor.specialty);

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

  const doctorSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    description: doctor.description,
    jobTitle: specialtyDisplay,
    medicalSpecialty: specialtyDisplay,
    address,
    url: `${baseUrl}${routes.doctors.detail(doctor.slug)}`,
    knowsAbout: [
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
    ],
  };

  if (doctor.credentials?.length) {
    doctorSchema.credential = doctor.credentials.map((cred) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional",
      name: cred,
    }));
    doctorSchema.hasCredential = doctor.credentials;
  }

  if (doctor.contact.phone) {
    doctorSchema.telephone = doctor.contact.phone;
  }

  if (doctor.contact.email) {
    doctorSchema.email = doctor.contact.email;
  }

  if (doctor.image) {
    doctorSchema.image = doctor.image;
  }

  if (doctor.location.coordinates) {
    doctorSchema.geo = {
      "@type": "GeoCoordinates",
      latitude: doctor.location.coordinates.lat,
      longitude: doctor.location.coordinates.lng,
    };
  }

  if (doctor.contact.website) {
    doctorSchema.sameAs = [doctor.contact.website];
  }

  if (doctor.acceptingNewPatients !== undefined) {
    doctorSchema.availableService = doctor.acceptingNewPatients
      ? "Accepting new patients"
      : "Not accepting new patients";
  }

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
    doctorSchema.hasOfferCatalog = {
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

  doctorSchema.areaServed = doctor.location.district
    ? {
        "@type": "State",
        name: doctor.location.district,
        containedIn: {
          "@type": "City",
          name: doctor.location.city,
        },
      }
    : {
        "@type": "City",
        name: doctor.location.city,
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorSchema) }}
    />
  );
}
