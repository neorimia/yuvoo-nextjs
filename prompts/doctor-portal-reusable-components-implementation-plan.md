# Doctor Portal Reusable Components Implementation Plan

**Created**: Based on component reuse analysis  
**Purpose**: Extract shared components from club dashboard for doctor portal implementation  
**Estimated Total Effort**: 5 days (40 hours)  
**Priority**: P0-7 (Doctor Portal Dashboard)

---

## Executive Summary

This plan outlines the extraction of 6 high-priority shared components, 4 medium-priority components/patterns, and 2 low-priority utilities from the club dashboard to enable rapid doctor portal implementation. The analysis identified **high effort savings** with 16 components analyzed, 2 directly reusable, 8 abstractable, and 4 patterns extractable.

**Key Benefits**:

- **Consistency**: Unified UI patterns across club and doctor portals
- **Speed**: 40-50% faster doctor portal implementation
- **Maintainability**: Single source of truth for shared components
- **Quality**: Proven patterns from club portal

---

## Implementation Phases

### Phase 1: High-Priority Shared Components (2 days)

**Goal**: Extract components that provide immediate reuse value for doctor dashboard overview

#### 1.1 DashboardHeader Component

**Source**: `src/components/features/clubs/ClubDashboardHeader.tsx`  
**Target**: `src/components/shared/DashboardHeader.tsx`  
**Effort**: 1-2 hours  
**Priority**: High

**Tasks**:

- [x] Create `src/components/shared/DashboardHeader.tsx`
- [x] Extract header structure with title, subtitle, and verification badge
- [x] Add `variant?: 'club' | 'doctor'` prop for entity-specific styling
- [x] Add `entityName: string` prop (replaces `club.name`)
- [x] Add `verificationStatus` prop (replaces club-specific logic)
- [x] Update `ClubDashboardHeader.tsx` to use shared component
- [x] Add TypeScript interface with JSDoc comments
- [x] Test with club dashboard

**Props Interface**:

```typescript
interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  entityName: string;
  verificationStatus: "pending" | "in_review" | "approved" | "rejected";
  variant?: "club" | "doctor";
  className?: string;
}
```

**Acceptance Criteria**:

- ✅ Component renders correctly in club dashboard
- ✅ Props allow customization for doctor variant
- ✅ Verification badge displays correctly
- ✅ TypeScript types are strict and complete
- ✅ All user-facing text supports Romanian

---

#### 1.2 ProfileCompletenessIndicator (Shared)

**Source**: `src/components/features/clubs/ProfileCompletenessIndicator.tsx`  
**Target**: `src/components/shared/ProfileCompletenessIndicator.tsx`  
**Effort**: 1-2 hours  
**Priority**: High

**Tasks**:

- [x] Move component to `src/components/shared/`
- [x] Add `profileType?: 'club' | 'doctor'` prop
- [x] Add `editRoute: string` prop (replaces hardcoded `routes.club.profile`)
- [x] Update text to be generic (use `profileType` for context)
- [x] Update `ClubDashboardContent.tsx` to import from shared location
- [x] Add TypeScript interface with JSDoc comments
- [x] Test with club dashboard

**Props Interface**:

```typescript
interface ProfileCompletenessIndicatorProps {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
  profileType?: "club" | "doctor";
  editRoute: string;
}
```

**Acceptance Criteria**:

- ✅ Component works for both club and doctor profiles
- ✅ Edit route is configurable
- ✅ Progress bar and badges display correctly
- ✅ Missing fields list is accurate
- ✅ All text is in Romanian

---

#### 1.3 StatisticsCards Component

**Source**: `src/components/features/clubs/BookingStatistics.tsx`  
**Target**: `src/components/shared/StatisticsCards.tsx`  
**Effort**: 2-3 hours  
**Priority**: High

**Tasks**:

- [x] Create `src/components/shared/StatisticsCards.tsx`
- [x] Abstract booking-specific logic into generic stats array
- [x] Add `stats` prop: `Array<{ label: string; value: number; icon: string; variant: string }>`
- [x] Add optional `viewAllRoute?: string` and `viewAllLabel?: string` props
- [x] Extract Bootstrap card styling into reusable structure
- [x] Create `BookingStatistics.tsx` wrapper that uses `StatisticsCards`
- [x] Add TypeScript interface with JSDoc comments
- [x] Test with club dashboard

**Props Interface**:

```typescript
interface StatisticsCardsProps {
  stats: Array<{
    label: string;
    value: number;
    icon: string;
    variant: "total" | "pending" | "confirmed" | "completed" | "cancelled";
  }>;
  viewAllRoute?: string;
  viewAllLabel?: string;
  className?: string;
}
```

**Acceptance Criteria**:

- ✅ Component accepts generic stats array
- ✅ Card layout and styling is consistent
- ✅ Icons and variants display correctly
- ✅ Optional "View All" button works
- ✅ Club dashboard displays correctly

---

#### 1.4 BookingCard Component

**Source**: `src/components/features/clubs/ClubBookingCard.tsx`  
**Target**: `src/components/shared/BookingCard.tsx`  
**Effort**: 2-3 hours  
**Priority**: High

**Tasks**:

- [x] Create `src/components/shared/BookingCard.tsx`
- [x] Abstract booking-specific logic into generic props
- [x] Support both `club_trial` and `doctor_consultation` types
- [x] Extract status badge logic (will use shared utility from Phase 2)
- [x] Extract date formatting (will use shared utility from Phase 3)
- [x] Make child info optional (for consultations)
- [x] Create `ClubBookingCard.tsx` wrapper that uses `BookingCard`
- [x] Add TypeScript interface with JSDoc comments
- [x] Test with club bookings list

**Props Interface**:

```typescript
interface BookingCardProps {
  id: string;
  scheduledAt: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type: "club_trial" | "consultation";
  notes?: string;
  child?: {
    firstName: string;
    lastName: string;
    age: number;
  };
  onConfirm?: (id: string) => void;
  onCancel?: (id: string) => void;
  onComplete?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  isProcessing?: boolean;
}
```

**Acceptance Criteria**:

- ✅ Component works for both bookings and consultations
- ✅ Status badges display correctly
- ✅ Action buttons work as expected
- ✅ Date formatting is consistent
- ✅ Card layout is responsive

---

#### 1.5 BookingDetailModal Component

**Source**: `src/components/features/clubs/ClubBookingDetailModal.tsx`  
**Target**: `src/components/shared/BookingDetailModal.tsx`  
**Effort**: 2-3 hours  
**Priority**: High

**Tasks**:

- [x] Create `src/components/shared/BookingDetailModal.tsx`
- [x] Abstract booking-specific logic into generic props
- [x] Support both `club_trial` and `doctor_consultation` types
- [x] Extract status badge logic (will use shared utility from Phase 2)
- [x] Extract date formatting (will use shared utility from Phase 3)
- [x] Make child and parent info optional
- [x] Create `ClubBookingDetailModal.tsx` wrapper that uses `BookingDetailModal`
- [x] Add TypeScript interface with JSDoc comments
- [x] Test Bootstrap modal initialization and actions

**Props Interface**:

```typescript
interface BookingDetailModalProps {
  booking: Booking | null;
  child?: Child;
  parent?: AuthUser | null;
  onConfirm?: (id: string) => void;
  onCancel?: (id: string) => void;
  onComplete?: (id: string) => void;
  isProcessing?: boolean;
  type: "club_trial" | "consultation";
}
```

**Acceptance Criteria**:

- ✅ Modal opens/closes correctly
- ✅ All booking details display properly
- ✅ Child and parent info displays when available
- ✅ Action buttons work correctly
- ✅ Bootstrap modal integration is stable

---

#### 1.6 DashboardPageLayout Component

**Source**: Pattern from `src/app/club/dashboard/page.tsx`, `profile/page.tsx`, `bookings/page.tsx`, `settings/page.tsx`  
**Target**: `src/components/shared/DashboardPageLayout.tsx`  
**Effort**: 1-2 hours  
**Priority**: High

**Tasks**:

- [x] Create `src/components/shared/DashboardPageLayout.tsx`
- [x] Extract common layout pattern: header section + content section
- [x] Add props for icon, title, subtitle
- [x] Wrap content in consistent Bootstrap classes
- [x] Update all club dashboard pages to use shared layout
- [x] Add TypeScript interface with JSDoc comments
- [x] Test with all club dashboard pages

**Props Interface**:

```typescript
interface DashboardPageLayoutProps {
  icon?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}
```

**Acceptance Criteria**:

- ✅ Layout structure is consistent across all pages
- ✅ Header section is reusable
- ✅ Content wrapper uses correct Bootstrap classes
- ✅ All club dashboard pages use shared layout
- ✅ TypeScript types are complete

---

### Phase 2: Medium-Priority Components & Patterns (2 days)

**Goal**: Extract components and patterns for enhanced reusability

#### 2.1 RecentActivityFeed (Shared)

**Source**: `src/components/features/clubs/RecentActivityFeed.tsx`  
**Target**: `src/components/shared/RecentActivityFeed.tsx`  
**Effort**: 3-4 hours  
**Priority**: Medium

**Tasks**:

- [ ] Move component to `src/components/shared/`
- [ ] Make component generic with TypeScript generics
- [ ] Add `renderItem` prop for custom item rendering
- [ ] Add `getItemId` and `getItemDate` props for item access
- [ ] Add optional `title` and `emptyMessage` props
- [ ] Add optional `viewAllRoute` and `viewAllLabel` props
- [ ] Update `ClubDashboardContent.tsx` to use shared component
- [ ] Add TypeScript interface with JSDoc comments
- [ ] Test with club dashboard

**Props Interface**:

```typescript
interface RecentActivityFeedProps<T> {
  items: T[];
  title?: string;
  emptyMessage?: string;
  viewAllRoute?: string;
  viewAllLabel?: string;
  renderItem: (item: T) => React.ReactNode;
  getItemId: (item: T) => string;
  getItemDate: (item: T) => Date;
}
```

**Acceptance Criteria**:

- ✅ Component is generic and type-safe
- ✅ Custom rendering works correctly
- ✅ Empty state displays properly
- ✅ "View All" link works
- ✅ Club dashboard displays correctly

---

#### 2.2 useEntityFilters Hook

**Source**: Filter logic from `src/components/features/clubs/ClubBookingList.tsx`  
**Target**: `src/hooks/useEntityFilters.ts`  
**Effort**: 2-3 hours  
**Priority**: Medium

**Tasks**:

- [ ] Create `src/hooks/useEntityFilters.ts`
- [ ] Extract status filter state management
- [ ] Extract date filter state management
- [ ] Extract filtering logic (status + date)
- [ ] Add TypeScript generics for entity type
- [ ] Add `getStatus` and `getDate` accessor functions
- [ ] Update `ClubBookingList.tsx` to use hook
- [ ] Add JSDoc comments
- [ ] Test with club bookings list

**Hook Interface**:

```typescript
function useEntityFilters<T>(
  items: T[],
  getStatus: (item: T) => string,
  getDate: (item: T) => Date
): {
  statusFilter: string;
  dateFilter: string;
  filteredItems: T[];
  setStatusFilter: (filter: string) => void;
  setDateFilter: (filter: string) => void;
};
```

**Acceptance Criteria**:

- ✅ Hook manages filter state correctly
- ✅ Filtering logic works for status and date
- ✅ Club bookings list uses hook successfully
- ✅ TypeScript types are generic and safe
- ✅ No performance issues with large lists

---

#### 2.3 AccountSettingsForm Component

**Source**: `src/components/features/clubs/ClubSettingsForm.tsx`  
**Target**: `src/components/shared/AccountSettingsForm.tsx`  
**Effort**: 3-4 hours  
**Priority**: Medium

**Tasks**:

- [ ] Create `src/components/shared/AccountSettingsForm.tsx`
- [ ] Abstract account settings section (email, firstName, lastName, phone)
- [ ] Abstract email notification preferences section
- [ ] Add `notificationPreferencesConfig` prop for configurable notification types
- [ ] Add `onUpdate` prop for custom update handler
- [ ] Create `ClubSettingsForm.tsx` wrapper that uses `AccountSettingsForm`
- [ ] Add TypeScript interface with JSDoc comments
- [ ] Test with club settings page

**Props Interface**:

```typescript
interface AccountSettingsFormProps {
  initialData?: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    emailNotificationPreferences: EmailNotificationPreferences;
  };
  notificationPreferencesConfig: {
    [key: string]: {
      label: string;
      description: string;
    };
  };
  onUpdate: (data: UpdateSettingsInput) => Promise<{ success: boolean; error?: string }>;
}
```

**Acceptance Criteria**:

- ✅ Component is configurable for different notification types
- ✅ Account settings section works correctly
- ✅ Notification preferences are customizable
- ✅ Form validation works
- ✅ Club settings page displays correctly

---

#### 2.4 Status Badge Utility

**Source**: Status badge logic from `ClubBookingCard.tsx`, `ClubBookingDetailModal.tsx`, `RecentActivityFeed.tsx`  
**Target**: `src/lib/utils/status-badges.ts`  
**Effort**: 1 hour  
**Priority**: Medium

**Tasks**:

- [ ] Create `src/lib/utils/status-badges.ts`
- [ ] Extract status badge configuration function
- [ ] Return badge config: `{ label: string; class: string; icon?: string }`
- [ ] Support all statuses: `pending`, `confirmed`, `completed`, `cancelled`
- [ ] Update all components to use utility
- [ ] Add JSDoc comments
- [ ] Test with club components

**Utility Interface**:

```typescript
export function getStatusBadgeConfig(status: "pending" | "confirmed" | "completed" | "cancelled"): {
  label: string;
  class: string;
  icon?: string;
};
```

**Acceptance Criteria**:

- ✅ Utility returns correct badge config for all statuses
- ✅ All components use utility consistently
- ✅ Badge styling is consistent
- ✅ Romanian labels are correct
- ✅ No duplicate status badge logic

---

### Phase 3: Low-Priority Utilities (1 day)

**Goal**: Extract utilities for consistency and maintainability

#### 3.1 Date Formatting Utilities

**Source**: Date formatting from `ClubBookingCard.tsx`, `ClubBookingDetailModal.tsx`, `RecentActivityFeed.tsx`  
**Target**: `src/lib/utils/date-formatting.ts`  
**Effort**: 1 hour  
**Priority**: Low

**Tasks**:

- [ ] Create `src/lib/utils/date-formatting.ts`
- [ ] Extract `formatDate` function (Romanian locale, full date)
- [ ] Extract `formatTime` function (Romanian locale, time only)
- [ ] Extract `formatDateTime` function (Romanian locale, date + time)
- [ ] Update all components to use utilities
- [ ] Add JSDoc comments
- [ ] Test with club components

**Utility Interface**:

```typescript
export function formatDate(date: Date): string;
export function formatTime(date: Date): string;
export function formatDateTime(date: Date): string;
```

**Acceptance Criteria**:

- ✅ All date formatting uses Romanian locale
- ✅ All components use utilities consistently
- ✅ Date formats are consistent across app
- ✅ No duplicate date formatting logic

---

#### 3.2 EntityListWithFilters Component (Optional)

**Source**: `src/components/features/clubs/ClubBookingList.tsx`  
**Target**: `src/components/shared/EntityListWithFilters.tsx`  
**Effort**: 4-6 hours  
**Priority**: Low

**Tasks**:

- [ ] Evaluate if abstraction complexity is worth it
- [ ] If yes, create generic list component with filters
- [ ] Abstract filter UI, loading states, error states
- [ ] Add render props for item rendering
- [ ] Consider after initial doctor portal implementation

**Note**: This is marked as optional because the abstraction complexity may not be worth it. Consider implementing after doctor portal is working to see if the pattern is truly reusable.

---

## Migration Strategy

### Step 1: Create Shared Components (Phase 1)

1. Create all shared components in `src/components/shared/`
2. Implement with proper TypeScript interfaces
3. Add JSDoc comments for all props
4. Test components in isolation

### Step 2: Update Club Components (Phase 1)

1. Update club components to use shared components
2. Create wrapper components if needed (e.g., `BookingStatistics` → `StatisticsCards`)
3. Verify club dashboard still works correctly
4. Run tests and linting

### Step 3: Extract Patterns (Phase 2)

1. Create hooks and utilities
2. Update club components to use new patterns
3. Verify functionality is preserved
4. Document usage patterns

### Step 4: Doctor Portal Implementation

1. Use shared components in doctor portal
2. Create doctor-specific wrappers if needed
3. Verify doctor dashboard works correctly
4. Ensure consistency with club portal

---

## Testing Strategy

### Unit Testing

- [ ] Test each shared component in isolation
- [ ] Test props interfaces and TypeScript types
- [ ] Test edge cases (empty states, null values, etc.)

### Integration Testing

- [ ] Test club dashboard with shared components
- [ ] Verify all functionality is preserved
- [ ] Test doctor dashboard with shared components
- [ ] Verify consistency between portals

### Manual Testing Checklist

- [ ] Club dashboard overview displays correctly
- [ ] Club bookings list works correctly
- [ ] Club profile edit form works correctly
- [ ] Club settings form works correctly
- [ ] All shared components render correctly
- [ ] All user-facing text is in Romanian
- [ ] All routes use `@/lib/routes`
- [ ] Bootstrap styling is consistent

---

## File Structure After Implementation

```
src/
├── components/
│   ├── shared/
│   │   ├── DashboardHeader.tsx          # NEW
│   │   ├── ProfileCompletenessIndicator.tsx  # MOVED
│   │   ├── StatisticsCards.tsx          # NEW
│   │   ├── BookingCard.tsx              # NEW
│   │   ├── BookingDetailModal.tsx       # NEW
│   │   ├── DashboardPageLayout.tsx      # NEW
│   │   ├── RecentActivityFeed.tsx       # MOVED
│   │   └── AccountSettingsForm.tsx      # NEW
│   └── features/
│       └── clubs/
│           ├── ClubDashboardHeader.tsx  # UPDATED (uses shared)
│           ├── ProfileCompletenessIndicator.tsx  # REMOVED (moved to shared)
│           ├── BookingStatistics.tsx     # UPDATED (uses StatisticsCards)
│           ├── ClubBookingCard.tsx      # UPDATED (uses BookingCard)
│           ├── ClubBookingDetailModal.tsx  # UPDATED (uses BookingDetailModal)
│           ├── RecentActivityFeed.tsx   # REMOVED (moved to shared)
│           └── ClubSettingsForm.tsx     # UPDATED (uses AccountSettingsForm)
├── hooks/
│   └── useEntityFilters.ts             # NEW
└── lib/
    └── utils/
        ├── status-badges.ts            # NEW
        └── date-formatting.ts          # NEW
```

---

## Dependencies & Prerequisites

### Required

- ✅ Club dashboard components are working
- ✅ TypeScript strict mode is enabled
- ✅ Bootstrap 5.3.3 is available
- ✅ All routes are defined in `@/lib/routes`

### Optional

- Consider creating Storybook stories for shared components (future enhancement)
- Consider adding unit tests for shared components (future enhancement)

---

## Risk Mitigation

### Risk 1: Breaking Club Dashboard

**Mitigation**:

- Update club components incrementally
- Test after each component migration
- Keep wrapper components for backward compatibility

### Risk 2: Over-Abstraction

**Mitigation**:

- Start with high-priority components only
- Evaluate abstraction value before implementing
- Skip low-priority abstractions if complexity is too high

### Risk 3: TypeScript Complexity

**Mitigation**:

- Use TypeScript generics carefully
- Add comprehensive JSDoc comments
- Test type safety thoroughly

---

## Success Metrics

- ✅ All shared components are reusable for doctor portal
- ✅ Club dashboard functionality is preserved
- ✅ No duplicate code between club and doctor portals
- ✅ Consistent UI/UX across portals
- ✅ TypeScript types are strict and complete
- ✅ All user-facing text is in Romanian
- ✅ All routes use `@/lib/routes`
- ✅ Bootstrap styling is consistent

---

## Next Steps After Implementation

1. **Doctor Portal Implementation**: Use shared components to build doctor dashboard
2. **Documentation**: Update component documentation with usage examples
3. **Testing**: Add unit tests for shared components (future enhancement)
4. **Optimization**: Review and optimize shared components based on usage
5. **Expansion**: Consider extracting more patterns as needed

---

## Notes

- All components must follow Next.js 16 Cache Components patterns
- Server Components by default, Client Components only when needed
- All styling must use Bootstrap 5.3.3 (no Tailwind)
- All user-facing text must be in Romanian
- All routes must use `@/lib/routes` helper
- Follow service layer pattern (actions → services → repositories)

---

**Last Updated**: Based on component reuse analysis  
**Status**: Ready for implementation  
**Estimated Completion**: 5 days (40 hours)
