/**
 * Report Page
 *
 * Displays complete personalized report for paid quiz results.
 * Access-controlled via access token verification.
 */

import React, { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { routes } from "@/lib/routes";
import ReportContent from "@/components/features/quiz/report/ReportContent";
import ReportLoadingSkeleton from "@/components/features/quiz/report/ReportLoadingSkeleton";
import "@/styles/report-pdf.scss";

interface ReportPageProps {
  params: Promise<{ accessToken: string }>;
  searchParams: Promise<{ pdf?: string }>;
}

/**
 * Generate static params for Cache Components compatibility
 */
export async function generateStaticParams() {
  return [{ accessToken: "placeholder" }];
}

/**
 * Generate metadata for report page
 */
export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { accessToken: _accessToken } = await params;

  return {
    title: "Raport Complet - Recomandări Personalizate | Yuvoo",
    description:
      "Raport complet cu recomandări personalizate de sporturi pentru copilul tău, bazat pe profilul completat în chestionar.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Report Page
 *
 * Displays complete report with all 7 sections.
 * Access-controlled via access token.
 */
export default async function ReportPage({ params, searchParams }: ReportPageProps) {
  // Access dynamic data sources first to mark route as dynamic
  const _cookies = await cookies();
  const { accessToken } = await params;
  const { pdf } = await searchParams;

  // If PDF mode, add print styles class
  const isPdfMode = pdf === "true";

  return (
    <>
      <BreadcrumbOne
        title="Raport Complet"
        subTitle="Recomandări Personalizate"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Chestionar", url: routes.quiz.intro },
          { name: "Raport", url: routes.quiz.report(accessToken) },
        ]}
      />
      <section className={`report-section ${isPdfMode ? "pdf-mode" : "py-5"}`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9">
              <Suspense fallback={<ReportLoadingSkeleton />}>
                <ReportContent accessToken={accessToken} isPdfMode={isPdfMode} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
