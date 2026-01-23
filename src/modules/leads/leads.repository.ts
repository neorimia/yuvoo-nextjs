/**
 * Leads Repository
 *
 * Data access layer for leads.
 * Handles database queries for lead data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq, and, lt, desc, sql } from "drizzle-orm";
import type { Lead, CreateLeadInput, LeadStatus } from "@/types/leads";

/**
 * Map database lead record to Lead type
 */
function mapDbLeadToLead(dbLead: typeof leads.$inferSelect): Lead {
  return {
    id: dbLead.id,
    clubId: dbLead.clubId,
    parentId: dbLead.parentId || null,
    parentName: dbLead.parentName,
    parentEmail: dbLead.parentEmail,
    parentPhone: dbLead.parentPhone || null,
    childAge: dbLead.childAge,
    message: dbLead.message || null,
    sportType: dbLead.sportType || null,
    locationId: dbLead.locationId || null,
    status: dbLead.status as LeadStatus,
    createdAt: dbLead.createdAt,
    expiresAt: dbLead.expiresAt,
    acceptedAt: dbLead.acceptedAt || null,
    paymentId: dbLead.paymentId || null,
    paymentMethod: (dbLead.paymentMethod as Lead["paymentMethod"]) || null,
    createdBy: dbLead.createdBy || null,
  };
}

/**
 * Create new lead
 */
export async function create(input: CreateLeadInput & { expiresAt: Date }): Promise<Lead> {
  const leadId = crypto.randomUUID();

  const [dbLead] = await db
    .insert(leads)
    .values({
      id: leadId,
      clubId: input.clubId,
      parentId: input.parentId || null,
      parentName: input.parentName,
      parentEmail: input.parentEmail,
      parentPhone: input.parentPhone || null,
      childAge: input.childAge,
      message: input.message || null,
      sportType: input.sportType || null,
      locationId: input.locationId || null,
      status: "nou",
      expiresAt: input.expiresAt,
      createdBy: input.ipAddress || null,
    })
    .returning();

  return mapDbLeadToLead(dbLead);
}

/**
 * Find lead by ID
 */
export async function findById(leadId: string): Promise<Lead | null> {
  const dbLead = await db.query.leads.findFirst({
    where: eq(leads.id, leadId),
  });

  if (!dbLead) {
    return null;
  }

  return mapDbLeadToLead(dbLead);
}

/**
 * Find leads by club ID
 * Supports filtering by status and pagination
 */
export async function findByClubId(
  clubId: string,
  options?: {
    status?: LeadStatus;
    limit?: number;
    offset?: number;
  }
): Promise<Lead[]> {
  const conditions = [eq(leads.clubId, clubId)];

  if (options?.status) {
    conditions.push(eq(leads.status, options.status));
  }

  const dbLeads = await db.query.leads.findMany({
    where: and(...conditions),
    orderBy: [desc(leads.createdAt)],
    limit: options?.limit,
    offset: options?.offset,
  });

  return dbLeads.map(mapDbLeadToLead);
}

/**
 * Count leads by club ID
 */
export async function countByClubId(clubId: string, status?: LeadStatus): Promise<number> {
  const conditions = [eq(leads.clubId, clubId)];

  if (status) {
    conditions.push(eq(leads.status, status));
  }

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads)
    .where(and(...conditions));

  return Number(result[0]?.count || 0);
}

/**
 * Update lead status
 */
export async function updateStatus(leadId: string, status: LeadStatus): Promise<Lead> {
  const updateData: Partial<typeof leads.$inferInsert> = {
    status,
  };

  // If accepting, set acceptedAt
  if (status === "acceptat") {
    updateData.acceptedAt = new Date();
  }

  const [dbLead] = await db.update(leads).set(updateData).where(eq(leads.id, leadId)).returning();

  if (!dbLead) {
    throw new Error("Lead not found");
  }

  return mapDbLeadToLead(dbLead);
}

/**
 * Accept lead (mark as accepted with payment info)
 */
export async function acceptLead(
  leadId: string,
  paymentId: string,
  paymentMethod: Lead["paymentMethod"]
): Promise<Lead> {
  const [dbLead] = await db
    .update(leads)
    .set({
      status: "acceptat",
      acceptedAt: new Date(),
      paymentId,
      paymentMethod,
    })
    .where(eq(leads.id, leadId))
    .returning();

  if (!dbLead) {
    throw new Error("Lead not found");
  }

  return mapDbLeadToLead(dbLead);
}

/**
 * Get expired leads (for cleanup job)
 * Finds leads where expiresAt < now AND status is 'nou' or 'in_asteptare'
 */
export async function findExpiredLeads(): Promise<Lead[]> {
  const now = new Date();

  const dbLeads = await db.query.leads.findMany({
    where: and(lt(leads.expiresAt, now), sql`${leads.status} IN ('nou', 'in_asteptare')`),
  });

  return dbLeads.map(mapDbLeadToLead);
}

/**
 * Get leads needing reminder (created 48h ago, status = 'nou')
 * Uses SQL to calculate 48 hours ago
 */
export async function findLeadsNeedingReminder(): Promise<Lead[]> {
  const fortyEightHoursAgo = new Date();
  fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

  const dbLeads = await db.query.leads.findMany({
    where: and(eq(leads.status, "nou"), sql`${leads.createdAt} <= ${fortyEightHoursAgo}`),
  });

  return dbLeads.map(mapDbLeadToLead);
}

/**
 * Find leads by parent email
 */
export async function findByParentEmail(parentEmail: string): Promise<Lead[]> {
  const dbLeads = await db.query.leads.findMany({
    where: eq(leads.parentEmail, parentEmail),
    orderBy: [desc(leads.createdAt)],
  });

  return dbLeads.map(mapDbLeadToLead);
}

export const leadsRepository = {
  create,
  findById,
  findByClubId,
  countByClubId,
  updateStatus,
  acceptLead,
  findExpiredLeads,
  findLeadsNeedingReminder,
  findByParentEmail,
};
