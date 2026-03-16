# Task 024: Frontend — Certificate Display & Social Sharing

**Feature:** Certificates & Social Sharing  
**Type:** Frontend  
**Priority:** Medium  
**Estimated Complexity:** Medium  
**FRD Traceability:** CERT-7 through CERT-13

---

## Description

Implement the frontend for displaying earned certificates on the profile/dashboard, downloading certificates as image/PDF, sharing certificates and badges to social media (LinkedIn, X/Twitter, Facebook), and the public certificate verification page. Also implement Open Graph and Twitter Card meta tags for rich social previews.

---

## Dependencies

- **Task 002** (Frontend Scaffolding) — provides app structure and routing.
- **Task 009** (Frontend Design System) — provides shared components.
- **Task 011** (Frontend Dashboard) — certificates are displayed on the dashboard.
- **Task 022** (Frontend Gamification) — badges have "Share" actions.
- **Task 023** (Backend Certificate Generation) — provides certificate data, download, and verification endpoints.

---

## Technical Requirements

### Certificate Display on Profile/Dashboard

- Display all earned certificates on the user's profile and dashboard.
- Each certificate listing shows: track name, date earned, and actions: "View," "Download," and "Share."
- Show a placeholder/motivational message for tracks that don't yet have a certificate ("Complete the AI track to earn your certificate!").

### Certificate Detail View

- Show the full certificate with its visual design (rendered image from the backend).
- Display metadata: track name, completion date, certificate ID.
- Provide "Download" buttons for image (PNG) and PDF formats.
- Provide "Share" buttons for LinkedIn, X/Twitter, and Facebook.

### Download Functionality

- "Download as Image" triggers a download of the certificate PNG/JPEG.
- "Download as PDF" triggers a download of the certificate PDF.
- Both should work on mobile (trigger the native download/share sheet).

### Social Sharing — Certificates

- Share to **LinkedIn**: use LinkedIn's share URL scheme with the certificate verification URL, a pre-populated congratulatory text, and certificate image.
- Share to **X/Twitter**: use Twitter's share URL scheme (intent/tweet) with the verification URL and a pre-populated message.
- Share to **Facebook**: use Facebook's share dialog with the verification URL.
- The shared link must resolve to the certificate verification page with rich previews.

### Social Sharing — Badges

- On the profile/gamification page, each earned badge has a "Share" button.
- Sharing a badge uses the same platforms and mechanism, with a congratulatory message and link back to LearnIt.

### Open Graph & Twitter Card Meta Tags

- The public certificate verification page must include Open Graph meta tags: `og:title`, `og:description`, `og:image` (certificate image), `og:url`.
- Include Twitter Card meta tags: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`.
- These tags must be rendered server-side so social media crawlers can parse them.

### Public Verification Page

- Create a public (no authentication required) verification page at a route like `/verify/:uid`.
- The page displays: certificate details (user name, track name, date, certificate ID) and a confirmation that it was issued by LearnIt.
- If the certificate UID is invalid, show a "Certificate not found" message.
- The page must be SEO-friendly with appropriate meta tags.

### Mobile Experience

- Certificate display, download, and share actions must be fully functional on mobile.
- Share buttons must trigger the mobile device's native share sheet where possible (`navigator.share` API with fallback).
- All UI elements meet the 44×44px touch target minimum.

---

## Acceptance Criteria

| #    | Criterion                                                                                                   |
| ---- | ----------------------------------------------------------------------------------------------------------- |
| AC-1 | All earned certificates are visible on the user's profile/dashboard with view, download, and share actions. |
| AC-2 | The certificate is downloadable as an image and as a PDF.                                                   |
| AC-3 | A user can share a certificate to LinkedIn and a rich preview (image, text, link) appears in the post.      |
| AC-4 | A user can share a certificate to X/Twitter and Facebook with appropriate rich previews.                    |
| AC-5 | A user can share a badge to LinkedIn, X/Twitter, and Facebook.                                              |
| AC-6 | The public verification page displays certificate details and confirms authenticity.                        |
| AC-7 | The verification page includes Open Graph and Twitter Card meta tags for rich social previews.              |
| AC-8 | An invalid certificate UID shows a "Certificate not found" message on the verification page.                |
| AC-9 | Certificate and share functionality works correctly on mobile.                                              |

---

## Testing Requirements

- Component tests for the certificate list on the profile/dashboard (displays earned certificates, actions).
- Component tests for the certificate detail view (image, metadata, download, share buttons).
- Unit tests for download functionality (triggers correct file download for image and PDF).
- Unit tests for social share URL construction (LinkedIn, X/Twitter, Facebook — correct URL parameters).
- Component tests for the public verification page (valid certificate, invalid UID).
- Unit tests for Open Graph and Twitter Card meta tag rendering.
- Component tests for badge share actions.
- Component tests at mobile viewport.
- Integration test: view certificate → download → share to LinkedIn → verify on public page.
- Test coverage ≥ 85%.
