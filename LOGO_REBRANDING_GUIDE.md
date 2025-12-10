# Yuvoo Logo & Favicon Rebranding Guide

This guide documents the process for updating logos and favicons from Kindedo to Yuvoo branding.

## Brand Colors

Based on the Yuvoo brand guidelines:

- **Primary**: `#00BBAE` (Turcoaz/Cyan)
- **Secondary**: `#FF9B24` (Portocaliu)
- **Accent**: `#7C81FF` (Violet)

## Logo Requirements

### 1. Logo Files to Create

#### SVG Logos (Vector, scalable)

**`logo.svg`** (Default - for dark backgrounds)

- Format: SVG
- Colors: Use Yuvoo brand colors (Primary: #00BBAE, Secondary: #FF9B24, Accent: #7C81FF)
- Text: "Yuvoo" in Romanian-friendly font (Fredoka recommended)
- Background: Transparent
- Usage: Headers on light backgrounds, main logo

**`logo-white.svg`** (For light/dark backgrounds)

- Format: SVG
- Colors: White/light colors for visibility on dark backgrounds
- Text: "Yuvoo" in white or light color
- Background: Transparent
- Usage: Footers, dark header variants

#### Favicon Files

**`favicon.png`** (Multiple sizes)

- Format: PNG
- Sizes needed:
  - 16x16 pixels
  - 32x32 pixels
  - 48x48 pixels
- Design: Simplified Yuvoo icon/logo mark
- Colors: Use brand colors, ensure visibility at small sizes

**`favicon.ico`** (Windows/legacy support)

- Format: ICO (multi-resolution)
- Location: `src/app/favicon.ico`
- Sizes: 16x16, 32x32, 48x48 (included in single ICO file)
- Can be generated from favicon.png

## File Locations

### Current Logo Files (Kindedo - to be replaced)

```
public/assets/img/logo/
├── logo.svg              → Replace with Yuvoo logo.svg
├── logo-white.svg        → Replace with Yuvoo logo-white.svg
├── favicon.png           → Replace with Yuvoo favicon.png
└── mega-menu-1.png       → Update if needed (optional)
```

### Favicon Location

```
src/app/favicon.ico       → Replace with Yuvoo favicon.ico
```

## Components to Update

### Header Components

1. **HeaderOne.tsx** (`src/layouts/Header/HeaderOne.tsx`)
   - Logo import: `import logo from '../../../public/assets/img/logo/logo.svg';`
   - Update to use Yuvoo logo

2. **HeaderTwo.tsx** (`src/layouts/Header/HeaderTwo.tsx`)
   - Similar logo import
   - Update to use Yuvoo logo

3. **HeaderThree.tsx** (`src/layouts/Header/HeaderThree.tsx`)
   - Similar logo import
   - Update to use Yuvoo logo

4. **HeaderFour.tsx** (`src/layouts/Header/HeaderFour.tsx`)
   - Similar logo import
   - Update to use Yuvoo logo

### Footer Components

1. **FooterOne.tsx** (`src/layouts/Footer/FooterOne.tsx`)
   - Logo imports: `logo` and `logoWhite`
   - Update to use Yuvoo logos

2. **FooterTwo.tsx** (`src/layouts/Footer/FooterTwo.tsx`)
   - Similar logo imports
   - Update to use Yuvoo logos

3. **FooterThree.tsx** (`src/layouts/Footer/FooterThree.tsx`)
   - Similar logo imports
   - Update to use Yuvoo logos

### Other Components

1. **MenuSidebar.tsx** (`src/layouts/Header/components/Sidebar/MenuSidebar.tsx`)
   - Logo import
   - Update to use Yuvoo logo

2. **footer-data.ts** (`src/data/footer-data.ts`)
   - Logo imports: `logo` and `logoWhite`
   - Update to use Yuvoo logos

### Routes Configuration

1. **routes.ts** (`src/lib/routes.ts`)
   - `assets.logo` and `assets.logoWhite` paths
   - Verify paths are correct (should remain the same)

## Design Guidelines

### Logo Design Principles

1. **Child-Friendly**: Logo should appeal to children and parents
2. **Modern & Playful**: Reflect the fun, active nature of sports
3. **Readable**: Text should be clear at all sizes
4. **Brand Colors**: Use Yuvoo brand colors (Primary, Secondary, Accent)
5. **Scalable**: SVG format ensures quality at all sizes

### Typography

- **Font**: Fredoka (already used in the project)
- **Style**: Bold, friendly, rounded
- **Language**: "Yuvoo" (brand name, works in Romanian)

### Icon/Mark Suggestions

Consider incorporating:

- Sports elements (ball, movement, activity)
- Child-friendly shapes
- Playful, energetic design
- Yuvoo brand colors

## Implementation Checklist

### Phase 1: Logo Creation (Design)

- [ ] Design Yuvoo logo in SVG format
- [ ] Create `logo.svg` (default, dark text on light background)
- [ ] Create `logo-white.svg` (light text for dark backgrounds)
- [ ] Create `favicon.png` (16x16, 32x32, 48x48 sizes)
- [ ] Generate `favicon.ico` from favicon.png

### Phase 2: File Replacement

- [ ] Replace `public/assets/img/logo/logo.svg`
- [ ] Replace `public/assets/img/logo/logo-white.svg`
- [ ] Replace `public/assets/img/logo/favicon.png`
- [ ] Replace `src/app/favicon.ico`

### Phase 3: Code Updates

- [ ] Update HeaderOne.tsx logo reference
- [ ] Update HeaderTwo.tsx logo reference
- [ ] Update HeaderThree.tsx logo reference
- [ ] Update HeaderFour.tsx logo reference
- [ ] Update FooterOne.tsx logo references
- [ ] Update FooterTwo.tsx logo references
- [ ] Update FooterThree.tsx logo references
- [ ] Update MenuSidebar.tsx logo reference
- [ ] Update footer-data.ts logo references
- [ ] Verify routes.ts asset paths are correct

### Phase 4: Testing

- [ ] Test logo display in all header variants
- [ ] Test logo display in all footer variants
- [ ] Test logo in mobile menu/sidebar
- [ ] Test favicon in browser tab
- [ ] Test favicon on different devices
- [ ] Verify logo visibility on light backgrounds
- [ ] Verify logo visibility on dark backgrounds
- [ ] Test responsive logo sizing

## Tools & Resources

### Logo Design Tools

- **Figma** - Professional design tool
- **Adobe Illustrator** - Vector graphics
- **Inkscape** - Free vector graphics editor
- **Canva** - Online design tool

### Favicon Generation

- **RealFaviconGenerator** - https://realfavicongenerator.net/
- **Favicon.io** - https://favicon.io/
- **Online ICO Converter** - Convert PNG to ICO

### Testing Tools

- **Browser DevTools** - Test favicon display
- **Favicon Checker** - Verify favicon implementation
- **Responsive Design Mode** - Test logo at different sizes

## Notes

- All logo files should be optimized for web (compressed SVGs, optimized PNGs)
- Favicon should be recognizable at 16x16 pixels
- Logo should maintain readability when scaled down
- Consider creating a logo mark (icon only) for favicon
- Ensure logo works in both light and dark themes

## Next Steps

1. **Design Phase**: Create Yuvoo logo designs (SVG format)
2. **Review**: Get approval on logo design
3. **Export**: Export all required formats and sizes
4. **Replace**: Replace files in project
5. **Update**: Update all component references
6. **Test**: Verify logo display across all components
7. **Document**: Update this guide with final logo specifications
