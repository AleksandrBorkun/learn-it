# Task 016: Frontend — Prompt-Based Challenge with Rubric Evaluation

**Feature:** Quizzes & Code Challenges (Prompt-Based type)  
**Type:** Frontend  
**Priority:** Medium — specialized challenge type within the quiz system  
**Estimated Complexity:** Medium  
**FRD Traceability:** QUIZ-21 through QUIZ-25

---

## Description

Implement the frontend for prompt-based challenges where users provide free-form text or code responses that are evaluated against a predefined Markdown rubric. The rubric specifies expected keywords, naming conventions, and structural requirements.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides the app structure.
- **Task 009** (Frontend Design System) — provides shared components and responsive patterns.
- **Task 012** (Backend Quiz Engine) — provides prompt challenge definitions and rubric-based evaluation endpoints.
- **Task 013** (Frontend Quiz UI) — the prompt challenge is integrated into the challenge rendering system.

---

## Technical Requirements

### Prompt Display

- Render the challenge prompt as formatted text (supports Markdown rendering for rich prompts with examples, context, and instructions).
- Clearly convey what the user is expected to provide (e.g., "Write a prompt to…", "Name the correct resource…").

### Response Input

- Provide a multi-line text input area (or code editor if the prompt expects code) for the user's response.
- Support text formatting preview if the response is expected to include code or structured text.
- Include character count or size indicator if there are constraints on response length.

### Submission & Evaluation

- On "Submit," send the user's text response to the backend evaluation endpoint.
- The backend compares against the rubric's expected keywords, naming conventions, and structural requirements.
- Display per-criterion feedback: each rubric criterion listed with a pass/fail indicator and explanation.

### Feedback Display

- Render the rubric criteria as a checklist with pass/fail status for each.
- Clearly indicate which naming conventions were correct and which were incorrect.
- Display the overall pass/fail result.
- Show the explanation text for the challenge.

### Mobile Usability

- The text input area must be usable at 320px viewport width.
- The rubric feedback list must be scrollable and readable on mobile.
- Submit button must meet the 44×44px touch target minimum.

---

## Acceptance Criteria

| #    | Criterion                                                                                             |
| ---- | ----------------------------------------------------------------------------------------------------- |
| AC-1 | The challenge prompt renders correctly as formatted text.                                             |
| AC-2 | The user can enter a free-form text or code response in the input area.                               |
| AC-3 | On submission, the response is evaluated against the rubric and per-criterion pass/fail is displayed. |
| AC-4 | Incorrect naming conventions are specifically identified in the feedback.                             |
| AC-5 | The overall pass/fail result is clearly displayed with the explanation.                               |
| AC-6 | The challenge is fully usable at 320px viewport width.                                                |

---

## Testing Requirements

- Component tests for the prompt display (Markdown rendering, prompt formatting).
- Component tests for the response input area (text entry, character count, code mode).
- Component tests for the rubric feedback display (per-criterion pass/fail, naming feedback).
- Unit tests for the submission flow (loading state, success, error handling).
- Component tests at mobile viewport.
- Integration test: render prompt → enter response → submit → see rubric feedback.
- Test coverage ≥ 85%.
