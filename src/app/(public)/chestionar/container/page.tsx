/**
 * Quiz Container Page
 *
 * Main quiz flow page with 7 questions.
 * Route: /chestionar/container
 *
 * Flow:
 * - Authenticated users with children: Start at Step 0 (child selection)
 * - Authenticated users without children: Create temp child, start at Step 1
 * - Guest users: Create temp child, start at Step 1
 */

import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import QuizContainer from "@/components/features/quiz/QuizContainer";
import { getSession } from "@/lib/auth/session";
import { getChildrenByParentId } from "@/modules/children/children.service";
import { createTemporaryChildForQuiz } from "@/modules/quiz/quiz.service";

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

interface QuizContainerPageProps {
  searchParams: Promise<{ childId?: string }>;
}

export default async function QuizContainerPage({ searchParams }: QuizContainerPageProps) {
  // Access cookies first to make the route dynamic
  const _cookies = await cookies();

  // Get childId from URL params (if provided)
  const params = await searchParams;
  let childId = params.childId;

  // Check authentication
  const session = await getSession();

  // Fetch children for authenticated users
  let childProfiles: Awaited<ReturnType<typeof getChildrenByParentId>> = [];
  if (session) {
    childProfiles = await getChildrenByParentId(session.dbUser.id);
  }

  // If no childId provided and no children to select from, create a temp child
  if (!childId && childProfiles.length === 0) {
    childId = await createTemporaryChildForQuiz(
      {
        age: 4, // Default placeholder age (will be overwritten by quiz answers in Q1)
        gender: undefined,
        childName: undefined,
      },
      session?.dbUser.id || null
    );
  }

  return (
    <div className="quiz-container-page">
      <div className="container pt-120 pb-30">
        <h1 className="bd-section-title text-center mb-4">Completează chestionarul AI</h1>
        <p className="text-center text-muted mb-0">
          Răspunde la 7 întrebări despre copilul tău (3–4 minute) pentru recomandări personalizate.
        </p>
      </div>
      <QuizContainer childId={childId} childProfiles={childProfiles} />
    </div>
  );
}
