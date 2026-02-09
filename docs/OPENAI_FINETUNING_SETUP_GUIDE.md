# OpenAI Fine-Tuning Setup Guide

**Status**: Draft
**Date**: February 2026
**Product**: Yuvoo - AI Coach Quiz (Sport Recommendations for Romanian Children)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Prerequisites](#2-prerequisites)
3. [Fine-Tuning Method: Supervised (SFT)](#3-fine-tuning-method-supervised-sft)
4. [Job Parameters Reference](#4-job-parameters-reference)
5. [Training Data Format](#5-training-data-format)
6. [Step-by-Step: Creating a Fine-Tuning Job](#6-step-by-step-creating-a-fine-tuning-job)
7. [Yuvoo-Specific Notes](#7-yuvoo-specific-notes)
8. [References](#8-references)

---

## 1. Overview

### Why Fine-Tune for Yuvoo?

The Yuvoo AI Coach Quiz generates personalized sport recommendations for Romanian children (ages 4–14). The current production model (`gpt-3.5-turbo`) is configured in `src/lib/integrations/openai/client.ts` and called from `src/modules/quiz/ai-recommendations.service.ts`.

Fine-tuning a model offers these benefits for the Yuvoo use case:

- **Consistent Romanian language output** — Eliminate occasional language inconsistencies without relying solely on system prompt instructions
- **Reliable JSON structure** — Enforce the exact output schema (sportId, sportName, matchScore, reasoning, benefits, considerations, specialistRecommendation)
- **Domain expertise** — Embed knowledge of Romanian sports infrastructure, age-appropriate recommendations, medical safety rules, and specialist referral logic
- **Cost and latency reduction** — A fine-tuned smaller model (e.g., `gpt-4.1-mini` or `gpt-4.1-nano`) can match GPT-4 quality for this specific task at lower cost and faster response times
- **Shorter prompts** — The 184-line system prompt can be significantly reduced since the fine-tuned model has internalized the domain knowledge

---

## 2. Prerequisites

### Account & Access

- An OpenAI account with API access at [platform.openai.com](https://platform.openai.com)
- Organization-level billing configured (fine-tuning incurs training costs)
- An API key with fine-tuning permissions (`OPENAI_API_KEY` in `.env.local`)

### Data Preparation

- A minimum of **50 training examples** (OpenAI recommends 50–100 for noticeable improvement; 200+ for strong results)
- Examples must be in **JSONL format** (one JSON object per line)
- Each example follows the chat completions messages structure (`system`, `user`, `assistant`)
- A separate **validation set** (10–20% of total examples) is recommended but optional

### Tools

- OpenAI CLI (`pip install openai`) or the [OpenAI Dashboard](https://platform.openai.com/finetune)
- `curl` or the OpenAI Node.js SDK for API-based job creation

---

## 3. Fine-Tuning Method: Supervised (SFT)

Yuvoo uses **Supervised Fine-Tuning (SFT)** — the standard method for teaching a model to follow specific input/output patterns.

### Why SFT Fits the Yuvoo Use Case

| Factor                        | Rationale                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Structured I/O**            | Quiz answers in → JSON recommendations out. SFT excels at learning consistent I/O mappings.              |
| **Domain-specific language**  | Romanian sport terminology, medical safety rules, and cultural context are best taught through examples. |
| **Quality control**           | Each training example is human-verified, ensuring the model learns from high-quality outputs.            |
| **Output schema enforcement** | SFT teaches the model to always produce the exact JSON schema required by the Yuvoo frontend.            |

### How SFT Works

1. You provide examples of ideal conversations (system prompt + user input + desired assistant output)
2. The model's weights are adjusted to produce outputs similar to your examples
3. The fine-tuned model is deployed as a new model ID you can use via the API

---

## 4. Job Parameters Reference

These parameters correspond to the fields in the OpenAI fine-tuning job creation form (Dashboard or API).

### Core Parameters

| Parameter           | Required | Default | Yuvoo Recommendation                            | Notes                                                                                                                                        |
| ------------------- | -------- | ------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Method**          | Yes      | —       | `supervised`                                    | Use supervised fine-tuning (SFT). This is the only method relevant for the Yuvoo use case.                                                   |
| **Base Model**      | Yes      | —       | `gpt-4.1-mini-2025-04-14`                       | Must support SFT. See [compatible models](#compatible-base-models) below. `gpt-4.1-nano-2025-04-14` is a lower-cost alternative for testing. |
| **Suffix**          | No       | —       | `yuvoo-quiz-v1`                                 | Appended to the output model name (e.g., `ft:gpt-4.1-mini-2025-04-14:org:yuvoo-quiz-v1:abc123`). Max 40 characters, alphanumeric + hyphens.  |
| **Seed**            | No       | Random  | Random (or a fixed integer for reproducibility) | Set a specific integer (e.g., `42`) to reproduce training runs. Leave as Random for default behavior.                                        |
| **Training data**   | Yes      | —       | JSONL file ID (`file-...`)                      | Upload a JSONL file first, then reference its file ID (e.g., `file-abc123`).                                                                 |
| **Validation data** | No       | —       | Separate JSONL file ID                          | Recommended: 10–20% of examples. Used to monitor overfitting during training.                                                                |

### Hyperparameters

| Parameter                    | Required | Default | Yuvoo Recommendation               | Notes                                                                                                                                                                                                   |
| ---------------------------- | -------- | ------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Batch size**               | No       | Auto    | `Auto`                             | OpenAI auto-selects based on dataset size. Custom values are integers (e.g., `4`, `8`, `16`). Start with Auto unless you have a specific reason to change.                                              |
| **Learning rate multiplier** | No       | Auto    | `Auto`                             | Controls how much the model updates per training step. Higher values learn faster but risk instability. Custom values are floats (e.g., `0.1`, `1.0`, `2.0`).                                           |
| **Number of epochs**         | No       | Auto    | `Auto` (or `3` for small datasets) | Number of complete passes through the training data. More epochs = more training but higher overfitting risk. For <100 examples, `3–4` epochs is typical; for 200+ examples, `2–3` is often sufficient. |

### Compatible Base Models

Models that support supervised fine-tuning (as of 2025):

| Model                     | Cost Tier | Best For                                                     |
| ------------------------- | --------- | ------------------------------------------------------------ |
| `gpt-4.1-mini-2025-04-14` | Medium    | **Recommended** — Best balance of quality and cost for Yuvoo |
| `gpt-4.1-nano-2025-04-14` | Low       | Budget-friendly option for initial experiments               |
| `gpt-4o-mini-2024-07-18`  | Medium    | Alternative if `gpt-4.1-mini` is unavailable                 |
| `gpt-3.5-turbo-0125`      | Low       | Legacy; consider upgrading to `gpt-4.1-nano`                 |

> **Note**: Check the [OpenAI fine-tuning docs](https://platform.openai.com/docs/guides/fine-tuning) for the latest list of supported models, as availability changes over time.

---

## 5. Training Data Format

### JSONL Structure

Each line in the JSONL file is a complete conversation with three messages:

```jsonl
{
  "messages": [
    {
      "role": "system",
      "content": "<system prompt>"
    },
    {
      "role": "user",
      "content": "<quiz answers as structured text>"
    },
    {
      "role": "assistant",
      "content": "<ideal JSON response>"
    }
  ]
}
```

### Yuvoo Training Example (Full)

```jsonl
{
  "messages": [
    {
      "role": "system",
      "content": "Ești un asistent AI specializat în recomandări de sporturi pentru copii din România, cu vârste între 4 și 14 ani. Generează TOATE răspunsurile EXCLUSIV în limba română. Returnează DOAR un obiect JSON valid."
    },
    {
      "role": "user",
      "content": "ANALIZA COPILULUI:\n\nVârstă: 7 ani\nGen: Băiat\n\nNivel de energie: Ridicat\n\nTrăsături de personalitate: extrovert, competitiv, energic\n\nInterese și hobby-uri: team sports, outdoor activities\n\nSporturi încercate anterior: Niciunul\n\nConstituție fizică: Mediu\nNivel coordonare: Coordonare bună\n\nCONDIȚII MEDICALE:\n- Fără astm\n- Fără dureri articulare\n\nPreferințe:\n- Activități interioare: Nu\n- Activități exterioare: Da\n- Sporturi de echipă: Da\n- Sporturi individuale: Nu\n\nPe baza acestor informații, recomandă 3-5 sporturi potrivite pentru acest copil."
    },
    {
      "role": "assistant",
      "content": "{\"recommendations\":[{\"sportId\":\"fotbal\",\"sportName\":\"Fotbal\",\"matchScore\":95,\"reasoning\":\"Fotbalul este sportul ideal pentru un băiat de 7 ani cu energie ridicată și personalitate extrovertă și competitivă. Ca sport de echipă practicat în aer liber, se potrivește perfect cu preferințele sale. Fotbalul va canaliza energia sa ridicată în mod constructiv și va dezvolta abilitățile sociale prin lucrul în echipă.\",\"benefits\":[\"Canalizează energia ridicată în mod pozitiv\",\"Dezvoltă abilitățile de lucru în echipă și socializare\",\"Îmbunătățește coordonarea și rezistența fizică\"],\"considerations\":[\"Echipament accesibil (ghete, jambiere)\",\"Disponibil în majoritatea orașelor din România\"]},{\"sportId\":\"baschet\",\"sportName\":\"Baschet\",\"matchScore\":82,\"reasoning\":\"Baschetul combină excelent lucrul în echipă cu competiția, potrivindu-se perfect personalității sale. La 7 ani, poate începe varianta recreativă, trecând la nivel competitiv de la 8 ani.\",\"benefits\":[\"Dezvoltă coordonarea ochi-mână\",\"Încurajează gândirea strategică rapidă\",\"Sport de echipă cu element competitiv puternic\"],\"considerations\":[\"Poate începe recreativ acum, competitiv de la 8 ani\",\"Necesită acces la teren de baschet\"]},{\"sportId\":\"atletism\",\"sportName\":\"Atletism\",\"matchScore\":78,\"reasoning\":\"Atletismul valorifică energia sa ridicată și oferă multiple discipline din care poate alege. La 7 ani, poate practica varianta recreativă, dezvoltând abilitățile fundamentale de mișcare.\",\"benefits\":[\"Valorifică energia ridicată prin diverse discipline\",\"Dezvoltă viteza, forța și rezistența\",\"Bază excelentă pentru orice alt sport\"],\"considerations\":[\"Poate începe recreativ, competitiv de la 10 ani\",\"Disponibil în majoritatea orașelor\"]}],\"specialistRecommendation\":{\"needed\":false}}"
    }
  ]
}
```

### Training Example (Specialist Recommendation)

```jsonl
{
  "messages": [
    {
      "role": "system",
      "content": "Ești un asistent AI specializat în recomandări de sporturi pentru copii din România, cu vârste între 4 și 14 ani. Generează TOATE răspunsurile EXCLUSIV în limba română. Returnează DOAR un obiect JSON valid."
    },
    {
      "role": "user",
      "content": "ANALIZA COPILULUI:\n\nVârstă: 10 ani\nGen: Fată\n\nNivel de energie: Mediu\n\nTrăsături de personalitate: introvert, creativă\n\nInterese și hobby-uri: dance, music\n\nSporturi încercate anterior: gimnastica\nMotiv oprire: injury\n\nISTORIC ACCIDENTARE:\n- Tip: growth-plate\n- Când: 3-6months\n- Rezolvată complet: Nu\n- Restricții medicale curente: Da\n\nConstituție fizică: Subțire\nNivel coordonare: Foarte bine coordonat\n\nCONDIȚII MEDICALE:\n- Fără astm\n- Dureri ușoare ocazionale\n\nPreferințe:\n- Activități interioare: Da\n- Activități exterioare: Nu\n- Sporturi de echipă: Nu\n- Sporturi individuale: Da"
    },
    {
      "role": "assistant",
      "content": "{\"recommendations\":[{\"sportId\":\"dans\",\"sportName\":\"Dans\",\"matchScore\":88,\"reasoning\":\"Dansul este perfect pentru o fată creativă și introvertă care iubește muzica. Este un sport individual practicat în interior, exact conform preferințelor sale. Dansul dezvoltă expresivitatea artistică și coordonarea fără impact articular semnificativ.\",\"benefits\":[\"Combină pasiunea pentru muzică cu mișcarea\",\"Impact redus, potrivit pentru recuperarea după accidentare\",\"Dezvoltă expresivitatea și încrederea în sine\"],\"considerations\":[\"Verificați cu ortoped dacă tipul de dans ales este compatibil cu recuperarea\",\"Evitați săriturile până la vindecare completă\"]},{\"sportId\":\"inot\",\"sportName\":\"Înot\",\"matchScore\":85,\"reasoning\":\"Înotul este excelent pentru recuperare - fără impact articular, dezvoltă forța uniform. Este individual și poate fi practicat în interior, potrivindu-se preferințelor sale.\",\"benefits\":[\"Zero impact articular - ideal pentru recuperare\",\"Dezvoltă forța și rezistența uniform\",\"Sport individual practicat în interior\"],\"considerations\":[\"Verificați cu ortoped înainte de a începe\",\"Începeți cu stiluri de înot care nu solicită zona afectată\"]}],\"specialistRecommendation\":{\"needed\":true,\"specialty\":\"orthopedist\",\"reason\":\"Copilul are o accidentare de placă de creștere recentă (3-6 luni) care nu s-a vindecat complet, cu restricții medicale curente și dureri articulare ocazionale. Evaluarea ortopedică este necesară înainte de a începe ORICE sport nou pentru a stabili ce activități sunt sigure în stadiul actual de recuperare.\",\"priority\":\"high\"}}"
    }
  ]
}
```

### System Prompt for Training

For fine-tuning, you can use a **shortened system prompt** since the model will learn the domain knowledge from examples:

```text
Ești un asistent AI specializat în recomandări de sporturi pentru copii din România, cu vârste între 4 și 14 ani. Generează TOATE răspunsurile EXCLUSIV în limba română. Returnează DOAR un obiect JSON valid.
```

> **Tip**: Keep the system prompt consistent across ALL training examples. The full 184-line production system prompt from `ai-recommendations.service.ts` provides the domain knowledge, but the fine-tuned model internalizes this through examples, so a shorter prompt suffices at inference time.

### Data Validation

Before uploading, validate your JSONL file:

```bash
# Validate JSONL format (each line must be valid JSON)
python3 -c "
import json
with open('training_data.jsonl') as f:
    for i, line in enumerate(f, 1):
        try:
            data = json.loads(line)
            assert 'messages' in data
            assert len(data['messages']) == 3
            assert data['messages'][0]['role'] == 'system'
            assert data['messages'][1]['role'] == 'user'
            assert data['messages'][2]['role'] == 'assistant'
        except Exception as e:
            print(f'Error on line {i}: {e}')
            break
    else:
        print(f'Valid: {i} examples')
"
```

---

## 6. Step-by-Step: Creating a Fine-Tuning Job

### Option A: Via OpenAI Dashboard

1. **Upload training data**
   - Go to [platform.openai.com/storage/files](https://platform.openai.com/storage/files)
   - Click **Upload** and select your `.jsonl` training file
   - Optionally upload a separate validation `.jsonl` file
   - Note the file IDs (format: `file-abc123...`)

2. **Create fine-tuning job**
   - Go to [platform.openai.com/finetune](https://platform.openai.com/finetune)
   - Click **Create**
   - Fill in the parameters:

     | Field                    | Value                                           |
     | ------------------------ | ----------------------------------------------- |
     | Method                   | `supervised`                                    |
     | Base Model               | `gpt-4.1-mini-2025-04-14`                       |
     | Suffix                   | `yuvoo-quiz-v1`                                 |
     | Seed                     | Random (or enter an integer)                    |
     | Training data            | Select your uploaded training file              |
     | Validation data          | Select your uploaded validation file (optional) |
     | Batch size               | Auto                                            |
     | Learning rate multiplier | Auto                                            |
     | Number of epochs         | Auto                                            |

   - Click **Create** to start the job

3. **Monitor training**
   - The dashboard shows training progress, loss curves, and estimated time
   - Training typically takes 10–30 minutes for small datasets
   - Check the validation loss to detect overfitting

4. **Use the fine-tuned model**
   - Once complete, copy the model ID from the dashboard
   - Update `src/lib/integrations/openai/client.ts`:
     ```typescript
     export const AI_MODEL = "ft:gpt-4.1-mini-2025-04-14:your-org:yuvoo-quiz-v1:abc123";
     ```

### Option B: Via API

```bash
# Step 1: Upload training file
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@training_data.jsonl"

# Response includes: { "id": "file-abc123", ... }

# Step 2: Upload validation file (optional)
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@validation_data.jsonl"

# Step 3: Create fine-tuning job
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "training_file": "file-abc123",
    "validation_file": "file-def456",
    "model": "gpt-4.1-mini-2025-04-14",
    "suffix": "yuvoo-quiz-v1",
    "method": {
      "type": "supervised",
      "supervised": {
        "hyperparameters": {
          "batch_size": "auto",
          "learning_rate_multiplier": "auto",
          "n_epochs": "auto"
        }
      }
    }
  }'

# Step 4: Monitor job status
curl https://api.openai.com/v1/fine_tuning/jobs/ftjob-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Step 5: List job events (training progress)
curl https://api.openai.com/v1/fine_tuning/jobs/ftjob-abc123/events \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Option C: Via OpenAI Node.js SDK

```typescript
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Step 1: Upload training file
const trainingFile = await openai.files.create({
  file: fs.createReadStream("training_data.jsonl"),
  purpose: "fine-tune",
});

// Step 2: Create fine-tuning job
const job = await openai.fineTuning.jobs.create({
  training_file: trainingFile.id,
  model: "gpt-4.1-mini-2025-04-14",
  suffix: "yuvoo-quiz-v1",
  method: {
    type: "supervised",
    supervised: {
      hyperparameters: {
        batch_size: "auto",
        learning_rate_multiplier: "auto",
        n_epochs: "auto",
      },
    },
  },
});

console.log("Job created:", job.id);

// Step 3: Monitor progress
const events = await openai.fineTuning.jobs.listEvents(job.id);
for (const event of events.data) {
  console.log(`[${event.created_at}] ${event.message}`);
}
```

---

## 7. Yuvoo-Specific Notes

### Deriving Training Examples from Quiz Data

Training data should come from real or representative quiz interactions. Sources:

1. **Production logs** — Extract quiz submissions and their AI responses from the database (`quizzes` table). Manually review and correct responses before including as training examples.
2. **Expert-created examples** — Have domain experts (pediatric sports specialists, child development professionals) create ideal recommendation sets for various child profiles.
3. **Edge cases** — Include examples for:
   - Children with medical conditions (asthma severity levels, cardiac symptoms, concussions)
   - All age brackets (4–6, 7–10, 11–14)
   - Specialist referral scenarios (orthopedist, cardiologist, neurologist, pulmonologist, psychologist, nutritionist, general)
   - Gender-neutral recommendations
   - Low-energy vs. very-high-energy profiles

### Romanian Content Requirements

All assistant responses in training data must:

- Use Romanian language exclusively (no English terms except sport IDs like `fotbal`, `baschet`)
- Follow the `SPORT_NAMES` mapping from `ai-recommendations.service.ts` for sport name consistency
- Use Romanian diacritics correctly (ă, â, î, ș, ț)
- Follow the communication style: 70% warm/supportive, 30% expert/confident
- Keep reasoning to 100–200 words per sport recommendation

### JSON Output Schema

Every assistant message must produce valid JSON matching this schema:

```json
{
  "recommendations": [
    {
      "sportId": "string (from available sport IDs)",
      "sportName": "string (Romanian name)",
      "matchScore": "number (60-100)",
      "reasoning": "string (100-200 words, Romanian)",
      "benefits": ["string", "string", "string"],
      "considerations": ["string", "string"]
    }
  ],
  "specialistRecommendation": {
    "needed": "boolean",
    "specialty": "orthopedist | nutritionist | psychologist | cardiologist | neurologist | pulmonologist | general",
    "reason": "string (Romanian) or null",
    "priority": "high | medium | low"
  }
}
```

### Available Sport IDs

Use these exact IDs in training data (mapped from `SPORT_NAMES` in `ai-recommendations.service.ts`):

| ID              | Romanian Name | Category      |
| --------------- | ------------- | ------------- |
| `fotbal`        | Fotbal        | Team          |
| `baschet`       | Baschet       | Team          |
| `volei`         | Volei         | Team          |
| `handbal`       | Handbal       | Team          |
| `tenis`         | Tenis         | Racquet       |
| `tenis-de-masa` | Tenis de masă | Racquet       |
| `badminton`     | Badminton     | Racquet       |
| `inot`          | Înot          | Aquatic       |
| `polo`          | Polo          | Aquatic       |
| `atletism`      | Atletism      | Running       |
| `alergare`      | Alergare      | Running       |
| `gimnastica`    | Gimnastică    | Expressive    |
| `dans`          | Dans          | Expressive    |
| `balet`         | Balet         | Expressive    |
| `arte-martiale` | Arte marțiale | Martial arts  |
| `judo`          | Judo          | Martial arts  |
| `karate`        | Karate        | Martial arts  |
| `taekwondo`     | Taekwondo     | Martial arts  |
| `ciclism`       | Ciclism       | Wheeled       |
| `patinaj`       | Patinaj       | Wheeled       |
| `skateboarding` | Skateboarding | Wheeled       |
| `escalada`      | Escaladă      | Adventure     |
| `alpinism`      | Alpinism      | Adventure     |
| `golf`          | Golf          | Concentration |
| `sah`           | Șah           | Concentration |
| `tir-cu-arcul`  | Tir cu arcul  | Concentration |

### Integration After Fine-Tuning

Once the fine-tuned model is ready, update the Yuvoo codebase:

```typescript
// src/lib/integrations/openai/client.ts

// Replace the base model with the fine-tuned model ID
export const AI_MODEL = "ft:gpt-4.1-mini-2025-04-14:your-org:yuvoo-quiz-v1:abc123";

// You may be able to reduce temperature since the model is more consistent
export const AI_TEMPERATURE = 0.6; // Lower than 0.8 since fine-tuned model is more focused

// Max tokens can remain the same
export const AI_MAX_TOKENS = 2000;
```

In `ai-recommendations.service.ts`, the system prompt can be shortened since domain knowledge is now embedded in the model weights. However, keep the essential instructions (Romanian language, JSON format) as a safety net.

---

## 8. References

- [OpenAI Fine-Tuning Guide](https://platform.openai.com/docs/guides/fine-tuning) — Official documentation for fine-tuning workflows
- [OpenAI Model Optimization](https://platform.openai.com/docs/guides/model-optimization) — Overview of model customization approaches
- [Fine-Tuning API Reference](https://platform.openai.com/docs/api-reference/fine-tuning) — API endpoints for creating and managing fine-tuning jobs
- [OpenAI Files API](https://platform.openai.com/docs/api-reference/files) — Uploading training data files
- [OpenAI Pricing](https://openai.com/pricing) — Training and inference costs for fine-tuned models
- [JSONL Format](https://jsonlines.org/) — JSON Lines specification

### Yuvoo Internal References

- `src/lib/integrations/openai/client.ts` — OpenAI client configuration (model, temperature, max tokens)
- `src/modules/quiz/ai-recommendations.service.ts` — AI recommendation service (system prompt, user prompt builder, response processing)
- `src/modules/quiz/quiz.types.ts` — TypeScript types for quiz answers, sport recommendations, and specialist recommendations
