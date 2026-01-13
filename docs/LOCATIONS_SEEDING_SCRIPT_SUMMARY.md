# Locations Seeding Script Summary

**Phase**: 4 - Seeding Script  
**Status**: ✅ Complete  
**Date**: January 2025

---

## Overview

The locations seeding script has been successfully created. The script populates the `locations` table with all Romanian counties, cities, and sectors, with built-in duplicate removal, relationship validation, and data integrity checks.

---

## Script Details

### File Location

**File**: `src/lib/db/seed-locations.ts`

### Features

1. **Duplicate Removal**
   - Removes duplicate entries based on location ID
   - Ensures each location appears only once

2. **Relationship Validation**
   - Validates all parent-child relationships
   - Ensures all `parentId` references point to existing locations
   - Throws error if invalid relationships are found

3. **Ordered Insertion**
   - Inserts locations in correct order: counties → cities → sectors
   - Ensures parent locations exist before child locations

4. **Idempotent Operation**
   - Can be run multiple times safely
   - Checks for existing locations before inserting
   - Updates locations if data has changed
   - Skips locations that already exist with same data

5. **Data Integrity Checks**
   - Verifies final counts match expected counts
   - Checks for orphaned locations (parentId that doesn't exist)
   - Validates county structure (counties should have null parentId)

---

## Usage

### Run Seeding Script

```bash
# Using npm script (recommended)
npm run db:seed:locations

# Or directly with tsx
npx tsx src/lib/db/seed-locations.ts
```

### Prerequisites

1. **Database Migration Applied**
   - Locations table must exist in database
   - Run migration first: `npm run db:push` or `npm run db:migrate`

2. **Environment Variables**
   - `DATABASE_URL` must be set in `.env.local`

---

## Script Workflow

### 1. Data Preparation

- Combines all location data from `locations-data.ts`
- Removes duplicates based on location ID
- Validates parent-child relationships
- Sorts locations for insertion (counties → cities → sectors)

### 2. Data Insertion

For each location:

- Checks if location already exists
- If exists:
  - Compares data for changes
  - Updates if data changed
  - Skips if data unchanged
- If not exists:
  - Inserts new location

### 3. Verification

- Counts locations by type (counties, cities, sectors)
- Verifies final counts match expected counts
- Checks for orphaned locations
- Validates county structure

---

## Output

### Console Output

The script provides detailed console output:

```
🌱 Starting locations seed...

📊 Initial data count: 250 locations
   After deduplication: 245 unique locations
   ✅ All parent-child relationships are valid

📋 Data breakdown:
   - Counties: 42
   - Cities: 197
   - Sectors: 6
   - Total: 245

   ✅ Inserted 50 locations...
   ✅ Inserted 100 locations...
   ...

📊 Seeding Summary:
   ✅ Created: 245 locations
   🔄 Updated: 0 locations
   ⚠️  Skipped: 0 locations (already exist)

✅ Verification:
   - Counties in DB: 42
   - Cities in DB: 197
   - Sectors in DB: 6
   - Total in DB: 245

✅ Locations seed completed successfully!

📊 Final Summary:
   - Locations created: 245
   - Locations updated: 0
   - Locations skipped: 0
   - Total processed: 245
   - Final count in DB: 245

🔍 Data Integrity Check:
   ✅ No orphaned locations found
   ✅ All counties have null parentId

✨ Locations seed process finished!
```

---

## Data Processing

### Duplicate Removal

**Method**: Uses a Set with location ID as key

**Result**: Ensures each location appears only once in the final dataset

### Relationship Validation

**Checks**:

- All `parentId` values reference existing location IDs
- Counties have `parentId = null`
- Cities have `parentId = county.id`
- Sectors have `parentId = city.id` (Bucharest city)

**On Failure**: Script throws error and stops execution

### Insertion Order

**Order**:

1. Counties (parentId = null)
2. Cities (parentId = county.id)
3. Sectors (parentId = city.id)

**Reason**: Ensures parent locations exist before child locations are inserted

---

## Error Handling

### Validation Errors

If relationship validation fails:

- Script stops execution
- Lists all validation errors
- Throws error with details

### Database Errors

If database operation fails:

- Error is logged
- Error details are collected
- Script continues with next location
- All errors are reported at the end
- Script throws error if any errors occurred

### Common Errors

1. **Foreign Key Constraint Violation**
   - Parent location doesn't exist
   - Solution: Ensure insertion order is correct (counties → cities → sectors)

2. **Unique Constraint Violation**
   - Duplicate location ID or name+type+parent combination
   - Solution: Script handles this by checking before insert

3. **Invalid Parent ID**
   - parentId references non-existent location
   - Solution: Script validates relationships before insertion

---

## Data Integrity Checks

### Final Count Verification

Compares expected counts with actual database counts:

- Counties: Should be 42 (41 counties + Bucharest)
- Cities: Should match expected city count
- Sectors: Should be 6 (Bucharest sectors)

### Orphaned Location Check

Checks for locations with invalid parentId:

- Finds locations where `parentId` doesn't exist in database
- Reports any orphaned locations found

### County Structure Validation

Validates that counties have correct structure:

- Counties should have `parentId = null`
- Reports any counties with non-null parentId

---

## Performance

### Batch Processing

- Processes locations one at a time
- Provides progress updates every 50 locations
- Uses database transactions for consistency

### Optimization

- Uses indexes for fast lookups
- Checks existence before insert/update
- Sorts data once before processing

---

## Integration

### With Main Seed Script

The locations seeding script is standalone but can be integrated into the main seed script (`seed.ts`) if needed.

### With Migration

**Recommended Order**:

1. Run migration: `npm run db:push` or `npm run db:migrate`
2. Run seeding: `npm run db:seed:locations`

---

## Testing

### Manual Testing

1. **First Run**:

   ```bash
   npm run db:seed:locations
   ```

   - Should create all locations
   - Should show "Created: X locations"

2. **Second Run**:

   ```bash
   npm run db:seed:locations
   ```

   - Should skip all locations
   - Should show "Skipped: X locations"

3. **After Data Change**:
   - Modify location data in `locations-data.ts`
   - Run script again
   - Should update changed locations

### Verification

After seeding, verify data in Drizzle Studio:

```bash
npm run db:studio
```

Check:

- All counties exist (42 total)
- All county capitals exist
- All Bucharest sectors exist
- All major cities exist
- Parent-child relationships are correct

---

## Next Steps

**Phase 5**: Migration & Testing

- Apply migration to database
- Run seeding script
- Verify data in Drizzle Studio
- Test common queries
- Verify indexes are working

---

## Files Created/Modified

1. **`src/lib/db/seed-locations.ts`** (NEW)
   - Main seeding script
   - Contains all seeding logic

2. **`package.json`** (MODIFIED)
   - Added `db:seed:locations` script command

---

## Technical Notes

### Drizzle ORM Usage

- Uses `db.select().from(locations).where(eq(...))` for existence checks
- Uses `db.insert(locations).values(...)` for inserts
- Uses `db.update(locations).set(...).where(eq(...))` for updates
- Uses `db.query.locations.findMany()` for verification queries

### Data Structure

- Location data is imported from `locations-data.ts`
- Data is structured as TypeScript arrays
- Each location has: id, name, type, parentId, code

### Error Recovery

- Script continues processing even if individual locations fail
- All errors are collected and reported at the end
- Script exits with error code if any errors occurred

---

**Last Updated**: January 2025  
**Status**: Phase 4 Complete - Ready for Phase 5
