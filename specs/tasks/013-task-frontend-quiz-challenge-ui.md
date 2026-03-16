# Task 013: Frontend — Quiz & Challenge UI

**Feature:** Quizzes & Code Challenges  
**Type:** Frontend  
**Priority:** High — quizzes are part of every module  
**Estimated Complexity:** Medium-High  
**FRD Traceability:** QUIZ-1 through QUIZ-14

---

## Description

Implement the frontend UI for rendering and interacting with quizzes and challenges of the standard types: multiple-choice, multiple-select, write-a-function (integrated with the code editor — Task 014), and fill-in-the-blank. Also implement the submission flow, immediate feedback display, attempt tracking indicator, and challenge history.

System design diagram builder (Task 015) and prompt-based rubric challenges (Task 016) are handled in separate tasks due to their complexity.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides the app structure and routing.
- **Task 008** (Frontend Track Catalog & Lessons) — challenges are embedded in lesson/module pages.
- **Task 009** (Frontend Design System) — provides shared components.
- **Task 012** (Backend Quiz Engine) — provides challenge data and submission endpoints.

---

## Technical Requirements

### Challenge Rendering (by type)

**Multiple-Choice Quiz**

- Display the question prompt and a list of selectable options (radio buttons).
- Allow the user to select one option and click "Submit."
- After submission, highlight the correct answer in green and any incorrect selection in red.
- Display the explanation text.

**Multiple-Select Quiz**

- Display the question prompt and a list of options (checkboxes).
- Allow the user to select one or more options and click "Submit."
- After submission, indicate which selections were correct and which were wrong.
- Display the explanation text.

**Write-a-Function Challenge**

- Embed the in-browser code editor (Task 014) with the challenge's starter code loaded.
- Provide "Run" (test freely, no submission recorded) and "Submit" (formal evaluation) buttons.
- After submission, display per-test-case pass/fail results and the explanation.

**Fill-in-the-Blank**

- Embed the in-browser code editor (Task 014) with the code template rendered, blank regions clearly marked as editable.
- Provide "Run" and "Submit" buttons.
- After submission, display per-blank correctness and the explanation.

### Submission Flow

- On "Submit," send the user's response to `POST /api/challenges/:challengeId/submit`.
- Display a loading state during evaluation.
- Render the feedback immediately upon response: correct/incorrect status, detailed feedback, and explanation.

### Attempt Tracking Display

- Show the user's remaining attempt count (for free-tier users) before and after each submission.
- When attempts are exhausted, display the lockout message with cooldown timer and upgrade prompt (integrates with Task 017/018).

### Feedback Display

- Correct answers: positive visual indicator (green checkmark, congratulatory message).
- Incorrect answers: negative visual indicator (red X), explanation of the correct answer.
- For code challenges: per-test-case results rendered as a list with pass/fail icons.

### Challenge History

- Allow users to re-attempt previously passed challenges for practice.
- Indicate on the challenge UI whether the challenge has been previously passed.

### Mobile Experience

- All challenge types must be fully interactive at 320px viewport width.
- Radio buttons, checkboxes, and submit buttons must meet the 44×44px touch target minimum.
- Code editor integration must follow mobile usability requirements (Task 014).

---

## Acceptance Criteria

| #    | Criterion                                                                                                  |
| ---- | ---------------------------------------------------------------------------------------------------------- |
| AC-1 | A multiple-choice quiz renders the question and selectable options; submission returns immediate feedback. |
| AC-2 | A multiple-select quiz renders checkboxes; submission identifies correct and incorrect selections.         |
| AC-3 | A write-a-function challenge embeds the code editor with starter code; Run and Submit are both functional. |
| AC-4 | A fill-in-the-blank challenge renders the template with editable blanks; submission evaluates completions. |
| AC-5 | After any submission, the feedback (correct/incorrect, explanation) is displayed immediately.              |
| AC-6 | Free-tier users see their remaining attempt count; after exhaustion, a lockout message appears.            |
| AC-7 | A previously passed challenge is visually indicated; re-attempts do not affect completion status.          |
| AC-8 | All challenge types are fully usable at 320px viewport width.                                              |

---

## Testing Requirements

- Component tests for each challenge type renderer (multiple-choice, multiple-select, write-a-function placeholder, fill-in-the-blank placeholder).
- Component tests for the feedback display (correct, incorrect, per-test-case results).
- Component tests for the attempt tracking indicator (remaining count, lockout state).
- Unit tests for the submission flow (loading state, success, error handling).
- Component tests at mobile viewport sizes.
- Integration test for the full flow: render challenge → submit answer → see feedback.
- Test coverage ≥ 85%.
