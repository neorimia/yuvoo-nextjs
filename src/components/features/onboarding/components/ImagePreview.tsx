/**
 * ImagePreview Component
 *
 * Reusable image preview component with remove button.
 * Used for logo, photo, and gallery image previews.
 *
 * Features:
 * - Image display with Next.js Image component
 * - Remove button with hover states
 * - Bootstrap styling with Yuvoo brand colors
 * - Responsive sizing
 */

"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  /** Image URL */
  src: string;
  /** Image alt text */
  alt: string;
  /** Remove handler */
  onRemove: () => void;
  /** Is currently uploading? */
  isUploading?: boolean;
  /** Is form loading? */
  isLoading?: boolean;
  /** Preview size (default: "8rem") */
  size?: string;
  /** Image object fit (default: "contain") */
  objectFit?: "contain" | "cover";
  /** Optional custom class name */
  className?: string;
  /** Image sizes for Next.js Image optimization */
  sizes?: string;
}

export function ImagePreview({
  src,
  alt,
  onRemove,
  isUploading = false,
  isLoading = false,
  size = "8rem",
  objectFit = "contain",
  className = "",
  sizes = "128px",
}: ImagePreviewProps) {
  return (
    <div className={cn("position-relative d-inline-block", className)}>
      <div
        className={cn(
          "position-relative border-2 border-secondary rounded overflow-hidden bg-light",
          objectFit === "cover" && "ratio ratio-1x1"
        )}
        style={objectFit === "contain" ? { width: size, height: size } : undefined}
      >
        <Image src={src} alt={alt} fill className={`object-${objectFit}`} sizes={sizes} />
        {isUploading && (
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-white" role="status">
              <span className="visually-hidden">Se încarcă...</span>
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        disabled={isLoading || isUploading}
        className="position-absolute top-0 end-0 p-1 bg-danger text-white rounded-circle text-danger-hover focus-danger"
        style={{
          transform: "translate(25%, -25%)",
          transition: "all 0.2s ease-in-out",
        }}
        aria-label={`Șterge ${alt}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
