/**
 * FileUploadArea Component
 *
 * Reusable file upload area component with drag-and-drop styling.
 * Used for image and document uploads across onboarding forms.
 *
 * Features:
 * - Bootstrap styling with Yuvoo brand colors
 * - Loading states with spinner
 * - Upload icon and text
 * - File type and size hints
 * - Disabled states
 * - Click to upload functionality
 */

"use client";

import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadAreaProps {
  /** Upload area label text */
  label: string;
  /** File type hint (e.g., "JPG, PNG sau WebP") */
  fileTypeHint?: string;
  /** Maximum files remaining hint (e.g., "maxim 5 restante") */
  maxRemainingHint?: string;
  /** Is currently uploading? */
  isUploading?: boolean;
  /** Is form loading? */
  isLoading?: boolean;
  /** Maximum files allowed */
  maxFiles?: number;
  /** Current number of files */
  currentFiles?: number;
  /** Click handler */
  onClick: () => void;
  /** Optional custom class name */
  className?: string;
  /** Optional height (default: 8rem) */
  height?: string;
}

export function FileUploadArea({
  label,
  fileTypeHint,
  maxRemainingHint,
  isUploading = false,
  isLoading = false,
  maxFiles,
  currentFiles = 0,
  onClick,
  className = "",
  height = "8rem",
}: FileUploadAreaProps) {
  const isDisabled =
    isLoading || isUploading || (maxFiles !== undefined && currentFiles >= maxFiles);

  return (
    <div
      onClick={() => !isDisabled && onClick()}
      className={cn(
        "bd-file-upload-area w-100 border-2 border-dashed rounded",
        "d-flex align-items-center justify-content-center",
        isUploading && "bd-file-upload-area-uploading",
        isDisabled && "bd-file-upload-area-disabled",
        isLoading && "opacity-50",
        className
      )}
      style={{
        height,
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      {isUploading ? (
        <div className="bd-file-upload-area-loading text-center">
          <div
            className="spinner-border spinner-border-sm text-yuvoo-primary mb-2"
            role="status"
            aria-hidden="true"
          />
          <p className="bd-file-upload-area-loading-text small text-body">Se încarcă...</p>
        </div>
      ) : (
        <div className="bd-file-upload-area-content text-center">
          <Upload className="bd-file-upload-area-icon w-8 h-8 text-secondary mx-auto mb-2" />
          <p className="bd-file-upload-area-label small fw-medium text-body">{label}</p>
          {fileTypeHint && (
            <p className="bd-file-upload-area-hint text-xs text-secondary">{fileTypeHint}</p>
          )}
          {maxRemainingHint && (
            <p className="bd-file-upload-area-hint text-xs text-secondary">
              {maxRemainingHint}
              {maxFiles !== undefined && ` (maxim ${maxFiles - currentFiles} restante)`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
