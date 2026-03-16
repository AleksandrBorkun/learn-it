# Task 021: Backend — Gamification Points & Badge Engine

**Feature:** Gamification System  
**Type:** Backend  
**Priority:** Medium — drives engagement and feeds the leaderboard and certificates  
**Estimated Complexity:** Medium-High  
**FRD Traceability:** GAME-1 through GAME-16

---

## Description

Implement the backend gamification engine: points calculation and accumulation, badge milestone evaluation and awarding, daily return bonus tracking, and the leaderboard ranking system. This engine consumes activity events from progress tracking and quiz submissions to award points and check badge conditions.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — provides the API framework.
- **Task 003** (Database Schema) — provides Badge, UserBadge, UserPoints, and related entities.
- **Task 005** (Backend Auth) — gamification data is per-user.
- **Task 010** (Backend Progress Tracking) — lesson/module/track completion events trigger point awards and badge checks.
- **Task 012** (Backend Quiz Engine) — correct submissions trigger point awards, streaks trigger badge checks.

---

## Technical Requirements

### Points Engine

- Define a configurable point value system per activity type (stored in configuration or database):
  - Lesson completed
  - Quiz passed (first attempt bonus vs. subsequent pass)
  - Code challenge solved (first attempt bonus vs. subsequent pass)
  - Daily return bonus (increasing with streak length)
- Award points on activity completion events.
- Accumulate points on the user's total (no expiration, no reset).
- Record the last activity date for daily streak calculation.

### Daily Return Bonus

- Track consecutive-day activity streaks per user.
- When a user completes at least one activity on a consecutive day, award a daily bonus.
- The bonus should increase with streak length (configurable tiers, e.g., day 1 = X, day 3 = 2X, day 7 = 3X, day 30 = 5X).
- If the user misses a day, the streak resets to 0.

### Badge Engine

- Define badge milestones in configuration (not hardcoded), including:
  - **a.** First code challenge solved
  - **b.** Module completed
  - **c.** Track completed
  - **d.** Streak of N correct answers in a row (configurable N)
  - **e.** Point thresholds (e.g., 100, 500, 1000 points)
  - **f.** Daily return streaks (e.g., 3-day, 7-day, 30-day streaks)
- After each activity event, evaluate all badge conditions for the user.
- Award badges that are newly earned (not previously awarded).
- Badges are awarded once and persist forever.

### Badge Notification

- When a badge is earned, create a notification record that the frontend can poll or receive to display the in-app celebration.
- `GET /api/notifications` — Returns unread badge notifications for the authenticated user.
- `POST /api/notifications/:id/read` — Marks a notification as read.

### Leaderboard

- `GET /api/leaderboard` — Returns the Top 100 users by total points (rank, display name, avatar, total points).
- `GET /api/leaderboard/top10` — Returns the Top 10 for the dashboard summary view.
- `GET /api/leaderboard/me` — Returns the authenticated user's rank, points, and position even if outside the top 100.
- Leaderboard data must update in near real-time as users earn points.
- Consider caching strategy for the leaderboard to avoid expensive ranking queries on every request.

### API Endpoints

- `GET /api/gamification/me` — Returns the user's gamification summary: total points, earned badges (with metadata), current streak, and leaderboard rank.
- `GET /api/badges` — Returns the full catalog of available badges with their criteria.
- `GET /api/leaderboard` / `GET /api/leaderboard/top10` / `GET /api/leaderboard/me` — Leaderboard endpoints as described above.
- `GET /api/notifications` / `POST /api/notifications/:id/read` — Notification endpoints.

---

## Acceptance Criteria

| #    | Criterion                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| AC-1 | A user earns points after completing a lesson, passing a quiz, or solving a code challenge.                  |
| AC-2 | Points accumulate on the user's lifetime total without expiration.                                           |
| AC-3 | A user who completes their first code challenge receives the corresponding badge.                            |
| AC-4 | A user who completes an entire track earns the track-completion badge.                                       |
| AC-5 | A user who returns on consecutive days earns increasing daily bonus points.                                  |
| AC-6 | Daily streak badges (3-day, 7-day, 30-day) are awarded at the correct thresholds.                           |
| AC-7 | The leaderboard returns the Top 10 and Top 100 with correct ranking by total points.                         |
| AC-8 | A user outside the top 100 can see their own rank via `GET /api/leaderboard/me`.                             |
| AC-9 | Badge notifications are created when badges are earned and can be retrieved and marked as read.              |

---

## Testing Requirements

- Unit tests for the points engine (correct point values per activity type, accumulation, no double-counting).
- Unit tests for the daily return bonus (streak tracking, bonus tiers, streak reset on missed day).
- Unit tests for badge evaluation (each milestone type: first challenge, module, track, streak, points, daily streak).
- Unit tests for the notification system (create on badge earn, retrieve unread, mark as read).
- Unit tests for leaderboard ranking (correct ordering, ties, user's own position).
- Integration tests for each API endpoint.
- Integration test for the full flow: complete activities → earn points → badge awarded → notification created → leaderboard updated.
- Performance test for leaderboard query with a large number of users.
- Test coverage ≥ 85%.
