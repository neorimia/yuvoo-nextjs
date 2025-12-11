# Prompting Rules for Code Generation

## Overview

This document defines the rules and patterns for generating code in the Yuvoo Next.js project. Follow these guidelines to ensure consistency, maintainability, and alignment with the project's architecture.

---

## 1. Next.js Structure & Patterns

### Framework Version

- **Next.js**: 16.0.8 with Cache Components enabled
- **React**: 19.2.1
- **App Router**: Use App Router patterns exclusively (no Pages Router)

### Cache Components (Next.js 16)

**CRITICAL**: Cache Components is enabled. Follow these rules:

1. **Server Components by Default**
   - All components are Server Components unless they need interactivity
   - Use `"use client"` only when necessary (hooks, event handlers, browser APIs)

2. **Caching Strategy**
   - Use `"use cache"` for cacheable content (must be async functions)
   - Use `"use cache: private"` for user-specific prefetchable content
   - Dynamic content by default - no need to opt-out

3. **Route Segment Config**
   - ❌ **DO NOT** use `export const dynamic`, `export const revalidate`, etc.
   - ✅ Use `"use cache"` + `cacheLife()` for caching
   - ✅ Use `<Suspense>` boundaries for dynamic content
   - ✅ Use `generateStaticParams()` for dynamic routes (must return at least one value)

4. **Dynamic Routes**
   - All dynamic routes MUST have `generateStaticParams()` function
   - Return at least one static param (even if placeholder)
   - Example:
     ```typescript
     export async function generateStaticParams() {
       return [{ slug: "example" }]; // TODO: Replace with real data
     }
     ```

5. **Async Params**
   - Always await params: `const { slug } = await params;`
   - Params are Promise-based in Next.js 16

6. **Dynamic APIs (cookies, headers)**
   - Access `cookies()` or `headers()` at the top of page components that need dynamic rendering
   - Prevents prerender errors with Cache Components

### Component Structure

**Page Components** (`app/**/page.tsx`):

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title - Yuvoo",
  description: "Page description",
};

export default async function PageName() {
  // Server Component logic
  return <div>...</div>;
}
```

**Layout Components** (`app/**/layout.tsx`):

```typescript
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

**Server Actions** (`app/actions/**/*.ts`):

```typescript
"use server";

import { z } from "zod";
import { requireAuth } from "@/lib/auth/session";

export async function actionName(input: z.infer<typeof schema>) {
  const session = await requireAuth();
  // Validation, business logic, database operations
  return { success: true, data: result };
}
```

---

## 2. CSS & Styling Approach

### Hybrid Approach

- **Existing Components**: Bootstrap 5.3.3 + SCSS (keep as-is)
- **New Components**: Tailwind CSS (preferred)
- **Gradual Migration**: Migrate from Bootstrap to Tailwind over time

### Tailwind CSS (New Components)

- Use utility classes: `className="flex items-center gap-4"`
- Use `@apply` in SCSS for complex patterns
- Follow Tailwind design system patterns

### Bootstrap (Existing Components)

- Keep existing Bootstrap classes
- Use Bootstrap grid system: `container`, `row`, `col-*`
- Maintain SCSS files in `src/scss/`

### Component Styling Rules

- ✅ Use Tailwind for new components
- ✅ Keep Bootstrap for existing components
- ✅ Use CSS modules for component-specific styles if needed
- ❌ Avoid inline styles (except for dynamic values)
- ❌ Don't mix Bootstrap and Tailwind in the same component unnecessarily

---

## 3. File Naming Conventions

### Files & Directories

- **Components**: PascalCase - `ClubDetailsMain.tsx`
- **Pages**: lowercase - `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- **Server Actions**: camelCase - `createBooking.ts`
- **Services**: camelCase with suffix - `clubs.service.ts`
- **Types**: camelCase with suffix - `clubs.types.ts`
- **Utilities**: camelCase - `formatDate.ts`
- **Constants**: UPPER_SNAKE_CASE - `API_ENDPOINTS.ts`

### Route Groups

- Use parentheses for route groups: `(public)`, `(auth)`, `(marketing)`
- Route groups don't appear in URL

### Dynamic Routes

- Use brackets: `[slug]`, `[id]`
- Always include `generateStaticParams()` for Cache Components

---

## 4. Error Handling & Validation

### Validation Pattern

- **Zod Schemas**: All user input validated with Zod
- **Location**: `lib/validations/`
- **Type Safety**: Use `z.infer<typeof schema>` for types

```typescript
import { z } from "zod";

const createClubSchema = z.object({
  name: z.string().min(1, "Numele este obligatoriu"),
  slug: z.string().min(1),
});

export async function createClub(input: z.infer<typeof createClubSchema>) {
  const validated = createClubSchema.parse(input);
  // ...
}
```

### Error Handling Pattern

- **Server Actions**: Return `{ success: boolean, data?: T, error?: string }`
- **Try-Catch**: Always wrap async operations
- **User-Friendly Messages**: Romanian error messages

```typescript
export async function actionName(input: InputType) {
  try {
    // Validation
    const validated = schema.parse(input);

    // Business logic
    const result = await service.method(validated);

    return { success: true, data: result };
  } catch (error) {
    console.error("Error in actionName:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare necunoscută",
    };
  }
}
```

### Error Pages

- Create `error.tsx` for route-level error boundaries
- Create `not-found.tsx` for 404 pages
- Use Romanian error messages

---

## 5. TypeScript Patterns

### Type Definitions

- **Feature Types**: `modules/{feature}/{feature}.types.ts`
- **Global Types**: `types/custom-interface.ts`
- **No `any` Types**: Use proper types or `unknown`

### Type Imports

- Use path aliases: `@/lib/types`, `@/modules/clubs/clubs.types`
- Import types, not values: `import type { Club } from "..."`

### Interface Naming

- Use PascalCase: `Club`, `Booking`, `User`
- Props interfaces: `ClubCardProps`, `BookingFormProps`
- Use `interface` for object shapes, `type` for unions/intersections

---

## 6. Language & Localization

### Romanian Language (Required)

- **All User-Facing Text**: Must be in Romanian
- **SEO-Friendly Routes**: Use Romanian paths (`/cluburi`, `/doctori`)
- **Error Messages**: Romanian
- **Form Labels**: Romanian
- **Button Text**: Romanian

### Route Naming

- Public routes: Romanian (`/cluburi`, `/sporturi`, `/doctori`)
- Internal routes: English OK (`/parent/dashboard`, `/auth/login`)
- API routes: English (`/api/clubs`, `/api/bookings`)

### Code Comments

- English for technical comments
- Romanian for business logic explanations (optional)

---

## 7. Directory Structure

### App Router Structure

```
app/
├── (public)/          # Public pages (no auth)
│   ├── cluburi/
│   ├── doctori/
│   └── sporturi/
├── (auth)/            # Protected routes
│   └── parent/
├── (marketing)/       # Marketing pages
├── api/               # API routes
└── actions/           # Server Actions
```

### Components Structure

```
components/
├── features/          # Feature-specific components
│   └── clubs/
├── ui/                # Reusable UI components
├── forms/             # Form components
├── layout/            # Layout components
└── shared/            # Shared utilities
```

### Modules Structure (Service Layer)

```
modules/
├── clubs/
│   ├── clubs.service.ts
│   ├── clubs.repository.ts
│   ├── clubs.types.ts
│   └── clubs.search.ts
```

---

## 8. Code Generation Checklist

When generating new code, ensure:

- [ ] **Next.js 16 Patterns**: Using Cache Components correctly
- [ ] **Server Components**: Default to Server Components
- [ ] **TypeScript**: Proper types, no `any`
- [ ] **Validation**: Zod schemas for inputs
- [ ] **Error Handling**: Try-catch with user-friendly messages
- [ ] **Romanian Text**: All user-facing text in Romanian
- [ ] **File Naming**: Following conventions
- [ ] **Directory Structure**: Placed in correct location
- [ ] **Styling**: Tailwind for new, Bootstrap for existing
- [ ] **Dynamic Routes**: Include `generateStaticParams()` if needed
- [ ] **Async Params**: Await params in Next.js 16
- [ ] **Cache Strategy**: Use `"use cache"` for cacheable content (async functions)

---

## 9. Common Patterns

### Server Component with Data Fetching

```typescript
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

### Client Component with Interactivity

```typescript
"use client";

export function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={handleClick}>Click</button>;
}
```

### Server Action with Validation

```typescript
"use server";

export async function createItem(formData: FormData) {
  const session = await requireAuth();
  const validated = schema.parse(Object.fromEntries(formData));
  // ...
}
```

### Cached Component (Cache Components)

```typescript
"use cache";
// import { cacheLife } from "next/cache";

export default async function CachedComponent() {
  // cacheLife('hours') - uncomment and configure as needed
  return <div>Cached content</div>;
}
```

### Dynamic Route with generateStaticParams

```typescript
export async function generateStaticParams() {
  // TODO: Replace with real data fetching
  return [{ slug: "example" }];
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  return <div>{slug}</div>;
}
```

---

## 10. Anti-Patterns to Avoid

❌ **Don't**:

- Use `export const dynamic = "force-dynamic"` (removed in Cache Components)
- Use `export const revalidate` (use `cacheLife()` instead)
- Use `unstable_noStore()` (dynamic by default)
- Mix Bootstrap and Tailwind unnecessarily
- Use `any` types
- Create client components when server components suffice
- Forget `generateStaticParams()` for dynamic routes
- Use sync params (always await in Next.js 16)
- Create non-async functions with `"use cache"`

✅ **Do**:

- Use `"use cache"` for cacheable content (async functions)
- Use `<Suspense>` for dynamic content
- Use `generateStaticParams()` for all dynamic routes
- Await params: `const { slug } = await params;`
- Access `cookies()`/`headers()` at top for dynamic pages
- Use Server Components by default
- Validate with Zod
- Use Romanian for user-facing text
- Follow file naming conventions

---

## Summary

**Key Principles**:

1. **Next.js 16 Cache Components**: Dynamic by default, opt-in to caching
2. **Server Components First**: Only use client components when needed
3. **Type Safety**: Full TypeScript with Zod validation
4. **Romanian Language**: All user-facing content in Romanian
5. **Hybrid Styling**: Tailwind for new, Bootstrap for existing
6. **Service Layer**: Business logic in `modules/`, actions in `app/actions/`
7. **Error Handling**: Consistent error response format
8. **File Naming**: Follow established conventions

Follow these rules to ensure code consistency and maintainability across the Yuvoo project.
