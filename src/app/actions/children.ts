/**
 * Children Server Actions
 *
 * Server Actions for child profile management.
 */

"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/modules/auth/auth.service";
import {
  getChildrenByParentId,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
} from "@/modules/children/children.service";
import type { Child, CreateChildInput, UpdateChildInput } from "@/modules/children/children.types";

/**
 * Get all children for current parent
 */
export async function getChildrenAction(): Promise<Child[]> {
  try {
    const user = await requireAuth();
    return await getChildrenByParentId(user.id);
  } catch (error) {
    console.error("Error getting children:", error);
    return [];
  }
}

/**
 * Get child by ID
 */
export async function getChildAction(childId: string): Promise<Child | null> {
  try {
    const user = await requireAuth();
    return await getChildById(childId, user.id);
  } catch (error) {
    console.error("Error getting child:", error);
    return null;
  }
}

/**
 * Create new child profile
 */
export async function createChildAction(
  input: CreateChildInput
): Promise<{ success: boolean; child?: Child; error?: string }> {
  try {
    const user = await requireAuth();

    // TODO: Validate input with Zod schema

    const child = await createChild({
      ...input,
      parentId: user.id,
    });

    revalidatePath("/children");

    return { success: true, child };
  } catch (error) {
    console.error("Error creating child:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la crearea profilului copilului",
    };
  }
}

/**
 * Update child profile
 */
export async function updateChildAction(
  childId: string,
  input: UpdateChildInput
): Promise<{ success: boolean; child?: Child; error?: string }> {
  try {
    const user = await requireAuth();

    // TODO: Validate input with Zod schema

    const child = await updateChild(childId, user.id, input);

    revalidatePath("/children");
    revalidatePath(`/children/${childId}`);

    return { success: true, child };
  } catch (error) {
    console.error("Error updating child:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la actualizarea profilului copilului",
    };
  }
}

/**
 * Delete child profile
 */
export async function deleteChildAction(
  childId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    await deleteChild(childId, user.id);

    revalidatePath("/children");

    return { success: true };
  } catch (error) {
    console.error("Error deleting child:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la ștergerea profilului copilului",
    };
  }
}
