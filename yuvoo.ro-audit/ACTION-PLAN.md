# Plan de acțiune SEO / GEO / AEO — Yuvoo

Prioritizat după impact × efort. **Fără implementare în această rundă** — fișierele țintă sunt indicate pentru fiecare acțiune.

---

## Faza 1: Critical Fixes (Săptămâna 1)

| #   | Acțiune                                                                             | Severitate | Fișiere                                                                                                                                                    | Efort | KPI succes                                        |
| --- | ----------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------- |
| 1.1 | Aliniază domeniul preferat la **www** (sau redirect www→apex și servește doar apex) | Critical   | `NEXT_PUBLIC_APP_URL` Vercel, [robots.ts](src/app/robots.ts), [sitemap.ts](src/app/sitemap.ts), [layout.tsx](src/app/layout.tsx), toate `generateMetadata` | 2-4h  | GSC: un singur host indexat; canonical = URL live |
| 1.2 | Mută OrganizationSchema la **server component**                                     | High       | [OrganizationSchema.tsx](src/components/SEO/OrganizationSchema.tsx), [layout.tsx](src/app/layout.tsx)                                                      | 1-2h  | JSON-LD vizibil în view-source homepage           |
| 1.3 | Revizuiește `Disallow: /_next/` — permite Googlebot-Image sau elimină regula        | High       | [robots.ts](src/app/robots.ts)                                                                                                                             | 30min | Rich Results Test: rendering OK                   |
| 1.4 | Corectează claim „toate cluburile verificate" pe pagini locație                     | High       | [cluburi/locatie/[location]/page.tsx](<src/app/(public)/cluburi/locatie/[location]/page.tsx>)                                                              | 30min | Copy aliniat cu filtre reale                      |
| 1.5 | Elimină `/cautare` și `/dezabonare` din sitemap                                     | Medium     | [sitemap.ts](src/app/sitemap.ts)                                                                                                                           | 15min | 0 URL-uri noindex în sitemap                      |

---

## Faza 2: High-Impact Improvements (Săptămâni 2-3)

| #   | Acțiune                                                                                 | Severitate | Fișiere                                                                                                                                                                                                    | Efort    | KPI succes                                   |
| --- | --------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------- |
| 2.1 | Deschide crawleri AI search (GPTBot, PerplexityBot, ClaudeBot); păstrează CCBot blocked | High       | [robots.ts](src/app/robots.ts)                                                                                                                                                                             | 30min    | robots.txt allow AI search bots              |
| 2.2 | Adaugă disclaimer YMYL pe doctor/sport detail + FAQ health                              | High       | [DoctorDetailsMain.tsx](src/components/features/doctors/DoctorDetailsMain.tsx), [SportContentExpanded.tsx](src/components/features/sports/SportContentExpanded.tsx), [faq-data.tsx](src/data/faq-data.tsx) | 3-4h     | Disclaimer vizibil above fold pe pagini YMYL |
| 2.3 | Consolidează schema doctor (un singur Physician graph)                                  | High       | [MedicalBusinessSchema.tsx](src/components/SEO/MedicalBusinessSchema.tsx), [PersonSchema.tsx](src/components/SEO/PersonSchema.tsx)                                                                         | 2h       | Rich Results Test: 0 erori duplicate         |
| 2.4 | Enrich pagini locație (copy unic, stats, cross-links sectoare)                          | High       | [cluburi/locatie/[location]/page.tsx](<src/app/(public)/cluburi/locatie/[location]/page.tsx>)                                                                                                              | 1-2 zile | Min 500 cuvinte unice/locație                |
| 2.5 | Completează metadata `/cluburi` (OG, twitter, keywords)                                 | Medium     | [cluburi/page.tsx](<src/app/(public)/cluburi/page.tsx>)                                                                                                                                                    | 1h       | Paritate cu /sporturi                        |
| 2.6 | Link club city → location hub; club → doctori relevanți                                 | Medium     | [ClubDetailsMain.tsx](src/components/features/clubs/ClubDetailsMain.tsx)                                                                                                                                   | 2-3h     | Internal links per guidelines                |
| 2.7 | Adaugă bloc definitoriu AEO pe homepage + chestionar                                    | Medium     | [page.tsx](<src/app/(public)/page.tsx>), [chestionar/page.tsx](<src/app/(public)/chestionar/page.tsx>)                                                                                                     | 2h       | „Yuvoo este..." în primele 60 cuvinte        |
| 2.8 | Fix `lastModified` sitemap — date reale per tip pagină                                  | Medium     | [sitemap.ts](src/app/sitemap.ts)                                                                                                                                                                           | 1h       | lastmod ≠ now pe pagini statice              |

---

## Faza 3: Content & Authority (Luna 2)

| #   | Acțiune                                                      | Severitate | Fișiere                                                               | Efort   | KPI succes                               |
| --- | ------------------------------------------------------------ | ---------- | --------------------------------------------------------------------- | ------- | ---------------------------------------- |
| 3.1 | Landing pages ghid: „sport copii 6 ani", „ce sport la 8 ani" | High       | Pagini noi în `(public)/`                                             | 1 săpt  | Ranking top 20 pe long-tail              |
| 3.2 | Creează `/llms.txt` (opțional, non-Google)                   | Low        | `public/llms.txt`                                                     | 1h      | 200 OK, structură validă                 |
| 3.3 | WebSite + SearchAction schema                                | Medium     | Componentă nouă SEO                                                   | 2h      | Schema valid în Rich Results Test        |
| 3.4 | AggregateRating schema pe cluburi cu review-uri              | Medium     | [LocalBusinessSchema.tsx](src/components/SEO/LocalBusinessSchema.tsx) | 1 zi    | Rich snippets stars (dacă eligibil)      |
| 3.5 | Actualizează [SEO_GUIDELINES.md](docs/SEO_GUIDELINES.md)     | Low        | docs/                                                                 | 2h      | FAQ rich results status, location routes |
| 3.6 | Brand building: Wikipedia/Wikidata, YouTube, Reddit presence | High       | Off-site                                                              | Ongoing | Brand mentions în AI citations           |
| 3.7 | ArticleSchema: date reale, author expert, full articleBody   | Medium     | [ArticleSchema.tsx](src/components/SEO/ArticleSchema.tsx)             | 2h      | Freshness signals                        |
| 3.8 | GBP listing + NAP audit extern                               | High       | Off-site                                                              | 1 zi    | GBP verified, consistent NAP             |

---

## Faza 4: Monitoring & Iteration (Ongoing)

| #   | Acțiune                                    | Tool                          | Frecvență   |
| --- | ------------------------------------------ | ----------------------------- | ----------- |
| 4.1 | GSC: index coverage, canonical conflicts   | Google Search Console         | Săptămânal  |
| 4.2 | CrUX / Lighthouse CWV                      | PageSpeed Insights            | Lunar       |
| 4.3 | AI visibility spot-check (10 query-uri RO) | Manual / OtterlyAI            | Lunar       |
| 4.4 | Sitemap vs crawl diff                      | Screaming Frog / script       | Lunar       |
| 4.5 | SEO drift baseline                         | `seo drift baseline yuvoo.ro` | Trimestrial |
| 4.6 | PostHog: organic landing → quiz conversion | PostHog                       | Săptămânal  |

---

## Dependențe

```
1.1 (www fix) ──→ 2.1 (AI crawlers) ──→ 3.2 (llms.txt)
1.2 (Org schema) ──→ 3.3 (WebSite schema)
2.4 (location content) ──→ 3.1 (ghid landing pages)
3.6 (brand off-site) ──→ AI citations (long-term)
```

---

## Estimare efort total

| Fază   | Efort   | Impact SEO  | Impact GEO/AEO |
| ------ | ------- | ----------- | -------------- |
| Faza 1 | ~1 zi   | +12-15 pts  | +3 pts         |
| Faza 2 | ~1 săpt | +8-10 pts   | +15-20 pts     |
| Faza 3 | ~1 lună | +5-8 pts    | +10-15 pts     |
| Faza 4 | Ongoing | Stabilizare | Măsurare       |

**Scor țintă după Faza 1+2:** SEO ~75, GEO ~55, AEO ~48
