# Stack Auth Server-Side Migration Plan

## Overview

Migrate Stack Auth from client-side (`StackProvider` + `useStackApp` hooks) to server-side (Server Actions only).

## Current State

- ✅ Server-side session management (`getSession`, `requireAuth`) already exists
- ❌ Client-side authentication using `StackProvider` and `useStackApp` hooks
- ❌ Forms use client-side hooks for authentication operations

## Migration Steps

### 1. Create Server Actions for Authentication

Create Server Actions in `src/app/actions/auth.ts` for:

- `signInAction` - Sign in with email/password
- `signUpAction` - Sign up with email/password
- `forgotPasswordAction` - Send password reset email
- `resetPasswordAction` - Reset password with token
- `verifyEmailAction` - Verify email with token

### 2. Update Authentication Forms

Convert all forms from client-side hooks to Server Actions:

- `SignInForm.tsx` - Use `signInAction`
- `SignUpMain.tsx` - Use `signUpAction`
- `ForgotForm.tsx` - Use `forgotPasswordAction`
- `ResetPasswordForm.tsx` - Use `resetPasswordAction`
- `EmailConfirmationForm.tsx` - Use `verifyEmailAction` (convert to server component)

### 3. Remove Client-Side Stack Auth Provider

- Remove `StackProvider` and `StackAuthProvider` from `layout.tsx`
- Delete `src/providers/StackAuthProvider.tsx`
- Remove client-side initialization code

### 4. Update Stack Auth Configuration

- Simplify `src/lib/auth/stack.ts` - remove proxy complexity
- Keep only server-side initialization
- Update documentation

### 5. Testing

- Test sign in flow
- Test sign up flow
- Test password reset flow
- Test email verification flow
- Verify redirects work correctly
- Verify error handling works

## Benefits

- ✅ Better security (no client-side auth logic)
- ✅ Smaller client bundle (no Stack Auth client code)
- ✅ Better SEO (server-side rendering)
- ✅ Simpler architecture (Server Actions pattern)
- ✅ Better error handling (server-side validation)

## Files to Modify

1. `src/app/actions/auth.ts` - Add authentication Server Actions
2. `src/components/Form/SignInForm.tsx` - Use Server Action
3. `src/components/Form/SignUpMain.tsx` - Use Server Action
4. `src/components/Form/ForgotForm.tsx` - Use Server Action
5. `src/components/Form/ResetPasswordForm.tsx` - Use Server Action
6. `src/components/Form/EmailConfirmationForm.tsx` - Convert to server component
7. `src/app/layout.tsx` - Remove StackAuthProvider
8. `src/providers/StackAuthProvider.tsx` - Delete file
9. `src/lib/auth/stack.ts` - Simplify (remove proxy)
