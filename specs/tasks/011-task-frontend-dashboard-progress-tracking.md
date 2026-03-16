# Task 011: Frontend — Dashboard & Progress Tracking UI

**Feature:** Progress Tracking & Dashboard  
**Type:** Frontend  
**Priority:** High — dashboard is the primary landing page after sign-in  
**Estimated Complexity:** Medium  
**FRD Traceability:** PROG-6 through PROG-14

---

## Description

Implement the user dashboard as the post-login landing page, showing an at-a-glance view of all learning tracks with progress indicators, a "Continue Learning" shortcut, and placeholder sections for gamification and tier data. Also integrate progress indicators into the track overview and lesson pages.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides the app shell and routing.
- **Task 006** (Frontend Auth) — provides authentication state; dashboard is the post-login redirect.
- **Task 008** (Frontend Track Catalog & Lessons) — provides track and lesson page components.
- **Task 009** (Frontend Design System) — provides shared components (progress bar, cards, badges, skeleton loaders).
- **Task 010** (Backend Progress API) — provides progress and dashboard data endpoints.

---

## Technical Requirements

### Dashboard Page

- Serve as the default landing page after sign-in.
- Display all four tracks as cards, each showing: track name, progress bar with percentage, module count, and a "Continue" or "Start" action.
- Visually distinguish tracks the user has started from those not yet started (e.g., dimmed vs. highlighted).
- Include a prominent "Continue Learning" shortcut that navigates to the user's most recently active lesson.
- Display the user's current tier (Free or Premium) with a visual indicator.
- Include placeholder sections for: earned badges (Task 020), certificates (Task 022), leaderboard rank (Task 020).
- Show skeleton loaders while dashboard data is being fetched.

### Progress Integration in Track Overview

- On the track overview page, show per-module completion status (not started, in progress, complete) with appropriate icons/colors.
- Highlight the current lesson (next incomplete lesson) so the user can resume immediately.
- Show a track-level progress bar at the top of the overview.

### Progress Integration in Lesson Pages

- Mark the current lesson as "in progress" or "completed" visually.
- When a user completes a lesson (reaches the end AND passes any associated challenge), call the progress completion API.
- Show a completion confirmation (e.g., checkmark animation) and update the progress bar.

### Responsive Layout

- Dashboard: single-column card stack on mobile, 2-column grid on tablet, 3+ column grid on desktop.
- All progress indicators are readable and interactive at 320px viewport width.

---

## Acceptance Criteria

| #    | Criterion                                                                                  |
| ---- | ------------------------------------------------------------------------------------------ |
| AC-1 | The dashboard displays all four tracks with correct completion percentages.                |
| AC-2 | The "Continue Learning" shortcut navigates to the correct most-recently-active lesson.     |
| AC-3 | Started tracks are visually distinct from not-yet-started tracks.                          |
| AC-4 | The track overview shows per-module completion statuses and highlights the current lesson. |
| AC-5 | Completing a lesson updates the progress bar on the track overview immediately.            |
| AC-6 | The user's current tier is displayed on the dashboard.                                     |
| AC-7 | The dashboard layout adapts correctly across mobile, tablet, and desktop viewports.        |
| AC-8 | Skeleton loaders appear while data is loading.                                             |

---

## Testing Requirements

- Component tests for the dashboard page (track cards with progress, continue learning shortcut, tier indicator).
- Component tests for progress indicators on track overview (module statuses, current lesson highlight).
- Unit tests for lesson completion trigger logic (completion conditions, API call).
- Unit tests for the "Continue Learning" target determination.
- Component tests at mobile, tablet, and desktop breakpoints.
- Integration test for the flow: complete a lesson → progress updates on dashboard.
- Test coverage ≥ 85%.
