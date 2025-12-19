"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import DoctorConsultationList from "@/components/features/doctors/DoctorConsultationList";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export const metadata: Metadata = {
  title: "Consultații - Yuvoo",
  description: "Gestionează consultațiile tale pe Yuvoo.",
};

/**
 * Doctor Bookings Page
 *
 * Protected page for doctor to manage consultations.
 * Shows all consultations for the doctor with filtering and management actions.
 * Uses Next.js 16 Cache Components with "use cache: private" directive.
 * Route: /doctor/bookings
 */
export default async function DoctorBookingsPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a doctor
  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  // Cache configuration for private cache
  // Cache for 2 minutes - consultation data changes frequently
  cacheLife("minutes");
  // Cache tag for user-specific revalidation
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`doctor-bookings-${session.dbUser.id}`);

  return (
    <DashboardPageLayout
      icon="bi-calendar-check"
      title="Consultații"
      subtitle="Gestionează toate consultațiile tale"
      variant="doctor"
      contentClassName="bd-doctor-consultations-content"
    >
      <DoctorConsultationList />
    </DashboardPageLayout>
  );
}
