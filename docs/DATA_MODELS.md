# Yuvoo - Data Models

## Overview

This document provides comprehensive documentation of all data models used in the Yuvoo platform. These models represent the core entities and their relationships in the application.

**Purpose**: Serve as a reference for understanding data structures when generating pages, components, and API endpoints.

**Key Principles**:

- ✅ All models use TypeScript interfaces
- ✅ Database schema defined in Drizzle ORM
- ✅ Type definitions in `modules/*/types.ts`
- ✅ Consistent naming conventions
- ✅ UUID primary keys
- ✅ Timestamps on all entities

**Reference**:

- **Database Schema**: `src/lib/db/schema.ts` - Drizzle ORM schema definitions
- **Type Definitions**: `src/modules/*/types.ts` - TypeScript interfaces

---

## Core Models

### 1. User (Parent/Admin/Doctor)

**Type**: `AuthUser` from `modules/auth/auth.types.ts`  
**Database Table**: `users`

**Description**: Represents all users in the system (parents, club admins, doctors, platform admins).

```typescript
interface AuthUser {
  id: string; // UUID primary key
  email: string; // Unique email address
  name: string | null; // Full name (optional)
  role: UserRole; // "parent" | "club_admin" | "doctor" | "admin"
  emailVerified: boolean; // Email verification status
  createdAt: Date; // Account creation timestamp
  updatedAt: Date; // Last update timestamp
}

type UserRole = "parent" | "club_admin" | "doctor" | "admin";
```

**Database Fields**:

- `id` (text, primary key)
- `stack_user_id` (text, unique, not null) - Stack Auth user ID
- `email` (text, unique, not null)
- `role` (enum, default: "parent")
- `first_name` (text, nullable)
- `last_name` (text, nullable)
- `phone` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Relationships**:

- One-to-many with `children` (if role is "parent")
- One-to-many with `bookings`
- One-to-many with `favorites`
- One-to-many with `reviews`
- One-to-one with `doctors` (if role is "doctor")

**Usage**:

- Authentication and authorization
- User profile management
- Role-based access control

---

### 2. Child (ChildProfile)

**Type**: `Child` from `modules/children/children.types.ts`  
**Database Table**: `children`

**Description**: Represents a child profile linked to a parent user.

```typescript
interface Child {
  id: string; // UUID primary key
  parentId: string; // Foreign key to users.id
  firstName: string; // Child's first name
  lastName: string; // Child's last name
  dateOfBirth: Date; // Date of birth (for age calculation)
  gender: "male" | "female" | "other";
  age: number; // Calculated from dateOfBirth (not in DB)
  createdAt: Date; // Profile creation timestamp
  updatedAt: Date; // Last update timestamp
}
```

**Database Fields**:

- `id` (text, primary key)
- `parent_id` (text, foreign key → users.id, not null)
- `first_name` (text, not null)
- `last_name` (text, not null)
- `date_of_birth` (timestamp, not null)
- `gender` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Relationships**:

- Many-to-one with `users` (parent)
- One-to-many with `quizzes`
- One-to-many with `bookings`

**Input Types**:

```typescript
interface CreateChildInput {
  parentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
}

interface UpdateChildInput {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";
}
```

**Usage**:

- Child profile management
- Quiz submissions (linked to child)
- Booking management (linked to child)

---

### 3. Club (Sports Club)

**Type**: `Club` from `modules/clubs/clubs.types.ts`  
**Database Table**: `clubs`

**Description**: Represents a sports club offering activities for children.

```typescript
interface Club {
  id: string; // UUID primary key
  name: string; // Club name
  slug: string; // URL-friendly identifier
  description: string; // Club description
  sportId: string; // Sport type identifier
  sportName: string; // Sport name (e.g., "Fotbal", "Baschet")
  location: {
    city: string; // City name
    district?: string; // District/neighborhood (optional)
    address: string; // Full address
    coordinates?: {
      // GPS coordinates (optional)
      lat: number;
      lng: number;
    };
  };
  ageGroups: number[]; // e.g., [4, 5, 6, 7, 8]
  levels: string[]; // e.g., ["beginner", "intermediate", "advanced"]
  verified: boolean; // Verification status
  featured: boolean; // Featured on homepage
  images: string[]; // Array of image URLs
  contact: {
    phone?: string; // Contact phone
    email?: string; // Contact email
    website?: string; // Website URL
  };
  schedule?: {
    // Training schedule (optional)
    day: string; // e.g., "Luni", "Miercuri"
    time: string; // e.g., "17:00-18:30"
  }[];
  pricing?: {
    // Pricing information (optional)
    type: "monthly" | "per_class" | "per_semester";
    amount: number; // Price amount
    currency: "RON"; // Currency (always RON)
  };
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}
```

**Database Fields**:

- `id` (text, primary key)
- `name` (text, not null)
- `description` (text, nullable)
- `sport_type` (text, not null)
- `city` (text, not null)
- `address` (text, nullable)
- `latitude` (text, nullable)
- `longitude` (text, nullable)
- `phone` (text, nullable)
- `email` (text, nullable)
- `website` (text, nullable)
- `logo_url` (text, nullable)
- `verified` (boolean, default: false)
- `featured` (boolean, default: false)
- `rating` (integer, default: 0)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Note**: The TypeScript `Club` interface includes computed fields (`slug`, `sportName`, nested `location`, `ageGroups`, `levels`, `images`, `schedule`, `pricing`) that are derived from or stored differently in the database. The database schema is more normalized.

**Relationships**:

- One-to-many with `bookings`
- One-to-many with `favorites`
- One-to-many with `reviews`

**Search & Filters**:

```typescript
interface ClubSearchFilters {
  sportId?: string;
  age?: number;
  city?: string;
  district?: string;
  level?: string;
  verified?: boolean;
  featured?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "verified" | "rating";
}

interface ClubSearchResult {
  clubs: Club[];
  total: number;
  page: number;
  pageSize: number;
}
```

**Usage**:

- Club directory listing
- Club detail pages
- Club search and filtering
- Booking management
- Favorites management

---

### 4. Doctor (Pediatric Specialist)

**Type**: `Doctor` from `modules/doctors/doctors.types.ts`  
**Database Table**: `doctors`

**Description**: Represents a pediatric specialist (orthopedist, nutritionist, psychologist, etc.).

```typescript
interface Doctor {
  id: string; // UUID primary key
  name: string; // Doctor's full name
  slug: string; // URL-friendly identifier
  specialty: DoctorSpecialty; // Medical specialty
  description: string; // Professional description/bio
  credentials: string[]; // e.g., ["MD", "Pediatric Orthopedist"]
  location: {
    city: string; // City name
    district?: string; // District/neighborhood (optional)
    address: string; // Office address
    coordinates?: {
      // GPS coordinates (optional)
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string; // Contact phone
    email?: string; // Contact email
    website?: string; // Website URL
  };
  image?: string; // Profile photo URL
  verified: boolean; // Verification status
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}

type DoctorSpecialty =
  | "orthopedist" // Ortopedie pediatrică
  | "nutritionist" // Nutriție pediatrică
  | "psychologist" // Psihologie sportivă
  | "general"; // Medicină sportivă pediatrică
```

**Database Fields**:

- `id` (text, primary key)
- `user_id` (text, foreign key → users.id, nullable) - If doctor has user account
- `first_name` (text, not null)
- `last_name` (text, not null)
- `specialty` (text, not null)
- `bio` (text, nullable)
- `city` (text, not null)
- `phone` (text, nullable)
- `email` (text, nullable)
- `photo_url` (text, nullable)
- `verified` (boolean, default: false)
- `accepting_new_patients` (boolean, default: true)
- `rating` (integer, default: 0)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Note**: Similar to `Club`, the TypeScript `Doctor` interface includes computed fields (`slug`, nested `location`, `credentials`) that are derived from or stored differently in the database.

**Relationships**:

- Many-to-one with `users` (optional, if doctor has user account)
- One-to-many with `bookings`
- One-to-many with `favorites`
- One-to-many with `reviews`

**Search & Filters**:

```typescript
interface DoctorSearchFilters {
  specialty?: DoctorSpecialty;
  city?: string;
  district?: string;
  verified?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "specialty" | "verified";
}

interface DoctorSearchResult {
  doctors: Doctor[];
  total: number;
  page: number;
  pageSize: number;
}
```

**Usage**:

- Doctor directory listing
- Doctor profile pages
- Doctor search and filtering
- Booking management (consultations)
- Favorites management

---

### 5. Quiz (AI Coach Quiz)

**Type**: `QuizSubmission`, `QuizResult` from `modules/quiz/quiz.types.ts`  
**Database Table**: `quizzes`

**Description**: Represents a quiz submission and its AI-generated recommendations.

```typescript
interface QuizSubmission {
  id: string; // UUID primary key
  childId: string; // Foreign key to children.id
  answers: QuizAnswers; // Quiz answers
  submittedAt: Date; // Submission timestamp
}

interface QuizAnswers {
  age: number; // Child's age
  energyLevel: "low" | "medium" | "high";
  personality: string[]; // Personality traits
  interests: string[]; // Interests and hobbies
  physicalBuild: "slim" | "average" | "athletic";
  previousSports: string[]; // Previously tried sports
  preferences: {
    indoor: boolean; // Prefers indoor activities
    outdoor: boolean; // Prefers outdoor activities
    team: boolean; // Prefers team sports
    individual: boolean; // Prefers individual sports
  };
}

interface SportRecommendation {
  sportId: string; // Sport identifier
  sportName: string; // Sport name (e.g., "Fotbal", "Tenis")
  matchScore: number; // Match score 0-100
  reasoning: string; // AI-generated explanation (Romanian)
  benefits: string[]; // Benefits for this child
  considerations: string[]; // Things to consider
}

interface QuizResult {
  id: string; // Same as QuizSubmission.id
  childId: string; // Foreign key to children.id
  recommendations: SportRecommendation[]; // AI recommendations
  createdAt: Date; // Creation timestamp
}
```

**Database Fields**:

- `id` (text, primary key)
- `child_id` (text, foreign key → children.id, not null)
- `answers` (jsonb, not null) - Quiz answers as JSON
- `recommendations` (jsonb, nullable) - AI recommendations as JSON
- `created_at` (timestamp)

**Relationships**:

- Many-to-one with `children`

**Input Types**:

```typescript
interface CreateQuizInput {
  childId: string;
  answers: QuizAnswers;
}
```

**Usage**:

- Quiz submission flow
- Quiz results display
- Sport recommendations
- Child profile history

---

### 6. Booking (Inquiry/Appointment)

**Type**: `Booking` from `modules/bookings/bookings.types.ts`  
**Database Table**: `bookings`

**Description**: Represents a booking for a club trial or doctor consultation.

```typescript
interface Booking {
  id: string; // UUID primary key
  userId: string; // Foreign key to users.id (parent)
  childId?: string; // Foreign key to children.id (optional)
  type: BookingType; // Booking type
  status: BookingStatus; // Booking status
  entityId: string; // Club ID or Doctor ID
  entityType: "club" | "doctor"; // Entity type
  scheduledAt: Date; // Scheduled date/time
  notes?: string; // Additional notes
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}

type BookingType = "club_trial" | "doctor_consultation";
type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
```

**Database Fields**:

- `id` (text, primary key)
- `parent_id` (text, foreign key → users.id, not null)
- `child_id` (text, foreign key → children.id, nullable)
- `club_id` (text, foreign key → clubs.id, nullable)
- `doctor_id` (text, foreign key → doctors.id, nullable)
- `type` (text, not null) - "club_trial" or "doctor_consultation"
- `status` (enum, default: "pending")
- `scheduled_at` (timestamp, nullable)
- `notes` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Relationships**:

- Many-to-one with `users` (parent)
- Many-to-one with `children` (optional)
- Many-to-one with `clubs` (if type is "club_trial")
- Many-to-one with `doctors` (if type is "doctor_consultation")

**Input Types**:

```typescript
interface CreateBookingInput {
  userId: string;
  childId?: string;
  type: BookingType;
  entityId: string; // Club ID or Doctor ID
  entityType: "club" | "doctor";
  scheduledAt: Date;
  notes?: string;
}

interface UpdateBookingInput {
  scheduledAt?: Date;
  notes?: string;
  status?: BookingStatus;
}
```

**Usage**:

- Booking creation flow
- Booking management
- Booking history
- Email notifications

---

### 7. Favorite

**Type**: `Favorite` from `modules/favorites/favorites.types.ts`  
**Database Table**: `favorites`

**Description**: Represents a saved club or doctor in a user's favorites.

```typescript
interface Favorite {
  id: string; // UUID primary key
  userId: string; // Foreign key to users.id
  entityId: string; // Club ID or Doctor ID
  entityType: "club" | "doctor"; // Entity type
  createdAt: Date; // Creation timestamp
}
```

**Database Fields**:

- `id` (text, primary key)
- `user_id` (text, foreign key → users.id, not null)
- `club_id` (text, foreign key → clubs.id, nullable)
- `doctor_id` (text, foreign key → doctors.id, nullable)
- `created_at` (timestamp)

**Relationships**:

- Many-to-one with `users`
- Many-to-one with `clubs` (if entityType is "club")
- Many-to-one with `doctors` (if entityType is "doctor")

**Input Types**:

```typescript
interface CreateFavoriteInput {
  userId: string;
  entityId: string; // Club ID or Doctor ID
  entityType: "club" | "doctor";
}
```

**Usage**:

- Favorites management
- Favorites listing
- Quick access to saved clubs/doctors

---

### 8. Review

**Type**: Not yet defined in TypeScript (database only)  
**Database Table**: `reviews`

**Description**: Represents a review/rating for a club or doctor.

**Database Fields**:

- `id` (text, primary key)
- `user_id` (text, foreign key → users.id, not null)
- `club_id` (text, foreign key → clubs.id, nullable)
- `doctor_id` (text, foreign key → doctors.id, nullable)
- `rating` (integer, not null) - Rating 1-5
- `comment` (text, nullable) - Review text
- `moderated` (boolean, default: false) - Moderation status
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Relationships**:

- Many-to-one with `users` (reviewer)
- Many-to-one with `clubs` (if reviewing a club)
- Many-to-one with `doctors` (if reviewing a doctor)

**Usage**:

- Review submission
- Review display on club/doctor pages
- Review moderation

---

## Data Relationships

### Entity Relationship Diagram

```
users (1) ──→ (many) children
children (1) ──→ (many) quizzes
users (1) ──→ (many) bookings
children (1) ──→ (many) bookings
clubs (1) ──→ (many) bookings
doctors (1) ──→ (many) bookings
users (1) ──→ (many) favorites
clubs (1) ──→ (many) favorites
doctors (1) ──→ (many) favorites
users (1) ──→ (many) reviews
clubs (1) ──→ (many) reviews
doctors (1) ──→ (many) reviews
users (1) ──→ (1) doctors (optional, if doctor has user account)
```

### Key Relationships

1. **User → Children**: One parent can have multiple children
2. **Child → Quizzes**: One child can have multiple quiz submissions
3. **User → Bookings**: One parent can have multiple bookings
4. **Club/Doctor → Bookings**: One club/doctor can have multiple bookings
5. **User → Favorites**: One user can save multiple clubs/doctors
6. **Club/Doctor → Reviews**: One club/doctor can have multiple reviews

---

## Enums

### UserRole

```typescript
type UserRole = "parent" | "club_admin" | "doctor" | "admin";
```

**Database Enum**: `user_role`

**Values**:

- `"parent"` - Parent user (default)
- `"club_admin"` - Club administrator
- `"doctor"` - Doctor user
- `"admin"` - Platform administrator

### BookingStatus

```typescript
type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
```

**Database Enum**: `booking_status`

**Values**:

- `"pending"` - Awaiting confirmation (default)
- `"confirmed"` - Confirmed by club/doctor
- `"cancelled"` - Cancelled by user or club/doctor
- `"completed"` - Booking completed

### BookingType

```typescript
type BookingType = "club_trial" | "doctor_consultation";
```

**Values**:

- `"club_trial"` - Trial session at a sports club
- `"doctor_consultation"` - Consultation with a pediatric specialist

### DoctorSpecialty

```typescript
type DoctorSpecialty = "orthopedist" | "nutritionist" | "psychologist" | "general";
```

**Values**:

- `"orthopedist"` - Ortopedie pediatrică
- `"nutritionist"` - Nutriție pediatrică
- `"psychologist"` - Psihologie sportivă
- `"general"` - Medicină sportivă pediatrică

---

## Field Conventions

### Identifiers

- **Primary Keys**: All use `string` (UUID format)
- **Foreign Keys**: Reference other entities by `id`
- **Slugs**: URL-friendly identifiers for SEO (clubs, doctors, sports)

### Timestamps

- **createdAt**: Automatic timestamp on creation
- **updatedAt**: Automatic timestamp on update
- **Format**: JavaScript `Date` objects in TypeScript, PostgreSQL `timestamp` in database

### Optional Fields

- Fields marked with `?` in TypeScript are optional/nullable
- Use `undefined` or `null` to represent missing values
- Database nullable fields use `nullable()` in Drizzle schema

### JSON Fields

- **Quiz Answers**: Stored as JSONB in `quizzes.answers`
- **Quiz Recommendations**: Stored as JSONB in `quizzes.recommendations`
- **Flexible Data**: Use JSONB for structured but flexible data

---

## Usage Examples

### Creating a Child Profile

```typescript
import type { CreateChildInput } from "@/modules/children/children.types";

const childData: CreateChildInput = {
  parentId: "user-uuid",
  firstName: "Maria",
  lastName: "Popescu",
  dateOfBirth: new Date("2018-05-15"),
  gender: "female",
};
```

### Creating a Quiz Submission

```typescript
import type { CreateQuizInput } from "@/modules/quiz/quiz.types";

const quizData: CreateQuizInput = {
  childId: "child-uuid",
  answers: {
    age: 6,
    energyLevel: "high",
    personality: ["outgoing", "competitive"],
    interests: ["fotbal", "baschet"],
    physicalBuild: "athletic",
    previousSports: ["fotbal"],
    preferences: {
      indoor: false,
      outdoor: true,
      team: true,
      individual: false,
    },
  },
};
```

### Creating a Booking

```typescript
import type { CreateBookingInput } from "@/modules/bookings/bookings.types";

const bookingData: CreateBookingInput = {
  userId: "user-uuid",
  childId: "child-uuid",
  type: "club_trial",
  entityId: "club-uuid",
  entityType: "club",
  scheduledAt: new Date("2024-12-20T17:00:00"),
  notes: "Interesat de proba gratuita",
};
```

### Using Club Data in Components

```typescript
import type { Club } from "@/modules/clubs/clubs.types";

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <div>
      <h3>{club.name}</h3>
      <p>{club.description}</p>
      <p>Sport: {club.sportName}</p>
      <p>Locație: {club.location.city}, {club.location.address}</p>
      {club.verified && <span>Verificat</span>}
      {club.pricing && (
        <p>
          Preț: {club.pricing.amount} {club.pricing.currency}/
          {club.pricing.type === "monthly" ? "lună" :
           club.pricing.type === "per_class" ? "ședință" : "semestru"}
        </p>
      )}
    </div>
  );
}
```

---

## Common Patterns

### Accessing Related Data

**Parent with Children**:

```typescript
const parent = await getUserById(userId);
const children = await getChildrenByParentId(userId);
```

**Child with Quiz History**:

```typescript
const child = await getChildById(childId);
const quizzes = await getQuizzesByChildId(childId);
```

**Club with Bookings**:

```typescript
const club = await getClubById(clubId);
const bookings = await getBookingsByClubId(clubId);
```

### Search Patterns

**Club Search**:

```typescript
import type { ClubSearchFilters, ClubSearchResult } from "@/modules/clubs/clubs.types";

const filters: ClubSearchFilters = {
  sportId: "fotbal",
  city: "București",
  age: 6,
  verified: true,
  page: 1,
  pageSize: 20,
};

const results: ClubSearchResult = await searchClubs(filters);
```

**Doctor Search**:

```typescript
import type { DoctorSearchFilters, DoctorSearchResult } from "@/modules/doctors/doctors.types";

const filters: DoctorSearchFilters = {
  specialty: "orthopedist",
  city: "București",
  verified: true,
};

const results: DoctorSearchResult = await searchDoctors(filters);
```

---

## Validation

All data models have corresponding Zod validation schemas in `lib/validations/`.

**Example**:

```typescript
import { z } from "zod";

const createChildSchema = z.object({
  parentId: z.string().uuid(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.date(),
  gender: z.enum(["male", "female", "other"]),
});
```

---

## Database vs TypeScript Differences

### Normalized vs Denormalized

**Database** (Normalized):

- Separate fields: `first_name`, `last_name`, `city`, `address`
- Flat structure for easier querying

**TypeScript** (Denormalized):

- Nested objects: `location: { city, address, coordinates }`
- Computed fields: `slug`, `sportName`, `age`
- Better for component usage

**Mapping**: Service layer handles conversion between database schema and TypeScript interfaces.

---

## References

- **Database Schema**: `src/lib/db/schema.ts` - Drizzle ORM schema definitions
- **Type Definitions**: `src/modules/*/types.ts` - TypeScript interfaces
- **Validation Schemas**: `src/lib/validations/` - Zod validation schemas
- **Database README**: `src/lib/db/README.md` - Database setup and usage

---

## Summary

This data models guide ensures:

- ✅ **Type Safety**: All models use TypeScript interfaces
- ✅ **Consistency**: Consistent naming and structure
- ✅ **Relationships**: Clear understanding of entity relationships
- ✅ **Usage**: Examples for common operations
- ✅ **Validation**: Zod schemas for data validation

**Always reference this guide and the type definitions when working with data in the Yuvoo platform.**
