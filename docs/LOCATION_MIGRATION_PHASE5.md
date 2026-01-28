# Location Migration - Phase 5: Code Migration

## Overview

Phase 5 updates application code to use location foreign keys instead of text columns. The code now supports both location IDs (preferred) and text fields (backward compatibility) during the transition period.

## Status

✅ **Types Updated** - Club and Doctor types now include location IDs  
✅ **Repository Layer Updated** - Location names populated from foreign keys  
✅ **Search Functions Updated** - Filtering by location IDs supported  
✅ **Validation Schemas Updated** - Accept location IDs as optional fields  
✅ **Phase 5 Complete** - All code updated to support location foreign keys

## Changes Made

### 1. Type Definitions

#### `src/modules/clubs/clubs.types.ts`

- Added `cityId`, `sectorId`, `countyId` to `Club.location` interface
- Updated `ClubSearchFilters` to accept `cityId`, `sectorId`, `countyId` (preferred)
- Kept `city`, `district` for backward compatibility (deprecated)

#### `src/modules/doctors/doctors.types.ts`

- Added `cityId`, `sectorId`, `countyId` to `Doctor.location` interface
- Updated `DoctorSearchFilters` to accept `cityId`, `sectorId`, `countyId` (preferred)
- Kept `city`, `district` for backward compatibility (deprecated)

### 2. Location Helpers

**New File**: `src/lib/db/location-helpers.ts`

Utility functions for working with location foreign keys:

- `getLocationNameById()` - Get location name from ID
- `getLocationNamesByIds()` - Batch fetch location names (optimized)
- `getCityIdByName()` - Find city ID by name (for backward compatibility)
- `getSectorIdByName()` - Find sector ID by name and city

### 3. Repository Layer

#### `src/modules/clubs/clubs.repository.ts`

- `mapDbClubToClub()` is now **async** (fetches location names from IDs)
- Populates `location.city` and `location.district` from foreign keys when available
- Falls back to text fields if IDs are missing (backward compatibility)
- Includes `cityId`, `sectorId`, `countyId` in returned location object
- All repository functions updated to use `Promise.all()` for async mapping

#### `src/modules/doctors/doctors.repository.ts`

- `mapDbDoctorToDoctor()` is now **async** (fetches location names from IDs)
- Populates `location.city` and `location.district` from foreign keys when available
- Falls back to text fields if IDs are missing (backward compatibility)
- Includes `cityId`, `sectorId`, `countyId` in returned location object
- All repository functions updated to use `Promise.all()` for async mapping

### 4. Search Functions

#### `src/modules/clubs/clubs.search.ts`

- **Preferred**: Filters by `cityId`, `sectorId`, `countyId` when provided
- **Backward compatibility**: Falls back to `city`, `district` text filters if IDs not provided
- Uses `eq()` for ID-based filtering (exact match, faster)
- Uses `ilike()` for text-based filtering (case-insensitive, deprecated)
- Updated to handle async `mapDbClubToClub()` with `Promise.all()`

#### `src/modules/doctors/doctors.search.ts`

- **Preferred**: Filters by `cityId`, `sectorId`, `countyId` when provided
- **Backward compatibility**: Falls back to `city`, `district` text filters if IDs not provided
- Uses `eq()` for ID-based filtering (exact match, faster)
- Uses `ilike()` for text-based filtering (case-insensitive, deprecated)
- Updated to handle async `mapDbDoctorToDoctor()` with `Promise.all()`

### 5. Validation Schemas

#### `src/lib/validations/club.ts`

- `clubBasicInfoSchema`: Added optional `cityId`, `sectorId` fields
- `clubProfileUpdateSchema`: Added optional `cityId`, `sectorId` fields
- Kept `city`, `district` as optional for backward compatibility

#### `src/lib/validations/doctor.ts`

- `doctorLocationContactSchema`: Added optional `cityId`, `sectorId` fields
- `doctorProfileUpdateSchema`: Added optional `cityId`, `sectorId` fields
- Kept `city`, `district` as optional for backward compatibility

## Migration Strategy

### Backward Compatibility

All changes maintain backward compatibility:

- Text fields (`city`, `district`) still work in search filters
- Repository functions fall back to text fields if IDs are missing
- Validation schemas accept both IDs and text
- No breaking changes to existing API contracts

### Performance Improvements

1. **ID-based filtering**: Uses exact match (`eq()`) instead of case-insensitive text search (`ilike()`)
2. **Index usage**: Queries now use optimized composite indexes (`idx_clubs_sport_city_id`, etc.)
3. **Batch location lookups**: `getLocationNamesByIds()` fetches multiple locations in one query

### Query Examples

**Before (text-based, deprecated):**

```typescript
// Slow: case-insensitive text search, no index usage
searchClubs({ city: "București", district: "Sector 3" });
```

**After (ID-based, preferred):**

```typescript
// Fast: exact match, uses composite index
searchClubs({
  cityId: "loc_city_bucuresti",
  sectorId: "loc_sector_3",
});
```

## Next Steps

After Phase 5 is complete:

- ✅ Phase 1: Schema Addition - **COMPLETE**
- ✅ Phase 2: Data Migration - **COMPLETE**
- ✅ Phase 3: Constraint Enforcement - **COMPLETE**
- ✅ Phase 4: Index Updates - **COMPLETE**
- ✅ Phase 5: Code Migration - **COMPLETE** ✅
- 📋 Phase 6: Deprecation Cleanup - Remove old text columns (optional, future)

## Important Notes

1. **Async Mapping**: Repository mapping functions are now async. All callers must use `await` or `Promise.all()`.

2. **Backward Compatibility**: Text-based filters still work but are deprecated. New code should use location IDs.

3. **Location Names**: Location names are fetched from the `locations` table using foreign keys. This ensures consistency and allows for future localization.

4. **Performance**: ID-based queries are faster and use optimized indexes. Text-based queries are slower and should be migrated.

5. **Validation**: Forms can accept either `cityId` or `city` (and `sectorId` or `district`). The application should prefer IDs when available.

## Testing Checklist

- [ ] Test club search with `cityId` filter
- [ ] Test club search with `city` filter (backward compatibility)
- [ ] Test doctor search with `cityId` filter
- [ ] Test doctor search with `city` filter (backward compatibility)
- [ ] Verify location names are populated correctly from IDs
- [ ] Verify fallback to text fields when IDs are missing
- [ ] Test county-level filtering (`countyId`)
- [ ] Test sector filtering for Bucharest clubs/doctors
