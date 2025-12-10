# Modules - Service Layer

This directory contains the backend business logic organized by feature domain.

## Structure Pattern

Each module follows a consistent structure:

```
modules/
├── {feature}/
│   ├── {feature}.service.ts      # Business logic
│   ├── {feature}.repository.ts  # Data access layer
│   ├── {feature}.types.ts        # TypeScript types
│   └── README.md                 # Module documentation
```

## Module Responsibilities

### Service Layer (`*.service.ts`)

- Business logic and validation
- Orchestrates repository calls
- Handles complex operations
- Integrates with external services (AI, email, etc.)
- Returns domain models

### Repository Layer (`*.repository.ts`)

- Direct database access via Drizzle ORM
- CRUD operations
- Query building
- Data transformation (DB → Domain)
- No business logic

### Types (`*.types.ts`)

- Domain models
- Input/output types
- Service interfaces
- Error types

## Module List

- **auth/** - Authentication and authorization
- **children/** - Child profile management
- **quiz/** - AI Coach Quiz logic and recommendations
- **clubs/** - Sports club operations and search
- **doctors/** - Pediatric specialist operations
- **bookings/** - Trial bookings and consultations
- **favorites/** - Saved clubs and doctors

## Usage Pattern

```typescript
// In Server Actions (app/actions/)
import { clubsService } from "@/modules/clubs/clubs.service";

export async function getClubDetails(slug: string) {
  return await clubsService.getBySlug(slug);
}
```

## Best Practices

1. **Separation of Concerns**: Services contain business logic, repositories handle data access
2. **Type Safety**: Use TypeScript types from `*.types.ts`
3. **Error Handling**: Services throw domain-specific errors
4. **Validation**: Use Zod schemas from `lib/validations/`
5. **Testing**: Services and repositories should be easily testable
