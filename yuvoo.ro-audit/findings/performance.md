# Performance Findings (Estimated)

PageSpeed API was unavailable during audit. Scores are estimated from HTML analysis.

**Estimated Performance Score: 65/100**

## Observations

### P-001: Heavy JavaScript bundle

- 15+ script chunks per page (PostHog, Stack Auth, Redux, Swiper, WOW.js)
- Provider tree: ErrorBoundary → PostHog → StackAuth → Redux → Video

### P-002: RSC streaming delays visible content

- H1 sometimes absent from first HTML chunk on sport/location pages
- Metadata (title, description) present in initial HTML — good for SEO

### P-003: 5 CSS files loaded

- Bootstrap + custom SCSS split across multiple chunks

### P-004: Font preload present

- Gabarito woff2 preloaded — positive

### P-005: "use cache" on detail pages

- cluburi/[slug], sporturi/[slug] use Cache Components — positive

## Recommendations

1. Run Lighthouse on homepage mobile + club detail manually
2. Defer non-critical third-party scripts (PostHog, WOW.js)
3. Consider reducing provider nesting for public pages
4. Monitor WebVitalsReporter data in PostHog

## CWV Thresholds Reference

| Metric | Good   | Needs Improvement | Poor   |
| ------ | ------ | ----------------- | ------ |
| LCP    | ≤2.5s  | ≤4.0s             | >4.0s  |
| INP    | ≤200ms | ≤500ms            | >500ms |
| CLS    | ≤0.1   | ≤0.25             | >0.25  |
