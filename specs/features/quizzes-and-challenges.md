# Feature Requirements Document: Quizzes & Code Challenges

**Feature Name:** Quizzes & Code Challenges  
**Version:** 1.1  
**Last Updated:** 16 March 2026  
**Status:** Draft  
**PRD Traceability:** REQ-9, REQ-10, REQ-11

---

## 1. Overview

Quizzes and code challenges are the hands-on reinforcement layer of every learning track. Every module must include at least one assessment that tests the learner's understanding. Challenges vary in type — from multiple-choice knowledge checks to write-a-function exercises — and always provide immediate feedback.

---

## 2. Business Context

- **Goal alignment:** Supports G2 (engagement), G5 (learning outcomes — ≥ 65% pass rate target), and G3 (premium conversion — attempt limits on free tier create upgrade incentive).
- **Pedagogical value:** Active recall and practice are proven to improve knowledge retention; challenges are the mechanism for this.

---

## 3. User Stories

```gherkin
As a learner,
I want to take a quiz after each section,
so that I can verify I understood the material.
```

```gherkin
As a learner,
I want to attempt a hands-on code challenge after each section,
so that I can apply what I learned in practice.
```

```gherkin
As a learner,
I want to receive immediate feedback on my answers,
so that I can learn from my mistakes right away.
```

```gherkin
As a free-tier user,
I want to know how many attempts I have remaining,
so that I can be thoughtful with my answers.
```

---

## 4. Functional Requirements

### 4.1 Challenge Placement

| ID     | Requirement                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------- |
| QUIZ-1 | Every module (logical section) within a track must include at least one quiz or code challenge.                 |
| QUIZ-2 | Challenges must appear at the end of a module or interspersed within lessons, as defined by the content author. |

### 4.2 Challenge Types

| ID     | Requirement                                                                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| QUIZ-3 | The platform must support the following challenge types:                                                                                |
|        | **a.** Multiple-choice quiz (single correct answer)                                                                                     |
|        | **b.** Multiple-select quiz (one or more correct answers)                                                                               |
|        | **c.** Write-a-function exercise (user writes code evaluated against test cases)                                                        |
|        | **d.** Fill-in-the-blank code completion (user completes a partially written code snippet)                                              |
|        | **e.** System/software design prompt — **card/node-based diagram builder** (see §4.6)                                                   |
|        | **f.** Prompt-based challenge — evaluated against a **predefined Markdown rubric** (see §4.7)                                           |
| QUIZ-4 | Each challenge must be defined in Markdown with structured metadata (type, prompt, options/test-cases, correct answer(s), explanation). |

### 4.3 Submission & Feedback

| ID     | Requirement                                                                                                                                     |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| QUIZ-5 | Upon submission, the user must receive **immediate feedback**: correct or incorrect.                                                            |
| QUIZ-6 | Feedback must include an **explanation** of the correct answer, regardless of whether the user answered correctly or incorrectly.               |
| QUIZ-7 | For code challenges (write-a-function, fill-in-the-blank), feedback must include test-case results showing which cases passed and which failed. |
| QUIZ-8 | Incorrect submissions must count toward the free-tier attempt limit (see Freemium Access Model FRD).                                            |

### 4.4 Attempt Tracking

| ID      | Requirement                                                                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUIZ-9  | The system must track the number of incorrect attempts per user within the current 12-hour window (for free-tier enforcement).                            |
| QUIZ-10 | Free-tier users must see a visible indicator of remaining attempts before and after each submission.                                                      |
| QUIZ-11 | When a free-tier user exhausts all 5 attempts, new submissions must be blocked with a clear message explaining the cooldown and when attempts will reset. |
| QUIZ-12 | Premium users have unlimited attempts with no restrictions.                                                                                               |

### 4.5 Challenge Results & History

| ID      | Requirement                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------ |
| QUIZ-13 | The system must record whether the user passed each challenge (for progress tracking).                                   |
| QUIZ-14 | Users must be able to re-attempt a previously passed challenge for practice (re-attempts do not affect progress status). |

### 4.6 System/Software Design Challenges (Card/Node Diagram Builder)

| ID      | Requirement                                                                                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUIZ-15 | Design challenges must present the user with a set of **cards (nodes)** representing architectural components, services, or building blocks relevant to the challenge prompt. |
| QUIZ-16 | The user must be able to **drag, place, and connect** cards on a visual canvas to compose an application/system diagram.                                                      |
| QUIZ-17 | Evaluation must be based on **which nodes the user selected** and **how they connected them** (edges/relationships between nodes).                                            |
| QUIZ-18 | There may be **more than one correct answer** — multiple valid diagram configurations must be accepted.                                                                       |
| QUIZ-19 | The set of available cards and the valid solution graph(s) must be defined in the challenge's Markdown metadata.                                                              |
| QUIZ-20 | Feedback must indicate which nodes and connections were correct, which were missing, and which were unnecessary.                                                              |

### 4.7 Prompt-Based Challenges (Markdown Rubric Evaluation)

| ID      | Requirement                                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUIZ-21 | Prompt-based challenges must present the user with a prompt requiring a free-form text or code response (e.g., "write a prompt to…", "name the correct resource…"). |
| QUIZ-22 | Evaluation must be performed against a **predefined Markdown rubric file** that specifies expected keywords, naming conventions, and structural requirements.       |
| QUIZ-23 | The user's response must use **correct naming conventions** as defined in the rubric (e.g., correct resource names, service identifiers, terminology).              |
| QUIZ-24 | The rubric file must be part of the challenge definition and authored alongside the lesson content.                                                                 |
| QUIZ-25 | Feedback must indicate which rubric criteria were met and which were not.                                                                                           |

---

## 5. Inputs & Outputs

### Inputs

- Challenge definitions (Markdown with structured metadata: type, prompt, options, correct answers, explanations, test cases)
- For design challenges: card/node definitions and valid solution graph(s) in Markdown metadata
- For prompt challenges: predefined Markdown rubric files with expected naming, keywords, and structure
- User submissions (selected answers, written code, free-form text, node diagrams)

### Outputs

- Immediate feedback (correct/incorrect, explanation, test-case results)
- For design challenges: per-node and per-connection correctness feedback
- For prompt challenges: per-rubric-criterion pass/fail feedback
- Attempt count updates (remaining attempts for free-tier users)
- Pass/fail result recorded for progress tracking
- Points awarded for correct answers (feeds Gamification System)

---

## 6. Dependencies

| Dependency                          | Direction  | Description                                                                                                             |
| ----------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| Learning Tracks & Content Structure | Upstream   | Challenges are embedded within the track → module → lesson hierarchy and authored in Markdown.                          |
| In-Browser Code Editor              | Peer       | Code-based challenges (write-a-function, fill-in-the-blank) require the in-browser code editor for input and execution. |
| Freemium Access Model               | Peer       | Attempt limits (5 per 12 hrs for free tier) and premium unlimited access are enforced here.                             |
| Progress Tracking                   | Downstream | Challenge pass/fail results feed lesson/module completion status.                                                       |
| Gamification System                 | Downstream | Correct answers and challenge completions award points and may trigger badge milestones.                                |

---

## 7. Acceptance Criteria

| #     | Criterion                                                                                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-1  | Every module in every track contains at least one quiz or challenge.                                                                                    |
| AC-2  | A multiple-choice quiz shows the question, options, and allows the user to select and submit an answer.                                                 |
| AC-3  | A write-a-function challenge presents a prompt, allows the user to write code in the in-browser editor, and evaluates it against predefined test cases. |
| AC-4  | After submitting any challenge, the user sees immediate feedback (correct/incorrect) with an explanation.                                               |
| AC-5  | For code challenges, feedback includes per-test-case pass/fail results.                                                                                 |
| AC-6  | A free-tier user sees their remaining attempt count, and is blocked after 5 incorrect submissions with a clear cooldown message.                        |
| AC-7  | A premium user can submit unlimited incorrect answers without being blocked.                                                                            |
| AC-8  | Passing a challenge marks the associated lesson/module progress accordingly.                                                                            |
| AC-9  | A user can re-attempt a previously passed challenge without affecting their completion status.                                                          |
| AC-10 | A design challenge presents draggable cards on a canvas; the user can place and connect them, and receives feedback on node/connection correctness.     |
| AC-11 | A design challenge with multiple valid solutions accepts any of them as correct.                                                                        |
| AC-12 | A prompt-based challenge evaluates the user's response against a predefined Markdown rubric and reports which criteria were met.                        |
| AC-13 | A prompt-based challenge rejects responses that use incorrect naming conventions as defined in the rubric.                                              |

---

## 8. Constraints & Assumptions

- Challenge definitions are Markdown files with structured metadata; the specific metadata schema will be defined during implementation.
- System/software design challenges use a **card/node diagram builder** with graph-based evaluation; multiple correct solutions are supported.
- Prompt-based challenges are evaluated against **predefined Markdown rubric files**; the rubric specifies expected naming conventions, keywords, and structure.
- Code challenge execution relies on the In-Browser Code Editor feature.

---

## 9. Open Questions

| #   | Question                                                                                                    | Status                                                                                                     |
| --- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Q1  | How should system/software design prompts be evaluated — self-assessment, peer review, or automated rubric? | ✅ Resolved — Card/node diagram builder with graph-based evaluation; multiple correct solutions supported. |
