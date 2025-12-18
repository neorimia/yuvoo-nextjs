/**
 * Cookie Debugging Utilities
 *
 * Helper functions to debug cookie-related authentication issues.
 * Use these in development to diagnose why cookies might not be setting.
 */

import { cookies, headers } from "next/headers";
import { getSession } from "./session";

/**
 * Debug cookie information after login
 * Call this in signInAction or after authentication attempts
 */
export async function debugCookies() {
  const cookieStore = await cookies();
  const headersList = await headers();

  const allCookies = cookieStore.getAll();
  const stackCookies = allCookies.filter((cookie) => cookie.name.toLowerCase().includes("stack"));

  const setCookieHeader = headersList.get("set-cookie");

  return {
    totalCookies: allCookies.length,
    stackCookies: stackCookies.map((c) => ({
      name: c.name,
      value: c.value.substring(0, 20) + "...", // Truncate for security
      hasValue: !!c.value,
    })),
    setCookieHeader: setCookieHeader ? "✅ Present" : "❌ Missing",
    allCookieNames: allCookies.map((c) => c.name),
  };
}

/**
 * Check if session is accessible after authentication
 * Useful for debugging why getSession() might return null
 */
export async function debugSession() {
  try {
    const session = await getSession();
    const cookieInfo = await debugCookies();

    return {
      hasSession: !!session,
      userId: session?.user?.id || null,
      email: session?.user?.primaryEmail || null,
      dbUserId: session?.dbUser?.id || null,
      role: session?.dbUser?.role || null,
      cookies: cookieInfo,
      status: session ? "✅ Authenticated" : "❌ Not authenticated",
    };
  } catch (error) {
    return {
      hasSession: false,
      error: error instanceof Error ? error.message : String(error),
      cookies: await debugCookies(),
      status: "❌ Error getting session",
    };
  }
}

/**
 * Log cookie debug information to console
 * Use in development only
 */
export async function logCookieDebug(context: string = "Cookie Debug") {
  if (process.env.NODE_ENV !== "development") {
    return; // Only log in development
  }

  const debugInfo = await debugSession();
  console.log(`[${context}]`, debugInfo);
}
