# Parent Feature Implementation Plan: Onboarding to Dashboard

**Created**: January 2025  
**Based on**: Analysis of parent feature from onboarding to dashboard  
**Following**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)

---

## TASK RESTATEMENT

**Task**: Analyze the parent feature from onboarding to dashboard and create a comprehensive step-by-step plan to implement what is needed.

**Scope**:

- Parent onboarding flow (5 steps)
- Parent dashboard and all sub-pages
- Navigation and user flows
- Integration between onboarding completion and dashboard access

**Constraints**:

- All user-facing content MUST be in Romanian
- Use Next.js 16 Cache Components pattern
- Follow existing Bootstrap 5.3.3 + SCSS styling patterns
- Use shared components where possible (reuse from club/doctor portals)
- Maintain consistency with existing codebase patterns
- All Server Actions must use Zod validation
- All pages must have proper role-based access control

**Output Format**: Step-by-step implementation plan with:

- Current state analysis
- Gap identification
- Implementation phases
- Detailed tasks per phase
- Acceptance criteria
- Dependencies and prerequisites

---

## CURRENT STATE ANALYSIS

### ✅ What Exists (Complete)

1. **Parent Onboarding Flow** (5 steps) ✅
   - Step 1: Welcome page (`/onboarding/parent/welcome`) ✅
   - Step 2: Add child profile (`/onboarding/parent/add-child`) ✅
   - Step 3: Platform tour (`/onboarding/parent/tour`) ✅
   - Step 4: Quiz introduction (`/onboarding/parent/quiz-intro`) ✅
   - Step 5: Complete (`/onboarding/parent/complete`) ✅
   - Onboarding components: `OnboardingLayout`, `OnboardingProgress`, `OnboardingNavigation` ✅
   - localStorage persistence for form data ✅

2. **Parent Dashboard - Basic** ✅
   - Dashboard page (`/parent/dashboard`) ✅
   - Basic stats cards (children count, quizzes completed, recommendations received) ✅
   - Recent quiz activity display ✅
   - Next.js 16 Cache Components with private cache ✅
   - Role-based access control ✅

3. **Parent Layout & Navigation** ✅
   - Parent layout (`src/app/parent/layout.tsx`) ✅
   - DashboardShell integration ✅
   - Role-based redirects ✅
   - PostHog and Sentry integration ✅

4. **Routes Defined** ✅
   - All parent routes defined in `lib/routes.ts` ✅
   - Routes: dashboard, children (list/add/edit/detail/quizzes), savedItems, settings, profile, bookings, bookingsDetails ✅

### ⚠️ What Exists (Partial/Needs Enhancement)

1. **Parent Dashboard - Enhanced Features** ⚠️
   - Basic dashboard exists but lacks:
     - Recent bookings display
     - Quick actions section
     - Upcoming events/reminders
     - Profile completeness indicator
     - Getting started checklist for new parents

2. **Children Management** ⚠️
   - Children list page exists (`/parent/children`) ✅
   - Add child page exists (`/parent/children/add`) ✅
   - Edit child page exists (`/parent/children/${id}/edit`) ✅
   - Detail page exists (`/parent/children/${id}`) ✅
   - Quizzes page exists (`/parent/children/${id}/quizzes`) ✅
   - **Gap**: Need to verify all pages are fully functional and styled consistently

3. **Bookings Management** ⚠️
   - Bookings list page exists (`/parent/bookings`) ✅
   - Booking detail route defined (`/parent/bookings/${id}`) ✅
   - **Gap**: Booking detail page may not be implemented
   - **Gap**: Need to verify booking list is fully functional

4. **Saved Items** ⚠️
   - Route defined (`/parent/saved`) ✅
   - **Gap**: Page may not be implemented or may be incomplete

5. **Settings** ⚠️
   - Route defined (`/parent/settings`) ✅
   - **Gap**: Page may not be implemented or may be incomplete

6. **Profile** ⚠️
   - Route defined (`/parent/profile`) ✅
   - **Gap**: Page may not be implemented or may be incomplete

### ❌ What's Missing

1. **Onboarding Completion Flow**
   - Need to verify onboarding completion properly redirects to dashboard
   - Need to verify onboarding status check in parent layout works correctly
   - Need to verify "getting started" flow for new parents

2. **Dashboard Enhancements**
   - Recent bookings section
   - Quick actions (start quiz, add child, browse clubs)
   - Profile completeness indicator
   - Getting started checklist
   - Upcoming events/reminders

3. **Page Implementations**
   - Booking detail page (`/parent/bookings/${id}`) - may be missing
   - Saved items page (`/parent/saved`) - may be missing or incomplete
   - Settings page (`/parent/settings`) - may be missing or incomplete
   - Profile page (`/parent/profile`) - may be missing or incomplete

4. **Integration & Navigation**
   - Smooth transition from onboarding to dashboard
   - Dashboard navigation menu (if not in DashboardShell)
   - Breadcrumbs for nested pages
   - Empty states for all pages

---

## IMPLEMENTATION PLAN

### Phase 1: Audit & Verification (1-2 days)

**Goal**: Verify current state of all parent pages and identify exact gaps.

**Tasks**:

1. **Audit Existing Pages** (4 hours)
   - [ ] Verify all onboarding steps are complete and functional
   - [ ] Verify parent dashboard displays correctly with all data
   - [ ] Verify children management pages (list, add, edit, detail, quizzes)
   - [ ] Verify bookings list page
   - [ ] Check if booking detail page exists
   - [ ] Check if saved items page exists
   - [ ] Check if settings page exists
   - [ ] Check if profile page exists
   - [ ] Document findings in audit report

2. **Test Onboarding Flow** (2 hours)
   - [ ] Test complete onboarding flow from welcome to complete
   - [ ] Verify onboarding completion redirects to dashboard
   - [ ] Verify onboarding status check in parent layout
   - [ ] Test localStorage persistence during onboarding
   - [ ] Document any issues found

3. **Test Dashboard Access** (2 hours)
   - [ ] Test dashboard access after onboarding completion
   - [ ] Test dashboard access for existing parents
   - [ ] Verify role-based redirects work correctly
   - [ ] Test navigation between dashboard pages
   - [ ] Document any issues found

4. **Create Gap Analysis Document** (2 hours)
   - [ ] List all missing pages
   - [ ] List all incomplete pages
   - [ ] List all enhancement opportunities
   - [ ] Prioritize gaps by user impact

**Deliverable**: `docs/PARENT_FEATURE_AUDIT.md` with complete audit findings

---

### Phase 2: Complete Missing Pages (3-5 days)

**Goal**: Implement all missing parent pages with full functionality.

**Tasks**:

#### 2.1: Booking Detail Page (1 day)

**If missing, implement**:

- [ ] **Create Booking Detail Page** (`src/app/parent/bookings/[id]/page.tsx`)
  - Display full booking information
  - Show club/doctor details with links
  - Show child profile information
  - Display booking date, time, status
  - Show cancellation button (if status allows)
  - Display status history timeline
  - Use Next.js 16 Cache Components with private cache
  - Role-based access control

- [ ] **Create Booking Detail Component** (`src/components/features/bookings/ParentBookingDetail.tsx`)
  - Reusable booking detail display
  - Status badge display
  - Action buttons (cancel, reschedule if applicable)
  - All text in Romanian

- [ ] **Create Booking Actions** (if not exists in `src/app/actions/bookings.ts`)
  - `getParentBookingAction(id)` - Get booking by ID for parent
  - `cancelParentBookingAction(id, reason?)` - Cancel booking
  - Include PostHog tracking
  - Include cache revalidation

- [ ] **Add Validation Schema** (if not exists in `src/lib/validations/bookings.ts`)
  - `cancelBookingSchema` - Validation for cancellation reason

**Acceptance Criteria**:

- ✅ Booking detail page displays all booking information
- ✅ Cancellation flow works correctly
- ✅ Email notifications sent on cancellation
- ✅ All text in Romanian
- ✅ Responsive design
- ✅ Proper error handling

#### 2.2: Saved Items Page (1 day)

**If missing or incomplete, implement**:

- [ ] **Create Saved Items Page** (`src/app/parent/saved/page.tsx`)
  - Display saved clubs and doctors
  - Filter by type (clubs, doctors)
  - Remove from saved functionality
  - Empty state when no saved items
  - Use Next.js 16 Cache Components with private cache
  - Role-based access control

- [ ] **Create Saved Items Component** (`src/components/features/parent/SavedItemsList.tsx`)
  - Display saved clubs using ClubCard component
  - Display saved doctors using DoctorCard component
  - Remove from saved button for each item
  - Filter tabs (All, Clubs, Doctors)
  - All text in Romanian

- [ ] **Create Saved Items Actions** (if not exists in `src/app/actions/favorites.ts`)
  - `getSavedItemsAction()` - Get all saved items for parent
  - `removeFromSavedAction(itemId, itemType)` - Remove item from saved
  - Include PostHog tracking
  - Include cache revalidation

**Acceptance Criteria**:

- ✅ Saved items page displays all saved clubs and doctors
- ✅ Filter by type works correctly
- ✅ Remove from saved works correctly
- ✅ Empty state displays when no saved items
- ✅ All text in Romanian
- ✅ Responsive design

#### 2.3: Settings Page (1 day)

**If missing or incomplete, implement**:

- [ ] **Create Settings Page** (`src/app/parent/settings/page.tsx`)
  - Account settings section (name, email, phone)
  - Email notification preferences
  - Privacy settings
  - Account deletion option
  - Use Next.js 16 Cache Components with private cache
  - Role-based access control

- [ ] **Create Settings Form Component** (`src/components/features/parent/ParentSettingsForm.tsx`)
  - Use shared `AccountSettingsForm` component if applicable
  - Or create parent-specific settings form
  - React Hook Form with Zod validation
  - All text in Romanian

- [ ] **Create Settings Actions** (`src/app/actions/parent-settings.ts`)
  - `getParentSettingsAction()` - Get current settings
  - `updateParentSettingsAction(input)` - Update settings
  - Include PostHog tracking
  - Include cache revalidation

- [ ] **Add Validation Schema** (`src/lib/validations/parent-settings.ts`)
  - `parentSettingsUpdateSchema` - Validation for settings updates
  - `parentEmailNotificationPreferencesSchema` - Email preferences validation

**Acceptance Criteria**:

- ✅ Settings page displays all settings sections
- ✅ Account settings can be updated
- ✅ Email notification preferences work correctly
- ✅ All changes save correctly
- ✅ All text in Romanian
- ✅ Responsive design

#### 2.4: Profile Page (1 day)

**If missing or incomplete, implement**:

- [ ] **Create Profile Page** (`src/app/parent/profile/page.tsx`)
  - Display parent profile information
  - Edit profile functionality
  - Profile photo upload (if applicable)
  - Use Next.js 16 Cache Components with private cache
  - Role-based access control

- [ ] **Create Profile Form Component** (`src/components/features/parent/ParentProfileForm.tsx`)
  - Display and edit parent profile
  - React Hook Form with Zod validation
  - All text in Romanian

- [ ] **Create Profile Actions** (`src/app/actions/parent-profile.ts`)
  - `getParentProfileAction()` - Get parent profile
  - `updateParentProfileAction(input)` - Update profile
  - Include PostHog tracking
  - Include cache revalidation

- [ ] **Add Validation Schema** (`src/lib/validations/parent-profile.ts`)
  - `parentProfileUpdateSchema` - Validation for profile updates

**Acceptance Criteria**:

- ✅ Profile page displays all profile information
- ✅ Profile can be edited and saved
- ✅ All text in Romanian
- ✅ Responsive design

**Deliverable**: All missing pages implemented and functional

---

### Phase 3: Enhance Dashboard (2-3 days)

**Goal**: Enhance parent dashboard with additional features and better UX.

**Tasks**:

#### 3.1: Dashboard Enhancements (2 days)

- [ ] **Add Recent Bookings Section**
  - Display last 5 recent bookings
  - Show booking status badges
  - Link to booking detail page
  - Link to full bookings list
  - Empty state when no bookings

- [ ] **Add Quick Actions Section**
  - "Start Quiz" button (link to quiz intro)
  - "Add Child" button (link to add child page)
  - "Browse Clubs" button (link to clubs list)
  - "Browse Doctors" button (link to doctors list)
  - All actions styled as cards with icons

- [ ] **Add Profile Completeness Indicator**
  - Calculate profile completeness percentage
  - Show missing fields list
  - Link to profile/settings pages
  - Similar to club/doctor dashboard pattern

- [ ] **Add Getting Started Checklist** (for new parents)
  - Show checklist items:
    - Complete profile
    - Add first child
    - Complete first quiz
    - Book first trial/consultation
  - Check off completed items
  - Hide when all items completed

- [ ] **Add Upcoming Events/Reminders**
  - Display upcoming bookings (next 7 days)
  - Show booking date, time, club/doctor name
  - Link to booking detail
  - Empty state when no upcoming bookings

- [ ] **Update Dashboard Component** (`src/components/features/parent/ParentDashboardContent.tsx`)
  - Orchestrate all dashboard sections
  - Use shared components where possible
  - All text in Romanian

**Acceptance Criteria**:

- ✅ All new dashboard sections display correctly
- ✅ Quick actions link to correct pages
- ✅ Profile completeness calculates correctly
- ✅ Getting started checklist works for new parents
- ✅ Upcoming events display correctly
- ✅ All text in Romanian
- ✅ Responsive design
- ✅ Consistent with club/doctor dashboard patterns

#### 3.2: Dashboard Statistics Enhancement (1 day)

- [ ] **Enhance Statistics Cards**
  - Add more meaningful statistics:
    - Total bookings (all statuses)
    - Upcoming bookings count
    - Completed bookings count
    - Saved clubs/doctors count
  - Add visual improvements (icons, colors)
  - Add links to relevant pages

- [ ] **Add Activity Feed**
  - Recent activity across all features:
    - Quiz completions
    - Bookings created/updated
    - Children added
    - Items saved
  - Sort by date (most recent first)
  - Limit to last 10 activities
  - Use shared `RecentActivityFeed` component if applicable

**Acceptance Criteria**:

- ✅ Enhanced statistics display correctly
- ✅ Activity feed shows recent activities
- ✅ All links work correctly
- ✅ All text in Romanian

**Deliverable**: Enhanced parent dashboard with all new features

---

### Phase 4: Integration & Navigation (1-2 days)

**Goal**: Ensure smooth integration between onboarding and dashboard, and improve navigation.

**Tasks**:

#### 4.1: Onboarding to Dashboard Integration (1 day)

- [ ] **Verify Onboarding Completion Flow**
  - Test onboarding completion redirects to dashboard
  - Verify onboarding status is set correctly
  - Test that incomplete onboarding redirects to welcome page
  - Document any issues

- [ ] **Add Getting Started Flow**
  - Create "Getting Started" page (`/parent/getting-started`) if needed
  - Or add getting started section to dashboard
  - Guide new parents through first steps
  - Hide when parent has completed initial setup

- [ ] **Add Onboarding Skip Option** (if applicable)
  - Allow parents to skip onboarding and complete later
  - Store skip preference
  - Show "Complete Onboarding" prompt in dashboard

**Acceptance Criteria**:

- ✅ Onboarding completion redirects correctly
- ✅ Getting started flow works for new parents
- ✅ Skip option works if implemented
- ✅ All redirects work correctly

#### 4.2: Navigation Improvements (1 day)

- [ ] **Verify DashboardShell Navigation**
  - Check if DashboardShell has parent navigation menu
  - Verify all parent pages are accessible from navigation
  - Add missing navigation links if needed

- [ ] **Add Breadcrumbs** (if not in DashboardShell)
  - Add breadcrumb component for nested pages
  - Show breadcrumbs on:
    - Children detail/edit pages
    - Booking detail page
    - Child quizzes page
  - Use shared breadcrumb component if available

- [ ] **Add Empty States**
  - Create empty state components for:
    - No children
    - No bookings
    - No saved items
    - No quiz history
  - Include helpful CTAs in empty states
  - All text in Romanian

- [ ] **Improve Error Handling**
  - Add error boundaries for parent pages
  - Add proper error messages (Romanian)
  - Add retry mechanisms where applicable

**Acceptance Criteria**:

- ✅ Navigation works correctly from all pages
- ✅ Breadcrumbs display on nested pages
- ✅ Empty states display when appropriate
- ✅ Error handling works correctly
- ✅ All text in Romanian

**Deliverable**: Complete integration and navigation improvements

---

### Phase 5: Polish & Testing (1-2 days)

**Goal**: Polish all pages, ensure consistency, and complete testing.

**Tasks**:

#### 5.1: Styling & Consistency (1 day)

- [ ] **Verify Styling Consistency**
  - Check all pages use consistent Bootstrap classes
  - Verify SCSS styling matches design system
  - Ensure responsive design works on all pages
  - Fix any styling inconsistencies

- [ ] **Add Loading States**
  - Add loading skeletons for all data-fetching pages
  - Add loading spinners for form submissions
  - Use consistent loading patterns

- [ ] **Add Success/Error Messages**
  - Ensure all forms show success messages
  - Ensure all forms show error messages
  - Use BootstrapAlert component consistently
  - All messages in Romanian

#### 5.2: Testing (1 day)

- [ ] **Manual Testing Checklist**
  - [ ] Test complete onboarding flow
  - [ ] Test dashboard access after onboarding
  - [ ] Test all children management pages
  - [ ] Test bookings list and detail pages
  - [ ] Test saved items page
  - [ ] Test settings page
  - [ ] Test profile page
  - [ ] Test navigation between all pages
  - [ ] Test empty states
  - [ ] Test error handling
  - [ ] Test responsive design (mobile, tablet, desktop)

- [ ] **Documentation**
  - Update `docs/SITE_MAP.md` with parent routes
  - Update `memory-bank/progress.md` with completion status
  - Document any known issues or limitations

**Acceptance Criteria**:

- ✅ All pages styled consistently
- ✅ All functionality works correctly
- ✅ All tests pass
- ✅ Documentation updated

**Deliverable**: Fully polished and tested parent feature

---

## IMPLEMENTATION PRIORITIES

### Priority 1 (Critical - Must Have)

1. **Phase 1: Audit & Verification** - Understand current state
2. **Phase 2: Complete Missing Pages** - Booking detail, Saved items, Settings, Profile
3. **Phase 4.1: Onboarding to Dashboard Integration** - Ensure smooth flow

### Priority 2 (High - Should Have)

4. **Phase 3: Enhance Dashboard** - Better UX and more features
5. **Phase 4.2: Navigation Improvements** - Better navigation and empty states

### Priority 3 (Medium - Nice to Have)

6. **Phase 5: Polish & Testing** - Final polish and comprehensive testing

---

## DEPENDENCIES & PREREQUISITES

### Technical Dependencies

- Next.js 16 with Cache Components ✅
- Bootstrap 5.3.3 + SCSS ✅
- Stack Auth for authentication ✅
- Drizzle ORM for database ✅
- PostHog for analytics ✅
- Sentry for error tracking ✅

### Code Dependencies

- Shared components from club/doctor portals (if applicable)
- Existing Server Actions patterns
- Existing validation schemas
- Existing database schema

### Prerequisites

- Complete Phase 1 audit before starting implementation
- Verify all existing pages before enhancing
- Understand current codebase patterns

---

## ACCEPTANCE CRITERIA (Overall)

### Functional Requirements

- ✅ All parent pages are accessible and functional
- ✅ Onboarding flow completes and redirects to dashboard
- ✅ Dashboard displays all required information
- ✅ All CRUD operations work (children, bookings, saved items)
- ✅ Settings and profile can be updated
- ✅ All navigation works correctly

### Non-Functional Requirements

- ✅ All user-facing text in Romanian
- ✅ Consistent styling with design system
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Proper error handling
- ✅ Loading states for all async operations
- ✅ Empty states for all list pages
- ✅ Next.js 16 Cache Components pattern used
- ✅ Role-based access control enforced

### Quality Requirements

- ✅ Code follows existing patterns
- ✅ TypeScript types are correct
- ✅ Zod validation on all inputs
- ✅ PostHog tracking on key actions
- ✅ Proper cache revalidation
- ✅ No console errors or warnings

---

## ESTIMATED EFFORT

- **Phase 1**: 1-2 days (8-16 hours)
- **Phase 2**: 3-5 days (24-40 hours)
- **Phase 3**: 2-3 days (16-24 hours)
- **Phase 4**: 1-2 days (8-16 hours)
- **Phase 5**: 1-2 days (8-16 hours)

**Total**: 8-14 days (64-112 hours)

---

## NEXT STEPS

1. **Start with Phase 1**: Complete audit and verification
2. **Review audit findings**: Prioritize gaps based on user impact
3. **Begin Phase 2**: Implement missing pages
4. **Continue with phases**: Follow priority order
5. **Test thoroughly**: Complete Phase 5 testing before considering complete

---

## NOTES

- This plan follows the Yuvoo Prompting Standard for systematic implementation
- All phases include specific tasks with acceptance criteria
- Dependencies are clearly identified
- Effort estimates are provided for planning
- The plan is flexible and can be adjusted based on audit findings

---

**Last Updated**: January 2025  
**Status**: Ready for Implementation  
**Next Action**: Begin Phase 1 - Audit & Verification
