# Feature Requirements Document: Freemium Access Model

**Feature Name:** Freemium Access Model  
**Version:** 1.0  
**Last Updated:** 16 March 2026  
**Status:** Draft  
**PRD Traceability:** REQ-14, REQ-15, REQ-16, REQ-16a

---

## 1. Overview

LearnIt uses a two-tier freemium model — **Free** and **Premium** — to balance accessibility with monetization. The free tier gives users meaningful access to beginner and intermediate content with Google Ads and a limited number of incorrect challenge attempts. The premium tier removes all restrictions with a one-time lifetime purchase.

---

## 2. Business Context

- **Goal alignment:** Directly supports G3 (≥ 5% free-to-premium conversion), G4 (ad revenue from free tier), and G1 (low-friction free access drives acquisition).
- **Monetization strategy:** Dual revenue — ads for free-tier users and one-time premium purchases for power learners.
- **Conversion philosophy:** The attempt limit creates a natural friction point that motivates serious learners to upgrade, while still allowing casual learners to use the platform indefinitely.

---

## 3. User Stories

```gherkin
As a free-tier user,
I want to access beginner and intermediate content for free,
so that I can learn without financial commitment.
```

```gherkin
As a free-tier user who has used all my attempts,
I want to understand what happened and how to continue,
so that I'm not confused or frustrated.
```

```gherkin
As a free-tier user,
I want to see what premium offers,
so that I can decide if upgrading is worth it.
```

```gherkin
As a premium user,
I want an ad-free experience with unlimited attempts and full content access,
so that I can learn without interruptions or restrictions.
```

---

## 4. Functional Requirements

### 4.1 Tier Definition

| ID     | Requirement                                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| TIER-1 | The platform must support exactly two access tiers: **Free** and **Premium**.                                                         |
| TIER-2 | Every new user starts on the **Free** tier by default.                                                                                |
| TIER-3 | **Premium** access is granted via a **one-time purchase** — not a subscription. Once purchased, the user has lifetime premium access. |

### 4.2 Free Tier Constraints

| ID     | Requirement                                                                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TIER-4 | Free-tier users must see **Google Ads** displayed throughout the experience (lesson pages, dashboard, track overview, quiz pages).                              |
| TIER-5 | Free-tier users are limited to **5 incorrect attempts** (mistakes) across all quizzes and code challenges within a **12-hour rolling window**.                  |
| TIER-6 | After 5 incorrect submissions, the user must be **locked out** of submitting any new quiz/challenge answers until the cooldown expires.                         |
| TIER-7 | The lockout message must clearly explain: what happened, how many hours/minutes remain until attempts reset, and how premium removes this restriction.          |
| TIER-8 | Free-tier users can access **beginner and intermediate** level content only. **Advanced** content must be locked with a visual indicator and an upgrade prompt. |
| TIER-9 | Free-tier users must see a persistent indicator of their remaining attempts (e.g., "3 of 5 attempts remaining").                                                |

### 4.3 Premium Tier Benefits

| ID      | Requirement                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------- |
| TIER-10 | Premium users must see **no advertisements** anywhere in the application.                         |
| TIER-11 | Premium users must have **unlimited** quiz and challenge attempts — no lockout, no cooldown.      |
| TIER-12 | Premium users must have full access to **all content levels**, including advanced.                |
| TIER-13 | Premium users must receive **priority access** to new tracks and features when they are released. |

### 4.4 Upgrade Experience

| ID      | Requirement                                                                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TIER-14 | The platform must provide clear upgrade prompts at natural friction points: when attempts are exhausted, when accessing locked advanced content, and on a dedicated "Go Premium" page. |
| TIER-15 | A "Go Premium" or "Upgrade" page must list all premium benefits with a clear call-to-action.                                                                                           |
| TIER-16 | The user's current tier must be visible on their profile and dashboard.                                                                                                                |
| TIER-17 | Once a user upgrades to premium, the transition must take effect immediately — ads disappear, content unlocks, and attempt limits are removed.                                         |

### 4.5 Ad Integration (Free Tier)

| ID      | Requirement                                                                                     |
| ------- | ----------------------------------------------------------------------------------------------- |
| TIER-18 | Ads must be displayed using **Google Ads** (AdSense or Ad Manager).                             |
| TIER-19 | Ad placements must not obstruct core learning content or challenge interactions.                |
| TIER-20 | Ad placements must be responsive and render correctly on mobile, tablet, and desktop viewports. |
| TIER-21 | Ads must be immediately removed from all pages when a user upgrades to premium.                 |

---

## 5. Inputs & Outputs

### Inputs

- User tier status (Free / Premium) from user account
- Incorrect submission events (to track attempt count)
- Upgrade/purchase completion signal (from payment flow — deferred to v1.1)
- Content difficulty metadata (beginner / intermediate / advanced)

### Outputs

- Content access decisions (allow / lock based on tier + difficulty level)
- Attempt tracking state (remaining attempts, cooldown timer)
- Ad rendering decisions (show / hide based on tier)
- Upgrade prompts at friction points
- Tier indicator on profile/dashboard

---

## 6. Dependencies

| Dependency                          | Direction           | Description                                                                                 |
| ----------------------------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| User Authentication                 | Upstream            | Tier is associated with the user account.                                                   |
| Learning Tracks & Content Structure | Upstream            | Content difficulty levels determine what is locked/unlocked per tier.                       |
| Quizzes & Code Challenges           | Peer                | Incorrect submissions trigger attempt tracking; lockout blocks further submissions.         |
| Progress Tracking & Dashboard       | Downstream          | Dashboard displays current tier; progress on advanced content is only possible for premium. |
| Google Ads                          | External            | Third-party ad network for free-tier monetization.                                          |
| Payment Processing                  | External (deferred) | One-time purchase flow is confirmed but implementation is deferred to v1.1.                 |

---

## 7. Acceptance Criteria

| #    | Criterion                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | A new user is on the Free tier by default and sees ads on all pages.                                                      |
| AC-2 | A free-tier user can access beginner and intermediate content but sees advanced content as locked with an upgrade prompt. |
| AC-3 | A free-tier user sees their remaining attempt count and it decrements on each incorrect submission.                       |
| AC-4 | After 5 incorrect submissions, the user is locked out and sees a clear message with cooldown time and upgrade option.     |
| AC-5 | Attempts reset after 12 hours and the user can submit again.                                                              |
| AC-6 | A premium user sees no ads, has unlimited attempts, and can access all content including advanced.                        |
| AC-7 | The upgrade page clearly lists all premium benefits.                                                                      |
| AC-8 | After upgrading, the premium experience takes effect immediately (no page reload required beyond the initial transition). |
| AC-9 | Ads do not obstruct content or challenge interactions on any viewport size.                                               |

---

## 8. Constraints & Assumptions

- Payment processing is **deferred to v1.1** (A6). For v1, premium status may be granted manually or via a placeholder mechanism. The FRD defines the access-control behavior, not the payment flow.
- The 12-hour rolling window for attempt resets applies globally across all challenges, not per-challenge (Q3 resolved).
- Google Ads (AdSense/Ad Manager) is the only ad network for v1 (C2).
- GDPR compliance (C5) applies to ad tracking and user data.

---

## 9. Open Questions

| #   | Question                                                                             | Status                                    |
| --- | ------------------------------------------------------------------------------------ | ----------------------------------------- |
| Q1  | What is the price point for the one-time premium purchase?                           | Open — business decision pending          |
| Q2  | How will premium status be granted in v1 before payment integration is built (v1.1)? | Open — may use manual flag or promo codes |
