# Yuvoo - Product Context

## Problem Statement

Parents in Romania face significant challenges when trying to find appropriate sports activities for their children:

1. **Information Fragmentation**: Sports club information is scattered across multiple sources (websites, social media, word-of-mouth)
2. **Lack of Guidance**: No systematic way to match a child's characteristics (age, personality, interests, physical build) with suitable sports
3. **Trust Issues**: Difficulty verifying club quality, safety protocols, and coach qualifications
4. **Medical Concerns**: Uncertainty about when to consult specialists for sports-related health issues (posture, injuries, anxiety)
5. **Time Investment**: Researching and comparing clubs is time-consuming and overwhelming

## Solution Overview

Yuvoo provides a unified platform that:

1. **Guides Discovery**: AI-powered quiz analyzes child profile and recommends 3-5 suitable sports with explanations
2. **Curates Options**: Verified directory of sports clubs with filtering (sport, age, location, level, verification status)
3. **Ensures Safety**: Club verification process validates legal identity, facilities, coach qualifications, and safety protocols
4. **Connects Medical Support**: Integrated pediatric specialists (orthopedists, nutritionists, psychologists) for when medical consultation is needed
5. **Streamlines Journey**: Complete flow from quiz → recommendations → club discovery → specialist referral (if needed)

## User Experience Goals

### For Parents

**Primary User Journey**:

1. Land on homepage → Understand value proposition
2. Create account or start quiz directly
3. Complete AI Coach Quiz for their child
4. Receive personalized sport recommendations with reasoning
5. Browse verified clubs matching recommended sports
6. View club details (location, schedule, pricing, verification status)
7. Optionally: See recommended specialists if quiz detects risk signals
8. Save results and manage multiple children's profiles

**Key UX Principles**:

- **Intuitive**: Clear, step-by-step process with minimal friction
- **Trustworthy**: Verification badges, specialist credentials, transparent information
- **Accessible**: Romanian language, clear explanations, parent-friendly terminology
- **Personalized**: Recommendations tailored to each child's unique profile
- **Actionable**: Direct paths to contact clubs or book consultations
- **Language**: **CRITICAL** - All user-facing content must be exclusively in Romanian language (UI text, quiz questions, recommendations, club/doctor information, emails, error messages, etc.)

### For Sports Clubs

**Value Provided**:

- Verified badge increases credibility
- Lead generation from qualified parents
- Professional profile presentation
- Integration into discovery platform

**Club Onboarding**:

- Submit club information
- Undergo verification process (legal, facilities, coaches, safety)
- Receive verified status
- Access to parent leads

### For Pediatric Specialists

**Value Provided**:

- Professional profile visibility
- Referrals from AI Coach when medical consultation is recommended
- Integration with sports-focused patient base

**Specialist Profiles Include**:

- Specialty and sub-specialties
- Experience with children's sports
- Areas of interest (posture, injuries, nutrition, psychology)
- Contact information and booking links

## Product Features (Phase 1)

### 1. AI Coach Quiz (v1)

**Purpose**: Central entry point for most users, providing personalized sport recommendations

**Question Categories**:

- Age and developmental stage
- Energy level (low, medium, high, very high)
- Personality traits (outgoing, introverted, competitive, cooperative, etc.)
- Physical build and characteristics
- Interests and hobbies
- Previous sports experience
- Time availability
- Budget considerations
- Parent goals (fitness, competition, social, etc.)

**Output**:

- 3-5 recommended sports ranked by relevance
- Match scores (0-100) for each recommendation
- Clear explanations in accessible language
- Key reasons for each recommendation
- Developmental benefits
- Potential challenges or considerations
- Medical risk warnings (if applicable)

**AI Approach (Phase 1)**:

- Rule-based system correlating answers with sport characteristics
- Compatibility evaluations
- Risk detection (e.g., back pain, competition anxiety)
- Human-readable explanations
- **Language**: All AI-generated recommendations, explanations, and reasoning must be in Romanian language

**Future Enhancement**: ML models for improved recommendations

### 2. Club Directory

**Core Functionality**:

- Search and filter clubs by:
  - Sport type
  - Age groups accepted
  - City/neighborhood
  - Skill level (beginner/advanced)
  - Verification status
  - Trial availability
- View club profiles with:
  - Name, location, contact details
  - Sports offered and age groups
  - Pricing information
  - Photos and descriptions
  - Verification badge
  - Coach information
  - Schedule
  - External links for enrollment

**Geographic Focus**: Bucharest (Phase 1)
**Target**: 30+ verified clubs

### 3. Club Verification System

**Verification Criteria**:

- Legal identity verification
- Facility and equipment confirmation
- Minimum coach qualification verification
- Safety protocol confirmation
- Internal Yuvoo team review

**Status Levels**:

- Verified (badge displayed)
- Pending verification
- Not verified

**Purpose**: Build trust and position Yuvoo as "safe and focused on healthy child development"

### 4. Pediatric Specialists Directory

**Specialist Types**:

- Pediatric Orthopedist
- General Pediatrician
- Children's Nutritionist
- Sports Psychologist

**Profile Information**:

- Name, photo, specialty
- Clinic/practice details
- Sports-related experience
- Areas of interest (posture, injuries, obesity, anxiety)
- Contact methods (phone, email, booking links)

**Integration**: AI Coach triggers specialist recommendations when risk signals detected

**Target**: 5-10 specialists (Phase 1)

### 5. Parent & Child Profiles

**Parent Account**:

- Basic profile (name, email, phone)
- Multiple children management
- Saved quiz results
- Favorite clubs/doctors
- Booking history (Phase 2)

**Child Profile**:

- Name, date of birth, gender
- Physical measurements (optional)
- Medical notes and allergies
- Quiz results and recommendations
- Associated bookings

**Purpose**: Personalize experience and maintain history

### 6. Landing Page & Onboarding

**Landing Page Elements**:

- Clear value proposition: "Discover the right sport for your child"
- 3-step process explanation
- Sign-up form
- Trust indicators (badges, verification, specialists)
- Call-to-action to start quiz

**Onboarding Flow**:

- Account creation
- Add first child
- Optional: Start quiz immediately
- Dashboard introduction

## Success Criteria

**User Adoption**:

- High quiz completion rate (>70%)
- Strong click-through to clubs (>40%)
- Positive user feedback (80% would recommend)

**Market Validation**:

- Demonstrated interest in AI Sport Coach in Romania
- Utility of club directory confirmed
- Parent willingness to consult specialists validated
- Conversion rate data collected
- Purchase intent for future services assessed

**Platform Quality**:

- 30+ verified clubs in Bucharest
- 5-10 active specialists
- Reliable verification process
- Smooth user experience

## Future Vision (Post-Phase 1)

- Payment-enabled bookings
- Family calendar management
- Advanced ML recommendations
- Expanded geographic coverage
- Club admin dashboards
- Public review system
- Non-sport activities integration
