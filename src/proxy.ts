/**
 * Onboarding & Authentication Proxy (Next.js 16)
 *
 * Handles authentication and onboarding flow redirects for protected routes.
 *
 * Flow:
 * 1. Check if user is authenticated
 * 2. Sync user with database to get onboarding status
 * 3. Redirect to appropriate onboarding flow if incomplete
 * 4. Allow access to protected routes if onboarding complete
 *
 * Protected routes:
 * - /parent/* - Parent dashboard and features
 * - /club/* - Club admin portal
 * - /doctor/* - Doctor portal
 * - /admin/* - Admin portal
 * - /onboarding/* - Onboarding flows (protected, role-specific)
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";

// Route patterns
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password"];
const PROTECTED_ROUTE_PREFIXES = ["/parent", "/club", "/doctor", "/admin", "/onboarding"];

// Onboarding routes by role
const ONBOARDING_ROUTES = {
  parent: "/onboarding/parent/welcome",
  club_admin: "/onboarding/club/welcome",
  doctor: "/onboarding/doctor/welcome",
  admin: "/admin/dashboard", // Admins don't need onboarding
};

/**
 * Check if path is a protected route
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Check if path is an authentication route
 */
function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if user is on their role's onboarding flow
 */
function isOnCorrectOnboardingFlow(pathname: string, role: string): boolean {
  if (role === "parent" && pathname.startsWith("/onboarding/parent")) return true;
  if (role === "club_admin" && pathname.startsWith("/onboarding/club")) return true;
  if (role === "doctor" && pathname.startsWith("/onboarding/doctor")) return true;
  return false;
}

/**
 * Get user role from database
 * This syncs with the database to get accurate onboarding status
 */
async function getUserFromDatabase(stackUserId: string) {
  try {
    const { db } = await import("@/lib/db");
    const { users } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");

    const [user] = await db.select().from(users).where(eq(users.stackUserId, stackUserId)).limit(1);

    return user || null;
  } catch (error) {
    console.error("Proxy: Error fetching user from database:", error);
    return null;
  }
}

/**
 * Get dashboard URL based on user role
 */
function getDashboardUrl(role: string): string {
  switch (role) {
    case "parent":
      return "/parent/dashboard";
    case "club_admin":
      return "/club/dashboard";
    case "doctor":
      return "/doctor/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/parent/dashboard";
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for static files, api routes, and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  try {
    // Get Stack Auth user
    const stackUser = await stackServerApp.getUser();

    // --- Unauthenticated Users ---
    if (!stackUser) {
      // If trying to access protected route, redirect to login
      if (isProtectedRoute(pathname)) {
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Allow access to public routes
      return NextResponse.next();
    }

    // --- Authenticated Users ---

    // Get user from database for onboarding status
    const dbUser = await getUserFromDatabase(stackUser.id);

    if (!dbUser) {
      // User not synced to database yet - this shouldn't happen
      // but we'll allow Stack Auth to create the user on next request
      console.warn("Proxy: Stack Auth user not found in database, allowing request");
      return NextResponse.next();
    }

    // If user is on auth routes (login/register), redirect to appropriate dashboard
    if (isAuthRoute(pathname)) {
      // Redirect to onboarding if not completed
      if (!dbUser.onboardingCompleted) {
        const onboardingUrl = ONBOARDING_ROUTES[dbUser.role] || "/onboarding/parent/welcome";
        return NextResponse.redirect(new URL(onboardingUrl, request.url));
      }

      // Redirect to dashboard if onboarding complete
      const dashboardUrl = getDashboardUrl(dbUser.role);
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    // --- Onboarding Flow Protection ---

    // If onboarding NOT complete
    if (!dbUser.onboardingCompleted) {
      // Allow access to correct onboarding flow
      if (isOnCorrectOnboardingFlow(pathname, dbUser.role)) {
        return NextResponse.next();
      }

      // Redirect to correct onboarding flow if trying to access wrong flow or dashboard
      if (isProtectedRoute(pathname)) {
        const onboardingUrl = ONBOARDING_ROUTES[dbUser.role] || "/onboarding/parent/welcome";
        return NextResponse.redirect(new URL(onboardingUrl, request.url));
      }

      // Allow public routes
      return NextResponse.next();
    }

    // --- Onboarding Complete - Prevent Re-entry ---

    // If onboarding IS complete, prevent accessing onboarding routes
    if (pathname.startsWith("/onboarding")) {
      const dashboardUrl = getDashboardUrl(dbUser.role);
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    // --- Role-Based Route Protection ---

    // Protect role-specific routes
    if (pathname.startsWith("/parent") && dbUser.role !== "parent") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (pathname.startsWith("/club") && dbUser.role !== "club_admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (pathname.startsWith("/doctor") && dbUser.role !== "doctor") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (pathname.startsWith("/admin") && dbUser.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Allow access
    return NextResponse.next();
  } catch (error) {
    console.error("Proxy error:", error);
    // On error, allow request to proceed (fail open for public routes)
    // Protected routes will be caught by route-level auth checks
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon.* (all icon files)
     * - apple.* (apple touch icons)
     * - manifest.json (web app manifest)
     * - assets (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|icon|apple|manifest\\.json|assets).*)",
  ],
};
