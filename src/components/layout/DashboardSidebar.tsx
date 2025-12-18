"use client";

/**
 * Dashboard Sidebar Component
 *
 * Client component for dashboard sidebar navigation.
 * Handles role-specific navigation menus and mobile menu toggle.
 */

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@/modules/auth/auth.types";
import { getNavigationForRole, type NavigationItem } from "@/lib/dashboard-navigation";
import { routes } from "@/lib/routes";
import Image from "next/image";

interface DashboardSidebarProps {
  role: UserRole;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

/**
 * Dashboard Sidebar Component
 *
 * Displays role-specific navigation menu.
 * Mobile: Hamburger menu that toggles sidebar overlay.
 * Desktop: Fixed/sticky sidebar navigation.
 */
export function DashboardSidebar({
  role,
  isMobileMenuOpen,
  onMobileMenuToggle,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const navigationItems = getNavigationForRole(role);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      onMobileMenuToggle();
    }
    // Only close when pathname changes, not when menu state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside (on mobile overlay)
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const sidebar = document.getElementById("dashboard-sidebar");
        const overlay = document.getElementById("dashboard-sidebar-overlay");

        if (sidebar && !sidebar.contains(target) && overlay && overlay.contains(target)) {
          onMobileMenuToggle();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobileMenuOpen, onMobileMenuToggle]);

  /**
   * Check if a navigation item is active based on current pathname
   */
  const isActive = (item: NavigationItem): boolean => {
    if (item.href === pathname) return true;

    // For parent routes, check if current path starts with the item href
    // e.g., /parent/children/123 should highlight "Copii" menu item
    if (pathname.startsWith(item.href + "/")) return true;

    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          id="dashboard-sidebar-overlay"
          className="d-md-none position-fixed"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1039,
          }}
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        className={`bd-dashboard-sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}
      >
        <div className="bd-dashboard-sidebar-content">
          {/* Logo */}
          <div className="bd-dashboard-sidebar-header">
            <Link href={routes.home} className="d-flex align-items-center">
              <Image
                src="/assets/img/logo/logo.svg"
                alt="Yuvoo"
                width={120}
                height={40}
                style={{ height: "40px", width: "auto" }}
              />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="bd-dashboard-sidebar-nav">
            <ul className="list-unstyled mb-0">
              {navigationItems.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.href} className="bd-dashboard-nav-item">
                    <Link
                      href={item.href}
                      className={`bd-dashboard-nav-link ${active ? "active" : ""}`}
                    >
                      <i className={`bi ${item.icon} me-2`}></i>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
