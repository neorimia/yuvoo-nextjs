/**
 * Dashboard Breadcrumb Component
 *
 * Simple breadcrumb component for dashboard pages.
 * Shows navigation path for nested pages.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardBreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Dashboard Breadcrumb Component
 *
 * Displays a simple breadcrumb navigation for dashboard pages.
 * Shows: Home > Parent Dashboard > Current Page
 *
 * @example
 * ```tsx
 * <DashboardBreadcrumb
 *   items={[
 *     { label: "Dashboard", href: routes.parent.dashboard },
 *     { label: "Copii", href: routes.parent.children.list },
 *     { label: "Detalii Copil" },
 *   ]}
 * />
 * ```
 */
const DashboardBreadcrumb: React.FC<DashboardBreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link href={routes.parent.dashboard} className="text-decoration-none">
            <i className="bi bi-house me-1"></i>
            Dashboard
          </Link>
        </li>
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${index === items.length - 1 ? "active" : ""}`}
            aria-current={index === items.length - 1 ? "page" : undefined}
          >
            {item.href ? (
              <Link href={item.href} className="text-decoration-none">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default DashboardBreadcrumb;
