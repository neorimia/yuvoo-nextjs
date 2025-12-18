/**
 * Upload Server Actions
 *
 * Server Actions for file uploads (images, documents).
 */

"use server";

import { headers } from "next/headers";
import { requireAuth } from "@/modules/auth/auth.service";
import {
  uploadImage,
  uploadDocument,
  validateImageFile,
  validateDocumentFile,
  extractPublicId,
  deleteImage,
  deleteDocument,
} from "@/lib/integrations/cloudinary/upload";
import { rateLimit, getClientIdentifierFromHeaders, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";
import {
  recordUpload,
  verifyUploadOwnership,
  removeUploadRecord,
} from "@/modules/uploads/uploads.service";

/**
 * Upload image to Cloudinary
 */
export async function uploadImageAction(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const user = await requireAuth(); // Authentication check

    // Rate limiting: prevent storage abuse
    try {
      const headersList = await headers();
      const identifier = getClientIdentifierFromHeaders(user.id, headersList);
      const rateLimitResult = await rateLimit(
        `upload-image:${identifier}`,
        RATE_LIMIT_CONFIGS.UPLOAD_IMAGE
      );

      if (!rateLimitResult.success) {
        return {
          success: false,
          error: `Prea multe încărcări de imagini. Te rugăm să încerci din nou după ${rateLimitResult.resetTime}.`,
        };
      }
    } catch (rateLimitError) {
      // Don't block upload if rate limiting fails (log and continue)
      console.error("[RateLimit] Error checking rate limit for image upload:", rateLimitError);
    }

    const file = formData.get("file") as File;
    if (!file) {
      return {
        success: false,
        error: "Fișierul lipsește",
      };
    }

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error || "Fișierul nu este valid",
      };
    }

    // Get optional folder from formData
    const folder = (formData.get("folder") as string) || undefined;

    // Upload to Cloudinary
    const result = await uploadImage(file, {
      folder: folder || "yuvoo/clubs",
    });

    // Record upload for ownership tracking (non-blocking)
    try {
      await recordUpload({
        userId: user.id,
        url: result.url,
        publicId: result.publicId,
        resourceType: "image",
        folder: folder || "yuvoo/clubs",
      });
    } catch (recordError) {
      // Log error but don't fail upload if tracking fails
      console.error("[Upload] Error recording upload:", recordError);
    }

    return {
      success: true,
      url: result.url,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la încărcarea imaginii",
    };
  }
}

/**
 * Upload document to Cloudinary (PDF, DOC, DOCX, images)
 */
export async function uploadDocumentAction(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const user = await requireAuth(); // Authentication check

    // Rate limiting: prevent storage abuse
    try {
      const headersList = await headers();
      const identifier = getClientIdentifierFromHeaders(user.id, headersList);
      const rateLimitResult = await rateLimit(
        `upload-document:${identifier}`,
        RATE_LIMIT_CONFIGS.UPLOAD_DOCUMENT
      );

      if (!rateLimitResult.success) {
        return {
          success: false,
          error: `Prea multe încărcări de documente. Te rugăm să încerci din nou după ${rateLimitResult.resetTime}.`,
        };
      }
    } catch (rateLimitError) {
      // Don't block upload if rate limiting fails (log and continue)
      console.error("[RateLimit] Error checking rate limit for document upload:", rateLimitError);
    }

    const file = formData.get("file") as File;
    if (!file) {
      return {
        success: false,
        error: "Fișierul lipsește",
      };
    }

    // Validate file
    const validation = validateDocumentFile(file);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error || "Fișierul nu este valid",
      };
    }

    // Get optional folder from formData
    const folder = (formData.get("folder") as string) || undefined;

    // Upload to Cloudinary
    const result = await uploadDocument(file, {
      folder: folder || "yuvoo/clubs/documents",
    });

    // Determine resource type based on file type
    const isImage = file.type.startsWith("image/");
    const resourceType = isImage ? "image" : "raw";

    // Record upload for ownership tracking (non-blocking)
    try {
      await recordUpload({
        userId: user.id,
        url: result.url,
        publicId: result.publicId,
        resourceType,
        folder: folder || "yuvoo/clubs/documents",
      });
    } catch (recordError) {
      // Log error but don't fail upload if tracking fails
      console.error("[Upload] Error recording upload:", recordError);
    }

    return {
      success: true,
      url: result.url,
    };
  } catch (error) {
    console.error("Error uploading document:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la încărcarea documentului",
    };
  }
}

/**
 * Delete uploaded image from Cloudinary
 */
export async function deleteImageAction(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth(); // Authentication check

    // Extract public ID from Cloudinary URL
    const publicId = extractPublicId(imageUrl);
    if (!publicId) {
      return {
        success: false,
        error: "URL-ul imaginii nu este valid",
      };
    }

    // Verify ownership before deletion
    const uploadRecord = await verifyUploadOwnership(imageUrl, user.id);
    if (!uploadRecord) {
      return {
        success: false,
        error: "Nu ai permisiunea de a șterge această imagine. Imaginea nu îți aparține.",
      };
    }

    // Delete from Cloudinary
    await deleteImage(publicId, uploadRecord.resourceType);

    // Remove upload record from database (non-blocking)
    try {
      await removeUploadRecord(uploadRecord.id);
    } catch (recordError) {
      // Log error but don't fail deletion if record removal fails
      console.error("[Upload] Error removing upload record:", recordError);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la ștergerea imaginii",
    };
  }
}

/**
 * Delete uploaded document from Cloudinary
 */
export async function deleteDocumentAction(
  documentUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth(); // Authentication check

    // Extract public ID from Cloudinary URL
    const publicId = extractPublicId(documentUrl);
    if (!publicId) {
      return {
        success: false,
        error: "URL-ul documentului nu este valid",
      };
    }

    // Verify ownership before deletion
    const uploadRecord = await verifyUploadOwnership(documentUrl, user.id);
    if (!uploadRecord) {
      return {
        success: false,
        error: "Nu ai permisiunea de a șterge acest document. Documentul nu îți aparține.",
      };
    }

    // Delete from Cloudinary (try both resource types)
    await deleteDocument(publicId);

    // Remove upload record from database (non-blocking)
    try {
      await removeUploadRecord(uploadRecord.id);
    } catch (recordError) {
      // Log error but don't fail deletion if record removal fails
      console.error("[Upload] Error removing upload record:", recordError);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting document:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la ștergerea documentului",
    };
  }
}
