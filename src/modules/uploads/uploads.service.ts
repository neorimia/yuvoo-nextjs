/**
 * Uploads Service
 *
 * Business logic for upload tracking and ownership verification.
 */

import {
  createUploadRecord,
  findUploadByUrlAndUser,
  findUploadByPublicIdAndUser,
  deleteUploadRecord,
  type UploadRecord,
} from "./uploads.repository";

/**
 * Record an upload for ownership tracking
 */
export async function recordUpload(input: {
  userId: string;
  url: string;
  publicId: string;
  resourceType: "image" | "raw";
  folder?: string;
}): Promise<UploadRecord> {
  return createUploadRecord(input);
}

/**
 * Verify upload ownership
 *
 * @param url - Cloudinary URL
 * @param userId - User ID to verify ownership
 * @returns Upload record if user owns the upload, null otherwise
 */
export async function verifyUploadOwnership(
  url: string,
  userId: string
): Promise<UploadRecord | null> {
  return findUploadByUrlAndUser(url, userId);
}

/**
 * Verify upload ownership by public ID
 *
 * @param publicId - Cloudinary public ID
 * @param userId - User ID to verify ownership
 * @returns Upload record if user owns the upload, null otherwise
 */
export async function verifyUploadOwnershipByPublicId(
  publicId: string,
  userId: string
): Promise<UploadRecord | null> {
  return findUploadByPublicIdAndUser(publicId, userId);
}

/**
 * Delete upload record after successful Cloudinary deletion
 */
export async function removeUploadRecord(id: string): Promise<void> {
  await deleteUploadRecord(id);
}
