"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import { getDoctorByUserId } from "@/modules/doctors/doctors.service";
import DoctorAvailabilityCalendar from "@/components/features/doctors/DoctorAvailabilityCalendar";
import DoctorNotFoundState from "@/components/features/doctors/DoctorNotFoundState";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export const metadata: Metadata = {
  title: "Disponibilitate - Yuvoo",
  description: "Gestionează disponibilitatea ta pentru consultații pe Yuvoo.",
};

/**
 * Doctor Availability Calendar Page
 *
 * Protected page for doctor to manage availability schedule.
 * Shows weekly schedule editor and recurring patterns.
 * Uses Next.js 16 Cache Components with "use cache: private" directive.
 * Route: /doctor/availability
 */
export default async function DoctorAvailabilityPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a doctor
  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  // Cache configuration for private cache
  // Cache for 2 minutes - availability data changes infrequently
  cacheLife("minutes");
  // Cache tag for user-specific revalidation
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`doctor-availability-${session.dbUser.id}`);

  // Fetch doctor for this user
  const doctor = await getDoctorByUserId(session.dbUser.id);

  // Show not found state if doctor doesn't exist
  if (!doctor) {
    return <DoctorNotFoundState />;
  }

  // Get current availability/schedule from doctor
  const currentAvailability = (doctor as unknown as { schedule?: unknown[] }).schedule || [];

  return (
    <DashboardPageLayout
      icon="bi-calendar-week"
      title="Disponibilitate"
      subtitle="Gestionează programul tău pentru consultații"
      variant="doctor"
      contentClassName="bd-doctor-availability-content"
    >
      <DoctorAvailabilityCalendar
        doctorId={doctor.id}
        currentAvailability={
          currentAvailability as Array<{
            day: string;
            startTime: string;
            endTime: string;
          }>
        }
      />
    </DashboardPageLayout>
  );
}
