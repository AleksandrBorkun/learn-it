# Task 019: Backend — Code Snippet Library API

**Feature:** Code Snippet Library  
**Type:** Backend  
**Priority:** Medium  
**Estimated Complexity:** Medium  
**FRD Traceability:** SNIP-1 through SNIP-12

---

## Description

Implement the backend CRUD API for the personal code snippet library. Users can create, read, update, delete, search, and filter their saved code snippets. Snippets can be saved from lessons or created manually, tagged, and searched by title, content, or tags.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — provides the API framework.
- **Task 003** (Database Schema) — provides the CodeSnippet entity model.
- **Task 005** (Backend Auth) — snippets are per-user; endpoints require authentication.

---

## Technical Requirements

### API Endpoints

- `POST /api/snippets` — Create a new snippet. Accepts: title, code content, programming language, tags (optional), source lesson ID (optional).
- `GET /api/snippets` — List the authenticated user's snippets with support for:
  - **Search**: query parameter matching against title, code content, and tags.
  - **Filter**: by programming language and/or tag.
  - **Pagination**: cursor-based or offset pagination.
  - **Sort**: by date saved (newest first, default) or title alphabetically.
- `GET /api/snippets/:id` — Get a single snippet's full details.
- `PATCH /api/snippets/:id` — Update a snippet's title, code content, language, or tags. Only the snippet owner can update.
- `DELETE /api/snippets/:id` — Delete a snippet. Only the snippet owner can delete.

### Data Validation

- Title is required and must be non-empty (max 200 characters).
- Code content is required and must be non-empty.
- Programming language must be one of the supported languages or "other."
- Tags are optional, free-form strings; each tag has a max length of 50 characters.
- Source lesson ID, if provided, must reference an existing lesson.

### Authorization

- Users can only access, update, and delete their own snippets.
- Attempting to access another user's snippet must return 403 Forbidden.

### Search Implementation

- Full-text search across title and code content.
- Tag search must support exact match filtering.
- Search must be performant; consider indexing strategy for snippet search.

---

## Acceptance Criteria

| #    | Criterion                                                                       |
| ---- | ------------------------------------------------------------------------------- |
| AC-1 | A user can create a snippet with title, code, language, and optional tags.      |
| AC-2 | A user can list their snippets with pagination.                                 |
| AC-3 | A user can search snippets by title or code content and see matching results.   |
| AC-4 | A user can filter snippets by tag or programming language.                      |
| AC-5 | A user can update a snippet's title, code, language, and tags.                  |
| AC-6 | A user can delete a snippet and it no longer appears in their library.          |
| AC-7 | A user cannot access, update, or delete another user's snippets (403 response). |
| AC-8 | Snippets saved from a lesson include the source lesson reference.               |

---

## Testing Requirements

- Unit tests for data validation (required fields, max lengths, valid language values).
- Unit tests for authorization checks (own snippets vs. other user's snippets).
- Unit tests for search functionality (title match, content match, tag match, combined filters).
- Integration tests for each CRUD endpoint (create, read, list, update, delete).
- Integration test for search and filter operations with multiple snippets.
- Integration test for pagination behavior.
- Test coverage ≥ 85%.
