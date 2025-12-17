/**
 * Favorites Repository
 *
 * Data access layer for favorites.
 * Handles database queries for favorite data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { favorites } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type { Favorite, CreateFavoriteInput } from "./favorites.types";

/**
 * Map database favorite record to Favorite type
 */
function mapDbFavoriteToFavorite(dbFavorite: typeof favorites.$inferSelect): Favorite {
  // Determine entityId and entityType from clubId or doctorId
  const entityId = dbFavorite.clubId || dbFavorite.doctorId;
  const entityType: "club" | "doctor" = dbFavorite.clubId ? "club" : "doctor";

  if (!entityId) {
    throw new Error(
      `Invalid favorite data: Favorite ${dbFavorite.id} must have either clubId or doctorId`
    );
  }

  return {
    id: dbFavorite.id,
    userId: dbFavorite.userId,
    entityId,
    entityType,
    createdAt: dbFavorite.createdAt,
  };
}

/**
 * Find favorites by user ID
 */
export async function findByUserId(userId: string): Promise<Favorite[]> {
  const dbFavorites = await db.query.favorites.findMany({
    where: eq(favorites.userId, userId),
    orderBy: (favorites, { desc }) => [desc(favorites.createdAt)],
  });

  return dbFavorites.map(mapDbFavoriteToFavorite);
}

/**
 * Find favorite by user and entity
 */
export async function findByUserAndEntity(
  userId: string,
  entityId: string,
  entityType: "club" | "doctor"
): Promise<Favorite | null> {
  const conditions = [eq(favorites.userId, userId)];

  if (entityType === "club") {
    conditions.push(eq(favorites.clubId, entityId));
  } else {
    conditions.push(eq(favorites.doctorId, entityId));
  }

  const dbFavorite = await db.query.favorites.findFirst({
    where: and(...conditions),
  });

  if (!dbFavorite) {
    return null;
  }

  return mapDbFavoriteToFavorite(dbFavorite);
}

/**
 * Find favorite by ID
 */
export async function findById(favoriteId: string): Promise<Favorite | null> {
  const dbFavorite = await db.query.favorites.findFirst({
    where: eq(favorites.id, favoriteId),
  });

  if (!dbFavorite) {
    return null;
  }

  return mapDbFavoriteToFavorite(dbFavorite);
}

/**
 * Create favorite
 */
export async function create(input: CreateFavoriteInput): Promise<Favorite> {
  const favoriteId = crypto.randomUUID();

  // Determine clubId or doctorId based on entityType
  const clubId = input.entityType === "club" ? input.entityId : null;
  const doctorId = input.entityType === "doctor" ? input.entityId : null;

  const [dbFavorite] = await db
    .insert(favorites)
    .values({
      id: favoriteId,
      userId: input.userId,
      clubId,
      doctorId,
    })
    .returning();

  return mapDbFavoriteToFavorite(dbFavorite);
}

/**
 * Delete favorite
 */
export async function deleteFavorite(favoriteId: string): Promise<void> {
  await db.delete(favorites).where(eq(favorites.id, favoriteId));
}

/**
 * Find all favorites (for admin use)
 */
export async function findAll(): Promise<Favorite[]> {
  const dbFavorites = await db.query.favorites.findMany({
    orderBy: (favorites, { desc }) => [desc(favorites.createdAt)],
  });

  return dbFavorites.map(mapDbFavoriteToFavorite);
}

export const favoritesRepository = {
  findByUserId,
  findByUserAndEntity,
  findById,
  create,
  delete: deleteFavorite,
  findAll,
};
