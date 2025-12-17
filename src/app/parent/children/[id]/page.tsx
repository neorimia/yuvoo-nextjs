import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import { getChildAction } from "@/app/actions/children";
import { getQuizHistoryAction } from "@/app/actions/quiz";
import { getBookingsAction } from "@/app/actions/bookings";
import ChildDetailsMain from "@/components/features/children/ChildDetailsMain";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routes } from "@/lib/routes";

// MIGRATED: Removed export const dynamic = 'force-dynamic' (incompatible with Cache Components)
// This page uses requireAuth() which accesses cookies, so it remains dynamic by default
// Explicitly accessing cookies() to ensure route is dynamic during build

interface ChildDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for child detail page
 */
export async function generateMetadata({ params }: ChildDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const child = await getChildAction(id);

  if (!child) {
    return {
      title: "Copil negăsit - Yuvoo",
      description: "Profilul copilului nu a fost găsit.",
    };
  }

  return {
    title: `${child.firstName} ${child.lastName} - Profil Copil - Yuvoo`,
    description: `Profilul complet pentru ${child.firstName} ${child.lastName}, ${child.age} ani. Vezi chestionarele, rezervările și recomandările sportive.`,
  };
}

/**
 * Child Detail Page
 *
 * Protected page displaying comprehensive child profile information.
 * Route: /parent/children/[id]
 */
export default async function ChildDetailPage({ params }: ChildDetailPageProps) {
  // Explicitly access cookies to ensure route is dynamic (prevents prerender errors)
  await cookies();
  await requireAuth();

  const { id } = await params;
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
