# Task 018: Frontend — Freemium Tier UI & Ad Integration

**Feature:** Freemium Access Model  
**Type:** Frontend  
**Priority:** High — visible on every page for free-tier users  
**Estimated Complexity:** Medium  
**FRD Traceability:** TIER-4 through TIER-21

---

## Description

Implement the frontend representation of the freemium model: Google Ads integration for free-tier users, content locking visuals for advanced content, attempt counter display, lockout UI with cooldown timer, upgrade prompts at friction points, and the "Go Premium" upgrade page.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides the app structure and routing.
- **Task 006** (Frontend Auth) — provides user tier information in authentication state.
- **Task 009** (Frontend Design System) — provides shared components and responsive layout.
- **Task 017** (Backend Freemium Access) — provides tier, attempt status, and ad configuration endpoints.

---

## Technical Requirements

### Google Ads Integration

- Integrate Google AdSense or Ad Manager SDK for ad rendering.
- Display ads on: dashboard, track overview, lesson pages, and quiz pages — for free-tier users only.
- Ad placements must be responsive and render correctly at mobile, tablet, and desktop viewports.
- Ads must not obstruct core content or challenge interactions.
- Reserve layout space for ad slots to prevent layout shifts (Cumulative Layout Shift optimization).
- When a user upgrades to premium, ads must disappear immediately (no page reload required).

### Content Locking Visuals

- Advanced-level modules and lessons must display a visual lock indicator (e.g., lock icon, "Premium" badge) for free-tier users.
- Clicking locked content must show an upgrade prompt modal explaining what premium offers and how to upgrade.

### Attempt Counter

- Display a persistent, visible indicator of the user's remaining attempts: "X of 5 attempts remaining."
- The counter must update after each incorrect submission.
- Position the counter near challenge submission areas and optionally in the navigation/header for constant visibility.
- Premium users see "Unlimited attempts" instead of a counter.

### Lockout UI

- When a free-tier user exhausts all 5 attempts, display a lockout message that includes:
  - What happened ("You've used all your attempts").
  - A live countdown timer showing when attempts reset.
  - A clear call-to-action to upgrade to premium.
- Block the "Submit" button during lockout while keeping "Run" active in the code editor.

### Upgrade Prompts

- Place upgrade prompts at natural friction points:
  - When attempts are exhausted (lockout screen).
  - When accessing locked advanced content.
  - On the user's profile/dashboard near the tier indicator.
- Each upgrade prompt must link to the "Go Premium" page.

### Go Premium Page

- Create a dedicated upgrade page listing all premium benefits:
  - No advertisements.
  - Unlimited quiz/challenge attempts.
  - Full access to all content including advanced.
  - Priority access to new tracks and features.
- Include a clear call-to-action button (for v1, this may be a placeholder since payment is deferred to v1.1).

### Tier Indicator

- Display the user's current tier on the profile page and dashboard.
- Use distinct visual styling for Free vs. Premium tiers.

### Mobile Experience

- All ad placements, lockout UI, and upgrade prompts must be fully functional at 320px viewport width.
- Ads must not overlap navigation or action buttons on mobile.
- The countdown timer must be readable on mobile screens.

---

## Acceptance Criteria

| #    | Criterion                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| AC-1 | Free-tier users see ads on dashboard, track overview, lesson pages, and quiz pages.                          |
| AC-2 | Premium users see no ads anywhere.                                                                            |
| AC-3 | Ads do not cause layout shifts on any viewport size.                                                          |
| AC-4 | Advanced content shows a lock indicator with an upgrade prompt for free-tier users.                           |
| AC-5 | The attempt counter displays correctly and updates on each incorrect submission.                              |
| AC-6 | After 5 incorrect submissions, the lockout UI shows with a countdown timer and upgrade call-to-action.       |
| AC-7 | The "Go Premium" page lists all premium benefits with a call-to-action.                                      |
| AC-8 | After upgrading, ads disappear and content unlocks immediately without page reload.                          |
| AC-9 | All freemium UI elements are functional at 320px viewport width.                                             |

---

## Testing Requirements

- Component tests for ad slot rendering (displays for free-tier, hidden for premium, no layout shift).
- Component tests for the content lock indicator and upgrade prompt modal.
- Component tests for the attempt counter (displays count, updates on submission, lockout state).
- Component tests for the lockout UI (message, countdown timer, upgrade CTA).
- Component tests for the Go Premium page.
- Unit tests for the tier indicator logic (free vs. premium display).
- Component tests at mobile viewport for all freemium UI elements.
- Integration test: free-tier user submits 5 incorrect answers → lockout → sees countdown and upgrade option.
- Test coverage ≥ 85%.
