# Sport-Specific Open Graph Images

This directory contains Open Graph (OG) images for sport detail pages to improve social media sharing.

## Image Specifications

### Requirements

- **Format**: JPG or PNG
- **Dimensions**: 1200x630 pixels (recommended OG image size)
- **Aspect Ratio**: 1.91:1
- **File Size**: Optimized (recommended < 200KB)
- **Naming Convention**: `{sport-slug}.jpg` (e.g., `fotbal.jpg`, `tenis.jpg`)

### Content Guidelines

Each OG image should include:

1. **Sport Name** (in Romanian) - Prominently displayed
2. **Yuvoo Branding** - Logo or brand name
3. **Visual Element** - Sport-related imagery (icon, illustration, or photo)
4. **Key Message** - Brief text like "Pentru Copii" or "Cluburi Verificate"
5. **Color Scheme** - Aligned with Yuvoo brand colors (turcoaz/cyan theme)

### Example Structure

```
public/assets/img/og/sports/
├── README.md (this file)
├── fotbal.jpg
├── inot.jpg
├── tenis.jpg
├── baschet.jpg
├── gimnastica-artistica.jpg
├── karate.jpg
├── dans.jpg
├── volei.jpg
├── handbal.jpg
└── judo.jpg
```

## Implementation

The metadata system automatically references sport-specific OG images:

- Path: `/assets/img/og/sports/{sport-slug}.jpg`
- Fallback: If sport-specific image doesn't exist, the system will use the default OG image at `/assets/img/logo/og-image.jpg`

## Creating OG Images

### Tools

- **Design Tools**: Figma, Adobe Photoshop, Canva
- **Online Generators**: OG Image Generator, Social Share Preview
- **Automated**: Consider using `@vercel/og` for dynamic image generation

### Design Template

1. **Background**: Use Yuvoo brand colors (turcoaz/cyan gradient or solid)
2. **Sport Icon**: Large, centered sport icon or illustration
3. **Text**:
   - Main: Sport name (e.g., "Fotbal")
   - Subtitle: "Pentru Copii" or "Cluburi Verificate"
   - Brand: "Yuvoo" logo/branding
4. **Layout**: Centered composition with good contrast

### Example Design Elements

```
┌─────────────────────────────────────┐
│                                     │
│         [Sport Icon]                │
│                                     │
│         SPORT NAME                  │
│      Pentru Copii (4-14 ani)       │
│                                     │
│              Yuvoo                  │
│                                     │
└─────────────────────────────────────┘
```

## Current Status

**Top 10 Sports with Expanded Content:**

- ✅ System configured to use sport-specific OG images
- ⏳ Images need to be created and added to this directory

**Priority Sports for OG Images:**

1. Fotbal (most popular)
2. Înot
3. Tenis
4. Baschet
5. Gimnastică artistică
6. Karate
7. Dans
8. Volei
9. Handbal
10. Judo

## Notes

- Images are referenced in `src/lib/seo/sport-metadata.ts`
- The system will automatically use sport-specific images when available
- If a sport-specific image is missing, the default OG image will be used
- All images should be optimized for web (compressed, proper format)
