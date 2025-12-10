# Quiz Module

AI Coach Quiz business logic and AI analysis.

## Files

- `quiz.service.ts` - Business logic for quiz operations
- `quiz.repository.ts` - Data access for quiz data
- `quiz.analyzer.ts` - AI analysis logic (OpenAI integration)
- `quiz.types.ts` - TypeScript types

## Functions

### Service

- `submitQuiz(input)` - Submit quiz and get AI recommendations
- `getQuizResult(quizId)` - Get quiz result by ID
- `getQuizHistory(childId)` - Get quiz history for a child

### Analyzer

- `analyze(submission)` - Analyze quiz with AI and generate recommendations

### Repository

- `create(input)` - Create quiz submission
- `saveResults(quizId, recommendations)` - Save AI recommendations
- `findResultById(quizId)` - Find result by ID
- `findByChildId(childId)` - Find quizzes by child

## Usage

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

// result.recommendations contains AI-generated sport recommendations
```
