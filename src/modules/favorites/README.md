# Favorites Module

Saved clubs and doctors business logic.

## Files

- `favorites.service.ts` - Business logic for favorite operations
- `favorites.repository.ts` - Data access for favorite queries
- `favorites.types.ts` - TypeScript types

## Functions

### Service

- `getFavoritesByUserId(userId)` - Get all favorites for user
- `addFavorite(input)` - Add favorite (checks for duplicates)
- `removeFavorite(favoriteId, userId)` - Remove favorite
- `isFavorited(userId, entityId, entityType)` - Check if entity is favorited

### Repository

- `findByUserId(userId)` - Find favorites by user
- `findByUserAndEntity(userId, entityId, entityType)` - Find specific favorite
- `findById(favoriteId)` - Find favorite by ID
- `create(input)` - Create favorite
- `delete(favoriteId)` - Delete favorite

## Usage

```typescript
import { addFavorite, getFavoritesByUserId } from "@/modules/favorites/favorites.service";

// Add favorite
await addFavorite({
  userId: "user-123",
  entityId: "club-456",
  entityType: "club",
});

// Get all favorites
const favorites = await getFavoritesByUserId("user-123");
```
