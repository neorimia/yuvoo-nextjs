import React from "react";
import type { Metadata } from "next";
import QuizContainer from "@/components/features/quiz/QuizContainer";

export const metadata: Metadata = {
  title: "Completează Chestionarul | Yuvoo",
  description:
    "Răspunde la 6 întrebări simple despre copilul tău și primește recomandări personalizate de sporturi. Doar 3-4 minute.",
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
