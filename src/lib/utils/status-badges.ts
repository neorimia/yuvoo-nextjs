/**
 * Status Badge Utility
 *
 * Provides consistent status badge configuration for bookings, consultations, and other entities.
 * Returns badge label, CSS classes, and optional icon for each status.
 * All labels are in Romanian.
 */

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface StatusBadgeConfig {
  /**
   * Romanian label for the status
   */
  label: string;
  /**
   * CSS classes for the badge (Bootstrap classes or custom classes)
   */
  class: string;
  /**
   * Optional icon class (Bootstrap Icons or Font Awesome)
   */
  icon?: string;
  /**
   * Optional variant name (for custom CSS classes)
   */
  variant?: string;
}

/**
 * Get status badge configuration
 *
 * Returns badge configuration (label, CSS classes, icon) for a given booking status.
 * Supports both Bootstrap utility classes and custom Yuvoo classes.
 *
 * @param status - The booking status
 * @param style - Badge style: "bootstrap" (default) uses Bootstrap classes, "custom" uses Yuvoo custom classes
 * @returns Status badge configuration with label, class, and optional icon
 *
 * @example
 * ```tsx
 * // Bootstrap style (default)
 * const config = getStatusBadgeConfig("pending");
 * // Returns: { label: "În așteptare", class: "bg-warning text-dark", icon: "bi bi-clock" }
 *
 * // Custom style
 * const config = getStatusBadgeConfig("pending", "custom");
 * // Returns: { label: "În așteptare", class: "badge bd-activity-status-badge bd-activity-status-pending", variant: "pending" }
 * ```
 */
export function getStatusBadgeConfig(
  status: BookingStatus,
  style: "bootstrap" | "custom" = "bootstrap"
): StatusBadgeConfig {
  const statusConfigs: Record<
    BookingStatus,
    Omit<StatusBadgeConfig, "class" | "variant"> & {
      bootstrapClass: string;
      customClass: string;
      variant: string;
    }
  > = {
    pending: {
      label: "În așteptare",
      bootstrapClass: "bg-warning text-dark",
      customClass: "badge bd-activity-status-badge bd-activity-status-pending",
      variant: "pending",
      icon: "bi bi-clock",
    },
    confirmed: {
      label: "Confirmată",
      bootstrapClass: "bg-success text-white",
      customClass: "badge bd-activity-status-badge bd-activity-status-confirmed",
      variant: "confirmed",
      icon: "bi bi-check-circle",
    },
    completed: {
      label: "Finalizată",
      bootstrapClass: "bg-info text-white",
      customClass: "badge bd-activity-status-badge bd-activity-status-completed",
      variant: "completed",
      icon: "bi bi-check2-all",
    },
    cancelled: {
      label: "Anulată",
      bootstrapClass: "bg-secondary text-white",
      customClass: "badge bd-activity-status-badge bd-activity-status-cancelled",
      variant: "cancelled",
      icon: "bi bi-x-circle",
    },
  };

  const config = statusConfigs[status] || statusConfigs.pending;

  if (style === "custom") {
    return {
      label: config.label,
      class: config.customClass,
      variant: config.variant,
      icon: config.icon,
    };
  }

  // Bootstrap style (default)
  return {
    label: config.label,
    class: config.bootstrapClass,
    icon: config.icon,
  };
}
