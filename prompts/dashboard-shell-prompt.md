# Dashboard Shell with Custom Navigation - Implementation Prompt

━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
Create a reusable Dashboard shell component with custom navigation menus for each user role (parent, club_admin, doctor, admin). The shell should:

1. Provide a consistent layout structure (header, sidebar navigation, main content area)
2. Display role-specific navigation menus based on authenticated user's role
3. Handle authentication and role verification
4. Support responsive design (desktop sidebar, mobile hamburger menu)
5. Include user profile section and logout functionality

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

- **User Roles**: `parent`, `club_admin`, `doctor`, `admin` (defined in `src/modules/auth/auth.types.ts`)
- **Authentication**: Stack Auth with `requireAuth()` from `@/lib/auth/session`
- **Routes**: All routes defined in `src/lib/routes.ts`:
  - Parent: `/parent/dashboard`, `/parent/children`, `/parent/bookings`, `/parent/saved`, `/parent/settings`, `/parent/profile`
  - Club: `/club/dashboard`, `/club/profile`, `/club/classes`, `/club/bookings`, `/club/settings`
  - Doctor: `/doctor/dashboard`, `/doctor/profile`, `/doctor/bookings`, `/doctor/settings`
  - Admin: `/admin/dashboard`, `/admin/users`, `/admin/clubs`, `/admin/doctors`, `/admin/verifications`
- **Existing Dashboards**:
  - `src/app/parent/dashboard/page.tsx` - Parent dashboard page (no shell)
  - `src/app/club/dashboard/page.tsx` - Club dashboard page (no shell)
- **Styling**: Bootstrap 5.3.3 + SCSS (import from `@/styles/globals.scss`)
- **Framework**: Next.js 16 with App Router, Server Components by default
- **Language**: All user-facing text MUST be in Romanian
- **Layout Pattern**: Use Bootstrap grid system and existing component patterns

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

- **Navigation Structure**:
  - Desktop: Fixed or sticky sidebar navigation (left side)
  - Mobile: Hamburger menu that toggles sidebar overlay
  - Active route highlighting based on current pathname
  - Icons for each navigation item (use Bootstrap Icons or similar)
- **Role-Specific Menus**:
  - Parent menu: Dashboard, Copii, Rezervări, Salvate, Setări, Profil
  - Club menu: Dashboard, Profil, Clase, Rezervări, Setări
  - Doctor menu: Dashboard, Profil, Rezervări, Setări
  - Admin menu: Dashboard, Utilizatori, Cluburi, Doctori, Verificări
- **User Profile Section**:
  - Display user name and email
  - Logout button (use Stack Auth signOut)
  - Link to profile/settings page
- **Layout Requirements**:
  - Header with logo and user profile dropdown
  - Sidebar navigation (collapsible on mobile)
  - Main content area with proper padding
  - Footer optional (can reuse existing footer component)
- **Technical Constraints**:
  - Server Component by default (use `"use client"` only for interactive parts like mobile menu toggle)
  - Use `requireAuth()` to ensure authentication
  - Verify user role matches expected role for route group
  - Use `@/lib/routes` for all navigation links (NEVER hardcode paths)
  - Follow Next.js 16 Cache Components pattern if needed (`"use cache: private"` for user-specific data)
- **DO NOT**:
  - Do NOT create separate shell components for each role (use one component with role-based menu configuration)
  - Do NOT modify existing dashboard page implementations unless explicitly required
  - Do NOT create new route groups or modify route structure
  - Do NOT add features beyond navigation shell (keep it focused on layout and navigation)
  - Do NOT use external navigation libraries (use Bootstrap components)
  - Do NOT hardcode any routes (always use `@/lib/routes`)

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
**File Structure**:

1. `src/components/layout/DashboardShell.tsx` - Main shell component (Server Component)
2. `src/components/layout/DashboardSidebar.tsx` - Sidebar navigation component (Client Component for interactivity)
3. `src/components/layout/DashboardHeader.tsx` - Header with user profile (Client Component)
4. `src/lib/dashboard-navigation.ts` - Navigation menu configuration (TypeScript constants)

**Component Structure**:

```typescript
// DashboardShell.tsx (Server Component)
export default async function DashboardShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role: UserRole;
}) {
  // Authentication check
  // Role verification
  // Render shell with sidebar and header
}

// DashboardSidebar.tsx (Client Component)
("use client");
export function DashboardSidebar({ role, currentPath }: { role: UserRole; currentPath: string }) {
  // Render role-specific navigation menu
  // Handle mobile menu toggle
}

// DashboardHeader.tsx (Client Component)
("use client");
export function DashboardHeader({ user }: { user: AuthUser }) {
  // Render header with logo, user profile dropdown, logout
}
```

**Navigation Configuration**:

```typescript
// src/lib/dashboard-navigation.ts
export const dashboardNavigation = {
  parent: [
    { label: "Dashboard", href: routes.parent.dashboard, icon: "bi-house" },
    { label: "Copii", href: routes.parent.children.list, icon: "bi-people" },
    // ... more items
  ],
  club_admin: [
    /* ... */
  ],
  doctor: [
    /* ... */
  ],
  admin: [
    /* ... */
  ],
};
```

**Implementation Steps**:

1. Create navigation configuration file with role-specific menus
2. Create DashboardSidebar component (Client Component for mobile toggle)
3. Create DashboardHeader component (Client Component for user dropdown)
4. Create DashboardShell component (Server Component wrapper)
5. Update dashboard layout files to use DashboardShell
6. Add Romanian labels for all navigation items
7. Style with Bootstrap classes and custom SCSS if needed

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━

- Use minimal diffs: only create new files, don't modify existing dashboard pages unless needed
- Preserve existing code style and patterns (Bootstrap classes, SCSS imports)
- Do NOT refactor unrelated code
- Follow existing TypeScript/React patterns in the codebase
- Use existing utility functions when available (`requireAuth`, `getCurrentUser`)
- Maintain backward compatibility: existing dashboard pages should still work
- Add type safety: use existing types (`UserRole`, `AuthUser` from `@/modules/auth/auth.types`)
- Error handling: follow existing error handling patterns (redirect on auth failure)
- Import patterns: use `@/*` path alias consistently
- Component organization: place in `src/components/layout/` directory

━━━━━━━━━━━━━━━━━━━━
STYLING GUIDELINES
━━━━━━━━━━━━━━━━━━━━

- **Sidebar**:
  - Width: 250-280px on desktop
  - Background: Light gray or white with shadow
  - Sticky or fixed positioning
  - Collapsible on mobile (overlay or slide-in)
- **Navigation Items**:
  - Active state: Highlight with primary color
  - Hover state: Subtle background change
  - Icons: Left-aligned, consistent size (16-20px)
  - Spacing: Comfortable padding (12-16px vertical)
- **Header**:
  - Height: 60-70px
  - Logo on left, user profile on right
  - Shadow or border-bottom for separation
- **Responsive**:
  - Mobile: Hamburger menu icon, sidebar as overlay
  - Tablet: Collapsible sidebar or always visible
  - Desktop: Always visible sidebar
- **Bootstrap Classes**: Use Bootstrap utility classes for spacing, colors, shadows
- **Custom SCSS**: Add to `public/assets/scss/layout/_dashboard.scss` if needed

━━━━━━━━━━━━━━━━━━━━
ROMANIAN TEXT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━
All navigation labels and UI text MUST be in Romanian:

- **Parent Menu**: Dashboard, Copii, Rezervări, Salvate, Setări, Profil
- **Club Menu**: Dashboard, Profil, Clase, Rezervări, Setări
- **Doctor Menu**: Dashboard, Profil, Rezervări, Setări
- **Admin Menu**: Dashboard, Utilizatori, Cluburi, Doctori, Verificări
- **Common**: Deconectare (Logout), Profil (Profile), Setări (Settings)

━━━━━━━━━━━━━━━━━━━━
TESTING CHECKLIST
━━━━━━━━━━━━━━━━━━━━
After implementation, verify:

- [ ] Authentication: Unauthenticated users redirected to login
- [ ] Role verification: Users can only access their role's dashboard
- [ ] Navigation: All menu items link to correct routes
- [ ] Active state: Current route highlighted in navigation
- [ ] Responsive: Mobile menu works correctly
- [ ] User profile: Name and email displayed correctly
- [ ] Logout: Sign out functionality works
- [ ] Romanian text: All labels in Romanian
- [ ] Styling: Consistent with Bootstrap theme
- [ ] Performance: No unnecessary re-renders

━━━━━━━━━━━━━━━━━━━━
RELATED FILES TO REVIEW
━━━━━━━━━━━━━━━━━━━━
Before implementation, review:

- `src/lib/routes.ts` - All route definitions
- `src/modules/auth/auth.types.ts` - UserRole and AuthUser types
- `src/lib/auth/session.ts` - requireAuth() and getSession() functions
- `src/app/parent/dashboard/page.tsx` - Example dashboard page structure
- `src/app/club/dashboard/page.tsx` - Example dashboard page structure
- `src/layouts/Header/HeaderOne.tsx` - Existing header patterns
- `docs/COMPONENTS_GUIDE.md` - Component patterns and styling guidelines
- `docs/COPY_LIBRARY.md` - Romanian text for navigation labels

━━━━━━━━━━━━━━━━━━━━
SUCCESS CRITERIA
━━━━━━━━━━━━━━━━━━━━
The implementation is successful when:

1. ✅ Dashboard shell component created and reusable
2. ✅ Role-specific navigation menus display correctly
3. ✅ Authentication and role verification working
4. ✅ Responsive design (desktop sidebar, mobile menu)
5. ✅ User profile section with logout functional
6. ✅ All text in Romanian
7. ✅ Navigation links use routes from `@/lib/routes`
8. ✅ Existing dashboard pages can be wrapped with shell
9. ✅ Bootstrap styling consistent with theme
10. ✅ No TypeScript or linting errors
