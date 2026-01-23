/**
 * Lead Email Service
 *
 * Email notifications for lead management system.
 * Sends emails to clubs and parents for lead-related events.
 */

import { sendEmail, isValidEmail } from "@/lib/integrations/brevo/client";
import { renderEmail } from "../../../emails/utils/render-email";
import type { Club } from "@/modules/clubs/clubs.types";

/**
 * Send lead notification email to club
 * CRITICAL: NO parent contact info in email (name, email, phone)
 * Only shows: sport, child age, location
 */
export async function sendLeadNotificationEmail(params: {
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
    const { LeadNotificationEmail } = await import("../../../emails/lead-notification-email");

    const emailComponent = React.createElement(LeadNotificationEmail, {
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
      subject: `Un părinte caută ${params.sportName} pentru copil de ${params.childAge} ani, în ${params.locationName}`,
      htmlContent: html,
      textContent: text,
      tags: ["lead", "notification", "club"],
    });

    if (!result.success) {
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
