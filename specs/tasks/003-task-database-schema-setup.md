# Task 003: Database Schema & Data Model Setup

**Feature:** Scaffolding  
**Type:** Backend / Data  
**Priority:** Critical — must be completed before any feature that persists data  
**Estimated Complexity:** Medium-High

---

## Description

Design and implement the core database schema, ORM/data access layer, and migration strategy. This task defines the foundational data models for users, tracks, modules, lessons, progress, snippets, gamification, and certificates. All feature tasks that read/write data depend on this schema being in place.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — the data access layer integrates into the backend project.

---

## Technical Requirements

### Database Setup

- Select and configure a database suitable for Vercel deployment (e.g., PostgreSQL via a managed service like Neon, Supabase, or PlanetScale for MySQL).
- Set up an ORM or query builder for type-safe database access.
- Configure connection pooling appropriate for serverless environments.
- Implement a migration system for schema evolution.

### Core Entity Models

Define the following entities and their relationships (schema only — no business logic):

**User**
- ID (primary key), Google ID (unique), email, display name, avatar URL, tier (free/premium), created at, updated at.

**Track**
- ID, name, slug, description, estimated duration, difficulty range, sort order.

**Module**
- ID, track ID (FK), name, slug, description, difficulty level (beginner/intermediate/advanced), sort order.

**Lesson**
- ID, module ID (FK), title, slug, content reference (Markdown file path), difficulty level, sort order.

**Challenge**
- ID, lesson ID (FK, nullable), module ID (FK), type (multiple-choice, multiple-select, write-function, fill-blank, design, prompt), definition reference (Markdown file path), sort order.

**UserProgress**
- ID, user ID (FK), lesson ID (FK), completed (boolean), completed at (timestamp).

**UserAttempt**
- ID, user ID (FK), challenge ID (FK), submitted at, is correct (boolean), response data (JSON).

**CodeSnippet**
- ID, user ID (FK), title, code content, language, tags (array), source lesson ID (FK, nullable), created at, updated at.

**Badge**
- ID, name, description, icon reference, milestone type, milestone threshold.

**UserBadge**
- ID, user ID (FK), badge ID (FK), earned at.

**UserPoints**
- User ID (FK), total points, last activity date, current streak days.

**Certificate**
- ID, user ID (FK), track ID (FK), certificate UID (unique public identifier), issued at.

### Seed Data

- Create seed scripts for the four tracks (AI, Frontend, DevOps, Cloud Development/AWS) with placeholder module and lesson structures.
- Create seed data for badge definitions (milestone types and thresholds).
- Create seed data for point value configurations per activity type.

### Data Access Patterns

- Define repository interfaces for each entity (CRUD operations).
- Implement base repository with common query patterns (find by ID, find by user, paginated lists).
- Ensure all queries are parameterized to prevent SQL injection.

---

## Acceptance Criteria

| #    | Criterion                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| AC-1 | The database is provisioned and accessible from the backend API in both local development and deployed environments. |
| AC-2 | All entity tables are created via migrations and match the defined schema.                                   |
| AC-3 | Foreign key relationships and constraints are enforced at the database level.                                 |
| AC-4 | Seed data for tracks, modules, lessons, badges, and point configurations is loadable.                        |
| AC-5 | Repository interfaces for all entities are defined with standard CRUD operations.                            |
| AC-6 | Connection pooling is configured for serverless deployment.                                                   |
| AC-7 | Migrations can be run forward and rolled back without data corruption.                                        |

---

## Testing Requirements

- Unit tests for each repository interface (CRUD operations using a test database or in-memory alternative).
- Integration tests verifying foreign key constraints (e.g., deleting a user cascades properly).
- Migration tests (run up/down migrations, verify schema state).
- Seed data tests (verify seed scripts produce expected records).
- Test coverage ≥ 85% for all data access code.
