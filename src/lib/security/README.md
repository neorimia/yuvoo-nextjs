# Security Utilities

This directory contains security-related utilities for the Yuvoo application.

## CSRF Protection

**Location**: `csrf.ts`

**Purpose**: Provides CSRF protection utilities for API routes (route.ts files).

**⚠️ Important**: Next.js Server Actions have built-in CSRF protection. This utility is only needed for API routes that modify data (POST, PUT, DELETE, PATCH).

### Usage

```typescript
import { validateCSRFAndMethod, createCSRFErrorResponse } from "@/lib/security/csrf";

export async function POST(request: Request) {
  // Validate CSRF protection and HTTP method
  const validation = await validateCSRFAndMethod(request, ["POST"]);

  if (!validation.valid) {
    return createCSRFErrorResponse(validation.error || "CSRF validation failed");
  }

  // ... rest of handler logic
}
```

### Functions

#### `validateCSRF(request: Request)`

Validates the Origin header against the Host/X-Forwarded-Host header. This is the primary CSRF protection mechanism.

**Returns**: `CSRFValidationResult` with `valid: boolean` and optional `error: string`

**How it works**:

1. Extracts `Origin` header from request
2. Compares with `Host` or `X-Forwarded-Host` header
3. Checks against allowed origins (from `ALLOWED_ORIGINS` env var or defaults)
4. Falls back to `Referer` header for same-origin requests
5. Allows safe methods (GET, HEAD, OPTIONS) without Origin header

#### `validateMethod(request: Request, allowedMethods: string[])`

Validates that the request method is in the allowed list.

**Returns**: `CSRFValidationResult` with validation status

#### `validateCSRFAndMethod(request: Request, allowedMethods?: string[])`

Convenience function that validates both CSRF protection and HTTP method.

**Default allowed methods**: `["POST"]`

**Returns**: `CSRFValidationResult` with validation status

#### `createCSRFErrorResponse(error: string)`

Creates a standardized 403 error response for CSRF validation failures.

**Returns**: `Response` object with 403 status and error message

### Configuration

**Environment Variable**: `ALLOWED_ORIGINS`

Set this to a comma-separated list of allowed origins for CSRF validation:

```bash
ALLOWED_ORIGINS=https://yuvoo.ro,https://www.yuvoo.ro,https://staging.yuvoo.ro
```

If not set, defaults to the current app URL from `NEXT_PUBLIC_APP_URL` or `http://localhost:3000`.

### Examples

#### Basic POST Handler

```typescript
import { validateCSRFAndMethod, createCSRFErrorResponse } from "@/lib/security/csrf";

export async function POST(request: Request) {
  const validation = await validateCSRFAndMethod(request, ["POST"]);
  if (!validation.valid) {
    return createCSRFErrorResponse(validation.error || "CSRF validation failed");
  }

  const body = await request.json();
  // ... process request
  return Response.json({ success: true });
}
```

#### Multiple Methods

```typescript
import { validateCSRFAndMethod } from "@/lib/security/csrf";

export async function POST(request: Request) {
  return handleRequest(request);
}

export async function PUT(request: Request) {
  return handleRequest(request);
}

async function handleRequest(request: Request) {
  const validation = await validateCSRFAndMethod(request, ["POST", "PUT"]);
  if (!validation.valid) {
    return Response.json({ error: validation.error }, { status: 403 });
  }
  // ... handler logic
}
```

#### Read-Only Handler (No CSRF Needed)

```typescript
// GET handlers don't need CSRF protection
export async function GET(request: Request) {
  // ... read-only logic
  return Response.json({ data: "..." });
}
```

### Best Practices

1. **Prefer Server Actions**: Use Server Actions instead of API routes when possible. They have automatic CSRF protection.

2. **Always Validate**: Always call `validateCSRFAndMethod()` for mutation methods (POST, PUT, DELETE, PATCH).

3. **Read-Only Routes**: GET, HEAD, and OPTIONS methods don't require CSRF protection (they're idempotent).

4. **Error Handling**: Use `createCSRFErrorResponse()` for consistent error responses.

5. **Environment Configuration**: Set `ALLOWED_ORIGINS` in production if using reverse proxies or CDNs.

### Security Notes

- **Origin Header Validation**: Primary protection mechanism. Compares Origin with Host/X-Forwarded-Host.
- **SameSite Cookies**: Browser default behavior provides additional protection.
- **Method Restriction**: Mutation methods (POST, PUT, DELETE, PATCH) require CSRF validation.
- **Safe Methods**: GET, HEAD, OPTIONS are idempotent and don't modify data, so they bypass CSRF checks.

### Testing

To test CSRF protection:

1. **Valid Request**: Same-origin POST with matching Origin header → Should succeed
2. **Invalid Origin**: Cross-origin POST with mismatched Origin → Should return 403
3. **Missing Origin**: POST without Origin header → Should return 403 (unless safe method)
4. **Wrong Method**: GET to POST-only endpoint → Should return 403

### Related Documentation

- `docs/CSRF_PROTECTION_AUDIT.md` - Comprehensive CSRF protection audit
- `docs/SECURITY_AUDIT_REPORT.md` - Overall security audit report
