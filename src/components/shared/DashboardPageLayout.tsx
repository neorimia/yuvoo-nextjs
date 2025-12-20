/**
 * Dashboard Page Layout Component
 *
 * Reusable layout wrapper for dashboard pages.
 * Provides consistent header structure and content wrapper.
 * Works for both club and doctor portals.
 */

import React from "react";

export interface DashboardPageLayoutProps {
  /**
   * Bootstrap icon class (e.g., "bi-pencil-square")
   */
  icon?: string;
  /**
   * Page title
   */
  title: string;
  /**
   * Optional subtitle text
   */
  subtitle?: string;
  /**
   * Page content to render
   */
  children: React.ReactNode;
  /**
   * Variant type for entity-specific styling
   */
  variant?: "club" | "doctor";
  /**
   * Custom CSS class for content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for root wrapper
   */
  className?: string;
}

/**
 * DashboardPageLayout Component
 *
 * Provides consistent layout structure for dashboard pages with:
 * - Header section with icon, title, and subtitle
 * - Content wrapper with consistent spacing
 * - Variant-specific CSS classes
 *
 * @example
 * ```tsx
 * <DashboardPageLayout
 *   icon="bi-pencil-square"
 *   title="Editează Profilul Clubului"
 *   subtitle="Actualizează informațiile despre clubul tău"
 *   variant="club"
 * >
 *   <ClubProfileEditForm club={club} />
 * </DashboardPageLayout>
 * ```
 */
const DashboardPageLayout: React.FC<DashboardPageLayoutProps> = ({
  icon,
  title,
  subtitle,
  children,
  variant = "club",
  contentClassName = "",
  className = "",
}) => {
  // Determine CSS classes based on variant
  const dashboardContentClass =
    variant === "doctor" ? "bd-doctor-dashboard-content" : "bd-club-dashboard-content";
  const dashboardHeaderClass =
    variant === "doctor" ? "bd-doctor-dashboard-header" : "bd-club-dashboard-header";
  const headerTitleClass =
    variant === "doctor" ? "bd-doctor-dashboard-header-title" : "bd-club-dashboard-header-title";
  const headerSubtitleClass =
    variant === "doctor"
      ? "bd-doctor-dashboard-header-subtitle"
      : "bd-club-dashboard-header-subtitle";

  return (
    <div className={`${dashboardContentClass} ${className}`}>
      {/* Page Header */}
      <div className="mb-4">
        <div className={dashboardHeaderClass}>
          <h1 className={`${headerTitleClass} mb-2`}>
            {icon && <i className={`bi ${icon} me-2 text-yuvoo-primary`}></i>}
            {title}
          </h1>
          {subtitle && <p className={`${headerSubtitleClass} mb-0`}>{subtitle}</p>}
        </div>
      </div>

      {/* Page Content */}
      <div className={contentClassName}>{children}</div>
    </div>
  );
};

export default DashboardPageLayout;
