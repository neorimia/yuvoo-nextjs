/**
 * Guide page SEO metadata helper
 */

import type { Metadata } from "next";
import type { GuidePage } from "@/data/guide-pages-data";
import { getSiteUrl } from "@/lib/seo/site-url";
import { routes } from "@/lib/routes";

export function generateGuideMetadata(guide: GuidePage): Metadata {
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}${routes.guides.detail(guide.slug)}`;
  const ogImage = `${baseUrl}/assets/img/logo/og-image.jpg`;

  return {
    title: guide.title,
    description: guide.metaDescription,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url,
      siteName: "Yuvoo",
      type: "article",
      locale: "ro_RO",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: guide.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: routes.guides.detail(guide.slug),
    },
  };
}

export function generateGuidesHubMetadata(): Metadata {
  const baseUrl = getSiteUrl();
  const title = "Ghiduri pentru părinți — Alegerea sportului potrivit | Yuvoo";
  const description =
    "Ghiduri Yuvoo pentru părinți: sport copii 6 ani, ce sport la 8 ani, copii timizi și cum alegi activitatea potrivită. Conținut în română, cluburi verificate, chestionar AI.";

  return {
    title,
    description,
    keywords: [
      "ghid sport copii",
      "sport copii ghid părinți",
      "ce sport copil",
      "activități copii romania",
    ],
    openGraph: {
      title,
      description,
      url: `${baseUrl}${routes.guides.list}`,
      siteName: "Yuvoo",
      type: "website",
      locale: "ro_RO",
      images: [
        {
          url: `${baseUrl}/assets/img/logo/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Ghiduri sport copii Yuvoo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/assets/img/logo/og-image.jpg`],
    },
    alternates: {
      canonical: routes.guides.list,
    },
  };
}
