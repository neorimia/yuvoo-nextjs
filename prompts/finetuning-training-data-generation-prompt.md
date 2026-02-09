# Prompt: Generate Additional Fine-Tuning Training Data

**Created**: February 2026  
**Based on**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)  
**Purpose**: Guide an AI agent to generate 25–75 additional JSONL training examples for the Yuvoo AI Coach Quiz fine-tuning dataset.

---

## TASK RESTATEMENT

**Task**: Generate additional JSONL training and validation examples for the Yuvoo AI Coach Quiz fine-tuning dataset. The current dataset has 23 training + 4 validation = 27 examples; the goal is to reach 50–100 total examples (add ~25–75 more).

**Output**:

- Append new examples to `data/finetuning/training_data.jsonl` and `data/finetuning/validation_data.jsonl`
- Maintain ~85% training / ~15% validation split for new examples
- All examples must pass validation: `python3 data/finetuning/validate_data.py`

---

## CONTEXT

### Current State

| File                  | Examples  | Size   |
| --------------------- | --------- | ------ |
| training_data.jsonl   | 23        | ~94 KB |
| validation_data.jsonl | 4         | ~15 KB |
| validate_data.py      | Validator | —      |

### Coverage Already Present

**Age groups**: 4–6 (5), 7–10 (9), 11–14 (9)

**Medical conditions & specialist referrals**:

- Cardiac symptoms → cardiologist (1)
- Cardiac family history → cardiologist (1)
- Recent concussion → neurologist (1)
- Multiple concussions → neurologist (1)
- Growth plate injury → orthopedist (2)
- Severe asthma → pulmonologist (1)
- Mild asthma, no referral (2)
- Moderate asthma, no referral (1)
- Joint pain → orthopedist (1)
- Overweight → nutritionist (1)
- Bullying/anxiety → psychologist (1)
- Sedentary teen → general pediatrician (1)
- Anxiety/isolation → psychologist (1)

**Personality profiles**: extroverts, introverts, competitive, creative, anxious, nonconformist, intellectual, timid

---

## CONSTRAINTS

1. **Schema compliance**: Each example must satisfy the validation script rules (see VALIDATION RULES below)
2. **Romanian language**: All user content and assistant responses in Romanian
3. **Avoid duplicates**: Do not repeat existing child profiles; vary age, gender, conditions, personality
4. **Distribution**: Prefer under-represented combinations (e.g., ages 4–6, less common medical cases)
5. **Quality**: Each example must be medically sensible and coherent with Yuvoo AI Coach guidelines

---

## VALIDATION RULES (from validate_data.py)

### Message Structure

- Exactly 3 messages: `system`, `user`, `assistant`
- Order: system → user → assistant

### User Content Format

```
ANALIZA COPILULUI:

Vârstă: [4-14] ani
Gen: Băiat | Fată
Nivel de energie: Foarte ridicat | Ridicat | Mediu | Scăzut
Trăsături de personalitate: [list]
Interese și hobby-uri: [list]
Sporturi încercate anterior: [sport(s) sau Niciunul]
Motiv oprire: [optional - S-a plictisit, Lipsă de interes, injury, etc.]

Constituție fizică: Subțire | Mediu | Atletic
Nivel coordonare: Încă dezvoltă coordonarea | Coordonare bună | Foarte bine coordonat | Dificultăți de coordonare

CONDIȚII MEDICALE:
- [Astm: Fără astm | Astm ușor (controlat) | Astm moderat | Astm sever]
- [Dureri: Fără dureri articulare | Dureri ușoare ocazionale | Dureri moderate frecvente]
- [Optional: ISTORIC ACCIDENTARE, ⚠️ SCREENING MEDICAL CRITIC]

Preferințe:
- Activități interioare: Da | Nu
- Activități exterioare: Da | Nu
- Sporturi de echipă: Da | Nu
- Sporturi individuale: Da | Nu
```

### Assistant Response (JSON)

- **recommendations**: Array of 3–5 objects, each with:
  - `sportId`: From VALID_SPORT_IDS
  - `sportName`: Romanian name
  - `matchScore`: 60–100
  - `reasoning`: 100–200 words Romanian
  - `benefits`: Array of 2+ strings
  - `considerations`: Array of 1+ strings

- **specialistRecommendation**:
  - `needed`: boolean
  - If needed: `specialty` (from VALID_SPECIALTIES), `reason`, optional `priority` (high/medium/low)

### Allowed Values

**VALID_SPORT_IDS**: fotbal, baschet, volei, handbal, tenis, tenis-de-masa, badminton, inot, polo, atletism, alergare, gimnastica, dans, balet, arte-martiale, judo, karate, taekwondo, ciclism, patinaj, skateboarding, escalada, alpinism, golf, sah, tir-cu-arcul

**VALID_SPECIALTIES**: orthopedist, nutritionist, psychologist, cardiologist, neurologist, pulmonologist, general

---

## COVERAGE GAPS TO FILL (Prioritize)

1. **Age 4–6**: Add more examples (recreational only, youngest children)
2. **Under-represented medical**:
   - ADHD / dificultăți de concentrare → psychologist (medium)
   - Subponderal → nutritionist (medium)
   - Hipermobilitate articulară → orthopedist
   - Eczema / alergii severe (fără astm) → context pentru sporturi în aer liber
3. **Personality combinations**:
   - Copil foarte creativ + sporturi artistice (balet, dans contemporan)
   - Copil rebel + arte marțiale (disciplină)
   - Copil foarte competitiv + sport individual (tenis, atletism)
4. **Sport variety**:
   - More: badminton, patinaj, polo, alpinism, golf (less common in current set)
5. **Edge cases**:
   - Copil cu mai multe sporturi încercate anterior (2–3)
   - Preferințe mixte (echipă + individual)
   - Condiții medicale combinate (e.g., astm ușor + dureri ușoare)

---

## OUTPUT FORMAT

1. **Generate** N new examples (N = 25–75, specify in output)
2. **Split** ~85% to training, ~15% to validation
3. **Write** each example as a single line of JSON (no pretty-print) in the JSONL files
4. **Run** `python3 data/finetuning/validate_data.py` and report: valid count, error count
5. **Provide** a short coverage matrix for the new examples (age groups, medical conditions, personality)

---

## EXAMPLE (Minimal Structure)

```json
{
  "messages": [
    {
      "role": "system",
      "content": "Ești un asistent AI specializat în recomandări de sporturi pentru copii din România, cu vârste între 4 și 14 ani. Generează TOATE răspunsurile EXCLUSIV în limba română. Returnează DOAR un obiect JSON valid."
    },
    {
      "role": "user",
      "content": "ANALIZA COPILULUI:\n\nVârstă: 6 ani\nGen: Băiat\n\nNivel de energie: Ridicat\n\nTrăsături de personalitate: curios, activ, prietos\n\n..."
    },
    {
      "role": "assistant",
      "content": "{\"recommendations\":[{\"sportId\":\"fotbal\",\"sportName\":\"Fotbal\",\"matchScore\":88,\"reasoning\":\"...\",\"benefits\":[\"...\",\"...\"],\"considerations\":[\"...\"]}],\"specialistRecommendation\":{\"needed\":false}}"
    }
  ]
}
```

---

## PROMPT LINT CHECKLIST

- [x] Verbosity controlled: Clear output format
- [x] Scope bounded: Only training data generation
- [x] Ambiguity resolved: Schema and validation rules specified
- [x] Output structured: JSONL format, split, validation report
- [x] Context sufficient: Current coverage and gaps documented
- [x] Examples provided: Minimal structure example
- [x] Constraints explicit: Validation, Romanian, no duplicates

---

**Usage**: Provide this prompt to an AI agent. The agent should read `data/finetuning/training_data.jsonl` and `data/finetuning/validate_data.py` for context, then generate new examples and append them to the files. Run the validation script after and fix any errors.
