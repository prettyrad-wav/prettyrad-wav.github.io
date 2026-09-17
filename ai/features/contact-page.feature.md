# Feature Specification — Contact Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Contact Page
- **Related Area:** Full-stack (front-end form + Supabase write)

---

## 1. Feature Goal

Give a visitor a low-friction way to reach out to Nick directly from the site — by name, email,
and message — without leaving the page or opening their own email client. Submitting the form
persists the message in Supabase so Nick can read it later from the Back Office, and the visitor
gets clear, immediate confirmation that their message was sent (or a clear notice if it wasn't).

---

## 2. Feature Scope

### In Scope

- The Contact page content rendered inside the shared `Main` layout, reached via the header/mobile
  nav (`activePage === 'contact'`, no path change per `ai-spec.md` §4).
- A form with three fields: sender **name** (text), sender **email** (email), and **message**
  (textarea), each with a visible label or placeholder.
- Client-side validation: all three fields required, email must be a valid email format,
  validation errors shown to the user, and submission blocked while validation fails.
- On valid submission, an `INSERT` into the Supabase `messages` table (`name`, `email`, `message`)
  through the shared Supabase client.
- Introducing the shared Supabase client module (`src/lib/supabaseClient.js`) and the
  `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` environment variables it reads — this is the
  first feature in the project that needs a live Supabase connection, so it is the one that
  establishes that client for every later feature (Back Office) to reuse.
- Visually distinct success and failure feedback after a submission attempt, the form clearing on
  success, and the success message going away after a few seconds or on the next interaction.
- Graceful degradation (a clear failure message, no crash) if Supabase is unreachable or
  unconfigured, per the Global Definition of Done in `ai-spec.md` §6.

### Out of Scope

- Reading, listing, or deleting stored messages — `back-office.feature.md`.
- Creating/configuring the Supabase project itself, the `messages` table schema, or its RLS
  policies — a one-time infra step noted as out of scope in `setup-deploy.feature.md` and
  `ai-spec.md` §4; this feature only specifies the app-side behavior once that table exists.
- The header, footer, and the `Main` layout wrapper itself — `header-footer.feature.md`.
- Any authentication — this form is public and requires no login (`login-page.feature.md`,
  `back-office.feature.md` are unrelated to this feature).
- Any confirmation email or notification to Nick beyond the row appearing in Supabase — no email
  service is part of this project.

### Feature-Specific Constraints

- **First Supabase connection in the project:** `src/lib/supabaseClient.js` does not exist yet
  anywhere else in the codebase, so this feature creates it. It must read `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` from environment variables (never hardcoded), per the env var rules in
  `ai-spec.md` §4 — local `.env` (gitignored, not committed) for development, and the same two
  variables added as GitHub Actions repository secrets and passed to the build step via `env:` in
  `deploy.yml` (the passthrough mechanism itself belongs to `setup-deploy.feature.md`).
- **Legibility over the background video:** because `Main` renders a looping video behind all page
  content (see `header-footer.feature.md`), the form and its feedback messages must remain
  readable on top of it, consistent with the card/legibility treatment used on Home, Portfolio,
  and Links.
- **Visual consistency:** the Contact page must look like the same site as Home, Portfolio, and
  Links — same typography scale, color palette, and spacing rhythm, not a differently-styled page
  bolted on.

---

## 3. Requirements

### FR-01 — Contact Form Fields

**Requirement:**
The page displays a form with a text input for the sender's name, an email input for the sender's
email, and a textarea for the message, each with a visible label or placeholder.

**Expected Result:**
A visitor sees three distinct, clearly-labeled inputs (name, email, message) and can type into
each one.

### FR-02 — Required Field Validation

**Requirement:**
All three fields are required; the form cannot be submitted while any field is empty.

**Expected Result:**
Attempting to submit with one or more empty fields does not send any data to Supabase, and a
validation error (e.g. "Please fill in all fields") is shown to the visitor.

### FR-03 — Email Format Validation

**Requirement:**
The email field is validated for a proper email format before submission is accepted.

**Expected Result:**
Entering a value in the email field that is not a valid email format (e.g. missing `@`) blocks
submission and shows a validation error to the visitor, even if the name and message fields are
filled in.

### FR-04 — Submission Blocked on Invalid Input

**Requirement:**
The form does not allow a submission attempt to reach Supabase while any validation rule (FR-02,
FR-03) is failing — either by disabling the submit action or by rejecting the submission before
any network call is made.

**Expected Result:**
No `INSERT` request is ever sent while the form is in an invalid state; the visitor sees the
relevant validation error(s) instead.

### FR-05 — Supabase Insert on Valid Submission

**Requirement:**
When all fields pass validation and the visitor submits the form, the app performs an `INSERT`
into the Supabase `messages` table with the `name`, `email`, and `message` values, using the
shared Supabase client at `src/lib/supabaseClient.js`.

**Expected Result:**
A valid submission creates exactly one new row in the `messages` table containing the submitted
`name`, `email`, and `message`.

### FR-06 — Success and Failure Feedback

**Requirement:**
After a submission attempt, the visitor is shown a visually distinct success message if the
`INSERT` succeeds, or a visually distinct failure message if it does not (including when Supabase
is unreachable or unconfigured). On success, the form fields are cleared, and the success message
disappears after a few seconds or on the visitor's next interaction.

**Expected Result:**
A successful submission shows a clearly success-styled message (e.g. green, check icon), empties
all three fields, and the message later disappears on its own or as soon as the visitor interacts
with the page again. A failed submission shows a clearly failure-styled message (e.g. red, X
icon) and leaves the visitor's entered data in place so they can retry.

---

## 4. User Flow

**Main flow**

1. A visitor navigates to the Contact page from the header/mobile nav.
2. The Contact page renders inside `Main`: a form with name, email, and message fields.
3. The visitor fills in all three fields with valid values and submits the form.
4. The app inserts a new row into the Supabase `messages` table via the shared Supabase client.
5. The visitor sees a success message; the form fields are cleared.
6. The success message disappears after a few seconds, or as soon as the visitor interacts with
   the page again.

**Alternate / failure flow**

1. The visitor submits the form with an empty field, or an invalid email format → submission is
   blocked, no request is sent, and a validation error is shown next to or above the form; the
   visitor's already-entered values are kept so they can correct the problem.
2. The visitor submits a fully valid form, but the `INSERT` fails (e.g. Supabase is unreachable or
   misconfigured) → a visually distinct failure message is shown, the entered field values are
   kept (not cleared), and the visitor can retry.

---

## 5. Interfaces Involved

### Pages

- Contact (`activePage === 'contact'` inside `Main`, no URL path change per `ai-spec.md` §4) —
  renders this feature's content. Existing file: `src/pages/Contact.jsx` (currently a
  placeholder).

### Components

- `Contact` (`src/pages/Contact.jsx`) - existing, to be built out. Composes the contact form
  section for this page.
- `ContactForm` (new, e.g. `src/components/contact/ContactForm.jsx`) - renders the name/email/
  message fields, runs client-side validation, triggers the Supabase insert on valid submission,
  and displays success/failure feedback.

### Endpoints

N/A — this feature calls no custom HTTP endpoint. The only network interaction is a direct
`INSERT` against the Supabase `messages` table through the Supabase JS client (`src/lib/
supabaseClient.js`), not an endpoint this app defines.

---

## 6. Data

### Inputs

- `name` (text, required) - typed by the visitor into the name field.
- `email` (text, required, must be a valid email format) - typed by the visitor into the email
  field.
- `message` (text, required) - typed by the visitor into the message textarea.

### Outputs / Returned Data

- Validation error message(s) (text) - displayed on the page when required fields are empty or the
  email format is invalid.
- Success message (text/visual) - displayed after a successful Supabase insert.
- Failure message (text/visual) - displayed if the Supabase insert fails or Supabase is
  unreachable/unconfigured.

### Stored / Modified Data

- One new row inserted into the Supabase `messages` table per valid submission, with columns
  `name`, `email`, and `message` (the table's own `id`/timestamp columns, if any, are populated by
  Supabase itself, not by this feature).

---

## 7. Validation

- **Name:** required, non-empty after trimming - checked on client - on failure: submission is
  blocked and a validation error is shown.
- **Email:** required, must be a valid email format - checked on client - on failure: submission
  is blocked and a validation error is shown.
- **Message:** required, non-empty after trimming - checked on client - on failure: submission is
  blocked and a validation error is shown.
- **Supabase insert result:** the `INSERT` call's success/error result determines which feedback
  message is shown - checked on client (the response from the Supabase JS client call) - on
  failure (network error, Supabase misconfigured/unreachable, or insert rejected): a failure
  message is shown and the form is not cleared.

---

## 8. Expected Behavior

### Success Behavior

- The Contact page renders the name/email/message form, legible over the shared background video.
- A fully valid submission inserts one row into the `messages` table and shows a visually distinct
  success message (e.g. green, check icon); the form fields are cleared.
- The success message disappears after a few seconds, or immediately on the visitor's next
  interaction with the page, whichever comes first.

### Error / Invalid Behavior

- Submitting with any empty field, or an invalid email format, blocks submission, sends no request
  to Supabase, and shows a validation error; the visitor's already-typed values remain in the
  fields.
- If the Supabase insert fails (network error, misconfigured/missing environment variables, or an
  error returned by Supabase), a visually distinct failure message (e.g. red, X icon) is shown and
  the entered field values are kept so the visitor can retry without retyping everything.

### Empty / Edge Cases

- **Narrow viewports:** the form fields and feedback messages stack in a single column and remain
  readable without horizontal scrolling, per the global responsive rules in `ai-spec.md`.
- **Repeated submissions:** submitting the form again after a successful submission (now cleared)
  behaves like a fresh submission — validation and insert run again from empty fields.

---

## 9. Acceptance Criteria

- [ ] The Contact page displays a text input for name, an email input for email, and a textarea
      for message, each with a visible label or placeholder. (FR-01)
- [ ] Submitting the form with any field empty shows a validation error and sends no request to
      Supabase. (FR-02)
- [ ] Submitting the form with an invalid email format (e.g. missing `@`) shows a validation error
      and sends no request to Supabase, even if name and message are filled in. (FR-03)
- [ ] The submit action is disabled or rejects submission for as long as any validation rule is
      failing; no `INSERT` request is observed in this state (e.g. via network inspection). (FR-04)
- [ ] Submitting a fully valid form results in exactly one new row in the Supabase `messages`
      table containing the submitted `name`, `email`, and `message`, inserted via the shared
      client at `src/lib/supabaseClient.js`. (FR-05)
- [ ] After a successful submission, a visually distinct success message (e.g. green, check icon)
      appears, all three fields are cleared, and the message disappears after a few seconds or on
      the next interaction. (FR-06)
- [ ] After a failed submission (e.g. Supabase temporarily misconfigured), a visually distinct
      failure message (e.g. red, X icon) appears and the entered field values remain in place.
      (FR-06)
- [ ] All Contact page text and the form remain readable over the shared background video at both
      desktop and mobile widths. (Feature-Specific Constraint, § 2)
