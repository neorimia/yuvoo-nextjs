/**
 * Next.js Middleware
 *
 * Handles authentication and route protection.
 * Uses Stack Auth to verify user sessions.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";
import { routes, isProtectedRoute } from "@/lib/routes";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and public assets
  // This must be checked FIRST before any Stack Auth calls
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple") ||
    pathname === "/manifest.json" ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp")
  ) {
    return NextResponse.next();
  }

  // Check if route is protected
  if (isProtectedRoute(pathname)) {
    try {
      // Get user from Stack Auth
      const user = await stackServerApp.getUser();

      // If not authenticated, redirect to login
      if (!user) {
        const loginUrl = new URL(routes.login, request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // User is authenticated, allow access
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware auth error:", error);
      // On error, redirect to login
      const loginUrl = new URL(routes.login, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Public route, allow access
  return NextResponse.next();
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
