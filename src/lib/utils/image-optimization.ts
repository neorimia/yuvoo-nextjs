/**
 * Image Optimization Utilities
 *
 * Utilities for optimizing images using Cloudinary transformations
 * and Next.js Image component best practices.
 */

/**
 * Cloudinary Image Transformation Options
 */
export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100, default: auto
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  crop?: "fill" | "fit" | "scale" | "thumb" | "limit";
  gravity?: "auto" | "face" | "center" | "north" | "south" | "east" | "west";
  fetchFormat?: "auto" | "webp" | "avif";
}

/**
 * Check if URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return url.includes("res.cloudinary.com") || url.includes("cloudinary.com");
}

/**
 * Generate optimized Cloudinary URL with transformations
 *
 * @param url - Original Cloudinary URL
 * @param options - Transformation options
 * @returns Optimized Cloudinary URL with transformations
 *
 * @example
 * optimizeCloudinaryUrl("https://res.cloudinary.com/cloud/image/upload/v1/folder/image.jpg", {
 *   width: 800,
 *   height: 600,
 *   quality: 80,
 *   format: "auto"
 * })
 * // Returns: "https://res.cloudinary.com/cloud/image/upload/w_800,h_600,q_80,f_auto/v1/folder/image.jpg"
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!isCloudinaryUrl(url)) {
    return url; // Return original URL if not Cloudinary
  }

  // Default options
  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
    gravity = "auto",
    fetchFormat = "auto",
  } = options;

  // Build transformation string
  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality !== "auto") transformations.push(`q_${quality}`);
  if (format !== "auto") transformations.push(`f_${format}`);
  if (crop !== "fill") transformations.push(`c_${crop}`);
  if (gravity !== "auto" && crop === "fill") transformations.push(`g_${gravity}`);
  if (fetchFormat !== "auto") transformations.push(`fl_${fetchFormat}`);

  // If no transformations, return original URL
  if (transformations.length === 0) {
    return url;
  }

  // Insert transformations into Cloudinary URL
  // Format: https://res.cloudinary.com/cloud/image/upload/[transformations]/v1/folder/image.jpg
  const transformString = transformations.join(",");

  // Handle different Cloudinary URL formats
  if (url.includes("/upload/")) {
    // Standard format: /upload/v1/... or /upload/folder/...
    return url.replace("/upload/", `/upload/${transformString}/`);
  } else if (url.includes("/image/")) {
    // Alternative format: /image/upload/...
    return url.replace("/image/upload/", `/image/upload/${transformString}/`);
  }

  return url; // Return original if format not recognized
}

/**
 * Get responsive image sizes for Next.js Image component
 *
 * @param breakpoints - Custom breakpoints (default: standard responsive sizes)
 * @returns Sizes string for Next.js Image component
 *
 * @example
 * getResponsiveSizes() // Returns: "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
 */
export function getResponsiveSizes(breakpoints?: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const { mobile = "100vw", tablet = "50vw", desktop = "33vw" } = breakpoints || {};
  return `(max-width: 640px) ${mobile}, (max-width: 768px) ${tablet}, ${desktop}`;
}

/**
 * Get optimized image dimensions based on container size
 *
 * @param containerWidth - Container width in pixels
 * @param aspectRatio - Aspect ratio (width/height), default: 16/9
 * @returns Object with width and height
 */
export function getOptimizedDimensions(
  containerWidth: number,
  aspectRatio: number = 16 / 9
): { width: number; height: number } {
  return {
    width: containerWidth,
    height: Math.round(containerWidth / aspectRatio),
  };
}

/**
 * Generate srcSet for responsive images
 *
 * @param baseUrl - Base image URL (Cloudinary or local)
 * @param widths - Array of widths for srcSet
 * @param options - Cloudinary transformation options
 * @returns SrcSet string
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[],
  options: CloudinaryTransformOptions = {}
): string {
  if (!isCloudinaryUrl(baseUrl)) {
    // For non-Cloudinary URLs, Next.js Image handles srcSet automatically
    return "";
  }

  return widths
    .map((width) => {
      const optimizedUrl = optimizeCloudinaryUrl(baseUrl, { ...options, width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(", ");
}

/**
 * Get placeholder image URL
 *
 * @param width - Placeholder width
 * @param height - Placeholder height
 * @param text - Optional text to display
 * @returns Placeholder URL
 */
export function getPlaceholderUrl(
  width: number = 400,
  height: number = 300,
  text: string = "Yuvoo"
): string {
  // Use Cloudinary placeholder if available, otherwise use placeholder.com
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_fill,g_auto,q_auto,f_auto/v1/placeholders/${encodeURIComponent(text)}.jpg`;
  }
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
}

/**
 * Image optimization presets for common use cases
 */
export const ImagePresets = {
  /** Thumbnail: 200x200, square crop */
  thumbnail: (url: string) =>
    optimizeCloudinaryUrl(url, { width: 200, height: 200, crop: "fill", quality: 80 }),

  /** Card image: 400x300, 4:3 aspect ratio */
  card: (url: string) =>
    optimizeCloudinaryUrl(url, { width: 400, height: 300, crop: "fill", quality: 85 }),

  /** Gallery thumbnail: 300x300, square */
  galleryThumb: (url: string) =>
    optimizeCloudinaryUrl(url, { width: 300, height: 300, crop: "fill", quality: 80 }),

  /** Hero image: 1920x1080, 16:9 aspect ratio */
  hero: (url: string) =>
    optimizeCloudinaryUrl(url, { width: 1920, height: 1080, crop: "fill", quality: 90 }),

  /** Detail page image: 1200x800, 3:2 aspect ratio */
  detail: (url: string) =>
    optimizeCloudinaryUrl(url, { width: 1200, height: 800, crop: "fill", quality: 90 }),

  /** Avatar: 150x150, square, face detection */
  avatar: (url: string) =>
    optimizeCloudinaryUrl(url, {
      width: 150,
      height: 150,
      crop: "fill",
      gravity: "face",
      quality: 85,
    }),

  /** Logo: 200x200, fit (preserve aspect ratio) */
  logo: (url: string) =>
    optimizeCloudinaryUrl(url, { width: 200, height: 200, crop: "fit", quality: 90 }),
};
