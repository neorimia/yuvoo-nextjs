/**
 * Organization Schema Component
 *
 * Generates JSON-LD structured data for Organization schema (Schema.org).
 * Added to root layout for all pages.
 *
 * @see https://schema.org/Organization
 */

export default function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
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
    ].filter(Boolean), // Filter out any undefined values
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
