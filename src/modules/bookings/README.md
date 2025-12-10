# Bookings Module

Trial bookings and consultations business logic.

## Files

- `bookings.service.ts` - Business logic for booking operations
- `bookings.repository.ts` - Data access for booking queries
- `bookings.notifications.ts` - Email/SMS notifications
- `bookings.types.ts` - TypeScript types

## Functions

### Service

- `createBooking(input)` - Create new booking
- `getBookingById(bookingId)` - Get booking by ID
- `getBookingsByUserId(userId)` - Get bookings for user
- `cancelBooking(bookingId, userId)` - Cancel booking

### Notifications

- `sendConfirmation(booking)` - Send confirmation email
- `sendCancellation(booking)` - Send cancellation email
- `sendReminder(booking)` - Send reminder email

### Repository

- `create(input)` - Create booking
- `findById(bookingId)` - Find booking by ID
- `findByUserId(userId)` - Find bookings by user
- `cancel(bookingId)` - Cancel booking

## Usage

```typescript
import { createBooking } from "@/modules/bookings/bookings.service";

const booking = await createBooking({
  userId: "user-123",
  childId: "child-456",
  type: "club_trial",
  entityId: "club-789",
  entityType: "club",
  scheduledAt: new Date("2024-06-15T10:00:00"),
  notes: "First trial session",
});
```
