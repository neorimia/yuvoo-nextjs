# Doctors Module

Pediatric specialist operations and search business logic.

## Files

- `doctors.service.ts` - Business logic for doctor operations
- `doctors.repository.ts` - Data access for doctor queries
- `doctors.search.ts` - Search and filtering logic
- `doctors.types.ts` - TypeScript types

## Functions

### Service

- `getDoctorBySlug(slug)` - Get doctor by slug
- `searchDoctors(filters)` - Search doctors with filters
- `getDoctorsBySpecialty(specialty)` - Get doctors by specialty

### Search

- `search(filters)` - Search with filters, sorting, pagination

### Repository

- `findBySlug(slug)` - Find doctor by slug
- `findBySpecialty(specialty)` - Find doctors by specialty
- `findAll()` - Find all doctors

## Usage

```typescript
import { getDoctorBySlug, searchDoctors } from "@/modules/doctors/doctors.service";

// Get doctor details
const doctor = await getDoctorBySlug("dr-ionescu-ortoped");

// Search doctors
const results = await searchDoctors({
  specialty: "orthopedist",
  city: "București",
  verified: true,
  page: 1,
  pageSize: 20,
});
```
