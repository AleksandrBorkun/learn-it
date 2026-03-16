# Feature Requirements Document: In-Browser Code Editor

**Feature Name:** In-Browser Code Editor  
**Version:** 1.1  
**Last Updated:** 16 March 2026  
**Status:** Draft  
**PRD Traceability:** REQ-11a

---

## 1. Overview

The in-browser code editor is an embedded, sandboxed coding environment that allows learners to write, run, and see the output of code directly within the browser — without requiring any local development setup. It powers all code-based challenges (write-a-function, fill-in-the-blank) and provides real-time output for rapid iteration.

---

## 2. Business Context

- **Goal alignment:** Supports G2 (engagement) and G5 (learning outcomes) — removing the barrier of local setup dramatically increases the likelihood that users attempt code challenges.
- **Differentiator:** A live, interactive coding experience elevates LearnIt above text-only tutorial platforms.

---

## 3. User Stories

```gherkin
As a learner,
I want to write and run code directly in the browser during challenges,
so that I can practice without setting up a local development environment.
```

```gherkin
As a learner,
I want to see the output of my code in real time,
so that I can iterate quickly and learn from my mistakes.
```

```gherkin
As a learner on a mobile device,
I want the code editor to be usable with touch input,
so that I can practice coding on the go.
```

---

## 4. Functional Requirements

### 4.1 Editor Capabilities

| ID       | Requirement                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| EDITOR-1 | The platform must provide an embedded code editor within challenge and lesson pages.                                      |
| EDITOR-2 | The editor must support syntax highlighting for the four supported languages: **JavaScript, TypeScript, Python, and C#**. |
| EDITOR-3 | The editor must provide basic code editing features: line numbers, auto-indentation, bracket matching, and undo/redo.     |
| EDITOR-4 | For fill-in-the-blank challenges, the editor must render the pre-filled code with clearly marked editable regions.        |

### 4.2 Code Execution

| ID       | Requirement                                                                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| EDITOR-5 | The editor must allow users to **run** their code and see the output within the browser.                                                                     |
| EDITOR-6 | Code execution must occur in a **sandboxed, client-side environment** — user code must not be able to access the host system, network, or other users' data. |
| EDITOR-7 | Execution output (stdout, stderr) must be displayed in a dedicated output panel adjacent to or below the editor.                                             |
| EDITOR-8 | The output panel must update in **real time** (or near real-time) as execution completes.                                                                    |
| EDITOR-9 | If code execution exceeds a reasonable time or resource limit, it must be terminated and the user must be informed with a clear timeout/error message.       |

### 4.3 Challenge Integration

| ID        | Requirement                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| EDITOR-10 | When embedded in a code challenge, the editor must include a **"Submit"** action that evaluates the user's code against predefined test cases. |
| EDITOR-11 | The "Run" action lets the user test their code freely; the "Submit" action triggers formal evaluation and counts toward attempt tracking.      |
| EDITOR-12 | The editor must support loading starter code and read-only boilerplate (provided by the challenge definition).                                 |

### 4.4 Mobile Usability

| ID        | Requirement                                                                                |
| --------- | ------------------------------------------------------------------------------------------ |
| EDITOR-13 | The code editor must be usable on mobile devices (screens ≥ 320px wide).                   |
| EDITOR-14 | Touch targets (buttons, tab key, run/submit) must be appropriately sized for finger input. |
| EDITOR-15 | The editor must not interfere with the mobile keyboard or scroll behavior.                 |

---

## 5. Inputs & Outputs

### Inputs

- Challenge definition (starter code, read-only boilerplate, editable regions, test cases, language)
- User-written code
- Run / Submit actions

### Outputs

- Syntax-highlighted code editor rendered in the browser
- Execution output (stdout, stderr) in the output panel
- Test-case evaluation results (on Submit) — passed to the Quizzes & Challenges feature for feedback rendering
- Timeout/error messages when execution limits are exceeded

---

## 6. Dependencies

| Dependency                          | Direction | Description                                                                                  |
| ----------------------------------- | --------- | -------------------------------------------------------------------------------------------- |
| Quizzes & Code Challenges           | Upstream  | The editor is embedded within code-based challenge types and receives challenge definitions. |
| Learning Tracks & Content Structure | Upstream  | Determines which languages and challenge formats exist.                                      |
| Mobile-First Design                 | Peer      | The editor must meet mobile-first responsive and touch-interaction requirements.             |
| Freemium Access Model               | Peer      | "Run" is free and unlimited; "Submit" counts toward attempt tracking for free-tier users.    |

---

## 7. Acceptance Criteria

| #    | Criterion                                                                                                                                      |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | A user can write code in the embedded editor with syntax highlighting and basic editor features (line numbers, indentation, bracket matching). |
| AC-2 | A user can click "Run" and see execution output in the output panel within a reasonable time.                                                  |
| AC-3 | Code execution is sandboxed — no access to host system, network, or other users' data.                                                         |
| AC-4 | A code challenge loads starter code and marks editable vs. read-only regions.                                                                  |
| AC-5 | Clicking "Submit" evaluates code against test cases and returns pass/fail results to the challenge system.                                     |
| AC-6 | If code runs too long or consumes excessive resources, execution is terminated and the user sees a clear error message.                        |
| AC-7 | The editor is usable on a 320px-wide mobile screen with touch input.                                                                           |
| AC-8 | The "Run" action does not count toward the free-tier attempt limit; only "Submit" does.                                                        |

---

## 8. Constraints & Assumptions

- Code execution is **client-side / in-browser** (A4) — no server-side execution for v1.
- Supported languages for v1 are: **JavaScript, TypeScript, Python, and C#**. No other languages are in scope.
- The sandboxed execution environment must handle common edge cases (infinite loops, excessive memory) gracefully.

---

## 9. Open Questions

| #   | Question                                                                                             | Status                                                |
| --- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Q1  | What is the exact set of programming languages that need to be supported in the client-side sandbox? | ✅ Resolved — JavaScript, TypeScript, Python, and C#. |
| Q2  | What are appropriate execution time and memory limits for the sandbox?                               | Open — to be determined during implementation         |
