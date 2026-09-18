# Nick Hobbs — Personal Portfolio Website

**Live site:** https://prettyrad-wav.github.io

## Description

A personal portfolio website for **Nick Hobbs**, an entry-level full-stack developer
transitioning into tech from a background as an HVAC technician. It was built as the
Module 16 capstone project of the full-stack, AI-native coding bootcamp at
[CodeBoxx Academy](https://academy.codeboxx.com/).

The site is written for hiring managers, recruiters and technical interviewers. It shows who
Nick is, what he can build, his education and work history, representative projects, and how to
reach him.

### Features

- **Home** — introduction with headshot, plus technical and soft skills cards.
- **Portfolio** — education, work experience, project cards with links to their GitHub repos,
  and a downloadable resume (PDF).
- **Links** — cards linking to GitHub, CodeBoxx Academy and The Odin Project.
- **Contact** — a validated form (name, email, message) that saves each submission to a
  Supabase database.
- **Back Office** (`/backoffice`) — a private, login-protected admin page to view and delete the
  messages sent through the Contact form.
- **Hidden Login** (`/login`) — not linked anywhere in the site. Reach it by typing `/login`
  in the address bar, entering the Konami code on desktop (↑ ↑ ↓ ↓ ← → ← →), or shaking a
  phone.
- **Light / dark mode** — follows the OS setting by default, with a manual toggle that is
  remembered between visits.
- **Four languages** — English, French, Spanish and German, with a language switcher that is
  remembered between visits.
- **Responsive design** — desktop header navigation above 768px, mobile bottom icon navigation
  at 768px and below.

The four public pages (Home, Portfolio, Links, Contact) are all rendered at the root URL `/`
and switch internally, so the address bar never changes as you navigate. Only `/login` and
`/backoffice` use real URL paths.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI library | [React 19](https://react.dev/) (functional components and hooks, JavaScript — not TypeScript) |
| Build tool | [Vite 8](https://vite.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Styling | [Bootstrap 5](https://getbootstrap.com/) + [React-Bootstrap](https://react-bootstrap.netlify.app/), plus plain CSS with custom properties |
| Backend / database / auth | [Supabase](https://supabase.com/) (PostgreSQL + Supabase Auth) via `@supabase/supabase-js` |
| Linting | ESLint 10 with the React Hooks and React Refresh plugins |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |
| Fonts | Google Fonts — Press Start 2P, Orbitron, Share Tech Mono |

The logo, technical skills, headshot, education, work experience, links and project imagery are AI-generated with ChatGPT.

## Project Structure

```
prettyrad-wav.github.io/
├── .github/workflows/deploy.yml   # Builds the app and deploys dist/ to GitHub Pages on push to main
├── ai/
│   ├── ai-spec.md                 # Global project spec: scope, architecture, conventions
│   └── features/                  # One spec per feature (home, portfolio, contact, login, ...)
├── docs/                          # Research notes, pitch scripts and pitch feedback
├── Leetcode-Challenges/           # Screenshots of solved LeetCode challenges
├── public/                        # Static files served as-is (favicon, icons)
├── src/
│   ├── main.jsx                   # App entry point
│   ├── App.jsx                    # Providers + route table (/, /login, /backoffice)
│   ├── index.css                  # Global styles and theme variables
│   ├── assets/                    # Images, logos, background video, resume PDF
│   ├── components/
│   │   ├── layout/                # Main layout, Navbar, Footer, background video, nav data
│   │   ├── home/                  # Intro and skills sections + skills data
│   │   ├── portfolio/             # Education, work, projects, resume button + their data
│   │   ├── links/                 # Link cards + links data
│   │   ├── contact/               # ContactForm (validation + Supabase insert)
│   │   ├── login/                 # LoginForm (Supabase Auth sign-in)
│   │   ├── backoffice/            # Messages table, message modal, logout button
│   │   ├── language/              # Language switcher
│   │   ├── theme/                 # Light/dark toggle
│   │   └── SecretAccess.jsx       # Konami-code / shake listener that opens /login
│   ├── context/ThemeContext.jsx   # Light/dark state
│   ├── i18n/                      # LanguageContext + en / fr / es / de translation files
│   ├── lib/supabaseClient.js      # The single shared Supabase client
│   └── pages/                     # Home, Portfolio, Links, Contact, Login, BackOffice
├── .env.example                   # Template for the required environment variables
├── CONCEPTS.md                    # Three challenging concepts learned in this project
├── eslint.config.js               # Lint rules
├── index.html                     # HTML shell loaded by Vite
├── package.json                   # Dependencies and npm scripts
└── vite.config.js                 # Vite config (base: '/')
```

Page content (bio, skills, education, work history, projects, links) is stored as plain data
files such as `skillsData.js`, `projectsData.js` and `linksData.js`, and the pages render it by
mapping over that data.

## Installation / Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) **20.19 or newer** (or 22.12+) — required by Vite 8. The
  GitHub Actions workflow builds with Node 20.
- npm (installed with Node.js)
- Git
- A free [Supabase](https://supabase.com/) project, if you want the Contact form and Back
  Office to work (see [API Documentation](#api-documentation) for the table they need). Without
  one the site still runs, and the Contact form shows a friendly failure message.

### Steps

1. **Clone the repository**

   ```bash
   git clone git@github.com:prettyrad-wav/prettyrad-wav.github.io.git
   cd prettyrad-wav.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create your environment file** (see [Environment Variables](#environment-variables))

   ```bash
   cp .env.example .env
   ```

   Then open `.env` and fill in your Supabase project URL and anon (public) key.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Vite prints a local address (usually http://localhost:5173). Open it in your browser.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally so you can check it |
| `npm run lint` | Runs ESLint over the project |

### Deployment

Deployment is automatic. Every push to `main` runs
[.github/workflows/deploy.yml](.github/workflows/deploy.yml), which installs dependencies,
builds the app, copies `dist/index.html` to `dist/404.html` (so that typing `/login` or
`/backoffice` directly still loads the app on GitHub Pages), and publishes `dist/` to GitHub
Pages. Only `main` is deployed.

To set this up on your own fork, enable **Settings → Pages → Source: GitHub Actions** and add
the two variables below as repository secrets under **Settings → Secrets and variables →
Actions**.

## Environment Variables

The app reads its Supabase connection details from environment variables. Vite only exposes
variables that start with `VITE_` to the browser.

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | For Contact form and Back Office | Your Supabase project URL, e.g. `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | For Contact form and Back Office | Your Supabase project's public **anon / publishable** key |

Both values are in the Supabase dashboard under **Project Settings → API**.

- **Locally:** put them in a `.env` file in the project root. Copy [.env.example](.env.example)
  to get started. `.env` is listed in `.gitignore` and must never be committed.
- **In CI:** they are stored as GitHub Actions repository secrets with the same names and passed
  to the build step in `deploy.yml`.
- **If they are missing:** the Supabase client is not created, the Contact form reports a
  failure instead of crashing, and `/backoffice` redirects to `/login`.

Do not use a Supabase `service_role` key here. Everything prefixed `VITE_` ends up in the
public JavaScript bundle.

The Back Office admin account is created by hand in the Supabase dashboard (there is no sign-up
flow), and its credentials are intentionally not stored in this repository. They are provided
separately with the course submission.

## API Documentation

**This project has no custom backend or REST API of its own.** It is a static, client-rendered
site, and [Supabase](https://supabase.com/) is the entire backend. The browser talks to
Supabase directly through the shared client in
[src/lib/supabaseClient.js](src/lib/supabaseClient.js) using `@supabase/supabase-js`. Under the
hood, Supabase exposes the database as a REST API (PostgREST) and authentication as a separate
Auth API, and those are what these calls reach.

### Database: `messages` table

Stores Contact form submissions. The columns the app relies on:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | unique identifier (primary key) | Generated by the database; used to delete a row |
| `name` | text | Sender name, required |
| `email` | text | Sender email, required |
| `message` | text | Message body, required |
| `created_at` | timestamp | Set by the database; used to sort newest first |

The table and its Row Level Security policies are created in the Supabase dashboard, not by
this repository. The app expects visitors (the `anon` role) to be able to **insert** rows, and
only the signed-in admin to **select** and **delete** them.

### Operations used by the app

| Purpose | Supabase client call | Used in | Who can call it |
| --- | --- | --- | --- |
| Submit a contact message | `supabase.from('messages').insert({ name, email, message })` | [ContactForm.jsx](src/components/contact/ContactForm.jsx) | Anyone |
| List all messages, newest first | `supabase.from('messages').select('*').order('created_at', { ascending: false })` | [BackOffice.jsx](src/pages/BackOffice.jsx) | Signed-in admin |
| Delete a message | `supabase.from('messages').delete().eq('id', id)` | [BackOffice.jsx](src/pages/BackOffice.jsx) | Signed-in admin |
| Sign in | `supabase.auth.signInWithPassword({ email, password })` | [LoginForm.jsx](src/components/login/LoginForm.jsx) | Anyone (needs valid credentials) |
| Check the current session | `supabase.auth.getSession()` | [BackOffice.jsx](src/pages/BackOffice.jsx) | Anyone |
| Sign out | `supabase.auth.signOut()` | [LogoutButton.jsx](src/components/backoffice/LogoutButton.jsx) | Signed-in admin |

Each call returns an object of the form `{ data, error }`. The app checks `error` and shows a
failure message when it is set.

**Example — the request body sent when the Contact form is submitted:**

```json
{
  "name": "Jane Recruiter",
  "email": "jane@example.com",
  "message": "Hi Nick, we'd love to chat about an opening."
}
```

**Client-side validation** runs before any request is sent: all three fields are required
(whitespace is trimmed) and the email must look like `something@domain.tld`. An invalid form
never reaches Supabase.

### App routes

| Path | Page | Access |
| --- | --- | --- |
| `/` | Home, Portfolio, Links and Contact (switched internally) | Public |
| `/login` | Admin login | Hidden — not linked from any navigation |
| `/backoffice` | Message inbox | Requires a session; otherwise redirects to `/login` |

## Author

**Nick Hobbs**

- GitHub: [github.com/prettyrad-wav](https://github.com/prettyrad-wav)
- LinkedIn: [Nick Hobbs on LinkedIn](https://www.linkedin.com/public-profile/settings/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact_info%3BHSJmorgBTvmpajyzeGV7ig%3D%3D)

### LinkedIn profile updates

As part of this project I refreshed my LinkedIn profile so it matches this portfolio:

- Added a new profile picture and a new banner image.
- Updated my email address.
- Updated my education.
- Added skills: React, React Native, Spring Boot and MySQL.
- Rewrote my About section.
