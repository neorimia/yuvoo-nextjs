/**
 * Report Content Component
 *
 * Async server component that fetches and displays report content.
 * Wrapped in Suspense for better loading UX.
 */

import React from "react";
import { getReportAction } from "@/app/actions/quiz/get-report";
import ReportHeader from "@/components/features/quiz/report/ReportHeader";
import SportRecommendationsSection from "@/components/features/quiz/report/SportRecommendationsSection";
import SportExplanationsSection from "@/components/features/quiz/report/SportExplanationsSection";
import SportBenefitsSection from "@/components/features/quiz/report/SportBenefitsSection";
import SportsToAvoidSection from "@/components/features/quiz/report/SportsToAvoidSection";
import AgeGuidanceSection from "@/components/features/quiz/report/AgeGuidanceSection";
import NextStepsSection from "@/components/features/quiz/report/NextStepsSection";
import LocalClubsSection from "@/components/features/quiz/report/LocalClubsSection";
import ReportDownloadButton from "@/components/features/quiz/report/ReportDownloadButton";
import { notFound } from "next/navigation";

interface ReportContentProps {
  accessToken: string;
  isPdfMode: boolean;
}

/**
 * Report Content
 *
 * Async component that fetches report data and renders content.
 */
export default async function ReportContent({ accessToken, isPdfMode }: ReportContentProps) {
  // Get report data (includes access verification)
  const result = await getReportAction(accessToken);

  if (!result.success || !result.quizResult) {
    notFound();
  }

  const { quizResult, quizAnswers } = result;

  // Verify quiz has recommendations
  if (!quizResult.recommendations || quizResult.recommendations.length === 0) {
    notFound();
  }

  // Sort recommendations by match score (highest first)
  const sortedRecommendations = [...quizResult.recommendations].sort(
    (a, b) => b.matchScore - a.matchScore
  );

  // Get top 2-3 recommendations
  const topRecommendations = sortedRecommendations.slice(0, 3);

  return (
    <>
      {/* Report Header */}
      <ReportHeader quizResult={quizResult} />

      {/* Download PDF Button */}
      {!isPdfMode && (
        <div className="text-center mb-5">
          <ReportDownloadButton accessToken={accessToken} quizId={quizResult.id} />
        </div>
      )}

      {/* Section 1: Top 2-3 Sport Recommendations */}
      <SportRecommendationsSection recommendations={topRecommendations} />

      {/* Section 2: Why These Sports Are Suitable */}
      <SportExplanationsSection recommendations={topRecommendations} />

      {/* Section 3: What Each Sport Develops */}
      <SportBenefitsSection recommendations={topRecommendations} />

      {/* Section 4: Sports to Avoid */}
      <SportsToAvoidSection
        recommendations={sortedRecommendations}
        topRecommendations={topRecommendations}
      />

      {/* Section 5: Ideal Age to Start */}
      <AgeGuidanceSection quizResult={quizResult} quizAnswers={quizAnswers} />

      {/* Section 6: Next Steps */}
      <NextStepsSection quizResult={quizResult} />

      {/* Section 7: Local Clubs Suggestions */}
      <LocalClubsSection quizResult={quizResult} />

      {/* Footer Note */}
      <div className="card bg-light border-0 mt-5">
        <div className="card-body p-4 text-center">
          <p className="text-muted small mb-0">
            <i className="bi bi-info-circle me-2" aria-hidden="true"></i>
            Acest raport este personalizat pentru profilul completat. Pentru întrebări sau
            clarificări, te rugăm să ne contactezi la{" "}
            <a
              href="mailto:support@yuvoo.com"
              className="text-decoration-none"
              aria-label="Trimite email la support@yuvoo.com"
            >
              support@yuvoo.com
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
