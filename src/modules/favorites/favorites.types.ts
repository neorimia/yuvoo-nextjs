/**
 * Favorites Types
 *
 * TypeScript types for favorites domain.
 */

export interface Favorite {
  id: string;
  userId: string;
  entityId: string; // Club ID or Doctor ID
  entityType: "club" | "doctor";
  createdAt: Date;
}

export interface CreateFavoriteInput {
  userId: string;
  entityId: string;
  entityType: "club" | "doctor";
}
