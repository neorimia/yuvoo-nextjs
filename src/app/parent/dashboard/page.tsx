"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getChildrenByParentId } from "@/modules/children/children.service";
import { getQuizHistoryAction } from "@/app/actions/quiz";
import { getBookingsAction } from "@/app/actions/bookings";
import { getFavoritesAction } from "@/app/actions/favorites";
import ParentDashboardContent from "@/components/features/parent/ParentDashboardContent";
import QuizHistory from "@/components/features/quiz/QuizHistory";
import { cacheLife, cacheTag } from "next/cache";
import { calculateParentProfileCompleteness } from "@/lib/utils/profile-completeness";

// MIGRATED: Using "use cache: private" for user-specific prefetchable cache
// Private cache allows per-user caching while maintaining prefetching capabilities

export const metadata: Metadata = {
  title: "Dashboard - Yuvoo",
  description: "Panoul de control pentru părinți pe Yuvoo.",
};

/**
 * Parent Dashboard Page
 *
 * Protected page for parent dashboard.
 * Shows comprehensive dashboard with stats, recent bookings, quick actions,
 * profile completeness, getting started checklist, and upcoming events.
 * Uses Next.js 16 Cache Components with "use cache: private" directive.
 * Route: /parent/dashboard
 */
export default async function ParentDashboardPage() {
  // Require authentication
  const session = await requireAuth();

  // Cache configuration for private cache
  // Cache for 5 minutes - dashboard data changes frequently
  cacheLife("minutes");
  // Cache tag for user-specific revalidation
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`parent-dashboard-${session.dbUser.id}`);

  // Fetch all data in parallel
  const [children, bookings, favorites] = await Promise.all([
    getChildrenByParentId(session.dbUser.id),
    getBookingsAction(),
    getFavoritesAction(),
  ]);

  // Fetch recent quiz history for all children
  const allQuizzes = await Promise.all(children.map((child) => getQuizHistoryAction(child.id)));
  const recentQuizzes = allQuizzes
    .flat()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5); // Show 5 most recent quizzes

  // Calculate profile completeness
  const profileCompleteness = calculateParentProfileCompleteness({
    firstName: session.dbUser.firstName,
    lastName: session.dbUser.lastName,
    phone: session.dbUser.phone,
    email: session.user.primaryEmail,
  });

  return (
    <section className="bd-parent-dashboard-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-parent-dashboard-content">
              <h1 className="bd-section-title mb-30">Dashboard Părinte</h1>
              <p className="mb-40">Bun venit, {session.dbUser?.firstName || "Utilizator"}!</p>

              {/* Enhanced Dashboard Content */}
              <ParentDashboardContent
                childrenList={children}
                bookings={bookings}
                recentQuizzes={recentQuizzes}
                profileCompleteness={profileCompleteness}
                savedItemsCount={favorites.length}
              />

              {/* Recent Quiz Activity */}
              {recentQuizzes.length > 0 && (
                <div className="row mt-5">
                  <div className="col-12">
                    <div className="card shadow-sm">
                      <div className="card-header bg-light">
                        <h2 className="h5 mb-0">
                          <i className="bi bi-clock-history me-2"></i>
                          Activitate Recentă - Chestionare
                        </h2>
                      </div>
                      <div className="card-body">
                        <QuizHistory quizzes={recentQuizzes} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
