# Task 023: Backend — Certificate Generation & Verification

**Feature:** Certificates & Social Sharing  
**Type:** Backend  
**Priority:** Medium  
**Estimated Complexity:** Medium  
**FRD Traceability:** CERT-1 through CERT-6

---

## Description

Implement the backend service for generating certificates of completion when a user finishes an entire track. Each certificate has a unique public identifier, is downloadable as an image or PDF, and has a public verification URL.

---

## Dependencies

- **Task 001** (Backend API Scaffolding) — provides the API framework.
- **Task 003** (Database Schema) — provides the Certificate entity model.
- **Task 005** (Backend Auth) — certificates are tied to authenticated users.
- **Task 010** (Backend Progress Tracking) — track completion events trigger certificate generation.

---

## Technical Requirements

### Certificate Generation Trigger

- When a track is marked as complete (all modules and lessons finished, as determined by Task 010), automatically generate a certificate record.
- The certificate must be created without manual action from the user.
- If a certificate already exists for a user + track combination, do not create a duplicate.

### Certificate Data

- Each certificate stores: user ID, track ID, unique certificate UID (UUID or similar), issued at timestamp.
- The certificate content includes: user's display name, track name, completion date, and the unique certificate ID.

### Certificate Rendering

- Generate a visually designed certificate as an image (PNG/JPEG) and/or PDF.
- The certificate must include LearnIt branding, the user's display name, the track name, the completion date, and the certificate UID.
- The visual design parameters (template, fonts, colors) should be configurable/templated so design changes don't require code changes.

### Certificate Verification

- Each certificate has a unique, publicly accessible verification URL: `GET /api/certificates/verify/:uid`.
- The verification endpoint is **public** (no authentication required).
- It returns: certificate details (user display name, track name, date, certificate UID) and confirmation that the certificate was legitimately issued by LearnIt.
- If the UID does not match any certificate, return a 404 with a message indicating the certificate was not found.

### API Endpoints

- `GET /api/certificates` — Returns all certificates earned by the authenticated user.
- `GET /api/certificates/:id` — Returns a specific certificate's details for the authenticated user.
- `GET /api/certificates/:id/download` — Returns the certificate as a downloadable image or PDF (accepts format query parameter).
- `GET /api/certificates/verify/:uid` — Public endpoint to verify a certificate by its unique ID.

---

## Acceptance Criteria

| #    | Criterion                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| AC-1 | Upon completing all lessons in a track, a certificate is automatically generated for the user.                |
| AC-2 | The certificate includes: user's display name, track name, completion date, and unique certificate ID.       |
| AC-3 | The certificate is downloadable as an image or PDF.                                                           |
| AC-4 | The public verification URL confirms the certificate's authenticity and displays its details.                 |
| AC-5 | An invalid certificate UID returns a 404 response.                                                            |
| AC-6 | Duplicate certificates are not created for the same user + track combination.                                 |
| AC-7 | `GET /api/certificates` returns all certificates for the authenticated user.                                  |

---

## Testing Requirements

- Unit tests for certificate generation trigger (track completion → certificate created, no duplicate).
- Unit tests for certificate data composition (correct user name, track name, date, UID).
- Unit tests for certificate rendering (image generation, PDF generation, template application).
- Unit tests for the verification endpoint (valid UID returns details, invalid UID returns 404).
- Integration tests for each API endpoint.
- Integration test for the full flow: complete a track → certificate auto-generated → download → verify.
- Test coverage ≥ 85%.
