/**
 * Guest Lead Payment Server Actions
 *
 * Server Actions for guest payment flow (clubs without accounts).
 * No authentication required - public access.
 */

"use server";

import { leadsRepository } from "@/modules/leads/leads.repository";
import { clubsRepository } from "@/modules/clubs/clubs.repository";
import { leadPaymentRepository } from "@/modules/payments/lead-payment.repository";
import { LeadPaymentStatus } from "@/types/leads";

/**
 * Create guest lead payment intent
 * Creates Stripe payment intent for 3€ for clubs without accounts
 * @param leadId - Lead ID to unlock
 * @param guestEmail - Email address of the guest (club representative)
 */
export async function createGuestLeadPaymentAction(
  leadId: string,
  guestEmail: string
): Promise<{ success: boolean; clientSecret?: string; error?: string }> {
  void leadId;
  void guestEmail;
  return {
    success: false,
    error:
      "Contactul cu părinții este gratuit. Nu mai este nevoie de plată pentru a vedea datele de contact.",
  };
}

/**
 * Get guest payment success data
 * Retrieves parent information for successful guest payment
 * @param leadId - Lead ID
 * @param paymentIntentId - Stripe payment intent ID (for validation)
 */
export async function getGuestPaymentSuccessData(
  leadId: string,
  paymentIntentId: string
): Promise<{
  success: boolean;
  lead?: {
    id: string;
    parentName: string;
    parentEmail: string;
    parentPhone: string | null;
    childAge: number;
    message: string | null;
    sportType: string | null;
  };
  club?: {
    id: string;
    name: string;
  };
  error?: string;
}> {
  try {
    // Find payment by Stripe payment intent ID
    const payment = await leadPaymentRepository.findByStripePaymentIntentId(paymentIntentId);
    if (!payment) {
      return {
        success: false,
        error: "Plata nu a fost găsită.",
      };
    }

    // Verify payment is for this lead
    if (payment.leadId !== leadId) {
      return {
        success: false,
        error: "Plata nu corespunde acestei cereri.",
      };
    }

    // Verify payment is a guest payment
    if (!payment.isGuestPayment) {
      return {
        success: false,
        error: "Această plată nu este o plată pentru oaspeți.",
      };
    }

    // Verify payment succeeded
    if (payment.status !== LeadPaymentStatus.SUCCEEDED) {
      return {
        success: false,
        error: "Plata nu a fost finalizată cu succes.",
      };
    }

    // Fetch lead
    const lead = await leadsRepository.findById(leadId);
    if (!lead) {
      return {
        success: false,
        error: "Cererea nu a fost găsită.",
      };
    }

    // Fetch club
    const club = await clubsRepository.getClubById(lead.clubId);
    if (!club) {
      return {
        success: false,
        error: "Clubul nu a fost găsit.",
      };
    }

    return {
      success: true,
      lead: {
        id: lead.id,
        parentName: lead.parentName,
        parentEmail: lead.parentEmail,
        parentPhone: lead.parentPhone,
        childAge: lead.childAge,
        message: lead.message,
        sportType: lead.sportType,
      },
      club: {
        id: club.id,
        name: club.name,
      },
    };
  } catch (error) {
    console.error("Error getting guest payment success data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la obținerea datelor.",
    };
  }
}
