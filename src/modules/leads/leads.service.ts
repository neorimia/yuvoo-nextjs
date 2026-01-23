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
import { premiumClubService } from "@/modules/clubs/premium-club.service";
import { clubsRepository } from "@/modules/clubs/clubs.repository";
import {
  sendLeadNotificationEmail,
  sendLeadAcceptedEmailToParent,
} from "@/modules/emails/lead-emails.service";
import { db } from "@/lib/db";
import { locations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
 * Get lead for club (hides contact info if not paid/premium)
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

  // Check if contact info should be revealed
  const isPremium = await premiumClubService.checkIsPremium(clubId);
  const isPaid = lead.paymentId !== null;

  if (!isPremium && !isPaid) {
    // Hide contact info
    return {
      ...lead,
      parentName: "[Ascuns]",
      parentEmail: "[Ascuns]",
      parentPhone: null,
    } as LeadWithRelations;
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

  // TODO: Send email to parent with alternative clubs (Phase 5)
  // await sendLeadExpiredEmailToParent({
  //   parentEmail: lead.parentEmail,
  //   parentName: lead.parentName,
  //   clubName: lead.club?.name,
  //   alternativeClubs: await suggestAlternativeClubs(...),
  // });

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

  // Update status to 'in_asteptare' (optional - can keep as 'nou')
  await leadsRepository.updateStatus(leadId, LeadStatusEnum.IN_ASTEPTARE);

  // TODO: Send reminder email to club (Phase 4)
  // await sendLeadReminderEmail({
  //   clubId: lead.clubId,
  //   leadId: lead.id,
  //   sport: lead.sportType,
  //   childAge: lead.childAge,
  //   location: lead.locationId,
  // });
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

export const leadsService = {
  createLead,
  getLeadForClub,
  getLeadsForClubDashboard,
  getParentLeadStatus,
  expireLead,
  sendReminderToClub,
  acceptLead,
};
