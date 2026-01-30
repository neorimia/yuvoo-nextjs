# Yuvoo Bootstrap Utility Extensions

This file contains custom utility classes that extend Bootstrap's utility system with Yuvoo brand colors and patterns.

## Overview

Since Bootstrap is imported as compiled CSS (`bootstrap.css`), we cannot use Bootstrap's SCSS Utility API directly. Instead, we create custom utility classes that:

- Follow Bootstrap's naming conventions
- Use Yuvoo brand colors from CSS variables
- Provide hover, focus, and responsive states
- Maintain consistency with existing Bootstrap utilities

## Color Reference

All utilities use CSS variables defined in `_root.scss`:

- **Primary (Turcoaz/Cyan)**: `--bd-theme-1` = `#00BBAE`
- **Secondary (Portocaliu/Orange)**: `--bd-theme-2` = `#FF9B24`
- **Accent (Violet/Blue)**: `--bd-theme-10` = `#7C81FF`
- **Primary Light**: `--bd-theme-7` = `#EBFFFE`
- **Secondary Light**: `--bd-theme-8` = `#FFECD6`
- **Secondary Very Light**: `--bd-theme-6` = `#FFF6EB`

## Available Utilities

### Background Colors

```html
<div class="bg-yuvoo-primary">Primary background</div>
<div class="bg-yuvoo-primary-light">Primary light background</div>
<div class="bg-yuvoo-secondary">Secondary background</div>
<div class="bg-yuvoo-secondary-light">Secondary light background</div>
<div class="bg-yuvoo-secondary-very-light">Secondary very light background</div>
<div class="bg-yuvoo-accent">Accent background</div>
```

### Text Colors

```html
<p class="text-yuvoo-primary">Primary text</p>
<p class="text-yuvoo-secondary">Secondary text</p>
<p class="text-yuvoo-accent">Accent text</p>
<p class="text-yuvoo-heading">Heading text</p>
<p class="text-yuvoo-body">Body text</p>
```

### Border Colors

```html
<div class="border border-yuvoo-primary">Primary border</div>
<div class="border border-yuvoo-secondary">Secondary border</div>
<div class="border border-yuvoo-accent">Accent border</div>
```

### Hover States

```html
<!-- Background hover -->
<button class="bg-yuvoo-primary bg-yuvoo-primary-hover">Hover me</button>
<button class="bg-yuvoo-secondary bg-yuvoo-secondary-hover">Hover me</button>

<!-- Text hover -->
<a href="#" class="text-yuvoo-primary-hover">Hover link</a>
<a href="#" class="text-yuvoo-secondary-hover">Hover link</a>

<!-- Border hover -->
<div class="border border-yuvoo-primary-hover">Hover border</div>
```

### Focus States

```html
<input type="text" class="form-control focus-yuvoo-primary" />
<input type="text" class="form-control focus-yuvoo-secondary" />
```

### Shadow Utilities

```html
<div class="shadow-yuvoo-primary">Primary shadow</div>
<div class="shadow-yuvoo-secondary">Secondary shadow</div>
<div class="shadow-yuvoo-accent">Accent shadow</div>
```

### Responsive Utilities

```html
<!-- Hide on mobile, show on desktop -->
<div class="d-md-none-yuvoo">Hidden on mobile</div>
<div class="d-md-block-yuvoo">Block on desktop</div>
<div class="d-md-flex-yuvoo">Flex on desktop</div>
```

### Spacing Utilities

```html
<!-- Section padding -->
<section class="section-padding-yuvoo">Section with Yuvoo padding</section>

<!-- Container -->
<div class="container-yuvoo">Yuvoo container (max-width: 1320px)</div>
```

### Button Variants

```html
<!-- Primary button -->
<button class="btn btn-yuvoo-primary">Primary Button</button>

<!-- Secondary button -->
<button class="btn btn-yuvoo-secondary">Secondary Button</button>

<!-- Outline buttons -->
<button class="btn btn-yuvoo-outline-primary">Outline Primary</button>
<button class="btn btn-yuvoo-outline-secondary">Outline Secondary</button>
```

## Usage Examples

### Card with Yuvoo Branding

```html
<div class="card shadow-yuvoo-primary">
  <div class="card-body">
    <h5 class="text-yuvoo-heading">Card Title</h5>
    <p class="text-yuvoo-body">Card content</p>
    <button class="btn btn-yuvoo-primary">Action</button>
  </div>
</div>
```

### Hoverable Link

```html
<a href="#" class="text-yuvoo-primary text-yuvoo-primary-hover"> Hover to see primary color </a>
```

### Responsive Section

```html
<section class="section-padding-yuvoo bg-yuvoo-primary-light">
  <div class="container-yuvoo">
    <h2 class="text-yuvoo-heading">Section Title</h2>
    <p class="text-yuvoo-body">Section content</p>
  </div>
</section>
```

## Migration from Tailwind

When migrating from Tailwind classes, use these mappings:

| Tailwind Class             | Yuvoo Utility                         |
| -------------------------- | ------------------------------------- |
| `bg-primary`               | `bg-yuvoo-primary`                    |
| `bg-secondary`             | `bg-yuvoo-secondary`                  |
| `text-yuvoo-primary`       | `text-yuvoo-primary`                  |
| `text-secondary`           | `text-yuvoo-secondary`                |
| `hover:bg-primary`         | `bg-yuvoo-primary-hover` (on hover)   |
| `hover:text-yuvoo-primary` | `text-yuvoo-primary-hover` (on hover) |

## Reference

- **Color Definitions**: `public/assets/scss/utils/_colors.scss`
- **CSS Variables**: `public/assets/scss/utils/_root.scss`
- **Migration Plan**: `docs/TAILWIND_REMOVAL_PLAN.md`
- **Design Tokens**: `docs/DESIGN_TOKENS.md`
