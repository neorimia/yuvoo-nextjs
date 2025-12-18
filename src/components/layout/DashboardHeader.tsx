"use client";

/**
 * Dashboard Header Component
 *
 * Client component for dashboard header with user profile dropdown and logout.
 */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStackApp } from "@stackframe/stack";
import type { UserRole } from "@/modules/auth/auth.types";
import { routes } from "@/lib/routes";
import Image from "next/image";

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
  isMobileMenuOpen,
  onMobileMenuToggle,
}: DashboardHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const stackApp = useStackApp();
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    if (isDropdownOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const dropdown = document.getElementById("dashboard-user-dropdown");
        const button = document.getElementById("dashboard-user-button");

        if (dropdown && !dropdown.contains(target) && button && !button.contains(target)) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    try {
      await stackApp.signOut();
      router.push(routes.login);
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
      // Still redirect on error - user session may have expired
      router.push(routes.login);
    }
  };

  /**
   * Get user display name
   */
  const getUserDisplayName = (): string => {
    if (user.displayName) return user.displayName;
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    if (user.name) return user.name;
    if (user.email) return user.email.split("@")[0];
    return "Utilizator";
  };

  /**
   * Get profile route based on role
   */
  const getProfileRoute = (): string => {
    switch (user.role) {
      case "parent":
        return routes.parent.profile;
      case "club_admin":
        return routes.club.profile;
      case "doctor":
        return routes.doctor.profile;
      case "admin":
        return routes.parent.profile; // Admin uses parent profile route for now
      default:
        return routes.parent.profile;
    }
  };

  /**
   * Get settings route based on role
   */
  const getSettingsRoute = (): string => {
    switch (user.role) {
      case "parent":
        return routes.parent.settings;
      case "club_admin":
        return routes.club.settings;
      case "doctor":
        return routes.doctor.settings;
      case "admin":
        return routes.parent.settings; // Admin uses parent settings route for now
      default:
        return routes.parent.settings;
    }
  };

  const displayName = getUserDisplayName();
  const profileRoute = getProfileRoute();
  const settingsRoute = getSettingsRoute();

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
        <div className="bd-dashboard-header-user position-relative">
          <button
            id="dashboard-user-button"
            className="btn btn-link d-flex align-items-center text-decoration-none text-dark"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="User menu"
            aria-expanded={isDropdownOpen}
          >
            <div className="bd-dashboard-user-avatar me-2">
              <i className="bi bi-person-circle" style={{ fontSize: "2rem" }}></i>
            </div>
            <div className="d-none d-sm-block text-start">
              <div className="fw-semibold">{displayName}</div>
              {user.email && <div className="small text-muted">{user.email}</div>}
            </div>
            <i
              className="bi bi-chevron-down ms-2"
              style={{
                transition: "transform 0.2s ease",
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            ></i>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              id="dashboard-user-dropdown"
              className="position-absolute end-0 mt-2 bg-white rounded shadow-lg border"
              style={{
                minWidth: "200px",
                maxWidth: "calc(100vw - 2rem)",
                zIndex: 1050,
                top: "100%",
              }}
            >
              <div className="p-3 border-bottom">
                <div className="fw-semibold">{displayName}</div>
                {user.email && <div className="small text-muted">{user.email}</div>}
              </div>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link
                    href={profileRoute}
                    className="d-flex align-items-center px-3 py-2 text-decoration-none text-dark hover-bg-light"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <i className="bi bi-person me-2"></i>
                    <span>Profil</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={settingsRoute}
                    className="d-flex align-items-center px-3 py-2 text-decoration-none text-dark hover-bg-light"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <i className="bi bi-gear me-2"></i>
                    <span>Setări</span>
                  </Link>
                </li>
                <li className="border-top">
                  <button
                    onClick={handleLogout}
                    className="w-100 d-flex align-items-center px-3 py-2 btn btn-link text-decoration-none text-danger text-start border-0"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    <span>Deconectare</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
