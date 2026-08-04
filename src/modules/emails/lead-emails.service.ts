/**
 * Lead Email Service
 *
 * Email notifications for lead management system.
 * Sends emails to clubs and parents for lead-related events.
 */

import { sendEmail, isValidEmail } from "@/lib/integrations/brevo/client";
import { renderEmail } from "../../../emails/utils/render-email";
import { generateEmailSubjectWithVariant } from "@/lib/analytics/feature-flags-server";
import { FeatureFlags } from "@/lib/analytics/feature-flags";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import type { Club } from "@/modules/clubs/clubs.types";

/**
 * Send lead notification email to club
 * Includes parent contact info — contact between parents and clubs is free
 */
export async function sendLeadNotificationEmail(params: {
  clubEmail: string;
  clubName: string;
  sportName: string;
  childAge: number;
  locationName: string;
  leadId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string | null;
}): Promise<void> {
  try {
    // Validate email
    if (!isValidEmail(params.clubEmail)) {
      console.error("[Lead Email] Invalid club email:", params.clubEmail);
      return;
    }

    // Render React Email component
    const React = await import("react");
    const { LeadNotificationEmail } = await import("../../../emails/lead-notification-email");

    const emailComponent = React.createElement(LeadNotificationEmail, {
      clubName: params.clubName,
      sportName: params.sportName,
      childAge: params.childAge,
      locationName: params.locationName,
      leadId: params.leadId,
      parentName: params.parentName,
      parentEmail: params.parentEmail,
      parentPhone: params.parentPhone,
    });

    const { html, text } = await renderEmail(emailComponent);

    // Generate subject line with A/B testing support
    // Use club email as distinct ID for consistent variant assignment
    const subjectVariants = {
      current: `🎯 Părinte pre-calificat caută ${params.sportName} în ${params.locationName}`,
      variant_a: `Nou: Cerere ${params.sportName} pentru copil de ${params.childAge} ani`,
      variant_b: `Cerere pre-calificată - ${params.sportName} în ${params.locationName}`,
    };

    const subject = await generateEmailSubjectWithVariant({
      flagName: FeatureFlags.LEAD_NOTIFICATION_EMAIL_SUBJECT_VARIANT,
      distinctId: params.clubEmail,
      sportName: params.sportName,
      locationName: params.locationName,
      childAge: params.childAge,
      variants: subjectVariants,
    });

    // Determine which variant was used for tracking
    let variantValue = "current";
    if (subject === subjectVariants.variant_a) {
      variantValue = "variant_a";
    } else if (subject === subjectVariants.variant_b) {
      variantValue = "variant_b";
    }

    // Send email
    const result = await sendEmail({
      to: params.clubEmail,
      subject,
      htmlContent: html,
      textContent: text,
      tags: ["lead", "notification", "club"],
    });

    if (result.success) {
      // Track email variant sent event
      await trackEventServer(PostHogEvents.EMAIL_VARIANT_SENT, {
        distinctId: params.clubEmail,
        [PostHogProperties.VARIANT_NAME]: FeatureFlags.LEAD_NOTIFICATION_EMAIL_SUBJECT_VARIANT,
        [PostHogProperties.VARIANT_VALUE]: variantValue,
        [PostHogProperties.VARIANT_LOCATION]: "email",
        email_type: "lead_notification",
        sport_name: params.sportName,
        location_name: params.locationName,
        child_age: params.childAge,
      });
    } else {
      console.error("[Lead Email] Failed to send lead notification:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block lead creation
    console.error("[Lead Email] Error sending lead notification email:", error);
  }
}

/**
 * Send lead reminder email to club (48h after creation)
 */
export async function sendLeadReminderEmail(params: {
  clubEmail: string;
  clubName: string;
  sportName: string;
  childAge: number;
  locationName: string;
  leadId: string;
}): Promise<void> {
  try {
    // Validate email
    if (!isValidEmail(params.clubEmail)) {
      console.error("[Lead Email] Invalid club email:", params.clubEmail);
      return;
    }

    // Render React Email component
    const React = await import("react");
    const { LeadReminderEmail } = await import("../../../emails/lead-reminder-email");

    const emailComponent = React.createElement(LeadReminderEmail, {
      clubName: params.clubName,
      sportName: params.sportName,
      childAge: params.childAge,
      locationName: params.locationName,
      leadId: params.leadId,
    });

    const { html, text } = await renderEmail(emailComponent);

    // Send email
    const result = await sendEmail({
      to: params.clubEmail,
      subject: "Ai o cerere în așteptare",
      htmlContent: html,
      textContent: text,
      tags: ["lead", "reminder", "club"],
    });

    if (!result.success) {
      console.error("[Lead Email] Failed to send lead reminder:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block operations
    console.error("[Lead Email] Error sending lead reminder email:", error);
  }
}

/**
 * Send lead expired email to parent
 * Includes suggestions for alternative clubs
 */
export async function sendLeadExpiredEmailToParent(params: {
  parentEmail: string;
  parentName: string;
  clubName: string;
  sportName: string;
  alternativeClubs: Club[];
}): Promise<void> {
  try {
    // Validate email
    if (!isValidEmail(params.parentEmail)) {
      console.error("[Lead Email] Invalid parent email:", params.parentEmail);
      return;
    }

    // Render React Email component
    const React = await import("react");
    const { LeadExpiredEmail } = await import("../../../emails/lead-expired-email");

    const emailComponent = React.createElement(LeadExpiredEmail, {
      parentName: params.parentName,
      clubName: params.clubName,
      sportName: params.sportName,
      alternativeClubs: params.alternativeClubs,
    });

    const { html, text } = await renderEmail(emailComponent);

    // Send email
    const result = await sendEmail({
      to: params.parentEmail,
      subject: "Îți recomandăm alte cluburi similare",
      htmlContent: html,
      textContent: text,
      tags: ["lead", "expired", "parent"],
    });

    if (!result.success) {
      console.error("[Lead Email] Failed to send lead expired email:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block operations
    console.error("[Lead Email] Error sending lead expired email:", error);
  }
}

/**
 * Send lead accepted email to parent
 * Includes club contact information
 */
export async function sendLeadAcceptedEmailToParent(params: {
  parentEmail: string;
  parentName: string;
  clubName: string;
  clubEmail?: string;
  clubPhone?: string;
  sportName: string;
}): Promise<void> {
  try {
    // Validate email
    if (!isValidEmail(params.parentEmail)) {
      console.error("[Lead Email] Invalid parent email:", params.parentEmail);
      return;
    }

    // Render React Email component
    const React = await import("react");
    const { LeadAcceptedEmail } = await import("../../../emails/lead-accepted-email");

    const emailComponent = React.createElement(LeadAcceptedEmail, {
      parentName: params.parentName,
      clubName: params.clubName,
      clubEmail: params.clubEmail,
      clubPhone: params.clubPhone,
      sportName: params.sportName,
    });

    const { html, text } = await renderEmail(emailComponent);

    // Send email
    const result = await sendEmail({
      to: params.parentEmail,
      subject: `${params.clubName} a acceptat cererea ta`,
      htmlContent: html,
      textContent: text,
      tags: ["lead", "accepted", "parent"],
    });

    if (!result.success) {
      console.error("[Lead Email] Failed to send lead accepted email:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block operations
    console.error("[Lead Email] Error sending lead accepted email:", error);
  }
}

/**
 * Send guest payment success email with parent information
 * Sends parent contact details to guest email after successful payment
 */
export async function sendGuestPaymentSuccessEmail(params: {
  guestEmail: string;
  leadId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string | null;
  childAge: number;
  message: string | null;
  sportType: string;
  clubName: string;
}): Promise<void> {
  try {
    // Validate email
    if (!isValidEmail(params.guestEmail)) {
      console.error("[Lead Email] Invalid guest email:", params.guestEmail);
      return;
    }

    // Render React Email component
    const React = await import("react");
    const { GuestPaymentSuccessEmail } =
      await import("../../../emails/guest-payment-success-email");

    const emailComponent = React.createElement(GuestPaymentSuccessEmail, {
      guestEmail: params.guestEmail,
      leadId: params.leadId,
      parentName: params.parentName,
      parentEmail: params.parentEmail,
      parentPhone: params.parentPhone,
      childAge: params.childAge,
      message: params.message,
      sportType: params.sportType,
      clubName: params.clubName,
    });

    const { html, text } = await renderEmail(emailComponent);

    // Send email
    const result = await sendEmail({
      to: params.guestEmail,
      subject: `Informații părinte - Cerere ${params.sportType}`,
      htmlContent: html,
      textContent: text,
      tags: ["lead", "guest-payment", "success"],
    });

    if (!result.success) {
      console.error("[Lead Email] Failed to send guest payment success email:", result.error);
    }
  } catch (error) {
    // Don't throw - email failures shouldn't block operations
    console.error("[Lead Email] Error sending guest payment success email:", error);
  }
}
