# Location Migration - Phase 4: Index Updates

## Overview

Phase 4 updates composite indexes to use foreign keys instead of text columns, and removes deprecated text-based indexes. This improves query performance for location-based filtering.

## Status

✅ **Schema Updated** - Composite indexes now use foreign keys  
✅ **Migration Generated** - `drizzle/0008_rapid_king_bedlam.sql`  
✅ **Migration Applied** - Index updates successfully applied to database  
✅ **Phase 4 Complete** - All indexes now optimized for foreign key queries

## Changes Made

### Schema Updates (`src/lib/db/schema.ts`)

#### Clubs Table Indexes

**Removed:**

- `cityIdx`: `index("idx_clubs_city").on(table.city)` - Text-based index (deprecated)
- `sportCityIdx`: `index("idx_clubs_sport_city").on(table.sportType, table.city)` - Text-based composite index (replaced)

**Added:**

- `sportCityIdIdx`: `index("idx_clubs_sport_city_id").on(table.sportType, table.cityId)` - Composite index with foreign key
- `sportCountyIdIdx`: `index("idx_clubs_sport_county_id").on(table.sportType, table.countyId)` - Composite index with foreign key

**Kept:**

- All other indexes remain unchanged
- Foreign key indexes (`cityIdIdx`, `sectorIdIdx`, `countyIdIdx`) remain

#### Doctors Table Indexes

**Removed:**

- `cityIdx`: `index("idx_doctors_city").on(table.city)` - Text-based index (deprecated)
- `specialtyCityIdx`: `index("idx_doctors_specialty_city").on(table.specialty, table.city)` - Text-based composite index (replaced)

**Added:**

- `specialtyCityIdIdx`: `index("idx_doctors_specialty_city_id").on(table.specialty, table.cityId)` - Composite index with foreign key
- `specialtyCountyIdIdx`: `index("idx_doctors_specialty_county_id").on(table.specialty, table.countyId)` - Composite index with foreign key

**Kept:**

- All other indexes remain unchanged
- Foreign key indexes (`cityIdIdx`, `sectorIdIdx`, `countyIdIdx`) remain

## Migration SQL

The generated migration will:

1. Drop old text-based indexes (`idx_clubs_city`, `idx_doctors_city`)
2. Drop old composite indexes (`idx_clubs_sport_city`, `idx_doctors_specialty_city`)
3. Create new composite indexes with foreign keys (`idx_clubs_sport_city_id`, `idx_clubs_sport_county_id`, `idx_doctors_specialty_city_id`, `idx_doctors_specialty_county_id`)

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

## Performance Benefits

After applying Phase 4:

1. **Faster Location Queries**: Composite indexes with foreign keys enable efficient filtering by sport/specialty + location
2. **Better Join Performance**: Foreign key indexes improve join performance when querying with locations table
3. **Reduced Index Maintenance**: Removing text-based indexes reduces index maintenance overhead
4. **Query Optimization**: Database can use composite indexes for queries like:
   - "Find all football clubs in Bucharest" → Uses `idx_clubs_sport_city_id`
   - "Find all pediatricians in Cluj County" → Uses `idx_doctors_specialty_county_id`

## Rollback Plan

If you need to rollback:

```sql
-- Recreate old indexes
CREATE INDEX idx_clubs_city ON clubs(city);
CREATE INDEX idx_doctors_city ON doctors(city);
CREATE INDEX idx_clubs_sport_city ON clubs(sport_type, city);
CREATE INDEX idx_doctors_specialty_city ON doctors(specialty, city);

-- Drop new indexes
DROP INDEX idx_clubs_sport_city_id;
DROP INDEX idx_clubs_sport_county_id;
DROP INDEX idx_doctors_specialty_city_id;
DROP INDEX idx_doctors_specialty_county_id;
```

## Next Steps

Phase 4 is now complete! Migration status:

- ✅ Phase 1: Schema Addition - **COMPLETE**
- ✅ Phase 2: Data Migration - **COMPLETE**
- ✅ Phase 3: Constraint Enforcement - **COMPLETE**
- ✅ Phase 4: Index Updates - **COMPLETE** ✅
- 📋 Phase 5: Code Migration - Update application code to use foreign keys
- 📋 Phase 6: Deprecation Cleanup - Remove old text columns (optional)

## Important Notes

1. **No Data Loss**: Index changes don't affect data, only query performance
2. **Downtime**: Index creation/dropping may cause brief locks, but should be fast
3. **Query Compatibility**: Old queries using text columns will still work, but won't benefit from new indexes
4. **Text Columns Remain**: The `city` and `district` text columns are still in the schema (will be removed in Phase 6 if desired)
