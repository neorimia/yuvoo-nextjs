import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

interface SportDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Sport Detail Page
 *
 * Public page displaying details for a specific sport.
 * SEO-friendly route: /sporturi/[slug]
 */
export default async function SportDetailPage({ params }: SportDetailPageProps) {
  const { slug } = await params;

  // TODO: Fetch sport data by slug
  // const sport = await getSportBySlug(slug);
  // if (!sport) notFound();

  return (
    <>
      <BreadcrumbOne title={`Sport: ${slug}`} subTitle="Sporturi" />
      <section className="bd-sport-detail-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-sport-detail-content">
                <h1 className="bd-section-title mb-30">Detalii Sport: {slug}</h1>
                {/* TODO: Add sport detail component */}
                <div className="bd-sport-detail-placeholder">
                  <p>Detaliile sportului vor fi afișate aici.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: SportDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug} - Sporturi Yuvoo`,
    description: `Informații despre ${slug} pentru copii pe platforma Yuvoo.`,
  };
}
