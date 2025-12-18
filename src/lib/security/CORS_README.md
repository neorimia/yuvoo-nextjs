# CORS Configuration Guide

This guide explains how to configure CORS (Cross-Origin Resource Sharing) for API routes in the Yuvoo application.

## Overview

**By default, Next.js API routes are same-origin only** (no CORS headers). This is the most secure configuration. Only enable CORS for API routes that specifically need cross-origin access.

## When to Use CORS

Enable CORS only if:

- ✅ API route needs to be accessed from a different domain
- ✅ API route is used by external applications
- ✅ API route is used by mobile apps or desktop applications
- ✅ API route is used by third-party integrations

**Do NOT enable CORS if:**

- ❌ API route is only used by the same Next.js application
- ❌ API route is only used by Server Actions (same-origin)
- ❌ API route doesn't need cross-origin access

## Usage

### Basic Example

```typescript
import { handleCORS, addCORSHeaders } from "@/lib/security/cors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Handle preflight requests (OPTIONS)
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  // Create response
  const response = NextResponse.json({ data: "example" });

  // Add CORS headers
  return addCORSHeaders(response, request);
}
```

### With Custom Options

```typescript
import { handleCORS, createCORSResponse } from "@/lib/security/cors";

export async function POST(request: NextRequest) {
  // Handle preflight
  const corsResponse = handleCORS(request, {
    allowedOrigins: ["https://trusted-domain.com"],
    allowedMethods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    allowCredentials: true,
  });
  if (corsResponse) return corsResponse;

  // Create CORS-enabled response
  return createCORSResponse({ success: true }, request, {
    allowedOrigins: ["https://trusted-domain.com"],
    allowCredentials: true,
  });
}
```

### Error Responses

```typescript
import { handleCORS, createCORSErrorResponse } from "@/lib/security/cors";

export async function GET(request: NextRequest) {
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  try {
    // ... handler logic
  } catch (error) {
    return createCORSErrorResponse("An error occurred", request, {}, 500);
  }
}
```

## Configuration

### Environment Variables

**`ALLOWED_ORIGINS`** (optional): Comma-separated list of allowed origins

```bash
ALLOWED_ORIGINS=https://yuvoo.ro,https://www.yuvoo.ro,https://staging.yuvoo.ro
```

If not set, defaults to the current app URL from `NEXT_PUBLIC_APP_URL`.

### Default Settings

- **Allowed Methods**: `GET, POST, PUT, DELETE, PATCH, OPTIONS`
- **Allowed Headers**: `Content-Type, Authorization, X-Requested-With, Accept, Origin`
- **Max Age**: `86400` (24 hours)
- **Credentials**: `false` (set to `true` if cookies/auth needed)

## Security Best Practices

### 1. Never Use Wildcards in Production

❌ **DON'T**:

```typescript
allowedOrigins: ["*"]; // Insecure!
```

✅ **DO**:

```typescript
allowedOrigins: ["https://yourdomain.com", "https://www.yourdomain.com"];
```

### 2. Restrict Allowed Methods

Only allow methods your API actually uses:

```typescript
allowedMethods: ["GET", "POST"]; // Only if you use GET and POST
```

### 3. Restrict Allowed Headers

Only allow headers your API needs:

```typescript
allowedHeaders: ["Content-Type", "Authorization"]; // Only what you need
```

### 4. Use Credentials Carefully

Only enable credentials if absolutely necessary:

```typescript
allowCredentials: true; // Only if you need cookies/auth headers
```

### 5. Validate Origins

Always validate the origin against an allowlist:

```typescript
// ✅ Good - validates origin
const corsResponse = handleCORS(request, {
  allowedOrigins: ["https://trusted-domain.com"],
});

// ❌ Bad - no validation
response.headers.set("Access-Control-Allow-Origin", "*");
```

## Preflight Requests

Browsers send preflight (OPTIONS) requests for:

- Non-simple requests (PUT, DELETE, PATCH)
- Requests with custom headers
- Requests with credentials

The `handleCORS` function automatically handles preflight requests:

```typescript
export async function OPTIONS(request: NextRequest) {
  return handleCORS(request) || new NextResponse(null, { status: 200 });
}

export async function POST(request: NextRequest) {
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  // ... handler logic
}
```

## Testing CORS

### Test Preflight Request

```bash
curl -X OPTIONS https://your-domain.com/api/endpoint \
  -H "Origin: https://trusted-domain.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**Expected Response**:

```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://trusted-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin
Access-Control-Max-Age: 86400
```

### Test Actual Request

```bash
curl -X POST https://your-domain.com/api/endpoint \
  -H "Origin: https://trusted-domain.com" \
  -H "Content-Type: application/json" \
  -d '{"data": "test"}' \
  -v
```

**Expected Response**:

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://trusted-domain.com
Content-Type: application/json
```

## Common Issues

### Issue: CORS Error in Browser

**Symptom**: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution**:

1. Check that the origin is in `allowedOrigins`
2. Verify `handleCORS` is called for preflight requests
3. Verify `addCORSHeaders` is called for actual requests

### Issue: Preflight Request Fails

**Symptom**: OPTIONS request returns 403 or missing CORS headers

**Solution**:

1. Ensure `handleCORS` is called for OPTIONS requests
2. Check that origin is in `allowedOrigins`
3. Verify allowed methods and headers match the request

### Issue: Credentials Not Working

**Symptom**: Cookies or auth headers not sent with CORS request

**Solution**:

1. Set `allowCredentials: true` in CORS options
2. Ensure origin is explicitly listed (not wildcard)
3. Check that client sets `credentials: 'include'` in fetch

## Related Documentation

- `docs/CORS_CONFIGURATION_AUDIT.md` - CORS security audit
- `src/lib/security/csrf.ts` - CSRF protection (related to CORS)
- `src/lib/security/README.md` - Security utilities overview
