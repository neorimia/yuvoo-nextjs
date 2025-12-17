/**
 * Favorites Server Actions
 *
 * Server Actions for saved clubs and doctors.
 */

"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/modules/auth/auth.service";
import {
  getFavoritesByUserId,
  addFavorite,
  removeFavorite,
  isFavorited,
} from "@/modules/favorites/favorites.service";
import { addFavoriteSchema } from "@/lib/validations/favorite";
import type { Favorite } from "@/modules/favorites/favorites.types";

/**
 * Get all favorites for current user
 */
export async function getFavoritesAction(): Promise<Favorite[]> {
  try {
    const user = await requireAuth();
    return await getFavoritesByUserId(user.id);
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
}

/**
 * Add favorite
 */
export async function addFavoriteAction(
  input: unknown
): Promise<{ success: boolean; favorite?: Favorite; error?: string }> {
  try {
    const user = await requireAuth();

    // Validate input with Zod schema
    const validatedInput = addFavoriteSchema.parse(input);

    const favorite = await addFavorite({
      ...validatedInput,
      userId: user.id,
    });

    revalidatePath("/favorites");

    return { success: true, favorite };
  } catch (error) {
    console.error("Error adding favorite:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la adăugarea la favorite",
    };
  }
}

/**
 * Remove favorite
 */
export async function removeFavoriteAction(
  favoriteId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    await removeFavorite(favoriteId, user.id);

    revalidatePath("/favorites");

    return { success: true };
  } catch (error) {
    console.error("Error removing favorite:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la eliminarea din favorite",
    };
  }
}

/**
 * Check if entity is favorited
 */
export async function isFavoritedAction(
  entityId: string,
  entityType: "club" | "doctor"
): Promise<boolean> {
  try {
    const user = await requireAuth();
    return await isFavorited(user.id, entityId, entityType);
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
}
