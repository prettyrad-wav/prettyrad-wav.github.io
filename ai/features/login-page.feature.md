# Feature Specification — Login Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Login Page
- **Related Area:** Full-stack (hidden front-end route + Supabase Auth)

---

## 1. Feature Goal

Give the site's single admin (Nick) a way to authenticate and reach the Back Office, without
exposing any login link to ordinary visitors. The page accepts an email and password, verifies
them against Supabase Auth, and on success starts a session that carries the admin into the Back
Office and survives a page refresh. The page itself is deliberately undiscoverable — reachable
only by typing its URL directly, or by a secret trigger gesture (a keyboard combo on desktop, a
phone shake on mobile) performed from anywhere on the public site.

---

## 2. Feature Scope

### In Scope

- A `/login` route rendering an email + password form, not linked from the header, footer, or
  mobile bottom nav.
- A global secret-trigger listener, active on every public page, that navigates to `/login` when
  triggered:
  - **Desktop:** the Konami code restricted to arrow keys —
    `↑ ↑ ↓ ↓ ← → ← →` (`ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft,
    ArrowRight`).
  - **Mobile:** shaking the device, as an alternative trigger for touchscreens that have no arrow
    keys.
- Authenticating the submitted email/password against Supabase Auth via
  `supabase.auth.signInWithPassword()`, using the shared client at `src/lib/supabaseClient.js`.
- On successful authentication: establishing a session that persists across a page refresh, and
  navigating to the Back Office route (`/backoffice`).
- Redirecting a visitor who already holds a valid session straight to `/backoffice` if they land on
  `/login` (by URL or secret trigger) while already logged in.
- Displaying a visually distinct error message on failed login attempts (wrong email/password).

### Out of Scope

- Anything rendered inside the Back Office once the admin is there — `back-office.feature.md`.
- Creating the admin account, resetting its password, or any sign-up flow — the admin account is
  pre-created directly in the Supabase dashboard per `ai-spec.md` §2/§4, never through the app.
- Logging out — that action, and where its control lives, belongs to `back-office.feature.md`.
- Any account-recovery flow ("forgot password", magic links, OAuth) — only email/password via
  `signInWithPassword` is used.
- Rate-limiting or lockout after repeated failed attempts — not required by the grading sheet.

### Feature-Specific Constraints

- **Konami code, arrow keys only:** the desktop secret sequence is exactly `ArrowUp, ArrowUp,
  ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight`. The listener tracks
  progress through the sequence; any key press that doesn't match the next expected key resets
  progress to the start (it does not have to be one of the four arrow keys to cause a reset).
  Completing the full sequence navigates to `/login`. The listener must not block or interfere
  with normal keyboard use elsewhere on the site (form inputs, browser shortcuts, etc.).
- **Shake-to-access on mobile:** because mobile keyboards have no arrow keys, a device-shake
  gesture is an additional, independent trigger to reach `/login` on touch devices, using the
  device's motion sensor (`devicemotion`) to detect acceleration above a threshold occurring a
  few times in quick succession (to avoid triggering on normal handling/walking).
- **iOS motion-permission limitation:** iOS Safari requires an explicit user gesture (e.g. a tap)
  before `DeviceMotionEvent.requestPermission()` can be granted — a page cannot silently listen
  for motion on load. This feature accepts that shake-to-access may be unavailable on iOS unless
  that permission has already been granted in the current session; the URL-typing and (where a
  physical keyboard is attached) Konami-code paths remain the guaranteed fallback on every
  platform. Android does not require this permission step.
- **Global listener, not page-local:** both trigger mechanisms must be active across the public
  site (Home, Portfolio, Links, Contact) — not only once the visitor is already on `/login` —
  since the entire point is reaching `/login` from anywhere without a visible link.
- **Session persistence relies on Supabase Auth's own client-side storage:** no custom session
  table or token handling is built by this feature; the shared Supabase client's default session
  persistence is what survives a refresh.

---

## 3. Requirements

### FR-01 — Hidden Route, No Nav Entry

**Requirement:**
The `/login` route exists but is never rendered as a link in the header nav, footer, or mobile
bottom nav.

**Expected Result:**
No clickable element anywhere in the site's navigation leads to `/login`; the route is only
reachable by typing the URL directly or via a secret trigger (FR-02, FR-03).

### FR-02 — Secret Keyboard Access (Konami Code)

**Requirement:**
From any public page, pressing the arrow-key sequence `↑ ↑ ↓ ↓ ← → ← →` in order navigates the
visitor to `/login`. Any incorrect key at any point resets the tracked progress.

**Expected Result:**
Entering the full correct sequence while on Home, Portfolio, Links, or Contact navigates to
`/login`. An incomplete or incorrect sequence leaves the visitor on their current page.

### FR-03 — Secret Shake Access (Mobile)

**Requirement:**
From any public page on a mobile device, shaking the device with enough acceleration, repeated
a few times in quick succession, navigates the visitor to `/login`.

**Expected Result:**
Shaking a mobile device while on Home, Portfolio, Links, or Contact navigates to `/login`.
Normal handling or incidental movement of the device does not trigger navigation.

### FR-04 — Login Form Fields

**Requirement:**
The `/login` page displays an email input (`type="email"`), a password input
(`type="password"`), and a submit/login button.

**Expected Result:**
A visitor on `/login` sees exactly these three controls and can type an email, type a password,
and activate the submit button.

### FR-05 — Supabase Authentication on Submit

**Requirement:**
Submitting the form calls `supabase.auth.signInWithPassword()` with the entered email and
password, using the shared Supabase client at `src/lib/supabaseClient.js`.

**Expected Result:**
A form submission results in exactly one `signInWithPassword` call carrying the values currently
in the email and password fields.

### FR-06 — Successful Login: Redirect and Persistent Session

**Requirement:**
When `signInWithPassword` succeeds, the visitor is navigated to `/backoffice`, and the resulting
session persists across a page refresh (the visitor is not logged out by reloading).

**Expected Result:**
A successful login lands the admin on `/backoffice`; refreshing the browser afterward keeps them
on/authenticated for `/backoffice` rather than bouncing them back to `/login`.

### FR-07 — Already-Authenticated Redirect

**Requirement:**
If a visitor with a valid, existing session reaches `/login` (by URL or secret trigger), they are
redirected straight to `/backoffice` instead of seeing the login form.

**Expected Result:**
An already-logged-in admin who navigates to `/login` never sees the email/password form — they
land on `/backoffice` immediately.

### FR-08 — Failed Login Shows a Visible Error

**Requirement:**
When `signInWithPassword` fails (wrong email/password), a visually distinct error message
(e.g. red text) is shown to the visitor, and they remain on `/login`.

**Expected Result:**
Submitting incorrect credentials keeps the visitor on `/login`, shows an error message such as
"Invalid login credentials" styled to stand out (e.g. red), and does not navigate to
`/backoffice`.

---

## 4. User Flow

**Main flow**

1. The admin, from any public page, either types `/login` directly into the browser's address
   bar, enters the arrow-key Konami sequence, or shakes their phone.
2. The browser navigates to `/login`, which renders the email and password fields and a login
   button.
3. The admin enters the correct admin email and password and submits the form.
4. The app calls `supabase.auth.signInWithPassword()`; Supabase confirms the credentials and
   returns a session.
5. The admin is navigated to `/backoffice`, now authenticated.
6. Refreshing the browser afterward keeps the admin authenticated for `/backoffice` — no
   re-login is required.

**Alternate / failure flow**

1. The admin already holds a valid session and reaches `/login` (URL or secret trigger) — they
   are redirected straight to `/backoffice` without seeing the form.
2. The admin submits the wrong email or password — `signInWithPassword` fails, the admin stays on
   `/login`, and a visually distinct error message is shown; no navigation to `/backoffice`
   occurs.

---

## 5. Interfaces Involved

### Pages

- `/login` (new) - `src/pages/Login.jsx`. Renders the login form; checks for an existing session
  on load and redirects to `/backoffice` if one is valid (FR-07); otherwise shows the form and
  handles submission (FR-04–FR-06, FR-08).

### Components

- `Login` (`src/pages/Login.jsx`, new) - the `/login` page itself: session check + redirect, and
  composes the login form.
- `LoginForm` (new, e.g. `src/components/login/LoginForm.jsx`) - renders the email/password
  inputs and submit button, calls `supabase.auth.signInWithPassword()` on submit, and displays
  the error message on failure.
- A secret-trigger listener (new, e.g. `src/components/SecretAccess.jsx` or a
  `useSecretAccess` hook) - mounted once at the app level (`App.jsx`, alongside/inside the router)
  so it's active on every public page; listens for the arrow-key Konami sequence (FR-02) and for
  `devicemotion` shake events (FR-03), and navigates to `/login` when either fires.

### Endpoints

N/A — this feature calls no custom HTTP endpoint of its own. The only network interaction is the
Supabase Auth SDK call (`supabase.auth.signInWithPassword()`) through the shared client at
`src/lib/supabaseClient.js`.

---

## 6. Data

### Inputs

- `email` (text, `type="email"`, required) - typed by the admin into the login form's email
  field.
- `password` (text, `type="password"`, required) - typed by the admin into the login form's
  password field.
- Arrow-key `keydown` events (`ArrowUp`/`ArrowDown`/`ArrowLeft`/`ArrowRight`) - read globally from
  the page to detect the Konami sequence.
- `devicemotion` acceleration readings - read globally from the device to detect a shake.

### Outputs / Returned Data

- Supabase session object (access token + user) - returned by `signInWithPassword` on success;
  held by the Supabase client for persistence, and used to authorize the redirect to
  `/backoffice`.
- Error message (text) - displayed on the login page when `signInWithPassword` fails.
- Navigation to `/backoffice` or `/login` - the visible result of a successful login, an
  already-valid session, or a secret trigger firing.

### Stored / Modified Data

- No application data (e.g. the `messages` table) is created or changed by this feature. The
  Supabase session itself is stored by the Supabase client's own persistence mechanism (not a
  custom table this feature defines).

---

## 7. Validation

- **Email field:** required, must be a valid email format (enforced via the native
  `type="email"` input) - checked on client - on failure: the browser blocks submission and shows
  its native validation cue; no `signInWithPassword` call is made.
- **Password field:** required, non-empty (enforced via the `required` attribute on a
  `type="password"` input) - checked on client - on failure: submission is blocked; no
  `signInWithPassword` call is made.
- **Credential correctness:** verified by Supabase Auth when `signInWithPassword` is called -
  checked server-side (Supabase) - on failure: a visually distinct error message (e.g. "Invalid
  login credentials", red text) is shown and the admin remains on `/login`.
- **Konami sequence correctness:** each keydown must match the next expected key in
  `↑ ↑ ↓ ↓ ← → ← →` - checked on client - on failure (wrong key): progress resets to the start;
  no navigation occurs.
- **Shake threshold:** device acceleration must exceed the chosen threshold a few times in quick
  succession - checked on client - on failure (below threshold, or a single incidental jolt): no
  navigation occurs.

---

## 8. Expected Behavior

### Success Behavior

- Entering the correct admin email and password navigates the admin to `/backoffice` with an
  active session.
- Refreshing the browser while on `/backoffice` (or returning to it later in the same browser
  session) keeps the admin authenticated rather than logging them out.
- Visiting `/login` while already authenticated redirects immediately to `/backoffice`, without
  showing the form.
- Completing the arrow-key Konami sequence, or shaking the phone on mobile, on any public page
  navigates the visitor to `/login`.

### Error / Invalid Behavior

- Submitting the wrong email or password keeps the admin on `/login` and shows a visually
  distinct error message (e.g. red text such as "Invalid login credentials"); no session is
  created and no navigation to `/backoffice` occurs.
- An incomplete or incorrect Konami sequence, or device motion below the shake threshold, causes
  no navigation and no visible change to the current page.
- On iOS, if motion permission has not been granted, the shake trigger simply does not fire —
  this is a known platform limitation (§2); URL entry and the Konami code remain available.

### Empty / Edge Cases

- **No arrow-key or shake input yet:** on first load of any public page, no sequence has been
  started; ordinary keyboard and touch use elsewhere on the site is unaffected by the listener
  being mounted.
- **Partial sequence abandoned:** if the admin starts the Konami sequence but pauses or presses
  an unrelated key, progress resets silently — no error, no navigation.
- **Narrow viewports:** the login form remains usable and legible without horizontal scrolling at
  mobile widths, per the global responsive rules in `ai-spec.md`.

---

## 9. Acceptance Criteria

- [ ] Inspecting the header, footer, and mobile bottom nav markup shows no link or route to
      `/login` anywhere. (FR-01)
- [ ] On a public page, typing `/login` directly into the address bar loads the login page.
      (FR-01)
- [ ] On a public page, pressing `ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight,
      ArrowLeft, ArrowRight` in order navigates to `/login`; pressing an incorrect key partway
      through and then completing the correct remaining keys does **not** navigate (progress had
      reset). (FR-02)
- [ ] On a mobile device/emulator with motion permission granted, shaking the device on a public
      page navigates to `/login`. (FR-03)
- [ ] The `/login` page shows an email input with `type="email"`, a password input with
      `type="password"`, and a submit/login button. (FR-04)
- [ ] Submitting the form triggers exactly one `supabase.auth.signInWithPassword()` call with the
      entered email and password, via the client exported from `src/lib/supabaseClient.js`.
      (FR-05)
- [ ] Submitting the correct admin credentials (pre-created in the Supabase dashboard) navigates
      to `/backoffice`. (FR-06)
- [ ] After a successful login, refreshing the browser does not return the admin to `/login` or
      require logging in again to view `/backoffice`. (FR-06)
- [ ] With a valid session already established, navigating to `/login` redirects immediately to
      `/backoffice` without displaying the form. (FR-07)
- [ ] Submitting an incorrect email or password keeps the admin on `/login`, displays a visually
      distinct error message (e.g. red text), and does not navigate to `/backoffice`. (FR-08)
