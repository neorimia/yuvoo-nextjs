import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import GuideDetailsMain from "@/components/features/guides/GuideDetailsMain";
import GuideArticleSchema from "@/components/SEO/GuideArticleSchema";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import { getAllGuideSlugs, getGuideBySlug } from "@/data/guide-pages-data";
import { generateGuideMetadata } from "@/lib/seo/guide-metadata";
import { routes } from "@/lib/routes";

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return { title: "Ghid negăsit | Yuvoo" };
  }
  return generateGuideMetadata(guide);
}

/**
 * Parent guide detail page (SSG)
 * SEO route: /ghiduri/[slug]
 */
export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <GuideArticleSchema guide={guide} />
      <FAQPageSchema faqs={guide.faq} />
      <BreadcrumbOne
        title={guide.h1}
        subTitle="Ghiduri"
        titleAs="p"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Ghiduri", url: routes.guides.list },
          { name: guide.h1, url: routes.guides.detail(slug) },
        ]}
      />
      <GuideDetailsMain guide={guide} />
    </>
  );
}
