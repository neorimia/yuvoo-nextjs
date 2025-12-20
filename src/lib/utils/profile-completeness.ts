/**
 * Profile Completeness Utilities
 *
 * Functions to calculate profile completeness for different user types.
 */

export interface ProfileCompletenessResult {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
}

/**
 * Calculate parent profile completeness
 *
 * Checks for:
 * - firstName
 * - lastName
 * - phone
 * - email (always present from auth)
 */
export function calculateParentProfileCompleteness(user: {
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  email?: string | null;
}): ProfileCompletenessResult {
  const fields = [
    { key: "firstName", label: "Prenume", value: user.firstName },
    { key: "lastName", label: "Nume", value: user.lastName },
    { key: "phone", label: "Telefon", value: user.phone },
    { key: "email", label: "Email", value: user.email },
  ];

  const completedFields = fields.filter((field) => field.value && field.value.trim() !== "").length;
  const totalFields = fields.length;
  const percentage = Math.round((completedFields / totalFields) * 100);
  const missingFields = fields
    .filter((field) => !field.value || field.value.trim() === "")
    .map((field) => field.label);

  return {
    percentage,
    completedFields,
    totalFields,
    missingFields,
  };
}
