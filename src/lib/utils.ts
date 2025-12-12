import { clsx, type ClassValue } from "clsx";

/**
 * Utility function to conditionally join class names.
 * Uses clsx for conditional class name joining (Bootstrap-compatible).
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Generate SEO-friendly slug from text
 * Handles Romanian diacritics and special characters
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
    .substring(0, 100); // Limit length
}

/**
 * Normalize Romanian phone number to format: +40XXXXXXXXX
 * Removes spaces, hyphens, and other formatting characters
 */
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return phone;

  // Remove all non-digit characters except the leading +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Handle different input formats
  if (cleaned.startsWith("0040")) {
    return "+40" + cleaned.slice(4);
  }
  if (cleaned.startsWith("40") && !cleaned.startsWith("+40")) {
    return "+" + cleaned;
  }
  if (cleaned.startsWith("+40")) {
    return cleaned; // Already in correct format
  }
  if (cleaned.startsWith("+")) {
    return cleaned; // Keep as is if it starts with +
  }
  if (cleaned.length === 9 && /^\d{9}$/.test(cleaned)) {
    // 9 digits without country code - assume Romanian mobile
    return "+40" + cleaned;
  }

  // Default: prepend + if not present
  return cleaned.startsWith("+") ? cleaned : "+" + cleaned;
}
