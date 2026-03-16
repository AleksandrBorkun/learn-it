---
agent: deploy
---

# Dev team flow steps

Analyze the codebase and deploy it to Vercel (hosting) and Firebase (auth & storage) with best practices and CI/CD pipelines.

## Your Responsibilities

### Pre-Deployment Analysis

1. Read `specs\prd.md` and FRDs to understand requirements
2. Review `AGENTS.md` for technology stack decisions
3. Consult `specs\adr\*.md` for architectural decisions
4. Analyze codebase structure (`src/backend`, `src/frontend`, etc.)
5. Identify Vercel project configuration and Firebase services needed

### Deployment Workflow

**Step 1: Vercel Project Setup**

- Link project with `vercel link`
- Configure `vercel.json` for rewrites, headers, and build settings
- Define environments (preview, production)
- Configure environment variables with `vercel env add`
- Use `NEXT_PUBLIC_` prefix for client-side environment variables

**Step 2: Firebase Configuration**

- Initialize Firebase project with `firebase init`
- Configure **Firebase Authentication** providers (email/password, OAuth, etc.)
- Set up **Cloud Firestore** database and security rules (`firestore.rules`)
- Configure **Firebase Storage** rules (`storage.rules`)
- Create `firebase.json` with project configuration
- Set up Firebase Admin SDK for server-side operations

**Step 3: GitHub Actions CI/CD**

- Create `.github/workflows/deploy.yml`
- Configure build, test, and deployment steps
- Use `vercel deploy --prod` for production deployments
- Use `firebase deploy` for Firestore rules, Storage rules, and Auth config
- Set up Vercel GitHub Integration for automatic preview deployments on PRs
- Configure secrets in GitHub (never in code)

**Step 4: Security & Monitoring**

- Configure **Firebase Security Rules** for Firestore and Storage
- Enable **Firebase App Check** for production
- Store sensitive config in **Vercel environment variables** (encrypted)
- Configure **Vercel Analytics** and **Vercel Logs** for monitoring
- Set up **Firebase Performance Monitoring** if needed
- Follow principle of least privilege in all security rules

**Step 5: Deploy & Verify**

- Run `vercel deploy --prod` to deploy the application
- Run `firebase deploy` to push rules and configuration
- Verify deployment health and endpoints
- Configure custom domains in Vercel dashboard
- SSL is automatic with Vercel
- Set up monitoring alerts

**Step 6: Documentation**

- Create `docs/deployment.md` with deployment instructions
- Document Vercel project settings and Firebase project config
- Document all environment variables needed
- Add runbook for common operations (rollbacks, rule updates, etc.)

## Tools to Use

Priority order:

1. **Vercel CLI / Vercel MCP** - Primary hosting and deployment tool
2. **Firebase CLI** - For auth, Firestore, and storage configuration
3. **GitHub MCP** - For creating workflows and managing secrets
4. **Context7 MCP** - For Vercel and Firebase documentation and patterns

## Important Notes

- **Use `NEXT_PUBLIC_` prefix** for any environment variable exposed to the browser
- **Configure Firebase Security Rules** before going live — never leave default open rules in production
- **Use Vercel preview deployments** for PR-based review workflows
- **Enable Firebase App Check** to protect backend resources from abuse
- **Serverless function limits** — Vercel has a 10s default timeout (50s on Pro) and 250MB bundle size limit
- **No persistent file system on Vercel** — use Firebase Storage or other external storage for file uploads
- **Plan for scalability** even if starting small
