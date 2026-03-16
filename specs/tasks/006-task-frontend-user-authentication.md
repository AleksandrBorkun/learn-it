# Task 006: Frontend — User Authentication & Profile UI

**Feature:** User Authentication & Profile  
**Type:** Frontend  
**Priority:** High — foundational; all authenticated UI depends on this  
**Estimated Complexity:** Medium  
**FRD Traceability:** AUTH-1 through AUTH-12

---

## Description

Implement the frontend authentication experience: the "Sign in with Google" flow, session persistence, profile display and editing, logout, and the route protection that redirects unauthenticated users. This task also establishes the authentication state management used across the entire application.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides the Next.js app structure, routing, and state management.
- **Task 005** (Backend User Authentication) — provides the auth API endpoints.

---

## Technical Requirements

### Sign-In Page

- Create a landing/sign-in page with the "Sign in with Google" button.
- Integrate the Google Identity Services client library to initiate the OAuth flow.
- On successful authentication, send the Google credential to `POST /api/auth/google` and store the returned session token.
- Redirect to the dashboard on successful sign-in.
- Display a clear, actionable error message if authentication fails, with a retry option.

### Authentication State Management

- Maintain the authenticated user's state (session token, profile data) in client-side state management.
- Persist the session token securely (HTTP-only cookie preferred, or secure storage).
- On app load, check for an existing valid session (`GET /api/auth/session`) and restore the user state.
- Provide an authentication context/hook that any component can use to check authentication status and access user data.

### Route Protection

- Implement a route guard that intercepts navigation to authenticated pages.
- Redirect unauthenticated users to the sign-in page with a return-to URL parameter.
- After sign-in, redirect back to the originally requested page.

### Profile Page

- Create a profile page displaying: display name, email (read-only), avatar (read-only, from Google), current tier (Free/Premium), and account creation date.
- Allow editing the display name with inline validation and immediate save.
- Display earned badges, certificates, and leaderboard rank on the profile (placeholder sections — populated by Tasks 020, 022).

### Logout

- Provide a "Log out" action in the navigation/profile area.
- On logout, call `POST /api/auth/logout`, clear the client-side session state, and redirect to the landing page.
- Verify that refreshing the page after logout does not restore the session.

### Mobile Experience

- The sign-in page must be fully functional at 320px viewport width.
- The Google Sign-In button must have appropriate touch target size (≥ 44×44px).
- The profile page must follow the mobile-first layout established in Task 002.

---

## Acceptance Criteria

| #    | Criterion                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | A new user can click "Sign in with Google," authenticate, and land on the dashboard with their name and avatar displayed. |
| AC-2 | A returning user can sign in and see their previous state (progress, snippets, badges) intact.                            |
| AC-3 | Navigating to an authenticated page while unauthenticated redirects to sign-in, then back after login.                    |
| AC-4 | A user can edit their display name on the profile page and see it reflected across the app immediately.                   |
| AC-5 | A user can log out and is redirected to the landing page; page refresh does not restore the session.                      |
| AC-6 | If Google sign-in fails, a clear error message is displayed with a retry option.                                          |
| AC-7 | The sign-in and profile pages are fully usable at 320px viewport width.                                                   |

---

## Testing Requirements

- Unit tests for the authentication context/hook (authenticated state, unauthenticated state, loading state).
- Unit tests for the route guard (redirect behavior for authenticated and unauthenticated users).
- Component tests for the sign-in page (button renders, error state renders).
- Component tests for the profile page (displays user data, edit flow, mobile layout).
- Integration test for the full sign-in → dashboard → logout flow.
- Test coverage ≥ 85%.
