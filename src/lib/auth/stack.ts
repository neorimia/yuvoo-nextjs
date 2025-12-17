/**
 * Stack Auth Client Configuration
 *
 * This file configures the Stack Auth client for authentication.
 * Stack Auth handles user authentication, sessions, and user management.
 *
 * Environment variables required:
 * - NEXT_PUBLIC_STACK_PROJECT_ID: Your Stack Auth project ID (public, used in client)
 * - NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: Publishable client key (public, used in client)
 * - STACK_SECRET_SERVER_KEY: Secret server key (private, server-side only)
 */

import { StackServerApp } from "@stackframe/stack";
import { routes } from "@/lib/routes";

// Note: Environment variables are automatically loaded by Next.js
// No need for dotenv.config() here - it causes issues in Edge Runtime (middleware)
// For standalone Node.js scripts, load dotenv in those scripts directly

// Check if we're running on the server side
function isServerSide(): boolean {
  return typeof window === "undefined" && typeof process !== "undefined";
}

// Validate and get environment variables
function getEnvVars() {
  // Only validate on server side - client side doesn't need secret key
  const isServer = isServerSide();

  const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
  const secretKey = isServer ? process.env.STACK_SECRET_SERVER_KEY : undefined;

  // Debug: Log available env vars (only in development, server-side)
  if (isServer && process.env.NODE_ENV === "development") {
    const hasProjectId = !!projectId;
    const hasSecretKey = !!secretKey;
    console.log("[Stack Auth] Environment check:", {
      hasProjectId,
      hasSecretKey,
      projectIdLength: projectId?.length || 0,
      secretKeyLength: secretKey?.length || 0,
    });
  }

  // Project ID is required on both client and server (it's public)
  if (!projectId) {
    throw new Error(
      "NEXT_PUBLIC_STACK_PROJECT_ID is required. Please set it in .env.local\n" +
        `Current value: ${projectId === undefined ? "undefined" : "empty string"}\n` +
        "Make sure the variable is set: NEXT_PUBLIC_STACK_PROJECT_ID=your-project-id\n" +
        "⚠️ IMPORTANT: Restart your dev server after adding/changing .env.local variables"
    );
  }

  // Secret key is only required on server side
  if (isServer && !secretKey) {
    throw new Error(
      "STACK_SECRET_SERVER_KEY is required. Please set it in .env.local\n" +
        `Current value: ${secretKey === undefined ? "undefined" : "empty string"}\n` +
        "Make sure the variable is set: STACK_SECRET_SERVER_KEY=your-secret-key\n" +
        "Note: Remove quotes from values in .env.local if present\n" +
        "⚠️ IMPORTANT: Restart your dev server after adding/changing .env.local variables"
    );
  }

  return { projectId, secretKey: secretKey || "" };
}

// Initialize Stack Auth server app with truly lazy initialization
// This ensures env vars are loaded before initialization
// Only initialize on server side - client side will use a different approach
let _stackServerApp: StackServerApp | undefined;

function getStackServerApp(): StackServerApp {
  // Only initialize on server side - but allow access on client for StackProvider
  // StackProvider will handle the client/server boundary internally
  if (!isServerSide()) {
    // On client side, return a placeholder that StackProvider can handle
    // Stack Auth's StackProvider is designed to work with server app even in client components
    // It will only call server methods when actually needed (which happens server-side)
    if (!_stackServerApp) {
      // This shouldn't happen, but if it does, StackProvider will handle it
      throw new Error(
        "StackServerApp must be initialized on the server side first. " +
          "Make sure the server app is initialized before client components access it."
      );
    }
    return _stackServerApp;
  }

  // Server-side initialization
  if (!_stackServerApp) {
    // Validate env vars before initialization
    getEnvVars();

    _stackServerApp = new StackServerApp({
      tokenStore: "nextjs-cookie",
      urls: {
        signIn: routes.login,
        signUp: routes.register,
        passwordReset: routes.resetPassword, // Password reset page
        emailVerification: routes.emailConfirmation, // Email verification page
        afterSignIn: routes.parent.dashboard, // Protected route - redirect after login (proxy will handle onboarding redirect)
        // Note: afterSignUp is not set here because we handle redirects manually in signUpAction
        // Setting it would cause Stack Auth to redirect automatically, conflicting with our custom redirect logic
      },
    });
  }
  return _stackServerApp;
}

// Export function to get the actual app instance (for server components)
// This ensures the app is properly initialized before being passed to client components
export function getStackServerAppInstance(): StackServerApp {
  return getStackServerApp();
}

// Export with getter - only initializes when accessed, not at module load
// Use this for direct property access in server-side code
export const stackServerApp = new Proxy({} as StackServerApp, {
  get(_target, prop, receiver) {
    const app = getStackServerApp();
    const value = Reflect.get(app, prop, receiver);
    // If it's a method, bind it to the app instance
    if (typeof value === "function") {
      return value.bind(app);
    }
    return value;
  },
});
