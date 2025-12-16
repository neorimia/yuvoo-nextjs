/**
 * Favorite Validation Schemas
 *
 * Zod schemas for favorite-related validation.
 */

import { z } from "zod";

/**
 * Add favorite input schema
 */
export const addFavoriteSchema = z.object({
  entityId: z.string().min(1, "ID-ul entității este obligatoriu"),
  entityType: z.enum(["club", "doctor"], {
    errorMap: () => ({ message: "Tipul entității trebuie să fie 'club' sau 'doctor'" }),
  }),
});

export type AddFavoriteInput = z.infer<typeof addFavoriteSchema>;
