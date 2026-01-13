# Romania Locations Table Implementation

**Created**: January 2025  
**Based on**: Need for single source of truth for Romanian cities and counties  
**Following**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)  
**Status**: Ready for Implementation

---

## TASK RESTATEMENT

**Task**: Create a new database table `locations` that serves as a single point of truth for all cities and counties in Romania. This table will be used across the application for location-based features (clubs, doctors, quiz recommendations, etc.).

**Scope**:

- Database schema definition for `locations` table
- Drizzle ORM schema implementation
- Migration file generation
- Data seeding with all Romanian counties and major cities
- Integration points identification (clubs, doctors, quizzes tables)

**Constraints**:

- Use Drizzle ORM with PostgreSQL (Neon serverless)
- Follow existing schema patterns from `src/lib/db/schema.ts`
- All location names MUST be in Romanian (official names)
- Table must support hierarchical structure (county → city)
- Must include proper indexes for performance
- Must support both counties (județe) and cities (municipii/orașe)
- Consider Bucharest special case (municipiu + sectors)
- Data must be accurate and complete (all 41 counties + Bucharest + major cities)

**Output Format**: Complete implementation with:

- Drizzle schema definition
- Migration file
- Seeding script with Romanian location data
- Integration guide for existing tables

---

## CONTEXT

### Current State

**Existing Location Fields**:

- `clubs` table: `city` (text), `district` (text), `address` (text)
- `doctors` table: `city` (text), `district` (text), `address` (text)
- `quizzes` table: `location` (text) - used for local club recommendations

**Current Issues**:

- Location data is stored as free-form text fields
- No validation or standardization
- No relationship between cities and counties
- Inconsistent naming (e.g., "București" vs "Bucharest" vs "Bucuresti")
- No way to query "all clubs in a county" efficiently
- No support for filtering by location hierarchy

**Romania Location Structure**:

- 41 counties (județe) + Bucharest (municipiu)
- Bucharest has 6 sectors (Sector 1-6)
- Each county has a capital city (reședință de județ)
- Major cities (municipii) and smaller cities (orașe)
- Some cities span multiple counties (rare)

### Related Files

- `src/lib/db/schema.ts` - Main schema file (add locations table here)
- `drizzle.config.ts` - Drizzle configuration
- `src/modules/clubs/clubs.repository.ts` - Club queries (will need updates)
- `src/modules/doctors/doctors.repository.ts` - Doctor queries (will need updates)
- `src/modules/quiz/quiz.repository.ts` - Quiz queries (will need updates)

---

## CONSTRAINTS

### Database Constraints

- Use Drizzle ORM `pgTable` pattern (consistent with existing schema)
- Use `text` type for IDs (consistent with existing tables)
- Use proper PostgreSQL indexes for performance
- Support soft deletes (isActive flag) for future-proofing
- Include timestamps (createdAt, updatedAt) following existing pattern

### Data Constraints

- All location names in Romanian (official names)
- Include all 41 counties + Bucharest
- Include all county capitals (reședințe de județ)
- Include major cities (municipii) - at least top 50 by population
- Include Bucharest sectors (Sector 1-6)
- Use official Romanian spelling (e.g., "București", "Iași", "Cluj-Napoca")
- No duplicates or inconsistencies

### Integration Constraints

- Do NOT modify existing `clubs`, `doctors`, or `quizzes` tables in this phase
- Create foreign key relationships in future migration (not this one)
- Design table to support future migration of existing location data
- Maintain backward compatibility with existing location text fields

### Code Constraints

- Follow existing TypeScript patterns
- Use existing utility functions (e.g., `generateId()` if available)
- Include proper TypeScript types
- Add JSDoc comments for table and fields
- Follow existing index naming conventions

---

## OUTPUT FORMAT

### 1. Schema Definition

Add to `src/lib/db/schema.ts`:

```typescript
// Locations table definition
// Include: id, name, type (county/city/sector), parentId, code (county code), isActive, timestamps
// Include proper indexes: name, type, parentId, code
```

### 2. Migration File

Generate migration file:

- File: `drizzle/XXXX_romania_locations.sql`
- Include CREATE TABLE statement
- Include CREATE INDEX statements
- Include initial data INSERT statements (or reference seeding script)

### 3. Seeding Script

Create seeding script:

- File: `scripts/seed-locations.ts` or `src/lib/db/seed-locations.ts`
- Include all Romanian counties (41 + Bucharest)
- Include all county capitals
- Include major cities (top 50+ by population)
- Include Bucharest sectors
- Use official Romanian names
- Output: Array of location objects ready for insertion

### 4. Integration Guide

Document:

- How to query locations table
- How to join with clubs/doctors/quizzes tables
- Migration path for existing location data
- Example queries for common use cases

---

## IMPLEMENTATION PLAN

### Phase 1: Schema Design (1 hour)

**Goal**: Design the locations table structure

**Tasks**:

- [ ] Define table structure with proper fields
- [ ] Design hierarchical relationship (county → city → sector)
- [ ] Define indexes for common query patterns
- [ ] Add TypeScript types

**Fields to Include**:

- `id`: text (primary key)
- `name`: text (location name in Romanian)
- `type`: enum ("county" | "city" | "sector")
- `parentId`: text (reference to parent location, null for counties)
- `code`: text (county code, e.g., "B" for București, "AB" for Alba)
- `isActive`: boolean (for soft deletes)
- `createdAt`: timestamp
- `updatedAt`: timestamp

**Indexes**:

- Primary: `id`
- Unique: `name` + `type` + `parentId` (prevent duplicates)
- Performance: `type`, `parentId`, `code`

### Phase 2: Data Collection (2 hours)

**Goal**: Collect accurate Romanian location data

**Tasks**:

- [ ] List all 41 counties with official names
- [ ] List all county capitals (reședințe de județ)
- [ ] List major cities (municipii) - top 50+ by population
- [ ] List Bucharest sectors (Sector 1-6)
- [ ] Verify official Romanian spelling
- [ ] Include county codes (official abbreviations)

**Data Sources**:

- Official Romanian government sources
- INS (Institutul Național de Statistică) data
- Wikipedia (verify with official sources)

### Phase 3: Schema Implementation (1 hour)

**Goal**: Implement schema in codebase

**Tasks**:

- [ ] Add locations table to `src/lib/db/schema.ts`
- [ ] Add location type enum
- [ ] Add proper indexes
- [ ] Export location types
- [ ] Run `npm run db:generate` to create migration

### Phase 4: Seeding Script (2 hours)

**Goal**: Create seeding script with all location data

**Tasks**:

- [ ] Create seeding script file
- [ ] Structure data as TypeScript array
- [ ] Include all counties, cities, sectors
- [ ] Add data validation
- [ ] Test seeding locally

### Phase 5: Migration & Testing (1 hour)

**Goal**: Apply migration and verify

**Tasks**:

- [ ] Run migration: `npm run db:push` or `npm run db:migrate`
- [ ] Run seeding script
- [ ] Verify data in Drizzle Studio
- [ ] Test common queries
- [ ] Verify indexes are created

---

## ACCEPTANCE CRITERIA

### Functional Requirements

- ✅ Locations table created with all required fields
- ✅ All 41 counties + Bucharest included
- ✅ All county capitals included
- ✅ Top 50+ major cities included
- ✅ Bucharest sectors (1-6) included
- ✅ All names in official Romanian spelling
- ✅ Hierarchical relationships properly defined (parentId)
- ✅ Seeding script successfully populates all data

### Technical Requirements

- ✅ Schema follows existing Drizzle ORM patterns
- ✅ Proper indexes created for performance
- ✅ TypeScript types exported and usable
- ✅ Migration file generated successfully
- ✅ No breaking changes to existing tables
- ✅ Backward compatible with existing location fields

### Data Quality Requirements

- ✅ No duplicate locations
- ✅ All county codes accurate
- ✅ All parent-child relationships correct
- ✅ All names use official Romanian spelling
- ✅ Data is complete (no missing counties or capitals)

### Integration Readiness

- ✅ Table structure supports future foreign key relationships
- ✅ Query patterns documented
- ✅ Migration path for existing data documented
- ✅ Example queries provided

---

## EXAMPLE DATA STRUCTURE

```typescript
// Example location entries
[
  // Counties
  {
    id: "loc_county_bucuresti",
    name: "București",
    type: "county",
    parentId: null,
    code: "B",
    isActive: true,
  },
  {
    id: "loc_county_cluj",
    name: "Cluj",
    type: "county",
    parentId: null,
    code: "CJ",
    isActive: true,
  },
  {
    id: "loc_county_timis",
    name: "Timiș",
    type: "county",
    parentId: null,
    code: "TM",
    isActive: true,
  },

  // County Capitals
  {
    id: "loc_city_bucuresti",
    name: "București",
    type: "city",
    parentId: "loc_county_bucuresti",
    code: "B",
    isActive: true,
  },
  {
    id: "loc_city_cluj_napoca",
    name: "Cluj-Napoca",
    type: "city",
    parentId: "loc_county_cluj",
    code: "CJ",
    isActive: true,
  },
  {
    id: "loc_city_timisoara",
    name: "Timișoara",
    type: "city",
    parentId: "loc_county_timis",
    code: "TM",
    isActive: true,
  },

  // Bucharest Sectors
  {
    id: "loc_sector_1",
    name: "Sector 1",
    type: "sector",
    parentId: "loc_city_bucuresti",
    code: "B",
    isActive: true,
  },
  {
    id: "loc_sector_2",
    name: "Sector 2",
    type: "sector",
    parentId: "loc_city_bucuresti",
    code: "B",
    isActive: true,
  },
  // ... Sector 3-6

  // Major Cities
  {
    id: "loc_city_iasi",
    name: "Iași",
    type: "city",
    parentId: "loc_county_iasi",
    code: "IS",
    isActive: true,
  },
  {
    id: "loc_city_constanta",
    name: "Constanța",
    type: "city",
    parentId: "loc_county_constanta",
    code: "CT",
    isActive: true,
  },
  // ... more cities
];
```

---

## INTEGRATION EXAMPLES

### Query: Get all counties

```typescript
import { db } from "@/lib/db";
import { locations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const counties = await db.query.locations.findMany({
  where: eq(locations.type, "county"),
  orderBy: (locations, { asc }) => [asc(locations.name)],
});
```

### Query: Get all cities in a county

```typescript
const citiesInCluj = await db.query.locations.findMany({
  where: and(eq(locations.type, "city"), eq(locations.parentId, "loc_county_cluj")),
  orderBy: (locations, { asc }) => [asc(locations.name)],
});
```

### Query: Get Bucharest sectors

```typescript
const bucharestSectors = await db.query.locations.findMany({
  where: and(eq(locations.type, "sector"), eq(locations.parentId, "loc_city_bucuresti")),
  orderBy: (locations, { asc }) => [asc(locations.name)],
});
```

### Future: Join with clubs table

```typescript
// After adding locationId foreign key to clubs table
const clubsInBucharest = await db.query.clubs.findMany({
  where: eq(clubs.locationId, "loc_city_bucuresti"),
  with: {
    location: true, // Join with locations table
  },
});
```

---

## DEPENDENCIES & PREREQUISITES

### Technical Dependencies

- Drizzle ORM (already installed)
- PostgreSQL/Neon database (already configured)
- TypeScript 5.x (already installed)

### Code Dependencies

- Existing schema patterns from `src/lib/db/schema.ts`
- Database connection from `src/lib/db/index.ts`

### Prerequisites

- Database connection working
- Drizzle Studio accessible (`npm run db:studio`)
- Migration system working (`npm run db:generate`, `npm run db:push`)

---

## ESTIMATED EFFORT

- **Phase 1 (Schema Design)**: 1 hour
- **Phase 2 (Data Collection)**: 2 hours
- **Phase 3 (Schema Implementation)**: 1 hour
- **Phase 4 (Seeding Script)**: 2 hours
- **Phase 5 (Migration & Testing)**: 1 hour
- **Total**: ~7 hours (1 day)

---

## NEXT STEPS

1. Review and approve schema design
2. Collect accurate Romanian location data
3. Implement schema in `src/lib/db/schema.ts`
4. Create seeding script with all location data
5. Generate and run migration
6. Verify data in Drizzle Studio
7. Document integration patterns for future use

---

## NOTES

### Special Considerations

**Bucharest**:

- Bucharest is both a county (județ) and a city (municipiu)
- Has 6 sectors that should be included as separate location entries
- County code: "B"
- Parent relationship: Sector → București (city) → București (county)

**County Codes**:

- Use official Romanian county codes (2-letter abbreviations)
- Examples: "AB" (Alba), "AR" (Arad), "B" (București), "CJ" (Cluj)

**Naming Conventions**:

- Use official Romanian spelling with diacritics
- Examples: "București" (not "Bucharest"), "Iași" (not "Iasi"), "Cluj-Napoca" (with hyphen)

**Future Enhancements**:

- Add postal codes mapping
- Add latitude/longitude coordinates
- Add population data
- Add timezone information
- Support for neighborhoods (cartiere) in major cities

---

**Last Updated**: January 2025  
**Status**: Ready for Implementation  
**Next Action**: Review schema design and begin data collection
