# Prompt: Onboarding Progress localStorage Mechanism

━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
Create a localStorage-based mechanism to save onboarding form progress for all onboarding flows (parent, club_admin, doctor). This mechanism should:

1. Automatically save form data to localStorage as users type (debounced)
2. Restore form data from localStorage on component mount
3. Clear localStorage when form is successfully submitted
4. Handle page refreshes gracefully without losing user input
5. Work across all onboarding steps for all user roles

**Problem**: Currently, when users refresh during onboarding, they see the error "Nu s-a găsit profilul profesional. Te rugăm să revii la pasul anterior." because form data is lost and server actions can't find required IDs (like `doctor_id`, `club_id`, `child_id`) that were created in previous steps.

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━
**Current Implementation**:

- Onboarding forms use React Hook Form with Zod validation
- Forms are client components (`"use client"`)
- Server actions handle form submission (`app/actions/onboarding.ts`)
- Onboarding progress is stored in database (`onboardingProgress` table with `stepData` JSONB field)
- Forms submit to server actions which create/update records and save to database
- Error occurs when user refreshes: server action tries to get `doctor_id` from `stepData`, but it's not there if previous step wasn't completed

**Onboarding Flows**:

- **Parent**: 5 steps (welcome, add-child, tour, quiz-intro, complete)
- **Club Admin**: 7 steps (welcome, basic-info, contact-schedule, pricing-ages, photos, verification, complete)
- **Doctor**: 8 steps (welcome, basic-info, bio-experience, location-contact, photo, verification, availability, complete)

**Key Files**:

- `src/components/features/onboarding/DoctorBasicInfoForm.tsx` - Example form component
- `src/components/features/onboarding/DoctorBioExperienceForm.tsx` - Example form component
- `src/components/features/onboarding/hooks/useOnboardingForm.ts` - Form submission hook
- `src/app/actions/onboarding.ts` - Server actions for onboarding
- `src/lib/validations/doctor.ts` - Zod validation schemas

**Form Structure**:

- Forms use `useForm` from `react-hook-form`
- Forms use `useOnboardingForm` hook for submission handling
- Forms have `defaultValues` for initial state
- Forms submit via `handleSubmit` wrapper

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

- **Storage Key Format**: Use consistent naming: `yuvoo_onboarding_{role}_{stepNumber}` (e.g., `yuvoo_onboarding_doctor_2`)
- **Debouncing**: Save to localStorage with 500ms debounce to avoid excessive writes
- **Type Safety**: Use TypeScript types matching form input types (e.g., `DoctorBasicInfoInput`, `DoctorBioExperienceInput`)
- **Error Handling**: localStorage operations must be wrapped in try-catch (localStorage may be disabled or full)
- **Browser Compatibility**: Check for localStorage availability before use
- **Data Validation**: Only save valid form data (use Zod schema validation before saving)
- **Cleanup**: Clear localStorage key when form is successfully submitted
- **Scope**: Only modify onboarding form components and hooks
- **Do NOT**:
  - Modify server actions (they should remain unchanged)
  - Change database schema or onboarding progress structure
  - Add new dependencies unless absolutely necessary
  - Modify validation schemas
  - Change form submission flow
  - Add new UI components
  - Modify routing or navigation

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
**Implementation Requirements**:

1. **Create a custom hook** `useOnboardingLocalStorage.ts`:
   - Location: `src/components/features/onboarding/hooks/useOnboardingLocalStorage.ts`
   - Functions:
     - `saveFormData(role: string, stepNumber: number, data: unknown): void` - Save form data to localStorage
     - `getFormData<T>(role: string, stepNumber: number): T | null` - Retrieve form data from localStorage
     - `clearFormData(role: string, stepNumber: number): void` - Clear form data from localStorage
     - `clearAllOnboardingData(role: string): void` - Clear all onboarding data for a role
   - Must handle localStorage errors gracefully (try-catch, return null on error)
   - Must check localStorage availability before use

2. **Update `useOnboardingForm` hook**:
   - Location: `src/components/features/onboarding/hooks/useOnboardingForm.ts`
   - Add localStorage integration:
     - Save form data on form value changes (debounced, 500ms)
     - Restore form data on mount (if available)
     - Clear localStorage on successful submission
   - Must accept `role` and `stepNumber` parameters
   - Must integrate with existing form submission flow

3. **Update all onboarding form components**:
   - Add `useEffect` to watch form values and save to localStorage
   - Add `useEffect` to restore form data on mount
   - Pass `role` and `stepNumber` to `useOnboardingForm` hook
   - Clear localStorage in success handler

**Files to Modify**:

- Create: `src/components/features/onboarding/hooks/useOnboardingLocalStorage.ts`
- Modify: `src/components/features/onboarding/hooks/useOnboardingForm.ts`
- Modify: All form components in `src/components/features/onboarding/`:
  - `DoctorBasicInfoForm.tsx`
  - `DoctorBioExperienceForm.tsx`
  - `DoctorLocationContactForm.tsx` (if exists)
  - `DoctorPhotoForm.tsx` (if exists)
  - `DoctorVerificationForm.tsx` (if exists)
  - `DoctorAvailabilityForm.tsx` (if exists)
  - `ClubBasicInfoForm.tsx` (if exists)
  - `ClubContactScheduleForm.tsx` (if exists)
  - `ClubPricingAgesForm.tsx` (if exists)
  - `ClubPhotoForm.tsx` (if exists)
  - `ClubVerificationForm.tsx` (if exists)
  - `ParentAddChildForm.tsx` (if exists)
  - Any other onboarding form components

**Code Format**:

- Use TypeScript with strict types
- Follow existing code style (Bootstrap, React Hook Form patterns)
- Add JSDoc comments for all functions
- Use Romanian comments for user-facing logic
- Use English comments for technical implementation details

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━
**Example: localStorage Hook Usage**

```typescript
// In form component
const { watch, setValue } = useForm<DoctorBasicInfoInput>({
  resolver: zodResolver(doctorBasicInfoSchema),
  defaultValues: {
    credentials: [],
    secondarySpecialties: [],
  },
});

// Restore from localStorage on mount
useEffect(() => {
  const saved = getFormData<DoctorBasicInfoInput>("doctor", 2);
  if (saved) {
    Object.keys(saved).forEach((key) => {
      setValue(key as keyof DoctorBasicInfoInput, saved[key]);
    });
  }
}, [setValue]);

// Save to localStorage on form changes (debounced)
const formValues = watch();
useEffect(() => {
  const timeoutId = setTimeout(() => {
    saveFormData("doctor", 2, formValues);
  }, 500);
  return () => clearTimeout(timeoutId);
}, [formValues]);

// Clear on successful submission
const { handleSubmit } = useOnboardingForm<DoctorBasicInfoInput>({
  onSubmitAction: createDoctorOnboarding,
  onSuccessRoute: routes.onboarding.doctor.bioExperience,
  onSuccess: () => {
    clearFormData("doctor", 2);
  },
});
```

**Example: localStorage Key Structure**

```
yuvoo_onboarding_doctor_2 = { firstName: "Ion", lastName: "Popescu", ... }
yuvoo_onboarding_doctor_3 = { bio: "...", yearsOfExperience: 5, ... }
yuvoo_onboarding_club_admin_2 = { name: "Club Name", ... }
yuvoo_onboarding_parent_2 = { firstName: "Maria", lastName: "Ionescu", ... }
```

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━

- Use minimal diffs: only add localStorage functionality, don't refactor existing code
- Preserve existing code style and patterns (React Hook Form, Bootstrap)
- Do NOT change form submission logic or server actions
- Do NOT modify validation schemas or error handling
- Do NOT change component structure or UI
- Follow existing TypeScript patterns (use existing types from `@/lib/validations/`)
- Use existing utility functions when available (e.g., `@/lib/utils`)
- Maintain backward compatibility: forms should work without localStorage (graceful degradation)
- Error handling: localStorage failures should not break form functionality
- Add type safety: use existing form input types, create new types only if needed
- Performance: debounce localStorage writes to avoid performance issues
- Browser compatibility: check localStorage availability before use

━━━━━━━━━━━━━━━━━━━━
SUCCESS CRITERIA
━━━━━━━━━━━━━━━━━━━━

- [ ] User can refresh page during onboarding without losing form data
- [ ] Form data is automatically restored when user returns to a step
- [ ] localStorage is cleared when form is successfully submitted
- [ ] No errors occur if localStorage is disabled or unavailable
- [ ] All onboarding forms (parent, club_admin, doctor) have localStorage support
- [ ] Debouncing prevents excessive localStorage writes
- [ ] Type safety is maintained throughout
- [ ] Code follows existing patterns and style
- [ ] No breaking changes to existing functionality

━━━━━━━━━━━━━━━━━━━━
TESTING SCENARIOS
━━━━━━━━━━━━━━━━━━━━

1. **Fill form partially → Refresh → Verify data restored**
2. **Fill form completely → Submit → Verify localStorage cleared**
3. **Fill form → Navigate away → Return → Verify data restored**
4. **Fill form with localStorage disabled → Verify form still works**
5. **Fill form → Clear browser data → Verify graceful handling**
6. **Fill multiple steps → Verify each step has separate localStorage key**
7. **Fill form → Submit → Verify localStorage cleared for that step**

━━━━━━━━━━━━━━━━━━━━
RELATED DOCUMENTATION
━━━━━━━━━━━━━━━━━━━━

- Yuvoo Prompting Standard: `memory-bank/promptingSystem.md`
- Onboarding Implementation: `src/app/actions/onboarding.ts`
- Form Components: `src/components/features/onboarding/`
- Validation Schemas: `src/lib/validations/doctor.ts`, `src/lib/validations/club.ts`, `src/lib/validations/child.ts`
