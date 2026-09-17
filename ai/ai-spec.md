# AI Specification — Personal Portfolio Website

> **Read this document first**, before implementing any feature or feature spec in
> `./ai/features/*.feature.md`. This is the global source of truth for project identity,
> scope, architecture, tech constraints, and conventions. Where a feature spec is silent,
> this document's rules apply. Where the **Requirement Checklist** (`m16-resources/grading-sheet.md`)
> conflicts with anything here, the checklist wins.

## 1. Project Identity

- **What this is:** The Module 16 capstone of a full-stack, AI-native coding bootcamp
  (CodeBoxx Academy). It is a real, public-facing **personal portfolio website** for
  Nick Hobbs (GitHub: `prettyrad-wav`), an entry-level full-stack developer transitioning
  from a background as an HVAC technician.
- **Who it's for:** Hiring managers, recruiters, and technical interviewers evaluating
  Nick as a candidate. There is no fictional client — Nick is the client, the developer,
  and the product owner.
- **What it must communicate:** Who Nick is, what he can build, his education/work
  history, representative projects, and a way to get in touch.
- **Live URL:** `https://prettyrad-wav.github.io`

## 2. Scope

### In scope
- A statically-built React + Vite single-page app with five public pages (Home,
  Portfolio, Links, Contact, and a header/footer shared layout) plus a hidden Login page
  and an authenticated Back Office page.
- Supabase as the only backend: Postgres `messages` table (contact form) + Supabase Auth
  (single pre-created admin account) for the Back Office.
- GitHub Actions CI/CD that builds and deploys `dist/` to GitHub Pages on every push to
  `main`.
- AI-generated visual assets (logo, page imagery) with the tool used documented.
- Per-feature AI specs under `./ai/features/*.feature.md` written before that feature is
  implemented.
- Extra miles (optional, only after all main requirements pass review): light/dark mode,
  i18n (English + French).

### Out of scope / explicitly not built
- No custom backend server or API of any kind — Supabase is the entire backend.
- No server-side rendering, no Next.js-style routing — this is a static, client-rendered
  SPA deployed as flat files.
- No multi-admin / role system, no user sign-up flow — exactly one hard-coded admin
  account, created directly in the Supabase dashboard, never through the app.
- No CMS — page content (bio, skills, education, work history, projects, links) is
  authored as data in the codebase, not fetched from an external content source.
- No client-side router paths beyond the root — see routing rule below.
- No fictional company/client framing anywhere in copy or design.

## 3. Architecture & Repository Structure

The Vite app lives directly at the repository root — there is no nested app folder. (An
earlier `npm create vite@latest prettyrad-wav.github.io` run inside the already-cloned
repo briefly created a redundant nested `prettyrad-wav.github.io/` subfolder; its contents
were flattened up into the repo root before any commit, so no history or tooling ever
depended on that nesting.)

```
prettyrad-wav.github.io/                     ← repo root = the Vite app
├── .github/workflows/deploy.yml             ← build + deploy to GitHub Pages
├── ai/
│   ├── ai-spec.md                           ← this file
│   └── features/
│       ├── setup-deploy.feature.md
│       ├── header-footer.feature.md
│       ├── home-page.feature.md
│       ├── portfolio-page.feature.md
│       ├── link-page.feature.md
│       ├── contact-page.feature.md
│       ├── login-page.feature.md
│       ├── back-office.feature.md
│       ├── light-dark-mode.feature.md       ← extra mile
│       └── languages.feature.md             ← extra mile
├── m16-resources/                            ← bootcamp reference docs (gitignored, not shipped)
├── CONCEPTS.md                                ← 3 challenging concepts + video link
├── LeetCode-Challenges/                       ← solution screenshots
├── README.md                                  ← project overview for a newcomer
├── submission-summary.md                      ← NEVER committed; submitted via platform only
├── public/
├── src/
│   ├── main.jsx
│   ├── App.jsx                                ← router + Main layout mount
│   ├── App.css / index.css
│   ├── assets/                                ← AI-generated images, logo, resume PDF
│   ├── lib/
│   │   └── supabaseClient.js                  ← single Supabase client instance
│   ├── components/
│   │   ├── layout/ (Main, Navbar/Header, Footer)
│   │   └── ...shared UI components
│   └── pages/
│       ├── Home.jsx
│       ├── Portfolio.jsx
│       ├── Links.jsx
│       ├── Contact.jsx
│       ├── Login.jsx                          ← not in nav
│       └── BackOffice.jsx                     ← not in nav, auth-gated
├── vite.config.js                             ← base: '/'
├── package.json
└── .env                                       ← local only, gitignored, never committed
```

**Rule for AI tools:** every path in a feature spec (`src/...`, `vite.config.js`,
`package.json`, `.github/...`, etc.) resolves relative to the repo root — there is no
separate app subdirectory to account for.

## 4. Allowed Tech & Constraints

**Stack (fixed — do not introduce alternatives):**
- React 19 + Vite (JavaScript variant, as scaffolded — not TypeScript)
- React-Bootstrap + Bootstrap CSS for layout/UI components (`Container`, `Nav`, `Navbar`,
  `Stack`, etc.), plus plain CSS with custom properties for anything Bootstrap doesn't cover
  (the mobile bottom icon nav's exact 768px show/hide behavior, brand colors, spacing tokens)
- Supabase JS client (`@supabase/supabase-js`) for Postgres access and Auth
- React Router (client-side routing) for page navigation
- GitHub Actions for CI/CD, GitHub Pages for hosting

**Hard constraints:**
- **Static, client-only site.** No custom backend server. Supabase is the only backend
  infrastructure allowed.
- **Environment variables** must be prefixed `VITE_` to be exposed to client code, must
  live in a local `.env` that is listed in `.gitignore` and **never committed**, and in CI
  must be injected via GitHub Actions repository secrets (`Settings → Secrets and
  variables → Actions`) passed to the build step under `env:` in `deploy.yml`.
- **Admin credentials are fixed** and pre-created directly in the Supabase dashboard
  (never via app sign-up): `admin@codeboxx.com` / `C0deB0xx4dm!n`.
- **Routing must not change the URL path.** `vite.config.js` sets `base: '/'`. Navigating
  between pages (Home, Portfolio, Links, Contact) keeps the URL at
  `https://prettyrad-wav.github.io` — no `/home`, `/portfolio`, etc. paths are used for
  public nav. (The Login (`/login`, or a keyboard shortcut) and Back Office (`/backoffice`)
  routes are the only ones reached by a real path change, and they are intentionally
  hidden from navigation.)
- **Login page is never linked** from header, footer, or mobile nav. It's reachable only
  by typing the URL directly (or an optional secret key combo) — never surfaced as a
  clickable link anywhere.
- **`m16-resources/`** is bootcamp reference material only — already gitignored, must stay
  out of the shipped app.

**Branching model:**
- Feature branches `feature/*` are created from `dev`.
- Feature branches merge back into `dev`.
- `dev` merges into `main` when ready to ship.
- A push to `main` triggers the deploy workflow. **Only `main` is graded.**

## 5. Coding Standards & Conventions

- **Components:** functional components + hooks only. One component per file, filename
  matches the component name (`Navbar.jsx`, not `navbar.jsx`).
- **Pages vs. components:** route-level views live in `src/pages/`; reusable/shared UI
  lives in `src/components/`. Layout primitives (`Main`, `Navbar`/`Header`, `Footer`) live
  in `src/components/layout/`.
- **Supabase access** goes through the single shared client at
  `src/lib/supabaseClient.js` — no ad-hoc `createClient()` calls elsewhere.
- **Styling:** React-Bootstrap components first; drop to plain CSS (custom properties for
  shared values like colors/spacing) only where Bootstrap has no equivalent or its default
  breakpoints don't match ours. Mobile breakpoint is `768px` (`>768px` = desktop nav layout,
  `≤768px` = mobile/icon nav) per the responsive requirement — note this is the opposite edge
  from Bootstrap's own `md` breakpoint (`min-width: 768px`), so nav show/hide uses a custom
  `max-width: 768px` media query rather than Bootstrap's `d-md-*` utilities. Keep the 768px
  cutoff consistent across all components either way.
- **Static content as data:** bio text, skills, education, work history, project entries,
  and links are defined as plain JS data structures (arrays/objects) co-located with or
  imported by the page that renders them — not hardcoded inline JSX repeated per entry.
  Rendering is done by mapping over the data so adding an entry doesn't require touching
  markup.
- **Accessibility:** every `<img>` has meaningful `alt` text; interactive elements are
  real buttons/links (not `<div onClick>`); modals (Back Office "view message") trap
  focus reasonably and close on `Escape` or outside click.
- **AI-generated assets:** for every AI-generated image and the logo, note the tool used
  (comment near the import, or a short note in the relevant feature spec / `CONCEPTS.md`).
- **Commits:** small, scoped commits with descriptive messages; work happens on
  `feature/*` branches per the branching model above, not directly on `main`.
- **No dead scaffolding:** remove the default Vite template boilerplate (counter demo,
  placeholder logos/copy in `App.jsx`/`App.css`) before building real pages on top of it.
- **Comments:** as each feature is implemented, add comments throughout its code
  explaining what each section does — component responsibilities, non-trivial logic
  blocks, data structures, and config files (`vite.config.js`, `deploy.yml`, etc.) should
  all carry brief explanatory comments so the codebase reads clearly on its own.

## 6. Global Definition of Done

A feature (or the project as a whole) is "done" when:

1. It satisfies every line item for that feature in `m16-resources/grading-sheet.md`
   (the Requirement Checklist is the authoritative source if this spec and the checklist
   ever disagree).
2. It matches its own feature spec in `./ai/features/`, which itself does not contradict
   this global spec.
3. It works correctly at both desktop (>768px) and mobile (≤768px) widths, with no
   horizontal overflow and no unreadable text.
4. It builds cleanly (`npm run build`) with no console errors, and works identically when
   served from the built `dist/` output (not just `npm run dev`).
5. No secrets, `.env` values, or admin credentials appear in committed source — verified
   by checking `.gitignore` and the diff before commit.
6. The GitHub Actions workflow deploys the change to `https://prettyrad-wav.github.io`
   without manual steps, and the live site reflects it after a push to `main`.
7. Any Supabase-backed behavior degrades gracefully (clear error/empty states) if
   Supabase is unreachable or unconfigured, rather than crashing the page.

## 7. Cross-Feature Rules

- **Layout consistency:** every public page is wrapped by the same `Main` layout, which
  renders `Navbar`/`Header` above and `Footer` below the page content. Login and Back
  Office may reuse or deliberately omit this wrapper (Back Office should still be usable
  and consistent in styling; Login is a minimal standalone page) — see
  `login-page.feature.md` and `back-office.feature.md`.
- **Navigation membership:** the header nav (desktop, horizontal) and mobile bottom icon
  nav must list exactly Home, Portfolio, Links, Contact — never Login or Back Office.
- **Single Supabase client, single `messages` schema:** the Contact page (insert) and
  Back Office (select/delete) both operate on the same `messages` table via the same
  client module — no divergent schemas or duplicate client instances.
- **Auth guarding:** any route requiring a session (`/backoffice`) checks auth state
  before rendering protected content and redirects unauthenticated visitors to Login;
  Login redirects an already-authenticated visitor straight to Back Office.
- **Extra miles are additive, not disruptive:** if light/dark mode or i18n are
  implemented, they must not break any main-requirement behavior (nav structure, hidden
  routes, form validation, etc.) on any existing page.
- **Feature specs are additive to this document, not a replacement for it.** If a
  feature spec is missing a rule that this document already states (env vars, routing,
  styling breakpoint, etc.), the feature spec inherits the rule from here rather than
  restating it.
