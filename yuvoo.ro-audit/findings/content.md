# Content & E-E-A-T Findings

## High

### C-001: Missing medical disclaimer on doctor profiles

- **Severity:** High (YMYL)
- **Page:** `/doctori/[slug]`
- **Recommendation:** Add disclaimer similar to AITransparencyDisclaimer

### C-002: Missing health disclaimer on sport detail pages

- **Severity:** High (YMYL)
- **Page:** `/sporturi/[slug]`
- **Recommendation:** „Informațiile nu constituie sfat medical"

### C-003: False claim „toate cluburile sunt verificate"

- **Severity:** High (trust)
- **Page:** `/cluburi/locatie/[location]`
- **Evidence:** Metadata says verified; clubs in DB have `verified: false`

### C-004: Location pages thin content

- **Severity:** High
- **Evidence:** ~2 sentences + club grid; no city-specific stats or guides
- **Recommendation:** Min 500 unique words per location page

## Medium

### C-005: FAQ health answers lack medical disclaimer

### C-006: About page team/partners sections commented out

### C-007: Article schema author is Organization only (no expert)

### C-008: Sport internal links use query params not location hubs

## Low / Positive

### C-P01: 28 sports with expanded unique content ✅

### C-P02: FAQ hub with 35+ items and internal links ✅

### C-P03: Quiz results AI transparency disclaimer ✅

### C-P04: Legal pages complete (GDPR, cookies, terms) ✅
