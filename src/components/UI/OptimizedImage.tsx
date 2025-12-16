/**
 * Optimized Image Component
 *
 * Wrapper around Next.js Image component with automatic Cloudinary optimization
 * and best practices for image loading and performance.
 */

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  isCloudinaryUrl,
  optimizeCloudinaryUrl,
  getResponsiveSizes,
  type CloudinaryTransformOptions,
} from "@/lib/utils/image-optimization";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  onLoad?: () => void;
  onError?: () => void;
  /**
   * Cloudinary transformation options
   * Only applies if src is a Cloudinary URL
   */
  cloudinaryOptions?: CloudinaryTransformOptions;
  /**
   * Responsive breakpoints for sizes attribute
   */
  responsiveSizes?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

/**
 * Optimized Image Component
 *
 * Automatically optimizes Cloudinary images and uses Next.js Image optimization
 * for all images. Handles placeholders and error states gracefully.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className = "",
  style,
  priority = false,
  loading = "lazy",
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  objectFit = "cover",
  objectPosition = "center",
  onLoad,
  onError,
  cloudinaryOptions,
  responsiveSizes,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle image error
  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Get optimized URL if Cloudinary
  const optimizedSrc =
    isCloudinaryUrl(src) && cloudinaryOptions ? optimizeCloudinaryUrl(src, cloudinaryOptions) : src;

  // Get responsive sizes if not provided
  const imageSizes = sizes || (responsiveSizes ? getResponsiveSizes(responsiveSizes) : undefined);

  // Placeholder URL fallback
  const placeholderSrc = "/assets/img/placeholder-club.jpg";

  // If error, show placeholder
  if (imageError) {
    return (
      <Image
        src={placeholderSrc}
        alt={alt}
        width={width || 400}
        height={height || 300}
        fill={fill}
        className={className}
        style={style}
        unoptimized={true}
        objectFit={objectFit}
        objectPosition={objectPosition}
      />
    );
  }

  // Check if placeholder URL (should not be optimized)
  const isPlaceholder = isPlaceholderUrl(src);

  // Image props
  const imageProps: React.ComponentProps<typeof Image> = {
    src: optimizedSrc,
    alt: alt || "", // Ensure alt is always provided (required by Next.js Image)
    className: `${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`,
    style: {
      ...style,
      objectFit,
      objectPosition,
    },
    priority,
    loading,
    quality,
    placeholder,
    blurDataURL,
    unoptimized: isPlaceholder, // Don't optimize placeholder URLs
    onLoad: handleLoad,
    onError: handleError,
  };

  // Add dimensions if not using fill
  if (!fill) {
    if (width) imageProps.width = width;
    if (height) imageProps.height = height;
  } else {
    imageProps.fill = true;
  }

  // Add sizes if provided
  if (imageSizes) {
    imageProps.sizes = imageSizes;
  }

  // Return Image component with all props (alt is already in imageProps)
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...imageProps} />;
}
