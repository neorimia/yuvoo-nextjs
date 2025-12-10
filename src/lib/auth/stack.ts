/**
 * Stack Auth Client Configuration
 *
 * This file configures the Stack Auth client for authentication.
 * Stack Auth handles user authentication, sessions, and user management.
 */

import { StackServerApp } from "@stackframe/stack";

// Initialize Stack Auth client
// Environment variables:
// - STACK_PROJECT_ID: Your Stack Auth project ID
// - STACK_API_KEY: Your Stack Auth API key (server-side only)
export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/login",
    signUp: "/register",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
  },
});
