"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { getDoctorSettingsAction } from "@/app/actions/doctor-settings";
import DoctorSettingsForm from "@/components/features/doctors/DoctorSettingsForm";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { cacheLife, cacheTag } from "next/cache";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export const metadata: Metadata = {
  title: "Setări - Yuvoo",
  description: "Gestionează setările contului și preferințele de notificare.",
};

/**
 * Doctor Settings Page
 *
 * Protected page for doctor account settings and email notification preferences.
 * Route: /doctor/settings
 */
export default async function DoctorSettingsPage() {
  // Explicitly access cookies to ensure route is dynamic
  await cookies();
  const session = await requireAuth();

  // Require doctor role
  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  cacheLife("minutes");
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`doctor-settings-${session.dbUser.id}`);

  // Fetch settings data
  const settingsResult = await getDoctorSettingsAction();
  const initialData =
    settingsResult.success && settingsResult.settings
      ? {
          email: settingsResult.settings.email,
          firstName: settingsResult.settings.firstName,
          lastName: settingsResult.settings.lastName,
          phone: settingsResult.settings.phone,
          emailNotificationPreferences: settingsResult.settings.emailNotificationPreferences,
        }
      : undefined;

  return (
    <DashboardPageLayout
      icon="bi-gear"
      title="Setări"
      subtitle="Gestionează setările contului și preferințele de notificare"
      variant="doctor"
      contentClassName="bd-doctor-settings-content"
    >
      <DoctorSettingsForm initialData={initialData} />
    </DashboardPageLayout>
  );
}
