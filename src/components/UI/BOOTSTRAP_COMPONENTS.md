# Bootstrap Component Library

This directory contains Bootstrap component wrappers that replace shadcn/ui components as part of the Tailwind CSS removal migration.

## Components

### BootstrapButton

Replaces `@/components/UI/button` (shadcn/ui Button).

**Usage:**

```tsx
import { BootstrapButton } from "@/components/UI/bootstrap-index";

<BootstrapButton variant="primary" onClick={handleClick}>
  Click me
</BootstrapButton>;
```

**Props:**

- `variant`: "primary" | "secondary" | "outline" | "danger" | "grey" (default: "primary")
- `size`: "sm" | "md" | "lg" (default: "md")
- `isLoading`: boolean (default: false)
- All standard button HTML attributes

**Pattern:** Uses Bootstrap `bd-btn` pattern with `bd-btn-inner`, `bd-btn-normal`, `bd-btn-hover` structure.

---

### BootstrapInput

Replaces `@/components/UI/input` (shadcn/ui Input).

**Usage:**

```tsx
import { BootstrapInput } from "@/components/UI/bootstrap-index";
import { EmailSvgIcon } from "@/components/SVG";

<BootstrapInput type="email" placeholder="Email" icon={<EmailSvgIcon />} />;
```

**Props:**

- `icon`: React.ReactNode (optional icon to display)
- `error`: boolean (adds `is-invalid` class)
- `wrapperClassName`: string (additional classes for wrapper)
- All standard input HTML attributes

**Pattern:** Uses Bootstrap `login__input` pattern with icon support.

---

### BootstrapTextarea

Replaces `@/components/UI/textarea` (shadcn/ui Textarea).

**Usage:**

```tsx
import { BootstrapTextarea } from "@/components/UI/bootstrap-index";

<BootstrapTextarea placeholder="Enter your message" rows={4} error={hasError} />;
```

**Props:**

- `error`: boolean (adds `is-invalid` class)
- All standard textarea HTML attributes

**Pattern:** Uses Bootstrap `form-control` class.

---

### BootstrapSelect

Replaces `@/components/UI/select` (shadcn/ui Select).

**Usage:**

```tsx
import { BootstrapSelect } from "@/components/UI/bootstrap-index";

<BootstrapSelect
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
  error={hasError}
/>;
```

**Props:**

- `options`: Array<{ value: string; label: string }> (required)
- `error`: boolean (adds `is-invalid` class)
- All standard select HTML attributes

**Pattern:** Uses Bootstrap `form-select` class.

**Note:** For more advanced select needs (custom styling, search, etc.), use `NiceSelect` component instead.

---

### BootstrapAlert

Replaces `@/components/UI/alert` (shadcn/ui Alert).

**Usage:**

```tsx
import { BootstrapAlert } from "@/components/UI/bootstrap-index";

<BootstrapAlert variant="danger" dismissible onDismiss={handleDismiss}>
  Error message here
</BootstrapAlert>;
```

**Props:**

- `variant`: "primary" | "secondary" | "success" | "danger" | "warning" | "info" (default: "primary")
- `dismissible`: boolean (default: false)
- `onDismiss`: () => void (callback when dismissible alert is closed)
- All standard div HTML attributes

**Pattern:** Uses Bootstrap `alert` classes with variant modifiers.

---

### BootstrapProgress

Replaces `@/components/UI/progress` (shadcn/ui Progress).

**Usage:**

```tsx
import { BootstrapProgress } from "@/components/UI/bootstrap-index";

<BootstrapProgress value={50} variant="primary" showLabel />;
```

**Props:**

- `value`: number (required, progress value)
- `min`: number (default: 0)
- `max`: number (default: 100)
- `variant`: "primary" | "success" | "info" | "warning" | "danger" (default: "primary")
- `striped`: boolean (default: false)
- `animated`: boolean (default: false, requires `striped` to be true)
- `showLabel`: boolean (default: false, shows percentage)
- `label`: string (optional custom label, overrides percentage)
- All standard div HTML attributes

**Pattern:** Uses Bootstrap `progress` and `progress-bar` classes.

---

## Migration Guide

### Replacing shadcn/ui Button

**Before:**

```tsx
import { Button } from "@/components/UI/button";

<Button variant="default" size="lg">
  Click
</Button>;
```

**After:**

```tsx
import { BootstrapButton } from "@/components/UI/bootstrap-index";

<BootstrapButton variant="primary" size="lg">
  Click
</BootstrapButton>;
```

### Replacing shadcn/ui Input

**Before:**

```tsx
import { Input } from "@/components/UI/input";

<Input type="email" placeholder="Email" />;
```

**After:**

```tsx
import { BootstrapInput } from "@/components/UI/bootstrap-index";
import { EmailSvgIcon } from "@/components/SVG";

<BootstrapInput type="email" placeholder="Email" icon={<EmailSvgIcon />} />;
```

### Replacing shadcn/ui Alert

**Before:**

```tsx
import { Alert, AlertDescription } from "@/components/UI/alert";

<Alert variant="destructive">
  <AlertDescription>Error message</AlertDescription>
</Alert>;
```

**After:**

```tsx
import { BootstrapAlert } from "@/components/UI/bootstrap-index";

<BootstrapAlert variant="danger">Error message</BootstrapAlert>;
```

### Replacing shadcn/ui Progress

**Before:**

```tsx
import { Progress } from "@/components/UI/progress";

<Progress value={50} />;
```

**After:**

```tsx
import { BootstrapProgress } from "@/components/UI/bootstrap-index";

<BootstrapProgress value={50} variant="primary" />;
```

---

## Bootstrap Patterns Used

These components follow existing Bootstrap patterns found in the codebase:

1. **Button Pattern** (`bd-btn`):
   - Structure: `bd-btn` → `bd-btn-inner` → `bd-btn-normal` + `bd-btn-hover`
   - Variants: `bd-btn-secondary`, `bd-btn-outline`, `bd-btn-danger`, `bd-btn-grey`
   - Sizes: `bd-btn-sm`, `bd-btn-lg`

2. **Input Pattern** (`login__input`):
   - Structure: `login__input` wrapper with `<input>` and optional `<span>` for icon
   - Error state: `is-invalid` class

3. **Form Controls**:
   - Textarea: `form-control` class
   - Select: `form-select` class
   - Error state: `is-invalid` class

4. **Alert Pattern**:
   - Base: `alert` class
   - Variants: `alert-primary`, `alert-success`, `alert-danger`, etc.
   - Dismissible: `alert-dismissible fade show` with `btn-close` button

5. **Progress Pattern**:
   - Container: `progress` class
   - Bar: `progress-bar` class with variant classes (`bg-primary`, `bg-success`, etc.)
   - Striped: `progress-bar-striped`
   - Animated: `progress-bar-animated`

---

## Reference

- **Migration Plan**: `docs/TAILWIND_REMOVAL_PLAN.md`
- **Bootstrap Documentation**: [https://getbootstrap.com/docs/5.3/](https://getbootstrap.com/docs/5.3/)
- **Existing Patterns**: See `src/components/Form/SignInForm.tsx` for button and input examples
