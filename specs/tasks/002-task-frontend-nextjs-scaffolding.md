# Task 002: Frontend Next.js Project Scaffolding

**Feature:** Scaffolding  
**Type:** Frontend  
**Priority:** Critical — must be completed before any frontend feature work  
**Estimated Complexity:** Medium

---

## Description

Set up the frontend web application using Next.js with a mobile-first architecture. This task establishes the project structure, routing, component architecture, state management, theming/styling system, and API client integration that all feature UIs will build upon.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — the frontend API client must be configured to communicate with the backend.

---

## Technical Requirements

### Project Structure

- Initialize a Next.js application with the App Router.
- Define a folder structure separating: pages/routes, shared components, feature-specific components, hooks, utilities, services (API clients), and styles.
- Configure TypeScript with strict mode enabled.

### Routing & Layout

- Set up the application shell with a root layout including: header/navigation, main content area, and footer.
- Define route groups for public pages (landing, sign-in) and authenticated pages (dashboard, tracks, snippets, leaderboard, profile).
- Implement a route guard mechanism that redirects unauthenticated users to the sign-in page.

### Styling & Design System

- Configure a CSS/styling solution (CSS Modules, Tailwind CSS, or equivalent).
- Establish the mobile-first responsive design foundation with breakpoint definitions: mobile (< 768px), tablet (768px–1023px), desktop (≥ 1024px).
- Create base typography, color, and spacing design tokens.
- Implement a mobile-friendly navigation component (hamburger menu / bottom tab bar).

### State Management

- Set up client-side state management for global state (authentication, user profile, tier status).
- Configure server state management for API data fetching, caching, and invalidation.

### API Client

- Set up an API client service layer configured to communicate with the backend API.
- Include request/response interceptors for authentication token injection and error handling.
- Prepare for SDK client generation from the backend's OpenAPI specification.

### Developer Experience

- Configure linting (ESLint) and formatting (Prettier) for the frontend codebase.
- Set up a testing framework for unit and component tests.
- Set up a local development server with hot-reload.
- Create a `README.md` with setup and run instructions.

### Deployment

- Ensure the project is configured for Vercel deployment (Next.js is natively supported).
- Configure environment variable handling using `NEXT_PUBLIC_` prefix conventions for client-side variables.

---

## Acceptance Criteria

| #    | Criterion                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| AC-1 | The Next.js application builds and starts without errors.                                                    |
| AC-2 | The application shell renders with header, navigation, content area, and footer.                             |
| AC-3 | Routing is configured with public and authenticated route groups; unauthenticated users are redirected.      |
| AC-4 | The mobile-first responsive layout renders correctly at 320px, 768px, and 1024px+ viewports.                |
| AC-5 | Navigation adapts to mobile (hamburger/bottom tab) and desktop (sidebar/top nav) patterns.                   |
| AC-6 | The API client is configured and can make requests to the backend health endpoint.                            |
| AC-7 | State management is set up for authentication state and API data.                                            |
| AC-8 | Linting and formatting pass on all source files.                                                             |
| AC-9 | The project is deployable to Vercel with correct environment variable handling.                               |

---

## Testing Requirements

- Unit tests for the route guard mechanism (authenticated vs. unauthenticated behavior).
- Unit tests for the API client interceptors (token injection, error handling).
- Component tests for the application shell and navigation component at different viewport sizes.
- Test coverage ≥ 85% for all scaffolding code.
