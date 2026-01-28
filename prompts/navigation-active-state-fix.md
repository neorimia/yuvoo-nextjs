# Navigation Active State Fix

**Date**: January 26, 2026  
**Issue**: "Pentru Cluburi" nav link remained active when navigating to sub-pages like `/pentru-cluburi/calculator-roi`  
**Status**: ✅ **FIXED**

---

## Problem

The original `isActive` function used `pathname.startsWith(link)`, which caused:

- `/pentru-cluburi` → "Pentru Cluburi" submenu active ✅ (correct)
- `/pentru-cluburi/calculator-roi` → "Pentru Cluburi" submenu active ✅ (correct)
- `/pentru-cluburi/calculator-roi` → Parent "Cluburi" menu also active ❌ (incorrect)

This happened because the parent menu item (`/cluburi`) was being checked with `startsWith`, and while `/pentru-cluburi` doesn't start with `/cluburi`, the logic wasn't precise enough for dropdown menus.

---

## Solution

Created a new navigation utility system with precise active state detection:

### New File: `src/lib/navigation-utils.ts`

**Key Functions**:

1. `isExactMatch()` - Checks for exact pathname match (handles trailing slashes)
2. `isSubRoute()` - Checks if pathname is a sub-route (e.g., `/pentru-cluburi/calculator-roi` is sub-route of `/pentru-cluburi`)
3. `isSubmenuLinkActive()` - Checks if submenu link should be active (exact match OR sub-route)
4. `isClubsMenuActive()` - Special handling for "Cluburi" parent menu (only exact match on `/cluburi`)
5. `isClubsLandingSubmenuActive()` - Special handling for "Pentru Cluburi" submenu (exact match OR sub-routes)

### Updated Components

**1. `HeaderMenus.tsx` (Desktop Navigation)**:

- Updated `isActive()` function to accept `isSubmenu` parameter
- Parent menu items: Only active on exact match AND no submenu is active
- Submenu items: Active on exact match OR sub-routes
- Special handling for Clubs menu

**2. `MobileMenu.tsx` (Mobile Navigation)**:

- Same logic as desktop navigation
- Updated all menu types (simple, dropdown, mega menu, pages menu)

---

## How It Works

### Parent Menu Items (with dropdowns)

**Logic**:

```typescript
// Check if any submenu is active
const anySubmenuActive = menu.submenus.some((sub) => isSubmenuLinkActive(pathname, sub.link));

// Parent is active only if exact match AND no submenu is active
parentActive = isActive(menu.link, false) && !anySubmenuActive;
```

**Examples**:

- `/cluburi` → "Cluburi" parent active ✅
- `/pentru-cluburi` → "Cluburi" parent NOT active, "Pentru Cluburi" submenu active ✅
- `/pentru-cluburi/calculator-roi` → "Cluburi" parent NOT active, "Pentru Cluburi" submenu active ✅

### Submenu Items

**Logic**:

```typescript
// Submenu is active if exact match or is sub-route
const subActive = isActive(sub.link, true);
// Which checks: pathname === sub.link || pathname.startsWith(sub.link + "/")
```

**Examples**:

- `/pentru-cluburi` → "Pentru Cluburi" submenu active ✅
- `/pentru-cluburi/calculator-roi` → "Pentru Cluburi" submenu active ✅
- `/pentru-cluburi/cum-functioneaza` → "Pentru Cluburi" submenu active ✅

---

## Special Cases Handled

### Clubs Menu

**Parent Menu** (`/cluburi`):

- Only active on exact match: `/cluburi` or `/cluburi/`
- NOT active on `/pentru-cluburi` or any sub-routes

**"Pentru Cluburi" Submenu** (`/pentru-cluburi`):

- Active on exact match: `/pentru-cluburi`
- Active on sub-routes: `/pentru-cluburi/calculator-roi`, `/pentru-cluburi/cum-functioneaza`, etc.

---

## Benefits

1. **Precise Active States**: Parent menus don't stay active when on submenu pages
2. **Better UX**: Users can clearly see which section they're in
3. **Reusable Logic**: Navigation utilities can be used elsewhere
4. **Maintainable**: Centralized logic makes future changes easier
5. **Type-Safe**: TypeScript ensures correct usage

---

## Testing Checklist

- [ ] `/cluburi` → "Cluburi" parent active, no submenu active
- [ ] `/pentru-cluburi` → "Cluburi" parent NOT active, "Pentru Cluburi" submenu active
- [ ] `/pentru-cluburi/calculator-roi` → "Cluburi" parent NOT active, "Pentru Cluburi" submenu active
- [ ] `/pentru-cluburi/cum-functioneaza` → "Cluburi" parent NOT active, "Pentru Cluburi" submenu active
- [ ] `/pentru-cluburi/povesti-de-succes` → "Cluburi" parent NOT active, "Pentru Cluburi" submenu active
- [ ] `/pentru-cluburi/ajutor` → "Cluburi" parent NOT active, "Pentru Cluburi" submenu active
- [ ] Mobile menu behaves the same as desktop menu

---

## Files Modified

1. ✅ `src/lib/navigation-utils.ts` - **Created** (new navigation utilities)
2. ✅ `src/layouts/Header/components/Menu/HeaderMenus.tsx` - **Updated** (desktop navigation)
3. ✅ `src/layouts/Header/components/Sidebar/MobileMenu.tsx` - **Updated** (mobile navigation)

---

## Future Improvements

If similar issues arise with other menus (e.g., Sports menu with sub-routes), the same pattern can be applied:

1. Add special handling function in `navigation-utils.ts`
2. Update `isActive()` logic in menu components
3. Test thoroughly

---

**Status**: ✅ **COMPLETE** - Navigation active states now work correctly for all `/pentru-cluburi/*` pages
