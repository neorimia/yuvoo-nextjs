# Image Optimization Guide

Comprehensive guide for image optimization in the Yuvoo platform using Next.js Image component and Cloudinary.

## Overview

Image optimization is critical for:

- **Performance**: Faster page loads, better Core Web Vitals
- **Bandwidth**: Reduced data usage for users
- **SEO**: Better page speed rankings
- **User Experience**: Faster, smoother browsing

## Architecture

### Image Sources

1. **Cloudinary CDN** - User-uploaded images (clubs, doctors, galleries)
2. **Local Static Images** - Assets in `public/assets/img/`
3. **Placeholder Images** - Fallback images for missing content

### Optimization Stack

- **Next.js Image Component** - Automatic optimization, lazy loading, responsive images
- **Cloudinary** - CDN with automatic format conversion (WebP, AVIF), resizing, quality optimization
- **Image Optimization Utilities** - Helper functions for consistent optimization

## Best Practices

### 1. Always Use Next.js Image Component

✅ **DO**:

```tsx
import Image from "next/image";

<Image
  src={imageUrl}
  alt="Descriptive alt text"
  width={400}
  height={300}
  quality={85}
  sizes="(max-width: 640px) 100vw, 50vw"
/>;
```

❌ **DON'T**:

```tsx
<img src={imageUrl} alt="..." />
```

### 2. Specify Dimensions

Always provide `width` and `height` to prevent layout shift:

```tsx
<Image
  src={imageUrl}
  alt="Club image"
  width={400} // Required
  height={300} // Required
/>
```

### 3. Use Responsive Sizes

Specify `sizes` attribute for responsive images:

```tsx
<Image
  src={imageUrl}
  alt="Club image"
  width={400}
  height={300}
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
/>
```

**Common Size Patterns**:

- **Full width (mobile)**: `100vw`
- **Half width (tablet)**: `50vw`
- **Third width (desktop)**: `33vw`
- **Fixed width**: `400px`

### 4. Optimize Cloudinary Images

Use Cloudinary transformations for automatic optimization:

```tsx
import { optimizeCloudinaryUrl } from "@/lib/utils/image-optimization";

const optimizedUrl = optimizeCloudinaryUrl(cloudinaryUrl, {
  width: 800,
  height: 600,
  quality: 85,
  format: "auto", // Auto WebP/AVIF
});
```

### 5. Use Presets for Common Cases

```tsx
import { ImagePresets } from "@/lib/utils/image-optimization";

// Thumbnail
const thumbUrl = ImagePresets.thumbnail(imageUrl);

// Card image
const cardUrl = ImagePresets.card(imageUrl);

// Hero image
const heroUrl = ImagePresets.hero(imageUrl);
```

### 6. Priority Loading

Use `priority` for above-the-fold images:

```tsx
<Image
  src={heroImage}
  alt="Hero"
  width={1920}
  height={1080}
  priority // Load immediately, don't lazy load
/>
```

### 7. Quality Settings

- **Hero images**: `quality={90}` (high quality)
- **Card images**: `quality={85}` (balanced)
- **Thumbnails**: `quality={80}` (smaller file size)

### 8. Handle Placeholders

```tsx
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

<Image
  src={imageUrl}
  alt="..."
  width={400}
  height={300}
  unoptimized={isPlaceholderUrl(imageUrl)} // Don't optimize placeholders
/>;
```

## Components

### OptimizedImage Component

Use the `OptimizedImage` component for automatic optimization:

```tsx
import OptimizedImage from "@/components/ui/OptimizedImage";

<OptimizedImage
  src={imageUrl}
  alt="Club image"
  width={400}
  height={300}
  cloudinaryOptions={{
    width: 800,
    quality: 85,
    format: "auto",
  }}
  responsiveSizes={{
    mobile: "100vw",
    tablet: "50vw",
    desktop: "33vw",
  }}
/>;
```

**Features**:

- Automatic Cloudinary optimization
- Error handling with fallback
- Loading states
- Responsive sizes
- Placeholder detection

## Cloudinary Optimization

### Automatic Format Conversion

Cloudinary automatically serves:

- **WebP** to browsers that support it
- **AVIF** to modern browsers
- **Original format** as fallback

### Transformation URL Format

```
https://res.cloudinary.com/cloud_name/image/upload/w_800,h_600,q_85,f_auto/v1/folder/image.jpg
```

**Parameters**:

- `w_800` - Width 800px
- `h_600` - Height 600px
- `q_85` - Quality 85%
- `f_auto` - Auto format (WebP/AVIF)
- `c_fill` - Crop mode
- `g_auto` - Gravity (auto face detection)

### Common Transformations

```typescript
// Thumbnail
optimizeCloudinaryUrl(url, { width: 200, height: 200, crop: "fill", quality: 80 });

// Card image
optimizeCloudinaryUrl(url, { width: 400, height: 300, crop: "fill", quality: 85 });

// Hero image
optimizeCloudinaryUrl(url, { width: 1920, height: 1080, crop: "fill", quality: 90 });

// Avatar with face detection
optimizeCloudinaryUrl(url, { width: 150, height: 150, crop: "fill", gravity: "face", quality: 85 });
```

## Image Sizes

### Recommended Sizes

**Thumbnails**: 200x200px
**Card Images**: 400x300px (4:3) or 400x400px (square)
**Gallery Images**: 800x600px
**Detail Images**: 1200x800px (3:2)
**Hero Images**: 1920x1080px (16:9)

### Responsive Breakpoints

```typescript
// Mobile: 640px
// Tablet: 768px
// Desktop: 1024px
// Large Desktop: 1920px
```

## Performance Metrics

### Target Metrics

- **LCP (Largest Contentful Paint)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Image Load Time**: < 1s on 3G

### Optimization Checklist

- [ ] All images use Next.js Image component
- [ ] Width and height specified
- [ ] Sizes attribute for responsive images
- [ ] Cloudinary images use transformations
- [ ] Quality settings appropriate (80-90)
- [ ] Priority loading for above-the-fold images
- [ ] Lazy loading for below-the-fold images
- [ ] Alt text provided for accessibility
- [ ] Placeholder images handled correctly

## Migration Guide

### Converting <img> to <Image>

**Before**:

```tsx
<img src={imageUrl} alt="Club" className="club-image" />
```

**After**:

```tsx
<Image
  src={imageUrl}
  alt="Club"
  width={400}
  height={300}
  className="club-image"
  sizes="(max-width: 640px) 100vw, 50vw"
/>
```

### Adding Cloudinary Optimization

**Before**:

```tsx
<Image src={cloudinaryUrl} alt="..." width={400} height={300} />
```

**After**:

```tsx
import { optimizeCloudinaryUrl } from "@/lib/utils/image-optimization";

const optimizedUrl = optimizeCloudinaryUrl(cloudinaryUrl, {
  width: 800,
  quality: 85,
});

<Image src={optimizedUrl} alt="..." width={400} height={300} />;
```

## Tools & Utilities

### Image Optimization Utilities

**Location**: `src/lib/utils/image-optimization.ts`

**Functions**:

- `optimizeCloudinaryUrl()` - Generate optimized Cloudinary URL
- `isCloudinaryUrl()` - Check if URL is Cloudinary
- `getResponsiveSizes()` - Generate sizes string
- `ImagePresets` - Predefined optimization presets

### Cloudinary Utilities

**Location**: `src/lib/integrations/cloudinary/optimization.ts`

**Functions**:

- `getCloudinaryUrl()` - Generate Cloudinary URL with transformations
- `getCloudinarySrcSet()` - Generate responsive srcSet
- `CloudinaryPresets` - Predefined Cloudinary presets

### Image Helpers

**Location**: `src/lib/utils/image-helpers.ts`

**Functions**:

- `isPlaceholderUrl()` - Check if placeholder URL
- `getImageDimensions()` - Calculate image dimensions

## Configuration

### Next.js Config

**File**: `next.config.ts`

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/**",
    },
  ],
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### Cloudinary Config

**Environment Variables**:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## Testing

### Performance Testing

1. **Lighthouse**: Run Lighthouse audit for image performance
2. **PageSpeed Insights**: Test real-world performance
3. **Network Tab**: Check image load times and sizes
4. **Core Web Vitals**: Monitor LCP, CLS metrics

### Image Quality Testing

1. **Visual Inspection**: Check image quality at different sizes
2. **File Size**: Compare optimized vs original sizes
3. **Format Support**: Test WebP/AVIF fallback
4. **Responsive**: Test on different screen sizes

## Troubleshooting

### Images Not Loading

- Check `remotePatterns` in `next.config.ts`
- Verify Cloudinary URL format
- Check network tab for 404 errors

### Images Too Large

- Use Cloudinary transformations
- Reduce quality setting (80-85)
- Use appropriate dimensions

### Layout Shift

- Always specify width and height
- Use `fill` with `objectFit` for containers
- Set `sizes` attribute correctly

### Slow Loading

- Use `priority` for above-the-fold images
- Enable lazy loading for below-the-fold
- Use Cloudinary CDN (faster than local)
- Optimize image dimensions

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)
- [Cloudinary Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Last Updated**: January 2025  
**Status**: Production Ready
