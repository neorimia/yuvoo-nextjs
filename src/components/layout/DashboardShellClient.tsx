"use client";

/**
 * Dashboard Shell Client Component
 *
 * Client component wrapper for DashboardShell that manages mobile menu state.
 * This is needed because the mobile menu toggle requires client-side state.
 */

import React, { useState } from "react";
import type { UserRole } from "@/modules/auth/auth.types";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardShellClientProps {
  children: React.ReactNode;
  role: UserRole;
  user: {
    id: string;
    email: string | null;
    name: string | null;
    displayName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    role: UserRole;
  };
}

/**
 * Dashboard Shell Client Component
 *
 * Manages mobile menu state and wraps dashboard content with sidebar and header.
 */
export function DashboardShellClient({ children, role, user }: DashboardShellClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="bd-dashboard-wrapper">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        role={role}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
      />

      {/* Main Content Area */}
      <div className="bd-dashboard-main">
        {/* Header */}
        <DashboardHeader
          user={user}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={handleMobileMenuToggle}
        />

        {/* Page Content */}
        <main className="bd-dashboard-content">{children}</main>
      </div>
    </div>
  );
}
