/**
 * Article JSON-LD for parent guide landing pages
 */

import type { GuidePage } from "@/data/guide-pages-data";
import { buildGuideArticleBody } from "@/data/guide-pages-data";
import { getSiteUrl } from "@/lib/seo/site-url";
import { routes } from "@/lib/routes";

interface GuideArticleSchemaProps {
  guide: GuidePage;
}

export default function GuideArticleSchema({ guide }: GuideArticleSchemaProps) {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}${routes.guides.detail(guide.slug)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.metaDescription,
    image: `${baseUrl}/assets/img/logo/og-image.jpg`,
    author: {
      "@id": `${baseUrl}/#organization`,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    datePublished: guide.lastModified,
    dateModified: guide.lastModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    articleBody: buildGuideArticleBody(guide),
    keywords: guide.keywords,
    inLanguage: "ro-RO",
    about: {
      "@type": "Thing",
      name: "Sport pentru copii",
      description:
        "Alegerea activității sportive potrivite pentru copiii cu vârste între 4 și 14 ani",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
