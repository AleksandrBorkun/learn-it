# Task 014: Frontend — In-Browser Code Editor Integration

**Feature:** In-Browser Code Editor  
**Type:** Frontend  
**Priority:** High — required by all code-based challenge types  
**Estimated Complexity:** High  
**FRD Traceability:** EDITOR-1 through EDITOR-15

---

## Description

Integrate an in-browser code editor component with sandboxed client-side code execution. The editor powers write-a-function and fill-in-the-blank challenges, supporting syntax highlighting, line numbers, auto-indentation, starter code loading, editable/read-only regions, and a "Run" action with real-time output. The "Submit" action ties into the challenge evaluation system (Task 012).

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides the app structure.
- **Task 009** (Frontend Design System) — provides responsive layout patterns and touch interaction guidelines.
- **Task 012** (Backend Quiz Engine) — provides challenge definitions (starter code, test cases) and submission endpoints.
- **Task 013** (Frontend Quiz UI) — the editor is embedded within the challenge UI.

---

## Technical Requirements

### Editor Component

- Integrate a mature, embeddable code editor library (e.g., Monaco Editor, CodeMirror).
- Support syntax highlighting for: JavaScript, TypeScript, Python, and C#.
- Provide basic editor features: line numbers, auto-indentation, bracket matching, undo/redo.
- For fill-in-the-blank challenges: render pre-filled code with clearly marked editable regions (read-only boilerplate + editable blanks).
- For write-a-function challenges: load starter code into the editor with full editability.

### Sandboxed Code Execution

- Execute user code in a sandboxed, client-side environment (e.g., Web Workers, iframes with restrictive policies, or a WASM-based runtime for Python/C#).
- The sandbox must prevent: access to the host system, network requests, access to other users' data, and DOM manipulation outside the sandbox.
- Support execution for JavaScript and TypeScript natively in the browser.
- Support execution for Python via a WASM-based runtime (e.g., Pyodide).
- Support execution for C# via a WASM-based runtime (e.g., Blazor WASM or .NET WASM).

### Output Panel

- Display stdout and stderr output in a dedicated panel below or adjacent to the editor.
- The output panel must update in real time (or near real-time) as execution completes.
- Support scrollable output for longer results.

### Run vs. Submit Actions

- **"Run"**: Executes the user's code and displays output. Free and unlimited — does not count toward attempt tracking.
- **"Submit"**: Evaluates the user's code against predefined test cases. Results are sent to the backend. Counts toward the free-tier attempt limit.
- Both buttons must be clearly labeled and easily accessible (especially on mobile).

### Execution Limits

- Enforce a configurable execution time limit (e.g., 10 seconds).
- Enforce a memory usage limit where possible.
- If execution exceeds limits, terminate it and display a clear timeout/error message to the user.

### Mobile Usability

- The editor must be usable on screens ≥ 320px wide.
- Touch targets for Run, Submit, and editor actions must be ≥ 44×44px.
- The virtual keyboard must not permanently obscure the editor or output panel; the view must scroll to keep the editing area visible.
- Consider reduced editor features on mobile if full-featured editing is not feasible (e.g., simpler editing mode).

---

## Acceptance Criteria

| #    | Criterion                                                                                                                                |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | The code editor renders with syntax highlighting, line numbers, auto-indentation, and bracket matching for all four supported languages. |
| AC-2 | Clicking "Run" executes user code and displays output in the output panel.                                                               |
| AC-3 | Code execution is sandboxed — no access to host system, network, or other users' data.                                                   |
| AC-4 | A write-a-function challenge loads starter code; a fill-in-the-blank challenge renders editable and read-only regions.                   |
| AC-5 | Clicking "Submit" evaluates code against test cases and returns pass/fail results.                                                       |
| AC-6 | If code execution exceeds the time/resource limit, it is terminated with a clear error message.                                          |
| AC-7 | The "Run" action does not count toward the free-tier attempt limit; only "Submit" does.                                                  |
| AC-8 | The editor is usable at 320px viewport width with appropriately sized touch targets.                                                     |

---

## Testing Requirements

- Unit tests for the sandbox execution environment (code runs in isolation, timeout enforcement, error handling).
- Unit tests for the editor configuration (language switching, starter code loading, editable region handling).
- Component tests for the editor with output panel (Run action, Submit action, result display).
- Component tests for execution limit behavior (timeout message, memory limit).
- Component tests at mobile viewport (editor usability, button accessibility, keyboard behavior).
- Integration test: load challenge → write code → Run → see output → Submit → see evaluation.
- Security tests: verify sandbox prevents unauthorized access (network, DOM, file system).
- Test coverage ≥ 85%.
