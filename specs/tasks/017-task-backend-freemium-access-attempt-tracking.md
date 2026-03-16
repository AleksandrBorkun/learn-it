# Task 017: Backend — Freemium Access & Attempt Tracking

**Feature:** Freemium Access Model  
**Type:** Backend  
**Priority:** High — enforces content gating, attempt limits, and tier management  
**Estimated Complexity:** Medium  
**FRD Traceability:** TIER-1 through TIER-21

---

## Description

Implement the backend logic for the two-tier freemium system: tier management (free vs. premium), content access control based on tier and difficulty level, the 5-incorrect-attempt rolling window with automatic reset, and upgrade status transitions.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — provides the API framework and middleware pipeline.
- **Task 003** (Database Schema) — provides the User entity (tier field) and UserAttempt entity.
- **Task 005** (Backend Auth) — tier is associated with the authenticated user.
- **Task 007** (Backend Learning Tracks API) — content gating applies to track/module/lesson endpoints.
- **Task 012** (Backend Quiz Engine) — attempt tracking applies to challenge submissions.

---

## Technical Requirements

### Tier Management

- Every new user defaults to the **Free** tier.
- Implement an endpoint or mechanism to upgrade a user to Premium: `POST /api/users/me/upgrade`. For v1, this may accept a promo code or admin token since payment processing is deferred to v1.1.
- Once upgraded, the user has lifetime premium access — no expiration.
- The user's current tier must be included in the user profile and session responses.

### Content Access Control

- Implement middleware or service logic that checks the user's tier before serving content:
  - **Free tier**: Access to beginner and intermediate content only. Advanced content returns metadata but not full content body, plus an "upgrade required" indicator.
  - **Premium tier**: Full access to all content levels.
- Content difficulty level is sourced from the module/lesson metadata.

### Attempt Tracking (Free Tier)

- Track incorrect quiz/challenge submissions per user within a **12-hour rolling window**.
- The window starts from the timestamp of the user's first incorrect attempt in the current window.
- After **5 incorrect submissions**, block further submissions for the user until the window expires.
- Provide an API endpoint to check current attempt status: `GET /api/attempts/status` — returns remaining attempts, whether locked out, and when the lockout expires.
- Premium users bypass attempt tracking entirely — unlimited submissions.

### API Endpoints

- `GET /api/attempts/status` — Returns the user's remaining attempts, lockout status, and reset time. Returns "unlimited" for premium users.
- `POST /api/users/me/upgrade` — Upgrades the user to premium (v1: placeholder mechanism).
- `GET /api/tiers/benefits` — Returns the list of premium benefits (for the upgrade page).

### Lockout Behavior

- When a free-tier user is locked out, any `POST /api/challenges/:challengeId/submit` request must be rejected with a clear error: lockout reason, remaining time until reset, and an upgrade prompt.
- The "Run" action in the code editor is NOT affected by the lockout — only "Submit" is blocked.

### Ad Configuration

- Provide a configuration endpoint or context that tells the frontend whether to show ads: `GET /api/ads/config` — returns `{ showAds: boolean }` based on the user's tier.
- Premium users: `showAds: false`. Free-tier users: `showAds: true`.

---

## Acceptance Criteria

| #    | Criterion                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| AC-1 | A new user is on the Free tier by default.                                                                    |
| AC-2 | Free-tier users can access beginner and intermediate content but not advanced content body.                   |
| AC-3 | `GET /api/attempts/status` returns correct remaining attempts for a free-tier user.                           |
| AC-4 | After 5 incorrect submissions, further submissions are rejected with a lockout message and cooldown time.    |
| AC-5 | Attempts reset after the 12-hour window expires; the user can submit again.                                  |
| AC-6 | Premium users have unlimited attempts and full content access including advanced.                             |
| AC-7 | Upgrading a user to premium takes effect immediately — content unlocks and attempt limits are removed.       |
| AC-8 | `GET /api/ads/config` returns `showAds: false` for premium and `showAds: true` for free-tier users.         |

---

## Testing Requirements

- Unit tests for tier management (default free, upgrade, lifetime premium).
- Unit tests for content access control (free + beginner = allow, free + advanced = block, premium + advanced = allow).
- Unit tests for attempt tracking (count increments, rolling window calculation, reset after 12 hours, lockout enforcement).
- Unit tests for lockout behavior (reject submissions, include cooldown time, unblock after reset).
- Unit tests for premium bypass (unlimited attempts, no lockout).
- Integration tests for each API endpoint.
- Integration test for the full flow: 5 incorrect submissions → lockout → wait for reset → submissions allowed again.
- Test coverage ≥ 85%.
