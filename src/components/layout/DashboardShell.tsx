/**
 * Dashboard Shell Component
 *
 * Server component that provides a consistent dashboard layout structure
 * with role-specific navigation, authentication, and role verification.
 */

import React from "react";
import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import type { UserRole } from "@/modules/auth/auth.types";
import { DashboardShellClient } from "./DashboardShellClient";
import { routes } from "@/lib/routes";

interface DashboardShellProps {
  children: React.ReactNode;
  role: UserRole;
}

/**
 * Dashboard Shell Component
 *
 * Provides consistent layout structure (header, sidebar, main content) for dashboard pages.
 * Handles authentication and role verification.
 *
 * @param children - Page content to render in main area
 * @param role - Expected user role for this dashboard (parent, club_admin, doctor, admin)
 */
export default async function DashboardShell({ children, role }: DashboardShellProps) {
  // Require authentication - throws if not authenticated
  const session = await requireAuth();

  // Verify user has the correct role for this dashboard
  if (session.dbUser.role !== role) {
    // Redirect to appropriate dashboard based on user's actual role
    switch (session.dbUser.role) {
      case "parent":
        redirect(routes.parent.dashboard);
      case "club_admin":
        redirect(routes.club.dashboard);
      case "doctor":
        redirect(routes.doctor.dashboard);
      case "admin":
        redirect(routes.admin.dashboard);
      default:
        redirect(routes.login);
    }
  }

  // Prepare user data for header component
  const userData = {
    id: session.dbUser.id,
    email: session.user.primaryEmail,
    name:
      session.dbUser.firstName && session.dbUser.lastName
        ? `${session.dbUser.firstName} ${session.dbUser.lastName}`
        : session.user.displayName || null,
    displayName: session.user.displayName,
    firstName: session.dbUser.firstName,
    lastName: session.dbUser.lastName,
    role: session.dbUser.role as UserRole,
  };

  return (
    <DashboardShellClient role={role} user={userData}>
      {children}
    </DashboardShellClient>
  );
}
