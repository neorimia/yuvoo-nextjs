/**
 * Doctor Metadata Helper
 *
 * Enhanced SEO metadata for doctor detail pages.
 * Optimizes metadata with location-based keywords for better local SEO.
 * Includes city, district, and specialty-specific keywords.
 */

import type { Doctor } from "@/modules/doctors/doctors.types";
import type { Metadata } from "next";

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

/**
 * Generate location-based keywords for a doctor
 */
function generateLocationKeywords(doctor: Doctor): string[] {
  const keywords: string[] = [];
  const specialty = doctor.specialty;
  const specialtyDisplay = getSpecialtyDisplayName(specialty);

  // Base keywords
  keywords.push("doctor pediatru");
  keywords.push("specialist pediatru");
  keywords.push(specialtyDisplay.toLowerCase());
  keywords.push(`${specialtyDisplay.toLowerCase()} copii`);

  // City-based keywords
  if (doctor.location.city) {
    keywords.push(`doctor pediatru ${doctor.location.city}`);
    keywords.push(`specialist pediatru ${doctor.location.city}`);
    keywords.push(`${specialtyDisplay.toLowerCase()} ${doctor.location.city}`);
    keywords.push(`${specialtyDisplay.toLowerCase()} copii ${doctor.location.city}`);
  }

  // District-based keywords (if available)
  if (doctor.location.district) {
    keywords.push(`doctor pediatru ${doctor.location.district}`);
    keywords.push(`${specialtyDisplay.toLowerCase()} ${doctor.location.district}`);
    keywords.push(
      `${specialtyDisplay.toLowerCase()} ${doctor.location.city} ${doctor.location.district}`
    );
  }

  // Sports-related keywords (for pediatric specialists working with sports)
  keywords.push("doctor sport copii");
  keywords.push("specialist pediatru sport");
  keywords.push(`${specialtyDisplay.toLowerCase()} sport copii`);

  // Verification keywords
  if (doctor.verified) {
    keywords.push(`doctor pediatru verificat ${doctor.location.city}`);
    keywords.push(`specialist pediatru verificat`);
  }

  // Service keywords
  if (doctor.onlineConsultations) {
    keywords.push("consultație online pediatru");
    keywords.push(`${specialtyDisplay.toLowerCase()} online`);
  }

  if (doctor.acceptingNewPatients) {
    keywords.push(`doctor pediatru ${doctor.location.city} pacienți noi`);
  }

  // Regional keywords
  keywords.push("doctor pediatru România");
  keywords.push("specialiști pediatri România");
  if (doctor.location.city === "București" || doctor.location.city.includes("București")) {
    keywords.push("doctor pediatru București");
    keywords.push(`specialist pediatru București`);
    keywords.push(`${specialtyDisplay.toLowerCase()} București`);
  }

  // Specialty-specific keywords
  if (specialty === "orthopedist") {
    keywords.push("ortoped pediatru");
    keywords.push("ortopedie copii");
    keywords.push("leziuni sportive copii");
    keywords.push("postură copii");
  } else if (specialty === "nutritionist") {
    keywords.push("nutriționist pediatru");
    keywords.push("nutriție copii");
    keywords.push("alimentație copii");
    keywords.push("nutriție sportivă copii");
  } else if (specialty === "psychologist") {
    keywords.push("psiholog pediatru");
    keywords.push("psihologie copii");
    keywords.push("consultanță psihologică copii");
    keywords.push("dezvoltare emoțională copii");
  }

  return keywords;
}

/**
 * Generate optimized description with location keywords
 */
function generateOptimizedDescription(doctor: Doctor): string {
  const specialtyDisplay = getSpecialtyDisplayName(doctor.specialty);
  const city = doctor.location.city;
  const district = doctor.location.district;

  // Location text
  const locationText = district
    ? `${doctor.location.address || ""}, ${district}, ${city}`.trim()
    : doctor.location.address
      ? `${doctor.location.address}, ${city}`
      : city;

  // Build description with location keywords
  let description = `Dr. ${doctor.name} - ${specialtyDisplay} în ${city}`;

  if (district) {
    description += `, ${district}`;
  }

  description += `. Specialist pediatru`;

  if (doctor.verified) {
    description += ` verificat Yuvoo`;
  }

  description += ` specializat în consultații pentru copiii care practică sau doresc să practice activități sportive.`;

  if (doctor.description) {
    description += ` ${doctor.description}`;
  }

  if (doctor.acceptingNewPatients) {
    description += ` Acceptă pacienți noi.`;
  }

  if (doctor.onlineConsultations) {
    description += ` Consultații online disponibile.`;
  }

  if (doctor.location.address) {
    description += ` Locație: ${locationText}.`;
  }

  description += ` Programează o consultație pe platforma Yuvoo.`;

  return description;
}

/**
 * Generate optimized Open Graph description
 */
function generateOGDescription(doctor: Doctor): string {
  const specialtyDisplay = getSpecialtyDisplayName(doctor.specialty);
  const city = doctor.location.city;
  const district = doctor.location.district;

  let ogDescription = `Dr. ${doctor.name} - ${specialtyDisplay} în ${city}`;

  if (district) {
    ogDescription += `, ${district}`;
  }

  if (doctor.verified) {
    ogDescription += `. Specialist verificat Yuvoo`;
  }

  ogDescription += `. Consultații pentru copiii activi sportivi.`;

  if (doctor.onlineConsultations) {
    ogDescription += ` Consultații online disponibile.`;
  }

  return ogDescription;
}

/**
 * Generate enhanced metadata for a doctor with location keywords
 */
export function generateDoctorMetadata(
  doctor: Doctor,
  baseUrl: string = "https://yuvoo.ro"
): Metadata {
  const specialtyDisplay = getSpecialtyDisplayName(doctor.specialty);
  const city = doctor.location.city;
  const district = doctor.location.district;

  // Generate location-optimized title
  let title = `Dr. ${doctor.name} - ${specialtyDisplay}`;
  if (district) {
    title += ` ${district}`;
  }
  title += ` ${city} | Yuvoo`;

  // Generate keywords with location
  const keywords = generateLocationKeywords(doctor);

  // Generate optimized descriptions
  const description = generateOptimizedDescription(doctor);
  const ogDescription = generateOGDescription(doctor);

  // Build Open Graph image
  const ogImage = doctor.image;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `Dr. ${doctor.name} - ${specialtyDisplay} ${city}`,
      description: ogDescription,
      type: "website",
      locale: "ro_RO",
      url: `${baseUrl}/doctori/${doctor.slug}`,
      siteName: "Yuvoo",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: `Dr. ${doctor.name} - ${specialtyDisplay} ${city}`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `Dr. ${doctor.name} - ${specialtyDisplay} ${city}`,
      description: ogDescription,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `${baseUrl}/doctori/${doctor.slug}`,
    },
  };
}
