# TODO Resolution Plan

**Created**: January 2025  
**Status**: Planning Phase  
**Total TODOs**: 63 across 32 files

## Overview

This document outlines a comprehensive plan to address all TODO comments in the codebase. TODOs are categorized by priority, impact, and implementation complexity.

## TODO Categories

### 1. High Priority - Core Features (15 TODOs)

These are essential for MVP functionality and should be completed before launch.

#### 1.1 Missing UI Components (7 TODOs)

**Impact**: User-facing features incomplete  
**Priority**: High  
**Estimated Effort**: 2-3 days

| File                                            | TODO                         | Component Needed                              | Status      |
| ----------------------------------------------- | ---------------------------- | --------------------------------------------- | ----------- |
| `src/app/parent/settings/page.tsx`              | Add settings component       | SettingsForm component                        | ✅ Complete |
| `src/app/parent/favorites/page.tsx`             | Add favorites component      | FavoritesList component                       | ✅ Complete |
| `src/app/parent/children/page.tsx`              | Add children list component  | ChildrenList component                        | ✅ Complete |
| `src/app/(public)/intrebari-frecvente/page.tsx` | Add FAQ component            | FaqMain component (exists, needs integration) | ✅ Complete |
| `src/app/(public)/cautare/page.tsx`             | Add search component         | SearchResults component                       | ✅ Complete |
| `src/app/(public)/sporturi/page.tsx`            | Add sports listing component | SportsMain component                          | ✅ Complete |
| `src/app/(public)/despre-noi/page.tsx`          | Add about content component  | AboutMain component                           | ✅ Complete |

**Implementation Plan**:

1. Create `SettingsForm` component with user profile editing
2. Create `FavoritesList` component (reuse BookingList pattern)
3. Create `ChildrenList` component (reuse BookingList pattern)
4. Integrate existing `FaqMain` component into FAQ page
5. Create `SearchResults` component for unified search
6. Create `SportsMain` component for sports listing
7. Create `AboutMain` component with Yuvoo story

#### 1.2 Repository Implementation (6 TODOs)

**Impact**: Database operations incomplete  
**Priority**: High  
**Estimated Effort**: 1-2 days

| File                                            | TODO                       | Function Needed                           | Status      |
| ----------------------------------------------- | -------------------------- | ----------------------------------------- | ----------- |
| `src/modules/favorites/favorites.repository.ts` | Implement database queries | findAll, findByUserId, add, remove        | ✅ Complete |
| `src/modules/children/children.repository.ts`   | Implement database queries | findAll, findById, create, update, delete | ✅ Complete |
| `src/modules/auth/auth.repository.ts`           | Implement database queries | findByStackUserId, update                 | ✅ Complete |

**Implementation Plan**:

1. Implement favorites repository functions (similar to bookings pattern)
2. Implement children repository functions (CRUD operations)
3. Implement auth repository functions (user lookup and update)

#### 1.3 Validation Schemas (2 TODOs)

**Impact**: Input validation missing  
**Priority**: High  
**Estimated Effort**: 0.5 days

| File                           | TODO                           | Schema Needed                        | Status      |
| ------------------------------ | ------------------------------ | ------------------------------------ | ----------- |
| `src/app/actions/bookings.ts`  | Validate input with Zod schema | CreateBookingSchema                  | ✅ Complete |
| `src/app/actions/favorites.ts` | Validate input with Zod schema | AddFavoriteSchema                    | ✅ Complete |
| `src/app/actions/children.ts`  | Validate input with Zod schema | CreateChildSchema, UpdateChildSchema | ✅ Complete |

**Implementation Plan**:

1. Create validation schemas in `src/lib/validations/`
2. Add validation to server actions before processing

### 2. Medium Priority - Feature Enhancements (12 TODOs)

These improve functionality but aren't blockers for MVP.

#### 2.1 Static Generation (6 TODOs)

**Impact**: SEO and performance  
**Priority**: Medium  
**Estimated Effort**: 1 day

| File                                                               | TODO                                            | Implementation Needed            | Status     |
| ------------------------------------------------------------------ | ----------------------------------------------- | -------------------------------- | ---------- |
| `src/app/(public)/cluburi/[slug]/page.tsx`                         | Fetch all club slugs for generateStaticParams   | Query all clubs, extract slugs   | 📋 Pending |
| `src/app/(public)/doctori/[slug]/page.tsx`                         | Fetch all doctor slugs for generateStaticParams | Query all doctors, extract slugs | 📋 Pending |
| `src/app/(public)/sporturi/[slug]/page.tsx`                        | Implement proper generateStaticParams           | Query sports, extract slugs      | 📋 Pending |
| `src/app/theme-for-inspired/(pages)/teacher-details/[id]/page.tsx` | Implement generateStaticParams                  | Legacy route - low priority      | 📋 Pending |
| `src/app/theme-for-inspired/(news)/news-details/[id]/page.tsx`     | Implement generateStaticParams                  | Legacy route - low priority      | 📋 Pending |
| `src/app/theme-for-inspired/(shop)/shop-details/[id]/page.tsx`     | Implement generateStaticParams                  | Legacy route - low priority      | 📋 Pending |

**Implementation Plan**:

1. Implement `generateStaticParams` for club detail pages
2. Implement `generateStaticParams` for doctor detail pages
3. Implement `generateStaticParams` for sport detail pages
4. Legacy routes can be deferred (not in MVP scope)

#### 2.2 Data Mapping & Enhancement (3 TODOs)

**Impact**: Data completeness  
**Priority**: Medium  
**Estimated Effort**: 0.5 days

| File                                        | TODO                                                 | Enhancement Needed                 | Status     |
| ------------------------------------------- | ---------------------------------------------------- | ---------------------------------- | ---------- |
| `src/modules/clubs/clubs.repository.ts`     | Map to sport name from sports table                  | Create sports lookup table/mapping | 📋 Pending |
| `src/modules/doctors/doctors.repository.ts` | Add coordinates when latitude/longitude fields added | Add lat/lng to schema and mapping  | 📋 Pending |
| `src/modules/bookings/bookings.service.ts`  | Validate against club schedule                       | Add schedule validation logic      | 📋 Pending |

**Implementation Plan**:

1. Create sports lookup/mapping utility
2. Add latitude/longitude to doctors schema (if needed)
3. Add schedule validation for club bookings

#### 2.3 Quiz Enhancements (2 TODOs)

**Impact**: User experience  
**Priority**: Medium  
**Estimated Effort**: 1 day

| File                                             | TODO                               | Enhancement Needed              | Status     |
| ------------------------------------------------ | ---------------------------------- | ------------------------------- | ---------- |
| `src/app/(public)/chestionar/container/page.tsx` | Add child selection/creation flow  | Child selection modal/component | 📋 Pending |
| `src/app/actions/quiz.ts`                        | Add saved/bookmarked functionality | Save quiz results to favorites  | 📋 Pending |

**Implementation Plan**:

1. Create child selection component for quiz flow
2. Add "Save Results" functionality (already partially implemented)

#### 2.4 Additional Validation (1 TODO)

**Impact**: Code quality  
**Priority**: Medium  
**Estimated Effort**: 0.5 days

| File                          | TODO                           | Validation Needed                    | Status     |
| ----------------------------- | ------------------------------ | ------------------------------------ | ---------- |
| `src/app/actions/children.ts` | Validate input with Zod schema | CreateChildSchema, UpdateChildSchema | 📋 Pending |

**Implementation Plan**:

1. Create child validation schemas
2. Add validation to children server actions

### 3. Low Priority - Future Enhancements (36 TODOs)

These are nice-to-have features or legacy code that can be deferred.

#### 3.1 Legacy Theme Routes (6 TODOs)

**Impact**: None (legacy routes)  
**Priority**: Low  
**Estimated Effort**: Defer

All `theme-for-inspired` routes are legacy Kindedo theme routes that may not be needed in MVP.

**Decision**: Review and either:

- Remove if not needed
- Redirect to new routes
- Defer implementation

#### 3.2 Component Placeholders (3 TODOs)

**Impact**: Low (placeholder pages)  
**Priority**: Low  
**Estimated Effort**: 1 day

| File                                        | TODO                             | Component Needed                    | Status     |
| ------------------------------------------- | -------------------------------- | ----------------------------------- | ---------- |
| `src/app/(public)/sporturi/[slug]/page.tsx` | Add sport detail component       | SportDetailsMain component          | 📋 Pending |
| `src/app/actions/clubs.ts`                  | Validate filters with Zod schema | ClubSearchFiltersSchema             | 📋 Pending |
| `src/modules/children/children.service.ts`  | Add validation                   | Already has validation, remove TODO | 📋 Pending |

**Implementation Plan**:

1. Create sport detail component (similar to club detail)
2. Add filter validation schemas
3. Review and remove unnecessary TODOs

## Implementation Phases

### Phase 1: Critical Features (Week 1)

**Goal**: Complete all high-priority TODOs

1. **Day 1-2**: UI Components
   - SettingsForm component
   - FavoritesList component
   - ChildrenList component
   - FAQ integration
   - SearchResults component

2. **Day 3**: Repository Implementation
   - Favorites repository
   - Children repository
   - Auth repository

3. **Day 4**: Validation Schemas
   - Booking validation
   - Favorite validation
   - Child validation

4. **Day 5**: Testing & Polish
   - Test all new components
   - Verify database operations
   - Update documentation

### Phase 2: Enhancements (Week 2)

**Goal**: Complete medium-priority TODOs

1. **Day 1**: Static Generation
   - Club detail page generateStaticParams
   - Doctor detail page generateStaticParams
   - Sport detail page generateStaticParams

2. **Day 2**: Data Mapping
   - Sports lookup/mapping
   - Doctor coordinates (if needed)
   - Club schedule validation

3. **Day 3**: Quiz Enhancements
   - Child selection flow
   - Save results functionality

4. **Day 4-5**: Testing & Documentation
   - Test all enhancements
   - Update documentation
   - Code review

### Phase 3: Cleanup (Week 3)

**Goal**: Address low-priority TODOs and cleanup

1. **Day 1-2**: Legacy Route Review
   - Audit theme-for-inspired routes
   - Decide on removal/redirect
   - Implement decisions

2. **Day 3**: Component Placeholders
   - Sport detail component
   - Filter validation
   - Remove unnecessary TODOs

3. **Day 4-5**: Final Cleanup
   - Code review
   - Documentation updates
   - Remove resolved TODOs

## Success Criteria

### Phase 1 Complete When:

- ✅ All UI components implemented and tested
- ✅ All repository functions implemented
- ✅ All validation schemas added
- ✅ No high-priority TODOs remaining

### Phase 2 Complete When:

- ✅ Static generation working for all dynamic routes
- ✅ Data mapping enhancements complete
- ✅ Quiz enhancements implemented
- ✅ No medium-priority TODOs remaining

### Phase 3 Complete When:

- ✅ Legacy routes reviewed and handled
- ✅ All component placeholders filled
- ✅ Codebase clean of unnecessary TODOs
- ✅ Documentation updated

## Risk Assessment

### Low Risk

- UI component implementation (well-defined patterns exist)
- Repository implementation (similar patterns in codebase)
- Validation schemas (straightforward)

### Medium Risk

- Static generation (requires understanding of Next.js 16 Cache Components)
- Data mapping (may require schema changes)

### High Risk

- Legacy route cleanup (may break existing functionality if not careful)

## Dependencies

### Required Before Starting:

- ✅ Database schema stable
- ✅ Component patterns established
- ✅ Validation patterns established

### Blockers:

- None identified

## Notes

1. **Legacy Routes**: The `theme-for-inspired` routes are from the original Kindedo theme. These should be reviewed to determine if they're needed in MVP.

2. **Component Reuse**: Many components can reuse existing patterns (BookingList, ClubCard, etc.)

3. **Validation**: All validation should use Zod schemas and follow existing patterns in `src/lib/validations/`

4. **Testing**: Each phase should include testing before moving to the next phase.

5. **Documentation**: Update relevant documentation as TODOs are resolved.

## Tracking

Track progress using this checklist:

### Phase 1: Critical Features

- [ ] SettingsForm component
- [ ] FavoritesList component
- [ ] ChildrenList component
- [ ] FAQ integration
- [ ] SearchResults component
- [ ] SportsMain component
- [ ] AboutMain component
- [ ] Favorites repository
- [ ] Children repository
- [ ] Auth repository
- [ ] Booking validation
- [ ] Favorite validation
- [ ] Child validation

### Phase 2: Enhancements

- [ ] Club generateStaticParams
- [ ] Doctor generateStaticParams
- [ ] Sport generateStaticParams
- [ ] Sports lookup/mapping
- [ ] Doctor coordinates
- [ ] Club schedule validation
- [ ] Child selection flow
- [ ] Save results functionality

### Phase 3: Cleanup

- [ ] Legacy route review
- [ ] Sport detail component
- [ ] Filter validation
- [ ] Remove unnecessary TODOs

## Estimated Timeline

- **Phase 1**: 1 week (5 days)
- **Phase 2**: 1 week (5 days)
- **Phase 3**: 1 week (5 days)
- **Total**: 3 weeks (15 working days)

## Next Steps

1. Review and approve this plan
2. Prioritize Phase 1 tasks
3. Begin implementation
4. Track progress in this document
5. Update progress.md as TODOs are resolved
