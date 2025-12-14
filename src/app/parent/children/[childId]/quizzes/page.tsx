import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";
import { getChildById } from "@/modules/children/children.service";
import { getQuizHistoryAction } from "@/app/actions/quiz";
import QuizHistory from "@/components/features/quiz/QuizHistory";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { routes } from "@/lib/routes";

interface ChildQuizzesPageProps {
  params: Promise<{ childId: string }>;
}

/**
 * Generate metadata for child quiz history page
 */
export async function generateMetadata({ params }: ChildQuizzesPageProps): Promise<Metadata> {
  const { childId: _childId } = await params; // Not used in metadata, but required for type

  return {
    title: `Istoric Chestionare - Yuvoo`,
    description: "Vezi toate chestionarele completate pentru copilul tău și compară recomandările.",
  };
}

/**
 * Child Quiz History Page
 *
 * Displays all completed quizzes for a specific child.
 * Protected route requiring authentication and child ownership verification.
 * Route: /parent/children/[childId]/quizzes
 */
export default async function ChildQuizzesPage({ params }: ChildQuizzesPageProps) {
  // Explicitly access cookies to ensure route is dynamic
  await cookies();

  // Require authentication
  const session = await requireAuth();
  const { childId } = await params;

  // Verify child belongs to parent
  const child = await getChildById(childId, session.dbUser.id);
  if (!child) {
    notFound();
  }

  // Fetch quiz history for this child
  const quizzes = await getQuizHistoryAction(childId);

  const childName = `${child.firstName} ${child.lastName}`;

  return (
    <>
      <BreadcrumbOne title={`Chestionare - ${childName}`} subTitle="Istoric Chestionare" />
      <section className="bd-child-quizzes-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1 className="h3 mb-0">
                    <i className="bi bi-clipboard-check me-2 text-primary"></i>
                    Istoric Chestionare
                  </h1>
                  <Link href={routes.quiz.intro} className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Completează un Nou Chestionar
                  </Link>
                </div>
                <p className="text-muted">
                  Toate chestionarele completate pentru <strong>{childName}</strong>. Poți compara
                  recomandările și vedea cum s-au schimbat în timp.
                </p>
              </div>

              <QuizHistory quizzes={quizzes} childName={childName} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
