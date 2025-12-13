/**
 * Onboarding Helper Utilities
 *
 * Helper functions for onboarding workflows.
 */

import type { UserRole, OnboardingStep } from "@/types/onboarding";

/**
 * Get total steps for a role
 */
export function getTotalSteps(role: UserRole): number {
  const stepsMap: Record<UserRole, number> = {
    parent: 5,
    club_admin: 7,
    doctor: 8,
    admin: 0, // Admins don't have onboarding
  };
  return stepsMap[role];
}

/**
 * Calculate onboarding progress percentage
 */
export function calculateProgress(currentStep: number, totalSteps: number): number {
  return Math.round((currentStep / totalSteps) * 100);
}

/**
 * Get onboarding route for current step
 */
export function getOnboardingRoute(role: UserRole, step: OnboardingStep): string {
  const routes: Record<UserRole, Record<OnboardingStep, string>> = {
    parent: {
      1: "/onboarding/parent/welcome",
      2: "/onboarding/parent/add-child",
      3: "/onboarding/parent/tour",
      4: "/onboarding/parent/quiz-intro",
      5: "/onboarding/parent/complete",
      6: "",
      7: "",
      8: "",
    },
    club_admin: {
      1: "/onboarding/club/welcome",
      2: "/onboarding/club/basic-info",
      3: "/onboarding/club/contact-schedule",
      4: "/onboarding/club/pricing-ages",
      5: "/onboarding/club/photos",
      6: "/onboarding/club/verification",
      7: "/onboarding/club/complete",
      8: "",
    },
    doctor: {
      1: "/onboarding/doctor/welcome",
      2: "/onboarding/doctor/basic-info",
      3: "/onboarding/doctor/bio-experience",
      4: "/onboarding/doctor/location-contact",
      5: "/onboarding/doctor/photo",
      6: "/onboarding/doctor/verification",
      7: "/onboarding/doctor/availability",
      8: "/onboarding/doctor/complete",
    },
    admin: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    },
  };

  return routes[role][step] || "";
}

/**
 * Get step title (Romanian)
 */
export function getStepTitle(role: UserRole, step: OnboardingStep): string {
  const titles: Record<UserRole, Record<OnboardingStep, string>> = {
    parent: {
      1: "Bun venit",
      2: "Adaugă copilul tău",
      3: "Cum funcționează",
      4: "AI Coach Quiz",
      5: "Complet",
      6: "",
      7: "",
      8: "",
    },
    club_admin: {
      1: "Bun venit",
      2: "Informații de bază",
      3: "Contact și program",
      4: "Tarife și grupe",
      5: "Fotografii",
      6: "Verificare",
      7: "Complet",
      8: "",
    },
    doctor: {
      1: "Bun venit",
      2: "Informații profesionale",
      3: "Bio și experiență",
      4: "Locație și contact",
      5: "Fotografie",
      6: "Verificare",
      7: "Disponibilitate",
      8: "Complet",
    },
    admin: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    },
  };

  return titles[role][step] || "";
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Validate file type
 */
export function validateFileType(file: File, acceptedTypes: string[]): boolean {
  return acceptedTypes.some((type) => {
    if (type.endsWith("/*")) {
      return file.type.startsWith(type.replace("/*", ""));
    }
    return file.type === type;
  });
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + " " + sizes[i];
}
