/**
 * Organization Schema Component
 *
 * Generates JSON-LD structured data for Organization schema (Schema.org).
 * Added to root layout for all pages.
 *
 * Uses a client component to inject the script into the document head
 * after hydration, preventing conflicts with PostHog and other dynamically
 * injected scripts that could cause hydration mismatches.
 *
 * @see https://schema.org/Organization
 */

"use client";

import { useEffect } from "react";

export default function OrganizationSchema() {
  useEffect(() => {
    // Check if script already exists to prevent duplicates
    if (document.getElementById("organization-schema-ld-json")) {
      return;
    }

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

    // Create and inject the script tag into the head
    const script = document.createElement("script");
    script.id = "organization-schema-ld-json";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(script);

    // Cleanup function to remove script on unmount (though unlikely to unmount)
    return () => {
      const existingScript = document.getElementById("organization-schema-ld-json");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Return null since we're injecting directly into the head
  return null;
}
