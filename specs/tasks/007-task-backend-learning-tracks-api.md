# Task 007: Backend — Learning Tracks API

**Feature:** Learning Tracks & Content Structure  
**Type:** Backend  
**Priority:** High — content model is foundational for progress, quizzes, snippets, and freemium features  
**Estimated Complexity:** Medium  
**FRD Traceability:** TRACK-1 through TRACK-18

---

## Description

Implement the backend API endpoints that serve learning track data, module listings, lesson content, and track overview information. The API consumes the content abstraction layer (Task 004) and exposes structured data to the frontend.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — provides the API framework.
- **Task 003** (Database Schema) — provides Track, Module, and Lesson entity models.
- **Task 004** (Content Structure) — provides the content provider interface and Markdown file system implementation.
- **Task 005** (Backend Auth) — protected endpoints require authentication.

---

## Technical Requirements

### API Endpoints

- `GET /api/tracks` — Returns the catalog of all tracks (name, slug, description, duration, module count, difficulty range). Public endpoint.
- `GET /api/tracks/:slug` — Returns a single track's detailed overview, including its modules and lesson listings with difficulty levels. Public endpoint.
- `GET /api/tracks/:slug/modules/:moduleSlug` — Returns module details and its lesson list.
- `GET /api/tracks/:slug/modules/:moduleSlug/lessons/:lessonSlug` — Returns full lesson content (rendered Markdown), metadata (position, difficulty), and associated challenge references.
- `GET /api/tracks/:slug/modules/:moduleSlug/challenges` — Returns challenge definitions for a given module.

### Content Access Control

- Annotate each module/lesson response with its difficulty level (beginner, intermediate, advanced).
- Include a field indicating whether the content is accessible to the requesting user based on their tier (free-tier users cannot access advanced content).
- If a free-tier user requests advanced content, return metadata (title, description, difficulty) but not the full content body, along with an "upgrade required" indicator.

### Content Rendering

- Use the content provider interface (Task 004) to fetch Markdown content.
- Parse and return lesson content as rendered HTML or structured Markdown (as agreed with frontend).
- Ensure code blocks include language annotations for syntax highlighting.

### Pagination & Performance

- Module and lesson listings should include sort order for correct sequencing.
- Lesson content responses should include navigation references (next/previous lesson slugs).
- Implement caching strategy for content that changes infrequently.

---

## Acceptance Criteria

| #    | Criterion                                                                                                      |
| ---- | -------------------------------------------------------------------------------------------------------------- |
| AC-1 | `GET /api/tracks` returns all four tracks with correct metadata.                                               |
| AC-2 | `GET /api/tracks/:slug` returns the track's modules and lessons in correct order with difficulty levels.       |
| AC-3 | `GET /api/tracks/:slug/modules/:moduleSlug/lessons/:lessonSlug` returns fully rendered lesson content.         |
| AC-4 | Advanced content is gated: free-tier users receive metadata but not full content for advanced modules/lessons. |
| AC-5 | Lesson responses include navigation references (next/previous lesson).                                         |
| AC-6 | Challenge definitions are returned for each module with correct type and metadata.                             |
| AC-7 | Content is sourced through the content provider interface (not directly from the file system).                 |

---

## Testing Requirements

- Unit tests for each API endpoint (valid slugs, invalid slugs, missing content).
- Unit tests for content access control logic (free-tier vs. premium for beginner/intermediate/advanced content).
- Unit tests for navigation reference generation (next/previous, first/last boundary cases).
- Integration tests for the content pipeline: Markdown file → content provider → API response.
- Test coverage ≥ 85%.
