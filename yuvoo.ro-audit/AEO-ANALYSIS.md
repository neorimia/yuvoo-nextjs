# AEO Analysis — Yuvoo

**AEO Readiness Score: 32 / 100**

Answer Engine Optimization = capacitatea de a fi citat ca sursă în răspunsuri generate de AI (Google AIO, ChatGPT, Perplexity, Gemini, Copilot).

---

## AI Visibility Audit — 15 query-uri testate

| #   | Query RO                            | AIO detectat   | Yuvoo citat | Surse citate (top)                                         | Page-type SERP                |
| --- | ----------------------------------- | -------------- | ----------- | ---------------------------------------------------------- | ----------------------------- |
| 1   | ce sport i se potriveste copilului  | Da (synthesis) | ❌          | sfaturiparinti.ro, carinasuteu.ro, kids365.ro, sportedu.ro | Ghid editorial                |
| 2   | cluburi sport copii bucuresti       | Da             | ❌          | pelicanii.ro, baschet-copii.ro, totalsportbucuresti.ro     | Club individual               |
| 3   | cluburi fotbal copii bucuresti      | Da             | ❌          | raiders.ro, astrakidsbucuresti.ro                          | Școală fotbal                 |
| 4   | sport copii 6 ani                   | Da             | ❌          | psiholog-copii.ro, med.ro, copilul.ro, novakidschool.com   | Ghid + tabel vârstă           |
| 5   | Yuvoo                               | —              | ❌          | Confuzie cu YuHuu Land, YOLO Kids                          | Brand absent                  |
| 6   | Yuvoo chestionar sport              | —              | ❌          | didactic.ro (chestionare școlare)                          | Zero brand match              |
| 7   | Yuvoo platforma sport copii         | —              | ❌          | yuhuuland.ro (confuzie nume)                               | Brand absent                  |
| 8   | specialist pediatru sport bucuresti | Da             | ❌          | sarciomed.ro, cardioped.ro, centrokinetic.ro               | Doctor/clinică                |
| 9   | sport potrivit copil quiz           | —              | ❌          | Resurse educaționale                                       | Tool gap                      |
| 10  | activitati sportive copii bucuresti | Da             | ❌          | Cluburi individuale                                        | Director gap                  |
| 11  | recomandari sport AI copii          | —              | ❌          | —                                                          | Categorie nouă — oportunitate |
| 12  | cluburi verificate copii romania    | —              | ❌          | —                                                          | Trust query — Yuvoo USP       |
| 13  | ce sport pentru copil timid         | Da             | ❌          | carinasuteu.ro, sfaturiparinti.ro                          | Ghid editorial                |
| 14  | gimnastica copii bucuresti          | Da             | ❌          | Cluburi individuale                                        | Sport+locație                 |
| 15  | site:yuvoo.ro                       | —              | ❌          | Zero rezultate indexate vizibile                           | Indexare incertă              |

**Rezultat: 0/15 citări Yuvoo.** Sursele citate sunt editorial (40%), cluburi individuale (35%), clinici medicale (15%), resurse educaționale (10%).

---

## Extractability Checklist

| Check                              | Homepage    | Chestionar | Sport detail | FAQ | Locație |
| ---------------------------------- | ----------- | ---------- | ------------ | --- | ------- |
| Definiție primele 60 cuv           | ❌          | ⚠️         | ✅           | ✅  | ❌      |
| Blocuri self-contained 134-167 cuv | ❌          | ❌         | ✅           | ✅  | ❌      |
| Statistici cu surse                | ❌          | ❌         | ⚠️           | ❌  | ❌      |
| Tabele comparative                 | ❌          | ❌         | ⚠️           | ❌  | ❌      |
| FAQ structurat                     | ❌          | ❌         | ✅           | ✅  | ❌      |
| Schema markup                      | ❌ (client) | ❌         | ✅           | ✅  | ✅      |
| Expert attribution                 | ❌          | ❌         | ❌           | ❌  | ❌      |
| Date actualizare                   | ❌          | ❌         | ❌ (2024)    | ⚠️  | ❌      |
| Headings = query patterns          | ⚠️          | ⚠️         | ✅           | ✅  | ⚠️      |
| AI bots allowed                    | ❌          | ❌         | ❌           | ❌  | ❌      |

---

## Query Fan-Out Analysis

Pentru „ce sport i se potriveste copilului", Google AI generează sub-query-uri:

| Fan-out query                 | Yuvoo acoperă? | Pagină recomandată                  |
| ----------------------------- | -------------- | ----------------------------------- |
| sport copii 4-6 ani           | ⚠️ Parțial     | /sporturi + landing vârstă          |
| sport copii 7-10 ani          | ⚠️ Parțial     | /sporturi + landing vârstă          |
| sport copil timid             | ❌             | Ghid nou                            |
| sport copil energic           | ❌             | Ghid nou                            |
| sport de echipă vs individual | ⚠️ Parțial     | /sporturi/fotbal vs /sporturi/tenis |
| cost activități sport copii   | ❌             | FAQ extins                          |
| riscuri sport copii mici      | ❌             | Ghid YMYL                           |
| când începe copilul un sport  | ⚠️ Parțial     | sport-expanded-content (vârstă min) |

**Gap:** Yuvoo acoperă ~30% din fan-out. Competitorii editoriali acoperă 70%+.

---

## Princeton GEO Methods — aplicabilitate Yuvoo

| Metodă                     | Boost vizibilitate AI | Aplicabil pe Yuvoo?                               |
| -------------------------- | --------------------- | ------------------------------------------------- |
| Cite sources (+40%)        | ✅                    | Adaugă surse OMS, societăți pediatrice în ghiduri |
| Add statistics (+37%)      | ✅                    | „X% din părinți..." — date proprii din quiz       |
| Expert quotations (+30%)   | ✅                    | Citate doctori din rețeaua Yuvoo                  |
| Authoritative tone (+25%)  | ✅                    | Ton expert, nu marketing                          |
| Fluency + Statistics combo | ✅ Max boost          | Raport quiz anual                                 |
| Keyword stuffing (-10%)    | ❌ Evită              | Keywords meta deja prezente — OK                  |

---

## Oportunitate unică: Date proprii

Yuvoo are **1780+ exemple fine-tuning** cu profiluri copii → sport recomandat. Aceasta e o sursă de **research original** neegalată:

- „Studiu Yuvoo 2026: Sporturile preferate de copiii 6-8 ani din București"
- Statistici agregate anonimizate din quiz-uri
- Infografic citabil de AI engines

**Acest asset există deja în `data/finetuning/`** — trebuie doar agregat și publicat ca pagină indexabilă.

---

## Platform-specific recommendations

### Google AI Overviews

- Prioritizează ranking clasic (top 10) — 92% citări din top 10
- FAQ content structurat (fără așteptare rich results)
- E-E-A-T: expert review pe conținut health

### ChatGPT / Perplexity

- Deblochează crawlers
- llms.txt cu pagini cheie
- Blocuri extractabile pe fiecare pagină importantă

### Copilot (Bing)

- IndexNow protocol (neimplementat)
- Bing Webmaster Tools verification (env var exists)

---

## Scor AEO — calcul

| Componentă             | Scor   | Pondere |
| ---------------------- | ------ | ------- |
| Live citations (0/15)  | 0      | 25%     |
| Extractability         | 55     | 25%     |
| Crawler access         | 15     | 20%     |
| Authority/brand        | 15     | 15%     |
| Original data/research | 60     | 15%     |
| **Total**              | **32** |         |

**Notă:** Scorul original data (60) reflectă potențialul datelor fine-tuning nepublicate. Dacă se publică research, AEO poate urca rapid la 45-50.
