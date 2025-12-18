# Authentication Persistence Analysis

## Executive Summary

**Status**: ✅ **Authentication DOES persist after login** - Stack Auth uses HTTP-only cookies for session storage.

## Current Implementation

### 1. Session Storage Mechanism

**Location**: `src/lib/auth/stack.ts`

```typescript
_stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie", // ✅ Sessions stored in HTTP-only cookies
  urls: {
    signIn: routes.login,
    signUp: routes.register,
    afterSignIn: routes.parent.dashboard,
    // ...
  },
});
```

**Key Points**:

- ✅ Uses `"nextjs-cookie"` token store - sessions are persisted in HTTP-only cookies
- ✅ Cookies are automatically sent with every request
- ✅ Server-side session retrieval via `stackServerApp.getUser()` reads from cookies
- ✅ No client-side storage needed (localStorage/sessionStorage)

### 2. Session Retrieval Flow

**Location**: `src/lib/auth/session.ts`

```typescript
export async function getSession() {
  try {
    const stackUser = await stackServerApp.getUser(); // Reads from cookies
    if (!stackUser) return null;

    // Sync with local database
    const dbUser = await syncUserWithDatabase(stackUser);

    return {
      user: stackUser,
      dbUser,
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}
```

**Flow**:

1. `stackServerApp.getUser()` reads authentication token from HTTP-only cookie
2. If token exists and is valid → returns Stack Auth user
3. User is synced with local database
4. Session object returned with both Stack Auth user and DB user

### 3. Login Flow

**Location**: `src/app/actions/auth.ts`

```typescript
export async function signInAction(formData: FormData, redirectUrl?: string) {
  // ... validation ...

  await stackServerApp.signInWithCredential({
    email,
    password,
  });

  // ✅ Stack Auth automatically sets HTTP-only cookie here
  // ✅ Cookie persists across page refreshes and browser sessions

  return {
    success: true,
    redirect: safeRedirectUrl,
  };
}
```

**What Happens**:

1. User submits login form
2. `signInWithCredential()` authenticates with Stack Auth
3. **Stack Auth automatically sets HTTP-only cookie** with session token
4. Cookie is sent with subsequent requests
5. User is redirected to dashboard

## Cookie Configuration

### Stack Auth Cookie Settings

Stack Auth manages cookies automatically with these defaults:

- **HttpOnly**: ✅ Yes (prevents XSS attacks)
- **Secure**: ✅ Yes in production (HTTPS only)
- **SameSite**: ✅ Lax (CSRF protection)
- **Path**: `/` (available site-wide)
- **Expiration**: Managed by Stack Auth (typically 7-30 days)

### Cookie Name

Stack Auth uses a cookie named similar to: `stack-auth-token` or `stack_session_<project-id>`

## Verification Steps

### ✅ How to Verify Persistence Works

1. **Login Test**:
   - Login at `/auth/login`
   - Check browser DevTools → Application → Cookies
   - Should see Stack Auth cookie set

2. **Refresh Test**:
   - After login, refresh the page
   - User should remain authenticated
   - `getSession()` should return user data

3. **Navigation Test**:
   - After login, navigate to different pages
   - Protected routes should work
   - User session should persist

4. **Server-Side Test**:
   ```typescript
   // In any Server Component or Server Action
   const session = await getSession();
   if (session) {
     console.log("User is authenticated:", session.user.id);
   }
   ```

## Potential Issues & Solutions

### Issue 1: Missing StackAuthProvider ✅ **RESOLVED**

**Status**: ✅ **StackAuthProvider implemented and added to layout**

**Implementation**:

- ✅ Created `src/providers/StackAuthProvider.tsx`
- ✅ Added `StackClientApp` configuration in `src/lib/auth/stack.ts`
- ✅ Wrapped app with `StackAuthProvider` in `src/app/layout.tsx`
- ✅ Client app inherits from server app for consistency

**Current State**:

- ✅ Server Actions work
- ✅ Server Components work
- ✅ Client-side hooks now work (`useStackApp()`, `useUser()`, `useStackRedirect()`)

**Files Created/Modified**:

1. `src/providers/StackAuthProvider.tsx` - Client-side provider component
2. `src/lib/auth/stack.ts` - Added `StackClientApp` configuration
3. `src/app/layout.tsx` - Added `StackAuthProvider` wrapper

**Usage Example**:

```typescript
"use client";
import { useStackApp, useUser } from "@stackframe/stack";

export function MyComponent() {
  const stackApp = useStackApp();
  const user = useUser();

  if (user) {
    return <div>Welcome {user.displayName}</div>;
  }

  return <div>Please log in</div>;
}
```

### Issue 2: Cookie Not Being Set

**Symptoms**:

- Login succeeds but user immediately logged out
- `getSession()` returns `null` after login
- Cookies not visible in browser DevTools
- User redirected to login page after successful authentication

**Possible Causes**:

1. **Domain mismatch**: Cookie domain doesn't match app domain
2. **HTTPS required**: Production requires HTTPS for secure cookies
3. **SameSite restrictions**: Cross-site requests blocked
4. **Cookie size limit**: Token too large (unlikely)
5. **Environment variables missing**: Stack Auth not properly configured
6. **Cookie path restrictions**: Cookie path doesn't match route
7. **Browser privacy settings**: Third-party cookies blocked
8. **Server-side error**: Stack Auth failed to set cookie silently

**Verification Steps**:

#### Step 1: Check Browser DevTools

1. Open browser DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Navigate to **Cookies** → `http://localhost:3000` (or your domain)
4. Look for cookies starting with:
   - `stack-auth-*`
   - `stack_session_*`
   - `stack-token-*`

**Expected**: Should see at least one Stack Auth cookie after login.

#### Step 2: Check Server Logs

Add debugging to `signInAction`:

```typescript
// In src/app/actions/auth.ts - signInAction
export async function signInAction(formData: FormData, redirectUrl?: string) {
  // ... validation ...

  try {
    await stackServerApp.signInWithCredential({
      email,
      password,
    });

    // ✅ Debug: Check if session exists immediately after login
    const session = await getSession();
    console.log("[signInAction] Session after login:", {
      hasSession: !!session,
      userId: session?.user?.id,
      email: session?.user?.primaryEmail,
    });

    // ✅ Debug: Check cookies in response headers
    const headersList = await headers();
    const setCookieHeader = headersList.get("set-cookie");
    console.log("[signInAction] Set-Cookie header:", setCookieHeader ? "✅ Present" : "❌ Missing");

    return {
      success: true,
      redirect: safeRedirectUrl,
    };
  } catch (error) {
    // ... error handling ...
  }
}
```

#### Step 3: Verify Stack Auth Configuration

Check environment variables:

```bash
# Verify these are set in .env.local
echo $NEXT_PUBLIC_STACK_PROJECT_ID
echo $STACK_SECRET_SERVER_KEY
echo $NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
```

**Expected**: All three should have values.

#### Step 4: Test Cookie Setting Manually

Create a test endpoint to verify cookie setting:

```typescript
// app/api/test-cookie/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  // Try to set a test cookie
  cookieStore.set("test-cookie", "test-value", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  // Check if Stack Auth cookies exist
  const stackCookies = cookieStore.getAll().filter((cookie) => cookie.name.includes("stack"));

  return NextResponse.json({
    testCookieSet: cookieStore.has("test-cookie"),
    stackCookies: stackCookies.map((c) => c.name),
    allCookies: cookieStore.getAll().map((c) => c.name),
  });
}
```

**Usage**: Visit `/api/test-cookie` and check response.

**Debugging Utility**:

A debugging utility is available at `src/lib/auth/debug-cookies.ts`:

```typescript
import { debugSession, logCookieDebug } from "@/lib/auth/debug-cookies";

// Log cookie and session info (development only)
await logCookieDebug("My Context");

// Get detailed debug information
const debugInfo = await debugSession();
console.log(debugInfo);
```

**Note**: Cookie debugging is automatically enabled in `signInAction` during development.

**Debug Steps**:

1. **Check Network Tab**:
   - After login, check Network tab in DevTools
   - Look for the login request
   - Check Response Headers for `Set-Cookie`
   - Verify cookie is being sent by server

2. **Check Console for Errors**:

   ```typescript
   // Add to signInAction for debugging
   console.log("[signInAction] After login - checking session:");
   const session = await getSession();
   console.log("[signInAction] Session:", session ? "✅ Authenticated" : "❌ Not authenticated");

   if (!session) {
     console.error("[signInAction] Session is null after login!");
     console.error("[signInAction] This indicates cookie was not set or not readable");
   }
   ```

3. **Verify Stack Auth Token Store**:
   ```typescript
   // In src/lib/auth/stack.ts - verify configuration
   _stackServerApp = new StackServerApp({
     tokenStore: "nextjs-cookie", // ✅ Must be "nextjs-cookie"
     urls: {
       // ... URLs ...
     },
   });
   ```

**Common Solutions**:

1. **Domain Mismatch**:
   - Ensure cookie domain matches your app domain
   - Localhost: Use `localhost` (not `127.0.0.1`)
   - Production: Use your actual domain

2. **HTTPS in Production**:
   - Stack Auth requires HTTPS in production
   - Ensure `NEXT_PUBLIC_APP_URL` uses `https://`
   - Verify SSL certificate is valid

3. **SameSite Cookie Issues**:
   - Stack Auth sets `SameSite=Lax` by default
   - If using iframes, may need `SameSite=None; Secure`
   - Check Stack Auth dashboard settings

4. **Environment Variables**:
   - Restart dev server after changing `.env.local`
   - Verify variables are loaded: `console.log(process.env.NEXT_PUBLIC_STACK_PROJECT_ID)`

5. **Browser Extensions**:
   - Disable ad blockers temporarily
   - Disable privacy extensions (Privacy Badger, etc.)
   - Test in incognito mode

6. **Stack Auth Dashboard**:
   - Verify project is active
   - Check redirect URLs are configured
   - Verify API keys are correct

**Advanced Debugging**:

If cookies still not setting, check Stack Auth's internal cookie handling:

```typescript
// Create a debug middleware to log all cookie operations
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Log all cookies in request
  console.log("[Middleware] Request cookies:", request.cookies.getAll());

  // Log all cookies in response
  console.log("[Middleware] Response Set-Cookie headers:", response.headers.get("set-cookie"));

  return response;
}
```

**Quick Fix Checklist**:

- [ ] Restart dev server after changing `.env.local`
- [ ] Check browser DevTools → Application → Cookies
- [ ] Verify `tokenStore: "nextjs-cookie"` in stack.ts
- [ ] Check Network tab for `Set-Cookie` header
- [ ] Test in incognito mode (fewer extensions)
- [ ] Verify Stack Auth environment variables
- [ ] Check Stack Auth dashboard for project status
- [ ] Verify HTTPS in production

### Issue 3: Session Expires Too Quickly

**Symptoms**:

- User logged in but session expires after short time
- Need to login frequently

**Solution**:

- Check Stack Auth dashboard for session expiration settings
- Default is typically 7-30 days
- Can be configured in Stack Auth project settings

### Issue 4: Cookie Blocked by Browser

**Symptoms**:

- Cookies not set in browser
- Third-party cookie blocking

**Solution**:

- Ensure app is on same domain (not iframe)
- Check browser privacy settings
- Test in incognito mode (fewer extensions)

## Best Practices

### ✅ Current Implementation (Good)

1. **HTTP-only cookies**: ✅ Prevents XSS attacks
2. **Server-side session retrieval**: ✅ More secure
3. **Automatic cookie management**: ✅ Stack Auth handles it
4. **Database sync**: ✅ User data synced to local DB

### 🔄 Recommendations

1. **Add Session Refresh** (if needed):

   ```typescript
   // Refresh session token periodically
   // Stack Auth handles this automatically, but can add manual refresh
   ```

2. **Add Logout Functionality** (if missing):

   ```typescript
   export async function signOutAction() {
     await stackServerApp.signOut();
     redirect(routes.login);
   }
   ```

3. **Monitor Session Expiration**:
   - Log when sessions expire
   - Track session duration
   - Alert users before expiration

## Testing Checklist

- [x] Login sets cookie
- [x] Cookie persists after page refresh
- [x] Cookie persists after navigation
- [x] Server-side `getSession()` works
- [x] Protected routes work
- [ ] Cookie expiration time is acceptable
- [ ] Logout clears cookie
- [ ] Session works across browser tabs
- [ ] Session persists after browser restart (if configured)

## Conclusion

**Authentication DOES persist after login** using Stack Auth's cookie-based session management.

**Key Points**:

- ✅ Sessions stored in HTTP-only cookies
- ✅ Automatic cookie management by Stack Auth
- ✅ Server-side session retrieval works
- ✅ No client-side storage needed
- ⚠️ No StackAuthProvider (not needed for Server Actions)

**If experiencing issues**:

1. **Check browser DevTools → Cookies** - Look for Stack Auth cookies
2. **Check server console** - Cookie debugging logs automatically in development
3. **Verify Stack Auth environment variables** - All three required
4. **Use debugging utility** - `src/lib/auth/debug-cookies.ts` provides detailed info
5. **Check server logs** - Look for `[signInAction]` and `[Cookie Debug]` logs
6. **Test in incognito mode** - Fewer extensions interfering
7. **Verify Network tab** - Check for `Set-Cookie` header in login response
8. Verify HTTPS in production
