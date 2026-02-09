# Prompt: Analyze Project and Create OpenAI Fine-Tuning Setup Guide

**Created**: February 2026  
**Based on**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)  
**Purpose**: Guide an AI agent to analyze the Yuvoo project and produce a Markdown documentation file for setting up OpenAI fine-tuning with specified parameters.

---

## TASK

Analyze the Yuvoo project (with focus on the AI Coach Quiz integration) and create a Markdown file (`docs/OPENAI_FINETUNING_SETUP_GUIDE.md`) that documents how to create a fine-tuned OpenAI model using the OpenAI platform fine-tuning workflow. The guide must cover all parameters from the OpenAI fine-tuning job creation form.

---

## CONTEXT

### Yuvoo Project AI Integration

- **Use case**: AI Coach Quiz – personalized sport recommendations for Romanian children (ages 4–14)
- **Current model**: GPT-3.5 Turbo (`gpt-3.5-turbo`) in production; GPT-4 Turbo referenced in docs
- **Files**: `src/modules/quiz/ai-recommendations.service.ts`, `src/lib/integrations/openai/client.ts`
- **Output format**: JSON with sport recommendations (sportId, sportName, matchScore, reasoning, benefits, etc.)
- **Language**: All AI-generated content must be in Romanian
- **Reference**: https://platform.openai.com/docs/guides/model-optimization

### OpenAI Fine-Tuning Parameters to Document

The guide must document each parameter from the fine-tuning job creation UI:

| Parameter                    | Description                   | Values / Rules                                                                                     |
| ---------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| **Method**                   | Fine-tuning method            | **supervised** (specified)                                                                         |
| **Base Model**               | Required field                | e.g., `gpt-4.1-mini-2025-04-14`, `gpt-4.1-nano-2025-04-14` (models supporting SFT per OpenAI docs) |
| **Suffix**                   | Appended to output model name | e.g., `my-experiment` (customizable)                                                               |
| **Seed**                     | Reproducibility               | Random (auto-generated) or valid integer                                                           |
| **Training data**            | Required                      | JSONL file; must be file ID starting with `file-`                                                  |
| **Validation data**          | Optional                      | JSONL file; optional                                                                               |
| **Batch size**               | Hyperparameter                | Auto or Custom                                                                                     |
| **Learning rate multiplier** | Hyperparameter                | Auto or Custom                                                                                     |
| **Number of epochs**         | Hyperparameter                | Auto or Custom                                                                                     |

---

## CONSTRAINTS

- **Output**: A single Markdown file at `docs/OPENAI_FINETUNING_SETUP_GUIDE.md`
- **Scope**: Focus on supervised fine-tuning (SFT) for the AI Coach Quiz use case
- **Format**: Clear sections with headings, tables, and step-by-step instructions
- **Project-specific**: Include Yuvoo context (Romanian sport recommendations, JSON output schema, quiz flow)
- **Do NOT**: Modify source code; only create documentation
- **References**: Link to official OpenAI docs where relevant (model optimization, supervised fine-tuning, API reference)

---

## OUTPUT FORMAT

The created Markdown file must include:

### Required Sections

1. **Overview** – Purpose of fine-tuning for Yuvoo (improve Romanian sport recommendations, consistent JSON format)
2. **Prerequisites** – OpenAI API key, account access, data preparation
3. **Fine-Tuning Method** – Supervised fine-tuning (SFT) explanation and why it fits the use case
4. **Job Parameters Reference** – Table or list of all parameters:
   - Method: supervised
   - Base Model: options (with compatibility note)
   - Suffix: e.g., `my-experiment`
   - Seed: Random vs integer
   - Training data: JSONL, file ID format
   - Validation data: optional
   - Hyperparameters: Batch size, Learning rate multiplier, Number of epochs (Auto vs Custom)
5. **Training Data Format** – JSONL structure for Yuvoo (messages format: system, user, assistant)
6. **Step-by-Step: Creating a Fine-Tuning Job** – Via dashboard and/or API
7. **Yuvoo-Specific Notes** – How to derive training examples from quiz data, Romanian content requirements
8. **References** – Links to OpenAI docs

### Structure

- Use H2 for main sections, H3 for subsections
- Use tables for parameter reference
- Use code blocks for JSONL examples
- Keep language professional; technical terms in English; user-facing examples can reference Romanian content

---

## EXAMPLES

### JSONL Training Example (Yuvoo-style)

```jsonl
{
  "messages": [
    {
      "role": "system",
      "content": "Ești un asistent AI specializat în recomandări de sporturi pentru copii din România..."
    },
    {
      "role": "user",
      "content": "{\"childAge\":7,\"energyLevel\":\"high\",\"interests\":[\"team sports\"],...}"
    },
    {
      "role": "assistant",
      "content": "{\"recommendations\":[{\"sportId\":\"fotbal\",\"sportName\":\"Fotbal\",\"matchScore\":92,...}]}"
    }
  ]
}
```

### Parameter Table Example

| Parameter     | Required | Default | Notes                                 |
| ------------- | -------- | ------- | ------------------------------------- |
| Method        | Yes      | —       | Use `supervised` for SFT              |
| Base Model    | Yes      | —       | Must support SFT (e.g., gpt-4.1-mini) |
| Suffix        | No       | —       | Max 40 chars, appended to model name  |
| Seed          | No       | Random  | Integer for reproducibility           |
| Training file | Yes      | —       | Must be `file-xxxxx` format           |

---

## CODE CHANGE RULES (Documentation)

- Create new file only; do not modify existing files except the prompt reference
- Follow existing doc style in `docs/` (see `docs/STRIPE_IMPLEMENTATION_GUIDE.md`, `docs/QUIZ_IMPROVEMENTS.md` for reference)
- Use consistent Markdown (tables, lists, code blocks)
- Ensure all external links are valid and point to current OpenAI documentation

---

## PROMPT LINT CHECKLIST

- [x] Verbosity controlled: Specific sections and structure
- [x] Scope bounded: Documentation only, no code changes
- [x] Ambiguity resolved: Parameters and values specified
- [x] Output structured: Required sections listed
- [x] Context sufficient: Yuvoo AI integration described
- [x] Examples provided: JSONL and parameter table
- [x] Constraints explicit: Output path and format

---

**Usage**: Provide this prompt to an AI agent to generate `docs/OPENAI_FINETUNING_SETUP_GUIDE.md`. The agent should first analyze `src/modules/quiz/ai-recommendations.service.ts` and `src/lib/integrations/openai/client.ts` for context, then create the documentation file.
