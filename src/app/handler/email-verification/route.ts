/**
 * Stack Auth Email Verification Handler
 *
 * This route handles email verification callbacks from Stack Auth.
 * Stack Auth sends users to /handler/email-verification?code=<verification-code>
 * after they click the verification link in their email.
 *
 * Route: /handler/email-verification?code=<code>
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stackServerApp } from "@/lib/auth/stack";
import { routes } from "@/lib/routes";

export async function GET(request: NextRequest) {
  // Make route dynamic - this route uses searchParams and cannot be prerendered
  await cookies();
  try {
    // Extract verification code from query parameters
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      // No code provided - redirect to email confirmation page with error
      const baseUrl = request.nextUrl.origin;
      const redirectUrl = new URL(routes.emailConfirmation, baseUrl);
      redirectUrl.searchParams.set("error", "missing_code");
      return NextResponse.redirect(redirectUrl);
    }

    // Verify the email using Stack Auth
    try {
      const result = await stackServerApp.verifyEmail(code);

      if (result && "status" in result && result.status === "ok") {
        // Email verified successfully - redirect to email confirmation page with success message
        // Use absolute URL construction to ensure correct base URL
        const baseUrl = request.nextUrl.origin;
        const redirectUrl = new URL(routes.emailConfirmation, baseUrl);
        redirectUrl.searchParams.set("verified", "true");
        return NextResponse.redirect(redirectUrl);
      } else {
        // Verification failed - redirect to email confirmation page with error
        const baseUrl = request.nextUrl.origin;
        const redirectUrl = new URL(routes.emailConfirmation, baseUrl);
        redirectUrl.searchParams.set("code", code); // Preserve code for retry
        redirectUrl.searchParams.set("error", "verification_failed");
        return NextResponse.redirect(redirectUrl);
      }
    } catch (verifyError) {
      // Error during verification - redirect to email confirmation page with error
      console.error("[Email Verification] Error verifying email:", verifyError);
      const baseUrl = request.nextUrl.origin;
      const redirectUrl = new URL(routes.emailConfirmation, baseUrl);
      redirectUrl.searchParams.set("code", code); // Preserve code for retry
      redirectUrl.searchParams.set("error", "verification_error");
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    // Unexpected error - redirect to email confirmation page
    console.error("[Email Verification] Unexpected error:", error);
    const baseUrl = request.nextUrl.origin;
    const redirectUrl = new URL(routes.emailConfirmation, baseUrl);
    redirectUrl.searchParams.set("error", "unexpected_error");
    return NextResponse.redirect(redirectUrl);
  }
}
