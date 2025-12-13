# Onboarding Components Analysis Prompt

## Objective

Analyze the onboarding components in `src/components/features/onboarding/` to identify recurring patterns, code duplication, and opportunities for creating reusable components that can reduce boilerplate and improve maintainability.

## Scope

### Components to Analyze

Analyze all form components in `src/components/features/onboarding/`:

**Parent Onboarding:**

- `AddChildForm.tsx`

**Club Onboarding:**

- `ClubBasicInfoForm.tsx`
- `ClubContactScheduleForm.tsx`
- `ClubPricingAgesForm.tsx`
- `ClubPhotosForm.tsx`
- `ClubVerificationForm.tsx`
- `ClubCompletionContent.tsx`

**Doctor Onboarding:**

- `DoctorBasicInfoForm.tsx`
- `DoctorBioExperienceForm.tsx`
- `DoctorLocationContactForm.tsx`
- `DoctorPhotoForm.tsx`
- `DoctorVerificationForm.tsx`
- `DoctorAvailabilityForm.tsx`
- `DoctorCompletionContent.tsx`

**Shared Components (already exist, review for completeness):**

- `OnboardingLayout.tsx`
- `OnboardingProgress.tsx`
- `OnboardingNavigation.tsx`
- `components/ServerErrorAlert.tsx`
- `components/FormField.tsx`
- `components/FormSection.tsx`
- `components/InfoBox.tsx`
- `components/FileUploadArea.tsx`
- `components/ImagePreview.tsx`
- `components/DocumentPreview.tsx`

## Analysis Criteria

### 1. Code Duplication Patterns

Identify repetitive code patterns across forms:

#### Form Submission Logic

- Look for repeated patterns of:
  - `useState` for `isLoading` and `serverError`
  - Form submission handlers with try/catch blocks
  - Navigation logic after successful submission
  - Error handling patterns
- Check if `useOnboardingForm` hook covers all cases or needs enhancement

#### Form Field Structures

- Compare field implementations across forms:
  - Label + Input + Error Message patterns
  - Required field indicators (`*`)
  - Help text/tooltips
  - Character counters for textareas
  - Placeholder text patterns
  - ARIA attributes and accessibility patterns

#### Input Types

Identify repeated input patterns:

- Text inputs (firstName, lastName, name, address, etc.)
- Textarea inputs (description, bio, experience, etc.)
- Select dropdowns (city, sport type, specialty, etc.)
- Date inputs (with age calculation)
- Time inputs (for schedules)
- Radio button groups (gender, availability options)
- Multi-select patterns (credentials, sports, etc.)
- File/image uploads (logos, photos, documents)
- Number inputs (prices, ages, capacity)

#### Layout Patterns

- Form section groupings
- Info boxes and help text placement
- Navigation button placement
- Responsive design patterns
- Spacing and margin patterns (`mb-4`, `mt-4`, etc.)

### 2. Component Extraction Opportunities

Identify opportunities to create new reusable components:

#### Form Field Wrappers

- **RadioButtonGroup**: For gender selection, availability options, etc.
  - Check patterns in `AddChildForm.tsx` (gender selection)
  - Look for similar patterns in other forms
- **DatePickerField**: For date inputs with age calculation
  - Check `AddChildForm.tsx` date of birth pattern
  - Age calculation and display
  - Date formatting logic
- **CharacterCounter**: For textarea fields with character limits
  - Check textarea implementations with character counting
  - Current/max display patterns
- **MultiSelectField**: For selecting multiple items (credentials, tags, etc.)
  - Check `DoctorBasicInfoForm.tsx` credentials pattern
  - Add/remove functionality
  - Quick-add buttons for common options

#### Complex Form Sections

- **ScheduleBuilder**: For time-based schedules (if pattern exists)
  - Check `ClubContactScheduleForm.tsx`
  - Check `DoctorAvailabilityForm.tsx`
- **PriceRangeInput**: For price inputs (min/max, currency)
  - Check `ClubPricingAgesForm.tsx`
- **AgeRangeInput**: For age range inputs (min/max age)
  - Check `ClubPricingAgesForm.tsx`

#### Image Upload Patterns

- **ImageUploadField**: For single image uploads (logos, photos)
  - Check logo upload in `ClubPhotosForm.tsx`
  - Check photo upload in `DoctorPhotoForm.tsx`
  - Preview, upload, delete patterns
- **GalleryUploadField**: For multiple image uploads
  - Check gallery upload in `ClubPhotosForm.tsx`
  - Multiple file handling
  - Grid preview layout

#### Document Upload Patterns

- **DocumentUploadField**: For document uploads (verification docs)
  - Check `ClubVerificationForm.tsx`
  - Check `DoctorVerificationForm.tsx`
  - Preview and validation patterns

### 3. Utility Function Extraction

Identify repeated utility functions:

- Date formatting functions
- Age calculation logic
- Image upload handlers
- File validation functions
- Character counting logic
- Form data transformation functions

### 4. Validation Patterns

Identify common validation patterns:

- Field validation error messages
- Server-side error handling
- Client-side validation feedback
- Real-time validation patterns

### 5. Accessibility Patterns

Review accessibility implementations:

- ARIA attributes consistency
- Error message associations
- Label associations
- Keyboard navigation
- Screen reader support
- Focus management

### 6. Styling Patterns

Identify repeated styling patterns:

- Bootstrap class usage
- Custom Yuvoo brand colors
- Spacing utilities
- Responsive breakpoints
- Hover states and transitions
- Loading states (disabled inputs, opacity)

## Deliverables

### 1. Pattern Analysis Report

Create a comprehensive report identifying:

#### Repeated Code Blocks

List exact code patterns that appear in multiple files, with:

- File locations and line numbers
- Frequency of repetition
- Variation in implementation

#### Component Extraction Recommendations

For each recommended component, provide:

- Component name
- Purpose and use cases
- Props interface (TypeScript)
- Usage examples (before/after)
- Files that would benefit
- Estimated code reduction

#### Hook Enhancement Recommendations

- Review `useOnboardingForm` hook
- Identify missing patterns it could handle
- Suggest enhancements or new hooks

#### Utility Function Recommendations

- List utility functions to extract
- Suggested location (`lib/utils/` or module-specific)
- Type signatures

### 2. Priority Matrix

Categorize recommendations by:

- **High Priority**: Significant code reduction, used in 3+ forms
- **Medium Priority**: Moderate code reduction, used in 2-3 forms
- **Low Priority**: Small improvement, used in 1-2 forms
- **Future Consideration**: Nice to have, but not critical

### 3. Migration Strategy

For high-priority items, provide:

- Step-by-step migration plan
- Backward compatibility considerations
- Testing checklist
- Rollout order (which forms to migrate first)

### 4. Code Examples

Provide before/after examples for:

- At least 3 high-priority component extractions
- Improved hook usage patterns
- Utility function implementations

## Constraints & Considerations

### Technical Constraints

- Must use Bootstrap 5.3.3 (no Tailwind classes)
- Must maintain Romanian language for all user-facing text
- Must use React Hook Form patterns already established
- Must use existing Bootstrap UI components from `@/components/UI/bootstrap-index`
- Must maintain TypeScript strict mode compliance
- Must follow existing code structure and patterns

### Existing Components

- Review `FormField.tsx` - is it being used? Could it be enhanced?
- Review `useOnboardingForm` hook - does it cover all cases?
- Check if `InfoBox` and `ServerErrorAlert` are used consistently

### Design System

- All components must follow Yuvoo brand guidelines
- Must use design tokens from `memory-bank/designSystem.md`
- Must maintain consistent spacing and typography

### Accessibility

- All new components must be WCAG AA compliant
- Must maintain ARIA attributes
- Must support keyboard navigation
- Must work with screen readers

## Success Metrics

After analysis, the recommendations should:

- Reduce code duplication by at least 30% in onboarding forms
- Create at least 3-5 highly reusable components
- Improve consistency across all forms
- Maintain or improve accessibility
- Maintain or improve type safety
- Not break existing functionality

## Additional Context

### Reference Files

- Review `IMPROVEMENTS.md` in onboarding folder for recent improvements
- Review `memory-bank/designSystem.md` for design tokens
- Review `docs/COMPONENTS_GUIDE.md` for component patterns
- Review `docs/BRAND_GUIDELINES.md` for UI/UX guidelines

### Current State

- Some reusable components already exist (`FormField`, `ServerErrorAlert`, `InfoBox`)
- Form submission hook exists (`useOnboardingForm`)
- Bootstrap UI components are already abstracted
- All forms use React Hook Form with Zod validation

### Goals

1. Identify patterns not yet abstracted
2. Reduce boilerplate code in forms
3. Improve developer experience when creating new forms
4. Maintain code quality and consistency
5. Ensure accessibility and usability remain high

## Analysis Approach

1. **Code Search**: Use grep/codebase search to find repeated patterns
2. **Component Comparison**: Compare similar fields across different forms
3. **Pattern Identification**: Group similar implementations
4. **Usage Analysis**: Count how many times each pattern appears
5. **Extraction Feasibility**: Assess if patterns can be abstracted
6. **Impact Assessment**: Estimate code reduction and maintenance benefits
7. **Migration Complexity**: Assess effort to extract and migrate

## Expected Output Format

Create a markdown document with:

```markdown
# Onboarding Components Pattern Analysis

## Executive Summary

[Brief overview of findings]

## 1. Code Duplication Analysis

### 1.1 Form Submission Logic

### 1.2 Form Field Patterns

### 1.3 Input Type Patterns

...

## 2. Component Extraction Opportunities

### 2.1 High Priority

#### RadioButtonGroup

#### DatePickerField

...

### 2.2 Medium Priority

...

### 2.3 Low Priority

...

## 3. Utility Function Recommendations

...

## 4. Hook Enhancement Recommendations

...

## 5. Implementation Examples

...

## 6. Migration Plan

...

## 7. Priority Matrix

...
```

---

**Start the analysis by:**

1. Reading all form components thoroughly
2. Comparing similar patterns across files
3. Identifying the most frequently repeated code
4. Proposing concrete, actionable recommendations
5. Providing code examples for implementation
