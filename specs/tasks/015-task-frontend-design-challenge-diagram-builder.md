# Task 015: Frontend — System Design Diagram Builder Challenge

**Feature:** Quizzes & Code Challenges (System Design type)  
**Type:** Frontend  
**Priority:** Medium — specialized challenge type within the quiz system  
**Estimated Complexity:** High  
**FRD Traceability:** QUIZ-15 through QUIZ-20

---

## Description

Implement the card/node-based diagram builder for system/software design challenges. Users drag, place, and connect architectural component cards on a visual canvas to compose a system diagram. The submission is evaluated as a graph against one or more valid solutions.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides the app structure.
- **Task 009** (Frontend Design System) — provides responsive patterns and touch interaction support.
- **Task 012** (Backend Quiz Engine) — provides design challenge definitions (available nodes, valid solution graphs) and evaluation endpoints.
- **Task 013** (Frontend Quiz UI) — the diagram builder is integrated into the challenge rendering system.

---

## Technical Requirements

### Node/Card System

- Render a palette of available cards (nodes) as defined in the challenge metadata.
- Each card displays: a label (component name), description/icon, and a visual representation.
- Cards are draggable from the palette onto a canvas area.
- Cards on the canvas can be repositioned freely.
- Cards can be removed from the canvas (returned to the palette or deleted).

### Connection System

- Users can create connections (edges) between placed cards by drawing a line between them.
- Connections must be visually distinct (arrows or lines with labels if applicable).
- Connections can be removed individually.
- The connection interaction must work with both mouse (click-and-drag) and touch (tap-and-tap or long-press-and-drag).

### Canvas

- The canvas provides a workspace area where cards are placed and connected.
- Support zoom and pan on desktop; pinch-to-zoom and swipe-to-pan on mobile.
- The canvas must adapt its size to the viewport while remaining functional at 320px width.

### Submission

- On "Submit," serialize the user's diagram into a graph format: list of selected node IDs and list of edge pairs.
- Send the graph to the backend for evaluation against valid solution graphs.
- Display feedback: correct nodes (highlighted green), missing nodes (listed), unnecessary nodes (highlighted yellow), correct connections (green), missing connections (listed), unnecessary connections (yellow).

### Feedback Display

- Visually annotate the user's diagram with correctness indicators.
- Display a textual summary of feedback alongside the visual annotations.
- If the challenge supports multiple valid solutions, accept any matching solution as correct.

### Mobile Usability

- The diagram builder must be functional on mobile screens ≥ 320px wide.
- Touch-based card dragging and connection creation must be supported.
- Consider a simplified interaction model on mobile (e.g., tap-to-place, tap-to-connect) vs. the mouse-based drag model.

---

## Acceptance Criteria

| #    | Criterion                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| AC-1 | Available cards for a design challenge are rendered in a palette based on the challenge definition.           |
| AC-2 | A user can drag cards from the palette to the canvas and reposition them.                                    |
| AC-3 | A user can create connections between placed cards.                                                           |
| AC-4 | On submission, the user's diagram is evaluated and feedback shows correct, missing, and unnecessary nodes/connections. |
| AC-5 | A challenge with multiple valid solutions accepts any valid configuration as correct.                         |
| AC-6 | The diagram builder is functional on a 320px-wide mobile screen with touch input.                            |
| AC-7 | Cards and connections can be removed from the canvas.                                                         |

---

## Testing Requirements

- Component tests for the card palette (renders available cards, drag interaction).
- Component tests for the canvas (card placement, repositioning, removal).
- Component tests for the connection system (create connection, remove connection, visual rendering).
- Unit tests for graph serialization (selected nodes, edges correctly serialized).
- Component tests for feedback display (correct/missing/unnecessary annotations).
- Component tests at mobile viewport (touch interactions, canvas usability).
- Integration test: load design challenge → place cards → connect → submit → see feedback.
- Test coverage ≥ 85%.
