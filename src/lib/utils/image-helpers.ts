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
  return url.includes("via.placeholder.com");
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
