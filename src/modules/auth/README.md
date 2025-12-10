# Auth Module

Authentication and authorization business logic.

## Files

- `auth.service.ts` - Business logic for auth operations
- `auth.repository.ts` - Data access for user queries
- `auth.types.ts` - TypeScript types

## Functions

### Service

- `getCurrentUser()` - Get authenticated user from session
- `hasRole(role)` - Check if user has specific role
- `hasAnyRole(roles)` - Check if user has any of the roles
- `requireAuth()` - Require authentication (throws if not)
- `requireRole(role)` - Require specific role (throws if not)

### Repository

- `getUserById(id)` - Get user by ID
- `getUserByEmail(email)` - Get user by email

## Usage

```typescript
import { getCurrentUser, requireRole } from "@/modules/auth/auth.service";

// Check authentication
const user = await getCurrentUser();
if (!user) {
  redirect("/auth/login");
}

// Require specific role
const admin = await requireRole("admin");
```
