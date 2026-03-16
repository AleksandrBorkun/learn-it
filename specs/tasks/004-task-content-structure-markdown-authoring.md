# Task 004: Content Structure & Markdown Authoring Framework

**Feature:** Scaffolding  
**Type:** Full-stack (Content pipeline)  
**Priority:** Critical — must be completed before learning track features  
**Estimated Complexity:** Medium  
**PRD Traceability:** REQ-25, REQ-26

---

## Description

Define and implement the Markdown-based content authoring framework, including the directory/file conventions for tracks, modules, lessons, and challenge definitions. This task also establishes the content abstraction layer that decouples the rendering frontend from the Markdown file system, enabling future CMS migration without frontend changes.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — content APIs are part of the backend.
- **Task 003** (Database Schema) — track/module/lesson metadata is stored in the database; content files are referenced by path.

---

## Technical Requirements

### Content Directory Structure

- Define a canonical directory structure for content files that maps to the Track → Module → Lesson hierarchy.
- Example structure:
  ```
  content/
    tracks/
      ai/
        track.md          (track metadata: name, description, duration, etc.)
        modules/
          01-introduction/
            module.md      (module metadata: name, description, difficulty)
            lessons/
              01-what-is-ai.md
              02-history-of-ai.md
            challenges/
              quiz-01.md
              challenge-01.md
  ```
- Define the frontmatter schema for each content type (track, module, lesson, challenge).

### Challenge Definition Format

- Define Markdown + frontmatter schemas for each challenge type:
  - **Multiple-choice**: prompt, options array, correct answer index, explanation.
  - **Multiple-select**: prompt, options array, correct answer indices, explanation.
  - **Write-a-function**: prompt, starter code, test cases (input/expected output), language, explanation.
  - **Fill-in-the-blank**: prompt, code template with blank markers, correct completions, explanation.
  - **System design (diagram)**: prompt, available nodes (cards) with labels/descriptions, valid solution graphs (adjacency lists), explanation.
  - **Prompt-based (rubric)**: prompt, rubric file reference, expected keywords/naming, explanation.

### Content Abstraction Layer

- Implement a content provider interface that abstracts how content is fetched (file system, CMS, etc.).
- Implement a Markdown file system provider as the default (v1) implementation.
- The content provider must expose methods: get all tracks, get track by slug, get modules for track, get lessons for module, get challenges for module.
- Frontend rendering components must consume the content provider interface — not read Markdown files directly.

### Content Parsing

- Implement Markdown parsing with frontmatter extraction.
- Support standard Markdown features: headings, lists, code blocks (with language annotation for syntax highlighting), images, links, tables, callout/tip blocks.
- Parse challenge definitions from their structured Markdown format into typed objects.

### Placeholder Content

- Create at least one complete track with 2+ modules, 3+ lessons per module, and 1+ challenge per module as placeholder content.
- Include examples of each challenge type in the placeholder content.

---

## Acceptance Criteria

| #    | Criterion                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------- |
| AC-1 | A canonical content directory structure is defined and documented.                                      |
| AC-2 | Frontmatter schemas are defined for tracks, modules, lessons, and all six challenge types.              |
| AC-3 | A content provider interface exposes track, module, lesson, and challenge data.                         |
| AC-4 | The Markdown file system provider correctly reads and parses content files.                             |
| AC-5 | Swapping the content provider implementation does not require changes to frontend rendering components. |
| AC-6 | Markdown content renders with full support: headings, lists, code blocks, images, links, tables.        |
| AC-7 | Placeholder content exists for at least one track with all challenge types represented.                 |

---

## Testing Requirements

- Unit tests for Markdown parsing (frontmatter extraction, content body rendering).
- Unit tests for each challenge definition parser (all six types).
- Unit tests for the content provider interface (mock implementations verify contract).
- Integration tests verifying the file system provider reads and returns correct data from the content directory.
- Test coverage ≥ 85% for all content parsing and provider code.
