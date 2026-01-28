/**
 * Leads Server Actions
 *
 * Server Actions for lead submission and management.
 * All error messages are in Romanian as per project requirements.
 */

"use server";

import { headers } from "next/headers";
import { getSession } from "@/lib/auth/session";
import { createLead } from "@/modules/leads/leads.service";
import { createLeadSchema } from "@/lib/validations/leads";
import type { CreateLeadInput } from "@/types/leads";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { rateLimit, getClientIdentifierFromHeaders, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";

/**
 * Get client IP address from headers
 */
function getClientIp(headersList: Headers): string | null {
  // Try various headers that might contain the IP
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = headersList.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return null;
}

/**
 * Submit lead (parent expresses interest in club)
 * Public action - no authentication required
 */
export async function submitLeadAction(
  input: unknown
): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    // Rate limiting: prevent spam lead submissions
    try {
      const headersList = await headers();
      const session = await getSession();
      const identifier = getClientIdentifierFromHeaders(session?.dbUser?.id, headersList);
      const rateLimitResult = await rateLimit(
        `submit-lead:${identifier}`,
        RATE_LIMIT_CONFIGS.CREATE_BOOKING // Use same rate limit as bookings (3 per hour)
      );

      if (!rateLimitResult.success) {
        return {
          success: false,
          error: "Ai depășit limita de cereri. Te rugăm să încerci din nou mai târziu.",
        };
      }
    } catch (rateLimitError) {
      // Don't block submission if rate limiting fails (log and continue)
      console.error("[RateLimit] Error checking rate limit for lead submission:", rateLimitError);
    }

    // Validate input
    const validated = createLeadSchema.parse(input);

    // Get IP address for tracking
    const headersList = await headers();
    const ipAddress = getClientIp(headersList);

    // Get session (optional - parent can be anonymous)
    const session = await getSession();

    // Prepare lead input
    const leadInput: CreateLeadInput = {
      ...validated,
      parentId: session?.dbUser?.id || null,
      ipAddress: ipAddress || null,
    };

    // Create lead
    const lead = await createLead(leadInput);

    // Track lead submission event (non-blocking)
    try {
      const distinctId = session?.user.id || lead.parentEmail || "anonymous";
      await trackEventServer(PostHogEvents.LEAD_SUBMITTED, {
        distinctId,
        [PostHogProperties.LEAD_ID]: lead.id,
        [PostHogProperties.CLUB_ID]: validated.clubId,
        ...(validated.sportType && { [PostHogProperties.CLUB_SPORT]: validated.sportType }),
        ...(validated.locationId && { [PostHogProperties.CLUB_CITY]: validated.locationId }),
        [PostHogProperties.CHILD_AGE]: validated.childAge,
      });
    } catch (trackingError) {
      // Don't fail submission if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking lead submission:", trackingError);
      }
    }

    return {
      success: true,
      leadId: lead.id,
    };
  } catch (error) {
    console.error("Error submitting lead:", error);

    // Handle Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const zodError = error as {
        issues: Array<{ message: string; path?: Array<string | number> }>;
      };
      const firstError = zodError.issues[0];
      return {
        success: false,
        error: firstError?.message || "Date invalide",
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la trimiterea cererii",
    };
  }
}
