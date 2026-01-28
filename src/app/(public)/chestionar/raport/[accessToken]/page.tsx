/**
 * Report Page
 *
 * Displays complete personalized report for paid quiz results.
 * Access-controlled via access token verification.
 */

import React from "react";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { routes } from "@/lib/routes";
import ReportContent from "@/components/features/quiz/report/ReportContent";
import ClientRedirect from "@/components/features/quiz/report/ClientRedirect";
// Temporarily removed PerformanceScript to test if it's causing hooks errors
// DO NOT import getReportAction statically - use dynamic import to prevent crypto.randomUUID() errors
import "@/styles/report-pdf.scss";

interface ReportPageProps {
  params: Promise<{ accessToken: string }>;
  searchParams: Promise<{ pdf?: string }>;
}

/**
 * Note: With Cache Components enabled, routes are dynamic by default.
 * We MUST access dynamic data sources (connection, cookies, headers, params) at the
 * VERY START of both generateMetadata and the component to mark this route as dynamic
 * BEFORE any code that might use crypto.randomUUID().
 */

/**
 * Generate static params for Cache Components compatibility
 *
 * Required for Next.js 16 Cache Components to work correctly with dynamic routes.
 * Returns a placeholder value - actual access tokens are validated at runtime.
 */
export async function generateStaticParams() {
  return [{ accessToken: "placeholder" }];
}

/**
 * Generate metadata for report page
 *
 * CRITICAL: Must access dynamic data sources FIRST to prevent crypto.randomUUID() errors.
 * This must be the very first operation in this function.
 */
export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  // Access params first to mark route as dynamic
  const { accessToken } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build with placeholder, return static metadata
  if (isProductionBuild && accessToken === "placeholder") {
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

  // At runtime, access dynamic data sources to mark route as dynamic
  await connection();
  await cookies();
  await headers();

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
 *
 * CRITICAL: Must access dynamic data sources FIRST to prevent crypto.randomUUID() errors.
 * This must be the very first operation in this function.
 */
export default async function ReportPage({ params, searchParams }: ReportPageProps) {
  // Access params first
  const { accessToken } = await params;
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // During build, render placeholder for placeholder access token
  if (isProductionBuild && accessToken === "placeholder") {
    return (
      <>
        <BreadcrumbOne
          title="Raport Complet"
          subTitle="Chestionar"
          items={[
            { name: "Yuvoo", url: routes.home },
            { name: "Chestionar", url: routes.quiz.intro },
            { name: "Raport", url: routes.quiz.report(accessToken) },
          ]}
        />
        <section className="report-section py-5">
          <div className="container">
            <div className="text-center">
              <h1 className="display-5 fw-bold mb-3">Raport Complet</h1>
              <p className="text-muted">Build placeholder</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  // At runtime, access dynamic data sources to mark route as dynamic
  await connection();
  await cookies();
  await headers();
  const { pdf } = await searchParams;

  // If PDF mode, add print styles class
  const isPdfMode = pdf === "true";

  // Verify access BEFORE rendering to prevent hooks errors
  // This ensures redirects happen before React starts rendering the component tree
  // Use dynamic import AFTER accessing dynamic data sources to prevent crypto.randomUUID() errors
  // This must be done after connection(), cookies(), headers(), params are accessed
  const { getReportAction } = await import("@/app/actions/quiz/get-report");
  const accessResult = await getReportAction(accessToken);

  // Consolidate all validation
  // Use client-side redirect component instead of server-side redirect() to prevent hooks errors
  // This ensures component tree structure is always consistent
  if (
    !accessResult.success ||
    !accessResult.quizResult ||
    !accessResult.quizResult.recommendations ||
    accessResult.quizResult.recommendations.length === 0
  ) {
    // Use client-side redirect component instead of server-side redirect()
    // This prevents hooks errors in Next.js Router
    if (accessResult.redirectTo) {
      return <ClientRedirect to={accessResult.redirectTo} />;
    }
    // Only use notFound() if no redirect URL is available
    notFound();
  }

  // TypeScript: quizResult is guaranteed to exist after the check above
  // Use non-null assertion since we've validated it exists
  const quizResult = accessResult.quizResult!;

  // Pass verified data to ReportContent to avoid duplicate fetch and prevent hooks errors
  // Ensure className is computed before return to maintain stable component structure
  const sectionClassName = `report-section ${isPdfMode ? "pdf-mode" : "py-5"}`;

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
      <section className={sectionClassName}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9">
              <ReportContent
                quizResult={quizResult}
                quizAnswers={accessResult.quizAnswers}
                accessToken={accessToken}
                isPdfMode={isPdfMode}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
