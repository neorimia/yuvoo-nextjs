# Location Dropdown Component Implementation Prompt

## Overview

Create a reusable, accessible location dropdown component for Romanian locations (counties and cities) that can be used throughout the Yuvoo platform. This component will replace all text input fields for location selection with a proper two-level dropdown (county → city).

## Requirements

### Component Specifications

**File Location**: `src/components/shared/LocationDropdown.tsx`

**Component Name**: `LocationDropdown`

**Type**: Client Component (`"use client"`)

### Features

1. **Two-Level Selection**:
   - First dropdown: Select county (județ)
   - Second dropdown: Select city (oraș) - filtered by selected county
   - **Special Case - Bucharest**: When "București" county is selected, the second dropdown shows Bucharest sectors (Sector 1, Sector 2, etc.) instead of cities
   - City/Sector dropdown should be disabled until a county is selected

2. **Data Source**:
   - Import from `@/lib/db/locations-data`
   - Use `counties` array for county dropdown
   - Use `getCitiesByCounty(countyId)` helper function for city filtering
   - Use `getBucharestSectors()` helper function when București county is selected
   - All location data is already available in the codebase

3. **Props Interface**:

   ```typescript
   interface LocationDropdownProps {
     value?: string; // Current selected location (city name or full location string)
     onChange: (location: string) => void; // Callback with selected location string
     label?: string; // Optional custom label (default: "Locația ta")
     required?: boolean; // Whether field is required
     disabled?: boolean; // Whether field is disabled
     error?: string | null; // Error message to display
     id?: string; // HTML id attribute
     name?: string; // HTML name attribute
     className?: string; // Additional CSS classes
     placeholder?: {
       county?: string; // Default: "Selectează județul"
       city?: string; // Default: "Selectează orașul" (or "Selectează sectorul" for Bucharest)
     };
     showHelpText?: boolean; // Whether to show help text (default: true)
     helpText?: string; // Custom help text (default: "Vom folosi această informație pentru a-ți recomanda cluburi locale.")
   }
   ```

4. **Output Format**:
   - When both county and city are selected, return format: `"City Name, County Name"` (e.g., "Cluj-Napoca, Cluj")
   - **Special Case - Bucharest**: When a sector is selected, return format: `"Sector X, București"` (e.g., "Sector 1, București")
   - This format matches what's currently stored in the database

5. **Accessibility**:
   - Proper ARIA labels and descriptions
   - Keyboard navigation support
   - Screen reader friendly
   - Error announcements with `aria-live="polite"`
   - Use `aria-invalid` and `aria-describedby` for error states

6. **Styling**:
   - Use Bootstrap 5.3.3 classes (consistent with project)
   - Form control styling: `form-control` and `form-select`
   - Error states: `is-invalid` class when error exists
   - Responsive design (mobile-friendly)
   - Match existing form component styling patterns

7. **Validation**:
   - Required field validation (if `required` prop is true)
   - Display error message below the city dropdown if validation fails
   - Error message in Romanian: "Te rugăm să selectezi județul și orașul"

8. **User Experience**:
   - Clear visual feedback when county/city is selected
   - Disabled state styling for city dropdown when no county selected
   - Loading states if needed (though data is static)
   - Smooth transitions between county and city selection

9. **State Management**:
   - Internal state for selected county ID and city ID
   - Parse initial `value` prop if provided (extract county and city from string)
   - Reset city dropdown when county changes
   - Call `onChange` callback when valid selection is made

10. **Edge Cases**:
    - Handle Bucharest specially (it's both a county and a city)
    - Handle cases where city name might not be found in data
    - Handle empty/invalid initial values
    - Handle rapid county changes (prevent stale city selections)

## Implementation Details

### Component Structure

```typescript
"use client";

import { useState, useEffect, useMemo } from "react";
import { counties, getCitiesByCounty, type LocationData } from "@/lib/db/locations-data";

export default function LocationDropdown({
  value,
  onChange,
  label = "Locația ta",
  required = false,
  disabled = false,
  error = null,
  id = "location",
  name = "location",
  className = "",
  placeholder = {},
  showHelpText = true,
  helpText,
}: LocationDropdownProps) {
  // Component implementation
}
```

### Key Logic

1. **Initial Value Parsing**:
   - If `value` prop is provided (e.g., "București, București"), parse it to extract county and city
   - Match against location data to find corresponding IDs
   - Set initial state for county and city

2. **County Selection**:
   - When county changes, reset city selection
   - Filter cities based on selected county using `getCitiesByCounty()`
   - Enable city dropdown only when county is selected

3. **City Selection**:
   - When city is selected, format output as "City Name, County Name"
   - Call `onChange` callback with formatted string
   - Validate that both county and city are selected if required

4. **Error Handling**:
   - Display error message if `error` prop is provided
   - Show validation error if required and selection incomplete
   - Use Bootstrap's `invalid-feedback` component for error display

### Styling Guidelines

- Use Bootstrap form classes: `form-label`, `form-select`, `form-control`
- Error state: Add `is-invalid` class to select elements when error exists
- Help text: Use `form-text` class for help text
- Spacing: Use Bootstrap spacing utilities (`mb-3`, etc.)
- Responsive: Ensure dropdowns work well on mobile devices

### Accessibility Guidelines

- Label association: Use `htmlFor` on label matching `id` on select
- Error association: Use `aria-describedby` pointing to error element ID
- Invalid state: Use `aria-invalid="true"` when error exists
- Live regions: Use `aria-live="polite"` for error announcements
- Keyboard: Ensure full keyboard navigation support
- Screen readers: Provide descriptive labels and error messages

## Integration Points

### Current Usage to Replace

1. **EmailCollectionForm** (`src/components/features/quiz/EmailCollectionForm.tsx`):
   - Replace text input with `LocationDropdown`
   - Maintain same props (value, onChange, error, required, disabled)
   - Keep same form submission logic

2. **Other Forms** (if any):
   - Search project for other location input fields
   - Replace with consistent `LocationDropdown` component

## Testing Considerations

- Test county selection and city filtering
- Test with Bucharest (special case)
- Test required field validation
- Test error state display
- Test disabled state
- Test initial value parsing
- Test keyboard navigation
- Test screen reader compatibility

## Example Usage

```tsx
import LocationDropdown from "@/components/shared/LocationDropdown";

function MyForm() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <LocationDropdown
      value={location}
      onChange={setLocation}
      label="Orașul tău"
      required
      error={error}
      id="location"
      name="location"
      showHelpText={true}
    />
  );
}
```

## Notes

- All location data is static and already imported in the codebase
- Component should be performant (no unnecessary re-renders)
- Use React hooks efficiently (useMemo for filtered cities)
- Follow project's Romanian language requirement for all user-facing text
- Match existing component patterns and styling conventions
