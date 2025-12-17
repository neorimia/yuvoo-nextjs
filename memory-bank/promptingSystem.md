# Yuvoo - Prompting System Standard

## Overview

This document defines the **Yuvoo Prompting Standard** - a systematic approach to writing prompts that ensures consistent, precise, and maintainable AI interactions. This standard applies to all prompts used in code generation, content creation, analysis tasks, and any AI-assisted workflows.

**Purpose**: Enable engineers (human or AI) to write prompts that:

- Control verbosity with concrete constraints
- Prevent scope drift and feature creep
- Mitigate ambiguity early
- Enforce precision with structured outputs
- Improve recall in long-context tasks
- Enable systematic prompt iteration

---

## Core Principles

### 1. Control Verbosity with Concrete Constraints

**Problem**: AI outputs can be too verbose or too brief without explicit guidance.

**Solution**: Always specify:

- **Length constraints**: "Output format: 3-5 bullet points, max 50 words each"
- **Depth constraints**: "Analyze only the top 3 issues, not all issues"
- **Format constraints**: "Use JSON schema", "Markdown table", "Numbered list"

**Do**:

```
Analyze the codebase and identify the top 3 performance bottlenecks.
Output format: JSON with { issue: string, impact: "high"|"medium"|"low", fix: string }
Each fix description: max 100 words.
```

**Don't**:

```
Analyze the codebase for performance issues.
```

### 2. Prevent Scope Drift

**Problem**: AI may add extra features, refactor unrelated code, or expand beyond requirements.

**Solution**: Explicitly forbid scope expansion.

**Do**:

```
Update the login form to add email validation.
CONSTRAINTS:
- Only modify the email input field validation
- Do NOT change other form fields
- Do NOT refactor existing code
- Do NOT add new features
- Do NOT modify styling unless explicitly required
```

**Don't**:

```
Improve the login form.
```

### 3. Mitigate Ambiguity Early

**Problem**: Ambiguous prompts lead to incorrect interpretations.

**Solution**: List possible interpretations and ask 1 clarifying question if needed.

**Do**:

```
Task: Replace placeholder images with real images.

Possible interpretations:
1. Replace all placeholder images across the entire codebase
2. Replace placeholder images only in the clubs directory
3. Replace placeholder images only in the homepage

Clarifying question: Which scope should I target? (all / clubs / homepage)
```

**Don't**:

```
Replace placeholder images.
```

**Rule**: If ambiguity exists and cannot be resolved from context, ask exactly 1 clarifying question before proceeding.

---

## Advanced Techniques

### 4. Enforce Precision with Output Schemas

**Problem**: Unstructured outputs are hard to parse and validate.

**Solution**: Use JSON schemas with explicit null handling.

**Template**:

```
Output format: JSON matching this schema:
{
  "summary": string (required),
  "issues": array of {
    "type": "error" | "warning" | "info",
    "message": string,
    "file": string | null,
    "line": number | null
  },
  "recommendations": array of string | null
}

Rules:
- Use null for missing optional fields (never omit fields)
- All arrays must be present (empty array [] if no items)
- All string fields must be non-empty or null
```

**Example**:

```
Audit the SEO implementation and output findings.

Output format: JSON schema:
{
  "metaTagsComplete": boolean,
  "structuredDataPresent": boolean,
  "issues": array of {
    "page": string,
    "issue": string,
    "severity": "critical" | "high" | "medium" | "low",
    "fix": string | null
  },
  "missingPages": array of string | null
}
```

### 5. Improve Recall in Long-Context Tasks

**Problem**: In long conversations or documents, AI may lose track of original requirements.

**Solution**: Restate task and constraints before starting work.

**Template**:

```
━━━━━━━━━━━━━━━━━━━━
TASK RESTATEMENT
━━━━━━━━━━━━━━━━━━━━
Task: [Restate the original task]
Constraints: [Restate all constraints]
Output format: [Restate output format]
Scope: [Restate scope boundaries]

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━
[Provide context here]

━━━━━━━━━━━━━━━━━━━━
WORK
━━━━━━━━━━━━━━━━━━━━
[Now proceed with the task]
```

---

## Workflow: 5-Step Prompt Iteration Loop

When prompts don't produce desired results, follow this systematic iteration:

### Step 1: Switch Model

- Try a different model (Claude → GPT-4, GPT-4 → Claude Sonnet)
- Different models have different strengths

### Step 2: Pin Constraints

- Make constraints more explicit
- Add explicit "DO NOT" statements
- Specify exact output format

### Step 3: Run Evaluations

- Test prompt with known inputs
- Measure success criteria (precision, completeness, format compliance)
- Document failures

### Step 4: Tune Prompts

- Adjust based on evaluation results
- Add examples if needed
- Refine constraints

### Step 5: Re-evaluate

- Test again with same inputs
- Compare results
- Iterate if needed

**Example Iteration**:

**Initial Prompt** (fails):

```
Review the quiz component for bugs.
```

**Iteration 1** (pinned constraints):

```
Review the quiz component for bugs.
CONSTRAINTS:
- Only review TypeScript/React code in src/components/features/quiz/
- Output: JSON with { bug: string, file: string, line: number, fix: string }
- Max 10 bugs
- Do NOT review styling or documentation
```

**Iteration 2** (added examples):

```
[Same as Iteration 1, plus:]
Example output:
{
  "bugs": [
    {
      "bug": "Missing null check on quizContext",
      "file": "QuizContainer.tsx",
      "line": 45,
      "fix": "Add optional chaining: quizContext?.currentStep"
    }
  ]
}
```

---

## Reusable Assets

### Universal "Senior Prompt" Template

Use this template for all non-trivial prompts:

```
━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
[Clear, specific task description]

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━
[Relevant background information]
[Current state]
[Related files/components]

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━
- [Explicit constraint 1]
- [Explicit constraint 2]
- [Scope boundary]
- [What NOT to do]

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
[Exact format required]
[JSON schema if applicable]
[Length/depth limits]

━━━━━━━━━━━━━━━━━━━━
EXAMPLES (if applicable)
━━━━━━━━━━━━━━━━━━━━
[Example input/output pairs]
```

### Code-Specific "Minimal Diff" Add-On

For code changes, append this section:

```
━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━
- Use minimal diffs: only change what's necessary
- Preserve existing code style and patterns
- Do NOT refactor unrelated code
- Do NOT change imports unless required
- Do NOT modify comments unless they're incorrect
- Follow existing TypeScript/React patterns in the codebase
- Use existing utility functions when available
- Maintain backward compatibility unless explicitly breaking
- Add type safety: use existing types, create new types only if needed
- Error handling: follow existing error handling patterns
```

### Prompt Lint Checklist

Before using any prompt, verify:

- [ ] **Verbosity controlled**: Length/depth/format constraints specified?
- [ ] **Scope bounded**: Explicit "DO NOT" statements included?
- [ ] **Ambiguity resolved**: Possible interpretations listed or question asked?
- [ ] **Output structured**: JSON schema or format template provided?
- [ ] **Context sufficient**: All necessary background included?
- [ ] **Examples provided**: For complex tasks, examples included?
- [ ] **Constraints explicit**: All constraints in dedicated section?
- [ ] **Task restated**: For long-context tasks, task restated before work?

---

## Yuvoo-Specific Examples

### Example 1: Code Changes

**Task**: Add email validation to the login form.

**Prompt**:

```
━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
Add email format validation to the login form email input field.

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━
- File: src/components/Auth/SignInForm.tsx
- Current: Email input has no format validation
- Stack Auth handles authentication, but we need client-side validation
- Form uses React Hook Form with Zod validation
- Error messages must be in Romanian

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━
- Only modify the email field validation
- Do NOT change password field
- Do NOT modify form submission logic
- Do NOT change styling
- Do NOT refactor existing code
- Use existing Zod schema patterns from lib/validations/
- Error message must be in Romanian

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
- Show only the modified code sections
- Use search_replace tool with exact old_string and new_string
- Include import statements if new imports needed

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━
- Use minimal diffs: only change validation logic
- Preserve existing React Hook Form patterns
- Follow existing Zod schema structure
- Use existing Romanian error message format
```

### Example 2: SEO Audit Plan

**Task**: Create an SEO audit plan for the clubs directory.

**Prompt**:

```
━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
Create a comprehensive SEO audit plan for the clubs directory pages.

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━
- Pages: /cluburi (listing), /cluburi/[slug] (detail)
- Current: Basic metadata, no structured data, minimal content
- Target: Improve Google rankings for "cluburi sportive bucuresti" queries
- Framework: Next.js 16 with Cache Components
- Language: All content in Romanian

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━
- Focus on technical SEO and on-page optimization
- Do NOT include off-page SEO (backlinks, social signals)
- Do NOT modify database schema
- All recommendations must be implementable
- Prioritize high-impact, low-effort items first

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
JSON schema:
{
  "summary": string (max 200 words),
  "priority": "high" | "medium" | "low",
  "recommendations": array of {
    "item": string,
    "impact": "high" | "medium" | "low",
    "effort": "high" | "medium" | "low",
    "description": string (max 150 words),
    "implementation": string (max 200 words) | null,
    "files": array of string | null
  },
  "structuredData": {
    "type": string,
    "required": boolean,
    "implementation": string | null
  } | null
}
```

### Example 3: Quiz Review (Doctor + Coach)

**Task**: Review quiz recommendations for medical accuracy and sports appropriateness.

**Prompt**:

```
━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
Review AI-generated quiz recommendations for a 7-year-old child to ensure:
1. Medical safety (no contraindications)
2. Age-appropriateness (sports suitable for age 7)
3. Romanian sports culture alignment

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━
- Quiz answers: Age 7, male, high energy, no health concerns, prefers team sports
- AI recommendations: ["Fotbal", "Baschet", "Handbal", "Tenis"]
- System: modules/quiz/ai-recommendations.service.ts
- Reviewers: Pediatric sports specialist + Sports coach perspective

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━
- Review only the 4 recommended sports
- Do NOT suggest additional sports
- Do NOT modify the AI service code
- Focus on safety and appropriateness only
- Consider Romanian sports infrastructure (availability, cost, culture)

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
JSON schema:
{
  "overallAssessment": "safe" | "needs_review" | "unsafe",
  "sports": array of {
    "sport": string,
    "medicalSafety": "safe" | "caution" | "unsafe",
    "ageAppropriate": boolean,
    "culturalFit": "excellent" | "good" | "moderate" | "poor",
    "concerns": array of string | null,
    "recommendation": "keep" | "modify" | "remove",
    "modification": string | null
  },
  "specialistRecommendation": string | null
}
```

### Example 4: Placeholder Image Replacement

**Task**: Replace placeholder images with real images in the clubs directory.

**Prompt**:

```
━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━
Replace placeholder images with real club images in the clubs directory components.

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━
- Components: ClubCard, ClubDetailsMain, HomeClubArea
- Current: Using placeholder URLs (e.g., "https://via.placeholder.com/400")
- Database: clubs table has logoUrl and galleryUrls fields (Cloudinary URLs)
- Some clubs have real images, some don't
- Fallback needed for clubs without images

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━
- Only modify image src attributes
- Do NOT change component structure
- Do NOT modify styling
- Use database club.logoUrl when available
- Fallback to a default Yuvoo placeholder image (not via.placeholder.com)
- Preserve Next.js Image component optimization
- Handle null/empty logoUrl gracefully

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
- Show code changes using search_replace tool
- List all files modified
- Specify fallback image path

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━
- Minimal changes: only image src logic
- Preserve existing Next.js Image patterns
- Use existing utility functions if available
- Maintain type safety
```

---

## Integration with Yuvoo Workflows

### For Cursor / Claude Code

When working in Cursor or Claude Code:

1. **Start with Senior Prompt Template**: Use the template for all non-trivial tasks
2. **Add Code Change Rules**: Always append the minimal diff add-on for code changes
3. **Run Prompt Lint**: Verify checklist before executing
4. **Iterate systematically**: Follow 5-step loop if results are unsatisfactory

### For GPT / Claude Chat

When working in chat interfaces:

1. **Restate task first**: Use task restatement template for long conversations
2. **Use output schemas**: Always specify JSON schema for structured outputs
3. **Pin constraints early**: State constraints before providing context
4. **Ask 1 question**: If ambiguous, ask exactly 1 clarifying question

### For Documentation Tasks

When creating or updating documentation:

1. **Specify format**: "Markdown with H2 headings, bullet lists, code blocks"
2. **Control length**: "Max 500 words per section"
3. **Prevent scope creep**: "Only document current implementation, not future plans"
4. **Use examples**: Include 1-2 short examples per major concept

---

## Quick Reference

### Prompt Structure (Minimal)

For simple tasks, use this minimal structure:

```
Task: [What to do]
Constraints: [What NOT to do]
Output: [Format required]
```

### Prompt Structure (Standard)

For most tasks, use Senior Prompt Template.

### Prompt Structure (Complex)

For complex, multi-step tasks:

- Use Senior Prompt Template
- Add task restatement section
- Include multiple examples
- Specify evaluation criteria

### Common Constraint Patterns

**Code changes**:

```
- Only modify [specific files/sections]
- Do NOT refactor unrelated code
- Do NOT change styling unless required
- Preserve existing patterns
```

**Analysis tasks**:

```
- Analyze only [specific scope]
- Output format: [JSON schema]
- Max [N] items
- Prioritize by [criteria]
```

**Content creation**:

```
- Language: Romanian only
- Tone: [professional/friendly/technical]
- Length: [word count or structure]
- Format: [Markdown/HTML/plain text]
```

---

## Best Practices

1. **Be explicit, not implicit**: State constraints explicitly, don't rely on context
2. **One task per prompt**: Split complex tasks into multiple focused prompts
3. **Test with examples**: Include example inputs/outputs for complex tasks
4. **Iterate systematically**: Follow 5-step loop, don't guess at fixes
5. **Document patterns**: When a prompt works well, save it as a template
6. **Review before execution**: Always run prompt lint checklist
7. **Measure success**: Define success criteria before executing prompt

---

## Related Documentation

- **Code Generation Rules**: `docs/ PROMPTING_RULES_FOR_CODEGEN.md` - Code-specific guidelines
- **System Patterns**: `memory-bank/systemPatterns.md` - Architecture patterns
- **Technical Context**: `memory-bank/techContext.md` - Technology stack details

---

**Last Updated**: January 2025  
**Status**: Active Standard - All prompts should follow this system
