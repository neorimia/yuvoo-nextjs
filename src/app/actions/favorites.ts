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
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

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

    // Track favorite event
    try {
      const eventName =
        validatedInput.entityType === "club"
          ? PostHogEvents.CLUB_FAVORITED
          : PostHogEvents.DOCTOR_FAVORITED;
      await trackEventServer(eventName, {
        distinctId: user.id,
        ...(validatedInput.entityType === "club"
          ? { [PostHogProperties.CLUB_ID]: validatedInput.entityId }
          : { [PostHogProperties.DOCTOR_ID]: validatedInput.entityId }),
      });
    } catch (trackingError) {
      // Don't fail if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking favorite:", trackingError);
      }
    }

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

    // Get favorite before removing to check entity type
    const { favoritesRepository } = await import("@/modules/favorites/favorites.repository");
    const favorite = await favoritesRepository.findById(favoriteId);
    if (!favorite || favorite.userId !== user.id) {
      return {
        success: false,
        error: "Favorite-ul nu a fost găsit sau nu îți aparține.",
      };
    }

    await removeFavorite(favoriteId, user.id);

    // Track unfavorite event
    try {
      const eventName =
        favorite.entityType === "club"
          ? PostHogEvents.CLUB_UNFAVORITED
          : PostHogEvents.DOCTOR_UNFAVORITED;
      await trackEventServer(eventName, {
        distinctId: user.id,
        ...(favorite.entityType === "club"
          ? { [PostHogProperties.CLUB_ID]: favorite.entityId }
          : { [PostHogProperties.DOCTOR_ID]: favorite.entityId }),
      });
    } catch (trackingError) {
      // Don't fail if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking unfavorite:", trackingError);
      }
    }

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
