/**
 * Dashboard Navigation Configuration
 *
 * Role-specific navigation menus for dashboard shell.
 * All labels are in Romanian as per requirements.
 */

import { routes } from "@/lib/routes";
import type { UserRole } from "@/modules/auth/auth.types";

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
}

export type NavigationConfig = Record<UserRole, NavigationItem[]>;

/**
 * Dashboard navigation configuration for all user roles
 * All labels in Romanian
 */
export const dashboardNavigation: NavigationConfig = {
  parent: [
    { label: "Dashboard", href: routes.parent.dashboard, icon: "bi-house" },
    { label: "Copii", href: routes.parent.children.list, icon: "bi-people" },
    { label: "Rezervări", href: routes.parent.bookings, icon: "bi-calendar-check" },
    { label: "Salvate", href: routes.parent.savedItems, icon: "bi-bookmark" },
    { label: "Setări", href: routes.parent.settings, icon: "bi-gear" },
    { label: "Profil", href: routes.parent.profile, icon: "bi-person" },
  ],
  club_admin: [
    { label: "Dashboard", href: routes.club.dashboard, icon: "bi-house" },
    { label: "Cereri", href: routes.club.leads.list, icon: "bi-inbox" },
    { label: "Profil", href: routes.club.profile, icon: "bi-person" },
    { label: "Rezervări", href: routes.club.bookings, icon: "bi-calendar-check" },
    { label: "Premium", href: routes.club.premium, icon: "bi-star" },
    { label: "Setări", href: routes.club.settings, icon: "bi-gear" },
  ],
  doctor: [
    { label: "Dashboard", href: routes.doctor.dashboard, icon: "bi-house" },
    { label: "Profil", href: routes.doctor.profile, icon: "bi-person" },
    { label: "Disponibilitate", href: routes.doctor.availability, icon: "bi-calendar-week" },
    { label: "Rezervări", href: routes.doctor.bookings, icon: "bi-calendar-check" },
    { label: "Setări", href: routes.doctor.settings, icon: "bi-gear" },
  ],
  admin: [
    { label: "Dashboard", href: routes.admin.dashboard, icon: "bi-house" },
    { label: "Utilizatori", href: routes.admin.users, icon: "bi-people" },
    { label: "Cluburi", href: routes.admin.clubs.list, icon: "bi-building" },
    { label: "Doctori", href: routes.admin.doctors.list, icon: "bi-person-badge" },
    { label: "Verificări", href: routes.admin.verifications, icon: "bi-shield-check" },
  ],
};

/**
 * Get navigation items for a specific role
 */
export function getNavigationForRole(role: UserRole): NavigationItem[] {
  return dashboardNavigation[role] || [];
}
