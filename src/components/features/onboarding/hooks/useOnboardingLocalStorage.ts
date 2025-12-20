/**
 * useOnboardingLocalStorage Hook
 *
 * Utility functions for managing onboarding form data in localStorage.
 * Provides type-safe save, retrieve, and clear operations with error handling.
 *
 * Storage Key Format: `yuvoo_onboarding_{role}_{stepNumber}`
 * Example: `yuvoo_onboarding_doctor_2`
 */

/**
 * Check if localStorage is available in the current environment
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate localStorage key for a specific role and step
 */
function getStorageKey(role: string, stepNumber: number): string {
  return `yuvoo_onboarding_${role}_${stepNumber}`;
}

/**
 * Save form data to localStorage
 *
 * @param role - User role (e.g., "doctor", "club_admin", "parent")
 * @param stepNumber - Onboarding step number (1-based)
 * @param data - Form data to save
 */
export function saveFormData(role: string, stepNumber: number, data: unknown): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const key = getStorageKey(role, stepNumber);
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (error) {
    // Silently fail - localStorage may be disabled or full
    // Form should continue to work without localStorage
    console.warn("Failed to save form data to localStorage:", error);
  }
}

/**
 * Retrieve form data from localStorage
 *
 * @param role - User role (e.g., "doctor", "club_admin", "parent")
 * @param stepNumber - Onboarding step number (1-based)
 * @returns Parsed form data or null if not found or error occurred
 */
export function getFormData<T>(role: string, stepNumber: number): T | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const key = getStorageKey(role, stepNumber);
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    // Silently fail - return null if data is corrupted or invalid
    console.warn("Failed to retrieve form data from localStorage:", error);
    return null;
  }
}

/**
 * Clear form data from localStorage for a specific step
 *
 * @param role - User role (e.g., "doctor", "club_admin", "parent")
 * @param stepNumber - Onboarding step number (1-based)
 */
export function clearFormData(role: string, stepNumber: number): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const key = getStorageKey(role, stepNumber);
    localStorage.removeItem(key);
  } catch (error) {
    // Silently fail - localStorage may be disabled
    console.warn("Failed to clear form data from localStorage:", error);
  }
}

/**
 * Clear all onboarding data for a specific role
 *
 * @param role - User role (e.g., "doctor", "club_admin", "parent")
 */
export function clearAllOnboardingData(role: string): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const prefix = `yuvoo_onboarding_${role}_`;
    const keysToRemove: string[] = [];

    // Find all keys for this role
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    // Remove all found keys
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    // Silently fail - localStorage may be disabled
    console.warn("Failed to clear all onboarding data from localStorage:", error);
  }
}
