# Database Seeding Plan

## Overview

This document outlines the comprehensive plan for seeding the Yuvoo database with initial data for **Sports**, **Doctors**, and **Clubs**. The seed script will populate the database with realistic, Romanian-localized data for development and testing.

## Current State Analysis

### Existing Seed Script

- **Location**: `src/lib/db/seed.ts`
- **Current Coverage**:
  - ✅ 30+ sample clubs (basic data)
  - ✅ 8 sample doctors (basic data)
  - ✅ 3 test users (parent accounts)
- **Missing Fields**:
  - Clubs: `slug`, `ageGroups`, `experienceLevels`, `schedule`, `pricing`, `galleryUrls`, `latitude`/`longitude`, `district`
  - Doctors: `slug`, `title`, `secondarySpecialties`, `credentials`, `yearsOfExperience`, `languages`, `district`, `address`, `schedule`, `photoUrl`
  - Sports: No separate table (currently just text in `clubs.sportType`)

### Database Schema

- **Sports**: Currently stored as text (`clubs.sportType`) - **RECOMMENDATION**: Create a `sports` table for better data integrity
- **Clubs**: Comprehensive schema with all fields defined
- **Doctors**: Comprehensive schema with all fields defined

## Architecture Decision: Sports Table

### Option 1: Create Sports Table (RECOMMENDED)

**Pros**:

- Data integrity and consistency
- Easy to add sport metadata (description, icon, age recommendations)
- Better for filtering and search
- Supports future features (sport-specific pages, recommendations)

**Cons**:

- Requires schema migration
- Need to update existing code to reference sports table

### Option 2: Keep Sports as Text

**Pros**:

- No schema changes needed
- Simpler implementation

**Cons**:

- No data integrity (typos, inconsistencies)
- Harder to maintain sport list
- Can't add sport metadata

### Recommendation

**Create a `sports` table** with the following structure:

```typescript
sports = pgTable("sports", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(), // "Fotbal"
  slug: text("slug").unique(), // "fotbal"
  description: text("description"),
  icon: text("icon"), // Icon class or URL
  minAge: integer("min_age"), // Minimum recommended age
  maxAge: integer("max_age"), // Maximum recommended age
  category: text("category"), // "echipa", "individual", "combat", etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

Then update `clubs.sportType` to `clubs.sportId` with foreign key reference.

## Seeding Plan

### Phase 1: Sports Seeding

#### 1.1 Sports Data Structure

Create a comprehensive list of 25-30 sports popular in Romania for children ages 4-14:

**Team Sports**:

- Fotbal (Football/Soccer)
- Baschet (Basketball)
- Volei (Volleyball)
- Handbal (Handball)
- Rugby
- Hochei pe gheață (Ice Hockey)

**Individual Sports**:

- Tenis (Tennis)
- Tenis de masă (Table Tennis)
- Badminton
- Atletism (Athletics)
- Ciclism (Cycling)
- Înot (Swimming)
- Patinaj (Skating)
- Schi (Skiing)

**Combat Sports**:

- Karate
- Judo
- Taekwondo
- Scrimă (Fencing)
- Box

**Artistic/Performance**:

- Gimnastică artistică (Artistic Gymnastics)
- Gimnastică ritmică (Rhythmic Gymnastics)
- Dans (Dance) - multiple types
- Patinaj artistic (Figure Skating)

**Other**:

- Echiță (Equestrian)
- Tiro cu arcul (Archery)
- Alpinism (Climbing)

#### 1.2 Sports Seed Data Requirements

Each sport should include:

- **id**: UUID
- **name**: Romanian name (e.g., "Fotbal")
- **slug**: URL-friendly slug (e.g., "fotbal")
- **description**: Brief description in Romanian
- **icon**: Icon identifier (Flaticon class or URL)
- **minAge**: Minimum recommended age (e.g., 4, 5, 6)
- **maxAge**: Maximum recommended age (typically 14+)
- **category**: Sport category for filtering

#### 1.3 Implementation Steps

1. Create `sports` table schema (if not exists)
2. Create `sportsSeedData` array with all sports
3. Seed sports first (before clubs)
4. Update clubs to reference `sportId` instead of `sportType`

---

### Phase 2: Clubs Seeding

#### 2.1 Club Data Requirements

Each club must include all schema fields:

**Required Fields**:

- `id`: UUID
- `name`: Club name in Romanian
- `slug`: URL-friendly slug (auto-generated from name)
- `description`: Detailed description in Romanian (100-300 words)
- `sportId`: Reference to sports table (or `sportType` if keeping text)
- `city`: Romanian city name
- `district`: Sector/district (for București: "Sector 1", "Sector 2", etc.)
- `address`: Full address
- `latitude`/`longitude`: GPS coordinates (for location-based search)
- `phone`: Romanian phone format (+40 XXX XXX XXX)
- `email`: Contact email
- `website`: Optional website URL

**Optional but Important Fields**:

- `ageGroups`: Array of ages (e.g., [4, 5, 6, 7, 8, 9, 10])
- `experienceLevels`: Array of levels (e.g., ["beginner", "intermediate", "advanced"])
- `schedule`: JSONB array of schedule entries
  ```json
  [
    { "day": "Luni", "time": "16:00-17:30" },
    { "day": "Miercuri", "time": "16:00-17:30" },
    { "day": "Vineri", "time": "16:00-17:30" }
  ]
  ```
- `pricing`: JSONB array of pricing options
  ```json
  [
    {
      "type": "monthly",
      "amount": 250,
      "currency": "RON"
    }
  ]
  ```
- `galleryUrls`: Array of image URLs (placeholder or Cloudinary URLs)
- `logoUrl`: Club logo URL
- `verified`: Boolean (mix of true/false)
- `featured`: Boolean (some clubs featured for homepage)
- `rating`: Integer (1-5)
- `profileComplete`: Boolean (true for seed data)
- `verificationStatus`: Enum ("approved" for verified clubs)

#### 2.2 Club Distribution Strategy

- **Total Clubs**: 50-75 clubs
- **Geographic Distribution**:
  - București: 30-40 clubs (all sports, all sectors)
  - Cluj-Napoca: 8-10 clubs
  - Timișoara: 5-7 clubs
  - Iași: 5-7 clubs
  - Constanța: 3-5 clubs
  - Brașov: 3-5 clubs
  - Other cities: 2-3 clubs each

- **Sport Distribution**:
  - Popular sports (fotbal, baschet, tenis, înot): 5-8 clubs each
  - Medium popularity: 3-5 clubs each
  - Niche sports: 1-2 clubs each

- **Verification Status**:
  - 60% verified (`verified: true`, `verificationStatus: "approved"`)
  - 30% pending (`verificationStatus: "pending"`)
  - 10% in review (`verificationStatus: "in_review"`)

- **Featured Clubs**: 10-15 clubs (mix of sports and cities)

#### 2.3 Club Data Generation

For each club, generate:

1. **Name**: Realistic Romanian club name (e.g., "Fotbal Club Junior București", "Academia de Baschet Dinamo")
2. **Slug**: Auto-generate from name (lowercase, replace spaces with hyphens, remove diacritics)
3. **Description**: 2-3 sentences in Romanian describing the club
4. **Age Groups**: Based on sport (e.g., fotbal: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
5. **Levels**: Mix of ["beginner", "intermediate", "advanced"] based on club type
6. **Schedule**: Realistic training schedule (2-4 sessions per week)
7. **Pricing**: Realistic Romanian pricing (200-500 RON/month)
8. **Coordinates**: Real coordinates for major cities (use Google Maps API or manual lookup)
9. **Images**: Placeholder images or use Cloudinary placeholders

#### 2.4 Implementation Steps

1. Create helper function to generate slug from name
2. Create helper function to generate realistic coordinates for cities
3. Create `clubsSeedData` array with all clubs
4. Ensure all required fields are populated
5. Seed clubs after sports (reference sportId)

---

### Phase 3: Doctors Seeding

#### 3.1 Doctor Data Requirements

Each doctor must include all schema fields:

**Required Fields**:

- `id`: UUID
- `firstName`: First name
- `lastName`: Last name
- `slug`: URL-friendly slug (auto-generated from name)
- `title`: Professional title ("Dr.", "Conf. Dr.", "Prof. Dr.")
- `specialty`: Primary specialty in Romanian
- `secondarySpecialties`: Array of additional specialties
- `credentials`: Array of credentials (e.g., ["MD", "Board Certified", "Specialist în Ortopedie Pediatrică"])
- `bio`: Professional bio in Romanian (100-200 words)
- `yearsOfExperience`: Integer (5-30 years)
- `languages`: Array (e.g., ["Română", "Engleză", "Franceză"])
- `city`: Romanian city name
- `district`: Sector/district (for București)
- `address`: Full address
- `phone`: Romanian phone format
- `email`: Professional email
- `website`: Optional website URL
- `acceptingNewPatients`: Boolean (mix of true/false)
- `onlineConsultations`: Boolean (some doctors offer online)
- `schedule`: JSONB array of availability
- `photoUrl`: Doctor photo URL (placeholder)
- `verified`: Boolean
- `verificationStatus`: Enum
- `rating`: Integer (1-5)

#### 3.2 Doctor Specialties

Focus on sports-relevant pediatric specialties:

**Primary Specialties**:

- Ortopedie pediatrică (Pediatric Orthopedics)
- Nutriție pediatrică (Pediatric Nutrition)
- Psihologie sportivă (Sports Psychology)
- Medicină sportivă pediatrică (Pediatric Sports Medicine)
- Cardiologie pediatrică (Pediatric Cardiology)
- Fizioterapie pediatrică (Pediatric Physiotherapy)
- Kineziterapie pediatrică (Pediatric Kinesiotherapy)

**Secondary Specialties** (can be combined):

- Endocrinologie pediatrică
- Pneumologie pediatrică
- Neurologie pediatrică

#### 3.3 Doctor Distribution Strategy

- **Total Doctors**: 15-20 doctors
- **Geographic Distribution**:
  - București: 10-12 doctors
  - Cluj-Napoca: 2-3 doctors
  - Timișoara: 2-3 doctors
  - Iași: 1-2 doctors
  - Other cities: 1 doctor each

- **Specialty Distribution**:
  - Ortopedie pediatrică: 4-5 doctors
  - Nutriție pediatrică: 3-4 doctors
  - Psihologie sportivă: 2-3 doctors
  - Medicină sportivă: 2-3 doctors
  - Other specialties: 1-2 doctors each

- **Verification Status**:
  - 70% verified
  - 20% pending
  - 10% in review

#### 3.4 Doctor Data Generation

For each doctor, generate:

1. **Name**: Realistic Romanian name
2. **Slug**: Auto-generate from name
3. **Title**: Random from ["Dr.", "Conf. Dr.", "Prof. Dr."]
4. **Bio**: Professional bio mentioning sports-related experience
5. **Years of Experience**: Random between 5-30
6. **Languages**: Always include "Română", optionally add "Engleză"
7. **Schedule**: Professional availability (e.g., Monday-Friday, 9:00-17:00)
8. **Credentials**: Realistic credentials array

#### 3.5 Implementation Steps

1. Create helper function to generate doctor slug
2. Create `doctorsSeedData` array with all doctors
3. Ensure all required fields are populated
4. Seed doctors independently (no foreign key dependencies)

---

## Implementation Structure

### File Organization

```
src/lib/db/
├── seed.ts (main seed script)
├── seed-data/
│   ├── sports.ts (sports seed data)
│   ├── clubs.ts (clubs seed data)
│   ├── doctors.ts (doctors seed data)
│   └── helpers.ts (helper functions: slug generation, coordinates, etc.)
```

### Seed Script Flow

```typescript
async function seed() {
  // 1. Seed Sports (if sports table exists)
  await seedSports();

  // 2. Seed Clubs (depends on sports)
  await seedClubs();

  // 3. Seed Doctors (independent)
  await seedDoctors();

  // 4. Optional: Seed test users
  await seedTestUsers();
}
```

### Idempotency Strategy

- Check for existing records before inserting
- Use unique constraints (slug, email) to prevent duplicates
- Skip existing records with warning message
- Provide summary of created vs. skipped records

---

## Data Quality Requirements

### Romanian Localization

- ✅ All text in Romanian
- ✅ Proper Romanian diacritics (ă, â, î, ș, ț)
- ✅ Romanian phone number format (+40 XXX XXX XXX)
- ✅ Romanian address format
- ✅ Romanian currency (RON)

### Data Realism

- ✅ Realistic club names (not "Test Club 1")
- ✅ Realistic addresses (use real street names)
- ✅ Realistic coordinates (use actual city coordinates)
- ✅ Realistic pricing (200-500 RON/month for clubs)
- ✅ Realistic schedules (typical training times)
- ✅ Realistic age groups (appropriate for each sport)

### Data Completeness

- ✅ All required fields populated
- ✅ Optional fields populated where relevant
- ✅ No null values for critical fields
- ✅ Proper data types (arrays, JSONB, etc.)

---

## Execution Plan

### Step 1: Schema Updates (if creating sports table)

1. Create `sports` table schema
2. Update `clubs.sportType` to `clubs.sportId` with foreign key
3. Generate and run migration
4. Update repository/service code to use sports table

### Step 2: Create Seed Data Files

1. Create `seed-data/sports.ts` with all sports
2. Create `seed-data/clubs.ts` with all clubs
3. Create `seed-data/doctors.ts` with all doctors
4. Create `seed-data/helpers.ts` with utility functions

### Step 3: Update Seed Script

1. Refactor `seed.ts` to use modular seed data
2. Add proper error handling
3. Add progress reporting
4. Add summary statistics

### Step 4: Testing

1. Test seed script on empty database
2. Test idempotency (run twice, should skip duplicates)
3. Verify all data is properly inserted
4. Verify relationships (clubs → sports)
5. Test search/filter functionality with seed data

### Step 5: Documentation

1. Update `src/lib/db/README.md` with new seed structure
2. Document how to add new seed data
3. Document how to reset seed data

---

## Estimated Data Volumes

- **Sports**: 25-30 sports
- **Clubs**: 50-75 clubs
- **Doctors**: 15-20 doctors
- **Total Seed Time**: ~30-60 seconds

---

## Future Enhancements

1. **Image Seeding**: Use Cloudinary to upload actual club/doctor images
2. **Review Seeding**: Add sample reviews for clubs and doctors
3. **Booking Seeding**: Add sample bookings for testing
4. **Child Profile Seeding**: Add sample children linked to test users
5. **Quiz Seeding**: Add sample quiz results
6. **Favorites Seeding**: Add sample favorites

---

## Notes

- All seed data should be in Romanian
- Use realistic but fictional data (don't use real club/doctor names without permission)
- Ensure data diversity (different cities, sports, specialties)
- Make seed script idempotent for safe re-running
- Provide clear console output during seeding
- Include summary statistics at the end
