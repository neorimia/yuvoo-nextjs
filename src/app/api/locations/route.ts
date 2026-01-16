/**
 * Locations API Endpoint
 *
 * Fetches locations from the database for use in dropdowns and filters.
 * Supports filtering by type (city, sector, county) and parent ID.
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { locations } from "@/lib/db/schema";
import { eq, and, asc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "city" | "sector" | "county"
    const parentId = searchParams.get("parentId"); // For sectors (cityId) or cities (countyId)

    // Build where conditions
    const whereConditions = [];
    if (type) {
      whereConditions.push(eq(locations.type, type as "city" | "sector" | "county"));
    }
    if (parentId) {
      whereConditions.push(eq(locations.parentId, parentId));
    }
    // Only return active locations
    whereConditions.push(eq(locations.isActive, true));

    // Fetch locations
    const results = await db.query.locations.findMany({
      where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
      columns: { id: true, name: true, type: true },
      orderBy: [asc(locations.name)],
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ error: "Eroare la încărcarea locațiilor" }, { status: 500 });
  }
}
