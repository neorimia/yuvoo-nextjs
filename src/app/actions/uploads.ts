/**
 * Upload Server Actions
 *
 * Server Actions for file uploads (images, documents).
 */

"use server";

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

/**
 * Upload image to Cloudinary
 */
export async function uploadImageAction(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    await requireAuth(); // Authentication check

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
    await requireAuth(); // Authentication check

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
    await requireAuth(); // Authentication check

    // Extract public ID from Cloudinary URL
    const publicId = extractPublicId(imageUrl);
    if (!publicId) {
      return {
        success: false,
        error: "URL-ul imaginii nu este valid",
      };
    }

    // Delete from Cloudinary
    await deleteImage(publicId);

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
    await requireAuth(); // Authentication check

    // Extract public ID from Cloudinary URL
    const publicId = extractPublicId(documentUrl);
    if (!publicId) {
      return {
        success: false,
        error: "URL-ul documentului nu este valid",
      };
    }

    // Delete from Cloudinary (try both resource types)
    await deleteDocument(publicId);

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
