"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import { getDoctorByUserId } from "@/modules/doctors/doctors.service";
import DoctorProfileEditForm from "@/components/features/doctors/DoctorProfileEditForm";
import DoctorNotFoundState from "@/components/features/doctors/DoctorNotFoundState";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export const metadata: Metadata = {
  title: "Editează Profil Doctor - Yuvoo",
  description: "Actualizează informațiile despre profilul tău de doctor pe Yuvoo.",
};

/**
 * Doctor Profile Edit Page
 *
 * Protected page for doctor to edit doctor profile.
 * Shows comprehensive form for editing all doctor information.
 * Uses Next.js 16 Cache Components with "use cache: private" directive.
 * Route: /doctor/profile
 */
export default async function DoctorProfilePage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a doctor
  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  // Cache configuration for private cache
  // Cache for 2 minutes - profile data changes infrequently
  cacheLife("minutes");
  // Cache tag for user-specific revalidation
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`doctor-profile-${session.dbUser.id}`);

  // Fetch doctor for this user
  const doctor = await getDoctorByUserId(session.dbUser.id);

  // Show not found state if doctor doesn't exist
  if (!doctor) {
    return <DoctorNotFoundState />;
  }

  return (
    <DashboardPageLayout
      icon="bi-pencil-square"
      title="Editează Profilul Doctorului"
      subtitle="Actualizează informațiile despre profilul tău de doctor"
      variant="doctor"
      contentClassName="bd-doctor-profile-edit-content"
    >
      <DoctorProfileEditForm doctor={doctor} />
    </DashboardPageLayout>
  );
}
