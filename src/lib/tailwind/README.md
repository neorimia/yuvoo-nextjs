# Tailwind CSS Setup for Yuvoo

## Overview

Tailwind CSS is configured to work **alongside Bootstrap 5.3.3** in the Yuvoo project. This hybrid approach allows us to:

- **Keep Bootstrap** for existing adapted components (Class→Club, Teacher→Doctor, Program→Sport)
- **Use Tailwind** for new components (Quiz, Dashboard, Children management, etc.)
- **Gradually migrate** from Bootstrap to Tailwind as components are refactored

## Installation

✅ **Installed**:

- `tailwindcss@^3.4.19`
- `postcss@^8.5.6`
- `autoprefixer@^10.4.22`

## Configuration Files

### 1. `tailwind.config.ts`

**Location**: Root directory

**Key Features**:

- **Content paths**: Scans all TypeScript/TSX files in `src/`
- **Yuvoo brand colors**: Primary (#00BBAE), Secondary (#FF9B24), Accent (#7C81FF)
- **Typography**: Fredoka font family, design system font sizes
- **Border radius**: Values from design system (4px to 50px)
- **Shadows**: Card, menu, modal, header shadows
- **Preflight disabled**: Prevents conflicts with Bootstrap

### 2. `postcss.config.js`

**Location**: Root directory

**Configuration**:

- Processes CSS with Tailwind CSS
- Autoprefixer for browser compatibility
- Works alongside SCSS compilation

### 3. `src/app/globals.css`

**Location**: `src/app/globals.css`

**Contents**:

- Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- Custom Yuvoo component classes (`.btn-yuvoo-primary`, `.btn-yuvoo-secondary`, etc.)
- Custom utilities (`.text-yuvoo-heading`, `.section-padding`, etc.)

**Import**: Added to `src/app/layout.tsx` alongside `globals.scss`

## Usage

### In New Components

Use Tailwind utility classes:

```tsx
// Example: Quiz component
<div className="bg-primary-light rounded-xl p-6 shadow-card">
  <h2 className="text-h3 font-bold text-yuvoo-heading">Chestionar AI</h2>
  <p className="text-body text-yuvoo-body">Descoperă sportul potrivit...</p>
  <button className="btn-yuvoo-primary">Începe chestionarul</button>
</div>
```

### Custom Component Classes

Pre-defined Yuvoo classes:

```tsx
// Buttons
<button className="btn-yuvoo-primary">Primary Button</button>
<button className="btn-yuvoo-secondary">Secondary Button</button>
<button className="btn-yuvoo-accent">Accent Button</button>

// Cards
<div className="card-yuvoo">Card content</div>

// Backgrounds
<div className="bg-yuvoo-primary-light">Section with primary light background</div>
<div className="bg-yuvoo-secondary-light">Section with secondary light background</div>

// Text
<h1 className="text-yuvoo-heading">Heading text</h1>
<p className="text-yuvoo-body">Body text</p>

// Section padding
<section className="section-padding">Section with standard padding</section>
```

### Color Usage

```tsx
// Primary color (Turcoaz)
<div className="bg-primary text-white">Primary background</div>
<div className="text-primary">Primary text</div>
<div className="border-primary">Primary border</div>

// Secondary color (Portocaliu)
<div className="bg-secondary text-white">Secondary background</div>

// Accent color (Violet)
<div className="bg-accent text-white">Accent background</div>

// Neutral colors
<div className="text-neutral-black">Heading text</div>
<div className="text-neutral-body">Body text</div>
<div className="border-neutral-grey-1">Border</div>
```

## Coexistence with Bootstrap

### Strategy

1. **Existing components**: Keep Bootstrap classes (`.container`, `.row`, `.col-*`, etc.)
2. **New components**: Use Tailwind classes
3. **Mixed components**: Can use both, but prefer one approach per component

### Important Notes

- **Preflight disabled**: Tailwind's base reset is disabled to avoid conflicts
- **Both CSS files loaded**: `globals.scss` (Bootstrap) and `globals.css` (Tailwind) are both imported
- **No conflicts expected**: Tailwind utilities won't override Bootstrap unless explicitly used

## Design Tokens Integration

All design tokens from `designSystem.md` are integrated:

- ✅ **Colors**: Yuvoo brand colors (Primary, Secondary, Accent) + theme colors
- ✅ **Typography**: Fredoka font, design system font sizes
- ✅ **Spacing**: Bootstrap spacing + custom section padding
- ✅ **Border radius**: All values from design system
- ✅ **Shadows**: All shadow patterns from design system
- ✅ **Breakpoints**: Responsive breakpoints (can use Tailwind's or Bootstrap's)

## Migration Path

### Phase 1: Current (Hybrid)

- ✅ Tailwind installed and configured
- ✅ Bootstrap remains for existing components
- ✅ New components use Tailwind

### Phase 2: Gradual Migration

- Migrate adapted components (Club, Doctor, Sport) to Tailwind
- Keep Bootstrap for complex components initially
- Test thoroughly after each migration

### Phase 3: Full Migration (Future)

- Remove Bootstrap dependency
- All components use Tailwind
- Optimize bundle size

## Testing

To verify Tailwind is working:

1. Create a test component with Tailwind classes
2. Check if styles are applied
3. Verify no conflicts with Bootstrap

Example test:

```tsx
// Test component
export default function TailwindTest() {
  return (
    <div className="bg-primary text-white p-4 rounded-xl">
      <h1 className="text-h3 font-bold">Tailwind Test</h1>
      <p className="text-body">If you see styled content, Tailwind is working!</p>
    </div>
  );
}
```

## Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Tailwind v3 Config**: https://tailwindcss.com/docs/configuration
- **Design System**: `memory-bank/designSystem.md`
- **Component Analysis**: `src/components/COMPONENT_ANALYSIS.md`

## Notes

- Tailwind CSS v3.4.19 is installed (stable version)
- PostCSS processes Tailwind alongside SCSS
- Preflight is disabled to prevent Bootstrap conflicts
- All Yuvoo brand colors are available as Tailwind utilities
- Custom component classes are defined in `globals.css`
