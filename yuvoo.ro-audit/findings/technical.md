# Technical SEO Findings

## Critical

### T-001: www vs non-www canonical mismatch

- **Severity:** Critical
- **Evidence:** Live redirect 307 `yuvoo.ro` → `www.yuvoo.ro`. Canonical homepage: `https://yuvoo.ro`. Sitemap: 888 URLs all `https://yuvoo.ro`. robots.txt Host: `https://yuvoo.ro`
- **Files:** [src/app/robots.ts](../src/app/robots.ts), [src/app/sitemap.ts](../src/app/sitemap.ts), [src/app/layout.tsx](../src/app/layout.tsx)
- **Recommendation:** Set `NEXT_PUBLIC_APP_URL=https://www.yuvoo.ro` in Vercel production env

## High

### T-002: /\_next/ disallowed in robots.txt

- **Severity:** High
- **Evidence:** `Disallow: /_next/` in commonDisallow array
- **Recommendation:** Remove or add exception for Googlebot static assets

### T-003: Disallow /_?_ blocks filtered listing URLs

- **Severity:** High
- **Evidence:** robots.ts L69; `/cluburi?cityId=...` blocked
- **Recommendation:** Acceptable if canonicals correct; verify canonical on filtered views

### T-004: Organization JSON-LD client-side only

- **Severity:** High (cross-category with schema)
- **Evidence:** 0 `application/ld+json` in homepage initial HTML
- **Recommendation:** Server-render Organization schema

## Medium

### T-005: /cautare allowed in robots but noindex

### T-006: Trailing slash duplicates (skipTrailingSlashRedirect)

### T-007: vercel.json dead rewrites to /api/robots, /api/sitemap

### T-008: No Content-Security-Policy header

### T-009: sitemap lastModified: now on all static pages

### T-010: Noindex pages in sitemap (/cautare, /dezabonare)

## Low

### T-011: AI crawlers blocked (intentional but hurts GEO)

### T-012: PerplexityBot, Google-Extended not explicitly ruled

### T-013: hreflang not needed (RO-only) — OK

### T-014: Legacy English routes 404 (/clubs, /parteneri)
