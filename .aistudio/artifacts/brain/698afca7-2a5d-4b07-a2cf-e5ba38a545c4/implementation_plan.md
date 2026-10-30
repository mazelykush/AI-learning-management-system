# Implementation Plan: PromptVerse AI

PromptVerse AI is a gamified Progressive Web Application designed to guide users from absolute beginner to AI mastery through structured learning paths, interactive challenges, a prompt playground, and real-time AI feedback.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed based on the initial planning phase and user interaction:

- **Primary Accent Color**: Electric Cyan (as requested by user).
- **AI Tutor Personality**: Professional and Encouraging (as requested by user).
- **Primary Layout Strategy**: Desktop-first (optimized for high-res) (as requested by user).

## 1. Overview & Core Concept

- **What It Does**: A comprehensive AI-learning platform with gamified progress, structured curriculum (Level 1-6), interactive assessment, and a real-time prompt playground.
- **Target Audience**: Beginners to advanced users wanting practical, project-based AI and Prompt Engineering skills.
- **Key Value**: A structured, engaging learning environment that combines interactive AI experimentation with pedagogical best practices.

## 2. User Experience & Visual Design

- **Key User Flows**: 
  - Onboarding Assessment $\to$ Personalized Path Recommendation $\to$ Dashboard.
  - Learning Module $\to$ Lesson Content $\to$ Exercise/Quiz $\to$ XP/Badge Reward.
  - Prompt Playground $\to$ Interactive AI Testing $\to$ Feedback.
- **Visual Identity & Theme**:
  - *Aesthetic*: Futuristic AI-universe, dark-first interface (deep navy/charcoal backgrounds).
  - *Accent*: Electric Cyan.
  - *Typography*: Clean, legible sans-serif for body (e.g., DM Sans), bold display font for headers (e.g., Bricolage Grotesque), monospace for data/code metrics.
  - *Component Styling*: Clean whitespace usage, subtle borders, no pill-badge sandwiches, unboxed metadata.
- **Interactive Feedback**: Immediate feedback on quiz submission, smooth Framer Motion transitions between learning steps, subtle hover states for interactivity.

## 3. Key Product Decisions & Trade-Offs

- **Database Strategy**: PostgreSQL (via Cloud SQL) for reliable, relational storage of user progress, achievements, leaderboard data, and XP transactions.
- **AI Integration**: Provider-independent abstraction layer to support multiple open-weight models (Qwen, Gemma, Llama). Keeps inference server-side to secure keys.
- **Gamification**: Server-side validation for all XP and streak updates to prevent manipulation.

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────┐
│       Frontend (Next.js/React)       │
│  (UI Components, PWA, Learning Flow) │
└──────────────────┬───────────────────┘
                   │
         API Routes / Server Actions
                   │
┌──────────────────┴───────────────────┐
│     Backend (Next.js/Node.js)        │
│ (Auth, AI Provider Abstraction Layer)│
└──────────────────┬───────────────────┘
                   │
┌──────────────────┴───────────────────┐
│   Database (PostgreSQL / Prisma)     │
│  (Users, Lessons, Progress, XP, ... )│
└──────────────────────────────────────┘
```

- **Data Model**: Relational entities mapped via Prisma (Users, Paths, Modules, Lessons, Progress, Achievements, XPTransactions).
- **Interactive Component & State Mapping**: 
  - *Dashboard*: Dynamic data fetching based on user profile.
  - *Lesson Reader*: State-based tracking of current section.
  - *Playground*: Controlled component for model inference parameters (temperature, model selection).
- **Key Sequences**: 
  - *Inference Request*: Client $\to$ Server Proxy (auth/rate-limit check) $\to$ AI Provider.
  - *Progress Update*: Activity completion $\to$ API Update $\to$ Database Write $\to$ XP/Streak Calculation $\to$ Frontend Revalidation.
