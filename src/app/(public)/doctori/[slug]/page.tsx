import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

interface DoctorDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// TODO: Implement proper generateStaticParams when real data fetching is added
// For now, returning a dummy value to satisfy Cache Components requirement
export async function generateStaticParams() {
  return [{ slug: "example-doctor" }];
}

/**
 * Doctor Detail Page
 *
 * Public page displaying details for a specific pediatric specialist.
 * SEO-friendly route: /doctori/[slug]
 */
export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  // Explicitly access headers to ensure route is dynamic (prevents generateMetadata mismatch)
  await headers();
  const { slug } = await params;

  // TODO: Fetch doctor data by slug
  // const doctor = await getDoctorBySlug(slug);
  // if (!doctor) notFound();

  return (
    <>
      <BreadcrumbOne title={`Doctor: ${slug}`} subTitle="Doctori" />
      <section className="bd-doctor-detail-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-doctor-detail-content">
                <h1 className="bd-section-title mb-30">Profil Doctor: {slug}</h1>
                {/* TODO: Add doctor detail component */}
                <div className="bd-doctor-detail-placeholder">
                  <p>Detaliile doctorului vor fi afișate aici.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: DoctorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug} - Doctori Yuvoo`,
    description: `Profil specialist pediatric ${slug} pe platforma Yuvoo.`,
  };
}
