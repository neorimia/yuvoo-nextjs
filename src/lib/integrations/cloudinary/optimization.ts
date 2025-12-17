/**
 * Cloudinary Image Optimization
 *
 * Utilities for generating optimized Cloudinary URLs with transformations
 * for automatic image optimization, format conversion, and responsive images.
 */

/**
 * Cloudinary Transformation Presets
 */
export interface CloudinaryPreset {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  crop?: "fill" | "fit" | "scale" | "thumb" | "limit";
  gravity?: "auto" | "face" | "center";
  fetchFormat?: "auto" | "webp" | "avif";
}

/**
 * Generate Cloudinary URL with transformations
 *
 * @param publicId - Cloudinary public ID or full URL
 * @param preset - Transformation preset
 * @returns Optimized Cloudinary URL
 */
export function getCloudinaryUrl(publicId: string, preset?: CloudinaryPreset): string {
  // If already a full URL, extract public ID
  let extractedPublicId = publicId;
  if (publicId.includes("res.cloudinary.com")) {
    // Extract public ID from URL
    const match = publicId.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    if (match) {
      extractedPublicId = match[1];
    } else {
      return publicId; // Return original if can't parse
    }
  }

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn("[Cloudinary] Cloud name not configured, returning original URL");
    return publicId;
  }

  // Build transformation string
  const transformations: string[] = [];

  if (preset) {
    if (preset.width) transformations.push(`w_${preset.width}`);
    if (preset.height) transformations.push(`h_${preset.height}`);
    if (preset.quality) transformations.push(`q_${preset.quality}`);
    if (preset.format && preset.format !== "auto") transformations.push(`f_${preset.format}`);
    if (preset.crop) transformations.push(`c_${preset.crop}`);
    if (preset.gravity && preset.crop === "fill") transformations.push(`g_${preset.gravity}`);
    if (preset.fetchFormat && preset.fetchFormat !== "auto") {
      transformations.push(`fl_${preset.fetchFormat}`);
    }
  }

  // Default: auto format and quality
  if (transformations.length === 0) {
    transformations.push("f_auto", "q_auto");
  } else {
    // Ensure auto format if not specified
    if (!preset?.format || preset.format === "auto") {
      transformations.push("f_auto");
    }
    if (!preset?.quality) {
      transformations.push("q_auto");
    }
  }

  const transformString = transformations.join(",");

  // Build Cloudinary URL
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${extractedPublicId}`;
}

/**
 * Generate responsive srcSet for Cloudinary images
 *
 * @param publicId - Cloudinary public ID or full URL
 * @param widths - Array of widths for responsive images
 * @param preset - Base transformation preset
 * @returns SrcSet string
 */
export function getCloudinarySrcSet(
  publicId: string,
  widths: number[],
  preset?: CloudinaryPreset
): string {
  return widths
    .map((width) => {
      const url = getCloudinaryUrl(publicId, { ...preset, width });
      return `${url} ${width}w`;
    })
    .join(", ");
}

/**
 * Predefined Cloudinary presets for common use cases
 */
export const CloudinaryPresets = {
  /** Thumbnail: 200x200, square crop, optimized quality */
  thumbnail: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 200,
      height: 200,
      crop: "fill",
      quality: 80,
      format: "auto",
    }),

  /** Card image: 400x300, 4:3 aspect ratio */
  card: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 400,
      height: 300,
      crop: "fill",
      quality: 85,
      format: "auto",
    }),

  /** Gallery thumbnail: 300x300, square */
  galleryThumb: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 300,
      height: 300,
      crop: "fill",
      quality: 80,
      format: "auto",
    }),

  /** Hero image: 1920x1080, 16:9 aspect ratio, high quality */
  hero: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 1920,
      height: 1080,
      crop: "fill",
      quality: 90,
      format: "auto",
    }),

  /** Detail page image: 1200x800, 3:2 aspect ratio */
  detail: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 1200,
      height: 800,
      crop: "fill",
      quality: 90,
      format: "auto",
    }),

  /** Avatar: 150x150, square, face detection */
  avatar: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 150,
      height: 150,
      crop: "fill",
      gravity: "face",
      quality: 85,
      format: "auto",
    }),

  /** Logo: 200x200, fit (preserve aspect ratio) */
  logo: (publicId: string) =>
    getCloudinaryUrl(publicId, {
      width: 200,
      height: 200,
      crop: "fit",
      quality: 90,
      format: "auto",
    }),

  /** Responsive: Auto width, maintain aspect ratio */
  responsive: (publicId: string, maxWidth: number = 1920) =>
    getCloudinaryUrl(publicId, {
      width: maxWidth,
      crop: "limit", // Don't upscale, but allow downscaling
      quality: 85,
      format: "auto",
    }),
};
