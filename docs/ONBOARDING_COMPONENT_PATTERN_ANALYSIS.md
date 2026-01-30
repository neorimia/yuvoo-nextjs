# Onboarding Components Pattern Analysis

**Date**: December 2024
**Project**: Yuvoo Next.js Platform
**Scope**: Analysis of all onboarding form components for code reusability and pattern extraction

---

## Executive Summary

This analysis examined 14 onboarding form components across three user types (Parent, Club, Doctor) and identified significant opportunities for code reduction through component extraction. Current analysis shows **approximately 40-50% code duplication** across forms, primarily in:

1. **Form submission logic** (useState, error handling, navigation)
2. **Input field patterns** (label + input + error + help text)
3. **Multi-select patterns** (credentials, languages, specialties, age groups)
4. **File upload patterns** (images, documents, with preview and delete)
5. **Character counter patterns** (textareas with validation)

**Key Findings**:

- ✅ **Strong foundation**: `FormField`, `ServerErrorAlert`, `InfoBox`, `useOnboardingForm` already exist
- ⚠️ **Underutilization**: `useOnboardingForm` hook is NOT being used (0/14 forms)
- ⚠️ **Partial usage**: `FormField` component could replace 50%+ of manual field implementations
- 🎯 **High-impact opportunities**: 5-7 new reusable components can reduce boilerplate by 30-40%

---

## 1. Code Duplication Analysis

### 1.1 Form Submission Logic Pattern

**Current State**: Every form manually implements the same submission pattern with identical logic for loading states, error handling, and navigation.

**Pattern Found in**: 14/14 forms (100% duplication)

#### Repeated Code Block Pattern

Every form implements this exact pattern:

```typescript
// Found in: AddChildForm.tsx, ClubBasicInfoForm.tsx, ClubContactScheduleForm.tsx,
//           DoctorBasicInfoForm.tsx, and all other onboarding forms

const router = useRouter();
const [isLoading, setIsLoading] = useState(false);
const [serverError, setServerError] = useState<string | null>(null);

const onSubmit = async (data: FormInput) => {
  setIsLoading(true);
  setServerError(null);

  try {
    const result = await serverAction(data);

    if (result.success) {
      router.push(routes.next.step);
    } else {
      setServerError(result.error);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setServerError("A apărut o eroare neașteptată. Te rugăm să încerci din nou.");
  } finally {
    setIsLoading(false);
  }
};

// Then used in form:
<form onSubmit={handleSubmit(onSubmit)}>
  {/* form fields */}
</form>
```

#### Existing Solution: `useOnboardingForm` Hook

**Location**: `src/components/features/onboarding/hooks/useOnboardingForm.ts`

**Status**: ✅ **Hook exists and is fully implemented** but ⚠️ **NOT being used** (0/14 forms)

**Hook Interface**:

```typescript
interface UseOnboardingFormOptions<T> {
  onSubmitAction: (data: T) => Promise<{ success: boolean; error?: string; data?: unknown }>;
  onSuccessRoute: string;
  transformData?: (data: T) => T; // Optional data transformer
  onSuccess?: (result: { success: boolean; data?: unknown }) => void; // Optional callback
  onError?: (error: string) => void; // Optional callback
}

function useOnboardingForm<T>(options: UseOnboardingFormOptions<T>): {
  handleSubmit: (data: T) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
  setServerError: (error: string | null) => void;
};
```

**Hook Features**:

- ✅ Loading state management
- ✅ Server error handling
- ✅ Automatic navigation on success
- ✅ Error callbacks support
- ✅ Success callbacks support
- ✅ Data transformation support
- ✅ Consistent error messages (Romanian)

#### Why It's Not Being Used

**Possible reasons**:

1. **Migration effort**: Forms were created before the hook was added
2. **Awareness gap**: Developers may not know the hook exists
3. **Integration complexity**: Forms may need minor refactoring to use the hook
4. **Special cases**: Some forms might have unique submission requirements (though hook supports callbacks)

#### Migration Example

**Before (Manual Implementation - 40 lines)**:

```typescript
// AddChildForm.tsx
export function AddChildForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm<CreateChildInput>({
    resolver: zodResolver(createChildSchema),
  });

  const onSubmit = async (data: CreateChildInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await addChildOnboarding(data);

      if (result.success) {
        router.push(routes.onboarding.parent.tour);
      } else {
        setServerError(result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError("A apărut o eroare neașteptată. Te rugăm să încerci din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={rhfHandleSubmit(onSubmit)}>
      {/* form content */}
    </form>
  );
}
```

**After (Using Hook - 8 lines)**:

```typescript
// AddChildForm.tsx
import { useOnboardingForm } from "./hooks/useOnboardingForm";

export function AddChildForm() {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm<CreateChildInput>({
    resolver: zodResolver(createChildSchema),
  });

  const { handleSubmit, isLoading, serverError } = useOnboardingForm({
    onSubmitAction: addChildOnboarding,
    onSuccessRoute: routes.onboarding.parent.tour,
  });

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)}>
      {/* form content */}
    </form>
  );
}
```

**Code Reduction**: 40 lines → 8 lines (**80% reduction**)

#### Handling Special Cases

The hook supports common special cases through callbacks:

**Example 1: Data Transformation**

```typescript
const { handleSubmit, isLoading, serverError } = useOnboardingForm({
  onSubmitAction: updateClubPhotos,
  onSuccessRoute: routes.onboarding.club.verification,
  transformData: (data) => ({
    ...data,
    logoUrl: data.logoUrl || "",
    galleryUrls: data.galleryUrls || [],
  }),
});
```

**Example 2: Success Callback (e.g., Analytics)**

```typescript
const { handleSubmit, isLoading, serverError } = useOnboardingForm({
  onSubmitAction: createClubOnboarding,
  onSuccessRoute: routes.onboarding.club.contactSchedule,
  onSuccess: (result) => {
    // Track analytics event
    analytics.track("club_onboarding_step_completed", {
      step: "basic_info",
      clubId: result.data?.id,
    });
  },
});
```

**Example 3: Custom Error Handling**

```typescript
const { handleSubmit, isLoading, serverError } = useOnboardingForm({
  onSubmitAction: verifyDoctorAccount,
  onSuccessRoute: routes.onboarding.doctor.completion,
  onError: (error) => {
    // Custom error logging or notification
    console.error("Verification failed:", error);
    toast.error("Verificare eșuată. Te rugăm să verifici documentele.");
  },
});
```

#### Impact Assessment

**Current State**:

- **Lines per form**: ~35-40 lines of duplicated logic
- **Total duplication**: ~490-560 lines across 14 forms
- **Maintenance burden**: Bug fixes must be applied 14 times

**After Migration**:

- **Lines per form**: ~3-4 lines (hook usage)
- **Total code**: ~42-56 lines (14 forms × 3-4 lines) + 87 lines (hook implementation) = ~130 lines
- **Code reduction**: ~85-88% reduction in form submission logic
- **Maintenance**: Single source of truth (hook file)

#### Migration Priority

**Priority**: 🔴 **CRITICAL / HIGH**

**Rationale**:

- ✅ Hook already exists and is fully functional
- ✅ Minimal refactoring required (drop-in replacement)
- ✅ Highest code reduction impact (85-88%)
- ✅ Single point of maintenance for submission logic
- ✅ Consistent error handling across all forms
- ⚠️ Low risk migration (hook is well-tested)

#### Migration Strategy

**Step 1**: Test hook with one simple form (e.g., `AddChildForm`)
**Step 2**: Verify edge cases work correctly
**Step 3**: Migrate remaining forms one by one
**Step 4**: Remove manual implementations
**Step 5**: Update documentation

**Estimated Effort**: 2-3 hours for all 14 forms

---

### 1.2 Form Field Patterns

**Pattern Analysis**:

#### Text Input Pattern (Found in 11/14 forms)

```typescript
// Repeated in: AddChildForm (firstName, lastName), ClubBasicInfoForm (name, address), etc.
<div className="mb-4">
  <label htmlFor="fieldName" className="d-block small fw-medium text-body mb-2">
    Label Text <span className="text-danger">*</span>
  </label>
  <BootstrapInput
    id="fieldName"
    type="text"
    {...register("fieldName")}
    disabled={isLoading}
    error={!!errors.fieldName}
    className="w-100"
    placeholder="Placeholder text"
    aria-invalid={errors.fieldName ? "true" : "false"}
    aria-describedby={errors.fieldName ? "fieldName-error" : undefined}
  />
  {errors.fieldName && (
    <p id="fieldName-error" className="mt-2 small text-danger">
      {errors.fieldName.message}
    </p>
  )}
</div>
```

**Lines per field**: 18-20 lines
**Total occurrences**: ~45 text input fields
**Total duplication**: ~900 lines
**Existing solution**: `FormField` component exists but underutilized

---

#### Textarea with Character Counter (Found in 5/7 forms)

```typescript
// ClubBasicInfoForm (description), DoctorBioExperienceForm (bio), etc.
const description = watch("description");
const descriptionLength = description?.length || 0;

<div className="mb-4">
  <label htmlFor="description" className="d-block small fw-medium text-body mb-2">
    Description <span className="text-danger">*</span>
  </label>
  <BootstrapTextarea
    id="description"
    {...register("description")}
    rows={6}
    maxLength={1000}
    error={!!errors.description}
  />
  <div className="mt-2 d-flex align-items-center justify-content-between">
    <p className="text-xs text-secondary">Minim 50 caractere, maxim 1000 caractere</p>
    <p className="text-xs text-secondary">{descriptionLength}/1000 caractere</p>
  </div>
  {errors.description && (
    <p className="mt-2 small text-danger">{errors.description.message}</p>
  )}
</div>
```

**Lines per field**: 25-30 lines
**Total occurrences**: 5 forms
**Total duplication**: ~150 lines
**Needs**: Character counter component

---

#### Select Dropdown Pattern (Found in 8/14 forms)

```typescript
// ClubBasicInfoForm (sportType, city), DoctorBasicInfoForm (specialty), etc.
<div className="mb-4">
  <label htmlFor="city" className="d-block small fw-medium text-body mb-2">
    Oraș <span className="text-danger">*</span>
  </label>
  <Controller
    name="city"
    control={control}
    render={({ field }) => (
      <BootstrapSelect
        id="city"
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
        disabled={isLoading}
        error={!!errors.city}
        className="w-100"
        options={[
          { value: "", label: "Selectează orașul" },
          ...CITIES.map((city) => ({ value: city, label: city })),
        ]}
      />
    )}
  />
  {errors.city && (
    <p className="mt-2 small text-danger">{errors.city.message}</p>
  )}
</div>
```

**Lines per field**: 22-25 lines
**Total occurrences**: ~15 select fields
**Total duplication**: ~350 lines
**Could use**: `FormField` component with select type

---

### 1.3 Multi-Select Patterns

#### Checkbox Multi-Select (Found in 4 forms)

**Pattern**: Age groups, experience levels, secondary specialties, languages

```typescript
// ClubPricingAgesForm (ageGroups), DoctorBioExperienceForm (languages, secondarySpecialties)
<Controller
  name="ageGroups"
  control={control}
  render={({ field }) => (
    <div className="row g-3">
      {AGE_GROUPS.map((age) => {
        const isSelected = field.value?.includes(age) || false;
        return (
          <div key={age} className="col-4 col-sm-3 col-md-2">
            <label className={cn(
              "d-flex align-items-center justify-content-center p-3 border-2 rounded cursor-pointer",
              isSelected
                ? "border-yuvoo-primary bg-yuvoo-primary-light text-yuvoo-primary"
                : "border-secondary bg-white text-body"
            )}>
              <input
                type="checkbox"
                value={age}
                checked={isSelected}
                onChange={() => {
                  const current = field.value || [];
                  const newValue = isSelected
                    ? current.filter((a: number) => a !== age)
                    : [...current, age].sort((a: number, b: number) => a - b);
                  field.onChange(newValue);
                }}
                className="visually-hidden"
              />
              <span className="fw-medium">{age} ani</span>
            </label>
          </div>
        );
      })}
    </div>
  )}
/>
```

**Lines per implementation**: 35-45 lines
**Total occurrences**: 6 multi-select instances
**Total duplication**: ~240 lines
**Needs**: `MultiSelectField` component

---

#### Tag-Based Multi-Select with Add/Remove (Found in 2 forms)

**Pattern**: Credentials, custom languages

```typescript
// DoctorBasicInfoForm (credentials), DoctorBioExperienceForm (languages)
const [credentials, setCredentials] = useState<string[]>([]);
const [newCredential, setNewCredential] = useState("");

// Sync with form state
useEffect(() => {
  setValue("credentials", credentials, { shouldValidate: true });
}, [credentials, setValue]);

// Add credential
const addCredential = () => {
  if (newCredential.trim() && !credentials.includes(newCredential.trim())) {
    const updated = [...credentials, newCredential.trim()];
    setCredentials(updated);
    setValue("credentials", updated, { shouldValidate: true });
    setNewCredential("");
  }
};

// Remove credential
const removeCredential = (credential: string) => {
  const updated = credentials.filter((c) => c !== credential);
  setCredentials(updated);
  setValue("credentials", updated, { shouldValidate: true });
};

// Quick add buttons
<div className="d-flex flex-wrap gap-2">
  {COMMON_CREDENTIALS.map((cred) => (
    <button
      type="button"
      onClick={() => addCommonCredential(cred)}
      disabled={credentials.includes(cred)}
    >
      {cred}
    </button>
  ))}
</div>

// Custom input
<div className="d-flex gap-2">
  <BootstrapInput
    value={newCredential}
    onChange={(e) => setNewCredential(e.target.value)}
    placeholder="Adaugă credențială personalizată"
  />
  <BootstrapButton onClick={addCredential}>Adaugă</BootstrapButton>
</div>

// Display selected
{credentials.map((cred) => (
  <div key={cred} className="d-flex align-items-center justify-content-between px-3 py-2 bg-light rounded mb-2">
    <span>{cred}</span>
    <button onClick={() => removeCredential(cred)}>Șterge</button>
  </div>
))}
```

**Lines per implementation**: 80-100 lines
**Total occurrences**: 2 forms (credentials, languages)
**Total duplication**: ~180 lines
**Needs**: `TagInputField` component

---

### 1.4 File Upload Patterns

#### Single Image Upload with Preview (Found in 2 forms)

**Pattern**: Club logo, doctor photo

```typescript
// ClubPhotosForm (logo), DoctorPhotoForm (photo)
const [uploadingLogo, setUploadingLogo] = useState(false);
const logoInputRef = useRef<HTMLInputElement>(null);
const logoUrl = watch("logoUrl");

const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  setUploadingLogo(true);
  setServerError(null);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "yuvoo/clubs/logos");

    const result = await uploadImageAction(formData);

    if (result.success && result.url) {
      // Delete old logo if exists
      if (logoUrl) {
        await deleteImageAction(logoUrl);
      }
      setValue("logoUrl", result.url, { shouldValidate: true });
    } else {
      setServerError(result.error || "Eroare la încărcarea logo-ului");
    }
  } catch (error) {
    setServerError("A apărut o eroare neașteptată");
  } finally {
    setUploadingLogo(false);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  }
};

const handleRemoveLogo = async () => {
  if (logoUrl) {
    await deleteImageAction(logoUrl);
  }
  setValue("logoUrl", "", { shouldValidate: true });
};

// UI
{logoUrl ? (
  <ImagePreview
    src={logoUrl}
    alt="Club logo"
    onRemove={handleRemoveLogo}
    isUploading={uploadingLogo}
  />
) : (
  <FileUploadArea
    label="Apasă pentru a încărca logo"
    onClick={() => logoInputRef.current?.click()}
    isUploading={uploadingLogo}
  />
)}

<input
  ref={logoInputRef}
  type="file"
  accept="image/jpeg,image/jpg,image/png,image/webp"
  onChange={handleLogoUpload}
  className="visually-hidden"
/>
```

**Lines per implementation**: 60-70 lines
**Total occurrences**: 2 forms
**Total duplication**: ~130 lines
**Partial solution**: `FileUploadArea` and `ImagePreview` exist
**Needs**: `SingleImageUploadField` wrapper component

---

#### Gallery/Multiple Image Upload (Found in 1 form)

**Pattern**: Club gallery photos

```typescript
// ClubPhotosForm (gallery)
const [uploadingGallery, setUploadingGallery] = useState<number | null>(null);
const galleryInputRef = useRef<HTMLInputElement>(null);
const galleryUrls = watch("galleryUrls") || [];

const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(event.target.files || []);
  if (files.length === 0) return;

  // Upload files sequentially
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileIndex = galleryUrls.length + i;
    setUploadingGallery(fileIndex);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "yuvoo/clubs/gallery");

      const result = await uploadImageAction(formData);

      if (result.success && result.url) {
        const newGalleryUrls = [...galleryUrls, result.url];
        setValue("galleryUrls", newGalleryUrls, { shouldValidate: true });
      }
    } finally {
      setUploadingGallery(null);
    }
  }
};

const handleRemoveGalleryImage = async (index: number) => {
  const urlToRemove = galleryUrls[index];
  const newGalleryUrls = galleryUrls.filter((_, i) => i !== index);
  setValue("galleryUrls", newGalleryUrls, { shouldValidate: true });

  if (urlToRemove) {
    await deleteImageAction(urlToRemove);
  }
};

// UI: Gallery grid with previews
{galleryUrls.length > 0 && (
  <div className="row g-3">
    {galleryUrls.map((url, index) => (
      <div key={index} className="col-6 col-sm-4 col-md-3">
        <ImagePreview
          src={url}
          alt={`Galerie ${index + 1}`}
          onRemove={() => handleRemoveGalleryImage(index)}
          isUploading={uploadingGallery === index}
          objectFit="cover"
        />
      </div>
    ))}
  </div>
)}

{galleryUrls.length < 10 && (
  <FileUploadArea
    label="Adaugă fotografii în galerie"
    onClick={() => galleryInputRef.current?.click()}
    isUploading={uploadingGallery !== null}
    maxFiles={10}
    currentFiles={galleryUrls.length}
  />
)}

<input
  ref={galleryInputRef}
  type="file"
  accept="image/jpeg,image/jpg,image/png,image/webp"
  multiple
  onChange={handleGalleryUpload}
  className="visually-hidden"
/>
```

**Lines per implementation**: 80-100 lines
**Total occurrences**: 1 form
**Potential reuse**: Doctor profiles, future features
**Needs**: `GalleryUploadField` component

---

#### Document Upload (Found in 2 forms)

**Pattern**: Club verification, doctor verification

```typescript
// ClubVerificationForm, DoctorVerificationForm
const [uploadingDocument, setUploadingDocument] = useState<number | null>(null);
const documentInputRef = useRef<HTMLInputElement>(null);
const documentUrls = watch("verificationDocuments") || [];

const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(event.target.files || []);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    setUploadingDocument(i);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "yuvoo/clubs/verification");

    const result = await uploadDocumentAction(formData);

    if (result.success && result.url) {
      setValue("verificationDocuments", [...documentUrls, result.url]);
    }

    setUploadingDocument(null);
  }
};

// UI: Document list with file icons
{documentUrls.map((url, index) => (
  <DocumentPreview
    key={index}
    url={url}
    onRemove={() => handleRemoveDocument(index)}
    isUploading={uploadingDocument === index}
  />
))}
```

**Lines per implementation**: 70-80 lines
**Total occurrences**: 2 forms
**Partial solution**: `DocumentPreview` exists
**Needs**: `DocumentUploadField` wrapper component

---

### 1.5 Dynamic Field Arrays

#### Schedule Builder (Found in 1 form)

**Pattern**: Add/remove schedule entries with day and time

```typescript
// ClubContactScheduleForm
const { fields, append, remove } = useFieldArray({
  control,
  name: "schedule",
});

const addScheduleEntry = () => {
  append({ day: "", time: "" });
};

{fields.map((field, index) => (
  <div key={field.id} className="bg-white border rounded p-4 d-flex gap-3">
    <div className="flex-fill">
      <label>Ziua</label>
      <BootstrapSelect
        {...register(`schedule.${index}.day` as const)}
        options={DAYS_OF_WEEK}
      />
    </div>

    <div className="flex-fill">
      <label>Interval orar</label>
      <BootstrapInput
        {...register(`schedule.${index}.time` as const)}
        placeholder="ex: 17:00-18:30"
      />
    </div>

    <button onClick={() => remove(index)}>
      <X className="w-4 h-4" />
    </button>
  </div>
))}

<button onClick={addScheduleEntry}>
  <Plus /> Adaugă interval
</button>
```

**Lines per implementation**: 50-60 lines
**Total occurrences**: 1 form
**Potential reuse**: Doctor availability schedules
**Needs**: `ScheduleBuilderField` component

---

#### Pricing Builder (Found in 1 form)

**Pattern**: Add/remove pricing options with type and amount

```typescript
// ClubPricingAgesForm
const { fields: pricingFields, append: appendPricing, remove: removePricing } = useFieldArray({
  control,
  name: "pricing",
});

{pricingFields.map((field, index) => (
  <div key={field.id} className="bg-white border rounded p-4 d-flex gap-3">
    <div className="flex-fill">
      <label>Tip abonament</label>
      <BootstrapSelect
        {...register(`pricing.${index}.type` as const)}
        options={PRICING_TYPES}
      />
    </div>

    <div className="flex-fill">
      <label>Preț (RON)</label>
      <BootstrapInput
        type="number"
        {...register(`pricing.${index}.amount` as const, { valueAsNumber: true })}
      />
    </div>

    <button onClick={() => removePricing(index)}>
      <X />
    </button>
  </div>
))}

<button onClick={() => appendPricing({ type: "monthly", amount: 0 })}>
  <Plus /> Adaugă preț
</button>
```

**Lines per implementation**: 50-60 lines
**Total occurrences**: 1 form
**Potential reuse**: Other pricing scenarios
**Needs**: Generic `DynamicFieldArray` component

---

### 1.6 Special Input Patterns

#### Date Input with Age Calculation (Found in 1 form)

**Pattern**: Date picker with automatic age display

```typescript
// AddChildForm
const dateOfBirth = watch("dateOfBirth");

const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const dateString = e.target.value;
  if (dateString) {
    setValue("dateOfBirth", new Date(dateString), { shouldValidate: true });
  }
};

const formatDateForInput = (date?: Date): string => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateAge = (date?: Date): number | null => {
  if (!date) return null;
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const age = calculateAge(dateOfBirth);

<BootstrapInput
  type="date"
  onChange={handleDateChange}
  value={formatDateForInput(dateOfBirth)}
  max={new Date().toISOString().split("T")[0]}
/>
{age !== null && (
  <p>Vârsta: {age} {age === 1 ? "an" : "ani"}</p>
)}
```

**Lines per implementation**: 45-50 lines
**Total occurrences**: 1 form
**Potential reuse**: Any age-based form
**Needs**: `DatePickerWithAgeField` component

---

#### Radio Button Group with Visual Cards (Found in 1 form)

**Pattern**: Gender selection with emoji icons

```typescript
// AddChildForm
<div className="row g-3">
  <div className="col-4">
    <label
      className={cn(
        "d-flex flex-column align-items-center justify-content-center p-4 border-2 rounded",
        isLoading && "opacity-50"
      )}
      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          e.currentTarget.style.borderColor = "var(--bd-theme-1)";
          e.currentTarget.style.backgroundColor = "var(--bd-theme-1-light)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoading) {
          e.currentTarget.style.borderColor = "";
          e.currentTarget.style.backgroundColor = "";
        }
      }}
    >
      <input
        type="radio"
        value="male"
        {...register("gender")}
        className="visually-hidden"
      />
      <span className="fs-3 mb-2">👦</span>
      <span className="small fw-medium">Băiat</span>
    </label>
  </div>
  {/* Repeat for female and other */}
</div>
```

**Lines per implementation**: 70-80 lines (for 3 options)
**Total occurrences**: 1 form
**Potential reuse**: Any choice selection with icons
**Needs**: `RadioButtonGroupField` component

---

## 2. Component Extraction Opportunities

### 2.1 HIGH PRIORITY Components

#### 1. `useOnboardingForm` Hook Enhancement

**Current Status**: Hook exists but NOT being used by any form!

**Problem**: All 14 forms manually implement submission logic instead of using the hook

**Solution**: Enhance hook and migrate all forms to use it

**Before** (40 lines per form):

```typescript
const [isLoading, setIsLoading] = useState(false);
const [serverError, setServerError] = useState<string | null>(null);

const onSubmit = async (data: FormInput) => {
  setIsLoading(true);
  setServerError(null);

  try {
    const result = await serverAction(data);

    if (result.success) {
      router.push(routes.next.step);
    } else {
      setServerError(result.error);
    }
  } catch (error) {
    console.error("Error:", error);
    setServerError("A apărut o eroare neașteptată.");
  } finally {
    setIsLoading(false);
  }
};
```

**After** (4 lines):

```typescript
const { handleSubmit, isLoading, serverError } = useOnboardingForm({
  onSubmitAction: addChildOnboarding,
  onSuccessRoute: routes.onboarding.parent.tour,
});
```

**Impact**:

- **Files affected**: 14 forms
- **Code reduction**: ~500 lines (90% reduction in submission logic)
- **Complexity**: Low (hook already exists)
- **Estimated effort**: 4-6 hours
- **Priority**: 🔴 CRITICAL

**Migration Steps**:

1. Review and enhance `useOnboardingForm` if needed
2. Migrate one form as proof of concept
3. Apply to all 14 forms
4. Test all submission flows

---

#### 2. `CharacterCounterTextarea` Component

**Purpose**: Textarea with character counter and validation feedback

**Usage**: 5 forms (ClubBasicInfoForm, DoctorBioExperienceForm, etc.)

**Props Interface**:

```typescript
interface CharacterCounterTextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  minChars: number;
  maxChars: number;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  isLoading?: boolean;
  currentValue?: string;
}
```

**Before** (30 lines):

```typescript
const description = watch("description");
const descriptionLength = description?.length || 0;

<div className="mb-4">
  <label htmlFor="description" className="d-block small fw-medium text-body mb-2">
    Descriere club <span className="text-danger">*</span>
  </label>
  <BootstrapTextarea
    id="description"
    {...register("description")}
    rows={6}
    maxLength={1000}
    error={!!errors.description}
  />
  <div className="mt-2 d-flex justify-content-between">
    <p className="text-xs text-secondary">Minim 50 caractere, maxim 1000 caractere</p>
    <p className={cn("text-xs", descriptionLength < 50 ? "text-danger" : "text-secondary")}>
      {descriptionLength}/1000 caractere
    </p>
  </div>
  {errors.description && (
    <p className="mt-2 small text-danger">{errors.description.message}</p>
  )}
</div>
```

**After** (9 lines):

```typescript
<CharacterCounterTextarea
  label="Descriere club"
  name="description"
  register={register}
  error={errors.description}
  minChars={50}
  maxChars={1000}
  rows={6}
  placeholder="Descrie clubul tău..."
  required
/>
```

**Impact**:

- **Files affected**: 5 forms
- **Code reduction**: ~120 lines
- **Complexity**: Low
- **Estimated effort**: 2-3 hours
- **Priority**: 🔴 HIGH

---

#### 3. `MultiSelectCheckboxField` Component

**Purpose**: Multi-select with checkbox grid (ages, experience levels, languages)

**Usage**: 4 forms (ClubPricingAgesForm, DoctorBioExperienceForm)

**Props Interface**:

```typescript
interface MultiSelectCheckboxFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
  options: Array<{ value: string | number; label: string; icon?: string }>;
  required?: boolean;
  helpText?: string;
  description?: string;
  gridCols?: { xs?: number; sm?: number; md?: number; lg?: number };
  isLoading?: boolean;
  renderOption?: (option: Option, isSelected: boolean) => ReactNode;
}
```

**Before** (40 lines):

```typescript
<Controller
  name="ageGroups"
  control={control}
  render={({ field }) => (
    <div className="row g-3">
      {AGE_GROUPS.map((age) => {
        const isSelected = field.value?.includes(age) || false;
        return (
          <div key={age} className="col-4 col-sm-3 col-md-2">
            <label className={cn(
              "d-flex align-items-center justify-content-center p-3 border-2 rounded",
              isSelected
                ? "border-yuvoo-primary bg-yuvoo-primary-light"
                : "border-secondary bg-white"
            )}>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {
                  const newValue = isSelected
                    ? field.value.filter(a => a !== age)
                    : [...field.value, age];
                  field.onChange(newValue);
                }}
                className="visually-hidden"
              />
              <span>{age} ani</span>
            </label>
          </div>
        );
      })}
    </div>
  )}
/>
```

**After** (13 lines):

```typescript
<MultiSelectCheckboxField
  label="Grupe de vârstă"
  name="ageGroups"
  control={control}
  error={errors.ageGroups}
  options={AGE_GROUPS.map(age => ({
    value: age,
    label: `${age} ani`
  }))}
  gridCols={{ xs: 4, sm: 3, md: 2 }}
  required
  description="Selectează grupele de vârstă acceptate de club (4-14 ani)"
/>
```

**Impact**:

- **Files affected**: 4 forms (6 instances)
- **Code reduction**: ~200 lines
- **Complexity**: Medium
- **Estimated effort**: 4-5 hours
- **Priority**: 🔴 HIGH

---

#### 4. `TagInputField` Component

**Purpose**: Add/remove tags with quick-add buttons and custom input

**Usage**: 2 forms (DoctorBasicInfoForm credentials, DoctorBioExperienceForm languages)

**Props Interface**:

```typescript
interface TagInputFieldProps {
  label: string;
  name: string;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
  required?: boolean;
  helpText?: string;
  description?: string;
  placeholder?: string;
  quickAddOptions?: string[];
  maxTags?: number;
  isLoading?: boolean;
}
```

**Before** (100 lines):

```typescript
const [credentials, setCredentials] = useState<string[]>([]);
const [newCredential, setNewCredential] = useState("");

useEffect(() => {
  setValue("credentials", credentials, { shouldValidate: true });
}, [credentials, setValue]);

const addCredential = () => {
  if (newCredential.trim() && !credentials.includes(newCredential.trim())) {
    setCredentials([...credentials, newCredential.trim()]);
    setNewCredential("");
  }
};

const removeCredential = (credential: string) => {
  setCredentials(credentials.filter((c) => c !== credential));
};

// Quick add buttons
<div className="d-flex flex-wrap gap-2">
  {COMMON_CREDENTIALS.map((cred) => (
    <button
      onClick={() => !credentials.includes(cred) && setCredentials([...credentials, cred])}
      disabled={credentials.includes(cred)}
    >
      {cred}
    </button>
  ))}
</div>

// Custom input
<div className="d-flex gap-2">
  <BootstrapInput
    value={newCredential}
    onChange={(e) => setNewCredential(e.target.value)}
  />
  <BootstrapButton onClick={addCredential}>Adaugă</BootstrapButton>
</div>

// Display
{credentials.map((cred) => (
  <div key={cred}>
    <span>{cred}</span>
    <button onClick={() => removeCredential(cred)}>Șterge</button>
  </div>
))}
```

**After** (10 lines):

```typescript
<TagInputField
  label="Credențiale"
  name="credentials"
  setValue={setValue}
  error={errors.credentials}
  quickAddOptions={COMMON_CREDENTIALS}
  placeholder="Adaugă credențială personalizată"
  required
  description="Adaugă cel puțin o credențială (ex: MD, Specialist, etc.)"
/>
```

**Impact**:

- **Files affected**: 2 forms
- **Code reduction**: ~180 lines
- **Complexity**: Medium-High
- **Estimated effort**: 5-6 hours
- **Priority**: 🔴 HIGH

---

#### 5. `SingleImageUploadField` Component

**Purpose**: Single image upload with preview, delete, and loading states

**Usage**: 2 forms (ClubPhotosForm logo, DoctorPhotoForm photo)

**Props Interface**:

```typescript
interface SingleImageUploadFieldProps {
  label: string;
  name: string;
  setValue: UseFormSetValue<any>;
  currentValue?: string;
  error?: FieldError;
  folder: string;
  required?: boolean;
  helpText?: string;
  description?: string;
  acceptedFormats?: string[];
  maxSizeMB?: number;
  previewSize?: string;
  objectFit?: "contain" | "cover";
  isLoading?: boolean;
}
```

**Before** (70 lines):

```typescript
const [uploadingLogo, setUploadingLogo] = useState(false);
const logoInputRef = useRef<HTMLInputElement>(null);
const logoUrl = watch("logoUrl");

const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  setUploadingLogo(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "yuvoo/clubs/logos");

    const result = await uploadImageAction(formData);

    if (result.success && result.url) {
      if (logoUrl) {
        await deleteImageAction(logoUrl);
      }
      setValue("logoUrl", result.url);
    }
  } finally {
    setUploadingLogo(false);
  }
};

const handleRemoveLogo = async () => {
  if (logoUrl) {
    await deleteImageAction(logoUrl);
  }
  setValue("logoUrl", "");
};

{logoUrl ? (
  <ImagePreview
    src={logoUrl}
    onRemove={handleRemoveLogo}
    isUploading={uploadingLogo}
  />
) : (
  <FileUploadArea
    onClick={() => logoInputRef.current?.click()}
    isUploading={uploadingLogo}
  />
)}

<input
  ref={logoInputRef}
  type="file"
  onChange={handleLogoUpload}
  className="visually-hidden"
/>
```

**After** (10 lines):

```typescript
<SingleImageUploadField
  label="Logo club"
  name="logoUrl"
  setValue={setValue}
  currentValue={logoUrl}
  error={errors.logoUrl}
  folder="yuvoo/clubs/logos"
  required
  description="Încarcă logo-ul clubului (JPG, PNG sau WebP, maxim 5MB)"
/>
```

**Impact**:

- **Files affected**: 2 forms
- **Code reduction**: ~120 lines
- **Complexity**: Medium
- **Estimated effort**: 4-5 hours
- **Priority**: 🟡 MEDIUM-HIGH

---

### 2.2 MEDIUM PRIORITY Components

#### 6. `GalleryUploadField` Component

**Purpose**: Multiple image upload with grid preview

**Usage**: 1 form currently (ClubPhotosForm), potential for doctor profiles

**Props Interface**:

```typescript
interface GalleryUploadFieldProps {
  label: string;
  name: string;
  setValue: UseFormSetValue<any>;
  currentValues?: string[];
  error?: FieldError;
  folder: string;
  minImages?: number;
  maxImages?: number;
  required?: boolean;
  helpText?: string;
  description?: string;
  gridCols?: { xs?: number; sm?: number; md?: number; lg?: number };
  acceptedFormats?: string[];
  maxSizeMB?: number;
  isLoading?: boolean;
}
```

**Impact**:

- **Files affected**: 1 form (potential 2-3 in future)
- **Code reduction**: ~80 lines
- **Complexity**: Medium-High
- **Estimated effort**: 5-6 hours
- **Priority**: 🟡 MEDIUM

---

#### 7. `DocumentUploadField` Component

**Purpose**: Multiple document upload with file icons and preview

**Usage**: 2 forms (ClubVerificationForm, DoctorVerificationForm)

**Props Interface**:

```typescript
interface DocumentUploadFieldProps {
  label: string;
  name: string;
  setValue: UseFormSetValue<any>;
  currentValues?: string[];
  error?: FieldError;
  folder: string;
  minDocuments?: number;
  maxDocuments?: number;
  required?: boolean;
  helpText?: string;
  description?: string;
  acceptedFormats?: string[];
  maxSizeMB?: number;
  isLoading?: boolean;
}
```

**Impact**:

- **Files affected**: 2 forms
- **Code reduction**: ~140 lines
- **Complexity**: Medium
- **Estimated effort**: 4-5 hours
- **Priority**: 🟡 MEDIUM

---

#### 8. `RadioButtonGroupField` Component

**Purpose**: Visual radio button group with icons/emojis

**Usage**: 1 form currently (AddChildForm gender), potential for other choices

**Props Interface**:

```typescript
interface RadioButtonGroupFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  options: Array<{ value: string; label: string; icon?: string; emoji?: string }>;
  required?: boolean;
  helpText?: string;
  description?: string;
  gridCols?: { xs?: number; sm?: number; md?: number };
  isLoading?: boolean;
}
```

**Impact**:

- **Files affected**: 1 form (potential 3-4 in future)
- **Code reduction**: ~60 lines
- **Complexity**: Low-Medium
- **Estimated effort**: 3-4 hours
- **Priority**: 🟡 MEDIUM

---

#### 9. `DatePickerWithAgeField` Component

**Purpose**: Date picker with automatic age calculation and display

**Usage**: 1 form currently (AddChildForm), potential for other age-based forms

**Props Interface**:

```typescript
interface DatePickerWithAgeFieldProps {
  label: string;
  name: string;
  setValue: UseFormSetValue<any>;
  currentValue?: Date;
  error?: FieldError;
  required?: boolean;
  helpText?: string;
  description?: string;
  minAge?: number;
  maxAge?: number;
  isLoading?: boolean;
}
```

**Impact**:

- **Files affected**: 1 form (potential 2-3 in future)
- **Code reduction**: ~45 lines
- **Complexity**: Medium
- **Estimated effort**: 3-4 hours
- **Priority**: 🟢 LOW-MEDIUM

---

### 2.3 LOW PRIORITY / Future Considerations

#### 10. `DynamicFieldArrayBuilder` Component

**Purpose**: Generic builder for add/remove field arrays (schedules, pricing)

**Usage**: 2 instances (ClubContactScheduleForm, ClubPricingAgesForm)

**Complexity**: High (requires flexible field rendering)

**Priority**: 🟢 LOW (specific use cases, complex to generalize)

**Recommendation**: Keep as-is for now, revisit if pattern repeats 3+ times

---

## 3. Utility Function Recommendations

### 3.1 Date Utilities

**Location**: `lib/utils/date.ts`

```typescript
/**
 * Format date for HTML date input (YYYY-MM-DD)
 */
export function formatDateForInput(date?: Date): string {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth?: Date): number | null {
  if (!dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
```

**Usage**: 1 form (AddChildForm), extracted from inline functions

---

### 3.2 File Upload Utilities

**Location**: `lib/utils/uploads.ts`

```typescript
/**
 * Get file icon component based on file extension
 */
export function getFileIcon(url: string): ReactNode {
  if (url.toLowerCase().endsWith(".pdf")) {
    return <FileText className="w-8 h-8 text-danger" />;
  }
  if (url.toLowerCase().match(/\.(doc|docx)$/)) {
    return <File className="w-8 h-8 text-yuvoo-primary" />;
  }
  return <File className="w-8 h-8 text-secondary" />;
}

/**
 * Extract filename from URL
 */
export function getFileNameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split("/").pop() || "document";
    return decodeURIComponent(filename);
  } catch {
    return "document";
  }
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, maxSizeMB: number): boolean {
  return file.size <= maxSizeMB * 1024 * 1024;
}

/**
 * Validate file type
 */
export function validateFileType(file: File, acceptedTypes: string[]): boolean {
  return acceptedTypes.some(type => file.type.includes(type) || file.name.endsWith(type));
}
```

**Usage**: 2 forms (ClubVerificationForm, DoctorVerificationForm)

---

## 4. Hook Enhancement Recommendations

### 4.1 `useOnboardingForm` Hook - Current State

**Status**: ✅ Hook exists but **NOT being used**

**Current Implementation**: Good foundation with basic features

**Existing Features**:

- Loading state management
- Error handling
- Success navigation
- Optional data transformation
- Success/error callbacks

**Gap Analysis**: Missing features that forms currently implement manually:

- Phone number normalization
- Array field validation
- Multi-step data persistence
- Form state persistence on navigation

---

### 4.2 Proposed `useOnboardingForm` Enhancement

**Enhanced Hook Interface**:

```typescript
interface UseOnboardingFormOptions<T> {
  /** Server action to call */
  onSubmitAction: (data: T) => Promise<ActionResult>;
  /** Success route */
  onSuccessRoute: string;
  /** Optional data transformer */
  transformData?: (data: T) => T | Promise<T>;
  /** Optional success callback */
  onSuccess?: (result: ActionResult) => void | Promise<void>;
  /** Optional error callback */
  onError?: (error: string) => void;
  /** Auto-save draft? */
  enableDraft?: boolean;
  /** Draft key for localStorage */
  draftKey?: string;
}

// Enhanced return type
interface UseOnboardingFormReturn {
  handleSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
  setServerError: (error: string | null) => void;
  // New:
  saveDraft: (data: any) => void;
  loadDraft: () => any | null;
  clearDraft: () => void;
  hasDraft: boolean;
}
```

**New Features**:

1. **Draft Auto-Save**: Save form progress to localStorage
2. **Draft Recovery**: Load saved draft on mount
3. **Async Transform**: Support for async data transformers (e.g., image uploads before submit)

**Migration Priority**: 🔴 CRITICAL - Must be completed before other components

---

## 5. Priority Matrix

### 5.1 Impact vs Effort Analysis

| Component                     | Impact      | Effort      | Files | Lines Saved | Priority       |
| ----------------------------- | ----------- | ----------- | ----- | ----------- | -------------- |
| useOnboardingForm enhancement | Very High   | Low         | 14    | ~500        | 🔴 CRITICAL    |
| CharacterCounterTextarea      | High        | Low         | 5     | ~120        | 🔴 HIGH        |
| MultiSelectCheckboxField      | High        | Medium      | 4     | ~200        | 🔴 HIGH        |
| TagInputField                 | High        | Medium      | 2     | ~180        | 🔴 HIGH        |
| SingleImageUploadField        | Medium-High | Medium      | 2     | ~120        | 🟡 MEDIUM-HIGH |
| GalleryUploadField            | Medium      | Medium-High | 1     | ~80         | 🟡 MEDIUM      |
| DocumentUploadField           | Medium      | Medium      | 2     | ~140        | 🟡 MEDIUM      |
| RadioButtonGroupField         | Medium      | Low-Medium  | 1     | ~60         | 🟡 MEDIUM      |
| DatePickerWithAgeField        | Low-Medium  | Medium      | 1     | ~45         | 🟢 LOW-MEDIUM  |
| DynamicFieldArrayBuilder      | Low         | High        | 2     | ~100        | 🟢 LOW         |

---

### 5.2 Recommended Implementation Phases

#### **Phase 1: Foundation** (Week 1) - 🔴 CRITICAL

**Goal**: Establish core patterns and eliminate largest duplications

1. **useOnboardingForm Migration** (4-6 hours)
   - Enhance hook if needed
   - Migrate all 14 forms
   - Test submission flows
   - **Impact**: ~500 lines removed, 90% reduction in submission logic

2. **CharacterCounterTextarea** (2-3 hours)
   - Create component
   - Migrate 5 forms
   - **Impact**: ~120 lines removed

**Total Phase 1**: ~140 hours, ~620 lines removed

---

#### **Phase 2: Form Inputs** (Week 2) - 🔴 HIGH

**Goal**: Standardize all complex input patterns

3. **MultiSelectCheckboxField** (4-5 hours)
   - Create component with flexible grid system
   - Migrate age groups, experience levels, languages
   - **Impact**: ~200 lines removed

4. **TagInputField** (5-6 hours)
   - Create component with quick-add and custom input
   - Migrate credentials, custom languages
   - **Impact**: ~180 lines removed

**Total Phase 2**: 9-11 hours, ~380 lines removed

---

#### **Phase 3: File Uploads** (Week 3) - 🟡 MEDIUM

**Goal**: Simplify all file upload implementations

5. **SingleImageUploadField** (4-5 hours)
   - Create component with upload/preview/delete
   - Migrate logo, photo uploads
   - **Impact**: ~120 lines removed

6. **DocumentUploadField** (4-5 hours)
   - Create component with document handling
   - Migrate verification documents
   - **Impact**: ~140 lines removed

7. **GalleryUploadField** (5-6 hours)
   - Create component with grid layout
   - Migrate gallery uploads
   - **Impact**: ~80 lines removed

**Total Phase 3**: 13-16 hours, ~340 lines removed

---

#### **Phase 4: Specialized Inputs** (Week 4) - 🟢 OPTIONAL

**Goal**: Handle remaining specialized patterns

8. **RadioButtonGroupField** (3-4 hours)
   - Create visual radio group component
   - Migrate gender selection
   - **Impact**: ~60 lines removed

9. **DatePickerWithAgeField** (3-4 hours)
   - Create date picker with age calculation
   - Migrate date of birth field
   - **Impact**: ~45 lines removed

**Total Phase 4**: 6-8 hours, ~105 lines removed

---

### 5.3 Total Project Impact

**Total Effort**: 28-41 hours (~1 week for 1 developer, 3-5 days for team)

**Total Code Reduction**:

- **Lines removed**: ~1,445 lines (estimated)
- **Percentage reduction**: ~40-50% of form code
- **Files affected**: All 14 onboarding forms

**Maintenance Benefits**:

- Single source of truth for form patterns
- Consistent UI/UX across all forms
- Easier to add new forms
- Centralized bug fixes and improvements
- Better type safety

**Quality Improvements**:

- Consistent accessibility (ARIA attributes)
- Consistent error handling
- Consistent loading states
- Consistent validation feedback

---

## 6. Migration Strategy

### 6.1 Phase 1: Foundation Setup

**Step 1: Enhance useOnboardingForm Hook** (2 hours)

1. Review current implementation
2. Add draft save/load functionality if needed
3. Add async transform support if needed
4. Write comprehensive tests
5. Document usage patterns

**Step 2: Migrate One Form (Proof of Concept)** (1 hour)

Select: `AddChildForm` (simplest form, good test case)

1. Replace manual submission logic with hook
2. Test all scenarios (success, error, loading)
3. Verify navigation works
4. Document any issues

**Step 3: Migrate Remaining Forms** (3 hours)

1. Apply hook to all 13 remaining forms
2. Test each form individually
3. Run E2E tests for all onboarding flows
4. Fix any edge cases

---

### 6.2 Phase 2-4: Component Creation Pattern

For each new component:

**Step 1: Create Component** (40% of time)

1. Define TypeScript interface
2. Implement component logic
3. Add Bootstrap styling
4. Add accessibility attributes
5. Add loading/error states

**Step 2: Test Component** (20% of time)

1. Create test file
2. Test all props combinations
3. Test error states
4. Test accessibility

**Step 3: Document Component** (10% of time)

1. Add JSDoc comments
2. Create usage examples
3. Add to component guide

**Step 4: Migrate Forms** (30% of time)

1. Identify all usage locations
2. Replace old code with component
3. Test each migration
4. Verify UI/UX consistency

---

### 6.3 Testing Checklist

For each component migration:

**Functional Testing**:

- [ ] Component renders correctly
- [ ] All props work as expected
- [ ] Validation works (required, min/max, etc.)
- [ ] Error messages display correctly
- [ ] Loading states work
- [ ] Form submission includes field data
- [ ] Reset/clear functionality works

**Accessibility Testing**:

- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] ARIA attributes present and correct
- [ ] Focus management works
- [ ] Error associations correct

**Visual Testing**:

- [ ] Matches design system
- [ ] Responsive on all breakpoints
- [ ] Hover states work
- [ ] Focus states visible
- [ ] Loading states visible

**Integration Testing**:

- [ ] Works with React Hook Form
- [ ] Works with Zod validation
- [ ] Server action integration works
- [ ] Navigation after submit works
- [ ] Error handling works end-to-end

---

### 6.4 Rollout Strategy

**Approach**: Incremental rollout by user type

**Week 1: Foundation**

- Enhance useOnboardingForm
- Migrate all forms to use hook
- Create CharacterCounterTextarea
- **Deploy**: All forms with new submission logic

**Week 2: Parent Onboarding**

- Create RadioButtonGroupField
- Create DatePickerWithAgeField
- Migrate AddChildForm
- **Deploy**: Parent onboarding complete

**Week 3: Club Onboarding**

- Create MultiSelectCheckboxField
- Create SingleImageUploadField
- Create GalleryUploadField
- Create DocumentUploadField
- Migrate all club forms
- **Deploy**: Club onboarding complete

**Week 4: Doctor Onboarding**

- Create TagInputField
- Migrate all doctor forms
- **Deploy**: Doctor onboarding complete

**Week 5: Polish & Optimization**

- Fix any issues from production
- Optimize bundle size
- Add any missing features
- Update documentation

---

## 7. Implementation Examples

### 7.1 useOnboardingForm Migration

**Before** (AddChildForm.tsx - Lines 17-99):

```typescript
export function AddChildForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateChildInput>({
    resolver: zodResolver(createChildSchema),
  });

  const onSubmit = async (data: CreateChildInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await addChildOnboarding(data);

      if (result.success) {
        router.push(routes.onboarding.parent.tour);
      } else {
        setServerError(result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError("A apărut o eroare neașteptată. Te rugăm să încerci din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ServerErrorAlert error={serverError} />
      {/* ... fields ... */}
    </form>
  );
}
```

**After** (AddChildForm.tsx - Simplified):

```typescript
export function AddChildForm() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateChildInput>({
    resolver: zodResolver(createChildSchema),
  });

  const { handleSubmit, isLoading, serverError } = useOnboardingForm({
    onSubmitAction: addChildOnboarding,
    onSuccessRoute: routes.onboarding.parent.tour,
  });

  return (
    <form onSubmit={handleSubmit}>
      <ServerErrorAlert error={serverError} />
      {/* ... fields ... */}
    </form>
  );
}
```

**Lines Removed**: 35 lines
**Complexity Reduction**: Submission logic extracted to reusable hook

---

### 7.2 CharacterCounterTextarea Example

**Before** (ClubBasicInfoForm.tsx - Lines 85-211):

```typescript
const description = watch("description");
const descriptionLength = description?.length || 0;

<div className="mb-4">
  <label htmlFor="description" className="d-block small fw-medium text-body mb-2">
    Descriere club <span className="text-danger">*</span>
  </label>
  <BootstrapTextarea
    id="description"
    {...register("description")}
    disabled={isLoading}
    rows={6}
    maxLength={1000}
    error={!!errors.description}
    className="w-100"
    style={{ minHeight: "120px", resize: "vertical" }}
    placeholder="Descrie clubul tău, programele oferite, facilitățile..."
    aria-invalid={errors.description ? "true" : "false"}
    aria-describedby={errors.description ? "description-error" : "description-help"}
  />
  <div className="mt-2 d-flex align-items-center justify-content-between">
    <div>
      {errors.description ? (
        <p id="description-error" className="small text-danger">
          {errors.description.message}
        </p>
      ) : (
        <p id="description-help" className="text-xs text-secondary">
          Minim 50 caractere, maxim 1000 caractere
        </p>
      )}
    </div>
    <p className="text-xs text-secondary">{descriptionLength}/1000 caractere</p>
  </div>
</div>
```

**After** (Using CharacterCounterTextarea):

```typescript
<CharacterCounterTextarea
  label="Descriere club"
  name="description"
  register={register}
  error={errors.description}
  minChars={50}
  maxChars={1000}
  rows={6}
  placeholder="Descrie clubul tău, programele oferite, facilitățile și experiența antrenorilor."
  required
  isLoading={isLoading}
  currentValue={watch("description")}
/>
```

**Component Implementation** (`components/onboarding/components/CharacterCounterTextarea.tsx`):

```typescript
"use client";

import { BootstrapTextarea } from "@/components/UI/bootstrap-index";
import { cn } from "@/lib/utils";
import { UseFormRegister, FieldError } from "react-hook-form";

interface CharacterCounterTextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  minChars: number;
  maxChars: number;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  isLoading?: boolean;
  currentValue?: string;
  className?: string;
}

export function CharacterCounterTextarea({
  label,
  name,
  register,
  error,
  minChars,
  maxChars,
  rows = 6,
  placeholder,
  required = false,
  helpText,
  isLoading = false,
  currentValue = "",
  className = "",
}: CharacterCounterTextareaProps) {
  const charCount = currentValue?.length || 0;
  const isUnderMin = charCount < minChars;
  const isOverMax = charCount > maxChars;
  const hasError = isUnderMin || isOverMax;

  return (
    <div className={cn("mb-4", className)}>
      <label htmlFor={name} className="d-block small fw-medium text-body mb-2">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>

      {helpText && <p className="small text-secondary mb-2">{helpText}</p>}

      <BootstrapTextarea
        id={name}
        {...register(name)}
        disabled={isLoading}
        rows={rows}
        maxLength={maxChars}
        error={!!error}
        className="w-100"
        style={{ resize: "vertical" }}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : `${name}-help`}
      />

      <div className="mt-2 d-flex align-items-center justify-content-between">
        <div className="flex-fill">
          {error ? (
            <p id={`${name}-error`} className="small text-danger">
              {error.message}
            </p>
          ) : (
            <p id={`${name}-help`} className="text-xs text-secondary">
              Minim {minChars} caractere, maxim {maxChars} caractere
            </p>
          )}
        </div>

        <p
          className={cn(
            "text-xs ms-3",
            hasError ? "text-danger" : "text-secondary"
          )}
          style={{ whiteSpace: "nowrap" }}
        >
          {charCount} / {maxChars}
        </p>
      </div>
    </div>
  );
}
```

**Lines Saved**: ~25 lines per usage × 5 forms = ~125 lines

---

### 7.3 MultiSelectCheckboxField Example

**Before** (ClubPricingAgesForm.tsx - Lines 249-313):

```typescript
<div className="mb-4">
  <label className="d-block small fw-medium text-body mb-3">
    Grupe de vârstă <span className="text-danger">*</span>
  </label>
  <p className="text-xs text-secondary mb-3">
    Selectează grupele de vârstă acceptate de club (4-14 ani)
  </p>

  <Controller
    name="ageGroups"
    control={control}
    render={({ field }) => (
      <div className="row g-3">
        {AGE_GROUPS.map((age) => {
          const isSelected = field.value?.includes(age) || false;
          return (
            <div key={age} className="col-4 col-sm-3 col-md-2">
              <label
                className={cn(
                  "d-flex align-items-center justify-content-center p-3 border-2 rounded cursor-pointer",
                  isSelected
                    ? "border-yuvoo-primary bg-yuvoo-primary-light text-yuvoo-primary"
                    : "border-secondary bg-white text-body border-secondary-hover",
                  isLoading && "opacity-50"
                )}
                style={{
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <input
                  type="checkbox"
                  value={age}
                  checked={isSelected}
                  onChange={() => {
                    const current = field.value || [];
                    const newValue = isSelected
                      ? current.filter((a: number) => a !== age)
                      : [...current, age].sort((a: number, b: number) => a - b);
                    field.onChange(newValue);
                  }}
                  disabled={isLoading}
                  className="visually-hidden"
                />
                <span className="fw-medium">{age} ani</span>
              </label>
            </div>
          );
        })}
      </div>
    )}
  />

  {errors.ageGroups && <p className="mt-2 small text-danger">{errors.ageGroups.message}</p>}
</div>
```

**After** (Using MultiSelectCheckboxField):

```typescript
<MultiSelectCheckboxField
  label="Grupe de vârstă"
  name="ageGroups"
  control={control}
  error={errors.ageGroups}
  options={AGE_GROUPS.map((age) => ({
    value: age,
    label: `${age} ani`,
  }))}
  gridCols={{ xs: 4, sm: 3, md: 2 }}
  required
  description="Selectează grupele de vârstă acceptate de club (4-14 ani)"
  isLoading={isLoading}
/>
```

**Component Implementation** (`components/onboarding/components/MultiSelectCheckboxField.tsx`):

```typescript
"use client";

import { Control, Controller, FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Option {
  value: string | number;
  label: string;
  icon?: string;
  emoji?: string;
}

interface MultiSelectCheckboxFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
  options: Option[];
  required?: boolean;
  helpText?: string;
  description?: string;
  gridCols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  isLoading?: boolean;
  className?: string;
}

export function MultiSelectCheckboxField({
  label,
  name,
  control,
  error,
  options,
  required = false,
  helpText,
  description,
  gridCols = { xs: 12, sm: 6, md: 4 },
  isLoading = false,
  className = "",
}: MultiSelectCheckboxFieldProps) {
  const getColClass = () => {
    const classes = [];
    if (gridCols.xs) classes.push(`col-${gridCols.xs}`);
    if (gridCols.sm) classes.push(`col-sm-${gridCols.sm}`);
    if (gridCols.md) classes.push(`col-md-${gridCols.md}`);
    if (gridCols.lg) classes.push(`col-lg-${gridCols.lg}`);
    return classes.join(" ");
  };

  return (
    <div className={cn("mb-4", className)}>
      <label className="d-block small fw-medium text-body mb-3">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>

      {description && <p className="text-xs text-secondary mb-3">{description}</p>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="row g-3">
            {options.map((option) => {
              const isSelected = field.value?.includes(option.value) || false;

              return (
                <div key={String(option.value)} className={getColClass()}>
                  <label
                    className={cn(
                      "d-flex align-items-center justify-content-center p-3 border-2 rounded",
                      isSelected
                        ? "border-yuvoo-primary bg-yuvoo-primary-light text-yuvoo-primary"
                        : "border-secondary bg-white text-body",
                      !isLoading && "cursor-pointer border-secondary-hover",
                      isLoading && "opacity-50"
                    )}
                    style={{
                      cursor: isLoading ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <input
                      type="checkbox"
                      value={String(option.value)}
                      checked={isSelected}
                      onChange={() => {
                        const current = field.value || [];
                        const newValue = isSelected
                          ? current.filter((v: any) => v !== option.value)
                          : [...current, option.value];
                        field.onChange(newValue);
                      }}
                      disabled={isLoading}
                      className="visually-hidden"
                    />

                    {option.emoji && (
                      <span className="me-2" aria-hidden="true">
                        {option.emoji}
                      </span>
                    )}

                    {option.icon && (
                      <span className="me-2" aria-hidden="true">
                        {option.icon}
                      </span>
                    )}

                    <span className="fw-medium">{option.label}</span>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      />

      {error && (
        <p className="mt-2 small text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
```

**Lines Saved**: ~40 lines per usage × 4 forms = ~160 lines

---

### 7.4 TagInputField Example

**Before** (DoctorBasicInfoForm.tsx - Lines 55-316):

```typescript
const [credentials, setCredentials] = useState<string[]>([]);
const [newCredential, setNewCredential] = useState("");

useEffect(() => {
  setValue("credentials", credentials, { shouldValidate: true });
}, [credentials, setValue]);

const addCredential = () => {
  if (newCredential.trim() && !credentials.includes(newCredential.trim())) {
    const updated = [...credentials, newCredential.trim()];
    setCredentials(updated);
    setValue("credentials", updated, { shouldValidate: true });
    setNewCredential("");
  }
};

const removeCredential = (credential: string) => {
  const updated = credentials.filter((c) => c !== credential);
  setCredentials(updated);
  setValue("credentials", updated, { shouldValidate: true });
};

const addCommonCredential = (credential: string) => {
  if (!credentials.includes(credential)) {
    const updated = [...credentials, credential];
    setCredentials(updated);
    setValue("credentials", updated, { shouldValidate: true });
  }
};

<div className="mb-4">
  <label>
    Credențiale <span className="text-danger">*</span>
  </label>

  {/* Quick add buttons */}
  <div className="d-flex flex-wrap gap-2">
    {COMMON_CREDENTIALS.map((cred) => (
      <button
        key={cred}
        type="button"
        onClick={() => addCommonCredential(cred)}
        disabled={credentials.includes(cred)}
      >
        {cred}
      </button>
    ))}
  </div>

  {/* Custom input */}
  <div className="d-flex gap-2">
    <BootstrapInput
      value={newCredential}
      onChange={(e) => setNewCredential(e.target.value)}
      placeholder="Adaugă credențială personalizată"
    />
    <BootstrapButton onClick={addCredential}>
      Adaugă
    </BootstrapButton>
  </div>

  {/* Selected tags */}
  {credentials.map((cred) => (
    <div key={cred}>
      <span>{cred}</span>
      <button onClick={() => removeCredential(cred)}>Șterge</button>
    </div>
  ))}

  {errors.credentials && <p>{errors.credentials.message}</p>}
</div>
```

**After** (Using TagInputField):

```typescript
<TagInputField
  label="Credențiale"
  name="credentials"
  setValue={setValue}
  error={errors.credentials}
  quickAddOptions={COMMON_CREDENTIALS}
  placeholder="Adaugă credențială personalizată"
  required
  description="Adaugă cel puțin o credențială (ex: MD, Specialist, etc.)"
  isLoading={isLoading}
/>
```

**Component Implementation** (`components/onboarding/components/TagInputField.tsx`):

```typescript
"use client";

import { useState, useEffect } from "react";
import { UseFormSetValue, FieldError } from "react-hook-form";
import { BootstrapInput, BootstrapButton } from "@/components/UI/bootstrap-index";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TagInputFieldProps {
  label: string;
  name: string;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
  required?: boolean;
  helpText?: string;
  description?: string;
  placeholder?: string;
  quickAddOptions?: readonly string[];
  maxTags?: number;
  isLoading?: boolean;
  className?: string;
}

export function TagInputField({
  label,
  name,
  setValue,
  error,
  required = false,
  helpText,
  description,
  placeholder = "Adaugă",
  quickAddOptions = [],
  maxTags,
  isLoading = false,
  className = "",
}: TagInputFieldProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Sync tags with form state
  useEffect(() => {
    setValue(name, tags, { shouldValidate: true });
  }, [tags, setValue, name]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    if (maxTags && tags.length >= maxTags) return;

    setTags([...tags, trimmed]);
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const isMaxReached = maxTags ? tags.length >= maxTags : false;

  return (
    <div className={cn("mb-4", className)}>
      <label className="d-flex align-items-center gap-2 small fw-medium text-body mb-2">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
        {helpText && <InfoTooltip content={helpText} size="sm" />}
      </label>

      {description && <p className="small text-secondary mb-3">{description}</p>}

      {/* Quick add buttons */}
      {quickAddOptions.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-secondary mb-2">Adaugă rapid:</p>
          <div className="d-flex flex-wrap gap-2">
            {quickAddOptions.map((option) => {
              const isAdded = tags.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => addTag(option)}
                  disabled={isAdded || isMaxReached || isLoading}
                  className={cn(
                    "px-3 py-1 small rounded border",
                    isAdded
                      ? "bg-light text-secondary border-secondary cursor-not-allowed"
                      : "bg-white text-body border-secondary",
                    !isAdded && !isMaxReached && !isLoading && "text-secondary-hover cursor-pointer"
                  )}
                  style={{
                    cursor: isAdded || isMaxReached || isLoading ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Custom input */}
      <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
        <BootstrapInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isMaxReached || isLoading}
          className="flex-fill"
        />
        <BootstrapButton
          type="button"
          onClick={() => addTag(inputValue)}
          disabled={!inputValue.trim() || isMaxReached || isLoading}
          variant="primary"
          className="bg-yuvoo-primary text-white"
          style={{ whiteSpace: "nowrap" }}
        >
          Adaugă
        </BootstrapButton>
      </div>

      {/* Selected tags */}
      {tags.length > 0 && (
        <div className="mb-3">
          {tags.map((tag) => (
            <div
              key={tag}
              className="d-flex align-items-center justify-content-between px-3 py-2 bg-light rounded mb-2"
            >
              <span className="small text-body">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                disabled={isLoading}
                className="text-danger border-0 bg-transparent p-0"
                style={{ transition: "color 0.2s ease-in-out" }}
                aria-label={`Șterge ${tag}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Max tags info */}
      {maxTags && (
        <p className="text-xs text-secondary mb-2">
          {tags.length}/{maxTags} {tags.length === 1 ? "element adăugat" : "elemente adăugate"}
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-2 small text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
```

**Lines Saved**: ~90 lines per usage × 2 forms = ~180 lines

---

## 8. Maintenance & Evolution

### 8.1 Component Versioning Strategy

**Versioning Approach**: Semantic versioning for breaking changes

**Guidelines**:

- **Patch (1.0.x)**: Bug fixes, no API changes
- **Minor (1.x.0)**: New features, backward compatible
- **Major (x.0.0)**: Breaking changes, migration required

**Deprecation Process**:

1. Mark old API as deprecated with JSDoc `@deprecated`
2. Add console warnings in development
3. Provide migration guide
4. Keep deprecated API for 2 minor versions
5. Remove in next major version

---

### 8.2 Component Documentation

**Required Documentation**:

1. **JSDoc Comments**: All props, types, and main function
2. **Usage Examples**: At least 2 examples in component file
3. **Props Table**: Generated from TypeScript types
4. **Accessibility Notes**: ARIA attributes, keyboard navigation
5. **Migration Guide**: Before/after examples when applicable

**Documentation Location**:

- Component-level: In-file JSDoc
- Feature-level: `docs/COMPONENTS_GUIDE.md`
- Project-level: This analysis document

---

### 8.3 Testing Strategy

**Unit Tests** (Required):

- Component renders with all prop combinations
- Error states display correctly
- Loading states work
- Accessibility attributes present
- User interactions work

**Integration Tests** (Required):

- Works with React Hook Form
- Works with Zod validation
- Form submission includes field data
- Error messages from validation display

**E2E Tests** (Recommended):

- Full onboarding flows work end-to-end
- All steps navigate correctly
- Form data persists across steps
- Server errors handled gracefully

---

### 8.4 Performance Monitoring

**Bundle Size Tracking**:

- Monitor component bundle sizes
- Flag components >10KB
- Use code splitting for large components
- Tree-shake unused code

**Runtime Performance**:

- Monitor render times
- Flag components >50ms render time
- Optimize re-renders with React.memo
- Profile with React DevTools

---

## 9. Conclusion

### 9.1 Summary of Findings

This comprehensive analysis identified **significant opportunities for code reduction and standardization** across all onboarding forms:

**Key Metrics**:

- **Total forms analyzed**: 14
- **Code duplication identified**: ~40-50%
- **Estimated lines to remove**: ~1,445 lines
- **Components to create**: 9 reusable components
- **Total effort**: 28-41 hours (~1 week)

**Critical Finding**: `useOnboardingForm` hook exists but is NOT being used by any form, representing immediate 500-line reduction opportunity.

---

### 9.2 Recommended Next Steps

**Immediate Actions** (This Week):

1. ✅ Review this analysis with team
2. ✅ Prioritize Phase 1 components
3. ✅ Assign developers to implementation
4. ✅ Set up testing environment

**Phase 1 Implementation** (Next Week):

1. Migrate all forms to `useOnboardingForm` hook
2. Create and deploy `CharacterCounterTextarea`
3. Test all onboarding flows
4. Deploy to production

**Ongoing Work** (Weeks 2-4):

1. Implement remaining components by priority
2. Migrate forms incrementally
3. Monitor production for issues
4. Gather user feedback

---

### 9.3 Long-Term Benefits

**Code Quality**:

- Single source of truth for form patterns
- Consistent UI/UX across all forms
- Centralized bug fixes
- Better type safety

**Developer Experience**:

- Faster to add new onboarding forms
- Less boilerplate code to write
- Clear patterns to follow
- Better documentation

**User Experience**:

- Consistent interactions
- Better accessibility
- Faster page loads (smaller bundle)
- Fewer bugs

**Maintenance**:

- Easier to update designs
- Faster to fix bugs
- Simpler to add features
- Lower technical debt

---

**End of Analysis**

---

**Document Metadata**:

- **Version**: 1.0
- **Date**: December 2024
- **Author**: Claude Code Analysis
- **Status**: Ready for Review
- **Next Review**: After Phase 1 completion
