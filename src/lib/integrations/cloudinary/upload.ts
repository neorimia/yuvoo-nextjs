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
 * Works in both browser and Node.js environments
 */
async function fileToBase64(file: File): Promise<string> {
  // Check if we're in a browser environment
  if (typeof window !== "undefined" && typeof FileReader !== "undefined") {
    // Browser: use FileReader
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
  } else {
    // Node.js/Server: use arrayBuffer and Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString("base64");
    const mimeType = file.type || "application/octet-stream";
    return `data:${mimeType};base64,${base64String}`;
  }
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

  // Extract base64 string and mime type from data URL
  // Format: data:[mime-type];base64,[base64-string]
  const dataUrlMatch = base64Data.match(/^data:([^;]+);base64,(.+)$/);
  if (!dataUrlMatch) {
    throw new Error("Formatul datelor base64 este invalid");
  }

  const mimeType = dataUrlMatch[1] || file.type || "image/jpeg";
  const base64String = dataUrlMatch[2];

  // Prepare upload options
  // Remove trailing slashes from folder names (can cause signature issues)
  const folder = options.folder?.replace(/\/+$/, "") || "yuvoo/clubs";

  const uploadOptions: Record<string, unknown> = {
    resource_type: "image",
    folder,
    ...options.transformation,
  };

  if (options.publicId) {
    uploadOptions.public_id = options.publicId;
  }

  try {
    // Construct the data URL for Cloudinary
    // Cloudinary expects: data:[mime-type];base64,[base64-string]
    const dataUrl = `data:${mimeType};base64,${base64String}`;

    // Upload to Cloudinary
    // Note: When using server-side SDK with API secret, Cloudinary automatically signs the request
    const result = await cloudinary.uploader.upload(dataUrl, {
      ...uploadOptions,
      overwrite: true,
      invalidate: true,
    });

    if (!result || !result.secure_url) {
      throw new Error("Cloudinary upload succeeded but no URL was returned");
    }

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Extract error message from various error formats
    let errorMessage = "Eroare la încărcarea imaginii în Cloudinary";
    let errorDetails: Record<string, unknown> = {};

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else if (error && typeof error === "object") {
      // Handle Cloudinary error objects
      const cloudinaryError = error as { message?: string; http_code?: number; name?: string };
      errorMessage = cloudinaryError.message || String(error);
      errorDetails = {
        name: cloudinaryError.name || "CloudinaryError",
        message: cloudinaryError.message,
        http_code: cloudinaryError.http_code,
      };
    } else {
      errorMessage = String(error);
    }

    // Log more details in development
    if (process.env.NODE_ENV === "development") {
      console.error("Upload details:", {
        fileType: mimeType,
        fileSize: file.size,
        folder: uploadOptions.folder,
        errorDetails,
      });
    }

    // Provide more specific error messages
    if (errorMessage.includes("Invalid API Key") || errorMessage.includes("401")) {
      throw new Error(
        "Configurație Cloudinary invalidă. Verifică variabilele de mediu (API Key/Secret)."
      );
    }
    if (errorMessage.includes("Invalid signature") || errorMessage.includes("Invalid Signature")) {
      throw new Error(
        "Semnătură Cloudinary invalidă. Verifică API secret în variabilele de mediu."
      );
    }
    if (errorMessage.includes("File size too large")) {
      throw new Error("Fișierul este prea mare. Dimensiunea maximă este 5MB.");
    }

    throw new Error(errorMessage);
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

  // Extract base64 string and mime type from data URL
  // Format: data:[mime-type];base64,[base64-string]
  const dataUrlMatch = base64Data.match(/^data:([^;]+);base64,(.+)$/);
  if (!dataUrlMatch) {
    throw new Error("Formatul datelor base64 este invalid");
  }

  const mimeType = dataUrlMatch[1] || file.type || "application/octet-stream";
  const base64String = dataUrlMatch[2];

  // Determine resource type based on mime type
  const isImage = mimeType.startsWith("image/");
  const resourceType = isImage ? "image" : "raw";

  // Prepare upload options
  // Remove trailing slashes from folder names (can cause signature issues)
  const folder = options.folder?.replace(/\/+$/, "") || "yuvoo/clubs/documents";

  const uploadOptions: Record<string, unknown> = {
    resource_type: resourceType,
    folder,
    ...options.transformation,
  };

  if (options.publicId) {
    uploadOptions.public_id = options.publicId;
  }

  try {
    // Construct data URL for Cloudinary
    const dataUrl = `data:${mimeType};base64,${base64String}`;

    // Upload to Cloudinary
    // Note: When using server-side SDK with API secret, Cloudinary automatically signs the request
    const result = await cloudinary.uploader.upload(dataUrl, {
      ...uploadOptions,
      overwrite: true,
      invalidate: true,
    });

    if (!result || !result.secure_url) {
      throw new Error("Cloudinary upload succeeded but no URL was returned");
    }

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Extract error message from various error formats
    let errorMessage = "Eroare la încărcarea documentului în Cloudinary";
    let errorDetails: Record<string, unknown> = {};

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else if (error && typeof error === "object") {
      // Handle Cloudinary error objects
      const cloudinaryError = error as { message?: string; http_code?: number; name?: string };
      errorMessage = cloudinaryError.message || String(error);
      errorDetails = {
        name: cloudinaryError.name || "CloudinaryError",
        message: cloudinaryError.message,
        http_code: cloudinaryError.http_code,
      };
    } else {
      errorMessage = String(error);
    }

    // Log more details in development
    if (process.env.NODE_ENV === "development") {
      console.error("Upload details:", {
        fileType: mimeType,
        fileSize: file.size,
        folder: uploadOptions.folder,
        errorDetails,
      });
    }

    // Provide more specific error messages
    if (errorMessage.includes("Invalid API Key") || errorMessage.includes("401")) {
      throw new Error(
        "Configurație Cloudinary invalidă. Verifică variabilele de mediu (API Key/Secret)."
      );
    }
    if (errorMessage.includes("Invalid signature") || errorMessage.includes("Invalid Signature")) {
      throw new Error(
        "Semnătură Cloudinary invalidă. Verifică API secret în variabilele de mediu."
      );
    }
    if (errorMessage.includes("File size too large")) {
      throw new Error("Fișierul este prea mare. Dimensiunea maximă este 10MB.");
    }

    throw new Error(errorMessage);
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
