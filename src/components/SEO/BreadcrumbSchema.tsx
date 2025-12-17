/**
 * Breadcrumb Schema Component
 *
 * Generates JSON-LD structured data for BreadcrumbList schema (Schema.org).
 * Used to help search engines understand the page hierarchy and navigation.
 *
 * @see https://schema.org/BreadcrumbList
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";

  // Build breadcrumb schema
  // Include all items with URLs (current page should have its URL included)
  const processedItems = items
    .filter((item) => item.url && item.url !== "") // Only include items with valid URLs
    .map((item, index) => {
      // Build full URL
      const fullUrl = item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`;

      return {
        "@type": "ListItem" as const,
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: processedItems,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
