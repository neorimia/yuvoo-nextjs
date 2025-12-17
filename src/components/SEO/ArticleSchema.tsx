/**
 * Article Schema Component
 *
 * Generates JSON-LD structured data for Article schema (Schema.org).
 * Used for sport detail pages that contain comprehensive article-like content.
 * Helps search engines understand the content structure for rich snippets.
 *
 * @see https://schema.org/Article
 */

import type { SportData } from "@/lib/db/seed-data/sports";
import { getSportOGImagePath } from "@/lib/seo/sport-metadata";
import type { SportExpandedContent } from "@/data/sport-expanded-content";

interface ArticleSchemaProps {
  sport: SportData;
  expandedContent?: SportExpandedContent;
  baseUrl?: string;
}

export default function ArticleSchema({
  sport,
  expandedContent,
  baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro",
}: ArticleSchemaProps) {
  // Use expanded content introduction if available, otherwise use sport description
  const articleBody = expandedContent?.introduction || sport.description;

  // Build article sections if we have expanded content
  const articleSection: string[] = [];
  if (expandedContent) {
    if (expandedContent.benefits) {
      articleSection.push("Beneficii");
    }
    if (expandedContent.ageRecommendations) {
      articleSection.push("Vârsta recomandată");
    }
    if (expandedContent.equipmentGuide) {
      articleSection.push("Echipament");
    }
    if (expandedContent.faq && expandedContent.faq.length > 0) {
      articleSection.push("Întrebări frecvente");
    }
  }

  // Build article schema with flexible type
  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${sport.name} pentru Copii - Ghid Complet | Yuvoo`,
    description: sport.description,
    image: getSportOGImagePath(sport.slug, baseUrl),
    author: {
      "@type": "Organization",
      name: "Yuvoo",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Yuvoo",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/img/logo/logo.svg`,
      },
    },
    datePublished: "2024-01-01", // Static date for SSG pages
    dateModified: "2024-01-01", // Static date for SSG pages
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/sporturi/${sport.slug}`,
    },
    articleBody,
    keywords: [
      `${sport.name.toLowerCase()} copii`,
      `${sport.name.toLowerCase()} copii București`,
      `cluburi ${sport.name.toLowerCase()} copii`,
      `sport pentru copii`,
      `activități sportive copii`,
    ],
    inLanguage: "ro-RO",
    about: {
      "@type": "Thing",
      name: sport.name,
      description: sport.description,
    },
  };

  // Add articleSection if we have sections
  if (articleSection.length > 0) {
    articleSchema.articleSection = articleSection;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}
