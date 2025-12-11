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

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_STACK_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_STACK_PROJECT_ID is required. Please set it in .env.local");
}

if (!process.env.STACK_SECRET_SERVER_KEY) {
  throw new Error("STACK_SECRET_SERVER_KEY is required. Please set it in .env.local");
}

// Initialize Stack Auth server app
export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: routes.login,
    signUp: routes.register,
    passwordReset: routes.resetPassword, // Password reset page
    emailVerification: routes.emailConfirmation, // Email verification page
    afterSignIn: routes.parent.dashboard, // Protected route - redirect after login
    afterSignUp: routes.parent.dashboard, // Protected route - redirect after signup
  },
});
