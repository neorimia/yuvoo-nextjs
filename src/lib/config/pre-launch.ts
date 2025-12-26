/**
 * Pre-Launch Access Control Configuration
 *
 * Controls whether route restrictions are enabled.
 * Default: Enabled until February 1, 2026
 * Override: Set NEXT_PUBLIC_PRE_LAUNCH_RESTRICTIONS_ENABLED=false in .env.local
 */

export const PRE_LAUNCH_DISABLE_DATE = new Date("2026-02-01");

/**
 * Pre-Launch Restrictions Enabled Flag
 *
 * Returns true if restrictions should be enabled.
 * - Default: true (enabled until Feb 1, 2026)
 * - Can be disabled via environment variable: NEXT_PUBLIC_PRE_LAUNCH_RESTRICTIONS_ENABLED=false
 */
export const PRE_LAUNCH_RESTRICTIONS_ENABLED =
  process.env.NEXT_PUBLIC_PRE_LAUNCH_RESTRICTIONS_ENABLED === "false"
    ? false
    : new Date() < PRE_LAUNCH_DISABLE_DATE;
