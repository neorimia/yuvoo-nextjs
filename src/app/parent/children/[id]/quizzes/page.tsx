import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";
import { getChildById } from "@/modules/children/children.service";
import { getQuizHistoryAction } from "@/app/actions/quiz";
import QuizHistory from "@/components/features/quiz/QuizHistory";
import DashboardBreadcrumb from "@/components/shared/DashboardBreadcrumb";
import { routes } from "@/lib/routes";

interface ChildQuizzesPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate static params for child quiz pages
 * Returns at least one dummy value for Cache Components compatibility
 */
export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

/**
 * Generate metadata for child quiz history page
 * No explicit dynamic data access needed - parent layout makes entire tree dynamic
 */
export async function generateMetadata(_props: ChildQuizzesPageProps): Promise<Metadata> {
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
 * Route: /parent/children/[id]/quizzes
 *
 * Note: Parent layout already handles cookies() and auth, making this route dynamic
 */
export default async function ChildQuizzesPage({ params }: ChildQuizzesPageProps) {
  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // Require authentication (layout already called cookies())
  const session = await requireAuth();
  const { id } = await params;
  const childId = id; // Use id from route params as childId

  // During production builds, skip database queries and render with mock data
  if (isProductionBuild) {
    return (
      <section className="bd-child-quizzes-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-child-quizzes-content">
                <DashboardBreadcrumb
                  items={[
                    { label: "Copiii Mei", href: routes.parent.children.list },
                    { label: "Mock Child" },
                    { label: "Chestionare" },
                  ]}
                />
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
                    Toate chestionarele completate pentru <strong>Mock Child</strong>. Poți compara
                    recomandările și vedea cum s-au schimbat în timp.
                  </p>
                </div>
                <QuizHistory quizzes={[]} childName="Mock Child" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Verify child belongs to parent
  const child = await getChildById(childId, session.dbUser.id);
  if (!child) {
    notFound();
  }

  // Fetch quiz history for this child
  const quizzes = await getQuizHistoryAction(childId);

  const childName = `${child.firstName} ${child.lastName}`;

  return (
    <section className="bd-child-quizzes-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-child-quizzes-content">
              <DashboardBreadcrumb
                items={[
                  { label: "Copiii Mei", href: routes.parent.children.list },
                  { label: childName, href: routes.parent.children.detail(id) },
                  { label: "Chestionare" },
                ]}
              />
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
      </div>
    </section>
  );
}
