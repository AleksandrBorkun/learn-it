# Task 005: Backend — User Authentication & Profile API

**Feature:** User Authentication & Profile  
**Type:** Backend  
**Priority:** High — foundational; all personalized features depend on authenticated user  
**Estimated Complexity:** Medium  
**FRD Traceability:** AUTH-1 through AUTH-12

---

## Description

Implement the backend authentication flow using Google OAuth (Sign in with Google), including user account creation/retrieval, session management, profile endpoints, and authentication middleware. This is the gateway to all personalized features.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — provides the API framework, middleware pipeline, and error handling.
- **Task 003** (Database Schema) — provides the User entity model and repository.

---

## Technical Requirements

### Google OAuth Integration

- Implement the server-side Google OAuth flow (authorization code exchange or token verification).
- On successful authentication: create a new user record if first visit, or retrieve the existing user record if returning.
- Extract and store from the Google profile: display name, email address, avatar/profile picture URL, and Google ID.

### Session & Token Management

- Issue a session token (JWT or secure cookie) upon successful authentication.
- Implement token validation middleware that applies to all protected API routes.
- Define session expiration policy (configurable via environment variable) with appropriate refresh behavior.
- Implement session invalidation on logout.

### API Endpoints

- `POST /api/auth/google` — Accepts the Google OAuth credential, validates it, creates/retrieves the user, and returns a session token.
- `POST /api/auth/logout` — Invalidates the current session.
- `GET /api/auth/session` — Returns the current authenticated user's session info (or 401 if not authenticated).
- `GET /api/users/me` — Returns the authenticated user's profile (display name, email, avatar, tier, created at).
- `PATCH /api/users/me` — Updates the authenticated user's editable profile fields (display name only).

### Security

- Validate the Google ID token server-side (do not trust client-only validation).
- Ensure all user data endpoints require authentication.
- Implement GDPR-compliant data handling: ability to export and delete user data.
- Sanitize user inputs (display name).

### Error Handling

- Return clear error responses for: invalid Google token, expired session, unauthorized access, validation errors.

---

## Acceptance Criteria

| #    | Criterion                                                                                                                         |
| ---- | --------------------------------------------------------------------------------------------------------------------------------- |
| AC-1 | A valid Google OAuth credential results in a session token and user record creation (first visit) or retrieval (returning visit). |
| AC-2 | The authentication middleware correctly blocks unauthenticated requests to protected endpoints (401 response).                    |
| AC-3 | `GET /api/users/me` returns the correct user profile for the authenticated user.                                                  |
| AC-4 | `PATCH /api/users/me` updates the display name and persists the change.                                                           |
| AC-5 | `POST /api/auth/logout` invalidates the session; subsequent requests with that token return 401.                                  |
| AC-6 | Invalid or expired Google tokens return an appropriate error response.                                                            |
| AC-7 | Session expiration is enforced per the configured policy.                                                                         |

---

## Testing Requirements

- Unit tests for Google token validation logic (valid token, expired token, malformed token).
- Unit tests for user creation/retrieval logic (new user vs. returning user).
- Unit tests for session token generation and validation.
- Unit tests for profile update validation (valid display name, empty name, excessively long name).
- Integration tests for each API endpoint (happy path and error cases).
- Integration test for the full authentication flow: sign in → access protected resource → logout → access denied.
- Test coverage ≥ 85%.
