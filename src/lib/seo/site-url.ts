/**
 * Canonical site URL for SEO metadata, sitemap, robots, and JSON-LD.
 * Production default: https://yuvoo.ro (apex, no www).
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
}
