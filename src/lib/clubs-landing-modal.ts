/**
 * Clubs Landing Modal Utilities
 *
 * Shared utilities for opening the contact modal from any section
 * on the clubs landing page (/pentru-cluburi).
 */

import { trackEvent, PostHogEvents, PostHogProperties } from "@/lib/analytics/tracking";

export const CLUBS_CONTACT_MODAL_ID = "clubsContactModal";

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
