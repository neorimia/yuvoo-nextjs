import React from "react";
import type { Metadata } from "next";
import QuizContainer from "@/components/features/quiz/QuizContainer";

// Optimized timeout for quiz submission with GPT-3.5-turbo (typically 2-8 seconds)
// Set to 30 seconds to allow for network latency and potential retries
export const maxDuration = 30; // 30 seconds (optimized for GPT-3.5-turbo)

export const metadata: Metadata = {
  title: "Completează Chestionarul | Yuvoo",
  description:
    "Răspunde la 7 întrebări simple despre copilul tău și primește recomandări personalizate de sporturi. Doar 3-4 minute.",
  robots: {
    index: false, // Don't index the quiz container page (it's a form)
    follow: true,
  },
};

/**
 * Quiz Container Page
 *
 * Main quiz flow page with 6 questions.
 * Route: /chestionar/container
 *
 * TODO: Add child selection/creation flow before starting quiz
 * For now, using placeholder childId
 */
export default function QuizContainerPage() {
  // TODO: Get child ID from user session or child selection
  // For now, using a placeholder ID
  const childId = "placeholder-child-id";

  return (
    <div className="quiz-container-page">
      <QuizContainer childId={childId} />
    </div>
  );
}
