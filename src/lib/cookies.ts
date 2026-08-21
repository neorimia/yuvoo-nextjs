/**
 * Cookie Management Utilities
 *
 * Functions for managing cookie consent preferences in a GDPR-compliant way.
 */

export type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  thirdParty: boolean;
};

const COOKIE_CONSENT_KEY = "yuvoo_cookie_consent";
const COOKIE_PREFERENCES_KEY = "yuvoo_cookie_preferences";

/**
 * Get cookie consent status
 */
export function getCookieConsent(): boolean | null {
  if (typeof window === "undefined") return null;

  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (consent === null) return null;

  return consent === "true";
}

/**
 * Set cookie consent status
 */
export function setCookieConsent(consented: boolean): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(COOKIE_CONSENT_KEY, consented.toString());

  // Set a cookie as well for server-side access if needed
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1); // 1 year expiration

  // Add Secure flag in production (HTTPS only)
  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_KEY}=${consented}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secureFlag}`;
}

/**
 * Get cookie preferences
 */
export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const preferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!preferences) return null;

  try {
    return JSON.parse(preferences) as CookiePreferences;
  } catch {
    return null;
  }
}

/**
 * Set cookie preferences
 */
export function setCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));

  // Set a cookie as well for server-side access if needed
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1); // 1 year expiration

  // Add Secure flag in production (HTTPS only)
  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `${COOKIE_PREFERENCES_KEY}=${encodeURIComponent(JSON.stringify(preferences))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secureFlag}`;

  window.dispatchEvent(new Event("yuvoo-cookie-consent"));
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  setCookieConsent(true);
  setCookiePreferences({
    essential: true,
    analytics: true,
    thirdParty: true,
  });
}

/**
 * Reject all non-essential cookies
 */
export function rejectNonEssentialCookies(): void {
  setCookieConsent(true);
  setCookiePreferences({
    essential: true, // Essential cookies are always required
    analytics: false,
    thirdParty: false,
  });
}

/**
 * Check if user has given consent
 */
export function hasConsented(): boolean {
  return getCookieConsent() === true;
}
