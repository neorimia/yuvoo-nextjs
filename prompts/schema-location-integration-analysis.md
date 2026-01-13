━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
Analyze the database schema for `users` (parents), `clubs`, `doctors`, and `locations` tables to identify location-related columns and update the parent, club, and doctor schemas with new columns that properly reference the `locations` table.

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

- **Schema File**: `src/lib/db/schema.ts`
- **Locations Table**: Single source of truth for Romanian counties, cities, and sectors
  - Structure: `id`, `name`, `type` (county|city|sector), `parentId`, `code`, `isActive`, `createdAt`, `updatedAt`
  - Hierarchical: Counties → Cities → Sectors (Bucharest only)
  - Self-referential: `parentId` references `locations.id`

- **Current State**:
  - **Clubs table**: Uses `city` (text), `district` (text), `address` (text), `latitude`, `longitude`
  - **Doctors table**: Uses `city` (text), `district` (text), `address` (text)
  - **Users table (parents)**: No location fields currently

- **Goal**: Replace text-based location fields with foreign key references to `locations` table for:
  - Data integrity (enforce valid locations)
  - Consistency (standardized location names)
  - Query performance (indexed foreign keys)
  - Maintainability (single source of truth)

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

- **Analysis Only**: This is an analysis task - do NOT modify code yet
- **Backward Compatibility**: Consider migration strategy for existing data
- **Index Updates**: Identify which indexes need to be updated/added
- **Foreign Key Constraints**: Specify proper foreign key relationships
- **Nullability**: Determine which location fields should be nullable vs required
- **Address Field**: Keep `address` as text (street address), but link city/district to locations table
- **Coordinates**: Keep `latitude`/`longitude` for clubs (geolocation), but link to locations table
- **Scope**: Only analyze parent, club, and doctor schemas - do NOT modify other tables

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
JSON schema:
{
"summary": string (max 300 words describing the analysis and recommendations),
"locationsTableStructure": {
"columns": array of {
"name": string,
"type": string,
"description": string,
"nullable": boolean
},
"relationships": {
"hierarchy": string (description of parent-child relationships),
"types": array of string (county, city, sector)
}
},
"currentState": {
"clubs": {
"locationFields": array of {
"name": string,
"type": string,
"nullable": boolean,
"indexed": boolean,
"description": string
},
"issues": array of string (max 5 issues)
},
"doctors": {
"locationFields": array of {
"name": string,
"type": string,
"nullable": boolean,
"indexed": boolean,
"description": string
},
"issues": array of string (max 5 issues)
},
"users": {
"locationFields": array of string | null (empty array if none),
"issues": array of string | null (empty array if none)
}
},
"recommendations": {
"clubs": {
"newColumns": array of {
"name": string,
"type": string,
"nullable": boolean,
"default": string | null,
"foreignKey": {
"table": string,
"column": string,
"onDelete": "cascade" | "restrict" | "set null" | null
} | null,
"description": string,
"replaces": string | null (which existing column this replaces)
},
"columnsToKeep": array of string (columns to keep as-is),
"columnsToDeprecate": array of {
"name": string,
"reason": string,
"migrationStrategy": string
},
"indexesToAdd": array of {
"name": string,
"columns": array of string,
"description": string
},
"indexesToUpdate": array of {
"oldName": string,
"newName": string | null,
"oldColumns": array of string,
"newColumns": array of string,
"description": string
},
"indexesToRemove": array of {
"name": string,
"reason": string
}
},
"doctors": {
"newColumns": array of {
"name": string,
"type": string,
"nullable": boolean,
"default": string | null,
"foreignKey": {
"table": string,
"column": string,
"onDelete": "cascade" | "restrict" | "set null" | null
} | null,
"description": string,
"replaces": string | null
},
"columnsToKeep": array of string,
"columnsToDeprecate": array of {
"name": string,
"reason": string,
"migrationStrategy": string
},
"indexesToAdd": array of {
"name": string,
"columns": array of string,
"description": string
},
"indexesToUpdate": array of {
"oldName": string,
"newName": string | null,
"oldColumns": array of string,
"newColumns": array of string,
"description": string
},
"indexesToRemove": array of {
"name": string,
"reason": string
}
},
"users": {
"newColumns": array of {
"name": string,
"type": string,
"nullable": boolean,
"default": string | null,
"foreignKey": {
"table": string,
"column": string,
"onDelete": "cascade" | "restrict" | "set null" | null
} | null,
"description": string,
"replaces": string | null
} | null (empty array if no columns needed),
"columnsToKeep": array of string | null,
"columnsToDeprecate": array of string | null,
"indexesToAdd": array of {
"name": string,
"columns": array of string,
"description": string
} | null,
"indexesToUpdate": array of string | null,
"indexesToRemove": array of string | null
}
},
"migrationStrategy": {
"phases": array of {
"phase": number,
"name": string,
"description": string,
"steps": array of {
"step": number,
"action": string,
"description": string,
"sqlExample": string | null,
"drizzleExample": string | null
},
"rollbackPlan": string | null
},
"dataMigration": {
"clubs": {
"strategy": string,
"sqlExample": string | null,
"challenges": array of string | null
},
"doctors": {
"strategy": string,
"sqlExample": string | null,
"challenges": array of string | null
},
"users": {
"strategy": string | null,
"sqlExample": string | null,
"challenges": array of string | null
}
},
"backwardCompatibility": {
"approach": string,
"duration": string,
"cleanupPlan": string
}
},
"implementationNotes": {
"drizzleOrmPatterns": array of string (specific Drizzle ORM patterns to use),
"validationConsiderations": array of string (Zod validation updates needed),
"queryImpact": array of string (how existing queries will be affected),
"componentImpact": array of string (which components need updates)
}
}

Rules:

- Use null for missing optional fields (never omit fields)
- All arrays must be present (empty array [] if no items)
- All string fields must be non-empty or null
- Be specific about column types (e.g., "text", "integer", "timestamp")
- Include Drizzle ORM syntax examples where relevant
- Consider Romanian location naming conventions

━━━━━━━━━━━━━━━━━━━━
ANALYSIS REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━

1. **Location Hierarchy Understanding**:
   - Counties are top-level (parentId = null)
   - Cities belong to counties (parentId = county.id)
   - Sectors belong to cities (parentId = city.id, only for Bucharest)
   - Determine which location type each entity needs (city, sector, or both)

2. **Column Mapping**:
   - Map existing `city` text fields to `cityId` foreign key
   - Map existing `district` text fields to `sectorId` foreign key (if applicable)
   - Determine if `countyId` is needed (for filtering/searching)
   - Keep `address` as text (street address details)

3. **Index Strategy**:
   - Replace text-based indexes with foreign key indexes
   - Add composite indexes for common query patterns (e.g., sportType + cityId)
   - Consider performance implications of foreign key lookups

4. **Data Migration**:
   - Identify how to match existing text values to location IDs
   - Consider fuzzy matching for variations (e.g., "București" vs "Bucuresti")
   - Plan for unmatched locations (create new or mark for review)

5. **Backward Compatibility**:
   - Keep old columns temporarily with deprecation markers
   - Create migration script to populate new columns from old
   - Plan removal timeline for deprecated columns

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━
Example new column structure for clubs:

```typescript
// New columns to add
cityId: text("city_id").references(() => locations.id), // Foreign key to locations (type='city')
sectorId: text("sector_id").references(() => locations.id), // Foreign key to locations (type='sector', optional)
countyId: text("county_id").references(() => locations.id), // Denormalized for performance (type='county')
address: text("address"), // Keep as text (street address)
latitude: text("latitude"), // Keep for geolocation
longitude: text("longitude"), // Keep for geolocation

// Old columns to deprecate (keep temporarily)
city: text("city"), // DEPRECATED - use cityId
district: text("district"), // DEPRECATED - use sectorId
```

Example index update:

```typescript
// Old index
cityIdx: index("idx_clubs_city").on(table.city),

// New indexes
cityIdIdx: index("idx_clubs_city_id").on(table.cityId),
sectorIdIdx: index("idx_clubs_sector_id").on(table.sectorId),
sportCityIdx: index("idx_clubs_sport_city").on(table.sportType, table.cityId), // Updated composite
```

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━

- This is an ANALYSIS prompt only - do NOT modify code
- Focus on providing comprehensive analysis and recommendations
- Include specific Drizzle ORM syntax examples
- Consider all edge cases (Bucharest sectors, county-level filtering, etc.)
- Provide clear migration path with SQL and Drizzle examples
- Identify all impacted components and queries

━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━

- The `locations` table is already seeded with Romanian counties, cities, and sectors
- Bucharest has special handling (county + city + 6 sectors)
- Consider query performance: denormalizing `countyId` may be beneficial for filtering
- Address field should remain as free text for street addresses
- Coordinates (latitude/longitude) are specific to clubs, not needed for doctors/users
- All location names in the locations table are in Romanian
