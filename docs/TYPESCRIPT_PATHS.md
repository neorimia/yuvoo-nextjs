# TypeScript Path Aliases Configuration

This document describes the TypeScript path aliases configured for the Yuvoo project.

## Current Configuration

The project uses the standard Next.js path alias pattern:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Usage

All imports from the `src/` directory use the `@/` prefix:

```typescript
// Library imports
import { routes } from "@/lib/routes";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

// Module imports
import { clubsService } from "@/modules/clubs/clubs.service";
import { getClubBySlug } from "@/modules/clubs/clubs.service";

// Component imports
import ClubCard from "@/components/features/clubs/ClubCard";
import HeaderOne from "@/layouts/Header/HeaderOne";

// Action imports
import { getClubBySlugAction } from "@/app/actions/clubs";

// Type imports
import type { Club } from "@/modules/clubs/clubs.types";
import type { AuthUser } from "@/modules/auth/auth.types";
```

## Directory Structure

The `@/` alias maps to `src/`, so:

- `@/lib/*` → `src/lib/*`
- `@/components/*` → `src/components/*`
- `@/modules/*` → `src/modules/*`
- `@/app/*` → `src/app/*`
- `@/layouts/*` → `src/layouts/*`
- `@/types/*` → `src/types/*`
- `@/data/*` → `src/data/*`
- `@/hooks/*` → `src/hooks/*`

## Why Not Additional Aliases?

The current `@/*` pattern is:

- ✅ **Standard**: Follows Next.js conventions
- ✅ **Flexible**: Works for all directories under `src/`
- ✅ **Simple**: One alias to remember
- ✅ **Consistent**: All imports use the same pattern

Additional aliases like `@/lib/*`, `@/components/*` would be:

- ❌ **Redundant**: `@/lib/*` is the same as `@/lib/*` (already works)
- ❌ **Inconsistent**: Mixing `@/lib/*` and `@/components/*` with `@/modules/*`
- ❌ **Unnecessary**: No benefit over the current pattern

## Examples

### Correct Usage

```typescript
// ✅ Good - Using @/ alias
import { routes } from "@/lib/routes";
import ClubCard from "@/components/features/clubs/ClubCard";
import { getClubBySlug } from "@/modules/clubs/clubs.service";
```

### Incorrect Usage

```typescript
// ❌ Bad - Relative paths (harder to maintain)
import { routes } from "../../lib/routes";
import ClubCard from "../../components/features/clubs/ClubCard";

// ❌ Bad - Absolute paths from src (not configured)
import { routes } from "src/lib/routes";
```

## IDE Support

Most IDEs (VS Code, WebStorm, etc.) automatically recognize TypeScript path aliases when:

- `tsconfig.json` is properly configured (✅ done)
- TypeScript language server is running (usually automatic)

If imports aren't being recognized:

1. Restart the TypeScript language server
2. Reload the IDE window
3. Check that `tsconfig.json` is in the project root

## Next.js Configuration

Next.js automatically uses the `paths` configuration from `tsconfig.json` for:

- Type checking
- Module resolution
- Build process

No additional configuration needed in `next.config.js`.

## Best Practices

1. **Always use `@/` prefix** for imports from `src/`
2. **Use relative paths** only for files in the same directory or immediate parent
3. **Be consistent** - don't mix `@/` with relative paths for the same directory level
4. **Keep paths short** - use `@/` instead of deep relative paths like `../../../`

## Migration Notes

If you need to add additional aliases in the future (not recommended), you would add them like:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/lib/*": ["./src/lib/*"], // Optional, redundant
      "@/components/*": ["./src/components/*"] // Optional, redundant
    }
  }
}
```

However, this is **not recommended** as it adds complexity without benefit.
