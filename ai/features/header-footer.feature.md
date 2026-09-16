# Feature Specification — Header, Footer & Shared Layout

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Header, Footer & Shared Layout
- **Related Area:** Front-end (layout/navigation)

---

## 1. Feature Goal

Give every public page of the site the same surrounding frame — a persistent header with
branding and navigation, and a persistent footer with contact/social information and a
copyright notice — so a visitor always knows where they are and can reach any main page from
anywhere on the site, on any screen size. This feature produces no content of its own beyond
the header and footer; it is the shell every page (Home, Portfolio, Links, Contact) is rendered
inside of.

---

## 2. Feature Scope

### In Scope

- A `Main` layout component that wraps routed page content between a header and a footer.
- A `Navbar`/`Header` component rendered at the top of every public page, sticky/fixed while
  scrolling, containing the personal logo and navigation links to all main pages.
- A `Footer` component rendered at the bottom of every public page, containing contact
  information, social links, and a copyright notice.
- The AI-generated personal logo image, used in the header, linking to the Home page.
- Responsive behavior of the header and footer: horizontal nav on desktop (>768px), bottom icon
  nav on mobile (≤768px), with no overflow or unreadable text at either width.

### Out of Scope

- The content rendered inside the layout (Home, Portfolio, Links, Contact page content) —
  specified in their own `*.feature.md` files.
- The Login and Back Office pages' use (or deliberate non-use) of this layout — specified in
  `login-page.feature.md` and `back-office.feature.md` per the Cross-Feature Rules in
  `ai-spec.md` §7.
- Light/dark theme switching and language switching — `light-dark-mode.feature.md` and
  `languages.feature.md` (extra miles); this feature's header/footer must simply not break if
  those are added later.
- Generating the AI images themselves (tool selection, prompting) beyond documenting which tool
  produced the logo.

### Feature-Specific Constraints

- N/A — no exceptions to `ai-spec.md`. The nav membership rule (exactly Home, Portfolio, Links,
  Contact — never Login or Back Office) and the `768px` breakpoint are inherited from
  `ai-spec.md` §5 and §7 and apply as-is.

---

## 3. Requirements

### FR-01 — Main Layout Wrapper

**Requirement:**
A `Main` layout component renders the `Navbar`/`Header` above, the current routed page content
in the middle, and the `Footer` below, for every public page.

**Expected Result:**
Navigating between Home, Portfolio, Links, and Contact always shows the same header and footer
around different page content; neither disappears or re-mounts with a visible flash when
switching pages.

### FR-02 — Persistent, Sticky Header

**Requirement:**
The header renders at the top of the viewport on every public page, uses `position: sticky` (or
`fixed`) so it stays visible while the page content scrolls, and has the same background and
styling on every page.

**Expected Result:**
Scrolling down any public page keeps the header visible at the top; the header's appearance
(colors, spacing, logo, nav style) is identical whether the visitor is on Home, Portfolio, Links,
or Contact.

### FR-03 — Header Navigation Links

**Requirement:**
The header contains navigation links to exactly the main public pages (Home, Portfolio, Links,
Contact).

**Expected Result:**
Clicking any header nav link renders that page's content inside the same layout, with the URL
remaining `https://prettyrad-wav.github.io` per the routing rule in `ai-spec.md` §4. Login and
Back Office never appear as header links.

### FR-04 — Personal AI-Generated Logo

**Requirement:**
An AI-generated logo image (`src/assets/AI-logo-2.svg`, generated using Recraft) is displayed in
the header, is a clickable link to the Home page, and has descriptive `alt` text.

**Expected Result:**
The logo is visible in the header on every public page; clicking it navigates to Home from any
page (including from Home itself, where it is a no-op); a screen reader announces meaningful
alt text (e.g. "Nick Hobbs logo") rather than a filename or empty string.

### FR-05 — Footer Content

**Requirement:**
The footer renders on every public page and contains contact information (at least an email
address) plus social links, and a copyright notice.

**Expected Result:**
Scrolling to the bottom of any public page shows the same footer with a working `mailto:` email
link, at least one social link, and a copyright line (e.g. "© 2026 Nick Hobbs").

### FR-06 — Responsive Navigation Layout

**Requirement:**
Header/footer navigation adapts at the `768px` breakpoint: horizontal links in the header on
desktop (>768px), and icon-based links in a bottom bar on mobile (≤768px).

**Expected Result:**
Resizing the viewport across `768px` switches the nav presentation without any content
overflowing horizontally, without unreadable/truncated text, and without the logo overflowing
its container.

---

## 4. User Flow

**Main flow**

1. A visitor loads any public page of the site.
2. The header renders at the top with the logo and nav links (or icons, on mobile); the footer
   renders at the bottom with contact/social info and the copyright line.
3. The visitor scrolls the page; the header stays pinned to the top of the viewport.
4. The visitor clicks a nav link (or icon) in the header (desktop) or bottom bar (mobile).
5. The requested page's content replaces the middle of the layout; header and footer remain
   unchanged; the URL stays at the site root.
6. The visitor clicks the logo from any page and lands on Home.

**Alternate / failure flow**

N/A — this feature has no data-dependent or failure path; the header and footer are static
layout elements with no external requests.

---

## 5. Interfaces Involved

### Pages

- All public routes rendered under the `Main` layout (Home `/`, Portfolio, Links, Contact — no
  distinct URL paths per `ai-spec.md` §4) - every one is wrapped by this feature's header and
  footer.

### Components

- `Main` (`src/components/layout/Main.jsx`) - new. Wraps routed page content between `Navbar`
  and `Footer`.
- `Navbar` / `Header` (`src/components/layout/Navbar.jsx`) - new. Renders the logo, desktop
  horizontal nav, and mobile bottom icon nav; owns the sticky/fixed positioning.
- `Footer` (`src/components/layout/Footer.jsx`) - new. Renders contact info, social links, and
  the copyright notice.
- `App` (`src/App.jsx`) - existing. Mounts the router and the `Main` layout around routed pages.

### Endpoints

N/A — this feature makes no network or Supabase calls.

---

## 6. Data

### Inputs

- N/A — no user input. Nav link labels/targets, logo image, footer contact/social entries, and
  the copyright year/name are static data defined in the codebase (per `ai-spec.md` §5, "Static
  content as data"), not entered by a user.

### Outputs / Returned Data

- Rendered header markup (logo image + link, nav links or icons) - displayed on every public
  page.
- Rendered footer markup (contact email, social links, copyright text) - displayed on every
  public page.

### Stored / Modified Data

N/A — this feature reads and writes no persistent storage.

---

## 7. Validation

- **Logo `alt` text:** must be a non-empty, descriptive string (not the filename, not empty) -
  checked visually/via accessibility audit (client) - on failure: update the `alt` attribute
  before the feature is considered done.
- **Nav link set:** the header nav and mobile bottom nav must list exactly Home, Portfolio,
  Links, Contact, in the same order, on every page - checked by code review across all pages
  (client) - on failure: correct the shared nav data so all pages stay in sync.
- **Viewport width:** at any width from mobile (~320px) up through desktop, no element in the
  header or footer causes horizontal scrolling - checked by manual resize/DevTools responsive
  mode (client) - on failure: adjust CSS (max-width, flex-wrap, font sizing) until no overflow
  occurs.

---

## 8. Expected Behavior

### Success Behavior

- Every public page shows an identical header (logo + nav) and footer (contact/social +
  copyright), regardless of which page is active.
- The header remains visible at the top of the viewport while scrolling any page's content.
- Clicking the logo or any nav link/icon navigates to the corresponding page without changing
  the URL path or causing a full page reload.
- At widths >768px, nav links display horizontally in the header; at widths ≤768px, nav items
  display as icons in a bar fixed to the bottom of the viewport.

### Error / Invalid Behavior

N/A — there is no user input or network call in this feature that can fail; the header and
footer always render from static, in-codebase data.

### Empty / Edge Cases

- **Very narrow viewports (<360px):** the logo shrinks and nav icons/text wrap or shrink rather
  than overflowing or forcing horizontal scroll.
- **Long page content / short page content:** the footer stays at the bottom of the page content
  (not pinned to the viewport bottom) regardless of how much content the active page renders
  above it.

---

## 9. Acceptance Criteria

- [ ] Every public page (Home, Portfolio, Links, Contact) renders the same `Navbar`/`Header` and
      `Footer` around its own content via the `Main` layout. (FR-01)
- [ ] The header stays visible at the top of the viewport when the page content is scrolled, on
      every public page. (FR-02)
- [ ] The header's background and styling are visually identical across all four public pages.
      (FR-02)
- [ ] The header contains clickable links to Home, Portfolio, Links, and Contact, and no link to
      Login or Back Office, on every public page. (FR-03)
- [ ] Clicking a header nav link renders the target page's content while the URL stays at
      `https://prettyrad-wav.github.io`. (FR-03)
- [ ] The logo image from `src/assets/AI-logo-2.svg` is visible in the header on every public
      page and has non-empty, descriptive `alt` text. (FR-04)
- [ ] Clicking the logo from any public page navigates to the Home page. (FR-04)
- [ ] The footer appears on every public page and contains an email contact link, at least one
      social link, and a copyright notice. (FR-05)
- [ ] At viewport width >768px, header navigation links are displayed horizontally. (FR-06)
- [ ] At viewport width ≤768px, navigation is displayed as icons in a bar at the bottom of the
      viewport. (FR-06)
- [ ] At both desktop and mobile widths, no header or footer element causes horizontal page
      overflow, and the logo remains fully visible without distortion. (FR-06)
