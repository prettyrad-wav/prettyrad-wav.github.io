# Feature Specification — Back Office

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Back Office
- **Related Area:** Full-stack (auth-gated front-end route + Supabase data + Supabase Auth)

---

## 1. Feature Goal

Give the site's single admin (Nick) a private, authenticated page to review and manage the
messages submitted through the public Contact page. The Back Office fetches every row from the
`messages` table, presents it as a sortable-by-date table, lets the admin open any message in full
and delete it, and lets the admin sign out when finished. The page itself is only ever reachable
and renderable while a valid Supabase Auth session exists — an unauthenticated visitor is bounced
to Login instead of seeing any message data.

---

## 2. Feature Scope

### In Scope

- A `/backoffice` route that verifies the visitor's Supabase Auth session before rendering any
  page content.
- Fetching all rows from the `messages` table on page load and rendering them in a table (columns:
  Name, Email, Date, Actions), newest first.
- A visible error state if the fetch fails, and a visible empty state if `messages` has no rows.
- A per-row delete action that removes the row from the `messages` table and updates the table
  instantly (no full page reload).
- A "view full message" modal (opened from a row click or a View action) showing sender name,
  email, date/time, and the full message text, closable via a close control, the Escape key, or a
  click outside the modal.
- A logout control that ends the Supabase Auth session and returns the visitor to a public page.
- Excluding `/backoffice` from the header nav, footer, and mobile bottom nav, matching the same
  hidden-route treatment `login-page.feature.md` applies to `/login`.

### Out of Scope

- The Login page itself, its form, and how the admin authenticates — `login-page.feature.md`.
- Creating, editing, or replying to messages — the Back Office is read + delete only; message
  creation happens exclusively via the public Contact page (`contact-page.feature.md`).
- Pagination, search, filtering, or sorting controls beyond the fixed newest-first order — not
  required by the grading sheet.
- Bulk/multi-select delete — only a single-row delete action is required.
- Any confirmation dialog before delete (e.g. "Are you sure?") — not required; delete acts
  immediately when clicked.
- Undo/restore of a deleted message — deletion is permanent.

### Feature-Specific Constraints

- **Auth check happens before render, not after:** the page must not flash table content (or even
  an empty/loading table shell implying data access) before the session check resolves — see FR-01.
- **Instant local removal on delete:** after a successful delete, the row must disappear from the
  table without waiting for a full re-fetch of the entire `messages` table (either by removing it
  from local state directly, or by re-fetching — either is acceptable as long as the row is gone
  immediately and no stale row lingers).

---

## 3. Requirements

### FR-01 — Authenticated Access Renders the Page

**Requirement:**
Navigating to `/backoffice` while a valid Supabase Auth session exists renders the Back Office
page and its content.

**Expected Result:**
An authenticated admin who navigates to `/backoffice` sees the Back Office page (messages table,
logout control), not the login form or a redirect.

### FR-02 — Unauthenticated Access Redirects to Login

**Requirement:**
Navigating to `/backoffice` without a valid session redirects the visitor to the Login route
instead of rendering any Back Office content.

**Expected Result:**
A visitor with no session (or an expired/invalid one) who navigates to `/backoffice` is sent to
`/login` and never sees the messages table or any message data.

### FR-03 — Route Excluded from Public Navigation

**Requirement:**
`/backoffice` is not rendered as a link in the header nav, footer, or mobile bottom nav.

**Expected Result:**
Inspecting the site's navigation on any public page shows no clickable element leading to
`/backoffice`; it is only reached by URL, or by the app's own redirect after a successful login
(`login-page.feature.md` FR-06).

### FR-04 — Fetch and Display All Messages

**Requirement:**
On render, the Back Office fetches every row from the `messages` table and displays each as one
row in a table, ordered by `created_at` descending (newest first).

**Expected Result:**
Every row currently in `messages` appears in the table exactly once, with the most recently
created message listed first and the oldest listed last.

### FR-05 — Fetch Failure Shows an Error

**Requirement:**
If the fetch of `messages` fails, a visible error message is shown in place of the table.

**Expected Result:**
When the Supabase request errors (e.g. network failure, misconfigured client), the admin sees an
error message on the page instead of an empty or partially-populated table with no explanation.

### FR-06 — Empty Table Shows a Placeholder Message

**Requirement:**
If the fetch succeeds but `messages` has zero rows, a message such as "No messages yet" is shown
in place of the table.

**Expected Result:**
With an empty `messages` table, the admin sees an explicit "no messages" message rather than a
blank area or an empty table shell with no explanation.

### FR-07 — Table Columns and Row Content

**Requirement:**
The messages table renders four columns — **Name**, **Email**, **Date**, **Actions** — with one
row per message and a delete control present in the Actions column of every row.

**Expected Result:**
Each row shows the sender's name, email, and the message's created date, plus a delete
button/icon in Actions; the number of rows matches the number of messages fetched.

### FR-08 — Delete Removes a Message Instantly

**Requirement:**
Activating a row's delete control deletes that message from the `messages` table and removes it
from the visible table without a page reload.

**Expected Result:**
Clicking delete on a row causes that row to disappear from the table immediately, and the
corresponding row no longer exists in `messages` on a subsequent fetch.

### FR-09 — View Message Modal

**Requirement:**
Clicking a message's row, or a View control on that row, opens a modal showing that message's
sender name, sender email, created date and time, and full message text.

**Expected Result:**
Triggering view on any row opens a modal whose contents (name, email, date/time, full message
text) match that specific message.

### FR-10 — Modal Close Behaviors

**Requirement:**
The view-message modal can be closed by its own close control (e.g. an X or "Close"), by pressing
Escape, or by clicking outside the modal.

**Expected Result:**
While the modal is open, each of the three actions — clicking the close control, pressing
Escape, or clicking outside the modal — closes it and returns the admin to the table view.

### FR-11 — Logout Ends the Session and Redirects

**Requirement:**
A logout control on the Back Office page, when activated, calls `supabase.auth.signOut()` and
navigates the admin to a public page (Home or Login).

**Expected Result:**
Clicking logout clears the Supabase session (a subsequent navigation to `/backoffice` redirects to
Login per FR-02) and takes the admin to the Home or Login page.

---

## 4. User Flow

**Main flow**

1. An authenticated admin navigates to `/backoffice` (directly, or via the Login redirect).
2. The page verifies the session, confirms it is valid, and renders the messages table populated
   from `messages`, newest first.
3. The admin clicks a row (or its View control) to open the modal and read the full message.
4. The admin closes the modal (close control, Escape, or clicking outside).
5. The admin clicks delete on a message; the row disappears from the table immediately and the
   message is removed from `messages`.
6. The admin clicks logout; the Supabase session ends and the admin is taken to a public page.

**Alternate / failure flow**

1. A visitor with no valid session navigates to `/backoffice` — the app redirects them to `/login`
   without rendering any Back Office content.
2. The `messages` fetch fails — the admin sees an error message instead of a table.
3. The `messages` fetch succeeds but returns zero rows — the admin sees a "No messages yet"
   message instead of a table.

---

## 5. Interfaces Involved

### Pages

- `/backoffice` (new) - `src/pages/BackOffice.jsx`. Verifies the session before rendering
  (FR-01/FR-02); on success, fetches and displays `messages` (FR-04–FR-07), and hosts the delete
  action, view modal, and logout control (FR-08–FR-11).

### Components

- `BackOffice` (`src/pages/BackOffice.jsx`, new) - the page itself: session check + redirect,
  fetch orchestration, and composition of the table, modal, and logout control.
- `MessagesTable` (new, e.g. `src/components/backoffice/MessagesTable.jsx`) - renders the Name /
  Email / Date / Actions table from the fetched messages, one row per message, and exposes the
  row-click/View and delete interactions (FR-07–FR-09).
- `MessageModal` (new, e.g. `src/components/backoffice/MessageModal.jsx`) - renders the full
  message view (name, email, date/time, message text) and implements the three close behaviors
  (FR-09/FR-10).
- `LogoutButton` (new, e.g. `src/components/backoffice/LogoutButton.jsx`, or inline in
  `BackOffice.jsx`) - calls `supabase.auth.signOut()` and redirects on click (FR-11).

### Endpoints

N/A — no custom HTTP endpoint. All data access is through the Supabase JS client at
`src/lib/supabaseClient.js`: a `select` query against `messages` (fetch), a `delete` query against
`messages` (delete), and `supabase.auth.signOut()` (logout). Auth state is read via the same
client's session APIs (e.g. `supabase.auth.getSession()` / `onAuthStateChange`).

---

## 6. Data

### Inputs

- Current Supabase Auth session state - read on page load (and on auth state changes) to decide
  whether to render the page or redirect (FR-01/FR-02).
- `messages` table rows (`id`, `created_at`, `name`, `email`, `message`) - fetched from Supabase on
  page load.
- Row selection (click on a row, or its View control) - which message to show in the modal
  (FR-09).
- Row delete action (click on a row's delete control) - which message to remove (FR-08).

### Outputs / Returned Data

- Rendered table rows: `name` (text), `email` (text), `created_at` (formatted date) per message,
  plus a delete control - displayed in the Name / Email / Date / Actions table.
- Modal content: `name`, `email`, `created_at` (formatted date and time), `message` (full text) -
  displayed when a message is opened.
- Error message (text) - displayed if the `messages` fetch fails.
- Empty-state message (text, e.g. "No messages yet") - displayed if `messages` returns zero rows.
- Navigation to `/login` - the result of failing the auth check (FR-02) or clicking logout (FR-11,
  or to Home).

### Stored / Modified Data

- Deletes a row from the `messages` table (`DELETE` on the matching `id`) when the admin deletes a
  message (FR-08).
- Ends the current Supabase Auth session (no `messages` row changes) when the admin logs out
  (FR-11).
- No new data is created by this feature — messages are only ever created by the Contact page.

---

## 7. Validation

- **Session validity (route guard):** a Supabase Auth session must exist and be valid before any
  Back Office content renders - checked on client (using the Supabase client's session state) -
  on failure: the visitor is redirected to `/login` and no message data is fetched or shown.
- **Fetch outcome:** the `messages` select query must succeed and return an array - checked on
  client, after the Supabase call resolves - on failure (request error): an error message replaces
  the table; on success with zero rows: an empty-state message replaces the table.
- **Delete target exists:** the delete action operates on a specific message `id` known from the
  row being acted on - checked on client before issuing the delete - on failure (row already
  removed / delete request errors): the row is not removed from view if the delete did not
  succeed, so the table does not go out of sync with `messages`.

---

## 8. Expected Behavior

### Success Behavior

- An authenticated admin visiting `/backoffice` sees the full, current contents of `messages` in a
  table ordered newest first.
- Clicking a row or its View control opens a modal with that message's full details; closing it by
  any of the three supported methods returns to the table.
- Clicking delete on a row removes that message from both the table and the `messages` table
  immediately.
- Clicking logout signs the admin out and lands them on a public page; a subsequent visit to
  `/backoffice` requires logging in again.

### Error / Invalid Behavior

- An unauthenticated visitor reaching `/backoffice` is redirected to `/login` and never sees table
  content, an empty state, or an error state meant for authenticated fetch failures.
- A failed `messages` fetch shows an error message and no table.
- A failed delete request leaves the row visible (it is not optimistically removed if the delete
  itself did not succeed), so the admin isn't shown a false "deleted" state for data that still
  exists.

### Empty / Edge Cases

- **Zero messages:** the table is replaced by a "No messages yet" (or equivalent) message; the
  logout control remains available.
- **Deleting the last remaining message:** after the delete succeeds, the table's empty state
  (FR-06 behavior) appears immediately, without needing a manual refresh.
- **Narrow viewports:** the table remains usable (e.g. via horizontal scroll within its own
  container, or a responsive row layout) without breaking the page's overall no-horizontal-scroll
  rule from `ai-spec.md`.

---

## 9. Acceptance Criteria

- [ ] With a valid session, navigating to `/backoffice` renders the Back Office page (table and
      logout control visible). (FR-01)
- [ ] With no session (or after clearing it), navigating to `/backoffice` redirects to `/login`
      and no message data is ever rendered. (FR-02)
- [ ] Inspecting the header, footer, and mobile bottom nav markup shows no link or route to
      `/backoffice` anywhere. (FR-03)
- [ ] On load, the table shows one row per row currently in `messages`, ordered with the most
      recently created message first and the oldest last. (FR-04)
- [ ] Simulating a failed fetch (e.g. temporarily invalid Supabase config) shows a visible error
      message instead of a table. (FR-05)
- [ ] With `messages` empty, the page shows a "No messages yet" (or equivalent) message instead of
      a table. (FR-06)
- [ ] The table renders exactly the columns Name, Email, Date, and Actions, with a delete
      control present in Actions for every row. (FR-07)
- [ ] Clicking a row's delete control removes that row from the table immediately, and a
      subsequent fetch of `messages` no longer includes it. (FR-08)
- [ ] Clicking a row (or its View control) opens a modal showing that message's name, email,
      date/time, and full message text, matching the source row. (FR-09)
- [ ] With the modal open, each of the following closes it: clicking its close control, pressing
      Escape, and clicking outside the modal. (FR-10)
- [ ] Clicking logout calls `supabase.auth.signOut()`, and afterward navigating to `/backoffice`
      redirects to `/login` (the session no longer validates); the admin lands on a public page
      immediately after clicking logout. (FR-11)
