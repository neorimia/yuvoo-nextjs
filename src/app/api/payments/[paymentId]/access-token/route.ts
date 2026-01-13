/**
 * Payment Access Token API Route
 *
 * Returns access token for a payment if available.
 * Used by payment success page polling.
 */

import { NextRequest, NextResponse } from "next/server";
import { getPaymentById } from "@/modules/payments/payments.repository";
import { getReportAccessByPaymentId } from "@/modules/payments/payments.repository";

/**
 * GET /api/payments/[paymentId]/access-token
 *
 * Returns access token for payment if available.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await params;

    // Verify payment exists
    const payment = await getPaymentById(paymentId);

    if (!payment) {
      return NextResponse.json({ error: "Plata nu a fost găsită" }, { status: 404 });
    }

    // Check if payment is completed
    if (payment.status !== "completed") {
      return NextResponse.json({ error: "Plata nu este finalizată" }, { status: 400 });
    }

    // Get report access token
    const reportAccess = await getReportAccessByPaymentId(paymentId);

    if (!reportAccess || !reportAccess.accessToken) {
      // Access token not yet available (webhook may still be processing)
      return NextResponse.json({ accessToken: null, available: false });
    }

    // Access token available
    return NextResponse.json({
      accessToken: reportAccess.accessToken,
      available: true,
      quizId: reportAccess.quizId,
    });
  } catch (error) {
    console.error("[Payment Access Token API] Error:", error);
    return NextResponse.json({ error: "Eroare la verificarea accesului" }, { status: 500 });
  }
}
