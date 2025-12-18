/**
 * Uploads Repository
 *
 * Data access layer for upload tracking.
 * Handles database queries for upload ownership verification.
 */

import { db } from "@/lib/db";
import { uploads } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export interface UploadRecord {
  id: string;
  userId: string;
  url: string;
  publicId: string;
  resourceType: "image" | "raw";
  folder: string | null;
  createdAt: Date;
}

/**
 * Create upload record
 */
export async function createUploadRecord(input: {
  userId: string;
  url: string;
  publicId: string;
  resourceType: "image" | "raw";
  folder?: string;
}): Promise<UploadRecord> {
  const [record] = await db
    .insert(uploads)
    .values({
      userId: input.userId,
      url: input.url,
      publicId: input.publicId,
      resourceType: input.resourceType,
      folder: input.folder || null,
    })
    .returning();

  return {
    id: record.id,
    userId: record.userId,
    url: record.url,
    publicId: record.publicId,
    resourceType: record.resourceType as "image" | "raw",
    folder: record.folder,
    createdAt: record.createdAt,
  };
}

/**
 * Find upload by URL and user ID (ownership verification)
 */
export async function findUploadByUrlAndUser(
  url: string,
  userId: string
): Promise<UploadRecord | null> {
  const result = await db
    .select()
    .from(uploads)
    .where(and(eq(uploads.url, url), eq(uploads.userId, userId)))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const record = result[0];
  return {
    id: record.id,
    userId: record.userId,
    url: record.url,
    publicId: record.publicId,
    resourceType: record.resourceType as "image" | "raw",
    folder: record.folder,
    createdAt: record.createdAt,
  };
}

/**
 * Find upload by public ID and user ID
 */
export async function findUploadByPublicIdAndUser(
  publicId: string,
  userId: string
): Promise<UploadRecord | null> {
  const result = await db
    .select()
    .from(uploads)
    .where(and(eq(uploads.publicId, publicId), eq(uploads.userId, userId)))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const record = result[0];
  return {
    id: record.id,
    userId: record.userId,
    url: record.url,
    publicId: record.publicId,
    resourceType: record.resourceType as "image" | "raw",
    folder: record.folder,
    createdAt: record.createdAt,
  };
}

/**
 * Delete upload record
 */
export async function deleteUploadRecord(id: string): Promise<void> {
  await db.delete(uploads).where(eq(uploads.id, id));
}

/**
 * Get all uploads for a user
 */
export async function getUploadsByUserId(userId: string): Promise<UploadRecord[]> {
  const results = await db
    .select()
    .from(uploads)
    .where(eq(uploads.userId, userId))
    .orderBy(desc(uploads.createdAt));

  return results.map((result) => ({
    id: result.id,
    userId: result.userId,
    url: result.url,
    publicId: result.publicId,
    resourceType: result.resourceType as "image" | "raw",
    folder: result.folder,
    createdAt: result.createdAt,
  }));
}
