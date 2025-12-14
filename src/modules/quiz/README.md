# Quiz Module

AI Coach Quiz business logic and AI analysis for personalized sport recommendations.

## Overview

The Quiz Module provides a complete system for collecting child profile information through a 6-question quiz and generating personalized sport recommendations using OpenAI GPT-4 Turbo. All content is generated in Romanian language.

## Architecture

```
Quiz Flow:
1. User completes quiz → QuizContainer (Client Component)
2. Submit → submitQuizAction (Server Action)
3. Validation → Zod schemas
4. Service Layer → submitQuiz()
5. Repository → Save to database
6. Analyzer → AI recommendations (OpenAI)
7. Repository → Save recommendations
8. Results → Display recommendations
```

## Files

- `quiz.service.ts` - Business logic for quiz operations (orchestration)
- `quiz.repository.ts` - Data access layer (Drizzle ORM)
- `quiz.analyzer.ts` - AI analysis orchestration (with fallback)
- `ai-recommendations.service.ts` - OpenAI integration (GPT-4 Turbo)
- `sport-club-mapping.service.ts` - Maps quiz recommendations to clubs
- `quiz.types.ts` - TypeScript interfaces and types

## Service Functions

### `submitQuiz(input: CreateQuizInput): Promise<QuizResult>`

Orchestrates the complete quiz submission flow:

1. Saves quiz answers to database
2. Generates AI recommendations (with fallback)
3. Saves recommendations to database
4. Returns complete quiz result

**Parameters:**

- `input.childId` - UUID of the child profile
- `input.answers` - Complete quiz answers (6 questions)

**Returns:** `QuizResult` with AI-generated recommendations

**Throws:** Error with Romanian message if submission fails

**Example:**

```typescript
import { submitQuiz } from "@/modules/quiz/quiz.service";

const result = await submitQuiz({
  childId: "child-123",
  answers: {
    age: 8,
    energyLevel: "high",
    personality: ["competitive", "social"],
    interests: ["football", "swimming"],
    physicalBuild: "athletic",
    previousSports: ["football"],
    preferences: {
      indoor: false,
      outdoor: true,
      team: true,
      individual: false,
    },
  },
});

// result.recommendations contains 3-5 sport recommendations
// Each recommendation includes:
// - sportId, sportName, matchScore (0-100)
// - reasoning (Romanian explanation)
// - benefits, considerations
```

### `getQuizResult(quizId: string): Promise<QuizResult | null>`

Retrieves a complete quiz result by ID (public access, no auth required).

**Parameters:**

- `quizId` - UUID of the quiz result

**Returns:** `QuizResult` or `null` if not found

### `getQuizHistory(childId: string): Promise<QuizResult[]>`

Gets all completed quizzes for a child, ordered by most recent first.

**Parameters:**

- `childId` - UUID of the child profile

**Returns:** Array of `QuizResult` objects

## Analyzer Functions

### `analyze(submission: QuizSubmission): Promise<SportRecommendation[]>`

Analyzes quiz submission and generates sport recommendations using AI.

**Flow:**

1. Attempts AI-powered recommendations via OpenAI
2. Falls back to generic age-based recommendations if AI fails
3. Returns 3-5 sport recommendations

**Parameters:**

- `submission` - Quiz submission with answers

**Returns:** Array of `SportRecommendation` objects

**Error Handling:** Automatic fallback to generic recommendations

## Repository Functions

### `create(input: CreateQuizInput): Promise<QuizSubmission>`

Saves quiz answers to database. Recommendations are saved separately after AI processing.

### `saveResults(quizId: string, recommendations: SportRecommendation[]): Promise<QuizResult>`

Updates quiz record with AI-generated recommendations.

### `findResultById(quizId: string): Promise<QuizResult | null>`

Retrieves complete quiz with answers and recommendations.

### `findByChildId(childId: string): Promise<QuizResult[]>`

Returns quiz history for a specific child, ordered by most recent first. Filters out incomplete quizzes.

## AI Integration

### OpenAI Configuration

- **Model:** GPT-4 Turbo
- **Temperature:** 0.7 (balanced creativity/consistency)
- **Max Tokens:** 2000
- **Language:** Romanian (enforced in system prompt)

### System Prompt

The AI is configured as a pediatric sports specialist with expertise in:

- Pediatric sports psychology
- Child development (ages 4-14)
- Sports available in Romania
- Cultural and geographic context

### Fallback Mechanism

If OpenAI API fails:

- Logs error for monitoring
- Generates generic age-based recommendations
- Ensures quiz submission always succeeds

## Integration Points

### Club Integration

**Service:** `sport-club-mapping.service.ts`

- `getClubsForRecommendations()` - Filters clubs by recommended sports
- `isClubRecommended()` - Checks if club matches quiz recommendations
- `rankClubsByRecommendations()` - Sorts clubs by match score

**Usage:**

```typescript
import { getClubsForRecommendations } from "@/modules/quiz/sport-club-mapping.service";

const clubs = await getClubsForRecommendations(
  result.recommendations,
  "București" // Optional city filter
);
```

### Dashboard Integration

Quiz history is displayed in:

- Parent Dashboard (`/parent/dashboard`) - Recent quiz activity
- Child Quiz History (`/parent/children/[childId]/quizzes`) - All quizzes for a child

## Error Handling

All errors include Romanian messages:

- **Validation Errors:** Zod schema validation with Romanian messages
- **AI Errors:** Automatic fallback to generic recommendations
- **Database Errors:** Romanian error messages with context
- **Authentication Errors:** Clear Romanian messages for unauthorized access

## Type Definitions

### `QuizAnswers`

Complete quiz answers structure:

- `age` - Child age (4-14)
- `energyLevel` - "low" | "medium" | "high" | "very_high"
- `personality` - Array of personality traits
- `interests` - Current interests
- `previousSports` - Previously tried sports
- `physicalBuild` - "slim" | "average" | "athletic"
- `preferences` - Indoor/outdoor, team/individual preferences

### `SportRecommendation`

AI-generated recommendation:

- `sportId` - Unique sport identifier
- `sportName` - Display name (Romanian)
- `matchScore` - 0-100 compatibility score
- `reasoning` - AI explanation (Romanian)
- `benefits` - Array of specific benefits
- `considerations` - Array of practical considerations

### `QuizResult`

Complete quiz result:

- `id` - Quiz UUID
- `childId` - Child UUID
- `recommendations` - Array of sport recommendations
- `createdAt` - Submission timestamp

## Server Actions

Quiz operations are exposed via Server Actions in `app/actions/quiz.ts`:

- `submitQuizAction()` - Submit quiz (requires auth)
- `getQuizResultAction()` - Get result (public)
- `getQuizHistoryAction()` - Get history (requires auth + child ownership)
- `saveQuizResultsAction()` - Mark as saved (requires auth)

## Validation

All quiz inputs are validated using Zod schemas in `lib/validations/quiz.ts`:

- Individual question schemas
- Complete `createQuizInputSchema` for submission
- All error messages in Romanian

## Performance Considerations

- **AI Processing:** ~3-5 seconds (OpenAI API call)
- **Database Operations:** Optimized with indexes on `childId`
- **Caching:** Results are cacheable (public results page)
- **Fallback:** Ensures submission always completes even if AI fails

## Future Enhancements

- [ ] Cache common quiz patterns to reduce AI calls
- [ ] Add quiz comparison feature (compare multiple quizzes)
- [ ] Export quiz results as PDF
- [ ] Add quiz sharing functionality
- [ ] Implement quiz favorites/bookmarks
