# Feature Specification — Setup & Deploy

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Setup & Deploy
- **Related Area:** Front-end tooling & CI/CD infrastructure

---

## 1. Feature Goal

Stand up the project as a working, publicly deployable Vite + React application: scaffolded
correctly, configured to run at the root of a `username.github.io` domain, and wired to an
automated CI/CD pipeline so that every push to `main` builds and publishes the site to GitHub
Pages without any manual step. This feature is the foundation every other feature is built and
shipped on top of — it produces no user-facing page of its own.

---

## 2. Feature Scope

### In Scope

- Scaffolding the React application using Vite (JavaScript variant).
- Configuring `vite.config.js` with the correct `base` path for a root-level GitHub Pages site.
- A GitHub Actions workflow that builds the app and deploys the `dist/` output to GitHub Pages
  on every push to `main`.
- Configuring the GitHub repository's Pages settings to serve from the Actions deployment.
- The mechanism for passing `VITE_*` environment variables from GitHub Actions secrets into the
  build step (the passthrough itself — not deciding which variables exist or what they're for).

### Out of Scope

- Creating or configuring the Supabase project, `messages` table, RLS policies, Auth, or the
  admin user. That provisioning work is a one-time infra step (see `ai-spec.md` §4) whose
  actual *behavior* is specified by `contact-page.feature.md` (data writes) and
  `login-page.feature.md` / `back-office.feature.md` (auth).
- Any page content, routing between pages, header/footer, or layout — `header-footer.feature.md`
  and the individual page feature specs.
- Local development ergonomics beyond `npm run dev` / `npm run build` working correctly.

### Feature-Specific Constraints

- The repository is a root `username.github.io` repo, not a project repo — `base` must be `'/'`,
  never a subpath (e.g. `/repo-name/`).
- Only the `main` branch triggers a deployment; per the branching model in `ai-spec.md`, work
  happens on `feature/*` → `dev` → `main`, and only `main` is ever graded or deployed.

---

## 3. Requirements

### FR-01 — React App Scaffold

**Requirement:**
The project is initialized as a React application using Vite's JavaScript template, created via
`npm create vite@latest`.

**Expected Result:**
`npm run dev` starts a working local dev server serving the React app; `npm run build` produces a
`dist/` folder with no errors.

### FR-02 — Vite Base Path Configuration

**Requirement:**
`vite.config.js` sets `base: '/'`.

**Expected Result:**
The built app's asset references resolve correctly when served from the domain root
(`https://prettyrad-wav.github.io`), and navigating between pages in the app never changes the
browser's URL path away from that root (no `/home`, `/portfolio`, etc.).

### FR-03 — GitHub Actions Build & Deploy Workflow

**Requirement:**
A workflow file at `.github/workflows/deploy.yml` triggers on push to `main`, runs `npm ci`, then
`npm run build`, then deploys the resulting `dist/` folder to GitHub Pages.

**Expected Result:**
Every push to `main` results in an automatic, unattended deployment of the latest build — no
manual build or upload step is ever required.

### FR-04 — GitHub Pages Source Configuration

**Requirement:**
The repository's Pages settings (Settings → Pages) are set to serve from "GitHub Actions" as the
deployment source.

**Expected Result:**
After a successful workflow run, the site is reachable at `https://prettyrad-wav.github.io`.

### FR-05 — Environment Variable Passthrough

**Requirement:**
Where the build depends on `VITE_*` environment variables, the workflow reads their values from
GitHub Actions repository secrets and exposes them to the build step via `env:`.

**Expected Result:**
A build that depends on `VITE_*` values succeeds in CI the same way it does locally, and none of
those values ever appear in committed source or workflow YAML in plain text.

---

## 4. User Flow

**Main flow**

1. A developer commits work and merges it up through `feature/*` → `dev` → `main`.
2. The push to `main` triggers the GitHub Actions workflow.
3. The workflow checks out the repository, runs `npm ci`, then `npm run build`.
4. The workflow deploys the resulting `dist/` folder to GitHub Pages via the Actions deployment.
5. A visitor navigates to `https://prettyrad-wav.github.io` and the built React app loads at that
   root URL.

**Alternate / failure flow**

1. `npm run build` fails (e.g. a syntax or compile error) → the Actions run is marked failed, the
   deploy step never runs, and the previously published version of the site keeps serving
   unchanged.

---

## 5. Interfaces Involved

### Pages

- `/` (root) — the single URL every page in the app is served under; the base path
  configuration is what keeps every route resolving here instead of a sub-path.

### Components

- N/A — this feature introduces no UI components.

### Endpoints

- N/A — no application/API endpoints are introduced. The only interface this feature adds is the
  CI/CD pipeline itself (`.github/workflows/deploy.yml`), which is infrastructure rather than an
  application endpoint.

---

## 6. Data

### Inputs

- `VITE_*` environment variables (text) — read from GitHub Actions repository secrets at build
  time. This feature only implements the passthrough mechanism; which variables exist and what
  they're for is defined by the features that consume them (e.g. Supabase config).

### Outputs / Returned Data

- Built static assets (`dist/index.html`, JS, CSS, images) — produced by `npm run build` and
  deployed to GitHub Pages.

### Stored / Modified Data

- N/A — this feature stores no application data. The GitHub Pages deployment target is
  infrastructure, not application state.

---

## 7. Validation

- **Build success:** `npm run build` must exit with status 0 — checked in CI (the workflow run)
  — on failure: the Actions run fails, the deploy step is skipped, and the live site is left
  unchanged.
- **Base path correctness:** `vite.config.js` must set `base: '/'` — checked by manual review /
  by verifying the deployed site — on failure: asset paths resolve incorrectly in production even
  though `npm run dev` looks fine locally.
- **Secret exposure:** no `VITE_*` value is ever hardcoded in a committed file or in
  `deploy.yml` itself — checked by manual review of the diff before commit — on failure: rotate
  the exposed credential and remove it from history.

---

## 8. Expected Behavior

### Success Behavior

- A push to `main` produces a green Actions run and the live site at
  `https://prettyrad-wav.github.io` reflects the latest committed code once the run completes.
- Navigating within the app never changes the browser's path away from the root.

### Error / Invalid Behavior

- If `npm run build` fails, the Actions run is marked failed, no deployment occurs, and the
  previously live version of the site continues to be served unchanged.
- If GitHub Pages is not configured to serve from "GitHub Actions", a successful workflow run may
  still leave the public site stale or returning a 404.

### Empty / Edge Cases

- First-ever deployment: no prior Pages deployment exists; the first successful workflow run
  publishes the initial version of the site.

---

## 9. Acceptance Criteria

- [ ] The app was scaffolded with `npm create vite@latest` using the React + JavaScript template,
      and `npm run dev` and `npm run build` both succeed locally (FR-01)
- [ ] `vite.config.js` contains `base: '/'` (FR-02)
- [ ] Navigating between all public pages keeps the browser URL at
      `https://prettyrad-wav.github.io` with no additional path segments (FR-02)
- [ ] `.github/workflows/deploy.yml` exists, triggers on push to `main`, and runs `npm ci`,
      `npm run build`, then deploys `dist/` (FR-03)
- [ ] A push to `main` results in a new, automatically deployed version of the site at
      `https://prettyrad-wav.github.io` with no manual steps taken (FR-03, FR-04)
- [ ] Repository Settings → Pages shows the source set to "GitHub Actions" (FR-04)
- [ ] Any `VITE_*` variable required at build time is defined as a GitHub Actions repository
      secret and passed to the build step via `env:` in `deploy.yml`, and does not appear
      anywhere in committed source (FR-05)
- [ ] A deliberately broken build pushed to `main` fails the Actions run and does not update the
      live site (FR-03)
