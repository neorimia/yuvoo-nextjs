/**
 * Children Service
 *
 * Business logic for child profile management.
 * Handles CRUD operations for child profiles linked to parents.
 */

import { childrenRepository } from "./children.repository";
import type { Child, CreateChildInput, UpdateChildInput } from "./children.types";

/**
 * Get all children for current parent
 */
export async function getChildrenByParentId(parentId: string): Promise<Child[]> {
  return childrenRepository.findByParentId(parentId);
}

/**
 * Get child by ID (with parent verification)
 */
export async function getChildById(childId: string, parentId: string): Promise<Child | null> {
  const child = await childrenRepository.findById(childId);
  if (!child || child.parentId !== parentId) {
    return null;
  }
  return child;
}

/**
 * Create new child profile
 */
export async function createChild(input: CreateChildInput): Promise<Child> {
  // TODO: Add validation
  return childrenRepository.create(input);
}

/**
 * Update child profile
 */
export async function updateChild(
  childId: string,
  parentId: string,
  input: UpdateChildInput
): Promise<Child> {
  // Verify ownership
  const child = await getChildById(childId, parentId);
  if (!child) {
    throw new Error("Child not found or access denied");
  }

  return childrenRepository.update(childId, input);
}

/**
 * Delete child profile
 */
export async function deleteChild(childId: string, parentId: string): Promise<void> {
  // Verify ownership
  const child = await getChildById(childId, parentId);
  if (!child) {
    throw new Error("Child not found or access denied");
  }

  await childrenRepository.delete(childId);
}
