/**
 * Article Schema Component
 *
 * Generates JSON-LD structured data for Article schema (Schema.org).
 * Used for sport detail pages that contain comprehensive article-like content.
 *
 * @see https://schema.org/Article
 */

import type { SportData } from "@/lib/db/seed-data/sports";
import { getSportOGImagePath } from "@/lib/seo/sport-metadata";
import type { SportExpandedContent } from "@/data/sport-expanded-content";
import { getSiteUrl } from "@/lib/seo/site-url";

const SPORT_ARTICLE_DATE_PUBLISHED = "2025-06-01";
const SPORT_ARTICLE_DATE_MODIFIED = "2025-06-01";

interface ArticleSchemaProps {
  sport: SportData;
  expandedContent?: SportExpandedContent;
}

function buildSportArticleBody(sport: SportData, expandedContent?: SportExpandedContent): string {
  const parts: string[] = [];

  if (expandedContent?.introduction) {
    parts.push(expandedContent.introduction);
  } else {
    parts.push(sport.description);
  }

  if (expandedContent?.benefits) {
    parts.push(
      `${expandedContent.benefits.title}: ${expandedContent.benefits.items
        .map((item) => `${item.title} — ${item.description}`)
        .join(" ")}`
    );
  }

  if (expandedContent?.ageRecommendations) {
    parts.push(
      `${expandedContent.ageRecommendations.title}: ${expandedContent.ageRecommendations.content}`
    );
  }

  if (expandedContent?.equipmentGuide) {
    parts.push(
      `${expandedContent.equipmentGuide.title}: ${expandedContent.equipmentGuide.content}`
    );
  }

  return parts.join("\n\n");
}

export default function ArticleSchema({ sport, expandedContent }: ArticleSchemaProps) {
  const baseUrl = getSiteUrl();
  const articleBody = buildSportArticleBody(sport, expandedContent);

  const articleSection: string[] = [];
  if (expandedContent) {
    if (expandedContent.benefits) articleSection.push("Beneficii");
    if (expandedContent.ageRecommendations) articleSection.push("Vârsta recomandată");
    if (expandedContent.equipmentGuide) articleSection.push("Echipament");
    if (expandedContent.faq && expandedContent.faq.length > 0)
      articleSection.push("Întrebări frecvente");
  }

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${sport.name} pentru Copii - Ghid Complet | Yuvoo`,
    description: sport.description,
    image: getSportOGImagePath(sport.slug, baseUrl),
    author: {
      "@id": `${baseUrl}/#organization`,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    datePublished: SPORT_ARTICLE_DATE_PUBLISHED,
    dateModified: SPORT_ARTICLE_DATE_MODIFIED,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/sporturi/${sport.slug}`,
    },
    articleBody,
    keywords: [
      `${sport.name.toLowerCase()} copii`,
      `${sport.name.toLowerCase()} copii București`,
      `cluburi ${sport.name.toLowerCase()} copii`,
      "sport pentru copii",
      "activități sportive copii",
    ],
    inLanguage: "ro-RO",
    about: {
      "@type": "Thing",
      name: sport.name,
      description: sport.description,
    },
  };

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
