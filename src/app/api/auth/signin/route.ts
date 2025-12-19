/**
 * Sign In Route Handler
 *
 * This route handler handles sign-in requests and properly sets Stack Auth cookies.
 * Route Handlers can set cookies directly, unlike Server Actions which have limitations.
 *
 * Route: POST /api/auth/signin
 */

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stackServerApp } from "@/lib/auth/stack";
import { routes } from "@/lib/routes";
import { signInSchema } from "@/lib/validations/auth";
import { getErrorMessage } from "@/lib/auth/errors";
import { rateLimit, getClientIdentifierFromHeaders, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, redirectUrl } = body;

    // Validate input with Zod schema
    const validationResult = signInSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError?.message || "Date invalide. Te rugăm să verifici email-ul și parola.",
        },
        { status: 400 }
      );
    }

    // Rate limiting: prevent brute force attacks
    try {
      const headersList = await headers();
      const identifier = getClientIdentifierFromHeaders(undefined, headersList);
      const rateLimitResult = await rateLimit(`signin:${identifier}`, RATE_LIMIT_CONFIGS.SIGN_IN);

      if (!rateLimitResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: `Prea multe încercări de autentificare. Te rugăm să încerci din nou după ${rateLimitResult.resetTime}.`,
          },
          { status: 429 }
        );
      }
    } catch (rateLimitError) {
      // Don't block login if rate limiting fails (log and continue)
      console.error("[RateLimit] Error checking rate limit for sign in:", rateLimitError);
    }

    // Sign in with Stack Auth
    // Note: signInWithCredential() may throw NEXT_REDIRECT error, which is Next.js's
    // way of handling redirects. We need to re-throw it to let Next.js handle it.
    // If it doesn't throw, we'll manually redirect to the redirect proxy.
    console.log("[SignIn] Attempting Stack Auth sign in for:", validationResult.data.email);

    try {
      const signInResult = await stackServerApp.signInWithCredential({
        email: validationResult.data.email,
        password: validationResult.data.password,
      });
      console.log("[SignIn] Stack Auth sign in succeeded:", {
        hasResult: !!signInResult,
        resultType: typeof signInResult,
      });
    } catch (signInError) {
      console.log("[SignIn] Stack Auth sign in threw error:", {
        error: signInError,
        errorType: typeof signInError,
        hasDigest: signInError && typeof signInError === "object" && "digest" in signInError,
      });

      // Re-throw NEXT_REDIRECT errors - these are Next.js redirects, not actual errors
      if (signInError && typeof signInError === "object" && "digest" in signInError) {
        const digest = (signInError as { digest?: string }).digest;
        if (digest && typeof digest === "string" && digest.includes("NEXT_REDIRECT")) {
          console.log("[SignIn] Re-throwing NEXT_REDIRECT");
          throw signInError; // Re-throw to let Next.js handle the redirect
        }
      }
      // If it's not a NEXT_REDIRECT, re-throw to be handled by outer catch
      console.log("[SignIn] Re-throwing non-NEXT_REDIRECT error");
      throw signInError;
    }

    console.log("[SignIn] Stack Auth sign in completed without throwing");

    // If signInWithCredential() didn't throw (unlikely but possible),
    // manually redirect to the redirect proxy
    // The redirect proxy will:
    // 1. Have cookies set by Stack Auth during the redirect
    // 2. Get the session properly (with retry logic for timing issues)
    // 3. Determine the correct role-based redirect based on actual user data
    // 4. Redirect to the appropriate dashboard/onboarding

    // If a custom redirectUrl is provided, pass it as a query parameter
    let redirectProxyUrl = routes.authRedirect;

    if (redirectUrl) {
      try {
        // Decode URL if it's still encoded
        let decodedUrl = redirectUrl;
        if (redirectUrl.includes("%")) {
          decodedUrl = decodeURIComponent(redirectUrl);
        }

        // Validate it's a relative path (security: prevent open redirect)
        if (decodedUrl.startsWith("/") && !decodedUrl.startsWith("//")) {
          // Add custom redirect as query parameter
          const url = new URL(redirectProxyUrl, request.url);
          url.searchParams.set("redirect", decodedUrl);
          redirectProxyUrl = url.pathname + url.search;
        }
      } catch (error) {
        // If decoding fails, just use the redirect proxy without query param
        console.error("Error decoding redirectUrl:", error);
      }
    }

    // Redirect to the redirect proxy
    // Stack Auth will set cookies during this redirect
    // Use 303 (See Other) to tell browser to use GET for the redirect
    // (307 would preserve POST method, but /auth/redirect only handles GET)
    console.log("[SignIn] Redirecting to:", redirectProxyUrl);
    console.log(
      "[SignIn] Request cookies:",
      request.cookies.getAll().map((c) => c.name)
    );

    const response = NextResponse.redirect(new URL(redirectProxyUrl, request.url), 303);

    console.log("[SignIn] Response created, returning 303 redirect");
    return response;
  } catch (error) {
    // Re-throw NEXT_REDIRECT errors - these are Next.js redirects, not actual errors
    if (error && typeof error === "object" && "digest" in error) {
      const digest = (error as { digest?: string }).digest;
      if (digest && typeof digest === "string" && digest.includes("NEXT_REDIRECT")) {
        throw error; // Re-throw to let Next.js handle the redirect
      }
    }

    // Log error details for debugging
    console.error("[SignIn Route Handler] Error:", error);
    console.error("[SignIn Route Handler] Error type:", typeof error);
    console.error(
      "[SignIn Route Handler] Error keys:",
      error && typeof error === "object" ? Object.keys(error) : "N/A"
    );

    // Handle authentication errors
    // Check if it's an authentication error (401) or server error (500)
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Check for Stack Auth error code (e.g., EMAIL_PASSWORD_MISMATCH)
    const hasAuthErrorCode =
      error &&
      typeof error === "object" &&
      "code" in error &&
      (String((error as { code?: unknown }).code).includes("PASSWORD") ||
        String((error as { code?: unknown }).code).includes("EMAIL") ||
        String((error as { code?: unknown }).code).includes("CREDENTIAL"));

    const isAuthError =
      hasAuthErrorCode ||
      errorMessage.includes("Invalid") ||
      errorMessage.includes("password") ||
      errorMessage.includes("email") ||
      errorMessage.includes("credential") ||
      errorMessage.includes("Wrong") ||
      errorMessage.toLowerCase().includes("mismatch");

    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error),
      },
      { status: isAuthError ? 401 : 500 }
    );
  }
}
