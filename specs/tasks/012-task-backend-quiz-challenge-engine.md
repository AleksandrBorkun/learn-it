# Task 012: Backend — Quiz & Challenge Evaluation Engine

**Feature:** Quizzes & Code Challenges  
**Type:** Backend  
**Priority:** High — quizzes are embedded in every module; tied to progress, gamification, and freemium  
**Estimated Complexity:** High  
**FRD Traceability:** QUIZ-1 through QUIZ-25

---

## Description

Implement the backend engine that accepts user submissions for all challenge types, evaluates them against predefined answers/test cases/rubrics, records attempt history, and returns immediate feedback. This engine handles: multiple-choice, multiple-select, write-a-function, fill-in-the-blank, system design (graph-based), and prompt-based (rubric) challenges.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — provides the API framework.
- **Task 003** (Database Schema) — provides Challenge, UserAttempt, and related entities.
- **Task 004** (Content Structure) — provides challenge definition parsing for all six types.
- **Task 005** (Backend Auth) — submission endpoints require authentication.
- **Task 007** (Backend Learning Tracks API) — challenge definitions are associated with modules.

---

## Technical Requirements

### API Endpoints

- `GET /api/challenges/:challengeId` — Returns the challenge definition (prompt, type, options/starter code, metadata) for rendering.
- `POST /api/challenges/:challengeId/submit` — Accepts a user's submission, evaluates it, records the attempt, and returns feedback.
- `GET /api/challenges/:challengeId/history` — Returns the authenticated user's attempt history for a given challenge.

### Evaluation Logic (per challenge type)

**Multiple-Choice (QUIZ-3a)**

- Compare selected option index to the correct answer index.
- Return: correct/incorrect, explanation text.

**Multiple-Select (QUIZ-3b)**

- Compare selected option indices to the correct answer set.
- Return: correct/incorrect, which options were right/wrong, explanation text.

**Write-a-Function (QUIZ-3c)**

- Accept user code; evaluation happens client-side (Task 014). The backend receives test-case results from the client.
- Record whether all test cases passed.
- Return: per-test-case pass/fail, overall pass/fail, explanation text.

**Fill-in-the-Blank (QUIZ-3d)**

- Compare user's filled values against expected completions.
- Evaluation may happen client-side; backend records results.
- Return: per-blank correctness, overall pass/fail, explanation text.

**System Design / Diagram (QUIZ-3e, QUIZ-15–20)**

- Accept the user's graph submission: selected node IDs and edge pairs.
- Compare against one or more valid solution graphs defined in the challenge metadata.
- Determine: correct nodes, missing nodes, unnecessary nodes, correct connections, missing connections, unnecessary connections.
- Return: per-node and per-connection correctness feedback, overall pass/fail, explanation.

**Prompt-Based / Rubric (QUIZ-3f, QUIZ-21–25)**

- Accept the user's free-form text/code response.
- Evaluate against the predefined Markdown rubric: check for expected keywords, naming conventions, and structural requirements.
- Return: per-rubric-criterion pass/fail, overall pass/fail, explanation.

### Attempt Recording

- Record every submission: user ID, challenge ID, timestamp, is correct, response data (JSON).
- Support re-attempts: passing a previously passed challenge does not change the "passed" status.
- Expose pass/fail status per challenge for progress tracking integration.

### Event Publishing

- Publish events on correct submissions (for gamification points — consumed by Task 021):
  - Challenge solved event (type, challenge ID, user ID).
  - First challenge solved event (if applicable).
  - Streak detection: consecutive correct answers in a row.

---

## Acceptance Criteria

| #    | Criterion                                                                                                                     |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | A multiple-choice submission returns correct/incorrect with explanation.                                                      |
| AC-2 | A multiple-select submission identifies which options were correct and which were wrong.                                      |
| AC-3 | A write-a-function submission records per-test-case results and overall pass/fail.                                            |
| AC-4 | A system design submission evaluates nodes and connections against valid solution graphs, accepting multiple correct answers. |
| AC-5 | A prompt-based submission evaluates against rubric criteria and reports per-criterion pass/fail.                              |
| AC-6 | Incorrect submissions are recorded in attempt history.                                                                        |
| AC-7 | Re-attempting a previously passed challenge does not change the "passed" status.                                              |
| AC-8 | Events are published on correct submissions for downstream gamification consumption.                                          |

---

## Testing Requirements

- Unit tests for each evaluation type (multiple-choice, multiple-select, write-a-function, fill-in-blank, design, prompt-rubric).
- Unit tests for graph comparison logic (correct, partially correct, completely wrong, multiple valid solutions).
- Unit tests for rubric evaluation logic (all criteria met, partial, none met, naming conventions).
- Unit tests for attempt recording (new attempt, re-attempt of passed challenge).
- Unit tests for event publishing (challenge solved, first challenge, streak detection).
- Integration tests for each submission endpoint (all six types, happy path and error cases).
- Test coverage ≥ 85%.
