# Task 008: Frontend — Track Catalog & Lesson Rendering

**Feature:** Learning Tracks & Content Structure  
**Type:** Frontend  
**Priority:** High — core learning experience  
**Estimated Complexity:** Medium-High  
**FRD Traceability:** TRACK-1 through TRACK-18

---

## Description

Implement the frontend pages for browsing the track catalog, viewing track overviews with module/lesson hierarchies, and reading lesson content. This includes Markdown rendering with syntax-highlighted code blocks, sequential navigation between lessons, and difficulty-level indicators.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides Next.js structure, routing, and styling foundation.
- **Task 007** (Backend Learning Tracks API) — provides the track, module, lesson, and challenge data endpoints.
- **Task 006** (Frontend Auth) — authenticated route access and user tier information.

---

## Technical Requirements

### Track Catalog Page

- Display all available tracks in a visually appealing card-based layout.
- Each card shows: track name, short description, estimated duration, number of modules, and difficulty range.
- Tracks must be linkable to their overview page.
- Responsive: single-column on mobile, multi-column grid on tablet/desktop.

### Track Overview Page

- Display the track name, description, and full module/lesson hierarchy.
- Each module shows: name, difficulty level badge, lesson count, and completion status (placeholder — populated by Task 011).
- Each lesson listing shows: title, difficulty level, completion indicator (placeholder).
- Advanced-level modules/lessons must display a "Premium" lock icon for free-tier users with an upgrade prompt on click.
- Include a "Start Track" or "Continue" button (links to the first incomplete lesson — placeholder logic until Task 011).

### Lesson Page

- Render the full lesson content from Markdown with support for: headings, paragraphs, lists, code blocks (syntax-highlighted), images, links, tables, and callout/tip blocks.
- Display the lesson's position within the module (e.g., "Lesson 3 of 7").
- Provide "Previous" and "Next" navigation buttons to move sequentially through lessons.
- Include a placeholder area at the end of the lesson for associated quizzes/challenges (populated by Task 013).
- Code blocks must include a "Save to Snippet Library" action (placeholder — populated by Task 020).

### Markdown Rendering

- Use a Markdown rendering library that supports GitHub Flavored Markdown.
- Code blocks must render with syntax highlighting for all supported languages (JavaScript, TypeScript, Python, C#).
- Images must be responsive and not cause horizontal scrolling.

### Mobile Experience

- All pages must render correctly at 320px viewport width.
- Lesson navigation (prev/next) must use appropriately sized touch targets.
- The lesson page must support comfortable reading on mobile (appropriate font sizes, line heights, margins).

---

## Acceptance Criteria

| #    | Criterion                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| AC-1 | The track catalog displays all four tracks with names, descriptions, durations, and difficulty ranges.        |
| AC-2 | The track overview shows modules and lessons hierarchically with difficulty level indicators.                 |
| AC-3 | Advanced modules/lessons show a "Premium" lock indicator for free-tier users.                                 |
| AC-4 | A lesson page renders Markdown content correctly including syntax-highlighted code blocks, images, and tables. |
| AC-5 | Previous/Next lesson navigation works correctly, including boundary cases (first/last lesson).                |
| AC-6 | The lesson position indicator shows the correct position (e.g., "Lesson 3 of 7").                            |
| AC-7 | All pages are fully usable at 320px viewport width without horizontal scrolling.                             |

---

## Testing Requirements

- Component tests for the track catalog card (renders all required metadata, responsive layout).
- Component tests for the track overview page (module hierarchy, premium lock indicators).
- Component tests for the lesson page (Markdown rendering, navigation buttons, position indicator).
- Unit tests for Markdown rendering (headings, code blocks, images, tables, callouts).
- Unit tests for navigation logic (next/previous, boundary cases).
- Visual regression tests at mobile, tablet, and desktop breakpoints.
- Test coverage ≥ 85%.
