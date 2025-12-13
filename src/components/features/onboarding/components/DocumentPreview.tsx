/**
 * DocumentPreview Component
 *
 * Reusable document preview component with file icon and remove button.
 * Used for verification document previews.
 *
 * Features:
 * - File type icons (PDF, DOC, images)
 * - File name display
 * - Remove button with hover states
 * - Bootstrap styling with Yuvoo brand colors
 * - Loading states
 */

"use client";

import { X, FileText, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentPreviewProps {
  /** Document URL */
  url: string;
  /** File name (optional, extracted from URL if not provided) */
  fileName?: string;
  /** Remove handler */
  onRemove: () => void;
  /** Is currently uploading? */
  isUploading?: boolean;
  /** Is form loading? */
  isLoading?: boolean;
  /** Optional custom class name */
  className?: string;
}

export function DocumentPreview({
  url,
  fileName,
  onRemove,
  isUploading = false,
  isLoading = false,
  className = "",
}: DocumentPreviewProps) {
  const getFileIcon = () => {
    if (url.toLowerCase().endsWith(".pdf")) {
      return <FileText className="w-8 h-8 text-danger" />;
    }
    if (url.toLowerCase().match(/\.(doc|docx)$/)) {
      return <File className="w-8 h-8 text-primary" />;
    }
    return <File className="w-8 h-8 text-secondary" />;
  };

  const getFileName = () => {
    if (fileName) return fileName;
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.split("/").pop() || "document";
      return decodeURIComponent(filename);
    } catch {
      return "document";
    }
  };

  return (
    <div
      className={cn(
        "d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2 p-3 border border-secondary rounded bg-light",
        className
      )}
    >
      <div className="d-flex align-items-center gap-3 flex-fill" style={{ minWidth: 0 }}>
        {getFileIcon()}
        <div className="flex-fill" style={{ minWidth: 0 }}>
          <p className="small fw-medium text-body text-truncate">{getFileName()}</p>
          <p className="text-xs text-secondary text-truncate d-none d-sm-block">{url}</p>
        </div>
        {isUploading && (
          <div
            className="spinner-border spinner-border-sm text-yuvoo-primary"
            role="status"
            aria-hidden="true"
          />
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        disabled={isLoading || isUploading}
        className="ms-3 p-2 text-danger text-danger-hover bg-danger bg-opacity-10 rounded focus-danger"
        style={{
          transition: "all 0.2s ease-in-out",
          opacity: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0";
        }}
        onFocus={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        aria-label={`Șterge document`}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
