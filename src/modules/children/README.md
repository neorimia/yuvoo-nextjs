# Children Module

Child profile management business logic.

## Files

- `children.service.ts` - Business logic for child operations
- `children.repository.ts` - Data access for child queries
- `children.types.ts` - TypeScript types

## Functions

### Service

- `getChildrenByParentId(parentId)` - Get all children for a parent
- `getChildById(childId, parentId)` - Get child with ownership verification
- `createChild(input)` - Create new child profile
- `updateChild(childId, parentId, input)` - Update child profile
- `deleteChild(childId, parentId)` - Delete child profile

### Repository

- `findByParentId(parentId)` - Find all children for parent
- `findById(childId)` - Find child by ID
- `create(input)` - Create new child
- `update(childId, input)` - Update child
- `delete(childId)` - Delete child

## Usage

```typescript
import { getChildrenByParentId, createChild } from "@/modules/children/children.service";

const children = await getChildrenByParentId(parentId);
const newChild = await createChild({
  parentId,
  firstName: "Ion",
  lastName: "Popescu",
  dateOfBirth: new Date("2015-05-15"),
  gender: "male",
});
```
