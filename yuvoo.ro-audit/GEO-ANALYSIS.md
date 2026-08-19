# GEO Analysis — Yuvoo

**GEO Readiness Score: 41 / 100**

Google tratează GEO ca SEO de bază aplicat pe suprafețe AI. Acest raport evaluează atât Google AI Overviews/AI Mode, cât și motoare non-Google (ChatGPT, Perplexity, Claude).

---

## Breakdown pe platforme

| Platformă           | Scor estimat | Observații                                             |
| ------------------- | ------------ | ------------------------------------------------------ |
| Google AI Overviews | 45/100       | Fundamentale SEO OK; lipsă ranking pe query-uri core   |
| Google AI Mode      | 40/100       | Freshness slabă (ArticleSchema 2024); brand necunoscut |
| ChatGPT Search      | 15/100       | GPTBot blocked; zero citări în teste                   |
| Perplexity          | 20/100       | Fără regulă explicită; probabil neindexat              |
| Claude              | 10/100       | anthropic-ai blocked                                   |

---

## 1. Citability Score (25%) — 55/100

### Blocuri citabile existente

| Pagină               | Bloc citabil? | Lungime                          | Poziție                               |
| -------------------- | ------------- | -------------------------------- | ------------------------------------- |
| /chestionar          | ⚠️ Parțial    | ~80 cuv intro                    | Mid-page                              |
| /sporturi/fotbal     | ✅ Da         | 134-167+ cuv (beneficii, vârstă) | Mid-page                              |
| /intrebari-frecvente | ✅ Da         | Q&A self-contained               | Full page                             |
| /cluburi/locatie/\*  | ❌ Nu         | ~30 cuv                          | Top — prea scurt                      |
| Homepage             | ⚠️ Parțial    | Value prop scurt                 | Hero — fără definiție „Yuvoo este..." |

### Recomandări citability

1. Adaugă definiție 40-60 cuvinte în primele 30% ale paginii pe homepage, chestionar, sport detail
2. Reformatează FAQ health cu statistici + surse (ex. „Conform OMS, copiii 6-11 ani au nevoie de 60 min activitate fizică/zi")
3. Creează tabele comparative vârstă × sport (model Novakid blog — deja citat de AI)

---

## 2. Structural Readability (20%) — 70/100

### Ce funcționează

- Ierarhie H1→H2→H3 pe sport detail și FAQ
- Liste bullet pe chestionar (beneficii, pași)
- Tabele pe unele pagini sport (echipament, vârstă)
- FAQ format Q&A clar

### Ce lipsește

- Headings question-based („Ce sport pentru copil de 6 ani?")
- Tabele comparative pe homepage
- Conținut locație fără structură FAQ locală

---

## 3. Multi-Modal Content (15%) — 40/100

- Imagini sport generice (placeholder JPG)
- Fără video embedded pe pagini publice SEO
- Fără infografice sau calculatoare publice (ROI calculator e B2B)
- OG image static — OK pentru sharing

**Recomandare:** Video scurt „Cum funcționează chestionarul" pe /chestionar (+156% selection rate conform studii GEO).

---

## 4. Authority & Brand Signals (20%) — 15/100

| Signal                       | Status                                                               |
| ---------------------------- | -------------------------------------------------------------------- |
| Author byline cu credentials | ❌ Organization-only                                                 |
| Publication/update dates     | ⚠️ Statice 2024 pe ArticleSchema                                     |
| Wikipedia/Wikidata           | ❌ Absent                                                            |
| Reddit mentions              | ❌ Absent                                                            |
| YouTube channel              | ❌ Nu detectat în sameAs                                             |
| LinkedIn company             | ⚠️ URL generic în schema (linkedin.com/company/yuvoo — neverificat)  |
| sameAs socials               | ⚠️ facebook.com/yuvoo vs footer facebook.com/yuvooro — inconsistență |

**Insight Ahrefs:** Brand mentions corelează 3× mai puternic cu AI visibility decât backlinks. Yuvoo are **zero prezență brand** în ecosistemul citat de AI.

---

## 5. Technical Accessibility (20%) — 20/100

### AI Crawler Access Status

| Crawler         | robots.txt       | Recomandare                                 |
| --------------- | ---------------- | ------------------------------------------- |
| GPTBot          | ❌ Disallow /    | Allow pentru vizibilitate ChatGPT           |
| ChatGPT-User    | ❌ Disallow /    | User-triggered — ignoră robots oricum       |
| OAI-SearchBot   | ⚠️ Nereglementat | Allow explicit                              |
| ClaudeBot       | ⚠️ Nereglementat | Allow explicit                              |
| anthropic-ai    | ❌ Disallow /    | Block training OK; allow search bot separat |
| Claude-Web      | ❌ Disallow /    | Idem                                        |
| PerplexityBot   | ⚠️ Nereglementat | Allow explicit                              |
| CCBot           | ❌ Disallow /    | ✅ OK să rămână blocked                     |
| Google-Extended | ⚠️ Nereglementat | Decizie business (training opt-out)         |

### SSR Check

- Metadata (title, description, canonical): ✅ Server-rendered
- Organization JSON-LD: ❌ Client-only
- ItemList/Breadcrumb pe locație: ✅ În RSC stream (vizibil în HTML final)
- H1 pe sport detail: ⚠️ RSC stream — absent din primul chunk

### llms.txt

- Status: **404**
- Impact Google: **Zero** (Google confirmă ignorarea)
- Impact ChatGPT/Perplexity: **Positiv marginal** — worth adding after crawler access fix

---

## Top 5 schimbări GEO cu impact maxim

1. **Deblochează AI search crawlers** în robots.txt (+ PerplexityBot, GPTBot, ClaudeBot)
2. **Fix www canonical** — AI engines preferă URL consistent
3. **Adaugă blocuri 134-167 cuv self-contained** pe top 5 pagini (homepage, chestionar, top 3 sporturi)
4. **Publică research original** — „Studiu Yuvoo: 1000+ profiluri copii → sport recomandat" (date fine-tuning existente!)
5. **Construiește entity presence** — Wikipedia stub, YouTube channel, Reddit AMA pe r/Romania

---

## Contradicții Google vs multi-platform

Google spune explicit: nu e nevoie de llms.txt, chunking special, sau conținut separat pentru AI. **Respectăm această linie pentru Google.** Pentru ChatGPT/Perplexity, structura extractabilă (headings, tabele, definiții) nu contrazice Google — e „normal good content organization."
