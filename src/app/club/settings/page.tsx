"use cache: private";

import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { getClubSettingsAction } from "@/app/actions/club-settings";
import ClubSettingsForm from "@/components/features/clubs/ClubSettingsForm";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { cacheLife, cacheTag } from "next/cache";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export const metadata: Metadata = {
  title: "Setări - Yuvoo",
  description: "Gestionează setările contului și preferințele de notificare.",
};

/**
 * Club Settings Page
 *
 * Protected page for club admin account settings and email notification preferences.
 * Route: /club/settings
 */
export default async function ClubSettingsPage() {
  // Explicitly access cookies to ensure route is dynamic
  await cookies();
  const session = await requireAuth();

  // Require club_admin role
  if (session.dbUser.role !== UserRoleEnum.CLUB_ADMIN) {
    redirect(routes.parent.dashboard);
  }

  cacheLife("minutes");
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`club-settings-${session.dbUser.id}`);

  // Fetch settings data
  const settingsResult = await getClubSettingsAction();
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
      variant="club"
      contentClassName="bd-club-settings-content"
    >
      <ClubSettingsForm initialData={initialData} />
    </DashboardPageLayout>
  );
}
