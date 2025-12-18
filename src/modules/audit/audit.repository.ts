/**
 * Audit Logs Repository
 *
 * Data access layer for audit logging.
 * Handles database queries for audit log records using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: "club" | "doctor";
  entityId: string;
  oldValue: unknown;
  newValue: unknown;
  metadata: unknown;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

export interface CreateAuditLogInput {
  userId: string;
  action: string;
  entityType: "club" | "doctor";
  entityId: string;
  oldValue?: unknown;
  newValue?: unknown;
  metadata?: unknown;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Create audit log entry
 */
export async function createAuditLog(input: CreateAuditLogInput): Promise<AuditLog> {
  const [log] = await db
    .insert(auditLogs)
    .values({
      userId: input.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      oldValue: input.oldValue ? (input.oldValue as never) : null,
      newValue: input.newValue ? (input.newValue as never) : null,
      metadata: input.metadata ? (input.metadata as never) : null,
      ipAddress: input.ipAddress || null,
      userAgent: input.userAgent || null,
    })
    .returning();

  return {
    id: log.id,
    userId: log.userId,
    action: log.action,
    entityType: log.entityType as "club" | "doctor",
    entityId: log.entityId,
    oldValue: log.oldValue,
    newValue: log.newValue,
    metadata: log.metadata,
    ipAddress: log.ipAddress,
    userAgent: log.userAgent,
    createdAt: log.createdAt,
  };
}

/**
 * Get audit logs for a specific entity
 */
export async function getAuditLogsByEntity(
  entityType: "club" | "doctor",
  entityId: string,
  limit: number = 50
): Promise<AuditLog[]> {
  const logs = await db.query.auditLogs.findMany({
    where: and(eq(auditLogs.entityType, entityType), eq(auditLogs.entityId, entityId)),
    orderBy: [desc(auditLogs.createdAt)],
    limit,
  });

  return logs.map((log) => ({
    id: log.id,
    userId: log.userId,
    action: log.action,
    entityType: log.entityType as "club" | "doctor",
    entityId: log.entityId,
    oldValue: log.oldValue,
    newValue: log.newValue,
    metadata: log.metadata,
    ipAddress: log.ipAddress,
    userAgent: log.userAgent,
    createdAt: log.createdAt,
  }));
}

/**
 * Get audit logs for a specific user (admin)
 */
export async function getAuditLogsByUser(userId: string, limit: number = 100): Promise<AuditLog[]> {
  const logs = await db.query.auditLogs.findMany({
    where: eq(auditLogs.userId, userId),
    orderBy: [desc(auditLogs.createdAt)],
    limit,
  });

  return logs.map((log) => ({
    id: log.id,
    userId: log.userId,
    action: log.action,
    entityType: log.entityType as "club" | "doctor",
    entityId: log.entityId,
    oldValue: log.oldValue,
    newValue: log.newValue,
    metadata: log.metadata,
    ipAddress: log.ipAddress,
    userAgent: log.userAgent,
    createdAt: log.createdAt,
  }));
}

/**
 * Get audit logs by action type
 */
export async function getAuditLogsByAction(
  action: string,
  limit: number = 100
): Promise<AuditLog[]> {
  const logs = await db.query.auditLogs.findMany({
    where: eq(auditLogs.action, action),
    orderBy: [desc(auditLogs.createdAt)],
    limit,
  });

  return logs.map((log) => ({
    id: log.id,
    userId: log.userId,
    action: log.action,
    entityType: log.entityType as "club" | "doctor",
    entityId: log.entityId,
    oldValue: log.oldValue,
    newValue: log.newValue,
    metadata: log.metadata,
    ipAddress: log.ipAddress,
    userAgent: log.userAgent,
    createdAt: log.createdAt,
  }));
}

export const auditRepository = {
  createAuditLog,
  getAuditLogsByEntity,
  getAuditLogsByUser,
  getAuditLogsByAction,
};
