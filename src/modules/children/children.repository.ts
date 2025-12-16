/**
 * Children Repository
 *
 * Data access layer for child profiles.
 * Handles database queries for child data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { children } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Child, CreateChildInput, UpdateChildInput } from "./children.types";

/**
 * Calculate age from date of birth
 */
function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Map database child record to Child type
 */
function mapDbChildToChild(dbChild: typeof children.$inferSelect): Child {
  return {
    id: dbChild.id,
    parentId: dbChild.parentId,
    firstName: dbChild.firstName,
    lastName: dbChild.lastName,
    dateOfBirth: dbChild.dateOfBirth,
    gender: (dbChild.gender as "male" | "female" | "other") || "other",
    age: calculateAge(dbChild.dateOfBirth),
    createdAt: dbChild.createdAt,
    updatedAt: dbChild.updatedAt,
  };
}

/**
 * Find children by parent ID
 */
export async function findByParentId(parentId: string): Promise<Child[]> {
  const dbChildren = await db.query.children.findMany({
    where: eq(children.parentId, parentId),
    orderBy: (children, { asc }) => [asc(children.createdAt)],
  });

  return dbChildren.map(mapDbChildToChild);
}

/**
 * Find child by ID
 */
export async function findById(childId: string): Promise<Child | null> {
  const dbChild = await db.query.children.findFirst({
    where: eq(children.id, childId),
  });

  if (!dbChild) {
    return null;
  }

  return mapDbChildToChild(dbChild);
}

/**
 * Create new child
 */
export async function create(input: CreateChildInput): Promise<Child> {
  const childId = crypto.randomUUID();

  const [dbChild] = await db
    .insert(children)
    .values({
      id: childId,
      parentId: input.parentId,
      firstName: input.firstName,
      lastName: input.lastName,
      dateOfBirth: input.dateOfBirth,
      gender: input.gender || null,
    })
    .returning();

  return mapDbChildToChild(dbChild);
}

/**
 * Update child
 */
export async function update(childId: string, input: UpdateChildInput): Promise<Child> {
  const updateData: Partial<typeof children.$inferInsert> = {
    updatedAt: new Date(),
  };

  if (input.firstName !== undefined) {
    updateData.firstName = input.firstName;
  }
  if (input.lastName !== undefined) {
    updateData.lastName = input.lastName;
  }
  if (input.dateOfBirth !== undefined) {
    updateData.dateOfBirth = input.dateOfBirth;
  }
  if (input.gender !== undefined) {
    updateData.gender = input.gender;
  }

  const [dbChild] = await db
    .update(children)
    .set(updateData)
    .where(eq(children.id, childId))
    .returning();

  if (!dbChild) {
    throw new Error("Child not found");
  }

  return mapDbChildToChild(dbChild);
}

/**
 * Delete child
 */
export async function deleteChild(childId: string): Promise<void> {
  await db.delete(children).where(eq(children.id, childId));
}

export const childrenRepository = {
  findByParentId,
  findById,
  create,
  update,
  delete: deleteChild,
};
