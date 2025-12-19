/**
 * Authentication Redirect Proxy
 *
 * This route handles post-authentication redirects from Stack Auth.
 * It redirects users to the appropriate dashboard or onboarding flow
 * based on their role and onboarding status.
 *
 * Route: /auth/redirect
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { getRoleBasedRedirect } from "@/lib/auth/redirects";

async function handleAuthRedirect(request: NextRequest) {
  try {
    console.log("[Auth Redirect] Starting authentication redirect flow");
    console.log("[Auth Redirect] Request URL:", request.url);
    console.log(
      "[Auth Redirect] Cookies:",
      request.cookies.getAll().map((c) => c.name)
    );

    // Get user session
    // Note: If session is not immediately available (e.g., cookies still being set),
    // we'll retry multiple times with increasing delays
    let session = await getSession();

    if (!session) {
      // Session not found - this might be a timing issue with cookie setting
      // Stack Auth cookies might not be set immediately after signInWithCredential()
      // Retry with increasing delays
      console.log("[Auth Redirect] Session not found on first attempt, retrying...");
      const retries = [100, 200, 300]; // 100ms, 200ms, 300ms delays

      for (let i = 0; i < retries.length; i++) {
        const delay = retries[i];
        console.log(`[Auth Redirect] Retry ${i + 1}/${retries.length} after ${delay}ms delay`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        session = await getSession();
        if (session) {
          console.log(`[Auth Redirect] Session found after retry ${i + 1}`);
          break;
        }
      }

      if (!session) {
        // Still not authenticated after retries - redirect to login
        console.error(
          "[Auth Redirect] Session not found after all retries, redirecting to login. " +
            "This might indicate that Stack Auth cookies were not set properly."
        );
        console.error("[Auth Redirect] Available cookies:", request.cookies.getAll());
        return NextResponse.redirect(new URL(routes.login, request.url));
      }
    } else {
      console.log("[Auth Redirect] Session found on first attempt");
    }

    // Check if a custom redirect URL was provided as query parameter
    const customRedirect = request.nextUrl.searchParams.get("redirect");
    console.log("[Auth Redirect] Custom redirect:", customRedirect);

    let finalRedirectUrl: string;

    if (customRedirect) {
      try {
        // Decode URL if it's still encoded
        let decodedUrl = customRedirect;
        if (customRedirect.includes("%")) {
          decodedUrl = decodeURIComponent(customRedirect);
        }

        // Validate it's a relative path (security: prevent open redirect)
        if (decodedUrl.startsWith("/") && !decodedUrl.startsWith("//")) {
          finalRedirectUrl = decodedUrl;
          console.log("[Auth Redirect] Using custom redirect:", finalRedirectUrl);
        } else {
          // Invalid redirect URL - use role-based redirect
          console.warn("[Auth Redirect] Invalid custom redirect, using role-based redirect");
          finalRedirectUrl = getRoleBasedRedirect(
            session.dbUser.role,
            session.dbUser.onboardingCompleted
          );
        }
      } catch (error) {
        // If decoding fails, use role-based redirect
        console.error("[Auth Redirect] Error decoding custom redirectUrl:", error);
        finalRedirectUrl = getRoleBasedRedirect(
          session.dbUser.role,
          session.dbUser.onboardingCompleted
        );
      }
    } else {
      // No custom redirect - use role-based redirect
      finalRedirectUrl = getRoleBasedRedirect(
        session.dbUser.role,
        session.dbUser.onboardingCompleted
      );
      console.log("[Auth Redirect] Using role-based redirect:", finalRedirectUrl);
    }

    console.log("[Auth Redirect] User role:", session.dbUser.role);
    console.log("[Auth Redirect] Onboarding completed:", session.dbUser.onboardingCompleted);
    console.log("[Auth Redirect] Final redirect URL:", finalRedirectUrl);

    // Redirect to appropriate URL
    return NextResponse.redirect(new URL(finalRedirectUrl, request.url));
  } catch (error) {
    // Error getting session - redirect to login
    console.error("[Auth Redirect] Error in redirect flow:", error);
    console.error(
      "[Auth Redirect] Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return NextResponse.redirect(new URL(routes.login, request.url));
  }
}

// Export GET handler (primary method)
export async function GET(request: NextRequest) {
  return handleAuthRedirect(request);
}

// Export POST handler (fallback for compatibility)
// This handles cases where redirects might come as POST
// (e.g., if someone uses 307 instead of 303)
export async function POST(request: NextRequest) {
  console.log("[Auth Redirect] POST request received (using GET handler)");
  return handleAuthRedirect(request);
}
