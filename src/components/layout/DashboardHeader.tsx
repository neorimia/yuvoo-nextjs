"use client";

/**
 * Dashboard Header Component
 *
 * Client component for dashboard header with user profile dropdown and logout.
 */

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStackApp, useUser } from "@stackframe/stack";
import type { UserRole } from "@/modules/auth/auth.types";
import { routes } from "@/lib/routes";
import Image from "next/image";
import { UserProfileDropdown } from "@/components/shared/UserProfileDropdown";

interface DashboardHeaderProps {
  user: {
    id: string;
    email: string | null;
    name: string | null;
    displayName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    role: UserRole;
  };
  profileData?: {
    image?: string | null; // Doctor photoUrl or club logoUrl
    name?: string; // Doctor name or club name
    email?: string; // Doctor/club email if different from user email
  };
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

/**
 * Dashboard Header Component
 *
 * Displays header with logo, user profile dropdown, and logout functionality.
 */
export function DashboardHeader({
  user,
  profileData,
  isMobileMenuOpen,
  onMobileMenuToggle,
}: DashboardHeaderProps) {
  const stackApp = useStackApp();
  const stackUser = useUser();
  const router = useRouter();

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    try {
      // Check if Stack Auth user exists before attempting sign out
      // This prevents the "Cannot use 'in' operator to search for 'accessToken' in undefined" error
      // when session data is undefined or has expired
      if (stackUser) {
        await stackApp.signOut();
      }
      // Always redirect to login, even if signOut fails or user is already logged out
      router.push(routes.login);
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
      // Still redirect on error - user session may have expired or doesn't exist
      router.push(routes.login);
      router.refresh();
    }
  };

  return (
    <header className="bd-dashboard-header">
      <div className="bd-dashboard-header-content">
        {/* Mobile Hamburger Button */}
        <button
          id="dashboard-hamburger"
          className="d-md-none btn btn-link p-0 me-3"
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          style={{
            fontSize: "1.5rem",
            color: "#333",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className={`bi ${isMobileMenuOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>

        {/* Logo (hidden on mobile, shown on desktop when sidebar is visible) */}
        <div className="bd-dashboard-header-logo ">
          <Link href={routes.home}>
            <Image
              src="/assets/img/logo/logo.svg"
              alt="Yuvoo"
              width={120}
              height={40}
              style={{ height: "40px", width: "auto" }}
              className="d-md-none"
            />
          </Link>
        </div>

        {/* User Profile Dropdown */}
        <UserProfileDropdown user={user} profileData={profileData} onLogout={handleLogout} />
      </div>
    </header>
  );
}
