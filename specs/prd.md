# 📝 Product Requirements Document (PRD)

**Product Name:** LearnIt — Software Development Learning Platform  
**Version:** 0.2  
**Last Updated:** 16 March 2026  
**Status:** Active — Requirements confirmed  

---

## 1. Purpose

Many aspiring and junior software developers struggle to find a single, structured platform that covers multiple modern development disciplines — from AI and frontend to DevOps and cloud — with hands-on practice baked into the learning experience.

**LearnIt** is a mobile-first educational web application that provides structured, track-based learning paths for software development. Each track guides the learner from fundamentals through advanced topics using bite-sized lessons, interactive code challenges, and knowledge-check quizzes. A freemium model makes the platform accessible while offering a premium tier for serious learners who want the full curriculum and an ad-free experience.

**Primary users:** Career switchers, students, bootcamp graduates, and junior developers looking to build or deepen their software development skills.

---

## 2. Scope

### In Scope (v1)

- Mobile-first responsive web application accessible on all modern browsers
- Four learning tracks: **AI**, **Frontend**, **DevOps**, **Cloud Development (AWS)**
- User authentication via Google (Sign in with Google)
- Per-track progress tracking with visual indicators
- Personal code snippet library (save, organize, retrieve)
- Quizzes and code challenges embedded in every section of every track
- Practical challenges at the end of each section (e.g., write a function, design a system)
- Two-tier access model: **Free** and **Premium**
- Free tier with Google Ads integration and content/attempt limitations
- Premium tier with full access and ad-free experience (one-time purchase)
- Gamification system: badges, leaderboard, and certificates of completion
- Social sharing for certificates and achievements
- In-browser live code editor with real-time output for challenges
- Markdown-based content authoring (future migration path to CMS like Contentful)

### Out of Scope (v1)

- Native mobile apps (iOS / Android) — web-only for v1
- Peer-to-peer collaboration or social features (forums, chat)
- Instructor-led or live sessions
- CMS integration (Contentful or similar) — content starts as Markdown; CMS is a future migration
- Offline mode
- Tracks beyond the initial four listed above
- Payment processing integration (deferred to v1.1; one-time purchase model is confirmed but billing implementation is a fast-follow)

---

## 3. Goals & Success Criteria

### Business Goals

| # | Goal | Success Metric | Target (6 months post-launch) |
|---|------|---------------|-------------------------------|
| G1 | Acquire a meaningful user base | Registered users | 10,000 |
| G2 | Drive engagement and retention | Weekly active users (WAU) | 30% of registered users |
| G3 | Validate premium conversion | Free → Premium conversion rate | ≥ 5% |
| G4 | Generate ad revenue from free tier | Ad impressions / month | Tied to WAU growth |
| G5 | Deliver high-quality learning outcomes | Average quiz/challenge pass rate | ≥ 65% |
| G6 | Drive engagement through gamification | Users earning at least 1 badge | ≥ 50% of active users |
| G7 | Amplify organic growth via social sharing | Certificates shared to social media / month | 500+ |

### User Goals

- **Learn at my own pace:** Users can start, pause, and resume any track at any time.
- **See my progress:** Users always know where they stand in a track and what's next.
- **Practice, not just read:** Every section reinforces learning with hands-on challenges.
- **Save useful code:** Users can bookmark and organize code snippets for future reference.
- **Access anywhere:** The app works well on a phone during a commute or on a laptop at a desk.
- **Feel accomplishment:** Users earn badges and certificates that they can share with peers and potential employers.
- **Compete and stay motivated:** A leaderboard gives users a sense of community and healthy competition.

---

## 4. High-Level Requirements

### Authentication & User Management

- **[REQ-1]** Users must be able to sign in using their Google account (Sign in with Google / OAuth).
- **[REQ-2]** Users must be able to log out and manage basic profile information (display name, email, avatar pulled from Google account).

### Learning Tracks

- **[REQ-3]** The platform must offer four distinct learning tracks: AI, Frontend, DevOps, and Cloud Development (AWS).
- **[REQ-4]** Each track must be organized into logical sections (modules), and each module into individual lessons.
- **[REQ-5]** Content must progress from beginner through intermediate to advanced levels within each track.

### Progress Tracking

- **[REQ-6]** Users must be able to see their completion progress for each track they are enrolled in.
- **[REQ-7]** Progress must be persisted across sessions and devices (tied to user account).
- **[REQ-8]** A dashboard must show an at-a-glance view of all tracks and the user's status in each.

### Quizzes & Code Challenges

- **[REQ-9]** Every logical section within a track must include at least one knowledge-check quiz or code challenge.
- **[REQ-10]** Challenges must vary in type — including but not limited to: multiple-choice quizzes, write-a-function exercises, system/software design prompts, and fill-in-the-blank code completion.
- **[REQ-11]** Users must receive immediate feedback on quiz/challenge submissions (correct/incorrect, with explanation).
- **[REQ-11a]** Code challenges must run in an in-browser live code editor with real-time output (sandboxed execution environment).

### Code Snippet Library

- **[REQ-12]** Users must be able to save code snippets from lessons or their own code to a personal library.
- **[REQ-13]** Users must be able to organize (tag/categorize), search, and delete saved snippets.

### Freemium Model

- **[REQ-14]** The platform must support two access tiers: **Free** and **Premium**.
- **[REQ-15]** **Free tier** constraints:
  - Google Ads are displayed throughout the experience.
  - Users are limited to **5 incorrect attempts** (mistakes) across all quizzes/challenges, resetting every **12 hours**. After 5 mistakes, the user is locked out of challenges until the cooldown expires.
  - Content access is restricted to **beginner and intermediate levels** only; advanced content is locked.
- **[REQ-16]** **Premium tier** benefits:
  - No advertisements.
  - Unlimited quiz/challenge attempts.
  - Full access to all content levels including advanced.
  - Priority access to new tracks and features.
- **[REQ-16a]** Premium access is granted via a **one-time purchase** (not a subscription). Once purchased, the user has lifetime premium access.

### Mobile-First Design

- **[REQ-17]** The user interface must be designed mobile-first, ensuring a fully functional and pleasant experience on screens as small as 320px wide.
- **[REQ-18]** The app must be responsive and adapt gracefully to tablet and desktop viewports.
- **[REQ-19]** Touch interactions (swipe, tap) must be first-class; code editing areas must be usable on mobile (with appropriate affordances like larger touch targets).

### Gamification & Social Sharing

- **[REQ-20]** Users must be able to earn badges for milestones (e.g., completing a section, finishing a track, achieving a streak of correct answers, first code challenge solved).
- **[REQ-21]** A leaderboard must rank users based on points earned from completed lessons, quizzes, and challenges.
- **[REQ-22]** Users who complete an entire track must receive a certificate of completion.
- **[REQ-23]** Certificates and badges must be shareable to social media platforms (LinkedIn, X/Twitter, Facebook) directly from the app.
- **[REQ-24]** The user profile/dashboard must display earned badges, certificates, and leaderboard rank.

### Content Management

- **[REQ-25]** All learning content (lessons, quizzes, challenge definitions) must be authored and stored as Markdown files.
- **[REQ-26]** The content architecture must be designed to allow future migration to a headless CMS (e.g., Contentful) without requiring changes to the front-end rendering layer.

---

## 5. User Stories

### Authentication

```gherkin
As a new visitor, I want to sign in with my Google account, so that I can quickly start learning without creating a separate username and password.
```

```gherkin
As a returning user, I want to sign in with Google, so that I can resume my learning where I left off.
```

### Track Exploration & Enrollment

```gherkin
As a learner, I want to browse available learning tracks, so that I can choose the one most relevant to my career goals.
```

```gherkin
As a learner, I want to see a track overview (topics, estimated duration, difficulty levels), so that I can decide whether to start it.
```

### Learning & Progress

```gherkin
As a learner, I want to work through lessons in order within a track, so that I build knowledge progressively.
```

```gherkin
As a learner, I want to see my progress (percentage complete, current section) for each track, so that I stay motivated and know what's next.
```

```gherkin
As a learner, I want to resume a track from where I left off, so that I don't waste time re-finding my place.
```

### Quizzes & Challenges

```gherkin
As a learner, I want to take a quiz after each section, so that I can verify I understood the material.
```

```gherkin
As a learner, I want to attempt a hands-on code challenge after each section, so that I can apply what I learned in practice.
```

```gherkin
As a learner, I want to receive immediate feedback on my answers, so that I can learn from my mistakes right away.
```

```gherkin
As a free-tier user, I want to know how many attempts I have remaining, so that I can be thoughtful with my answers.
```

### Code Snippets

```gherkin
As a learner, I want to save a code snippet from a lesson to my personal library, so that I can reference it later.
```

```gherkin
As a learner, I want to search and filter my saved snippets, so that I can quickly find the code I need.
```

### Freemium Experience

```gherkin
As a free-tier user, I want to access beginner and intermediate content for free, so that I can learn without financial commitment.
```

```gherkin
As a free-tier user who has used all my attempts, I want to understand what happened and how to continue, so that I'm not confused or frustrated.
```

```gherkin
As a free-tier user, I want to see what premium offers, so that I can decide if upgrading is worth it.
```

```gherkin
As a premium user, I want an ad-free experience with unlimited attempts and full content access, so that I can learn without interruptions or restrictions.
```

### Gamification & Social

```gherkin
As a learner, I want to earn badges when I hit milestones, so that I feel recognized for my progress.
```

```gherkin
As a learner, I want to see a leaderboard, so that I can compare my progress with other learners and stay motivated.
```

```gherkin
As a learner who completed a track, I want to receive a certificate of completion, so that I can showcase my achievement.
```

```gherkin
As a learner, I want to share my certificates and badges on LinkedIn or X/Twitter, so that I can demonstrate my skills to employers and peers.
```

### Code Editor

```gherkin
As a learner, I want to write and run code directly in the browser during challenges, so that I can practice without setting up a local development environment.
```

```gherkin
As a learner, I want to see the output of my code in real time, so that I can iterate quickly and learn from my mistakes.
```

---

## 6. Assumptions & Constraints

### Assumptions

- **[A1]** Users have a modern web browser (Chrome, Safari, Firefox, Edge — latest two versions).
- **[A2]** Learning content (lessons, quizzes, challenges) will be authored internally as Markdown files by the product team for v1.
- **[A3]** The "5 mistakes" limit on the free tier resets every **12 hours**.
- **[A4]** Code challenges will execute **in-browser** using a client-side sandboxed environment for supported languages.
- **[A5]** Users will primarily access the platform on mobile devices; desktop is a secondary use case.
- **[A6]** Premium is a **one-time purchase** granting lifetime access. Payment integration is deferred to v1.1.
- **[A7]** Content will be stored as Markdown initially, with a clear migration path to a headless CMS (e.g., Contentful) in a future release.

### Constraints

- **[C1]** Must be a web application — no native mobile apps for v1.
- **[C2]** Free tier must include Google Ads as a revenue stream.
- **[C3]** Free tier content is capped at beginner-to-intermediate level; advanced content is premium-only.
- **[C4]** Free tier users are limited to 5 incorrect attempts per 12-hour rolling window.
- **[C5]** The platform must comply with GDPR and standard data privacy regulations for user data.
- **[C6]** Initial launch targets English-language content only.

---

## 7. Open Questions

| # | Question | Answer | Status |
|---|----------|--------|--------|
| Q1 | Should login support social providers (Google, GitHub) in addition to email/password? | **Google Sign-In only** for v1. No email/password. | ✅ Resolved |
| Q2 | What is the premium pricing model — monthly subscription, annual, per-track, or one-time? | **One-time purchase** for the entire app (lifetime access). | ✅ Resolved |
| Q3 | Does the "5 mistakes" limit reset daily, per quiz, per track, or is it a lifetime cap? | **5 mistakes per 12-hour rolling window**, across all challenges. | ✅ Resolved |
| Q4 | Should code challenges run in-browser with live output, or is a simpler "submit answer" model acceptable for v1? | **In-browser live code editor** with real-time output. | ✅ Resolved |
| Q5 | Is gamification (badges, streaks, leaderboards) desired for v1 or a later release? | **Yes, v1.** Badges, leaderboard, and certificates of completion. | ✅ Resolved |
| Q6 | Will there be an admin/content management interface, or will content be managed via static files? | **Markdown files** for v1. Future migration to headless CMS (e.g., Contentful). | ✅ Resolved |
| Q7 | Are certificates of completion a v1 requirement or future enhancement? | **v1 requirement.** Shareable to social media (LinkedIn, X/Twitter, Facebook). | ✅ Resolved |
