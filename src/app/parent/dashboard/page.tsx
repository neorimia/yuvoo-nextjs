import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/session";
import { getChildrenByParentId } from "@/modules/children/children.service";
import { getQuizHistoryAction } from "@/app/actions/quiz";
import QuizHistory from "@/components/features/quiz/QuizHistory";
import { routes } from "@/lib/routes";

// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)
// This page uses requireAuth() which accesses cookies, so it remains dynamic by default
// Explicitly accessing cookies() to ensure route is dynamic during build

export const metadata: Metadata = {
  title: "Dashboard - Yuvoo",
  description: "Panoul de control pentru părinți pe Yuvoo.",
};

/**
 * Parent Dashboard Page
 *
 * Protected page for parent dashboard.
 * Shows recent quiz activity and quick stats.
 * Route: /parent/dashboard
 */
export default async function ParentDashboardPage() {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();
  // Require authentication
  const session = await requireAuth();

  // Fetch children for this parent
  const children = await getChildrenByParentId(session.dbUser.id);

  // Fetch recent quiz history for all children
  const allQuizzes = await Promise.all(children.map((child) => getQuizHistoryAction(child.id)));
  const recentQuizzes = allQuizzes
    .flat()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5); // Show 5 most recent quizzes

  return (
    <section className="bd-parent-dashboard-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-parent-dashboard-content">
              <h1 className="bd-section-title mb-30">Dashboard Părinte</h1>
              <p className="mb-40">Bun venit, {session.dbUser?.firstName || "Utilizator"}!</p>

              {/* Quick Stats */}
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">
                      <i
                        className="bi bi-people-fill text-primary"
                        style={{ fontSize: "2.5rem" }}
                      ></i>
                      <h3 className="mt-3 mb-0">{children.length}</h3>
                      <p className="text-muted mb-0">Copii înregistrați</p>
                      <Link
                        href={routes.parent.children.list}
                        className="btn btn-sm btn-outline-primary mt-3"
                      >
                        Gestionează copiii
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">
                      <i
                        className="bi bi-clipboard-check text-success"
                        style={{ fontSize: "2.5rem" }}
                      ></i>
                      <h3 className="mt-3 mb-0">{allQuizzes.flat().length}</h3>
                      <p className="text-muted mb-0">Chestionare completate</p>
                      <Link
                        href={routes.quiz.intro}
                        className="btn btn-sm btn-outline-success mt-3"
                      >
                        Completează un chestionar
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">
                      <i
                        className="bi bi-star-fill text-warning"
                        style={{ fontSize: "2.5rem" }}
                      ></i>
                      <h3 className="mt-3 mb-0">
                        {allQuizzes
                          .flat()
                          .reduce((sum, quiz) => sum + quiz.recommendations.length, 0)}
                      </h3>
                      <p className="text-muted mb-0">Recomandări primite</p>
                      <Link
                        href={routes.clubs.list}
                        className="btn btn-sm btn-outline-warning mt-3"
                      >
                        Vezi cluburi
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Quiz Activity */}
              <div className="row">
                <div className="col-12">
                  <h2 className="h4 mb-4">
                    <i className="bi bi-clock-history me-2"></i>
                    Activitate Recentă - Chestionare
                  </h2>
                  <QuizHistory quizzes={recentQuizzes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
