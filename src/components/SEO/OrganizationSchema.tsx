/**
 * Organization Schema Component
 *
 * Generates JSON-LD structured data for Organization schema (Schema.org).
 * Server-rendered in root layout for all pages.
 *
 * @see https://schema.org/Organization
 */

import { getSiteUrl } from "@/lib/seo/site-url";

export default function OrganizationSchema() {
  const baseUrl = getSiteUrl();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Yuvoo",
    url: baseUrl,
    logo: `${baseUrl}/assets/img/logo/logo.svg`,
    description:
      "Platformă AI care ajută părinții din România să găsească activitățile sportive potrivite pentru copiii lor",
    address: {
      "@type": "PostalAddress",
      addressLocality: "București",
      addressCountry: "RO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@yuvoo.ro",
      contactType: "customer service",
      areaServed: "RO",
      availableLanguage: "ro",
    },
    sameAs: [
      "https://facebook.com/yuvoo",
      "https://instagram.com/yuvoo",
      "https://twitter.com/yuvoo",
      "https://linkedin.com/company/yuvoo",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
