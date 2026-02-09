# Prompt: Search and Modify Pricing (Raport + Clubs)

**Created**: February 2026  
**Based on**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)  
**Purpose**: Guide an AI agent to search and modify all pricing values across the codebase.

---

## TASK RESTATEMENT

**Task**: Search the entire Yuvoo codebase for pricing references and update them to the new values:

1. **Raport (Quiz Report) pricing**: Change from 39 lei → **9.99 lei**
2. **Clubs Premium pricing**:
   - Monthly: Change from 99 lei → **99.99 RON per month**
   - Yearly: Change from 990 lei → **999.99 RON** (discounted yearly plan)

**Scope**:

- All source code files (`src/`)
- Documentation and memory-bank files that reference these prices
- UI copy, FAQ content, and marketing text

**Output Format**: Execute the changes using minimal diffs. List all modified files and locations after completion.

---

## CONTEXT

### Current State (Before Changes)

**Raport pricing**:

- `src/modules/payments/payments.service.ts`: `PAYMENT_AMOUNT_LEI = 39`, `PAYMENT_AMOUNT_BANI = 3900`
- UI: "Plătește 39 lei", "39 lei (plată unică)"
- FAQ, memory-bank, docs: multiple references to "39 lei"

**Clubs premium pricing**:

- `src/modules/payments/lead-payment.service.ts`: `PREMIUM_MONTHLY_AMOUNT_LEI = 99`, `PREMIUM_YEARLY_AMOUNT_LEI = 990`
- Bani: 9900 (monthly), 99000 (yearly)
- UI: "99 lei/lună sau 990 lei/an"
- `src/modules/clubs/premium-club.service.ts`: returns 9900 or 99000
- Schema comments, memory-bank, docs: 99 lei/month, 990 lei/year

### Target State (After Changes)

| Product       | Old Value | New Value  | Bani (lei × 100) |
| ------------- | --------- | ---------- | ---------------- |
| Raport        | 39 lei    | 9.99 lei   | 999              |
| Clubs Monthly | 99 lei    | 99.99 RON  | 9999             |
| Clubs Yearly  | 990 lei   | 999.99 RON | 99999            |

### Currency Display Convention

- Romanian locale uses comma for decimals: **9,99 lei**, **99,99 RON**, **999,99 RON**
- In code (constants): use numeric values (9.99, 99.99, 999.99)
- In UI copy: use comma format (9,99 / 99,99 / 999,99) where displayed to users

---

## CONSTRAINTS

- **Only modify pricing-related values** – do not change logic, styling, or unrelated text
- **Preserve existing patterns** – if a file uses "lei" vs "RON", follow the existing convention in that file (RON is preferred for clubs; lei is used for raport)
- **Update memory-bank and docs** – `memory-bank/productContext.md`, `memory-bank/progress.md`, `memory-bank/activeContext.md` contain pricing references that must be updated
- **Do NOT modify**:
  - Stripe webhook logic
  - Payment flow logic (only amount values)
  - Bootstrap/CSS files (e.g., `#ffcd39` is a color, not pricing)
  - SVG font files
- **Search comprehensively** – use grep/search for: `39`, `99`, `990`, `3900`, `9900`, `99000`, `lei`, `RON`, `PAYMENT_AMOUNT`, `PREMIUM_MONTHLY`, `PREMIUM_YEARLY`, `raport`, `pricing`

---

## FILES TO SEARCH AND MODIFY

### Raport (9.99 lei)

| File                                                                                                     | Change                                                                                  |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `src/modules/payments/payments.service.ts`                                                               | `PAYMENT_AMOUNT_LEI = 9.99`, `PAYMENT_AMOUNT_BANI = 999`                                |
| `src/app/actions/payments.ts`                                                                            | `amount: 999` (if hardcoded override; otherwise remove override if service provides it) |
| `src/components/features/payments/PaymentForm.tsx`                                                       | "Plătește 9,99 lei"                                                                     |
| `src/data/faq-data.tsx`                                                                                  | All "39 lei" → "9,99 lei"                                                               |
| `docs/COPY_LIBRARY.md`                                                                                   | Any 39 lei references → 9,99 lei                                                        |
| `memory-bank/productContext.md`                                                                          | 39 lei → 9,99 lei                                                                       |
| `memory-bank/progress.md`                                                                                | 39 lei → 9,99 lei                                                                       |
| `memory-bank/activeContext.md`                                                                           | 39 lei → 9,99 lei                                                                       |
| `docs/PRICING_PARENTS_*.md`, `docs/STRIPE_IMPLEMENTATION_GUIDE.md`, `docs/PAYMENT_FLOW_TESTING_GUIDE.md` | 39 lei → 9,99 lei; 3900 → 999                                                           |

### Clubs (99.99 RON/month, 999.99 RON/year)

| File                                                                            | Change                                                                                                     |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `src/modules/payments/lead-payment.service.ts`                                  | `PREMIUM_MONTHLY_AMOUNT_LEI = 99.99`, `PREMIUM_YEARLY_AMOUNT_LEI = 999.99`; recalculate BANI (9999, 99999) |
| `src/modules/clubs/premium-club.service.ts`                                     | Return 9999 for monthly, 99999 for yearly                                                                  |
| `src/components/features/clubs/PremiumUpgrade.tsx`                              | "99 lei/lună" → "99,99 RON/lună"; "990 lei/an" → "999,99 RON/an"                                           |
| `src/components/features/clubs/ClubsLandingBenefits.tsx`                        | "99 lei/lună sau 990 lei/an" → "99,99 RON/lună sau 999,99 RON/an"                                          |
| `src/components/features/clubs/ClubsLandingHero.tsx`                            | Same as above                                                                                              |
| `src/components/features/clubs/ClubsLandingFinalCTA.tsx`                        | Same as above                                                                                              |
| `src/lib/db/schema.ts`                                                          | Comments: "99 lei/month" → "99.99 RON/month"; "990 lei/year" → "999.99 RON/year"                           |
| `src/types/leads.ts`                                                            | Comments: 9900 → 9999, 99000 → 99999                                                                       |
| `memory-bank/progress.md`                                                       | 99 lei/month, 990 lei/year → 99,99 RON/month, 999,99 RON/year                                              |
| `memory-bank/activeContext.md`                                                  | Same                                                                                                       |
| `docs/IMPLEMENTATION_STATUS_ANALYSIS.md`, `docs/PRICING_IMPLEMENTATION_PLAN.md` | Update amounts                                                                                             |

### SQL Migrations and Drizzle

- **Do NOT modify** existing migration files (they represent historical state)
- **Update** any `add-subscription-type-fields.sql` or similar if they contain inline documentation of current pricing
- Schema comments only – no data migrations required for this change

---

## OUTPUT FORMAT

After completing changes:

1. **Summary**: List all modified files with bullet points
2. **Verification**: Confirm constants and bani values:
   - Raport: `PAYMENT_AMOUNT_LEI = 9.99`, `PAYMENT_AMOUNT_BANI = 999`
   - Clubs: `PREMIUM_MONTHLY_AMOUNT_BANI = 9999`, `PREMIUM_YEARLY_AMOUNT_BANI = 99999`
3. **Manual check**: Suggest running `npm run lint` and `npm run build` to verify no breakage

---

## CODE CHANGE RULES

- Use minimal diffs: only change pricing values and related copy
- Preserve existing code style and patterns
- Do NOT refactor unrelated code
- Do NOT change imports unless required
- Do NOT modify comments unless they reference incorrect pricing
- Follow existing TypeScript/React patterns in the codebase
- Use existing utility functions when available
- Maintain backward compatibility for payment flow logic
- All user-facing pricing text must remain in Romanian

---

## PROMPT LINT CHECKLIST

- [x] Verbosity controlled: Specific files and values listed
- [x] Scope bounded: Explicit DO NOT modify sections
- [x] Ambiguity resolved: Old vs new values clearly specified
- [x] Output structured: Summary and verification steps
- [x] Context sufficient: Current and target state documented
- [x] Constraints explicit: Dedicated constraints section
- [x] Task restated: Clear task restatement at top

---

**Usage**: Provide this prompt to an AI agent (e.g., Cursor) to execute the pricing changes. The agent should search first, then apply changes file by file.
