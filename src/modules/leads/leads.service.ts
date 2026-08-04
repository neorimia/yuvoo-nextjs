/**
 * Leads Service
 *
 * Business logic for lead management.
 * Handles lead creation, status updates, expiration, and notifications.
 */

import { leadsRepository } from "./leads.repository";
import { createLeadSchema } from "@/lib/validations/leads";
import type { Lead, CreateLeadInput, LeadStatus, LeadWithRelations } from "@/types/leads";
import { LeadStatus as LeadStatusEnum } from "@/types/leads";
import { clubsRepository } from "@/modules/clubs/clubs.repository";
import { suggestAlternativeClubs } from "@/modules/clubs/clubs.service";
import {
  sendLeadNotificationEmail,
  sendLeadAcceptedEmailToParent,
  sendLeadExpiredEmailToParent,
  sendLeadReminderEmail,
} from "@/modules/emails/lead-emails.service";
import { db } from "@/lib/db";
import { locations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

/**
 * Calculate expiration date (5 days from now)
 */
function calculateExpirationDate(): Date {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 5);
  return expiresAt;
}

/**
 * Create new lead
 * Validates input, creates lead with 5-day expiration, and sends notification to club
 */
export async function createLead(input: CreateLeadInput): Promise<Lead> {
  // Validate input
  const validated = createLeadSchema.parse(input);

  // Calculate expiration (5 days from now)
  const expiresAt = calculateExpirationDate();

  // Create lead
  const lead = await leadsRepository.create({
    ...validated,
    expiresAt,
  });

  // Send notification email to club (non-blocking)
  try {
    // Get club information
    const club = await clubsRepository.getClubById(validated.clubId);
    if (!club || !club.contact.email) {
      console.warn(`[Lead Service] Club ${validated.clubId} not found or has no email`);
    } else {
      // Get location name
      let locationName = club.location.city;
      if (validated.locationId) {
        try {
          const location = await db.query.locations.findFirst({
            where: eq(locations.id, validated.locationId),
          });
          if (location) {
            locationName = location.name;
          }
        } catch (error) {
          // Fallback to club location if location query fails
          console.warn(`[Lead Service] Failed to fetch location ${validated.locationId}:`, error);
        }
      }

      // Send email (non-blocking - don't wait for it)
      sendLeadNotificationEmail({
        clubEmail: club.contact.email,
        clubName: club.name,
        sportName: validated.sportType || club.sportName,
        childAge: validated.childAge,
        locationName: locationName,
        leadId: lead.id,
        parentName: validated.parentName,
        parentEmail: validated.parentEmail,
        parentPhone: validated.parentPhone ?? null,
      }).catch((error) => {
        // Log but don't throw - email failures shouldn't block lead creation
        console.error("[Lead Service] Failed to send lead notification email:", error);
      });
    }
  } catch (error) {
    // Log but don't throw - email failures shouldn't block lead creation
    console.error("[Lead Service] Error preparing lead notification email:", error);
  }

  // TODO: Schedule reminder (48h) - use cron job or queue (Phase 5)
  // TODO: Schedule expiration (5 days) - use cron job or queue (Phase 5)

  return lead;
}

/**
 * Get lead for club (parent contact is always visible — contact is free for clubs)
 */
export async function getLeadForClub(
  leadId: string,
  clubId: string
): Promise<LeadWithRelations | null> {
  const lead = await leadsRepository.findById(leadId);

  if (!lead) {
    return null;
  }

  // Verify ownership
  if (lead.clubId !== clubId) {
    throw new Error("Nu aveți acces la această cerere");
  }

  return lead as LeadWithRelations;
}

/**
 * Get leads for club dashboard (paginated)
 */
export async function getLeadsForClubDashboard(
  clubId: string,
  options?: {
    status?: LeadStatus;
    page?: number;
    pageSize?: number;
  }
): Promise<{
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
}> {
  const page = options?.page || 1;
  const pageSize = options?.pageSize || 20;
  const offset = (page - 1) * pageSize;

  const [leadsList, total] = await Promise.all([
    leadsRepository.findByClubId(clubId, {
      status: options?.status,
      limit: pageSize,
      offset,
    }),
    leadsRepository.countByClubId(clubId, options?.status),
  ]);

  return {
    leads: leadsList,
    total,
    page,
    pageSize,
  };
}

/**
 * Get lead status for parent (without revealing club contact)
 */
export async function getParentLeadStatus(leadId: string): Promise<Lead | null> {
  const lead = await leadsRepository.findById(leadId);
  return lead;
}

/**
 * Expire lead (mark as expired, notify parent with alternatives)
 * Called by cron job (Phase 5)
 */
export async function expireLead(leadId: string): Promise<Lead> {
  const lead = await leadsRepository.findById(leadId);

  if (!lead) {
    throw new Error("Lead not found");
  }

  if (lead.status === LeadStatusEnum.EXPIRAT || lead.status === LeadStatusEnum.ACCEPTAT) {
    // Already expired or accepted
    return lead;
  }

  // Update status to expired
  const expiredLead = await leadsRepository.updateStatus(leadId, LeadStatusEnum.EXPIRAT);

  // Get club information for email
  const club = await clubsRepository.getClubById(lead.clubId);
  const clubName = club?.name || "Club";

  // Find alternative clubs
  const alternativeClubs = await suggestAlternativeClubs({
    sportId: lead.sportType || null,
    locationId: lead.locationId || null,
    excludeClubId: lead.clubId,
    limit: 5,
  });

  // Send email to parent with alternative clubs (non-blocking)
  try {
    await sendLeadExpiredEmailToParent({
      parentEmail: lead.parentEmail,
      parentName: lead.parentName,
      clubName: clubName,
      sportName: lead.sportType || club?.sportName || "sport",
      alternativeClubs: alternativeClubs,
    });
  } catch (error) {
    // Log but don't throw - email failures shouldn't block expiration
    console.error("[Lead Service] Failed to send lead expired email:", error);
  }

  // Track lead expiration (non-blocking)
  try {
    await trackEventServer(PostHogEvents.LEAD_EXPIRED, {
      distinctId: "cron-job",
      [PostHogProperties.LEAD_ID]: leadId,
      [PostHogProperties.CLUB_ID]: lead.clubId,
      [PostHogProperties.LEAD_STATUS]: LeadStatusEnum.EXPIRAT,
    });
  } catch (error) {
    // Log but don't throw - tracking failures shouldn't block expiration
    console.error("[Lead Service] Failed to track lead expiration:", error);
  }

  return expiredLead;
}

/**
 * Send reminder to club (48h after lead creation)
 * Called by cron job (Phase 5)
 */
export async function sendReminderToClub(leadId: string): Promise<void> {
  const lead = await leadsRepository.findById(leadId);

  if (!lead) {
    throw new Error("Lead not found");
  }

  if (lead.status !== LeadStatusEnum.NOU) {
    // Only send reminder for new leads
    return;
  }

  // Get club information
  const club = await clubsRepository.getClubById(lead.clubId);
  if (!club || !club.contact.email) {
    console.warn(`[Lead Service] Club ${lead.clubId} not found or has no email for reminder`);
    return;
  }

  // Get location name
  let locationName = club.location.city;
  if (lead.locationId) {
    try {
      const location = await db.query.locations.findFirst({
        where: eq(locations.id, lead.locationId),
      });
      if (location) {
        locationName = location.name;
      }
    } catch (error) {
      // Fallback to club location if location query fails
      console.warn(
        `[Lead Service] Failed to fetch location ${lead.locationId} for reminder:`,
        error
      );
    }
  }

  // Update status to 'in_asteptare' (optional - can keep as 'nou')
  await leadsRepository.updateStatus(leadId, LeadStatusEnum.IN_ASTEPTARE);

  // Send reminder email to club (non-blocking)
  try {
    await sendLeadReminderEmail({
      clubEmail: club.contact.email,
      clubName: club.name,
      sportName: lead.sportType || club.sportName,
      childAge: lead.childAge,
      locationName: locationName,
      leadId: lead.id,
    });
  } catch (error) {
    // Log but don't throw - email failures shouldn't block reminder
    console.error("[Lead Service] Failed to send lead reminder email:", error);
  }
}

/**
 * Accept lead (unlock contact info after payment)
 */
export async function acceptLead(
  leadId: string,
  clubId: string,
  paymentId: string,
  paymentMethod: Lead["paymentMethod"]
): Promise<Lead> {
  const lead = await leadsRepository.findById(leadId);

  if (!lead) {
    throw new Error("Cererea nu a fost găsită");
  }

  // Verify ownership
  if (lead.clubId !== clubId) {
    throw new Error("Nu aveți acces la această cerere");
  }

  // Accept lead
  const acceptedLead = await leadsRepository.acceptLead(leadId, paymentId, paymentMethod);

  // Send notification email to parent (non-blocking)
  try {
    // Get club information
    const club = await clubsRepository.getClubById(clubId);
    if (!club) {
      console.warn(`[Lead Service] Club ${clubId} not found for accepted lead`);
    } else {
      // Send email (non-blocking)
      sendLeadAcceptedEmailToParent({
        parentEmail: lead.parentEmail,
        parentName: lead.parentName,
        clubName: club.name,
        clubEmail: club.contact.email,
        clubPhone: club.contact.phone,
        sportName: lead.sportType || club.sportName,
      }).catch((error) => {
        // Log but don't throw - email failures shouldn't block lead acceptance
        console.error("[Lead Service] Failed to send lead accepted email:", error);
      });
    }
  } catch (error) {
    // Log but don't throw - email failures shouldn't block lead acceptance
    console.error("[Lead Service] Error preparing lead accepted email:", error);
  }

  return acceptedLead;
}

/**
 * Expire all expired leads (batch operation for cron job)
 * Finds leads where expiresAt < now AND status is 'nou' or 'in_asteptare'
 * Marks them as expired and sends emails to parents
 */
export async function expireLeads(): Promise<{
  expired: number;
  errors: number;
}> {
  const expiredLeads = await leadsRepository.findExpiredLeads();

  let expired = 0;
  let errors = 0;

  for (const lead of expiredLeads) {
    try {
      await expireLead(lead.id);
      expired++;
    } catch (error) {
      console.error(`[Lead Service] Error expiring lead ${lead.id}:`, error);
      errors++;
    }
  }

  return { expired, errors };
}

/**
 * Send reminders for leads needing reminder (batch operation for cron job)
 * Finds leads created 48h ago with status 'nou' and sends reminder emails
 */
export async function sendReminders(): Promise<{
  sent: number;
  errors: number;
}> {
  const leadsNeedingReminder = await leadsRepository.findLeadsNeedingReminder();

  let sent = 0;
  let errors = 0;

  for (const lead of leadsNeedingReminder) {
    try {
      await sendReminderToClub(lead.id);
      sent++;
    } catch (error) {
      console.error(`[Lead Service] Error sending reminder for lead ${lead.id}:`, error);
      errors++;
    }
  }

  return { sent, errors };
}

export const leadsService = {
  createLead,
  getLeadForClub,
  getLeadsForClubDashboard,
  getParentLeadStatus,
  expireLead,
  expireLeads,
  sendReminderToClub,
  sendReminders,
  acceptLead,
};
