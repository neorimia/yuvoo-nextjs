/**
 * Image Helper Utilities
 *
 * Utilities for handling image URLs and Next.js Image component configuration.
 */

/**
 * Check if an image URL is from via.placeholder.com
 * These URLs with query parameters can cause issues with Next.js Image optimization
 */
export function isPlaceholderUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return (
    url.includes("via.placeholder.com") ||
    url.includes("picsum.photos") ||
    url.startsWith("/assets/img/placeholders/")
  );
}

/**
 * Get Next.js Image component props based on image URL
 * Returns unoptimized: true for problematic placeholder URLs
 */
export function getImageProps(src: string | undefined | null): {
  unoptimized?: boolean;
} {
  if (isPlaceholderUrl(src)) {
    return { unoptimized: true };
  }
  return {};
}

/**
 * Get image dimensions from URL or calculate based on aspect ratio
 *
 * @param url - Image URL
 * @param aspectRatio - Aspect ratio (width/height), default: 16/9
 * @param defaultWidth - Default width if not specified
 * @returns Object with width and height
 */
export function getImageDimensions(
  url: string | undefined | null,
  aspectRatio: number = 16 / 9,
  defaultWidth: number = 1200
): { width: number; height: number } {
  // Try to extract dimensions from URL (e.g., Cloudinary transformations)
  if (url) {
    const widthMatch = url.match(/w_(\d+)/);
    const heightMatch = url.match(/h_(\d+)/);
    if (widthMatch && heightMatch) {
      return {
        width: parseInt(widthMatch[1], 10),
        height: parseInt(heightMatch[1], 10),
      };
    }
    if (widthMatch) {
      return {
        width: parseInt(widthMatch[1], 10),
        height: Math.round(parseInt(widthMatch[1], 10) / aspectRatio),
      };
    }
  }

  // Default dimensions
  return {
    width: defaultWidth,
    height: Math.round(defaultWidth / aspectRatio),
  };
}
