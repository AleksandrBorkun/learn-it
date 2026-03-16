# Task 022: Frontend — Gamification Dashboard & Leaderboard UI

**Feature:** Gamification System  
**Type:** Frontend  
**Priority:** Medium  
**Estimated Complexity:** Medium  
**FRD Traceability:** GAME-5 through GAME-16

---

## Description

Implement the frontend gamification experience: badge display on the profile/dashboard, in-app badge notifications, the leaderboard page (Top 100) with the dashboard summary (Top 10), the user's own rank display, and points/streak indicators.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides app structure and routing.
- **Task 009** (Frontend Design System) — provides shared components (cards, badges/chips, progress bars, toasts).
- **Task 011** (Frontend Dashboard) — gamification widgets integrate into the dashboard.
- **Task 021** (Backend Gamification Engine) — provides gamification data, leaderboard, and notification endpoints.

---

## Technical Requirements

### Dashboard Gamification Widgets

- Display the user's total points prominently on the dashboard.
- Display earned badges as a row/grid of badge icons with names.
- Highlight recently earned badges with a "New!" indicator.
- Display the user's current leaderboard rank.
- Display the current daily streak (e.g., "5-day streak 🔥").
- Include a Top 10 leaderboard summary panel on the dashboard.

### Badge Display

- On the profile page, display all earned badges with: icon/image, name, description, and date earned.
- Show unearned badges as greyed-out or locked with their criteria visible (motivational preview).
- Each badge must have a "Share" action placeholder (populated by Task 024).

### Badge Notification

- When a new badge is earned (detected via polling or real-time check), display an in-app toast/modal notification with:
  - Badge icon and name.
  - Congratulatory message.
  - An action to dismiss or view the badge on the profile.
- Automatically mark the notification as read when dismissed or viewed.

### Leaderboard Page

- Create a dedicated leaderboard page accessible from the main navigation or dashboard.
- Display the Top 100 users in a ranked list: rank number, display name, avatar, and total points.
- Always show the authenticated user's own position at the bottom of the leaderboard, even if outside the top 100.
- The user's own entry must be visually highlighted/distinguished.
- The Top 10 summary on the dashboard links to the full leaderboard page.

### Mobile Experience

- All gamification UI elements must render correctly at 320px viewport width.
- The leaderboard is scrollable on mobile.
- Badge icons must be appropriately sized for mobile (not too small to see, not too large to overflow).
- Toast notifications must be non-intrusive on mobile (positioned at top or bottom, auto-dismiss after a timeout).

---

## Acceptance Criteria

| #    | Criterion                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------- |
| AC-1 | The dashboard shows the user's total points, earned badges, current leaderboard rank, and daily streak. |
| AC-2 | Recently earned badges are highlighted with a "New!" indicator on the dashboard.                        |
| AC-3 | An in-app notification appears when a new badge is earned, with badge name and congratulatory message.  |
| AC-4 | The leaderboard page shows the Top 100 users ranked by total points.                                    |
| AC-5 | The user's own rank is always visible on the leaderboard, even if outside the top 100.                  |
| AC-6 | The user's entry on the leaderboard is visually highlighted.                                            |
| AC-7 | The profile page shows all earned badges with icons, names, descriptions, and dates.                    |
| AC-8 | Unearned badges are shown as locked/greyed-out with criteria visible.                                   |
| AC-9 | All gamification UI is functional at 320px viewport width.                                              |

---

## Testing Requirements

- Component tests for dashboard gamification widgets (points, badges, rank, streak, Top 10 summary).
- Component tests for the badge display on the profile (earned, unearned, "New!" indicator).
- Component tests for the badge notification (toast/modal, dismiss, auto-mark-as-read).
- Component tests for the leaderboard page (Top 100 list, user's own rank, highlighting).
- Unit tests for notification polling/detection logic.
- Component tests at mobile viewport for all gamification UI.
- Integration test: earn a badge → notification appears → dashboard updates → badge visible on profile.
- Test coverage ≥ 85%.
