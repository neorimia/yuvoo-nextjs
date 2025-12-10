# Zod Validation Schemas

This directory contains Zod schemas for input validation.

## Structure

- `auth.ts` - Authentication schemas (sign up, sign in)
- `children.ts` - Child profile schemas
- `quiz.ts` - Quiz answer schemas
- `clubs.ts` - Club creation/update schemas
- `doctors.ts` - Doctor profile schemas
- `bookings.ts` - Booking schemas
- `common.ts` - Common validation utilities

## Usage

```typescript
import { signUpSchema } from "@/lib/validations/auth";

// Validate input
const result = signUpSchema.safeParse(formData);
if (!result.success) {
  // Handle validation errors
  return { error: result.error.format() };
}
```
