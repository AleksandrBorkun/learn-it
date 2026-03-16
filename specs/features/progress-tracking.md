# Feature Requirements Document: Progress Tracking & Dashboard

**Feature Name:** Progress Tracking & Dashboard  
**Version:** 1.0  
**Last Updated:** 16 March 2026  
**Status:** Draft  
**PRD Traceability:** REQ-6, REQ-7, REQ-8  

---

## 1. Overview

This feature provides learners with persistent, cross-device progress tracking and a personal dashboard that gives an at-a-glance view of their learning journey. Users should always know where they stand in each track and what to do next.

---

## 2. Business Context

- **Goal alignment:** Directly supports G2 (engagement/retention) — visibility into progress is a proven driver of continued usage and habit formation.
- **Retention lever:** The dashboard serves as the user's home base after login, reinforcing momentum and reducing drop-off.

---

## 3. User Stories

```gherkin
As a learner,
I want to see my progress (percentage complete, current section) for each track,
so that I stay motivated and know what's next.
```

```gherkin
As a learner,
I want to resume a track from where I left off,
so that I don't waste time re-finding my place.
```

```gherkin
As a learner,
I want to see an at-a-glance dashboard of all my tracks,
so that I can decide what to work on today.
```

```gherkin
As a learner using multiple devices,
I want my progress to be the same on my phone and laptop,
so that I can switch devices seamlessly.
```

---

## 4. Functional Requirements

### 4.1 Progress Recording

| ID | Requirement |
|----|-------------|
| PROG-1 | The system must record the completion status of each lesson for each user. |
| PROG-2 | A lesson is considered "complete" when the user reaches the end of the lesson content **and** passes any associated quiz or challenge (if one exists). |
| PROG-3 | A module is considered "complete" when all lessons within the module are complete. |
| PROG-4 | A track is considered "complete" when all modules within the track are complete. |
| PROG-5 | Progress must be persisted to the user's account and available across sessions and devices (REQ-7). |

### 4.2 Progress Display

| ID | Requirement |
|----|-------------|
| PROG-6 | Each track must display a visual progress indicator (e.g., progress bar or percentage) showing overall completion. |
| PROG-7 | Each module within a track must show its individual completion status (not started / in progress / complete). |
| PROG-8 | The current lesson (i.e., next incomplete lesson) must be clearly highlighted so the user can resume immediately. |

### 4.3 Dashboard

| ID | Requirement |
|----|-------------|
| PROG-9 | The dashboard must be the default landing page after sign-in. |
| PROG-10 | The dashboard must display all tracks with the user's progress in each (even if 0%). |
| PROG-11 | Tracks the user has started must be visually distinguished from tracks not yet started. |
| PROG-12 | The dashboard must show a "Continue Learning" shortcut that takes the user directly to their most recently active lesson. |
| PROG-13 | The dashboard must display the user's earned badges, certificates, and leaderboard rank (see Gamification and Certificates FRDs). |
| PROG-14 | The dashboard must indicate the user's current tier (Free or Premium). |

### 4.4 Cross-Device Sync

| ID | Requirement |
|----|-------------|
| PROG-15 | Progress data must be tied to the authenticated user account, not to a specific device or browser. |
| PROG-16 | When a user signs in on a new device, all progress must be immediately reflected. |

---

## 5. Inputs & Outputs

### Inputs
- Lesson completion events (user finishes a lesson, passes a quiz/challenge)
- User authentication context (to associate progress with the correct account)

### Outputs
- Per-track, per-module, and per-lesson completion status
- Dashboard view data (track list, progress percentages, "continue learning" target, badges, tier)
- Resume-point information (last active lesson per track)

---

## 6. Dependencies

| Dependency | Direction | Description |
|------------|-----------|-------------|
| User Authentication | Upstream | Progress is tied to authenticated user accounts. |
| Learning Tracks & Content Structure | Upstream | The track → module → lesson hierarchy defines the units of progress. |
| Quizzes & Code Challenges | Upstream | Lesson completion may depend on passing an associated quiz/challenge. |
| Gamification System | Peer | Dashboard displays badges, points, and leaderboard rank. |
| Certificates & Social Sharing | Peer | Dashboard displays earned certificates. |
| Freemium Access Model | Peer | Dashboard shows user's current tier (Free/Premium). |

---

## 7. Acceptance Criteria

| # | Criterion |
|---|-----------|
| AC-1 | After completing a lesson, the progress bar for the containing track updates immediately. |
| AC-2 | A user who signs in on a different device sees the same progress state. |
| AC-3 | The dashboard shows all four tracks with correct completion percentages. |
| AC-4 | The "Continue Learning" shortcut navigates to the correct next incomplete lesson. |
| AC-5 | A track shows as "Complete" only when every module and lesson within it is finished. |
| AC-6 | The dashboard displays earned badges, certificates, leaderboard rank, and current tier. |

---

## 8. Constraints & Assumptions

- Progress is only tracked for authenticated users (anonymous browsing does not persist state).
- A lesson with an associated quiz/challenge is not "complete" until the challenge is passed — simply viewing it is insufficient.
- Progress granularity is at the lesson level; sub-lesson progress (e.g., scroll position) is not tracked in v1.

---

## 9. Open Questions

_None at this time._
