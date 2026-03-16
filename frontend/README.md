# LearnIt — Frontend

Mobile-first Next.js application for the LearnIt software development learning platform.

## Tech Stack

| Layer          | Technology                                 |
| -------------- | ------------------------------------------ |
| Framework      | Next.js 16 (App Router)                    |
| Language       | TypeScript (strict mode)                   |
| Styling        | Tailwind CSS v4                            |
| State — client | React Context (auth, user profile, tier)   |
| State — server | TanStack React Query                       |
| API client     | Axios (with auth interceptors)             |
| Testing        | Jest + React Testing Library               |
| Linting        | ESLint (next/core-web-vitals + typescript) |
| Formatting     | Prettier                                   |

## Prerequisites

- **Node.js** ≥ 20 (v23 tested)
- **npm** ≥ 10

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server (hot-reload)
npm run dev

# Open http://localhost:3000
```

## Available Scripts

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot-reload |
| `npm run build`         | Production build                         |
| `npm run start`         | Start production server                  |
| `npm run lint`          | Run ESLint                               |
| `npm run lint:fix`      | Run ESLint with auto-fix                 |
| `npm run format`        | Format code with Prettier                |
| `npm run format:check`  | Check formatting                         |
| `npm run test`          | Run all tests                            |
| `npm run test:watch`    | Run tests in watch mode                  |
| `npm run test:coverage` | Run tests with coverage report           |
| `npm run typecheck`     | Run TypeScript type checking             |

## Project Structure

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # Public route group
│   │   │   ├── page.tsx              # Landing page (/)
│   │   │   └── sign-in/page.tsx      # Sign-in page
│   │   ├── (authenticated)/          # Auth-required route group
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── tracks/page.tsx
│   │   │   ├── snippets/page.tsx
│   │   │   ├── leaderboard/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── globals.css               # Design tokens + Tailwind
│   │   ├── layout.tsx                # Root layout
│   │   └── providers.tsx             # Client-side providers
│   ├── components/
│   │   └── layout/                   # App shell components
│   │       ├── Header.tsx            # Top nav bar
│   │       ├── Footer.tsx
│   │       ├── MobileNav.tsx         # Mobile slide-down menu
│   │       ├── BottomTabBar.tsx      # Bottom tab bar (mobile)
│   │       └── AppShell.tsx          # Layout wrapper
│   ├── config/
│   │   ├── env.ts                    # Environment variables
│   │   └── routes.ts                 # Route constants + helpers
│   ├── hooks/
│   │   ├── use-auth.tsx              # Auth context + provider
│   │   └── use-query-provider.tsx    # TanStack Query provider
│   ├── services/
│   │   └── api-client.ts            # Axios API client
│   ├── types/
│   │   └── index.ts                 # Shared TypeScript types
│   ├── proxy.ts                     # Route guard (Next.js proxy)
│   └── __tests__/                   # Test files (mirrors src/)
├── .env.example                     # Environment variable template
├── .env.local                       # Local env vars (gitignored)
├── jest.config.mjs                  # Jest configuration
├── jest.setup.ts                    # Jest setup (Testing Library)
├── eslint.config.mjs                # ESLint configuration
├── .prettierrc                      # Prettier configuration
└── tsconfig.json                    # TypeScript configuration
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

| Variable                       | Description              | Required |
| ------------------------------ | ------------------------ | -------- |
| `NEXT_PUBLIC_API_URL`          | Backend API base URL     | Yes      |
| `NEXT_PUBLIC_APP_NAME`         | Application display name | No       |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID   | For auth |
| `NEXT_PUBLIC_ENABLE_ADS`       | Enable Google Ads        | No       |

## Responsive Design

The application uses a mobile-first approach with three breakpoints:

| Breakpoint | Width      | Navigation                      |
| ---------- | ---------- | ------------------------------- |
| Mobile     | < 768px    | Hamburger menu + bottom tab bar |
| Tablet     | 768–1023px | Hamburger menu + bottom tab bar |
| Desktop    | ≥ 1024px   | Horizontal top nav bar          |

Touch targets are minimum 44×44px per WCAG / Apple HIG guidelines.

## Route Guard

The proxy (`src/proxy.ts`) intercepts requests and:

- Redirects unauthenticated users from protected routes to `/sign-in`
- Redirects authenticated users from `/sign-in` to `/dashboard`
- Passes through static assets and API routes

## Deployment

The project is configured for **Vercel** deployment:

```bash
# Build for production
npm run build

# All NEXT_PUBLIC_ env vars are embedded at build time
# Configure them in Vercel's Environment Variables dashboard
```
