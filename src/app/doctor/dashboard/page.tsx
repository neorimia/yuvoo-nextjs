"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getDoctorByUserId, calculateProfileCompleteness } from "@/modules/doctors/doctors.service";
import { bookingsRepository } from "@/modules/bookings/bookings.repository";
import DoctorNotFoundState from "@/components/features/doctors/DoctorNotFoundState";
import DoctorDashboardContent from "@/components/features/doctors/DoctorDashboardContent";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export const metadata: Metadata = {
  title: "Dashboard Doctor - Yuvoo",
  description: "Panoul de control pentru doctori pe Yuvoo.",
};

/**
 * Doctor Dashboard Page
 *
 * Protected page for doctor dashboard.
 * Shows profile completeness, verification status, consultation statistics, and recent activity.
 * Uses Next.js 16 Cache Components with "use cache: private" directive.
 * Route: /doctor/dashboard
 */
export default async function DoctorDashboardPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a doctor
  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  // Cache configuration for private cache
  // Cache for 5 minutes - dashboard data changes frequently
  cacheLife("minutes");
  // Cache tag for user-specific revalidation
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`doctor-dashboard-${session.dbUser.id}`);

  // Fetch doctor profile for this user
  const doctor = await getDoctorByUserId(session.dbUser.id);

  // Show not found state if doctor doesn't exist
  if (!doctor) {
    return <DoctorNotFoundState />;
  }

  // Calculate profile completeness
  const profileCompleteness = calculateProfileCompleteness(doctor);

  // Fetch consultation statistics
  const consultationStats = await bookingsRepository.getConsultationStatsByDoctorId(doctor.id);

  // Fetch recent consultations (last 5)
  const recentConsultations = await bookingsRepository.findByDoctorId(doctor.id);
  const recentConsultationsLimited = recentConsultations.slice(0, 5);

  return (
    <DoctorDashboardContent
      doctor={doctor}
      profileCompleteness={profileCompleteness}
      consultationStats={consultationStats}
      recentConsultations={recentConsultationsLimited}
    />
  );
}
