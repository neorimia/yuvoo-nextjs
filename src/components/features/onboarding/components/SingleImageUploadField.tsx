/**
 * SingleImageUploadField Component
 *
 * Reusable single image upload component with preview, delete, and loading states.
 * Used for logo and photo uploads.
 *
 * Features:
 * - Image upload with preview
 * - Delete functionality
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

interface SingleImageUploadFieldProps {
  /** Field label */
  label: string;
  /** Field name (for React Hook Form) */
  name: string;
  /** React Hook Form setValue function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  /** Current image URL */
  currentValue?: string;
  /** Validation error */
  error?: FieldError;
  /** Cloudinary folder path */
  folder: string;
  /** Is field required? */
  required?: boolean;
  /** Help text/tooltip content */
  helpText?: string;
  /** Optional description below label */
  description?: string;
  /** Accepted file formats */
  acceptedFormats?: string[];
  /** Maximum file size in MB */
  maxSizeMB?: number;
  /** Preview size */
  previewSize?: string;
  /** Image object fit */
  objectFit?: "contain" | "cover";
  /** Loading state */
  isLoading?: boolean;
  /** Error setter for server errors */
  setServerError?: (error: string | null) => void;
  /** Optional custom class name */
  className?: string;
}

export function SingleImageUploadField({
  label,
  name,
  setValue,
  currentValue,
  error,
  folder,
  required = false,
  helpText,
  description,
  acceptedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  maxSizeMB = 5,
  previewSize = "8rem",
  objectFit = "contain",
  isLoading = false,
  setServerError,
  className = "",
}: SingleImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    if (setServerError) setServerError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const result = await uploadImageAction(formData);

      if (result.success && result.url) {
        // Delete old image if exists
        if (currentValue) {
          try {
            await deleteImageAction(currentValue);
          } catch (error) {
            console.error("Error deleting old image:", error);
            // Continue even if deletion fails
          }
        }

        setValue(name, result.url, { shouldValidate: true });
      } else {
        if (setServerError) {
          setServerError(result.error || "Eroare la încărcarea imaginii");
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      if (setServerError) {
        setServerError("A apărut o eroare neașteptată la încărcarea imaginii");
      }
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    if (currentValue) {
      try {
        await deleteImageAction(currentValue);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    setValue(name, "", { shouldValidate: true });
  };

  const formatHint = acceptedFormats.map((f) => f.split("/")[1].toUpperCase()).join(", ");

  return (
    <div className={cn("mb-4", className)}>
      {/* Label */}
      <label className="d-flex align-items-center gap-2 small fw-medium text-body mb-2">
        {label}
        {required && <span className="text-danger">*</span>}
        {helpText && <InfoTooltip content={helpText} size="sm" />}
      </label>

      {/* Description */}
      {description && <p className="small text-secondary mb-3">{description}</p>}

      {/* Image Preview or Upload Area */}
      {currentValue ? (
        <ImagePreview
          src={currentValue}
          alt={label}
          onRemove={handleRemove}
          isUploading={uploading}
          isLoading={isLoading}
          size={previewSize}
          objectFit={objectFit}
        />
      ) : (
        <FileUploadArea
          label="Apasă pentru a încărca imagine"
          fileTypeHint={`${formatHint}, maxim ${maxSizeMB}MB`}
          isUploading={uploading}
          isLoading={isLoading}
          onClick={() => inputRef.current?.click()}
        />
      )}

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats.join(",")}
        onChange={handleUpload}
        className="visually-hidden"
        aria-label={label}
      />

      {/* Error Message */}
      {error && (
        <p className="mt-2 small text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
