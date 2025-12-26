/**
 * Doctors Landing Modal Utilities
 *
 * Shared utilities for opening the contact modal from any section
 * on the doctors landing page (/pentru-doctori).
 */

export const DOCTORS_CONTACT_MODAL_ID = "doctorsContactModal";

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
 * Opens the doctors contact modal using Bootstrap 5 API
 * @param location - Location identifier for tracking (e.g., "hero", "final")
 * @param _ctaText - CTA text for tracking (reserved for future use)
 */
export function openDoctorsContactModal(
  location: string,
  _ctaText: string = "Devino Expert Pediatric Verificat"
) {
  if (typeof window === "undefined") return;

  // Clean up any leftover styles first
  cleanupModalStyles();

  const modalElement = document.getElementById(DOCTORS_CONTACT_MODAL_ID);
  if (modalElement) {
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
