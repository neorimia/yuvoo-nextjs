/**
 * MedicalBusiness Schema Component
 *
 * Generates JSON-LD structured data for MedicalBusiness schema (Schema.org).
 * Specifically uses Physician type for individual doctors.
 * Used to help search engines understand medical professional information for rich snippets.
 *
 * @see https://schema.org/MedicalBusiness
 * @see https://schema.org/Physician
 */

import type { Doctor } from "@/modules/doctors/doctors.types";
import { routes } from "@/lib/routes";

interface MedicalBusinessSchemaProps {
  doctor: Doctor;
}

export default function MedicalBusinessSchema({ doctor }: MedicalBusinessSchemaProps) {
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
    addressLocality: doctor.location.city,
    addressCountry: "RO",
  };

  if (doctor.location.address) {
    address.streetAddress = doctor.location.address;
  }

  if (doctor.location.district) {
    address.addressRegion = doctor.location.district;
  }

  // Build base schema with all possible fields
  const doctorSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Physician", // More specific than MedicalBusiness for individual doctors
    name: doctor.name,
    description: doctor.description,
    medicalSpecialty: doctor.specialty,
    address,
    url: `${baseUrl}${routes.doctors.detail(doctor.slug)}`,
  };

  // Add credentials if available
  if (doctor.credentials && doctor.credentials.length > 0) {
    doctorSchema.credential = doctor.credentials;
  }

  // Add contact information if available
  if (doctor.contact.phone) {
    doctorSchema.telephone = doctor.contact.phone;
  }

  if (doctor.contact.email) {
    doctorSchema.email = doctor.contact.email;
  }

  // Add image if available
  if (doctor.image) {
    doctorSchema.image = doctor.image;
  }

  // Add geo coordinates if available
  if (doctor.location.coordinates) {
    doctorSchema.geo = {
      "@type": "GeoCoordinates",
      latitude: doctor.location.coordinates.lat,
      longitude: doctor.location.coordinates.lng,
    };
  }

  // Add availability information if available
  if (doctor.acceptingNewPatients !== undefined) {
    doctorSchema.availableService = doctor.acceptingNewPatients
      ? "Accepting new patients"
      : "Not accepting new patients";
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorSchema) }}
    />
  );
}
