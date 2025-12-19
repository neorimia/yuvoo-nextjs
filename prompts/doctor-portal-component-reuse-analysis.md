# Doctor Portal Component Reuse Analysis Prompt

━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
Analyze all components in `src/app/club` and `src/components/features/clubs` to identify reusable patterns and components that can be extracted as shared components for implementing the Doctor Portal Dashboard (P0-7 from NEXT_TASKS.md).

The analysis should:

1. Identify components that can be directly reused (with minimal or no changes)
2. Identify components that can be abstracted into shared components (with props/config)
3. Identify patterns that can be extracted into reusable utilities or hooks
4. Map club dashboard features to doctor portal requirements
5. Provide a prioritized list of shared components to create

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━
**Club Dashboard Structure** (`src/app/club/`):

- `/club/dashboard` - Overview page with profile completeness, verification status, booking statistics, recent activity
- `/club/profile` - Profile editing page with comprehensive form
- `/club/bookings` - Booking management page with list, filters, detail view, actions
- `/club/settings` - Settings page with email preferences and account settings

**Club Dashboard Components** (`src/components/features/clubs/`):

- `ClubDashboardContent.tsx` - Main dashboard orchestrator
- `ClubDashboardHeader.tsx` - Dashboard header with title and verification badge
- `ClubNotFoundState.tsx` - Empty state when club not found
- `ProfileCompletenessIndicator.tsx` - Progress indicator for profile completeness
- `BookingStatistics.tsx` - Statistics cards for booking counts
- `RecentActivityFeed.tsx` - Feed component for recent activity
- `ClubProfileEditForm.tsx` - Comprehensive profile editing form
- `ClubBookingList.tsx` - Booking list with filters
- `ClubBookingCard.tsx` - Individual booking card component
- `ClubBookingDetailModal.tsx` - Booking detail modal
- `ClubSettingsForm.tsx` - Settings form with email preferences

**Doctor Portal Requirements** (from NEXT_TASKS.md P0-7):

- Dashboard overview (`/doctor/dashboard`):
  - Profile completeness indicator
  - Verification status badge
  - Consultation statistics (total, pending, confirmed, completed)
  - Recent activity feed
- Consultation management (`/doctor/dashboard/consultations`):
  - List all consultations (filterable by status, date)
  - Consultation detail view with child profile info
  - Confirm/cancel consultation actions
  - Email notifications on status change
- Profile editing (`/doctor/dashboard/profile`):
  - Edit basic information (name, bio, specialties)
  - Update credentials and certifications
  - Edit availability and consultation fees
  - Manage profile photo (Cloudinary integration)
- Availability calendar (`/doctor/dashboard/availability`):
  - Weekly schedule editor
  - Block out unavailable times
  - Set recurring availability patterns
- Settings (`/doctor/dashboard/settings`):
  - Email notification preferences
  - Account settings

**Technical Context**:

- Framework: Next.js 16 with Cache Components ("use cache: private")
- Styling: Bootstrap 5.3.3 + SCSS
- Authentication: Stack Auth with role-based access
- Patterns: Server Components by default, Client Components when needed
- Routes: All routes defined in `@/lib/routes`
- Language: All user-facing content in Romanian

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

- Analyze ONLY components in `src/app/club` and `src/components/features/clubs`
- Do NOT analyze parent dashboard or other portal components
- Do NOT suggest creating new features beyond shared component extraction
- Do NOT modify existing club components in this analysis
- Focus on component structure, props, and patterns, not implementation details
- Consider only components that would benefit doctor portal implementation
- Prioritize high-reusability components over one-off patterns
- Account for domain differences (club vs doctor, booking vs consultation)

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
JSON schema matching this structure:

```json
{
  "summary": {
    "totalComponentsAnalyzed": number,
    "directlyReusable": number,
    "abstractableToShared": number,
    "patternsExtractable": number,
    "estimatedEffortSavings": "high" | "medium" | "low"
  },
  "directlyReusable": [
    {
      "componentName": string,
      "filePath": string,
      "reuseType": "exact" | "minimal-changes",
      "doctorPortalUsage": string,
      "requiredChanges": array of string | null,
      "effort": "low" | "medium" | "high"
    }
  ],
  "abstractableToShared": [
    {
      "componentName": string,
      "filePath": string,
      "abstractionStrategy": "props-based" | "composition" | "wrapper",
      "sharedComponentName": string,
      "suggestedLocation": string,
      "propsInterface": string (TypeScript interface),
      "doctorPortalUsage": string,
      "effort": "low" | "medium" | "high",
      "priority": "high" | "medium" | "low"
    }
  ],
  "patternsExtractable": [
    {
      "patternName": string,
      "patternType": "hook" | "utility" | "layout" | "form-pattern" | "list-pattern",
      "currentLocation": string,
      "suggestedLocation": string,
      "description": string,
      "doctorPortalUsage": string,
      "effort": "low" | "medium" | "high",
      "priority": "high" | "medium" | "low"
    }
  ],
  "featureMapping": {
    "dashboardOverview": {
      "clubComponents": array of string,
      "doctorRequirements": array of string,
      "reuseStrategy": string,
      "sharedComponentsNeeded": array of string
    },
    "consultationManagement": {
      "clubComponents": array of string,
      "doctorRequirements": array of string,
      "reuseStrategy": string,
      "sharedComponentsNeeded": array of string
    },
    "profileEditing": {
      "clubComponents": array of string,
      "doctorRequirements": array of string,
      "reuseStrategy": string,
      "sharedComponentsNeeded": array of string
    },
    "settings": {
      "clubComponents": array of string,
      "doctorRequirements": array of string,
      "reuseStrategy": string,
      "sharedComponentsNeeded": array of string
    }
  },
  "recommendations": {
    "highPriority": [
      {
        "action": string,
        "component": string,
        "reason": string,
        "estimatedEffort": string
      }
    ],
    "mediumPriority": [
      {
        "action": string,
        "component": string,
        "reason": string,
        "estimatedEffort": string
      }
    ],
    "lowPriority": [
      {
        "action": string,
        "component": string,
        "reason": string,
        "estimatedEffort": string
      }
    ]
  },
  "implementationPlan": {
    "phase1": {
      "description": string,
      "components": array of string,
      "estimatedDays": number
    },
    "phase2": {
      "description": string,
      "components": array of string,
      "estimatedDays": number
    },
    "phase3": {
      "description": string,
      "components": array of string,
      "estimatedDays": number
    }
  }
}
```

**Rules**:

- All arrays must be present (use empty array `[]` if no items)
- All string fields must be non-empty or `null`
- Use `null` for missing optional fields (never omit fields)
- Priority: "high" = blocks implementation, "medium" = significant time savings, "low" = nice to have
- Effort: "low" = < 2 hours, "medium" = 2-4 hours, "high" = > 4 hours

━━━━━━━━━━━━━━━━━━━━
ANALYSIS GUIDELINES
━━━━━━━━━━━━━━━━━━━━

1. **Read all club dashboard components** before analyzing
2. **Compare props and interfaces** to identify abstraction opportunities
3. **Look for repeated patterns** (headers, statistics cards, forms, lists, modals)
4. **Consider domain differences**:
   - Club vs Doctor (different data models)
   - Booking vs Consultation (similar but different terminology)
   - Profile fields (club has different fields than doctor)
5. **Evaluate reusability**:
   - Components with generic props = high reusability
   - Components with domain-specific logic = need abstraction
   - Components with similar structure = candidate for shared component
6. **Prioritize by impact**:
   - Components used in multiple places = high priority
   - Components with complex logic = high value to share
   - Components with similar UI patterns = medium priority

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━
**Example: Directly Reusable Component**

```json
{
  "componentName": "ProfileCompletenessIndicator",
  "filePath": "src/components/features/clubs/ProfileCompletenessIndicator.tsx",
  "reuseType": "exact",
  "doctorPortalUsage": "Display doctor profile completeness percentage",
  "requiredChanges": null,
  "effort": "low"
}
```

**Example: Abstractable Component**

```json
{
  "componentName": "BookingStatistics",
  "filePath": "src/components/features/clubs/BookingStatistics.tsx",
  "abstractionStrategy": "props-based",
  "sharedComponentName": "StatisticsCards",
  "suggestedLocation": "src/components/shared/StatisticsCards.tsx",
  "propsInterface": "interface StatisticsCardsProps { stats: Array<{ label: string; value: number; status: string }>; variant?: 'club' | 'doctor' }",
  "doctorPortalUsage": "Display consultation statistics (total, pending, confirmed, completed)",
  "effort": "medium",
  "priority": "high"
}
```

**Example: Extractable Pattern**

```json
{
  "patternName": "Dashboard Header Pattern",
  "patternType": "layout",
  "currentLocation": "ClubDashboardHeader.tsx",
  "suggestedLocation": "src/components/shared/DashboardHeader.tsx",
  "description": "Reusable header component with title, subtitle, icon, and verification badge",
  "doctorPortalUsage": "All doctor dashboard pages need consistent header styling",
  "effort": "low",
  "priority": "high"
}
```

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━

- This is an analysis task, NOT a code change task
- Do NOT modify any code files
- Do NOT create any new components
- Only analyze and provide recommendations
- Output should be JSON only (no code changes)

━━━━━━━━━━━━━━━━━━━━
TASK RESTATEMENT
━━━━━━━━━━━━━━━━━━━━
**Task**: Analyze club dashboard components to identify reusable patterns for doctor portal implementation.

**Constraints**:

- Only analyze `src/app/club` and `src/components/features/clubs`
- Do not modify code
- Focus on component reusability and abstraction opportunities
- Consider domain differences (club vs doctor)

**Output**: JSON schema with component analysis, reuse strategies, and implementation recommendations.

**Scope**: Component analysis and recommendations only, no implementation.
