import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

interface DoctorDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Doctor Detail Page
 *
 * Public page displaying details for a specific pediatric specialist.
 * SEO-friendly route: /doctori/[slug]
 */
export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
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
