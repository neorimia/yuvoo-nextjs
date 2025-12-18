/**
 * DocumentUploadField Component
 *
 * Reusable document upload component with file preview and removal.
 * Used for verification document uploads.
 *
 * Features:
 * - Multiple document upload
 * - File preview with icons
 * - Individual document removal
 * - Loading states
 * - Error handling
 * - Bootstrap styling
 */

"use client";

import { useState, useRef } from "react";
import { UseFormSetValue, FieldError } from "react-hook-form";
import { uploadDocumentAction, deleteDocumentAction } from "@/app/actions/uploads";
import { FileUploadArea } from "./FileUploadArea";
import { DocumentPreview } from "./DocumentPreview";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { cn } from "@/lib/utils";

interface DocumentUploadFieldProps {
  /** Field label */
  label: string;
  /** Field name (for React Hook Form) */
  name: string;
  /** React Hook Form setValue function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  /** Current document URLs */
  currentValues?: string[];
  /** Validation error */
  error?: FieldError;
  /** Cloudinary folder path */
  folder: string;
  /** Minimum number of documents */
  minDocuments?: number;
  /** Maximum number of documents */
  maxDocuments?: number;
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
  /** Loading state */
  isLoading?: boolean;
  /** Error setter for server errors */
  setServerError?: (error: string | null) => void;
  /** Optional custom class name */
  className?: string;
}

export function DocumentUploadField({
  label,
  name,
  setValue,
  currentValues = [],
  error,
  folder,
  minDocuments,
  maxDocuments,
  required = false,
  helpText,
  description,
  acceptedFormats = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ],
  maxSizeMB = 10,
  isLoading = false,
  setServerError,
  className = "",
}: DocumentUploadFieldProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    if (setServerError) setServerError(null);

    // Upload files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadingIndex(i);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const result = await uploadDocumentAction(formData);

        if (result.success && result.url) {
          const newUrls = [...currentValues, result.url];
          setValue(name, newUrls, { shouldValidate: true });
        } else {
          if (setServerError) {
            setServerError(result.error || `Eroare la încărcarea documentului ${i + 1}`);
          }
        }
      } catch (error) {
        console.error(`Error uploading document ${i + 1}:`, error);
        if (setServerError) {
          setServerError(`Eroare la încărcarea documentului ${i + 1}`);
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
        await deleteDocumentAction(urlToRemove);
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const formatHint = acceptedFormats
    .map((f) => {
      if (f.includes("pdf")) return "PDF";
      if (f.includes("word") || f.includes("msword")) return "DOC/DOCX";
      if (f.includes("image")) return "JPG/PNG";
      return f.split("/")[1].toUpperCase();
    })
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(", ");

  const canUploadMore = maxDocuments ? currentValues.length < maxDocuments : true;

  return (
    <div className={cn("bd-document-upload-field mb-4", className)}>
      {/* Label */}
      <label className="bd-document-upload-field-label d-flex align-items-center gap-2 small fw-medium text-body mb-2">
        {label}
        {required && <span className="text-danger">*</span>}
        {helpText && <InfoTooltip content={helpText} size="sm" />}
      </label>

      {/* Description */}
      {description && (
        <p className="bd-document-upload-field-description small text-secondary mb-3">
          {description}
        </p>
      )}

      {/* Document List */}
      {currentValues.length > 0 && (
        <div className="bd-document-upload-field-list mb-3">
          {currentValues.map((url, index) => (
            <DocumentPreview
              key={index}
              url={url}
              onRemove={() => handleRemove(index)}
              isUploading={uploadingIndex === index}
              isLoading={isLoading}
              className="mb-2"
            />
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canUploadMore && (
        <div className="bd-document-upload-field-upload">
          <FileUploadArea
            label="Adaugă documente"
            fileTypeHint={`${formatHint}, maxim ${maxSizeMB}MB`}
            maxRemainingHint={
              minDocuments && currentValues.length < minDocuments
                ? `Minim ${minDocuments} documente necesare`
                : undefined
            }
            isUploading={uploadingIndex !== null}
            isLoading={isLoading}
            maxFiles={maxDocuments}
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
      {minDocuments && (
        <p className="bd-document-upload-field-info text-xs text-secondary mt-2">
          {currentValues.length < minDocuments ? (
            <span className="text-danger">
              Minim {minDocuments} documente necesare ({currentValues.length}/{minDocuments})
            </span>
          ) : (
            <span>
              {currentValues.length} {currentValues.length === 1 ? "document" : "documente"}{" "}
              adăugate
              {maxDocuments && ` (maxim ${maxDocuments})`}
            </span>
          )}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="bd-document-upload-field-error mt-2 small text-danger" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
