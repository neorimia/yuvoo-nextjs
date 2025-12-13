/**
 * Cloudinary Upload Utilities
 *
 * Helper functions for uploading images to Cloudinary.
 */

import { cloudinary } from "./client";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10MB for documents
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

export interface UploadOptions {
  folder?: string;
  publicId?: string;
  transformation?: Record<string, unknown>;
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Tip de fișier neacceptat. Acceptă doar: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Fișierul este prea mare. Dimensiunea maximă este ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

/**
 * Convert File to base64 data URL
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Upload image to Cloudinary
 */
export async function uploadImage(
  file: File,
  options: UploadOptions = {}
): Promise<{ url: string; publicId: string }> {
  // Validate file
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Convert file to base64
  const base64Data = await fileToBase64(file);
  const base64String = base64Data.split(",")[1]; // Remove data:image/...;base64, prefix

  // Prepare upload options
  const uploadOptions: Record<string, unknown> = {
    resource_type: "image",
    folder: options.folder || "yuvoo/clubs",
    ...options.transformation,
  };

  if (options.publicId) {
    uploadOptions.public_id = options.publicId;
  }

  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(`data:${file.type};base64,${base64String}`, {
      ...uploadOptions,
      overwrite: true,
      invalidate: true,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Eroare la încărcarea imaginii în Cloudinary"
    );
  }
}

/**
 * Delete image or document from Cloudinary
 */
export async function deleteImage(
  publicId: string,
  resourceType: "image" | "raw" = "image"
): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Eroare la ștergerea fișierului din Cloudinary"
    );
  }
}

/**
 * Delete document from Cloudinary
 */
export async function deleteDocument(publicId: string): Promise<void> {
  // Try both resource types since we don't know if it was uploaded as image or raw
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
  } catch {
    // If it fails, try as image
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  }
}

/**
 * Validate document file
 */
export function validateDocumentFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Tip de fișier neacceptat. Acceptă doar: PDF, DOC, DOCX, JPG, PNG`,
    };
  }

  // Check file size
  if (file.size > MAX_DOCUMENT_SIZE) {
    return {
      valid: false,
      error: `Fișierul este prea mare. Dimensiunea maximă este ${MAX_DOCUMENT_SIZE / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

/**
 * Upload document to Cloudinary (raw file)
 */
export async function uploadDocument(
  file: File,
  options: UploadOptions = {}
): Promise<{ url: string; publicId: string }> {
  // Validate file
  const validation = validateDocumentFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Convert file to base64
  const base64Data = await fileToBase64(file);
  const base64String = base64Data.split(",")[1]; // Remove data:...;base64, prefix

  // Determine resource type based on file type
  const isImage = file.type.startsWith("image/");
  const resourceType = isImage ? "image" : "raw";

  // Prepare upload options
  const uploadOptions: Record<string, unknown> = {
    resource_type: resourceType,
    folder: options.folder || "yuvoo/clubs/documents",
    ...options.transformation,
  };

  if (options.publicId) {
    uploadOptions.public_id = options.publicId;
  }

  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(`data:${file.type};base64,${base64String}`, {
      ...uploadOptions,
      overwrite: true,
      invalidate: true,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Eroare la încărcarea documentului în Cloudinary"
    );
  }
}

/**
 * Extract public ID from Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/filename.jpg
    // or https://res.cloudinary.com/cloud_name/raw/upload/v1234567890/folder/filename.pdf
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    return matches ? matches[1] : null;
  } catch {
    return null;
  }
}
