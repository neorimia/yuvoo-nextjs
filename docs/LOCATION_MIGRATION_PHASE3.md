# Location Migration - Phase 3: Constraint Enforcement

## Overview

Phase 3 enforces NOT NULL constraints on location foreign key columns after all data has been successfully migrated. This ensures data integrity and prevents invalid records.

## Status

✅ **Schema Updated** - `cityId` and `countyId` are now `notNull()` in the schema  
✅ **Migration Generated** - `drizzle/0007_fearless_union_jack.sql`  
✅ **Migration Applied** - NOT NULL constraints successfully enforced in database  
✅ **Phase 3 Complete** - All location foreign keys are now required

## Changes Made

### Schema Updates (`src/lib/db/schema.ts`)

#### Clubs Table

- `cityId`: Changed from nullable to `notNull()` - **REQUIRED**
- `countyId`: Changed from nullable to `notNull()` - **REQUIRED**
- `sectorId`: Remains nullable (only for Bucharest clubs)

#### Doctors Table

- `cityId`: Changed from nullable to `notNull()` - **REQUIRED**
- `countyId`: Changed from nullable to `notNull()` - **REQUIRED**
- `sectorId`: Remains nullable (only for Bucharest doctors)

#### Users Table

- **No changes** - All location columns remain nullable (location is optional for users)

## Migration SQL

The generated migration (`drizzle/0007_fearless_union_jack.sql`) contains:

```sql
ALTER TABLE "clubs" ALTER COLUMN "city_id" SET NOT NULL;
ALTER TABLE "clubs" ALTER COLUMN "county_id" SET NOT NULL;
ALTER TABLE "doctors" ALTER COLUMN "city_id" SET NOT NULL;
ALTER TABLE "doctors" ALTER COLUMN "county_id" SET NOT NULL;
```

## Applying the Migration

### Option 1: Using `db:push` (Development - Recommended)

```bash
npm run db:push
```

This will sync the schema directly to the database. You'll be prompted to confirm the changes.

### Option 2: Using `db:migrate` (Production)

```bash
npm run db:migrate
```

This applies the generated migration file.

## Verification

After applying the migration, verify that:

1. **All clubs have required location IDs:**

   ```bash
   npx tsx scripts/verify-location-ids.ts
   ```

2. **No NULL values in required columns:**
   ```sql
   -- Should return 0 rows
   SELECT COUNT(*) FROM clubs WHERE city_id IS NULL OR county_id IS NULL;
   SELECT COUNT(*) FROM doctors WHERE city_id IS NULL OR county_id IS NULL;
   ```

## Rollback Plan

If you need to rollback (make columns nullable again):

```sql
ALTER TABLE "clubs" ALTER COLUMN "city_id" DROP NOT NULL;
ALTER TABLE "clubs" ALTER COLUMN "county_id" DROP NOT NULL;
ALTER TABLE "doctors" ALTER COLUMN "city_id" DROP NOT NULL;
ALTER TABLE "doctors" ALTER COLUMN "county_id" DROP NOT NULL;
```

**Note:** Rollback requires that all records have valid location IDs, otherwise you'll need to populate NULL values first.

## Next Steps

Phase 3 is now complete! Migration status:

- ✅ Phase 1: Schema Addition - **COMPLETE**
- ✅ Phase 2: Data Migration - **COMPLETE**
- ✅ Phase 3: Constraint Enforcement - **COMPLETE** ✅
- 📋 Phase 4: Index Updates - Update composite indexes to use foreign keys
- 📋 Phase 5: Code Migration - Update application code to use foreign keys
- 📋 Phase 6: Deprecation Cleanup - Remove old text columns (optional)

## Important Notes

1. **Data Verification Required**: Ensure all clubs and doctors have valid `cityId` and `countyId` before applying NOT NULL constraints. The verification script confirms this.

2. **SectorId Remains Optional**: `sectorId` stays nullable because:
   - Only Bucharest clubs/doctors have sectors
   - Other cities don't use sectors
   - This is by design, not a migration issue

3. **Users Table Unchanged**: User location preferences remain optional, so no NOT NULL constraints are applied to the `users` table.

4. **Foreign Key Constraints**: The foreign key constraints (`ON DELETE RESTRICT`) are already in place from Phase 1, ensuring referential integrity.
