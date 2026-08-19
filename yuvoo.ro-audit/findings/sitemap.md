# Sitemap Findings

## Summary

- **Total URLs:** 888
- **Host in sitemap:** `https://yuvoo.ro` (non-www)
- **Live preferred host:** `https://www.yuvoo.ro`
- **Generation:** Dynamic (`force-dynamic` + DB queries)

## Issues

### SM-001: All URLs use non-www (Critical — linked to T-001)

### SM-002: Static pages have lastModified: now on every generation

### SM-003: /cautare included (noindex page)

### SM-004: /dezabonare included (noindex page)

### SM-005: force-dynamic creates DB dependency for sitemap availability

## Positive

- Club pages use real updatedAt for lastModified ✅
- Dynamic sports, clubs, doctors, locations all included ✅
- Under 50k URL limit (888) ✅
- Referenced in robots.txt ✅

## Coverage vs Routes

| Route type          | In sitemap | In robots allow    |
| ------------------- | ---------- | ------------------ |
| Static public pages | ✅         | ✅                 |
| Sport detail        | ✅         | ✅ (via /sporturi) |
| Club detail         | ✅         | ✅ (via /cluburi)  |
| Doctor detail       | ✅         | ✅ (via /doctori)  |
| Location pages      | ✅         | ✅ (via /cluburi)  |
| B2B landing pages   | ✅         | ✅                 |
| /parteneri          | ❌ (404)   | ❌                 |
| Quiz internals      | ❌         | ❌ (correct)       |
