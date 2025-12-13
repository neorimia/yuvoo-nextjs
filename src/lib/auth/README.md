# Stack Auth Configuration

This directory contains Stack Auth setup and session management for Yuvoo.

## Files

- `stack.ts` - Stack Auth server app configuration
- `session.ts` - Session helpers (getSession, requireAuth, hasRole, requireRole)
- `test-auth.ts` - Script to test Stack Auth configuration

## Setup

### 1. Create Stack Auth Project

1. Go to [Stack Auth Dashboard](https://stack-auth.com/dashboard)
2. Create a new project
3. Copy the following values:
   - Project ID
   - Publishable Client Key
   - Secret Server Key

### 2. Configure Environment Variables

Add to `.env.local`:

```bash
# Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID="your-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-publishable-key"
STACK_SECRET_SERVER_KEY="your-secret-key"
```

### 3. Configure Redirect URLs

In Stack Auth dashboard, add these redirect URLs:

- `http://localhost:3000` (development)
- `https://yourdomain.com` (production)

### 4. Test Configuration

```bash
npx tsx src/lib/auth/test-auth.ts
```

## Usage

### Server Components / Server Actions

```typescript
import { getSession, requireAuth, hasRole, requireRole } from "@/lib/auth/session";

// Get current session (returns null if not authenticated)
const session = await getSession();
if (session) {
  const { user, dbUser } = session;
  // user: Stack Auth user object
  // dbUser: Local database user record
}

// Require authentication (throws if not authenticated)
const { user, dbUser } = await requireAuth();

// Check if user has a specific role
const isAdmin = await hasRole("admin");

// Require a specific role (throws if not authenticated or wrong role)
const { user, dbUser } = await requireRole("club_admin");
```

### Client Components

Authentication is now handled server-side via Server Actions. Forms use Server Actions instead of client-side hooks.

For authentication operations, use the Server Actions in `src/app/actions/auth.ts`:

- `signInAction` - Sign in with email/password
- `signUpAction` - Sign up with email/password
- `forgotPasswordAction` - Send password reset email
- `resetPasswordAction` - Reset password with token
- `verifyEmailAction` - Verify email with token

Example:

```typescript
"use client";

import { signInAction } from "@/app/actions/auth";

export function LoginForm() {
  const onSubmit = async (formData: FormData) => {
    const result = await signInAction(formData);
    if (result.success) {
      // Redirect handled by form component
    }
  };

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return <div>Hello, {user.primaryEmail}</div>;
}
```

## Middleware

Authentication middleware is configured in `src/middleware.ts`:

- Automatically protects routes defined in `lib/routes.ts`
- Redirects unauthenticated users to login
- Preserves redirect URL for post-login navigation

## User Sync

Stack Auth users are automatically synced with the local `users` table:

- On first login, a user record is created
- On subsequent logins, the user record is updated
- User ID from Stack Auth is stored in `stackUserId` field

## Roles

Yuvoo supports the following user roles:

- `parent` - Default role for parents
- `club_admin` - Club administrators
- `doctor` - Pediatric specialists
- `admin` - System administrators

Roles are stored in the local database and can be updated by admins.
