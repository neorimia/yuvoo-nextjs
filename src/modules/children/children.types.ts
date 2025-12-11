/**
 * Children Types
 *
 * TypeScript types for child profile domain.
 */

export interface Child {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  age: number; // Calculated from dateOfBirth
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateChildInput {
  parentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
}

export interface UpdateChildInput {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";
}
