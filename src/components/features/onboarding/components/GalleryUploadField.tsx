/**
 * GalleryUploadField Component
 *
 * Reusable multiple image upload component with grid preview.
 * Used for gallery photo uploads.
 *
 * Features:
 * - Multiple image upload
 * - Grid preview layout
 * - Individual image removal
 * - Loading states
 * - Error handling
 * - Bootstrap styling
 */

"use client";

import { useState, useRef } from "react";
import { UseFormSetValue, FieldError } from "react-hook-form";
import { uploadImageAction, deleteImageAction } from "@/app/actions/uploads";
import { FileUploadArea } from "./FileUploadArea";
import { ImagePreview } from "./ImagePreview";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { cn } from "@/lib/utils";

interface GalleryUploadFieldProps {
  /** Field label */
  label: string;
  /** Field name (for React Hook Form) */
  name: string;
  /** React Hook Form setValue function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  /** Current image URLs */
  currentValues?: string[];
  /** Validation error */
  error?: FieldError;
  /** Cloudinary folder path */
  folder: string;
  /** Minimum number of images */
  minImages?: number;
  /** Maximum number of images */
  maxImages?: number;
  /** Is field required? */
  required?: boolean;
  /** Help text/tooltip content */
  helpText?: string;
  /** Optional description below label */
  description?: string;
  /** Grid column configuration */
  gridCols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  /** Accepted file formats */
  acceptedFormats?: string[];
  /** Maximum file size in MB */
  maxSizeMB?: number;
  /** Loading state */
  isLoading?: boolean;
  /** Error setter for server errors */
  setServerError?: (error: string | null) => void;
  /** Optional custom class name */
  className?: string;
}

export function GalleryUploadField({
  label,
  name,
  setValue,
  currentValues = [],
  error,
  folder,
  minImages,
  maxImages,
  required = false,
  helpText,
  description,
  gridCols = { xs: 6, sm: 4, md: 3 },
  acceptedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  maxSizeMB = 5,
  isLoading = false,
  setServerError,
  className = "",
}: GalleryUploadFieldProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getColClass = () => {
    const classes = [];
    if (gridCols.xs) classes.push(`col-${12 / gridCols.xs}`);
    if (gridCols.sm) classes.push(`col-sm-${12 / gridCols.sm}`);
    if (gridCols.md) classes.push(`col-md-${12 / gridCols.md}`);
    if (gridCols.lg) classes.push(`col-lg-${12 / gridCols.lg}`);
    return classes.join(" ");
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    if (setServerError) setServerError(null);

    // Upload files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileIndex = currentValues.length + i;
      setUploadingIndex(fileIndex);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const result = await uploadImageAction(formData);

        if (result.success && result.url) {
          const newUrls = [...currentValues, result.url];
          setValue(name, newUrls, { shouldValidate: true });
        } else {
          if (setServerError) {
            setServerError(result.error || `Eroare la încărcarea imaginii ${i + 1}`);
          }
        }
      } catch (error) {
        console.error(`Error uploading gallery image ${i + 1}:`, error);
        if (setServerError) {
          setServerError(`Eroare la încărcarea imaginii ${i + 1}`);
        }
      } finally {
        setUploadingIndex(null);
      }
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = async (index: number) => {
    const urlToRemove = currentValues[index];
    const newUrls = currentValues.filter((_, i) => i !== index);
    setValue(name, newUrls, { shouldValidate: true });

    if (urlToRemove) {
      try {
        await deleteImageAction(urlToRemove);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  const formatHint = acceptedFormats.map((f) => f.split("/")[1].toUpperCase()).join(", ");

  const canUploadMore = maxImages ? currentValues.length < maxImages : true;

  return (
    <div className={cn("bd-gallery-upload-field mb-4", className)}>
      {/* Label */}
      <label className="bd-gallery-upload-field-label d-flex align-items-center gap-2 small fw-medium text-body mb-2">
        {label}
        {required && <span className="text-danger">*</span>}
        {helpText && <InfoTooltip content={helpText} size="sm" />}
      </label>

      {/* Description */}
      {description && (
        <p className="bd-gallery-upload-field-description small text-secondary mb-3">
          {description}
        </p>
      )}

      {/* Gallery Grid */}
      {currentValues.length > 0 && (
        <div className="bd-gallery-upload-field-grid row g-3 mb-3">
          {currentValues.map((url, index) => (
            <div key={index} className={getColClass()}>
              <ImagePreview
                src={url}
                alt={`${label} ${index + 1}`}
                onRemove={() => handleRemove(index)}
                isUploading={uploadingIndex === index}
                isLoading={isLoading}
                objectFit="cover"
                sizes="(max-width: 576px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canUploadMore && (
        <div className="bd-gallery-upload-field-upload">
          <FileUploadArea
            label="Adaugă fotografii în galerie"
            fileTypeHint={`${formatHint}, maxim ${maxSizeMB}MB`}
            maxRemainingHint={
              minImages && currentValues.length < minImages
                ? `Minim ${minImages} imagini necesare`
                : undefined
            }
            isUploading={uploadingIndex !== null}
            isLoading={isLoading}
            maxFiles={maxImages}
            currentFiles={currentValues.length}
            onClick={() => inputRef.current?.click()}
          />
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats.join(",")}
        multiple
        onChange={handleUpload}
        className="visually-hidden"
        aria-label={label}
      />

      {/* Info Text */}
      {minImages && (
        <p className="bd-gallery-upload-field-info text-xs text-secondary mt-2">
          {currentValues.length < minImages ? (
            <span className="text-danger">
              Minim {minImages} imagini necesare ({currentValues.length}/{minImages})
            </span>
          ) : (
            <span>
              {currentValues.length} {currentValues.length === 1 ? "imagine" : "imagini"} adăugate
              {maxImages && ` (maxim ${maxImages})`}
            </span>
          )}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="bd-gallery-upload-field-error mt-2 small text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
