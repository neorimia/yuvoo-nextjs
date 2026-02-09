# Fine-Tuning Data: How Much Is Needed for Production?

**Purpose**: Research-backed guidance on dataset size and coverage for the Yuvoo AI Coach Quiz fine-tuned model.  
**Last updated**: February 2026.

**Current dataset**: 2,003,130 training + 298,914 validation = **2,302,044 total** valid examples.

---

## 1. Industry & OpenAI guidance

### Quantity ranges (general)

| Source                         | Finding                                                                                                                                                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenAI best practices**      | “If you have **relatively few (under 100)** training examples, include instructions in every example” for best results. No strict minimum; quality and balance matter more.                                                                     |
| **OpenAI**                     | “A smaller amount of **high-quality data** is generally more effective than a larger amount of low-quality data.” “Similar improvement every time you **double** the number of training examples.”                                              |
| **Research (LLM fine-tuning)** | **50–100** examples: practical minimum for production. **100–500** high-quality examples often sufficient for production-ready, task-specific models. **100** samples: typical breakeven where fine-tuned model matches or beats general model. |
| **Task-type estimates**        | Simple classification: 100–300 per category. Structured extraction: 200–500. **Content/domain generation**: 500–2,000. **Complex domain adaptation**: 1,000–5,000.                                                                              |

### Quality over quantity

- One **high-quality**, consistent example is more useful than many mediocre ones.
- **Balance and diversity**: training distribution should reflect target usage (e.g. if 5% of real cases need specialist referral, don’t let 60% of examples be “referral”).
- **Consistency**: if multiple people create data, model performance is capped by inter-annotator agreement (e.g. ~70% agreement → model unlikely to exceed that).
- **Completeness**: each example must contain all information the model needs; avoid teaching the model to “hallucinate” from missing context.

---

## 2. How the Yuvoo task fits

The AI Coach Quiz is:

- **Structured output**: fixed JSON (recommendations array + specialistRecommendation).
- **Domain rules**: age 4–14, Romanian only, valid sport IDs and specialties, medically sensible recommendations.
- **Multi-dimensional input**: age, gender, energy, personality, interests, medical conditions, preferences, sports tried.
- **Hybrid**: “content generation” (reasoning, benefits, considerations in Romanian) + “structured parsing” (schema, IDs, scores).

So it sits between **structured extraction** (200–500) and **complex domain adaptation** (1,000–5,000). Because:

- Output schema is fixed and relatively small (3–5 sports + one specialist block).
- Input space is large (many combinations of age, medical, personality, preferences).
- Safety and correctness matter (medical referrals, Romanian, no hallucinated sports/IDs).

**Implication**:

- **Minimum for a first production version**: in the **100–300** range (high quality, good coverage).
- **Comfortable production + edge cases**: **300–600**.
- **Very robust / “cover all”**: **500–1,000+**, with explicit coverage of every critical segment and edge case.

---

## 3. What “cover all” means for Yuvoo

“All” = the model behaves well on every **segment** and **edge case** you care about in production.

### 3.1 Dimensions to cover

| Dimension                | Values / types                                                                                      | Minimum target (examples that touch this)                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Age**                  | 4–14 (11 values)                                                                                    | Each age band (e.g. 4–6, 7–9, 10–12, 13–14) has several examples; 4–6 and 13–14 not under-represented.                                         |
| **Gender**               | Băiat, Fată                                                                                         | Balanced; no strong bias in recommendations.                                                                                                   |
| **Energy**               | Foarte ridicat, Ridicat, Mediu, Scăzut                                                              | Each level appears in multiple examples.                                                                                                       |
| **Medical**              | No condition, Astm (4 levels), Dureri (3), Screening (cardiac, concussion, growth plate, etc.)      | Each **critical** scenario (e.g. cardiac, concussion, severe asthma, growth plate, ADHD, subponderal, hipermobilitate) has **≥ 2–3** examples. |
| **Specialist**           | orthopedist, nutritionist, psychologist, cardiologist, neurologist, pulmonologist, general          | Each specialty triggered in **≥ 2** examples; “needed: false” well represented.                                                                |
| **Personality**          | competitive, creative, anxious, timid, rebel, intellectual, etc.                                    | Major types (e.g. creative+balet, rebel+arte marțiale, competitive+tenis) each have **≥ 2** examples.                                          |
| **Sports (recommended)** | 25 VALID_SPORT_IDS                                                                                  | Each sport appears as a recommendation in **≥ 2–3** examples so the model doesn’t “forget” any.                                                |
| **Edge cases**           | Multiple sports tried, mixed preferences, combined conditions (e.g. astm + dureri), no sports tried | **≥ 3–5** examples per important edge type.                                                                                                    |

### 3.2 Approximate “full coverage” counts (by dimension)

Rough lower bounds so that no dimension is clearly under-represented:

- **Age**: 11 ages × 2–3 ≈ **25–35** examples (if spread evenly; in practice, 4–6 and 11–14 can have more).
- **Medical + specialist**: ~10–15 scenario types × 2–3 ≈ **25–45** examples.
- **Personality × sport**: ~8–10 strong combinations × 2 ≈ **20–25** examples.
- **Sport variety**: 25 sports × 2 ≈ **50** “slots” (one example can cover several sports).
- **Edge cases**: ~5 types × 3 ≈ **15** examples.

Because one example covers **several** dimensions at once (e.g. age + gender + medical + 3 sports), you don’t add these numbers; you ensure the **total** dataset is large and diverse enough that all these buckets are hit.

- **~150–250** high-quality examples: good coverage of main segments and most edge cases.
- **~300–500**: solid production, all critical medical/specialist paths and personality types clearly represented.
- **~500–800+**: “cover all” in the sense that every specialty, every critical medical scenario, every age band, and every sport has multiple examples; edge cases and rare combos still present.

---

## 4. Recommended targets for Yuvoo

| Stage                     | Total examples (train + val) | Training / validation | Notes                                                                                                         |
| ------------------------- | ---------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- |
| **MVP / soft launch**     | **80–120**                   | ~85% / ~15%           | Current ~94 is in range. Focus: quality, no major gap in age or medical.                                      |
| **Production (standard)** | **150–250**                  | ~85% / ~15%           | All specialties and critical medical scenarios covered 2+ times; all ages and main personalities represented. |
| **Production (robust)**   | **300–500**                  | ~85% / ~15%           | Every sport recommended multiple times; edge cases (multi-sport tried, combined conditions) well covered.     |
| **“Cover all”**           | **500–800+**                 | ~85% / ~15%           | Rare combinations and edge cases still present; validation set large enough (e.g. 50–100) for reliable evals. |

### Validation set

- **Minimum**: 10–15 examples (current 19 is fine).
- **Comfortable**: 20–30.
- **Robust evals**: 40–80 (so you can measure performance by age band, medical type, specialist, etc.).

---

## 5. Coverage checklist (production readiness)

Use this to decide if you need more data and where.

- [ ] **Age**: 4–6, 7–9, 10–12, 13–14 each have ≥ 5–10 examples.
- [ ] **Medical**: No condition, astm ușor/moderat/sever, dureri, cardiac, concussion, growth plate, ADHD, subponderal, hipermobilitate, eczema/alergii each have ≥ 2 examples where relevant.
- [ ] **Specialist**: Each of the 7 specialties appears in ≥ 2 examples; “needed: false” in ≥ 30% of examples.
- [ ] **Sports**: Each of the 25 sport IDs appears as a recommendation in ≥ 2–3 examples.
- [ ] **Personality**: Creative+artistic, competitive+individual, rebel+discipline, timid+calm, intellectual+strategic each have ≥ 2 examples.
- [ ] **Edge cases**: Multiple sports tried (2–3), mixed team+individual, combined medical (e.g. astm + dureri), “no sports tried” all present.
- [ ] **Romanian**: All user and assistant text in Romanian; reasoning 100–200 words; no wrong IDs or specialties.
- [ ] **Balance**: Distribution of “specialist needed” and “no specialist” in data is close to expected in production (e.g. not 80% referral if real rate is 20%).

---

## 6. Summary

- **Minimum for production**: **~100** high-quality, schema-valid examples (you have ~94; add a few more for comfort).
- **Standard production**: **150–250** with full coverage of ages, medical/specialist, personalities, and sports.
- **“Cover all” / very robust**: **300–500+** with explicit coverage of every critical segment and edge case; quality and consistency still matter more than raw count.
- Use the **coverage checklist** to find gaps and add targeted examples; re-validate and re-train after each batch.

---

## References

- OpenAI, [Fine-tuning best practices](https://platform.openai.com/docs/guides/fine-tuning-best-practices) (quality, balance, “under 100” note, doubling data).
- Research: “How Much Data Do You Need to Fine-Tune an LLM?” (50–100 minimum, 100–500 production, quality vs quantity).
- Research: “100 Labelled Samples to Achieve Break-Even Performance” (fine-tuned vs general models).
- Yuvoo: `prompts/finetuning-training-data-generation-prompt.md`, `data/finetuning/validate_data.py`.
