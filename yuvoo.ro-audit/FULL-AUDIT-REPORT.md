# Audit SEO, GEO și AEO — Yuvoo

**Domeniu:** https://www.yuvoo.ro (redirect 307 de la yuvoo.ro)  
**Data auditului:** 19 august 2026  
**Tip business:** Marketplace local hibrid (cluburi, doctori, quiz AI) — YMYL copii/sănătate  
**Limba:** Română (RO-only)  
**Limitări:** Fără acces GSC/GA4; teste AI punctuale (15 query-uri); PageSpeed API indisponibil

---

## Rezumat executiv

| Metrică              | Scor         |
| -------------------- | ------------ |
| **SEO Health Score** | **62 / 100** |
| **GEO Readiness**    | **41 / 100** |
| **AEO Readiness**    | **32 / 100** |

Yuvoo are o **fundamentă SEO solidă** (rute RO, metadata API, sitemap dinamic cu 888 URL-uri, schema LocalBusiness/ItemList server-side, FAQ hub, conținut extins pe paginile de sport). Problema dominantă este **deconectarea domeniului preferat**: traficul live merge pe `www.yuvoo.ro`, dar canonicals, sitemap și robots.txt declară `yuvoo.ro`. Al doilea blocaj major este **vizibilitatea zero în AI search**: crawleri AI blocați, brand necunoscut în SERP/AIO, zero citări în testele live.

### Top 5 probleme critice / high

1. **Mismatch www vs non-www** — canonicals/sitemap/robots pe apex, live pe www (Critical)
2. **Crawleri AI blocați** — GPTBot, Claude, CCBot disallow `/` (High pentru GEO/AEO)
3. **Organization schema client-side** — JSON-LD injectat via `useEffect`, invizibil fără JS (High)
4. **Pagini locație thin + claim fals „toate verificate"** — risc thin content + trust YMYL (High)
5. **Zero vizibilitate brand în AI/SERP** — Yuvoo absent din top rezultate pe query-uri core (High)

### Top 5 quick wins

1. Setează `NEXT_PUBLIC_APP_URL=https://www.yuvoo.ro` în Vercel + aliniază canonicals/sitemap/robots
2. Permite GPTBot, PerplexityBot, ClaudeBot în robots.txt (păstrează blocarea CCBot dacă doriți)
3. Mută OrganizationSchema la server component (pattern LocalBusinessSchema)
4. Elimină `/cautare` și `/dezabonare` din sitemap; corectează claim „verificate" pe pagini locație
5. Adaugă bloc definitoriu 40–60 cuvinte pe homepage și `/chestionar` („Yuvoo este...")

---

## Scoruri pe categorii

| Categorie                | Scor | Pondere | Contribuție |
| ------------------------ | ---- | ------- | ----------- |
| Technical SEO            | 62   | 22%     | 13.6        |
| Content Quality          | 68   | 23%     | 15.6        |
| On-Page SEO              | 72   | 20%     | 14.4        |
| Schema / Structured Data | 58   | 10%     | 5.8         |
| Performance (CWV)        | 65   | 10%     | 6.5         |
| AI Search Readiness      | 28   | 10%     | 2.8         |
| Images                   | 70   | 5%      | 3.5         |
| **Total**                |      |         | **62**      |

---

## 1. Technical SEO (62/100)

### Ce funcționează

- `robots.txt` generat dinamic, blochează corect rute auth/onboarding/quiz intern
- `lang="ro"`, `og:locale=ro_RO`, metadata API Next.js pe pagini publice
- HSTS (`max-age=63072000`), X-Frame-Options DENY, nosniff
- Quiz funnel privat corect noindex/disallow (rezultate, paywall, teaser)
- Server Components + `"use cache"` pe club/sport detail

### Probleme

| Severitate   | Finding                                              | Evidență                                                                                                    |
| ------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Critical** | www vs non-www split                                 | Live: 307 yuvoo.ro → www. Canonical: `https://yuvoo.ro`. Sitemap: 888 URL-uri non-www. robots Host: non-www |
| **High**     | `Disallow: /_next/`                                  | [src/app/robots.ts](src/app/robots.ts) L62 — poate afecta rendering JS                                      |
| **High**     | `Disallow: /*?*` agresiv                             | L69 — blochează URL-uri filtrate legitime                                                                   |
| **Medium**   | `/cautare` allowed în robots dar noindex             | robots L91 vs [cautare/layout.tsx](<src/app/(public)/cautare/layout.tsx>)                                   |
| **Medium**   | Trailing slash duplicates                            | `skipTrailingSlashRedirect: true` — `/cluburi` și `/cluburi/` ambele 200                                    |
| **Medium**   | vercel.json rewrites moarte                          | `/api/robots`, `/api/sitemap` → 404                                                                         |
| **Low**      | PerplexityBot, Google-Extended fără reguli explicite | Lipsesc din robots.ts                                                                                       |

---

## 2. Content Quality & E-E-A-T (68/100)

### Ce funcționează

- 28 sporturi cu conținut extins ([sport-expanded-content.ts](src/data/sport-expanded-content.ts))
- FAQ hub cu 35+ întrebări și linking intern puternic ([faq-data.tsx](src/data/faq-data.tsx))
- AI transparency pe quiz results (AITransparencyDisclaimer)
- Pagini legale complete (GDPR, cookies, termeni)

### Probleme

| Severitate | Finding                                                             | Evidență                                                                                                                              |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **High**   | Disclaimer medical lipsă pe `/doctori/[slug]` și `/sporturi/[slug]` | YMYL copii/sănătate                                                                                                                   |
| **High**   | Claim „Toate cluburile sunt verificate" pe pagini locație           | [cluburi/locatie/[location]/page.tsx](<src/app/(public)/cluburi/locatie/[location]/page.tsx>) L87-89; cluburi `verified: false` în DB |
| **High**   | Pagini locație thin (~2 propoziții + grid)                          | Risc programmatic SEO                                                                                                                 |
| **Medium** | About page — secțiuni echipă/parteneri comentate                    | [despre-noi/page.tsx](<src/app/(public)/despre-noi/page.tsx>)                                                                         |
| **Medium** | FAQ health/AI fără disclaimer „nu înlocuiește sfatul medical"       | [faq-data.tsx](src/data/faq-data.tsx)                                                                                                 |

---

## 3. On-Page SEO (72/100)

### Ce funcționează

- Title/description/OG/twitter pe homepage, chestionar, sporturi, club detail
- Keywords RO relevante pe homepage
- Canonical pe majoritatea paginilor
- Breadcrumb H1 pattern consistent

### Probleme

| Severitate | Finding                                                | Evidență                                                |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------- |
| **Medium** | `/cluburi` listing — metadata minimă (fără OG/twitter) | [cluburi/page.tsx](<src/app/(public)/cluburi/page.tsx>) |
| **Medium** | Canonical mix relativ/absolut                          | layout vs page.tsx                                      |
| **Medium** | Titluri lungi pe club/doctor detail (>60 chars)        | club-metadata.ts, doctor-metadata.ts                    |
| **Medium** | Duplicate H1 pe FAQ page                               | breadcrumb + section title                              |
| **Low**    | keywords meta pe toate paginile (ignorat de Google)    | Informativ                                              |

---

## 4. Schema & Structured Data (58/100)

### Ce funcționează

- LocalBusinessSchema server-side pe club detail
- ItemListSchema + BreadcrumbList pe listing/locație
- ArticleSchema pe sport detail (2× JSON-LD în HTML initial pe /sporturi/fotbal)
- FAQPageSchema aliniat cu conținut FAQ (35 items)

### Probleme

| Severitate | Finding                                      | Evidență                                                                                                 |
| ---------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **High**   | OrganizationSchema client-side               | [OrganizationSchema.tsx](src/components/SEO/OrganizationSchema.tsx) — 0 JSON-LD în HTML initial homepage |
| **High**   | Duplicate schema doctor (Physician + Person) | [doctori/[slug]/page.tsx](<src/app/(public)/doctori/[slug]/page.tsx>)                                    |
| **High**   | PersonSchema `worksFor: Yuvoo` incorect      | Doctori independenți                                                                                     |
| **Medium** | FAQPage — rich results retrase mai 2026      | Info, nu Critical                                                                                        |
| **Medium** | ArticleSchema date statice 2024-01-01        | ArticleSchema.tsx                                                                                        |
| **Medium** | priceRange `$` pentru RON                    | LocalBusinessSchema.tsx                                                                                  |
| **Medium** | Lipsă WebSite/SearchAction, AggregateRating  | Guidelines gap                                                                                           |

---

## 5. Performance (65/100 — estimat)

PageSpeed API indisponibil. Observații din HTML live:

- 15+ script chunks pe pagină (PostHog, Stack Auth, Redux, Swiper)
- RSC streaming — H1 uneori absent din primul chunk HTML
- CSS split în 5 fișiere
- `"use cache"` pe pagini detail — pozitiv
- Font preload (Gabarito woff2) — pozitiv

**Recomandare:** Rulați Lighthouse manual pe homepage mobile + club detail.

---

## 6. AI Search Readiness (28/100)

| Check                                       | Status                                               |
| ------------------------------------------- | ---------------------------------------------------- |
| AI crawlers allowed                         | ❌ GPTBot, ChatGPT-User, anthropic-ai, CCBot blocked |
| llms.txt                                    | ❌ 404                                               |
| Organization JSON-LD in HTML                | ❌ Client-side only                                  |
| Self-contained answer blocks                | ⚠️ Parțial (sport pages, FAQ)                        |
| Brand mentions (Wikipedia, Reddit, YouTube) | ❌ Zero detectat                                     |
| Live AI citations (15 queries)              | ❌ 0/15                                              |

---

## 7. Images (70/100)

- OG image configurat (`/assets/img/logo/og-image.jpg`)
- Placeholder sport images (`/assets/img/sports/*.jpg`) pe cluburi fără logo
- Schema `image` uneori relative paths (non-absolute)
- Lazy loading Next/Image pe componente club — pozitiv

---

## 8. Local SEO (55/100)

- Pagini locație programmatic (`/cluburi/locatie/bucuresti-sector-3`) — 888 sitemap include locații
- LocalBusiness schema cu adresă, geo, program
- **Lipsă:** GBP listing verificat, NAP consistency audit extern, cross-link între sectoare
- **Lipsă:** Link club detail → location hub (city ca text, nu link)
- SERP „cluburi sport copii bucuresti" dominat de cluburi individuale (Pelicanii, Raiders, Total Sport), nu directoare

---

## 9. SXO — Page-Type Mismatch

| Query                              | SERP dominant                               | Yuvoo page-type         | Match?                                               |
| ---------------------------------- | ------------------------------------------- | ----------------------- | ---------------------------------------------------- |
| ce sport i se potriveste copilului | Ghid editorial (sfaturiparinti, copilul.ro) | /chestionar (tool/quiz) | ⚠️ Parțial — quiz e diferențiator dar SERP vrea ghid |
| cluburi sport copii bucuresti      | Club individual / școală sport              | /cluburi (director)     | ✅ OK                                                |
| cluburi fotbal copii bucuresti     | Școli fotbal (Raiders, Astra Kids)          | /cluburi?sport=fotbal   | ✅ OK                                                |
| sport copii 6 ani                  | Ghid editorial + tabel vârstă               | /sporturi (director)    | ⚠️ Lipsește landing „sport copii 6 ani"              |
| specialist pediatru sport          | Clinici/doctori individuali                 | /doctori (director)     | ✅ OK                                                |
| Yuvoo                              | —                                           | Homepage                | ❌ Zero rezultate brand                              |

**Insight SXO:** Yuvoo ar beneficia de **pagini ghid** (nu doar tool) pentru query-uri informaționale top-of-funnel, cu chestionarul ca CTA secundar.

---

## Crawl snapshot

| Metric                          | Valoare                                  |
| ------------------------------- | ---------------------------------------- |
| Sitemap URLs                    | 888                                      |
| Sitemap noindex pages           | 2 (`/cautare`, `/dezabonare`)            |
| llms.txt                        | 404                                      |
| Homepage JSON-LD (initial HTML) | 0                                        |
| /intrebari-frecvente JSON-LD    | 1 (FAQPage)                              |
| /sporturi/fotbal JSON-LD        | 2 (Article + Breadcrumb)                 |
| /cluburi/locatie/... JSON-LD    | 2 (ItemList + Breadcrumb) via RSC stream |

---

## Fișiere de referință

- [src/app/robots.ts](src/app/robots.ts)
- [src/app/sitemap.ts](src/app/sitemap.ts)
- [src/app/layout.tsx](src/app/layout.tsx)
- [src/components/SEO/\*.tsx](src/components/SEO/)
- [docs/SEO_GUIDELINES.md](docs/SEO_GUIDELINES.md)

Vezi și: [ACTION-PLAN.md](ACTION-PLAN.md), [GEO-ANALYSIS.md](GEO-ANALYSIS.md), [AEO-ANALYSIS.md](AEO-ANALYSIS.md), [findings/](findings/)
