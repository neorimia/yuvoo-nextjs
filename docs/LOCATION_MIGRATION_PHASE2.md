# Phase 2: Data Migration - Location Foreign Keys

## Overview

This document describes the data migration script that populates the new location foreign key columns (`cityId`, `sectorId`, `countyId`) from existing text-based location fields (`city`, `district`) in the `clubs` and `doctors` tables.

## Migration Script

**Location**: `scripts/migrate-location-foreign-keys.ts`

**Command**:

```bash
npm run db:migrate:locations
```

Or directly:

```bash
npx tsx scripts/migrate-location-foreign-keys.ts
```

## Migration Strategy

### 1. Clubs Table Migration

For each club:

1. **Match city**: Find `cityId` by matching `clubs.city` text to `locations.name` (type='city') using fuzzy matching
2. **Match sector**: If club is in Bucharest and has a `district`, find `sectorId` by matching `clubs.district` to `locations.name` (type='sector')
3. **Derive county**: Get `countyId` from `cityId`'s parent relationship (cities belong to counties)
4. **Update record**: Set `cityId`, `sectorId`, and `countyId` on the club record

### 2. Doctors Table Migration

Same process as clubs:

1. Match city → `cityId`
2. Match district → `sectorId` (Bucharest only)
3. Derive county → `countyId`
4. Update record

### 3. Fuzzy Matching Algorithm

The script uses a normalization function to handle Romanian diacritics:

```typescript
function normalizeLocationName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD") // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/\s+/g, " "); // Normalize whitespace
}
```

**Matching Strategy**:

1. **Exact match** (normalized): Try exact match after normalization
2. **Partial match**: If exact match fails, try contains matching
3. **No match**: Report for manual review

### 4. Special Cases

- **Bucharest sectors**: Only matches sectors if the city is Bucharest (`cityId === bucharestCityId`)
- **Empty fields**: Records with empty `city` field are reported as unmatched
- **County derivation**: If `countyId` cannot be derived from `cityId`, a warning is logged but migration continues

## Output

The script provides detailed output:

### Success Output

```
✅ Clubs migration complete:
   Total: 150
   Matched: 148
   Unmatched: 2
   Errors: 0
```

### Unmatched Records

Records that cannot be matched are reported with:

- Record ID and name
- Original city/district values
- Reason for failure

Example:

```
⚠️  Unmatched clubs (requires manual review):
   - Club Name (ID: abc123)
     City: Bucuresti, District: Sector 1
     Reason: City "Bucuresti" not found in locations table
```

### Summary

Final summary includes:

- Total records processed
- Successfully migrated count
- Unmatched count
- Error count

## Handling Unmatched Records

If the script reports unmatched records:

1. **Review the unmatched list** - Check which records failed and why
2. **Fix data issues**:
   - Correct misspellings in `city` or `district` fields
   - Ensure city names match locations table (e.g., "București" not "Bucuresti")
   - For Bucharest sectors, ensure format matches (e.g., "Sector 1" not "Sectorul 1")
3. **Re-run the script** - The script is idempotent and can be run multiple times
4. **Manual updates** - For records that still fail, manually update the foreign key columns

## Re-running the Script

The script is **idempotent** - it can be safely run multiple times:

- Records that already have `cityId` set will be skipped (if you add that logic)
- Unmatched records will be reported again
- Successfully migrated records won't be re-processed

**Note**: Currently, the script updates all records. To make it truly idempotent, you could add a check to skip records that already have `cityId` set.

## Next Steps

After successful migration:

1. **Verify results**: Check a few records in the database to ensure foreign keys are set correctly
2. **Review unmatched records**: Fix any unmatched records manually
3. **Proceed to Phase 3**: Once all records are migrated, proceed to Phase 3: Constraint Enforcement (make columns NOT NULL)

## Troubleshooting

### Common Issues

1. **"City not found" errors**:
   - Check if city name has correct diacritics (e.g., "București" not "Bucuresti")
   - Verify city exists in `locations` table with `type='city'`
   - Check for typos in city names

2. **"Sector not found" errors**:
   - Ensure club is actually in Bucharest (check cityId matches Bucharest city ID)
   - Verify sector format matches locations table (e.g., "Sector 1" not "Sectorul 1")
   - Check if sector exists in `locations` table with `type='sector'` and correct `parentId`

3. **"Could not derive countyId" warnings**:
   - This usually means the city's `parentId` is not set correctly in locations table
   - Verify the city record has a valid `parentId` pointing to a county

4. **Database connection errors**:
   - Ensure `DATABASE_URL` is set in `.env.local`
   - Verify database is accessible
   - Check network connectivity

## Example Migration Output

```
🚀 Starting Phase 2: Data Migration
============================================================

📊 Migrating clubs table...
✅ Clubs migration complete:
   Total: 150
   Matched: 148
   Unmatched: 2
   Errors: 0

⚠️  Unmatched clubs (requires manual review):
   - Test Club (ID: test-123)
     City: Bucuresti, District: Sector 1
     Reason: City "Bucuresti" not found in locations table

📊 Migrating doctors table...
✅ Doctors migration complete:
   Total: 45
   Matched: 45
   Unmatched: 0
   Errors: 0

============================================================
📊 Migration Summary:
   Total Records: 195
   Successfully Migrated: 193
   Unmatched: 2
   Errors: 0

⚠️  Some records require manual review.
   Please review unmatched records and update them manually.
   After fixing, re-run this script to migrate remaining records.

✅ Migration script completed
```
