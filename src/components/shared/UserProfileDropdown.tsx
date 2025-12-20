"use client";

/**
 * User Profile Dropdown Component
 *
 * Client component for user profile dropdown menu with image and profile information.
 * Displays profile image from database (doctor photo, club logo, or fallback icon),
 * user name, email, and navigation links.
 */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { UserRole } from "@/modules/auth/auth.types";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { routes } from "@/lib/routes";

interface UserProfileDropdownProps {
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
  onLogout: () => void;
}

/**
 * User Profile Dropdown Component
 *
 * Displays user profile dropdown with:
 * - Profile image (from database or fallback icon)
 * - User name and email
 * - Navigation links (Profile, Settings)
 * - Logout button
 */
export function UserProfileDropdown({ user, profileData, onLogout }: UserProfileDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
   * Get user display name
   * Priority: profileData.name > user.displayName > firstName + lastName > firstName > user.name > email > "Utilizator"
   */
  const getUserDisplayName = (): string => {
    if (profileData?.name) return profileData.name;
    if (user.displayName) return user.displayName;
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user.firstName) return user.firstName;
    if (user.name) return user.name;
    if (user.email) return user.email.split("@")[0];
    return "Utilizator";
  };

  /**
   * Get user email
   * Priority: profileData.email > user.email
   */
  const getUserEmail = (): string | null => {
    return profileData?.email || user.email;
  };

  /**
   * Get profile image URL
   * Returns profile image from database or null for fallback icon
   */
  const getProfileImage = (): string | null => {
    return profileData?.image || null;
  };

  /**
   * Get profile route based on role
   */
  const getProfileRoute = (): string => {
    switch (user.role) {
      case UserRoleEnum.PARENT:
        return routes.parent.profile;
      case UserRoleEnum.CLUB_ADMIN:
        return routes.club.profile;
      case UserRoleEnum.DOCTOR:
        return routes.doctor.profile;
      case UserRoleEnum.ADMIN:
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
      case UserRoleEnum.PARENT:
        return routes.parent.settings;
      case UserRoleEnum.CLUB_ADMIN:
        return routes.club.settings;
      case UserRoleEnum.DOCTOR:
        return routes.doctor.settings;
      case UserRoleEnum.ADMIN:
        return routes.parent.settings; // Admin uses parent settings route for now
      default:
        return routes.parent.settings;
    }
  };

  const displayName = getUserDisplayName();
  const displayEmail = getUserEmail();
  const profileImage = getProfileImage();
  const profileRoute = getProfileRoute();
  const settingsRoute = getSettingsRoute();

  return (
    <div className="bd-dashboard-header-user position-relative">
      <button
        id="dashboard-user-button"
        className="btn btn-link d-flex align-items-center text-decoration-none text-dark"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label="User menu"
        aria-expanded={isDropdownOpen}
      >
        <div className="bd-dashboard-user-avatar me-2">
          {profileImage ? (
            <Image
              src={profileImage}
              alt={displayName}
              width={32}
              height={32}
              className="rounded-circle"
              style={{
                width: "32px",
                height: "32px",
                objectFit: "cover",
              }}
            />
          ) : (
            <i className="bi bi-person-circle" style={{ fontSize: "2rem" }}></i>
          )}
        </div>
        <div className="d-none d-sm-block text-start">
          <div className="fw-semibold">{displayName}</div>
          {displayEmail && <div className="small text-muted">{displayEmail}</div>}
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
            {displayEmail && <div className="small text-muted">{displayEmail}</div>}
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
                onClick={onLogout}
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
  );
}
