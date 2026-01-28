/**
 * Send Lead Reminders Cron Job API Route
 *
 * Protected API route for sending reminder emails to clubs about pending leads.
 * Called by Vercel Cron (every hour or twice daily).
 *
 * Security: Protected by CRON_SECRET environment variable
 * Route: /api/cron/send-lead-reminders
 */

import { NextRequest, NextResponse } from "next/server";
import { sendReminders } from "@/modules/leads/leads.service";

/**
 * Verify cron secret from request headers
 */
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("[Cron] CRON_SECRET environment variable not set");
    return false;
  }

  if (!authHeader) {
    return false;
  }

  // Check if authorization header matches secret
  return authHeader === `Bearer ${cronSecret}`;
}

/**
 * POST handler for send lead reminders cron job
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    if (!verifyCronSecret(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Execute reminder job
    const result = await sendReminders();

    return NextResponse.json(
      {
        success: true,
        sent: result.sent,
        errors: result.errors,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Cron] Error in send-lead-reminders cron job:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
