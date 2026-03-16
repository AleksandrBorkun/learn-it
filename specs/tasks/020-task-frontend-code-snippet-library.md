# Task 020: Frontend — Code Snippet Library UI

**Feature:** Code Snippet Library  
**Type:** Frontend  
**Priority:** Medium  
**Estimated Complexity:** Medium  
**FRD Traceability:** SNIP-1 through SNIP-12

---

## Description

Implement the frontend code snippet library: the library page with list/grid view, search and filter controls, snippet detail view with syntax highlighting and copy-to-clipboard, "Save to Library" action on lesson code blocks, and manual snippet creation/editing.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides app structure and routing.
- **Task 008** (Frontend Track Catalog & Lessons) — lesson pages contain code blocks with "Save to Library" action.
- **Task 009** (Frontend Design System) — provides shared components (cards, form controls, search input, tabs).
- **Task 019** (Backend Snippet Library API) — provides snippet CRUD and search endpoints.

---

## Technical Requirements

### Snippet Library Page

- Display all user snippets in a list or grid view (user-toggleable or responsive default).
- Each snippet card shows: title, programming language badge, tags, and date saved.
- Provide a search input for searching by title, code content, or tags.
- Provide filter controls: by programming language and by tag (populated from the user's existing tags).
- Support pagination or infinite scroll for large libraries.
- Show an empty state with a call-to-action when the user has no saved snippets.

### Snippet Detail View

- Display the full snippet with syntax-highlighted code (appropriate to the snippet's language).
- Show metadata: title, programming language, tags, source lesson (if applicable), date saved.
- Provide a "Copy to Clipboard" button that copies the code content.
- If the snippet was saved from a lesson, include a link back to the source lesson.
- Provide "Edit" and "Delete" actions.

### Save from Lesson

- Add a "Save to Library" action (button or icon) on every code block within lesson pages.
- Clicking "Save to Library" opens a dialog pre-populated with: the code content, the programming language (detected from the code block annotation), and the source lesson reference.
- The user can add a title and optional tags before saving.
- Show a success confirmation after saving.

### Manual Snippet Creation

- Provide a "New Snippet" action on the library page.
- The creation form includes: title, code content (with a code editor input), programming language selector, and tag input (supports adding multiple tags).
- Validate required fields before submission.

### Snippet Editing

- The edit form pre-populates current values and allows updating: title, code content, language, and tags.
- Changes are saved immediately on form submission.

### Snippet Deletion

- Confirm before deleting (confirmation dialog).
- After deletion, the snippet is removed from the list and the user is returned to the library page.

### Mobile Experience

- The snippet library is fully usable at 320px viewport width.
- Search and filter controls are accessible on mobile (consider collapsible filter panel).
- The copy-to-clipboard button has an appropriate touch target size.
- Syntax-highlighted code blocks are horizontally scrollable on narrow screens.

---

## Acceptance Criteria

| #    | Criterion                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| AC-1 | A user can save a code snippet from a lesson page and find it in their snippet library.                      |
| AC-2 | A user can create a new snippet manually with title, code, language, and tags.                               |
| AC-3 | A user can search snippets by title or code content and see matching results.                                |
| AC-4 | A user can filter snippets by tag or programming language.                                                    |
| AC-5 | A user can edit a snippet's title, code, tags, and language.                                                  |
| AC-6 | A user can delete a snippet (with confirmation) and it no longer appears in the library.                     |
| AC-7 | Snippet detail view shows syntax-highlighted code and a working copy-to-clipboard button.                    |
| AC-8 | A snippet saved from a lesson includes a link back to the source lesson.                                     |
| AC-9 | The snippet library is fully usable at 320px viewport width.                                                  |

---

## Testing Requirements

- Component tests for the snippet library page (list view, search, filter, empty state).
- Component tests for the snippet detail view (syntax highlighting, metadata, copy-to-clipboard, source link).
- Component tests for the "Save to Library" dialog on lesson pages (pre-populated fields, save action).
- Component tests for the snippet creation and editing forms (validation, submission).
- Component tests for the deletion flow (confirmation dialog, removal).
- Component tests at mobile viewport.
- Integration test: save from lesson → find in library → view detail → copy → edit → delete.
- Test coverage ≥ 85%.
