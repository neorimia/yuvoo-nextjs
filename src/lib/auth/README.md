# Stack Auth Configuration

This directory contains Stack Auth setup and session management.

## Files

- `stack.ts` - Stack Auth client configuration
- `session.ts` - Session helpers (getSession, requireAuth)
- `types.ts` - Auth-related TypeScript types

## Usage

```typescript
import { getSession, requireAuth } from "@/lib/auth/session";

// Get current session
const session = await getSession();

// Require authentication (throws if not authenticated)
const { user } = await requireAuth();
```
