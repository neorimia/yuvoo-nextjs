import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getChildAction } from "@/app/actions/children";
import { getQuizHistoryAction } from "@/app/actions/quiz";
import { getBookingsAction } from "@/app/actions/bookings";
import ChildDetailsMain from "@/components/features/children/ChildDetailsMain";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface ChildDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate static params for child detail pages
 * Returns at least one dummy value for Cache Components compatibility
 */
export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

/**
 * Generate metadata for child detail page
 * No explicit dynamic data access needed - parent layout makes entire tree dynamic
 */
export async function generateMetadata(_props: ChildDetailPageProps): Promise<Metadata> {
  return {
    title: "Profil Copil - Yuvoo",
    description:
      "Profilul complet pentru copilul tău. Vezi chestionarele, rezervările și recomandările sportive.",
  };
}

/**
 * Child Detail Page
 *
 * Protected page displaying comprehensive child profile information.
 * Route: /parent/children/[id]
 *
 * Note: Parent layout already handles cookies() and auth, making this route dynamic
 */
export default async function ChildDetailPage({ params }: ChildDetailPageProps) {
  // Check if we're in production build phase
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  // Require authentication (layout already called cookies())
  await requireAuth();

  const { id } = await params;

  // During production builds, skip database queries and render with mock data
  if (isProductionBuild) {
    return (
      <section className="bd-children-area pt-120 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bd-children-content">
                <nav aria-label="breadcrumb" className="mb-4">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href={routes.parent.dashboard}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href={routes.parent.children.list}>Copiii Mei</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Mock Child
                    </li>
                  </ol>
                </nav>
                <h1 className="bd-section-title mb-30">Profil Copil</h1>
                <p className="text-muted">Build placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const child = await getChildAction(id);

  if (!child) {
    notFound();
  }

  // Fetch related data
  const [quizzes, allBookings] = await Promise.all([getQuizHistoryAction(id), getBookingsAction()]);

  // Filter bookings for this child
  const childBookings = allBookings.filter((booking) => booking.childId === id);

  return (
    <section className="bd-children-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-children-content">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href={routes.parent.dashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href={routes.parent.children.list}>Copiii Mei</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {child.firstName} {child.lastName}
                  </li>
                </ol>
              </nav>

              <h1 className="bd-section-title mb-30">Profil Copil</h1>
              <ChildDetailsMain child={child} quizzes={quizzes} bookings={childBookings} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
