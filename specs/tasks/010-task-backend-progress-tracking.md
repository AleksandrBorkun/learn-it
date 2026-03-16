# Task 010: Backend — Progress Tracking API

**Feature:** Progress Tracking & Dashboard  
**Type:** Backend  
**Priority:** High — progress is required for gamification, certificates, and dashboard  
**Estimated Complexity:** Medium  
**FRD Traceability:** PROG-1 through PROG-16

---

## Description

Implement the backend API for recording, retrieving, and syncing user learning progress. This includes lesson completion tracking, module/track completion derivation, cross-device persistence, and dashboard data aggregation.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — provides the API framework.
- **Task 003** (Database Schema) — provides UserProgress and related entity models.
- **Task 005** (Backend Auth) — progress endpoints require authentication.
- **Task 007** (Backend Learning Tracks API) — track/module/lesson structure is required to calculate progress.

---

## Technical Requirements

### API Endpoints

- `POST /api/progress/lessons/:lessonId/complete` — Marks a lesson as complete for the authenticated user. Validates that any associated challenge has been passed before allowing completion (unless the lesson has no challenge).
- `GET /api/progress` — Returns the authenticated user's overall progress summary: per-track completion percentage, per-module status (not started / in progress / complete), current lesson per track.
- `GET /api/progress/tracks/:slug` — Returns detailed progress for a specific track (module statuses, lesson statuses, completion percentage).
- `GET /api/dashboard` — Aggregated dashboard data: all tracks with progress, "Continue Learning" target (most recently active lesson), earned badges (from Task 021), certificates (from Task 023), leaderboard rank (from Task 021), and current tier.

### Completion Logic

- A lesson is complete when explicitly marked via the completion endpoint AND any associated challenge has been passed.
- A module is complete when all lessons within it are complete.
- A track is complete when all modules within it are complete.
- Track completion must trigger downstream events (for gamification badges and certificate generation — consumed by Tasks 021 and 023).

### Cross-Device Sync

- Progress is tied to the user account (not device/browser). Any device accessing with the same authenticated user sees the same progress.
- Progress state updates must be immediately available on any device after being recorded.

### Resume Point

- Determine the user's resume point per track: the first incomplete lesson in the track sequence.
- Determine the globally most recent resume point: the lesson the user last interacted with (for the dashboard "Continue Learning" shortcut).

---

## Acceptance Criteria

| #    | Criterion                                                                                                            |
| ---- | -------------------------------------------------------------------------------------------------------------------- |
| AC-1 | Marking a lesson as complete persists the completion status to the user's account.                                   |
| AC-2 | If a lesson has an associated challenge that is not passed, the completion endpoint rejects the request.             |
| AC-3 | `GET /api/progress` returns correct per-track completion percentages and per-module statuses.                        |
| AC-4 | `GET /api/dashboard` returns the aggregated dashboard payload with tracks, progress, and resume point.               |
| AC-5 | The resume point correctly identifies the first incomplete lesson per track.                                         |
| AC-6 | Completing all lessons in a module marks the module as complete; completing all modules marks the track as complete. |
| AC-7 | Progress data is identical when accessed from two different sessions/devices for the same user.                      |

---

## Testing Requirements

- Unit tests for lesson completion logic (with and without associated challenges).
- Unit tests for module and track completion derivation (partial, full, edge cases).
- Unit tests for resume point calculation (middle of track, start of track, completed track).
- Unit tests for dashboard data aggregation.
- Integration tests for each API endpoint (happy path, error cases, unauthorized access).
- Integration test for cross-device progress consistency (same user, two sessions).
- Test coverage ≥ 85%.
