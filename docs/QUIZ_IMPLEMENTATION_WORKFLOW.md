# Quiz System Implementation Workflow

## Overview

**Feature**: AI Coach Quiz System (Week 5-8)
**Strategy**: Systematic
**Personas**: Frontend, Backend, Architect
**Estimated Time**: 3-4 weeks
**Complexity**: High (AI integration, multi-step flow, Romanian language)

---

## Phase 1: Foundation & Architecture (Week 5, Days 1-3)

### 1.1 Quiz Data Models & Database Schema ⚡ Architecture

**Estimated Time**: 6 hours
**Persona**: Architect, Backend
**Dependencies**: Database schema, Drizzle ORM setup

#### Implementation Steps:

1. **Review existing schema** (30 minutes)
   - Read `src/lib/db/schema.ts`
   - Verify `quizzes` table structure
   - Confirm JSONB support for answers/recommendations

2. **Create TypeScript types** (2 hours)
   - Location: `src/modules/quiz/quiz.types.ts`
   - Define `QuizAnswers` interface (6 question types)
   - Define `QuizSubmission` interface
   - Define `SportRecommendation` interface
   - Define `QuizResult` interface
   - Create input/output types for validation

3. **Create Zod validation schemas** (2 hours)
   - Location: `src/lib/validations/quiz.ts`
   - Schema for each question type (age, energy, personality, interests, physical, preferences)
   - Schema for complete quiz submission
   - Romanian error messages for validation

4. **Database migration** (1 hour)
   - Generate migration if needed: `npm run db:generate`
   - Push schema changes: `npm run db:push`
   - Verify schema in Drizzle Studio: `npm run db:studio`

5. **Testing** (30 minutes)
   - Verify database schema
   - Test Zod validation schemas
   - Confirm JSONB storage working

**Acceptance Criteria**:

- [x] `QuizAnswers` interface complete with all 6 question types
- [x] `SportRecommendation` interface with matchScore, reasoning, benefits
- [x] Zod schemas validate all question types with Romanian errors
- [x] Database schema supports JSONB storage
- [x] TypeScript types exported and documented

**Files Created**:

- `src/modules/quiz/quiz.types.ts` - TypeScript interfaces
- `src/lib/validations/quiz.ts` - Zod schemas

---

### 1.2 Quiz Service Layer 🏗️ Backend

**Estimated Time**: 8 hours
**Persona**: Backend
**Dependencies**: Quiz types, OpenAI integration

#### Implementation Steps:

1. **Create quiz repository** (2 hours)
   - Location: `src/modules/quiz/quiz.repository.ts`
   - `createQuizSubmission(childId, answers)` - Save quiz answers
   - `getQuizById(id)` - Retrieve quiz by ID
   - `getQuizzesByChildId(childId)` - Get all quizzes for child
   - `updateQuizRecommendations(id, recommendations)` - Store AI results

2. **Create quiz service** (4 hours)
   - Location: `src/modules/quiz/quiz.service.ts`
   - `submitQuiz(childId, answers)` - Submit quiz and trigger AI
   - `getQuizResults(quizId)` - Retrieve results with recommendations
   - `getChildQuizHistory(childId)` - Get quiz history
   - Orchestrate AI recommendation generation
   - Handle errors gracefully

3. **Create Server Actions** (2 hours)
   - Location: `src/app/actions/quiz.ts`
   - `submitQuizAction(childId, answers)` - Public action
   - `getQuizResultsAction(quizId)` - Retrieve results
   - `getChildQuizzesAction(childId)` - Protected action (auth required)
   - Use `requireAuth()` for protected actions

**Acceptance Criteria**:

- [x] Quiz repository methods work with Drizzle ORM
- [x] Quiz service orchestrates submission → AI → storage flow
- [x] Server Actions use authentication properly
- [x] Error handling with Romanian messages
- [x] All functions tested and working

**Files Created**:

- `src/modules/quiz/quiz.repository.ts` - Data access layer
- `src/modules/quiz/quiz.service.ts` - Business logic
- `src/app/actions/quiz.ts` - Server Actions

---

### 1.3 OpenAI Integration 🤖 AI

**Estimated Time**: 10 hours
**Persona**: Backend, AI Specialist
**Dependencies**: OpenAI API key, quiz types

#### Implementation Steps:

1. **Setup OpenAI client** (1 hour)
   - Location: `src/lib/integrations/openai.ts`
   - Configure OpenAI client with API key
   - Set model: GPT-4 Turbo
   - Configure timeout and retry logic

2. **Design system prompt** (3 hours)
   - **CRITICAL**: All content MUST be in Romanian
   - Define AI role: "Asistent recomandări sport pentru părinți români"
   - Specify expertise: sports psychology, child development, Romanian sports culture
   - Output format: JSON with matchScore, reasoning, benefits, considerations
   - Age-appropriate recommendations (4-14 years)
   - Consider safety and developmental appropriateness

3. **Create AI recommendation service** (4 hours)
   - Location: `src/modules/quiz/ai-recommendations.service.ts`
   - `generateRecommendations(quizAnswers)` - Main function
   - Build prompt from quiz answers
   - Call OpenAI API with Romanian system prompt
   - Parse and validate AI response
   - Map sports to Romanian names
   - Handle API errors and fallbacks

4. **Testing and refinement** (2 hours)
   - Test with various quiz answer combinations
   - Verify Romanian language quality
   - Check reasoning clarity and helpfulness
   - Ensure match scores are reasonable (0-100)
   - Test error handling (API failures, timeouts)

**System Prompt Example** (Romanian):

```typescript
const systemPrompt = `
Ești un asistent AI specializat în recomandări de sporturi pentru copii din România, cu vârste între 4 și 14 ani.

IMPORTANT: Generează TOATE răspunsurile EXCLUSIV în limba română.

Expertiza ta include:
- Psihologia sportivă pediatrică
- Dezvoltarea fizică și mentală a copiilor
- Sporturi populare și disponibile în România
- Adaptarea recomandărilor la context cultural românesc

Sarcina ta:
1. Analizează răspunsurile părintelui despre copilul lor
2. Recomandă 3-5 sporturi potrivite
3. Oferă un scor de potrivire (0-100) pentru fiecare sport
4. Explică CLAR și EMPATIC de ce recomanzi fiecare sport
5. Menționează beneficiile specifice pentru acest copil
6. Notează eventuale considerente (ex: echipament necesar, timp de antrenament)

Format răspuns JSON:
{
  "recommendations": [
    {
      "sportId": "fotbal",
      "sportName": "Fotbal",
      "matchScore": 95,
      "reasoning": "Explicație clară în română...",
      "benefits": ["Beneficiu 1", "Beneficiu 2"],
      "considerations": ["Considerent 1", "Considerent 2"]
    }
  ]
}

Ton: Cald, suportiv (70%), Expert și încrezător (30%)
`;
```

**Acceptance Criteria**:

- [x] OpenAI client configured and working
- [x] System prompt generates Romanian recommendations only
- [x] Recommendations are age-appropriate and culturally relevant
- [x] Match scores are reasonable (80-100 for top matches)
- [x] Reasoning is clear, empathetic, and helpful
- [x] Error handling prevents crashes
- [x] API costs are reasonable (<$0.10 per quiz)

**Files Created**:

- `src/lib/integrations/openai.ts` - OpenAI client
- `src/modules/quiz/ai-recommendations.service.ts` - AI service

---

## Phase 2: Quiz UI Components (Week 5-6, Days 4-10)

### 2.1 Quiz Container & Progress Indicator 🎨 Frontend

**Estimated Time**: 8 hours
**Persona**: Frontend
**Dependencies**: Routes, quiz types, design tokens

#### Implementation Steps:

1. **Create progress indicator component** (2 hours)
   - Location: `src/components/features/quiz/QuizProgress.tsx`
   - Props: `currentStep`, `totalSteps`
   - Bootstrap progress bar with Yuvoo branding
   - Progress percentage display
   - Step indicator (e.g., "Întrebarea 2 din 6")

2. **Create quiz container component** (4 hours)
   - Location: `src/components/features/quiz/QuizContainer.tsx`
   - Client Component (`'use client'`)
   - State management: current step, answers
   - Navigation: next, back, submit
   - Progress tracking
   - Form validation before navigation
   - Handle quiz submission

3. **Create quiz navigation buttons** (1 hour)
   - Location: `src/components/features/quiz/QuizNavigation.tsx`
   - "Înapoi" button (disabled on first step)
   - "Următorul" button (disabled if answer invalid)
   - "Finalizează" button (on last step)
   - Bootstrap button styling

4. **Responsive layout** (1 hour)
   - Mobile-first design
   - Progress indicator at top
   - Question section centered
   - Navigation buttons at bottom
   - Test on mobile, tablet, desktop

**Acceptance Criteria**:

- [x] Progress indicator shows current step visually
- [x] Navigation works smoothly between steps
- [x] Form validation prevents invalid navigation
- [x] Responsive on all screen sizes
- [x] Romanian text throughout

**Files Created**:

- `src/components/features/quiz/QuizProgress.tsx`
- `src/components/features/quiz/QuizContainer.tsx`
- `src/components/features/quiz/QuizNavigation.tsx`

---

### 2.2 Question Components (6 Question Types) 🎨 Frontend

**Estimated Time**: 12 hours
**Persona**: Frontend
**Dependencies**: Quiz types, Copy Library, Bootstrap components

#### Implementation Steps:

1. **Question 1: Age & Basic Info** (1.5 hours)
   - Location: `src/components/features/quiz/questions/AgeQuestion.tsx`
   - Number input for age (4-14)
   - Radio buttons for gender (optional)
   - Validation: age required, 4-14 range
   - Romanian labels from Copy Library

2. **Question 2: Energy Level** (1.5 hours)
   - Location: `src/components/features/quiz/questions/EnergyQuestion.tsx`
   - Radio buttons: "Scăzut", "Mediu", "Ridicat", "Foarte ridicat"
   - Visual indicators (icons/emojis)
   - Validation: one selection required
   - Help text explaining each level

3. **Question 3: Personality Traits** (2 hours)
   - Location: `src/components/features/quiz/questions/PersonalityQuestion.tsx`
   - Checkboxes: "Extrovert", "Introvert", "Competitiv", "Cooperant"
   - Multiple selections allowed
   - Visual trait cards
   - Validation: at least one trait required

4. **Question 4: Interests & Hobbies** (2 hours)
   - Location: `src/components/features/quiz/questions/InterestsQuestion.tsx`
   - Checkboxes for interests (sports, arts, outdoor, technology)
   - Text input for previous sports experience
   - Validation: at least one interest required
   - Help text with examples

5. **Question 5: Physical Build** (1.5 hours)
   - Location: `src/components/features/quiz/questions/PhysicalQuestion.tsx`
   - Radio buttons: "Subțire", "Mediu", "Atletic"
   - Optional textarea for physical considerations
   - Validation: one selection required
   - Sensitive wording (avoid body shaming)

6. **Question 6: Preferences** (2 hours)
   - Location: `src/components/features/quiz/questions/PreferencesQuestion.tsx`
   - Toggle switches: Interior/Exterior, Echipă/Individual
   - Optional fields: time availability, budget
   - Validation: at least one preference required
   - Help text explaining preferences

7. **Shared question wrapper component** (1.5 hours)
   - Location: `src/components/features/quiz/QuestionWrapper.tsx`
   - Consistent layout for all questions
   - Question title, description, help text
   - Error message display
   - Props: title, description, children, error

**Acceptance Criteria**:

- [x] All 6 question components complete
- [x] Validation works correctly for each question
- [x] Romanian text from Copy Library used
- [x] Bootstrap styling consistent
- [x] Accessible (WCAG AA)
- [x] Mobile-friendly

**Files Created**:

- `src/components/features/quiz/questions/AgeQuestion.tsx`
- `src/components/features/quiz/questions/EnergyQuestion.tsx`
- `src/components/features/quiz/questions/PersonalityQuestion.tsx`
- `src/components/features/quiz/questions/InterestsQuestion.tsx`
- `src/components/features/quiz/questions/PhysicalQuestion.tsx`
- `src/components/features/quiz/questions/PreferencesQuestion.tsx`
- `src/components/features/quiz/QuestionWrapper.tsx`

---

### 2.3 Quiz Intro Page 🎨 Frontend

**Estimated Time**: 4 hours
**Persona**: Frontend
**Dependencies**: Routes, Copy Library, design tokens

#### Implementation Steps:

1. **Create quiz intro component** (3 hours)
   - Location: `src/app/(public)/chestionar/page.tsx`
   - Server Component (default)
   - Hero section with quiz title
   - Benefits section ("Ce vei primi:")
   - Estimated time display (5-7 minute)
   - Trust message ("Datele tale sunt sigure")
   - CTA button "Începe Chestionarul"
   - Copy from `docs/COPY_LIBRARY.md`

2. **Styling and layout** (1 hour)
   - Bootstrap container/grid layout
   - Responsive design (mobile-first)
   - Yuvoo branding colors
   - Icon usage for benefits
   - CTA button prominent

**Acceptance Criteria**:

- [x] Intro page explains quiz purpose clearly
- [x] Benefits listed attractively
- [x] Trust message visible
- [x] CTA button links to `/chestionar/container`
- [x] Romanian text throughout
- [x] SEO-friendly (meta tags, headings)

**Files Created**:

- `src/app/(public)/chestionar/page.tsx`

---

## Phase 3: Quiz Flow & State Management (Week 6, Days 11-14)

### 3.1 Quiz State Management 🔧 Frontend

**Estimated Time**: 6 hours
**Persona**: Frontend
**Dependencies**: Quiz components, quiz types

#### Implementation Steps:

1. **Create quiz context** (3 hours)
   - Location: `src/components/features/quiz/QuizContext.tsx`
   - React Context for quiz state
   - State: currentStep, answers, errors
   - Actions: setAnswer, nextStep, prevStep, submitQuiz
   - Validation before step navigation
   - Client Component (`'use client'`)

2. **Integrate context with container** (2 hours)
   - Update `QuizContainer.tsx` to use context
   - Pass context to question components
   - Handle state updates on answer changes
   - Manage navigation based on validation

3. **Local storage persistence** (1 hour)
   - Save quiz progress to localStorage
   - Restore on page reload
   - Clear on quiz submission
   - Prevent data loss

**Acceptance Criteria**:

- [x] Quiz state managed with React Context
- [x] Answers persist across steps
- [x] Validation prevents invalid navigation
- [x] Progress saved to localStorage
- [x] State cleared on submission

**Files Created**:

- `src/components/features/quiz/QuizContext.tsx`

---

### 3.2 Quiz Submission Flow 🔧 Frontend + Backend

**Estimated Time**: 6 hours
**Persona**: Frontend, Backend
**Dependencies**: Quiz service, Server Actions

#### Implementation Steps:

1. **Create submission handler** (2 hours)
   - Update `QuizContainer.tsx`
   - Handle "Finalizează" button click
   - Call `submitQuizAction()` Server Action
   - Show loading state ("Se procesează...")
   - Handle submission errors
   - Redirect to results page on success

2. **Create loading component** (1 hour)
   - Location: `src/components/features/quiz/QuizLoading.tsx`
   - Display during AI processing
   - Progress animation
   - Romanian messages: "Se analizează răspunsurile...", "Se generează recomandările..."

3. **Error handling** (2 hours)
   - Display error messages in Romanian
   - Retry mechanism for failed submissions
   - Fallback for AI failures
   - User-friendly error messages

4. **Testing** (1 hour)
   - Test complete quiz flow
   - Test error scenarios
   - Test loading states
   - Verify data submission

**Acceptance Criteria**:

- [x] Quiz submission works end-to-end
- [x] Loading state displays during processing
- [x] Errors handled gracefully with Romanian messages
- [x] Redirect to results page on success
- [x] Data saved correctly in database

**Files Created**:

- `src/components/features/quiz/QuizLoading.tsx`

---

## Phase 4: Quiz Results Page (Week 7, Days 15-18)

### 4.1 Results Display Component 🎨 Frontend

**Estimated Time**: 10 hours
**Persona**: Frontend
**Dependencies**: Quiz types, AI recommendations, Copy Library

#### Implementation Steps:

1. **Create results page** (2 hours)
   - Location: `src/app/(public)/chestionar/rezultate/page.tsx`
   - Server Component with dynamic route
   - Fetch quiz results by ID
   - Handle loading/error states
   - SEO meta tags

2. **Create sport recommendation card** (4 hours)
   - Location: `src/components/features/quiz/SportRecommendationCard.tsx`
   - Display: sport name, match score, icon
   - Show reasoning (AI-generated Romanian text)
   - List benefits
   - List considerations
   - CTA: "Vezi cluburi" button
   - Bootstrap card styling

3. **Create specialist recommendation card** (2 hours)
   - Location: `src/components/features/quiz/SpecialistRecommendationCard.tsx`
   - Conditional display (if AI flags concerns)
   - Display recommended specialist type
   - Explanation why specialist recommended
   - CTA: "Vezi specialiști" button

4. **Results actions section** (2 hours)
   - "Salvează rezultatele" button (if authenticated)
   - "Repetă chestionarul" link
   - "Vezi toate cluburile" link
   - Share results functionality (future)

**Acceptance Criteria**:

- [x] Results page displays AI recommendations
- [x] Sport cards show match scores, reasoning, benefits
- [x] Specialist card displays conditionally
- [x] Action buttons work correctly
- [x] Romanian text throughout
- [x] Responsive design

**Files Created**:

- `src/app/(public)/chestionar/rezultate/page.tsx`
- `src/components/features/quiz/SportRecommendationCard.tsx`
- `src/components/features/quiz/SpecialistRecommendationCard.tsx`
- `src/components/features/quiz/ResultsActions.tsx`

---

### 4.2 Save Results Functionality 🔧 Backend + Frontend

**Estimated Time**: 4 hours
**Persona**: Backend, Frontend
**Dependencies**: Authentication, quiz service

#### Implementation Steps:

1. **Create save results action** (2 hours)
   - Location: `src/app/actions/quiz.ts`
   - `saveQuizResultsAction(quizId)` - Protected action
   - Use `requireAuth()` to verify user
   - Link quiz to authenticated parent
   - Update database with user association

2. **Integrate save button** (1 hour)
   - Update `ResultsActions.tsx`
   - Handle authentication check
   - Show login prompt if not authenticated
   - Display success message on save
   - Disable button if already saved

3. **Testing** (1 hour)
   - Test save with authenticated user
   - Test prompt for unauthenticated user
   - Verify database association
   - Test success/error states

**Acceptance Criteria**:

- [x] Authenticated users can save results
- [x] Unauthenticated users see login prompt
- [x] Results linked to parent account
- [x] Success message displays in Romanian
- [x] Database updated correctly

---

## Phase 5: Integration & Polish (Week 7-8, Days 19-25)

### 5.1 Quiz Integration with Clubs 🔗 Integration

**Estimated Time**: 6 hours
**Persona**: Frontend, Backend
**Dependencies**: Club service, routes

#### Implementation Steps:

1. **Sport to club mapping** (2 hours)
   - Create mapping service: `src/modules/quiz/sport-club-mapping.service.ts`
   - Map recommended sports to club sportTypes
   - Filter clubs by recommended sports
   - Location-based filtering (parent's city)

2. **"Vezi cluburi" button integration** (2 hours)
   - Update `SportRecommendationCard.tsx`
   - Link to `/cluburi?sport=<sportId>&quiz=true`
   - Pre-filter clubs by recommended sport
   - Pass quiz context to club page

3. **Quiz results in club listing** (2 hours)
   - Update `src/app/(public)/cluburi/page.tsx`
   - Show quiz-based recommendations banner
   - Highlight clubs matching quiz results
   - "Recomandat pentru [Child Name]" badge

**Acceptance Criteria**:

- [x] "Vezi cluburi" links to filtered club listing
- [x] Clubs filtered by recommended sport
- [x] Quiz context displayed in club page
- [x] Recommended badge shows on matching clubs

**Files Created**:

- `src/modules/quiz/sport-club-mapping.service.ts`

---

### 5.2 Quiz History in Parent Dashboard 📊 Integration

**Estimated Time**: 6 hours
**Persona**: Frontend
**Dependencies**: Parent dashboard, quiz service

#### Implementation Steps:

1. **Create quiz history component** (3 hours)
   - Location: `src/components/features/quiz/QuizHistory.tsx`
   - Display list of child's quizzes
   - Show date, recommended sports
   - Link to view full results
   - "Repetă quiz" button

2. **Integrate with dashboard** (2 hours)
   - Update `src/app/(auth)/parent/dashboard/page.tsx`
   - Show recent quiz activity
   - Quick stats: quizzes completed
   - Link to full quiz history

3. **Create quiz history page** (1 hour)
   - Location: `src/app/(auth)/parent/children/[childId]/quizzes/page.tsx`
   - List all quizzes for child
   - Filter by date
   - View/compare results

**Acceptance Criteria**:

- [x] Quiz history displays in dashboard
- [x] Recent activity shows quiz completions
- [x] Parents can view all past quizzes
- [x] Link to retake quiz works

**Files Created**:

- `src/components/features/quiz/QuizHistory.tsx`
- `src/app/(auth)/parent/children/[childId]/quizzes/page.tsx`

---

### 5.3 Testing & Quality Assurance 🧪 QA

**Estimated Time**: 8 hours
**Persona**: QA, All team members
**Dependencies**: All quiz components and flows

#### Testing Checklist:

1. **Functional Testing** (3 hours)
   - [ ] Quiz intro page displays correctly
   - [ ] All 6 questions render and validate
   - [ ] Progress indicator updates correctly
   - [ ] Navigation (next, back) works smoothly
   - [ ] Form validation prevents invalid submissions
   - [ ] Quiz submission triggers AI recommendations
   - [ ] Results page displays recommendations
   - [ ] Save results functionality works (auth required)
   - [ ] Quiz history displays in dashboard

2. **UI/UX Testing** (2 hours)
   - [ ] Responsive on mobile, tablet, desktop
   - [ ] All text in Romanian
   - [ ] Bootstrap styling consistent
   - [ ] Accessibility (keyboard navigation, screen readers)
   - [ ] Loading states display properly
   - [ ] Error messages clear and helpful

3. **Integration Testing** (2 hours)
   - [ ] OpenAI API integration works
   - [ ] Database saves quiz data correctly
   - [ ] Authentication flow works (save results, history)
   - [ ] Club filtering by quiz results works
   - [ ] Quiz context persists across pages

4. **Error Handling Testing** (1 hour)
   - [ ] Network errors handled gracefully
   - [ ] OpenAI API failures don't crash app
   - [ ] Form validation errors display
   - [ ] Invalid quiz IDs handled
   - [ ] Authentication errors handled

**Acceptance Criteria**:

- [x] All functional tests pass
- [x] UI/UX meets design standards
- [x] Integration points work correctly
- [x] Error handling robust

---

### 5.4 Performance Optimization ⚡ Performance

**Estimated Time**: 4 hours
**Persona**: Performance Engineer
**Dependencies**: Quiz components, OpenAI integration

#### Optimization Steps:

1. **OpenAI response caching** (2 hours)
   - Cache common quiz answer patterns
   - Reduce API calls for similar profiles
   - Set cache TTL (1 week)
   - Monitor cache hit rate

2. **Component optimization** (1 hour)
   - Use `React.memo` for question components
   - Optimize re-renders with context
   - Lazy load question components
   - Code splitting for quiz flow

3. **Database query optimization** (1 hour)
   - Index quiz table by childId
   - Optimize quiz history queries
   - Batch database operations

**Acceptance Criteria**:

- [x] Quiz submission time <5 seconds (with AI)
- [x] Page load times <2 seconds
- [x] Component re-renders minimized
- [x] Database queries optimized

---

### 5.5 Documentation & Handoff 📚 Documentation

**Estimated Time**: 4 hours
**Persona**: Scribe, All team members
**Dependencies**: All quiz implementation

#### Documentation Tasks:

1. **Update memory bank** (1 hour)
   - Update `memory-bank/progress.md`
   - Document quiz system completion
   - Note any technical debt or future improvements

2. **Code documentation** (2 hours)
   - Add JSDoc comments to all quiz functions
   - Document AI prompt design decisions
   - Create README for quiz module

3. **User documentation** (1 hour)
   - Create quiz user guide (internal)
   - Document quiz flow for support team
   - FAQ for common quiz questions

**Files Updated**:

- `memory-bank/progress.md`
- `src/modules/quiz/README.md` (new)

---

## Risk Assessment & Mitigation

### Technical Risks

1. **OpenAI API Reliability** (High)
   - **Risk**: API downtime or rate limits
   - **Mitigation**: Implement retry logic, caching, fallback to pre-defined recommendations
   - **Fallback**: Generic sport recommendations based on age/energy level

2. **Romanian Language Quality** (Medium)
   - **Risk**: AI generates poor quality Romanian
   - **Mitigation**: Extensive prompt engineering, test with native speakers, manual review of outputs
   - **Fallback**: Pre-written Romanian templates for common scenarios

3. **Complex State Management** (Medium)
   - **Risk**: Quiz state bugs, lost progress
   - **Mitigation**: Use React Context properly, localStorage backup, thorough testing
   - **Fallback**: Simple form submission without step-by-step navigation

### Business Risks

1. **User Confusion** (Medium)
   - **Risk**: Users don't understand quiz questions
   - **Mitigation**: Clear help text, examples, tooltips in Romanian
   - **Fallback**: Simplified quiz with fewer questions

2. **Low Completion Rate** (Medium)
   - **Risk**: Users abandon quiz mid-way
   - **Mitigation**: Progress saving, clear time estimate, motivation messages
   - **Tracking**: Monitor completion rates in analytics

---

## Dependencies

### External Dependencies

- **OpenAI API**: GPT-4 Turbo access required
- **Stack Auth**: For save results functionality (authentication)
- **Drizzle ORM**: Database operations
- **Next.js 16**: Cache Components, Server Actions

### Internal Dependencies

- **Child profiles**: User must have child profile before quiz
- **Club data**: For recommendations integration
- **Doctor data**: For specialist recommendations
- **Routes**: All routes defined in `lib/routes.ts`

---

## Success Metrics

### Technical Metrics

- **Quiz Completion Time**: <7 minutes average
- **AI Response Time**: <5 seconds for recommendations
- **Error Rate**: <1% for quiz submissions
- **Page Load Time**: <2 seconds for all quiz pages

### User Metrics

- **Completion Rate**: >70% of started quizzes completed
- **Satisfaction**: >80% positive feedback on recommendations
- **Engagement**: >50% users view recommended clubs
- **Conversion**: >30% users save results to account

---

## Rollout Strategy

### Phase 1: Internal Testing (Week 7, Days 22-23)

- Team testing with various quiz scenarios
- Bug fixing and refinement
- Romanian language review

### Phase 2: Beta Testing (Week 7, Day 24)

- Limited user testing (10-20 parents)
- Collect feedback on recommendations
- Monitor API costs and performance

### Phase 3: Full Launch (Week 8, Day 25)

- Deploy to production
- Monitor error rates and performance
- Collect user feedback
- Iterate based on feedback

---

## Post-Launch Improvements (Future)

### Short-Term (Week 9-10)

- [ ] Add quiz analytics dashboard
- [ ] A/B test different question wordings
- [ ] Improve AI prompt based on feedback
- [ ] Add quiz result sharing functionality

### Medium-Term (Month 2-3)

- [ ] Multi-language support (Hungarian minority)
- [ ] Advanced filtering based on quiz results
- [ ] Quiz result email summaries
- [ ] Quiz retake with comparison to previous results

### Long-Term (Month 4+)

- [ ] ML model for recommendations (replace OpenAI)
- [ ] Dynamic question flow based on answers
- [ ] Integration with club booking (direct from results)
- [ ] Parent community based on quiz results

---

## Quick Reference

### Key Routes

- `/chestionar` - Quiz intro page
- `/chestionar/container` - Quiz flow (6 steps)
- `/chestionar/rezultate/[id]` - Results page
- `/parent/children/[childId]/quizzes` - Quiz history

### Key Files

- `src/modules/quiz/quiz.types.ts` - TypeScript types
- `src/modules/quiz/quiz.service.ts` - Business logic
- `src/modules/quiz/ai-recommendations.service.ts` - AI integration
- `src/components/features/quiz/QuizContainer.tsx` - Main quiz flow
- `src/app/actions/quiz.ts` - Server Actions

### Key Environment Variables

- `OPENAI_API_KEY` - OpenAI API key (required)
- `NEXT_PUBLIC_APP_URL` - App URL for redirects

---

## Summary

This comprehensive workflow ensures:

- ✅ **Complete Implementation**: All quiz features from intro → submission → results
- ✅ **Romanian Language**: All user-facing content in Romanian
- ✅ **AI Integration**: GPT-4 Turbo for personalized recommendations
- ✅ **Quality**: Testing, validation, error handling at every step
- ✅ **Integration**: Seamless connection with clubs, dashboard, authentication
- ✅ **Performance**: Optimized for speed and reliability
- ✅ **Scalability**: Designed for future improvements

**Total Estimated Time**: 3-4 weeks (120-160 hours)
**Complexity**: High
**Risk Level**: Medium (mitigated with fallbacks)

**Next Steps**: Begin with Phase 1 (Foundation & Architecture) and follow the systematic workflow step-by-step.
