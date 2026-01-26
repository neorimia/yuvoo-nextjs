/**
 * Guest Lead Payment Server Actions
 *
 * Server Actions for guest payment flow (clubs without accounts).
 * No authentication required - public access.
 */

"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { createGuestLeadPaymentIntent } from "@/modules/payments/lead-payment.service";
import { leadsRepository } from "@/modules/leads/leads.repository";
import { clubsRepository } from "@/modules/clubs/clubs.repository";
import { leadPaymentRepository } from "@/modules/payments/lead-payment.repository";
import { LeadPaymentStatus } from "@/types/leads";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { rateLimit, getClientIdentifierFromHeaders, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";

/**
 * Email validation schema
 */
const emailSchema = z.string().email("Adresa de email nu este validă.");

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
  try {
    // Rate limiting: prevent abuse of guest payment flow
    const headersList = await headers();
    const identifier = getClientIdentifierFromHeaders(undefined, headersList);
    const rateLimitResult = await rateLimit(
      `guest-payment:${identifier}:${guestEmail}`,
      RATE_LIMIT_CONFIGS.GUEST_PAYMENT
    );

    if (!rateLimitResult.success) {
      return {
        success: false,
        error: `Prea multe încercări. Te rugăm să încerci din nou după ${rateLimitResult.resetTime || "un timp"}.`,
      };
    }

    // Validate email
    const validatedEmail = emailSchema.parse(guestEmail);

    // Fetch lead
    const lead = await leadsRepository.findById(leadId);
    if (!lead) {
      return {
        success: false,
        error: "Cererea nu a fost găsită.",
      };
    }

    // Check if lead is expired
    if (new Date(lead.expiresAt) < new Date()) {
      return {
        success: false,
        error: "Această cerere a expirat. Cererile expiră după 5 zile.",
      };
    }

    // Check if lead is already paid (prevent duplicate payments)
    if (lead.paymentId) {
      // Check if payment succeeded
      const existingPayment = await leadPaymentRepository.findById(lead.paymentId);
      if (existingPayment && existingPayment.status === LeadPaymentStatus.SUCCEEDED) {
        return {
          success: false,
          error: "Această cerere a fost deja deblocată.",
        };
      }
    }

    // Fetch club to verify it exists
    const club = await clubsRepository.getClubById(lead.clubId);
    if (!club) {
      return {
        success: false,
        error: "Clubul nu a fost găsit.",
      };
    }

    // Extract IP address for tracking
    const forwarded = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const cfConnectingIp = headersList.get("cf-connecting-ip");
    const clientIp = forwarded?.split(",")[0].trim() || cfConnectingIp || realIp || "unknown";

    // Create guest payment intent
    const { clientSecret } = await createGuestLeadPaymentIntent(
      leadId,
      lead.clubId,
      validatedEmail
    );

    // Track payment initiation (use guest email as distinct ID, include IP for fraud prevention)
    await trackEventServer(PostHogEvents.LEAD_PAYMENT_INITIATED, {
      distinctId: `guest-${validatedEmail}`,
      [PostHogProperties.LEAD_ID]: leadId,
      [PostHogProperties.CLUB_ID]: lead.clubId,
      [PostHogProperties.LEAD_PAYMENT_METHOD]: "pay_per_lead",
      [PostHogProperties.PAYMENT_AMOUNT]: 300, // 3€ in cents
      isGuestPayment: true,
      clientIp, // Track IP address for fraud prevention
      rateLimitRemaining: rateLimitResult.remaining,
    });

    return {
      success: true,
      clientSecret,
    };
  } catch (error) {
    console.error("Error creating guest lead payment:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Date invalide.",
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la crearea plății.",
    };
  }
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
