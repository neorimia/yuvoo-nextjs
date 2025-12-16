# Doctor Components

Components for displaying and managing pediatric specialist profiles.

## Components

- `DoctorsMain.tsx` - Doctor listing page component (Client Component)
- `DoctorDetailsMain.tsx` - Doctor detail page component (Server Component, used in SSG pages)
- `DoctorCard.tsx` - Reusable doctor card component (adapted from Teacher cards, supports multiple variants)
- `DoctorSearchFilters.tsx` - Search and filter UI component (Client Component)
- `DoctorAppointmentForm.tsx` - Appointment booking form component (Client Component)
- `DoctorAppointmentFormSection.tsx` - Appointment form section wrapper (Server Component)
- `DoctorInfo.tsx` - Professional information display component
- `DoctorSpecialties.tsx` - Medical specialties and credentials display component
- `HomeDoctorArea.tsx` - Homepage doctor section with slider (Client Component)
- `HomeTwoDoctorArea.tsx` - Alternative homepage doctor section with background image (Client Component)
- `DoctorAvailability.tsx` - Availability calendar/schedule display component (Client Component)

## Usage

These components are adapted from the Kindedo Teacher components and updated for the Yuvoo Doctor domain.

### Data Structure

Components expect Doctor data matching the `Doctor` interface from `@/modules/doctors/doctors.types`.

### Routes

Components use routes from `@/lib/routes`:

- List: `routes.doctors.list` → `/doctori`
- Detail: `routes.doctors.detail(slug)` → `/doctori/${slug}`

### Features

- Verification badge display
- Medical specialty information
- Professional credentials display
- Location display
- Contact information (email, phone, website)
- Availability calendar
- Online consultation indicator
- Accepting new patients indicator
- Search and filtering (specialty, city, district, verified, accepting new patients, online consultations)
- URL-based filter state (filters persist in URL query params)
- Appointment booking form (child selection, date/time, consultation type, notes)

## Migration Notes

These components are created as adaptations of Teacher components:

- `Teacher/TeachersMain.tsx` → `features/doctors/DoctorsMain.tsx` (now uses DoctorCard component)
- `Teacher/TeacherDetailsMain.tsx` → `features/doctors/DoctorDetailsMain.tsx` (converted to Server Component, supports SSG)
- `Teacher/HomeTeacherArea.tsx` → `features/doctors/HomeDoctorArea.tsx`
- `Teacher/HomeTwoTeacherArea.tsx` → `features/doctors/HomeTwoDoctorArea.tsx`
- `Teacher/TeacherInfo.tsx` → `features/doctors/DoctorInfo.tsx`
- `Teacher/TeacherSkills.tsx` → `features/doctors/DoctorSpecialties.tsx`
- `Teacher/TeacherTimeTable.tsx` → `features/doctors/DoctorAvailability.tsx` (adapted for availability calendar)
- `Teacher card structure (bd-teacher)` → `DoctorCard.tsx` (listing variant)

## Specialty Display

Specialties are automatically translated to Romanian:

- `orthopedist` → "Ortopedie pediatrică"
- `nutritionist` → "Nutriție pediatrică"
- `psychologist` → "Psihologie pediatrică"
- `general` → "Medic pediatru"

## Component Patterns

- **Server Components**: `DoctorDetailsMain`, `DoctorInfo`, `DoctorSpecialties`, `DoctorAppointmentFormSection` (default, no 'use client')
- **Client Components**: `DoctorsMain`, `HomeDoctorArea`, `HomeTwoDoctorArea`, `DoctorAvailability`, `DoctorSearchFilters`, `DoctorAppointmentForm` (require interactivity)
- **Styling**: All components use Bootstrap 5.3.3 utility classes
- **Language**: All user-facing text is in Romanian
- **Routes**: All navigation uses `@/lib/routes` helper

## Appointment Booking

The `DoctorAppointmentForm` component provides:

- **Child Selection**: Optional child selection (doctor consultations can be for parent or child)
- **Consultation Type**: Radio buttons for in-person or online consultation (shown only if doctor offers online consultations)
- **Date & Time Selection**: Date picker and time picker with validation (must be in future)
- **Notes Field**: Optional notes for symptoms, questions, or additional information
- **Form Validation**: React Hook Form with Romanian error messages
- **Loading States**: Loading indicators during submission
- **Success Handling**: Success message and redirect to bookings page
- **Error Handling**: Error messages in Romanian
- **Integration**: Uses `createBookingAction` with `doctor_consultation` type

## Search & Filtering

The `DoctorSearchFilters` component provides:

- **Specialty Filter**: Filter by medical specialty (orthopedist, nutritionist, psychologist, general)
- **Location Filters**: Filter by city and district/sector
- **Availability Filters**: Filter by accepting new patients and online consultations
- **Verification Filter**: Show only verified doctors
- **Sort Options**: Sort by name, specialty, or verification status
- **URL State**: All filters are stored in URL query parameters for shareable links
- **Active Filter Count**: Shows number of active filters with clear all option
