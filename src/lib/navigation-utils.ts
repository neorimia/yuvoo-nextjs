/**
 * Navigation Utilities
 *
 * Helper functions for navigation and active state management.
 * Provides more precise active state detection than simple startsWith.
 */

import { routes } from "./routes";

/**
 * Check if a pathname exactly matches a route
 */
export function isExactMatch(pathname: string, route: string): boolean {
  // Remove trailing slashes for comparison
  const normalizedPathname = pathname.replace(/\/$/, "");
  const normalizedRoute = route.replace(/\/$/, "");
  return normalizedPathname === normalizedRoute;
}

/**
 * Check if a pathname is within a route's subdirectory
 * but not the exact route itself
 */
export function isSubRoute(pathname: string, route: string): boolean {
  const normalizedPathname = pathname.replace(/\/$/, "");
  const normalizedRoute = route.replace(/\/$/, "");

  // Must start with route and have additional path segments
  return (
    normalizedPathname.startsWith(normalizedRoute + "/") ||
    normalizedPathname.startsWith(normalizedRoute + "?")
  );
}

/**
 * Check if a menu link should be active
 *
 * For parent menu items with dropdowns:
 * - Active if pathname exactly matches the link
 * - NOT active if pathname is in a subdirectory (e.g., /pentru-cluburi/calculator-roi)
 *
 * For submenu items:
 * - Active if pathname exactly matches the link
 * - Active if pathname is in the submenu's subdirectory
 *
 * Note: This function is kept for potential future use but currently
 * the logic is implemented directly in HeaderMenus and MobileMenu components.
 */
export function _isMenuLinkActive(
  pathname: string,
  menuLink: string,
  submenuLinks?: string[]
): boolean {
  // Exact match always active
  if (isExactMatch(pathname, menuLink)) {
    return true;
  }

  // If submenu links provided, check if any submenu is active
  if (submenuLinks && submenuLinks.length > 0) {
    // Check if any submenu is active
    const anySubmenuActive = submenuLinks.some((subLink) => {
      // Submenu is active if exact match or is sub-route
      return isExactMatch(pathname, subLink) || isSubRoute(pathname, subLink);
    });

    // Parent is active only if exact match AND no submenu is active
    // This prevents parent from being active when on submenu pages
    return isExactMatch(pathname, menuLink) && !anySubmenuActive;
  }

  // For non-dropdown items, only exact match
  return false;
}

/**
 * Check if a submenu link should be active
 */
export function isSubmenuLinkActive(pathname: string, submenuLink: string): boolean {
  // Exact match
  if (isExactMatch(pathname, submenuLink)) {
    return true;
  }

  // Sub-route (e.g., /pentru-cluburi/calculator-roi is sub-route of /pentru-cluburi)
  return isSubRoute(pathname, submenuLink);
}

/**
 * Special handling for Clubs menu
 *
 * The "Cluburi" parent menu should only be active on:
 * - /cluburi (exact match)
 * - NOT on /pentru-cluburi or its sub-routes
 */
export function isClubsMenuActive(pathname: string): boolean {
  return isExactMatch(pathname, routes.clubs.list);
}

/**
 * Check if "Pentru Cluburi" submenu item should be active
 *
 * Active on:
 * - /pentru-cluburi (exact match)
 * - /pentru-cluburi/* (sub-routes like calculator-roi, cum-functioneaza, etc.)
 */
export function isClubsLandingSubmenuActive(pathname: string): boolean {
  const landingRoute = routes.clubs.landing;

  // Exact match
  if (isExactMatch(pathname, landingRoute)) {
    return true;
  }

  // Sub-routes
  return isSubRoute(pathname, landingRoute);
}

/**
 * Special handling for Doctors menu
 *
 * The "Doctori" parent menu should only be active on:
 * - /doctori (exact match)
 * - NOT on /pentru-doctori or its sub-routes
 */
export function isDoctorsMenuActive(pathname: string): boolean {
  return isExactMatch(pathname, routes.doctors.list);
}

/**
 * Check if "Pentru Doctori" submenu item should be active
 *
 * Active on:
 * - /pentru-doctori (exact match)
 * - /pentru-doctori/* (sub-routes if any)
 */
export function isDoctorsLandingSubmenuActive(pathname: string): boolean {
  const landingRoute = routes.doctors.landing;

  // Exact match
  if (isExactMatch(pathname, landingRoute)) {
    return true;
  }

  // Sub-routes
  return isSubRoute(pathname, landingRoute);
}
