/**
 * Favorites Service
 *
 * Business logic for saved clubs and doctors.
 * Handles adding and removing favorites.
 */

import { favoritesRepository } from "./favorites.repository";
import type { Favorite, CreateFavoriteInput } from "./favorites.types";

/**
 * Get favorites for user
 */
export async function getFavoritesByUserId(userId: string): Promise<Favorite[]> {
  return favoritesRepository.findByUserId(userId);
}

/**
 * Add favorite
 */
export async function addFavorite(input: CreateFavoriteInput): Promise<Favorite> {
  // Check if already favorited
  const existing = await favoritesRepository.findByUserAndEntity(
    input.userId,
    input.entityId,
    input.entityType
  );

  if (existing) {
    return existing;
  }

  return favoritesRepository.create(input);
}

/**
 * Remove favorite
 */
export async function removeFavorite(favoriteId: string, userId: string): Promise<void> {
  const favorite = await favoritesRepository.findById(favoriteId);
  if (!favorite || favorite.userId !== userId) {
    throw new Error("Favorite not found or access denied");
  }

  await favoritesRepository.delete(favoriteId);
}

/**
 * Check if entity is favorited
 */
export async function isFavorited(
  userId: string,
  entityId: string,
  entityType: "club" | "doctor"
): Promise<boolean> {
  const favorite = await favoritesRepository.findByUserAndEntity(userId, entityId, entityType);
  return !!favorite;
}
