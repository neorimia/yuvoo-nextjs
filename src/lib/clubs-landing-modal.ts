/**
 * Clubs Landing Modal & Contact Utilities
 *
 * - CLUBS_CONTACT_MODAL_ID: used by page that renders ClubsContactModal (if kept).
 * - openClubsPremiumMailto: opens default mail client with preconfigured email/subject for Premium enquiries.
 */

import { trackEvent, PostHogEvents, PostHogProperties } from "@/lib/analytics/tracking";

export const CLUBS_CONTACT_MODAL_ID = "clubsContactModal";

/** Email for Premium / club contact enquiries */
export const CLUBS_PREMIUM_CONTACT_EMAIL = "contact@yuvoo.ro";

/** Default subject for Premium contact mailto */
export const CLUBS_PREMIUM_MAILTO_SUBJECT = "Informații despre abonament Premium - Yuvoo";

/** Optional default body for Premium mailto */
const CLUBS_PREMIUM_MAILTO_BODY = [
  "Bună ziua,",
  "",
  "Sunt interesat de abonamentul Premium pentru clubul meu.",
  "",
  "Nume club:",
  "Sport oferit:",
  "Locație:",
  "",
  "Mulțumesc,",
].join("\n");

/**
 * Returns mailto URL for Premium contact (preconfigured email and subject).
 * @param body - Optional body text (default: short template)
 */
export function getClubsPremiumMailtoUrl(body?: string): string {
  const subject = encodeURIComponent(CLUBS_PREMIUM_MAILTO_SUBJECT);
  const bodyEncoded = encodeURIComponent(body ?? CLUBS_PREMIUM_MAILTO_BODY);
  return `mailto:${CLUBS_PREMIUM_CONTACT_EMAIL}?subject=${subject}&body=${bodyEncoded}`;
}

/**
 * Opens default mail client with preconfigured Premium contact email/subject and tracks the event.
 * Use this instead of opening the contact modal for Premium enquiries.
 */
export function openClubsPremiumMailto(location: string, ctaText: string): void {
  if (typeof window === "undefined") return;

  trackEvent(PostHogEvents.CLUBS_CONTACT_FORM_SUBMITTED, {
    [PostHogProperties.VARIANT_LOCATION]: location,
    [PostHogProperties.CTA_TEXT]: ctaText,
    formType: "premium_mailto",
  });

  trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
    location,
    cta_text: ctaText,
  });

  window.location.href = getClubsPremiumMailtoUrl();
}

/**
 * Cleans up any leftover modal styles and backdrops
 * Should be called if scroll is blocked after modal closes
 */
export function cleanupModalStyles() {
  if (typeof window === "undefined") return;

  // Remove backdrop if it still exists
  const backdrop = document.querySelector(".modal-backdrop");
  if (backdrop) {
    backdrop.remove();
  }

  // Remove modal-open class from body
  document.body.classList.remove("modal-open");

  // Reset body styles that Bootstrap adds to prevent scrolling
  document.body.style.paddingRight = "";
  document.body.style.overflow = "";
  document.body.style.overflowX = "";
  document.body.style.overflowY = "";
}

/**
 * Opens the clubs contact modal using Bootstrap 5 API
 * @param location - Location identifier for tracking (e.g., "hero", "solution", "final")
 * @param ctaText - CTA text for tracking
 */
export function openClubsContactModal(
  location: string,
  ctaText: string = "Devino Founding Club Gratuit"
) {
  if (typeof window === "undefined") return;

  // Track modal open event
  trackEvent(PostHogEvents.CLUBS_CONTACT_MODAL_OPENED, {
    [PostHogProperties.VARIANT_LOCATION]: location,
    [PostHogProperties.CTA_TEXT]: ctaText,
  });

  // Clean up any leftover styles first
  cleanupModalStyles();

  const modalElement = document.getElementById(CLUBS_CONTACT_MODAL_ID);
  if (modalElement) {
    // Store location in data attribute for form submission tracking
    modalElement.setAttribute("data-location", location);
    modalElement.setAttribute("data-cta-text", ctaText);

    // Use Bootstrap 5 modal API
    const bootstrap = (window as Window & typeof globalThis).bootstrap;
    if (bootstrap) {
      // Get existing instance or create new one
      let modal = bootstrap.Modal.getInstance(modalElement);
      if (!modal) {
        modal = new bootstrap.Modal(modalElement, {
          backdrop: true,
          keyboard: true,
          focus: true,
        });
      }
      modal.show();
    } else {
      console.warn("Bootstrap not found. Modal may not work correctly.");
    }
  }
}
