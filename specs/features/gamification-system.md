# Feature Requirements Document: Gamification System

**Feature Name:** Gamification System  
**Version:** 1.1  
**Last Updated:** 16 March 2026  
**Status:** Draft  
**PRD Traceability:** REQ-20, REQ-21, REQ-24

---

## 1. Overview

The gamification system drives engagement and retention through three core mechanics: **badges** (milestone rewards), a **leaderboard** (competitive ranking), and a **points system** (underlying scoring). Users earn points by completing lessons and challenges, unlock badges at key milestones, and compete on a community leaderboard — all visible from their profile and dashboard.

---

## 2. Business Context

- **Goal alignment:** Directly supports G2 (WAU retention — 30% target), G6 (≥ 50% of active users earning at least 1 badge), and G7 (social sharing as an organic growth channel).
- **Retention lever:** Badges and leaderboards create extrinsic motivation that complements the intrinsic value of learning.

---

## 3. User Stories

```gherkin
As a learner,
I want to earn badges when I hit milestones,
so that I feel recognized for my progress.
```

```gherkin
As a learner,
I want to see a leaderboard,
so that I can compare my progress with other learners and stay motivated.
```

```gherkin
As a learner,
I want to see my badges, points, and rank on my dashboard,
so that I have a clear picture of my achievements.
```

```gherkin
As a learner who returns daily,
I want to earn bonus points for consecutive-day activity,
so that I am rewarded for building a daily learning habit.
```

---

## 4. Functional Requirements

### 4.1 Points System

| ID      | Requirement                                                                                                                                                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GAME-1  | Users must earn **points** for completing learning activities: lessons, quizzes, and code challenges.                                                                                                                                   |
| GAME-2  | **Every successfully completed lesson** must award points. Point values must be defined per activity type (e.g., lesson completion, quiz passed on first attempt, challenge solved). The specific values are a content/design decision. |
| GAME-2a | Users must earn a **daily return bonus** — additional points are awarded when a user returns and completes at least one activity on consecutive days. The bonus should increase with streak length to incentivize daily engagement.     |
| GAME-3  | Points must accumulate over the lifetime of the user's account (no expiration or reset).                                                                                                                                                |
| GAME-4  | The user's total points must be visible on their profile and dashboard.                                                                                                                                                                 |

### 4.2 Badges

| ID     | Requirement                                                                                           |
| ------ | ----------------------------------------------------------------------------------------------------- |
| GAME-5 | The platform must award **badges** when users reach defined milestones.                               |
| GAME-6 | Badge milestones must include (at minimum):                                                           |
|        | **a.** First code challenge solved                                                                    |
|        | **b.** Completing a module                                                                            |
|        | **c.** Completing an entire track                                                                     |
|        | **d.** Achieving a streak of N correct answers in a row                                               |
|        | **e.** Reaching point thresholds (e.g., 100 points, 500 points, 1000 points)                          |
|        | **f.** Daily return streaks (e.g., 3-day streak, 7-day streak, 30-day streak)                         |
| GAME-7 | When a badge is earned, the user must receive an **in-app notification** celebrating the achievement. |
| GAME-8 | Badges must be displayed on the user's profile and dashboard.                                         |
| GAME-9 | Each badge must have a name, description, icon/image, and the date it was earned.                     |

### 4.3 Leaderboard

| ID       | Requirement                                                                                                                                                                             |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GAME-10  | The platform must provide a **leaderboard** that ranks users by total points earned.                                                                                                    |
| GAME-11  | The leaderboard must display: rank, user display name, avatar, and total points.                                                                                                        |
| GAME-12  | The leaderboard must show two views: a **Top 10** summary view (displayed on the dashboard) and a **Top 100** expanded view (accessible from the leaderboard page).                     |
| GAME-12a | The user must **always see their own position** on the leaderboard, even if they are not in the top 100. Their rank, points, and standing must be displayed below the leaderboard list. |
| GAME-13  | The leaderboard must update in near real-time as users earn points.                                                                                                                     |
| GAME-14  | The leaderboard must be accessible from the main navigation or dashboard.                                                                                                               |

### 4.4 Dashboard Integration

| ID      | Requirement                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| GAME-15 | The user's dashboard must display: total points, earned badges (with icons), and current leaderboard rank. |
| GAME-16 | The dashboard must show recently earned badges prominently (e.g., "New!" indicator).                       |

---

## 5. Inputs & Outputs

### Inputs

- Activity completion events: lesson completed, quiz passed, challenge solved, streak achieved
- Daily login/activity events (for daily return bonus calculation)
- Point value definitions (configuration per activity type, including daily bonus tiers)
- Badge milestone definitions (configuration, including daily-streak badges)

### Outputs

- Points awarded and accumulated per user
- Badge earned notifications
- Leaderboard ranking data
- Dashboard gamification widgets (points, badges, rank)

---

## 6. Dependencies

| Dependency                    | Direction  | Description                                                                              |
| ----------------------------- | ---------- | ---------------------------------------------------------------------------------------- |
| User Authentication           | Upstream   | Points, badges, and leaderboard entries are tied to authenticated users.                 |
| Progress Tracking             | Upstream   | Lesson/module/track completion events trigger point awards and badge checks.             |
| Quizzes & Code Challenges     | Upstream   | Quiz/challenge results trigger point awards (correct answers, streaks).                  |
| Progress Tracking & Dashboard | Downstream | Dashboard displays gamification data (points, badges, rank).                             |
| Certificates & Social Sharing | Peer       | Track completion triggers both a certificate and a badge; badges can be shared socially. |

---

## 7. Acceptance Criteria

| #     | Criterion                                                                                                     |
| ----- | ------------------------------------------------------------------------------------------------------------- |
| AC-1  | A user earns points after completing a lesson, passing a quiz, or solving a code challenge.                   |
| AC-2  | A user who completes their first code challenge receives the corresponding badge with an in-app notification. |
| AC-3  | A user who completes an entire track earns the track-completion badge.                                        |
| AC-4  | The dashboard shows a Top 10 leaderboard summary; the full leaderboard page shows the Top 100.                |
| AC-4a | A user outside the top 100 still sees their own rank and points displayed below the leaderboard.              |
| AC-5  | A user's dashboard shows their total points, earned badges, and leaderboard rank.                             |
| AC-5a | A user who returns on consecutive days earns increasing daily bonus points.                                   |
| AC-6  | Recently earned badges are visually highlighted on the dashboard.                                             |
| AC-7  | Points and badges persist across sessions and devices (tied to user account).                                 |

---

## 8. Constraints & Assumptions

- Point values and badge milestone thresholds are content/design configuration — not hardcoded. The specific values will be defined during content planning.
- The daily return bonus increases with streak length; exact multiplier/bonus values are a design decision.
- The leaderboard is global (all users), showing Top 10 on the dashboard and Top 100 on the dedicated page; per-track or per-region leaderboards are out of scope for v1.
- There is no "gaming the system" prevention in v1 (e.g., re-completing lessons to farm points). This may be revisited post-launch based on observed behavior.

---

## 9. Open Questions

| #   | Question                                                                                | Status                                                                                                  |
| --- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Q1  | What are the specific point values for each activity type (lesson, quiz, challenge)?    | Open — design decision                                                                                  |
| Q2  | What are the exact streak thresholds for streak badges (e.g., 5 in a row, 10 in a row)? | Open — design decision                                                                                  |
| Q3  | Should the leaderboard show a fixed top-N (e.g., top 100) or be infinitely scrollable?  | ✅ Resolved — Top 10 on dashboard, Top 100 on dedicated leaderboard page. User's own rank always shown. |
| Q4  | What are the exact daily return bonus point values and streak multiplier tiers?         | Open — design decision                                                                                  |
