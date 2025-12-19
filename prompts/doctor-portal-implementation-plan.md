# Doctor Portal Dashboard Implementation Plan

**Task**: P0-7 - Doctor Portal Dashboard Implementation (PRE-LAUNCH)  
**Effort**: 1 week (5-7 person-days)  
**Priority**: BLOCKS LAUNCH - Cannot onboard doctors without this  
**Status**: Ready for implementation using reusable components

---

## Executive Summary

This plan implements the Doctor Portal Dashboard using **shared components** extracted from the Club Portal. The implementation leverages 8 reusable components, reducing development time by ~40% and ensuring UI/UX consistency across portals.

**Key Benefits**:

- ✅ **Reusable Components**: 8 shared components ready to use
- ✅ **Consistent UI/UX**: Same patterns as club portal
- ✅ **Faster Development**: 40% time savings
- ✅ **Maintainability**: Single source of truth for shared components

---

## Available Reusable Components

### ✅ Already Created and Ready

1. **`DashboardHeader`** (`src/components/shared/DashboardHeader.tsx`)
   - Header with title, subtitle, icon, and verification badge
   - Supports `variant="doctor"` prop

2. **`DashboardPageLayout`** (`src/components/shared/DashboardPageLayout.tsx`)
   - Consistent page layout wrapper
   - Header section + content section pattern

3. **`ProfileCompletenessIndicator`** (`src/components/shared/ProfileCompletenessIndicator.tsx`)
   - Progress indicator for profile completeness
   - Shows percentage, missing fields, edit link

4. **`StatisticsCards`** (`src/components/shared/StatisticsCards.tsx`)
   - Generic statistics cards component
   - Supports custom stats array with icons and variants

5. **`RecentActivityFeed`** (`src/components/shared/RecentActivityFeed.tsx`)
   - Generic activity feed component
   - Supports custom item rendering

6. **`BookingCard`** (`src/components/shared/BookingCard.tsx`)
   - Reusable booking/consultation card
   - Supports `type="doctor_consultation"` prop

7. **`BookingDetailModal`** (`src/components/shared/BookingDetailModal.tsx`)
   - Reusable booking detail modal
   - Supports consultations with child info

8. **`AccountSettingsForm`** (`src/components/shared/AccountSettingsForm.tsx`)
   - Generic account settings form
   - Configurable notification preferences

### ✅ Supporting Utilities

- **`useEntityFilters`** (`src/hooks/useEntityFilters.ts`) - Filter hook for lists
- **`status-badges.ts`** (`src/lib/utils/status-badges.ts`) - Status badge utility
- **`date-formatting.ts`** (`src/lib/utils/date-formatting.ts`) - Date formatting utilities

---

## Implementation Plan

### Phase 1: Dashboard Overview Page (1.5 days)

**Route**: `/doctor/dashboard`  
**File**: `src/app/doctor/dashboard/page.tsx`

#### Current State

- ✅ Basic page structure exists
- ❌ Missing: Profile completeness indicator
- ❌ Missing: Verification status badge
- ❌ Missing: Consultation statistics
- ❌ Missing: Recent activity feed

#### Implementation Tasks

1. **Update Dashboard Page Structure**
   - [ ] Replace custom layout with `DashboardPageLayout`
   - [ ] Add `DashboardHeader` component with verification badge
   - [ ] Use `ProfileCompletenessIndicator` for profile completeness
   - [ ] Use `StatisticsCards` for consultation statistics
   - [ ] Use `RecentActivityFeed` for recent consultations

2. **Create Doctor Dashboard Content Component**
   - [ ] Create `src/components/features/doctors/DoctorDashboardContent.tsx`
   - [ ] Orchestrate all dashboard sections
   - [ ] Fetch consultation statistics from service layer
   - [ ] Fetch recent consultations (last 5)

3. **Create Consultation Statistics Service**
   - [ ] Create `src/modules/consultations/consultations.service.ts`
   - [ ] Add `getConsultationStatsByDoctorId(doctorId: string)` function
   - [ ] Returns: `{ total, pending, confirmed, completed, cancelled }`

4. **Create Consultation Repository**
   - [ ] Create `src/modules/consultations/consultations.repository.ts`
   - [ ] Add `getConsultationStatsByDoctorId(doctorId: string)` query
   - [ ] Add `findByDoctorId(doctorId: string, limit?: number)` query

5. **Update Doctor Service**
   - [ ] Add `calculateProfileCompleteness(doctor)` function
   - [ ] Similar to club profile completeness calculation

#### Code Example

```typescript
// src/app/doctor/dashboard/page.tsx
"use cache: private";

import { requireAuth } from "@/lib/auth/session";
import { getDoctorByUserId, calculateProfileCompleteness } from "@/modules/doctors/doctors.service";
import { getConsultationStatsByDoctorId } from "@/modules/consultations/consultations.service";
import { consultationsRepository } from "@/modules/consultations/consultations.repository";
import DoctorDashboardContent from "@/components/features/doctors/DoctorDashboardContent";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export default async function DoctorDashboardPage() {
  const session = await requireAuth();

  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  cacheLife("minutes");
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`doctor-dashboard-${session.dbUser.id}`);

  const doctor = await getDoctorByUserId(session.dbUser.id);
  if (!doctor) {
    return <DoctorNotFoundState />;
  }

  const profileCompleteness = calculateProfileCompleteness(doctor);
  const consultationStats = await getConsultationStatsByDoctorId(doctor.id);
  const recentConsultations = await consultationsRepository.findByDoctorId(doctor.id, 5);

  return (
    <DoctorDashboardContent
      doctor={doctor}
      profileCompleteness={profileCompleteness}
      consultationStats={consultationStats}
      recentConsultations={recentConsultations}
    />
  );
}
```

#### Acceptance Criteria

- [ ] Dashboard displays profile completeness indicator
- [ ] Verification status badge shows correct status
- [ ] Consultation statistics display correctly (total, pending, confirmed, completed)
- [ ] Recent activity feed shows last 5 consultations
- [ ] All components use shared components
- [ ] All text is in Romanian
- [ ] Page uses Next.js 16 Cache Components pattern

---

### Phase 2: Consultation Management Page (2 days)

**Route**: `/doctor/dashboard/consultations`  
**File**: `src/app/doctor/dashboard/consultations/page.tsx`

#### Current State

- ✅ Basic page structure exists (placeholder)
- ❌ Missing: Consultation list with filters
- ❌ Missing: Consultation detail modal
- ❌ Missing: Confirm/cancel actions
- ❌ Missing: Email notifications

#### Implementation Tasks

1. **Create Consultation List Component**
   - [ ] Create `src/components/features/doctors/DoctorConsultationList.tsx`
   - [ ] Use `useEntityFilters` hook for filtering
   - [ ] Use `BookingCard` component with `type="doctor_consultation"`
   - [ ] Support status filter (all, pending, confirmed, completed, cancelled)
   - [ ] Support date filter (today, this week, this month, all)

2. **Create Consultation Detail Modal**
   - [ ] Use `BookingDetailModal` component
   - [ ] Pass consultation data with child profile info
   - [ ] Handle confirm/cancel/complete actions

3. **Create Consultation Actions**
   - [ ] Create `src/app/actions/consultations.ts`
   - [ ] Add `confirmConsultationAction(id: string)`
   - [ ] Add `cancelConsultationAction(id: string, reason?: string)`
   - [ ] Add `completeConsultationAction(id: string)`
   - [ ] Send email notifications on status change

4. **Create Consultation Service**
   - [ ] Add `confirmConsultation(id: string)` function
   - [ ] Add `cancelConsultation(id: string, reason?: string)` function
   - [ ] Add `completeConsultation(id: string)` function
   - [ ] Add email notification logic

5. **Update Consultation Repository**
   - [ ] Add `updateConsultationStatus(id: string, status: string)` query
   - [ ] Add `findByDoctorIdWithFilters(doctorId: string, filters: ConsultationFilters)` query

#### Code Example

```typescript
// src/components/features/doctors/DoctorConsultationList.tsx
"use client";

import { useState } from "react";
import { useEntityFilters } from "@/hooks/useEntityFilters";
import BookingCard from "@/components/shared/BookingCard";
import BookingDetailModal from "@/components/shared/BookingDetailModal";
import { confirmConsultationAction, cancelConsultationAction } from "@/app/actions/consultations";

export default function DoctorConsultationList({ consultations, doctorId }) {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { statusFilter, dateFilter, filteredItems, setStatusFilter, setDateFilter } =
    useEntityFilters(
      consultations,
      (c) => c.status,
      (c) => c.scheduledAt
    );

  const handleConfirm = async (id: string) => {
    setIsProcessing(true);
    await confirmConsultationAction(id);
    setIsProcessing(false);
  };

  const handleCancel = async (id: string) => {
    setIsProcessing(true);
    await cancelConsultationAction(id);
    setIsProcessing(false);
  };

  return (
    <>
      {/* Filters */}
      <div className="mb-4">
        {/* Status filter */}
        {/* Date filter */}
      </div>

      {/* Consultation List */}
      <div>
        {filteredItems.map((consultation) => (
          <BookingCard
            key={consultation.id}
            id={consultation.id}
            scheduledAt={consultation.scheduledAt}
            status={consultation.status}
            type="doctor_consultation"
            child={consultation.child}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            onViewDetails={() => setSelectedConsultation(consultation)}
            isProcessing={isProcessing}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <BookingDetailModal
        booking={selectedConsultation}
        child={selectedConsultation?.child}
        parent={selectedConsultation?.parent}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isProcessing={isProcessing}
        type="doctor_consultation"
      />
    </>
  );
}
```

#### Acceptance Criteria

- [ ] Consultation list displays all consultations
- [ ] Status filter works correctly
- [ ] Date filter works correctly
- [ ] Consultation detail modal opens with correct data
- [ ] Confirm action updates status and sends email
- [ ] Cancel action updates status and sends email
- [ ] All actions show loading states
- [ ] All text is in Romanian

---

### Phase 3: Profile Editing Page (1.5 days)

**Route**: `/doctor/dashboard/profile`  
**File**: `src/app/doctor/dashboard/profile/page.tsx`

#### Current State

- ✅ Basic page structure exists (placeholder)
- ❌ Missing: Profile edit form
- ❌ Missing: Credentials management
- ❌ Missing: Availability editing
- ❌ Missing: Consultation fees editing
- ❌ Missing: Profile photo upload (Cloudinary)

#### Implementation Tasks

1. **Create Doctor Profile Edit Form**
   - [ ] Create `src/components/features/doctors/DoctorProfileEditForm.tsx`
   - [ ] Basic information section (name, bio, specialties)
   - [ ] Credentials and certifications section
   - [ ] Availability section (link to availability page)
   - [ ] Consultation fees section
   - [ ] Profile photo upload section (Cloudinary integration)

2. **Create Profile Photo Upload Component**
   - [ ] Create `src/components/features/doctors/DoctorPhotoUpload.tsx`
   - [ ] Use Cloudinary upload widget
   - [ ] Show preview of uploaded image
   - [ ] Handle upload progress

3. **Create Profile Update Actions**
   - [ ] Create `src/app/actions/doctor-profile.ts`
   - [ ] Add `updateDoctorProfileAction(formData: FormData)`
   - [ ] Add `uploadDoctorPhotoAction(file: File)`
   - [ ] Validate all fields with Zod schemas

4. **Create Doctor Profile Service**
   - [ ] Add `updateDoctorProfile(doctorId: string, data: UpdateDoctorProfileInput)` function
   - [ ] Add `uploadDoctorPhoto(doctorId: string, imageUrl: string)` function
   - [ ] Add validation logic

5. **Update Doctor Repository**
   - [ ] Add `updateDoctor(doctorId: string, data: Partial<Doctor>)` query
   - [ ] Add `updateDoctorPhoto(doctorId: string, imageUrl: string)` query

#### Code Example

```typescript
// src/components/features/doctors/DoctorProfileEditForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorProfileAction } from "@/app/actions/doctor-profile";
import DoctorPhotoUpload from "./DoctorPhotoUpload";

export default function DoctorProfileEditForm({ doctor }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      name: doctor.name,
      bio: doctor.description,
      specialties: doctor.specialties,
      // ...
    },
  });

  const onSubmit = async (data) => {
    await updateDoctorProfileAction(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Basic Information */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Informații de bază</h5>
          {/* Name, bio, specialties fields */}
        </div>
      </div>

      {/* Credentials */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Calificări și certificări</h5>
          {/* Credentials fields */}
        </div>
      </div>

      {/* Photo Upload */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Fotografie profil</h5>
          <DoctorPhotoUpload doctorId={doctor.id} currentPhoto={doctor.image} />
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary">
        Salvează modificările
      </button>
    </form>
  );
}
```

#### Acceptance Criteria

- [ ] Profile edit form displays all fields
- [ ] Form validation works correctly
- [ ] Profile photo upload works with Cloudinary
- [ ] Credentials can be added/removed
- [ ] Consultation fees can be updated
- [ ] All changes save correctly
- [ ] All text is in Romanian

---

### Phase 4: Availability Calendar Page (1 day)

**Route**: `/doctor/dashboard/availability`  
**File**: `src/app/doctor/dashboard/availability/page.tsx`

#### Current State

- ❌ Page does not exist (needs to be created)

#### Implementation Tasks

1. **Create Availability Calendar Page**
   - [ ] Create `src/app/doctor/dashboard/availability/page.tsx`
   - [ ] Use `DashboardPageLayout` for consistent layout
   - [ ] Add authentication and role check

2. **Create Availability Calendar Component**
   - [ ] Create `src/components/features/doctors/DoctorAvailabilityCalendar.tsx`
   - [ ] Weekly schedule editor
   - [ ] Block out unavailable times
   - [ ] Set recurring availability patterns
   - [ ] Mobile-friendly design

3. **Create Availability Actions**
   - [ ] Create `src/app/actions/doctor-availability.ts`
   - [ ] Add `updateAvailabilityAction(availability: AvailabilityInput)` function
   - [ ] Validate availability data

4. **Create Availability Service**
   - [ ] Add `updateDoctorAvailability(doctorId: string, availability: AvailabilityInput)` function
   - [ ] Handle recurring patterns
   - [ ] Validate time slots

5. **Update Doctor Repository**
   - [ ] Add `updateDoctorAvailability(doctorId: string, availability: AvailabilityData)` query
   - [ ] Store availability in database

#### Code Example

```typescript
// src/components/features/doctors/DoctorAvailabilityCalendar.tsx
"use client";

import { useState } from "react";
import { updateAvailabilityAction } from "@/app/actions/doctor-availability";

export default function DoctorAvailabilityCalendar({ doctorId, currentAvailability }) {
  const [availability, setAvailability] = useState(currentAvailability);

  const handleTimeSlotToggle = (day: string, timeSlot: string) => {
    // Toggle time slot availability
  };

  const handleSave = async () => {
    await updateAvailabilityAction(availability);
  };

  return (
    <div>
      {/* Weekly Schedule */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Program săptămânal</h5>
          {/* Weekly schedule editor */}
        </div>
      </div>

      {/* Recurring Patterns */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Modele recurente</h5>
          {/* Recurring patterns editor */}
        </div>
      </div>

      <button onClick={handleSave} className="btn btn-primary">
        Salvează disponibilitatea
      </button>
    </div>
  );
}
```

#### Acceptance Criteria

- [ ] Weekly schedule editor works correctly
- [ ] Time slots can be blocked/unblocked
- [ ] Recurring patterns can be set
- [ ] Calendar is mobile-friendly
- [ ] Availability saves correctly
- [ ] All text is in Romanian

---

### Phase 5: Settings Page (0.5 days)

**Route**: `/doctor/dashboard/settings`  
**File**: `src/app/doctor/dashboard/settings/page.tsx`

#### Current State

- ✅ Basic page structure exists (placeholder)
- ❌ Missing: Account settings form
- ❌ Missing: Email notification preferences

#### Implementation Tasks

1. **Update Settings Page**
   - [ ] Use `DashboardPageLayout` for consistent layout
   - [ ] Use `AccountSettingsForm` component
   - [ ] Configure notification preferences for doctor

2. **Create Doctor Settings Actions**
   - [ ] Create `src/app/actions/doctor-settings.ts`
   - [ ] Add `getDoctorSettingsAction()` function
   - [ ] Add `updateDoctorSettingsAction(data: AccountSettingsInput)` function

3. **Configure Notification Preferences**
   - [ ] Define doctor-specific notification types:
     - `consultationCreated` - "Consultație nouă"
     - `consultationConfirmed` - "Consultație confirmată"
     - `consultationCancelled` - "Consultație anulată"
     - `consultationReminder` - "Memento consultație"

#### Code Example

```typescript
// src/app/doctor/dashboard/settings/page.tsx
"use cache: private";

import { requireAuth } from "@/lib/auth/session";
import { getDoctorSettingsAction } from "@/app/actions/doctor-settings";
import AccountSettingsForm from "@/components/shared/AccountSettingsForm";
import DashboardPageLayout from "@/components/shared/DashboardPageLayout";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export default async function DoctorSettingsPage() {
  const session = await requireAuth();

  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  const settingsResult = await getDoctorSettingsAction();
  const initialData = settingsResult.success && settingsResult.settings
    ? {
        email: settingsResult.settings.email,
        firstName: settingsResult.settings.firstName,
        lastName: settingsResult.settings.lastName,
        phone: settingsResult.settings.phone,
        emailNotificationPreferences: settingsResult.settings.emailNotificationPreferences,
      }
    : undefined;

  const notificationPreferencesConfig = {
    consultationCreated: {
      label: "Consultație nouă",
      description: "Primește notificări când un părinte rezervă o consultație nouă",
    },
    consultationConfirmed: {
      label: "Consultație confirmată",
      description: "Primește notificări când un părinte confirmă o consultație",
    },
    consultationCancelled: {
      label: "Consultație anulată",
      description: "Primește notificări când o consultație este anulată",
    },
    consultationReminder: {
      label: "Memento consultație",
      description: "Primește memento-uri pentru consultațiile viitoare",
    },
  };

  return (
    <DashboardPageLayout
      icon="bi-gear"
      title="Setări"
      subtitle="Gestionează setările contului și preferințele de notificare"
    >
      <AccountSettingsForm
        initialData={initialData}
        notificationPreferencesConfig={notificationPreferencesConfig}
        onUpdate={updateDoctorSettingsAction}
      />
    </DashboardPageLayout>
  );
}
```

#### Acceptance Criteria

- [ ] Account settings form displays correctly
- [ ] Email notification preferences are configurable
- [ ] Settings save correctly
- [ ] All text is in Romanian

---

## File Structure After Implementation

```
src/
├── app/
│   ├── doctor/
│   │   ├── dashboard/
│   │   │   ├── page.tsx                    # UPDATED (uses shared components)
│   │   │   ├── consultations/
│   │   │   │   └── page.tsx                # UPDATED (uses shared components)
│   │   │   ├── profile/
│   │   │   │   └── page.tsx                # UPDATED (uses shared components)
│   │   │   ├── availability/
│   │   │   │   └── page.tsx                # NEW
│   │   │   └── settings/
│   │   │       └── page.tsx                # UPDATED (uses shared components)
│   │   └── layout.tsx
│   └── actions/
│       ├── consultations.ts                # NEW
│       ├── doctor-profile.ts               # NEW
│       ├── doctor-availability.ts           # NEW
│       └── doctor-settings.ts              # NEW
├── components/
│   ├── features/
│   │   └── doctors/
│   │       ├── DoctorDashboardContent.tsx  # NEW
│   │       ├── DoctorConsultationList.tsx  # NEW
│   │       ├── DoctorProfileEditForm.tsx    # NEW
│   │       ├── DoctorPhotoUpload.tsx        # NEW
│   │       ├── DoctorAvailabilityCalendar.tsx # NEW
│   │       └── DoctorNotFoundState.tsx      # NEW
│   └── shared/                              # ✅ Already created
│       ├── DashboardHeader.tsx
│       ├── DashboardPageLayout.tsx
│       ├── ProfileCompletenessIndicator.tsx
│       ├── StatisticsCards.tsx
│       ├── RecentActivityFeed.tsx
│       ├── BookingCard.tsx
│       ├── BookingDetailModal.tsx
│       └── AccountSettingsForm.tsx
├── modules/
│   ├── consultations/
│   │   ├── consultations.service.ts        # NEW
│   │   ├── consultations.repository.ts    # NEW
│   │   └── consultations.types.ts          # NEW
│   └── doctors/
│       └── doctors.service.ts               # UPDATED (add completeness calc)
└── hooks/
    └── useEntityFilters.ts                  # ✅ Already created
```

---

## Dependencies & Prerequisites

### Required

- ✅ Shared components are created and tested
- ✅ Club dashboard is working (for reference)
- ✅ Doctor onboarding is complete
- ✅ Database schema supports consultations
- ✅ Email service (Brevo) is configured

### Database Schema Requirements

- `consultations` table with:
  - `id`, `doctorId`, `childId`, `parentId`
  - `scheduledAt`, `status`, `notes`
  - `createdAt`, `updatedAt`
- `doctors` table with:
  - `availability` field (JSON)
  - `consultationFee` field
  - `image` field (Cloudinary URL)

---

## Testing Strategy

### Manual Testing Checklist

#### Dashboard Overview

- [ ] Profile completeness displays correctly
- [ ] Verification status badge shows correct status
- [ ] Consultation statistics are accurate
- [ ] Recent activity feed shows last 5 consultations
- [ ] All links navigate correctly

#### Consultation Management

- [ ] Consultation list displays all consultations
- [ ] Status filter works correctly
- [ ] Date filter works correctly
- [ ] Consultation detail modal opens correctly
- [ ] Confirm action works and sends email
- [ ] Cancel action works and sends email
- [ ] Complete action works

#### Profile Editing

- [ ] All form fields display correctly
- [ ] Form validation works
- [ ] Profile photo upload works
- [ ] Credentials can be managed
- [ ] Consultation fees can be updated
- [ ] Changes save correctly

#### Availability Calendar

- [ ] Weekly schedule displays correctly
- [ ] Time slots can be toggled
- [ ] Recurring patterns can be set
- [ ] Calendar is mobile-friendly
- [ ] Availability saves correctly

#### Settings

- [ ] Account settings form displays correctly
- [ ] Notification preferences are configurable
- [ ] Settings save correctly

### Integration Testing

- [ ] All pages work with authentication
- [ ] Role-based access control works
- [ ] Email notifications are sent correctly
- [ ] Database operations work correctly

---

## Success Metrics

- ✅ All 5 doctor portal pages are fully functional
- ✅ All pages use shared components
- ✅ UI/UX is consistent with club portal
- ✅ All user-facing text is in Romanian
- ✅ All routes use `@/lib/routes`
- ✅ Email notifications work correctly
- ✅ Mobile-responsive design works
- ✅ Manual E2E testing completed

---

## Risk Mitigation

### Risk 1: Consultation Data Model Mismatch

**Mitigation**: Review consultation schema before implementation, align with booking model

### Risk 2: Email Notification Failures

**Mitigation**: Test email sending in development, add error handling, log failures

### Risk 3: Availability Calendar Complexity

**Mitigation**: Start with simple weekly schedule, add recurring patterns incrementally

---

## Next Steps

1. **Review this plan** with team
2. **Verify database schema** supports consultations
3. **Start Phase 1** (Dashboard Overview)
4. **Test each phase** before moving to next
5. **Update documentation** as components are created

---

**Last Updated**: Based on reusable components analysis  
**Status**: Ready for implementation  
**Estimated Completion**: 5-7 days (1 week)
