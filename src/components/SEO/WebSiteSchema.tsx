/**
 * WebSite Schema Component
 *
 * Generates JSON-LD structured data for WebSite + SearchAction (Schema.org).
 * Linked to Organization via @id graph.
 *
 * @see https://schema.org/WebSite
 */

import { getSiteUrl } from "@/lib/seo/site-url";
import { routes } from "@/lib/routes";

export default function WebSiteSchema() {
  const baseUrl = getSiteUrl();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Yuvoo",
    url: baseUrl,
    inLanguage: "ro-RO",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}${routes.search}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}
