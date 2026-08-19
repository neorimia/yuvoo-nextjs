# Schema & Structured Data Findings

## High

### S-001: OrganizationSchema client-side injection

- **Severity:** High
- **File:** [src/components/SEO/OrganizationSchema.tsx](../src/components/SEO/OrganizationSchema.tsx)
- **Evidence:** `"use client"` + `useEffect` DOM injection
- **Recommendation:** Convert to server component like LocalBusinessSchema

### S-002: Duplicate doctor schemas

- **Severity:** High
- **File:** [src/app/(public)/doctori/[slug]/page.tsx](<../src/app/(public)/doctori/[slug]/page.tsx>)
- **Evidence:** Both MedicalBusinessSchema and PersonSchema on same URL

### S-003: PersonSchema worksFor Yuvoo inaccurate

- **Severity:** High
- **Recommendation:** Remove worksFor or use affiliation pattern

## Medium

### S-004: FAQPage schema — no rich result benefit (May 2026)

- **Severity:** Info
- **Recommendation:** Keep for structure; don't expect SERP feature

### S-005: ArticleSchema static dates (2024-01-01)

### S-006: ArticleSchema articleBody = intro only

### S-007: priceRange uses $ for RON amounts

### S-008: ItemList only current page items (pagination)

### S-009: Sport page FAQs visible but no FAQPage schema

### S-010: No WebSite/SearchAction schema

### S-011: No AggregateRating despite reviews in data model

## Low / Positive

### S-P01: LocalBusinessSchema server-side ✅

### S-P02: ItemListSchema on listings ✅

### S-P03: BreadcrumbList consistent ✅

### S-P04: FAQ schema matches on-page content ✅
