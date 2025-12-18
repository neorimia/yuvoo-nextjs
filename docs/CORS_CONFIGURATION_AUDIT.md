# CORS Configuration Audit

**Date**: January 2025  
**Auditor**: Security Review  
**Scope**: All API routes, CORS configuration, cross-origin access  
**Status**: ✅ Complete

---

## Executive Summary

The application follows security best practices for CORS configuration. **By default, Next.js API routes are same-origin only** (no CORS headers), which is the most secure configuration. A CORS utility has been created for future API routes that require cross-origin access, with proper security controls and validation.

**Key Findings:**

- ✅ **Default Security**: All API routes are same-origin only (no CORS by default)
- ✅ **CORS Utility Created**: `src/lib/security/cors.ts` provides secure CORS configuration
- ✅ **No Wildcards**: Utility prevents insecure wildcard origins
- ✅ **Origin Validation**: All origins are validated against allowlist
- ✅ **Preflight Handling**: Automatic handling of OPTIONS preflight requests
- ✅ **Documentation**: Comprehensive CORS guide and best practices

---

## Current API Routes

### Existing Routes

**Location**: `src/app/api/sentry-example-api/route.ts`

**Type**: GET handler (read-only)

**CORS Configuration**: ❌ **Not configured** (same-origin only)

**Status**: ✅ **Secure** - Read-only route, no CORS needed

**Analysis**: This route is for Sentry error monitoring testing. It doesn't need CORS as it's only accessed from the same origin.

### Planned Routes (from `lib/routes.ts`)

The following API routes are defined in the routes configuration but not yet implemented:

- `/api/auth/*` - Authentication routes
  - **CORS Recommendation**: ❌ **Same-origin only**
  - **Reason**: Stack Auth handles authentication internally, no external access needed
- `/api/quiz/*` - Quiz submission routes
  - **CORS Recommendation**: ❌ **Same-origin only**
  - **Reason**: Quiz submissions handled via Server Actions, no external API needed
- `/api/clubs/*` - Club management routes
  - **CORS Recommendation**: ❌ **Same-origin only** (for management)
  - **Exception**: If public read-only endpoints are added (e.g., `/api/clubs/public`), CORS may be needed
- `/api/doctors/*` - Doctor management routes
  - **CORS Recommendation**: ❌ **Same-origin only** (for management)
  - **Exception**: If public read-only endpoints are added (e.g., `/api/doctors/public`), CORS may be needed

**Recommendation**: Most of these routes should remain same-origin only. Only enable CORS if:

1. External applications need to access the API
2. Mobile apps need to consume the API
3. Third-party integrations require API access
4. Public read-only endpoints are exposed

**When implementing**: Document the decision in code comments and update this audit report.

---

## CORS Utility Implementation

### Location

**File**: `src/lib/security/cors.ts`

### Features

1. **Origin Validation**: Validates origins against allowlist
2. **Preflight Handling**: Automatic OPTIONS request handling
3. **Configurable Options**: Customizable allowed origins, methods, headers
4. **Security Defaults**: No wildcards, explicit allowlist required
5. **Environment Configuration**: Uses `ALLOWED_ORIGINS` env var

### Functions

#### `handleCORS(request, options)`

Handles preflight (OPTIONS) requests and returns CORS response.

**Returns**: `NextResponse` for preflight, `null` for regular requests

**Usage**:

```typescript
const corsResponse = handleCORS(request);
if (corsResponse) return corsResponse;
```

#### `addCORSHeaders(response, request, options)`

Adds CORS headers to a response.

**Usage**:

```typescript
const response = NextResponse.json({ data: "..." });
return addCORSHeaders(response, request);
```

#### `createCORSResponse(data, request, options, status)`

Creates a response with CORS headers.

**Usage**:

```typescript
return createCORSResponse({ success: true }, request);
```

#### `createCORSErrorResponse(error, request, options, status)`

Creates an error response with CORS headers.

**Usage**:

```typescript
return createCORSErrorResponse("Error message", request, {}, 400);
```

---

## Security Analysis

### ✅ Strengths

1. **Default Same-Origin**: Next.js API routes are same-origin only by default
2. **No Wildcards**: CORS utility prevents insecure wildcard origins
3. **Origin Validation**: All origins validated against explicit allowlist
4. **Preflight Handling**: Automatic handling of OPTIONS requests
5. **Configurable**: Environment variable support for allowed origins
6. **Documentation**: Comprehensive guide and best practices

### ⚠️ Considerations

1. **Future API Routes**: When adding new API routes, evaluate if CORS is needed
   - **Decision Tree**:
     - ✅ **Same-origin only** (default): Route used only by the Next.js app, Server Actions, or same-domain
     - ⚠️ **CORS needed**: Route accessed from external domains, mobile apps, or third-party integrations
     - **Examples**:
       - `/api/auth/*` → Same-origin only (Stack Auth handles auth internally)
       - `/api/webhooks/*` → CORS needed (external services call webhooks)
       - `/api/public/*` → CORS needed (public API for external consumers)
       - `/api/internal/*` → Same-origin only (internal use only)
2. **External Access**: Only enable CORS for routes that specifically need cross-origin access
   - Document the reason for enabling CORS in code comments
   - List allowed origins in environment variables, not hardcoded
   - Regularly review and audit CORS-enabled routes
3. **Credentials**: Use `allowCredentials: true` only when necessary (cookies/auth)
   - Only enable if the route needs to send/receive cookies or authentication headers
   - When enabled, origins must be explicitly listed (no wildcards)
   - Consider security implications of exposing credentials to cross-origin requests

---

## CORS Configuration Best Practices

### ✅ Implemented

1. **No Wildcards**: Utility prevents `*` origins
2. **Explicit Allowlist**: Origins must be explicitly listed
3. **Method Restriction**: Configurable allowed methods
4. **Header Restriction**: Configurable allowed headers
5. **Preflight Support**: Automatic OPTIONS handling
6. **Environment Configuration**: `ALLOWED_ORIGINS` env var support

### 📋 Recommendations

1. **Default to Same-Origin**: Only enable CORS when cross-origin access is required
2. **Restrict Methods**: Only allow HTTP methods your API uses
3. **Restrict Headers**: Only allow headers your API needs
4. **Use Credentials Carefully**: Only enable if cookies/auth are needed
5. **Regular Audits**: Review CORS configuration periodically

---

## Configuration

### Environment Variables

**`ALLOWED_ORIGINS`** (optional): Comma-separated list of allowed origins

```bash
ALLOWED_ORIGINS=https://yuvoo.ro,https://www.yuvoo.ro,https://staging.yuvoo.ro
```

**Default**: If not set, uses `NEXT_PUBLIC_APP_URL` or `http://localhost:3000`

### Default Settings

- **Allowed Methods**: `GET, POST, PUT, DELETE, PATCH, OPTIONS`
- **Allowed Headers**: `Content-Type, Authorization, X-Requested-With, Accept, Origin`
- **Max Age**: `86400` (24 hours)
- **Credentials**: `false` (disabled by default)

---

## Usage Examples

### Example 1: Public API (Read-Only)

```typescript
import { handleCORS, addCORSHeaders } from "@/lib/security/cors";

export async function GET(request: NextRequest) {
  // Handle preflight
  const corsResponse = handleCORS(request, {
    allowedOrigins: ["https://trusted-partner.com"],
    allowedMethods: ["GET", "OPTIONS"],
  });
  if (corsResponse) return corsResponse;

  // Create response
  const response = NextResponse.json({ data: "public data" });
  return addCORSHeaders(response, request, {
    allowedOrigins: ["https://trusted-partner.com"],
  });
}
```

### Example 2: Authenticated API (With Credentials)

```typescript
import { handleCORS, createCORSResponse } from "@/lib/security/cors";

export async function POST(request: NextRequest) {
  // Handle preflight
  const corsResponse = handleCORS(request, {
    allowedOrigins: ["https://trusted-app.com"],
    allowedMethods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    allowCredentials: true, // Enable for cookies/auth
  });
  if (corsResponse) return corsResponse;

  // Create CORS-enabled response
  return createCORSResponse({ success: true }, request, {
    allowedOrigins: ["https://trusted-app.com"],
    allowCredentials: true,
  });
}
```

### Example 3: Same-Origin Only (No CORS)

```typescript
// No CORS needed - same-origin only
export async function GET(request: NextRequest) {
  return NextResponse.json({ data: "same-origin only" });
}
```

---

## Testing CORS

### Test Preflight Request

```bash
curl -X OPTIONS https://your-domain.com/api/endpoint \
  -H "Origin: https://trusted-domain.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**Expected**: 204 No Content with CORS headers

### Test Actual Request

```bash
curl -X POST https://your-domain.com/api/endpoint \
  -H "Origin: https://trusted-domain.com" \
  -H "Content-Type: application/json" \
  -d '{"data": "test"}' \
  -v
```

**Expected**: 200 OK with CORS headers

### Test Invalid Origin

```bash
curl -X POST https://your-domain.com/api/endpoint \
  -H "Origin: https://malicious-site.com" \
  -H "Content-Type: application/json" \
  -d '{"data": "test"}' \
  -v
```

**Expected**: 403 Forbidden or missing CORS headers

---

## Comparison: CORS vs Same-Origin

| Feature         | Same-Origin (Default) | CORS Enabled                      |
| --------------- | --------------------- | --------------------------------- |
| Security        | ✅ Most secure        | ⚠️ Requires careful configuration |
| Use Case        | Same Next.js app      | External apps, mobile apps        |
| Configuration   | ✅ No config needed   | ⚠️ Requires explicit setup        |
| Risk Level      | ✅ Low                | ⚠️ Medium (if misconfigured)      |
| Recommended For | ✅ Most API routes    | ⚠️ Only when needed               |

**Recommendation**: Default to same-origin only. Only enable CORS when cross-origin access is specifically required.

---

## Summary

### Overall Status: ✅ **SECURE**

**Current Configuration**: ✅ **Same-origin only** (most secure)  
**CORS Utility**: ✅ **Created** (for future use)  
**Security Controls**: ✅ **Proper validation and restrictions**  
**Documentation**: ✅ **Comprehensive guide provided**

**Vulnerabilities Found**: None  
**Remaining Risks**: None identified

**Conclusion**: The application follows security best practices for CORS configuration. All API routes are same-origin only by default (most secure). A CORS utility has been created for future API routes that require cross-origin access, with proper security controls including origin validation, method/header restrictions, and preflight handling.

---

**Audit Completed**: January 2025  
**Reviewed By**: Security Team  
**Status**: ✅ Approved for Production
