/**
 * Onboarding & Authentication Proxy (Next.js 16)
 *
 * Handles authentication and onboarding flow redirects for protected routes.
 * Integrates middleware logic for comprehensive route protection.
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
 *
 * Security Note: Due to CVE-2025-29927, middleware can be bypassed.
 * All protected routes MUST also use requireAuth()/requireRole() in page components/layouts.
 * This proxy provides UX-level protection (redirects).
 * Primary security is enforced at the data layer using requireAuth() and requireRole().
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { routes } from "@/lib/routes";

// Legacy /auth/* paths → canonical routes (backwards compatibility)
const LEGACY_AUTH_REDIRECTS: Record<string, string> = {
  "/auth/login": routes.login,
  "/auth/register": routes.register,
  "/auth/forgot-password": routes.forgotPassword,
  "/auth/reset-password": routes.resetPassword,
  "/auth/verify-email": routes.verifyEmail,
  "/auth/email-confirmation": routes.emailConfirmation,
  "/auth/verification-pending": routes.verificationPending,
  "/auth/choose-role": routes.chooseRole,
};

// Route patterns (canonical auth pages)
const AUTH_ROUTES = [
  routes.login,
  routes.register,
  routes.forgotPassword,
  routes.resetPassword,
  routes.verifyEmail,
  routes.emailConfirmation,
  routes.verificationPending,
  routes.chooseRole,
];
const PROTECTED_ROUTE_PREFIXES = ["/parent", "/club", "/doctor", "/admin", "/onboarding"];

// Public routes that should never require authentication
// Note: These are public routes that might conflict with protected route prefixes
// e.g., /cluburi (public) vs /club (protected), /doctori (public) vs /doctor (protected)
const PUBLIC_ROUTES = [
  "/",
  "/home-2",
  "/home-3",
  // Public app pages
  "/cluburi", // Public club listing (not /club which is protected)
  "/doctori", // Public doctor listing (not /doctor which is protected)
  "/sporturi",
  "/chestionar",
  "/cautare",
  // Public information pages
  "/despre-noi",
  "/parteneri",
  "/contact",
  "/intrebari-frecvente",
  "/testimonials",
  "/gallery",
  "/ajutor",
  // Legal pages
  "/confidentialitate",
  "/termeni",
  "/cookies",
  "/gdpr-parinti",
  // API routes (public)
  "/api",
];

// Onboarding routes by role
const ONBOARDING_ROUTES = {
  parent: "/onboarding/parent/welcome",
  club_admin: "/onboarding/club/welcome",
  doctor: "/onboarding/doctor/welcome",
  admin: "/admin/dashboard", // Admins don't need onboarding
};

/**
 * Check if path is a public route
 */
function isPublicRoute(pathname: string): boolean {
  // Check exact matches
  if (PUBLIC_ROUTES.includes(pathname)) {
    return true;
  }

  // Check if path starts with any public route
  for (const route of PUBLIC_ROUTES) {
    if (pathname.startsWith(route)) {
      return true;
    }
  }

  // Check for dynamic public routes (quiz results, club/doctor details)
  const publicPatterns = [
    /^\/chestionar\/rezultate\/[^/]+$/, // Quiz results
    /^\/cluburi\/[^/]+$/, // Club details
    /^\/doctori\/[^/]+$/, // Doctor details
    /^\/sporturi\/[^/]+$/, // Sport details
  ];

  return publicPatterns.some((pattern) => pattern.test(pathname));
}

/**
 * Check if path is a protected route
 * Note: Must check public routes first to avoid conflicts
 * e.g., /cluburi (public) vs /club (protected), /doctori (public) vs /doctor (protected)
 */
function isProtectedRoute(pathname: string): boolean {
  // First check if it's a public route - if so, it's not protected
  if (isPublicRoute(pathname)) {
    return false;
  }

  // Now check protected route prefixes
  // Note: /club matches /club/* but NOT /cluburi/*
  // Note: /doctor matches /doctor/* but NOT /doctori/*
  return PROTECTED_ROUTE_PREFIXES.some((prefix) => {
    // Exact match or starts with prefix followed by /
    return pathname === prefix || pathname.startsWith(prefix + "/");
  });
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
  if (role === UserRoleEnum.PARENT && pathname.startsWith("/onboarding/parent")) return true;
  if (role === UserRoleEnum.CLUB_ADMIN && pathname.startsWith("/onboarding/club")) return true;
  if (role === UserRoleEnum.DOCTOR && pathname.startsWith("/onboarding/doctor")) return true;
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
    case UserRoleEnum.PARENT:
      return "/parent/dashboard";
    case UserRoleEnum.CLUB_ADMIN:
      return "/club/dashboard";
    case UserRoleEnum.DOCTOR:
      return "/doctor/dashboard";
    case UserRoleEnum.ADMIN:
      return "/admin/dashboard";
    default:
      return "/parent/dashboard";
  }
}

/**
 * Get required role for a route
 */
function getRequiredRole(pathname: string): "parent" | "club_admin" | "doctor" | "admin" | null {
  if (pathname.startsWith("/parent/")) {
    return "parent";
  }
  if (pathname.startsWith("/club/")) {
    return "club_admin";
  }
  if (pathname.startsWith("/doctor/")) {
    return "doctor";
  }
  if (pathname.startsWith("/admin/")) {
    return "admin";
  }
  if (pathname.startsWith("/onboarding/parent/")) {
    return "parent";
  }
  if (pathname.startsWith("/onboarding/club/")) {
    return "club_admin";
  }
  if (pathname.startsWith("/onboarding/doctor/")) {
    return "doctor";
  }
  return null;
}

export async function proxy(request: NextRequest) {
  // HTTPS enforcement (production only)
  // Vercel automatically enforces HTTPS, but this provides explicit redirect
  if (process.env.NODE_ENV === "production") {
    const protocol = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol;

    // Check if request is HTTP (not HTTPS)
    if (protocol === "http:" || protocol === "http") {
      // Redirect to HTTPS
      const httpsUrl = new URL(request.url);
      httpsUrl.protocol = "https:";
      return NextResponse.redirect(httpsUrl, 301); // Permanent redirect
    }
  }

  const { pathname } = request.nextUrl;

  // Redirect legacy /auth/* URLs to canonical routes
  const legacyAuthTarget = LEGACY_AUTH_REDIRECTS[pathname];
  if (legacyAuthTarget) {
    const redirectUrl = new URL(legacyAuthTarget, request.url);
    request.nextUrl.searchParams.forEach((value, key) => {
      redirectUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/assets/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  try {
    // Get Stack Auth user
    // Type assertion needed due to Stack Auth version compatibility
    const stackUser = await (
      stackServerApp as unknown as {
        getUser: () => Promise<{
          id: string;
          primaryEmail: string | null;
          primaryEmailVerified?: boolean;
          displayName?: string | null;
          clientMetadata?: Record<string, unknown> | null;
        } | null>;
      }
    ).getUser();

    // --- Unauthenticated Users ---
    if (!stackUser) {
      // If trying to access protected route, redirect to login
      if (isProtectedRoute(pathname)) {
        const loginUrl = new URL(routes.login, request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Allow access to all other routes (public routes already handled above)
      return NextResponse.next();
    }

    // Check role-based access (basic check - full role check happens in page components)
    const requiredRole = getRequiredRole(pathname);
    if (requiredRole) {
      // Note: In Edge Runtime, we can't directly access the database for role checks
      // So we'll rely on the data layer protection (requireRole) in page components
      // This proxy provides UX-level redirects only
      // The page component will use requireRole() which checks the database
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
    // Note: Check exact matches or /prefix/ to avoid matching public routes
    // e.g., /club matches /club/* but NOT /cluburi/*
    // e.g., /doctor matches /doctor/* but NOT /doctori/*
    if (pathname.startsWith("/parent/") && dbUser.role !== UserRoleEnum.PARENT) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }

    if (pathname.startsWith("/club/") && dbUser.role !== UserRoleEnum.CLUB_ADMIN) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }

    if (pathname.startsWith("/doctor/") && dbUser.role !== UserRoleEnum.DOCTOR) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }

    if (pathname.startsWith("/admin") && dbUser.role !== UserRoleEnum.ADMIN) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }

    // Allow access
    return NextResponse.next();
  } catch (error) {
    // If there's an error checking authentication, redirect to login for protected routes
    console.error("[Proxy] Error checking authentication:", error);

    // If it's a protected route, redirect to login
    if (isProtectedRoute(pathname)) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // On error for public routes, allow request to proceed (fail open)
    // Protected routes will be caught by route-level auth checks
    return NextResponse.next();
  }
}

/**
 * Middleware matcher - only run on specific routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
