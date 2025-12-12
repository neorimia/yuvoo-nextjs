# Component Mapping: Kindedo → Yuvoo

This document maps existing Kindedo components to their Yuvoo equivalents.

## Core Domain Mappings

### Class → Club

| Kindedo Component              | Yuvoo Equivalent                       | Status     | Notes                 |
| ------------------------------ | -------------------------------------- | ---------- | --------------------- |
| `Class/ClassesMain.tsx`        | `features/clubs/ClubsMain.tsx`         | ✅ Created | Club listing page     |
| `Class/ClassDetailsMain.tsx`   | `features/clubs/ClubDetailsMain.tsx`   | ✅ Created | Club detail page      |
| `Class/HomeClassArea.tsx`      | `features/clubs/HomeClubArea.tsx`      | ✅ Created | Homepage club section |
| `Class/ClassDetailsWidget.tsx` | `features/clubs/ClubDetailsWidget.tsx` | 📋 Planned | Club sidebar widgets  |
| `data/class-data.ts`           | `data/club-data.ts`                    | 📋 Planned | Data structure        |

**Additional Features Needed**:

- Verification badge component
- Sport filter component
- Location map component
- Review display component

### Teacher → Doctor

| Kindedo Component                | Yuvoo Equivalent                         | Status     | Notes                   |
| -------------------------------- | ---------------------------------------- | ---------- | ----------------------- |
| `Teacher/TeachersMain.tsx`       | `features/doctors/DoctorsMain.tsx`       | 📋 Planned | Doctor listing page     |
| `Teacher/TeacherDetailsMain.tsx` | `features/doctors/DoctorDetailsMain.tsx` | 📋 Planned | Doctor detail page      |
| `Teacher/HomeTeacherArea.tsx`    | `features/doctors/HomeDoctorArea.tsx`    | 📋 Planned | Homepage doctor section |
| `data/teacher-data.ts`           | `data/doctor-data.ts`                    | 📋 Planned | Data structure          |

**Additional Features Needed**:

- Medical specialty display
- Availability calendar
- Consultation booking form

### Program → Sport

| Kindedo Component                | Yuvoo Equivalent                       | Status     | Notes                  |
| -------------------------------- | -------------------------------------- | ---------- | ---------------------- |
| `Program/ProgramsMain.tsx`       | `features/sports/SportsMain.tsx`       | 📋 Planned | Sport listing page     |
| `Program/ProgramDetailsMain.tsx` | `features/sports/SportDetailsMain.tsx` | 📋 Planned | Sport detail page      |
| `Program/HomeProgramArea.tsx`    | `features/sports/HomeSportArea.tsx`    | 📋 Planned | Homepage sport section |
| `data/program-data.ts`           | `data/sport-data.ts`                   | 📋 Planned | Data structure         |

**Additional Features Needed**:

- AI recommendation display
- Match score visualization
- Reasoning explanation component

## Reusable Components (No Mapping Needed)

### Layout Components

| Component       | Location              | Status   | Action                  |
| --------------- | --------------------- | -------- | ----------------------- |
| Header variants | `layouts/Header/`     | ✅ Ready | Update logo & branding  |
| Footer variants | `layouts/Footer/`     | ✅ Ready | Update links & branding |
| Wrapper         | `layouts/Wrapper.tsx` | ✅ Ready | Update if needed        |

### Common Components

| Component  | Location                          | Status   | Notes             |
| ---------- | --------------------------------- | -------- | ----------------- |
| Breadcrumb | `components/Common/Breadcrumb/`   | ✅ Ready | No changes needed |
| Pagination | `components/Common/Pagination/`   | ✅ Ready | No changes needed |
| Preloader  | `components/Common/Preloader/`    | ✅ Ready | No changes needed |
| BackToTop  | `components/Common/BackToTop.tsx` | ✅ Ready | No changes needed |
| CounterUp  | `components/Common/CounterUp/`    | ✅ Ready | No changes needed |
| Countdown  | `components/Common/Countdown/`    | ✅ Ready | No changes needed |

### Form Components

| Component   | Location                          | Status   | Action                   |
| ----------- | --------------------------------- | -------- | ------------------------ |
| ContactForm | `components/Form/ContactForm.tsx` | ✅ Ready | Update validation        |
| SignInForm  | `components/Form/SignInForm.tsx`  | ✅ Ready | Integrate Stack Auth     |
| SignUpMain  | `components/Form/SignUpMain.tsx`  | ✅ Ready | Integrate Stack Auth     |
| ReviewForm  | `components/Form/ReviewForm.tsx`  | ✅ Ready | Update for clubs/doctors |

### Marketing Components

| Component   | Location                  | Status   | Action                   |
| ----------- | ------------------------- | -------- | ------------------------ |
| HeroArea    | `components/HeroArea/`    | ✅ Ready | Update content for Yuvoo |
| Banner      | `components/Banner/`      | ✅ Ready | Update content for Yuvoo |
| Testimonial | `components/Testimonial/` | ✅ Ready | Update content for Yuvoo |
| Gallery     | `components/Gallery/`     | ✅ Ready | Update content for Yuvoo |
| FAQ         | `components/FAQ/`         | ✅ Ready | Update content for Yuvoo |
| Contact     | `components/Contact/`     | ✅ Ready | Update content for Yuvoo |

### Auth Components

| Component          | Location                                 | Status   | Action               |
| ------------------ | ---------------------------------------- | -------- | -------------------- |
| LoginMain          | `components/Auth/LoginMain.tsx`          | ✅ Ready | Integrate Stack Auth |
| RegisterMain       | `components/Auth/RegisterMain.tsx`       | ✅ Ready | Integrate Stack Auth |
| ForgotPasswordMain | `components/Auth/ForgotPasswordMain.tsx` | ✅ Ready | Integrate Stack Auth |

## New Components Needed (Not in Kindedo)

### Quiz Components

- `features/quiz/QuizIntro.tsx` - Quiz introduction page
- `features/quiz/QuizQuestions.tsx` - Question display component
- `features/quiz/QuizResults.tsx` - Results display with AI recommendations
- `features/quiz/QuizProgress.tsx` - Progress indicator

### Children Components

- `features/children/ChildrenList.tsx` - List of child profiles
- `features/children/ChildForm.tsx` - Add/edit child form
- `features/children/ChildCard.tsx` - Child profile card

### Booking Components

- `features/bookings/BookingForm.tsx` - Booking creation form
- `features/bookings/BookingList.tsx` - List of bookings
- `features/bookings/BookingCard.tsx` - Booking card component

### Favorites Components

- `features/favorites/FavoritesList.tsx` - List of favorites
- `features/favorites/FavoriteButton.tsx` - Toggle favorite button

## Components to Remove (Phase 1)

| Component       | Location           | Reason                        |
| --------------- | ------------------ | ----------------------------- |
| Shop components | `components/Shop/` | Not in Phase 1 MVP            |
| Blog components | `components/Blog/` | Optional, can repurpose later |

## Migration Priority

### Phase 1 (Current)

1. ✅ Keep Kindedo structure
2. ✅ Document component mapping
3. ✅ Update branding (logo, colors)
4. 🔄 Adapt Class → Club components (✅ Core components created: ClubsMain, ClubDetailsMain, HomeClubArea, ClubCard, VerificationBadge)
5. 📋 Adapt Teacher → Doctor components
6. 📋 Adapt Program → Sport components

### Phase 2 (Future)

1. Create new Quiz components
2. Create new Children components
3. Create new Booking components
4. Migrate to feature-based organization
5. Complete Bootstrap component migration ✅
6. All components use Bootstrap 5.3.3 + SCSS ✅

## Notes

- **Status Legend**:
  - ✅ Ready - Component is ready to use
  - 📋 Planned - Component needs to be created/adapted
  - 🔄 In Progress - Component is being worked on
  - ❌ Removed - Component has been removed

- All components use **Bootstrap 5.3.3** + **SCSS** ✅
- Bootstrap wrapper components available in `src/components/UI/` (BootstrapButton, BootstrapInput, etc.)
- Custom Yuvoo-branded utilities via Bootstrap Utility API
