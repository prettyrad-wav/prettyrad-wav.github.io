# Feature Specification — Light & Dark Mode

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Light & Dark Mode
- **Related Area:** Front-end (theming/UX) — extra mile

---

## 1. Feature Goal

Give every page a manual, persistent light/dark theme choice, on top of the OS-respecting
theme behavior that already exists in `src/index.css` (CSS custom properties for every
theme-dependent color, already swapped via `@media (prefers-color-scheme: dark)`). This
feature adds the missing pieces — a visible toggle, an explicit override that beats the OS
setting, `localStorage` persistence, and a smooth transition — without redesigning the
site's existing color tokens or its night-synthwave brand identity (background video +
"glass" panels), which stays fixed by deliberate design regardless of theme.

---

## 2. Feature Scope

### In Scope

- A `ThemeContext` (React Context + `useTheme()` hook) holding the current theme (`'light'`
  or `'dark'`) and a setter, wrapping the whole app.
- A `ThemeToggle` component — a real, keyboard-operable button — rendered on every route
  (all four public pages via the shared layout, plus `/login` and `/backoffice`, which are
  not wrapped by `Main`).
- Reading/writing the chosen theme to `localStorage` under a single key.
- Falling back to the OS/browser `prefers-color-scheme` setting when no explicit choice has
  been stored yet (already implemented in `index.css`; this feature must not break it).
- Applying the explicit override via a `data-theme` attribute on the root element, and
  extending `index.css` so the existing `@media (prefers-color-scheme: dark)` block only
  applies when no explicit override is present, plus a `:root[data-theme="dark"]` block so
  the toggle can force dark even when the OS is set to light.
- A smooth CSS transition on theme-dependent properties (background/text/border colors),
  respecting `prefers-reduced-motion` per the site's existing motion stance
  (`header-footer.feature.md` FR-06).
- Verifying every **non-glass** surface (Login page, Back Office chrome, Portfolio/Links/
  Contact plain sections, form fields, buttons, body text) renders correctly and legibly in
  both themes.

### Out of Scope

- Redesigning or re-theming the "glass" panels that sit directly over the background video
  (`Navbar`, `Footer`, Home page sections/cards, and any Back Office surface that reuses the
  glass tokens) — see Feature-Specific Constraints below. These stay visually identical in
  both themes.
- Changing, dimming, or hiding the background video (`BackgroundVideo`,
  `header-footer.feature.md` FR-06) — it is unaffected by this feature.
- Designing a new color palette. Both the light values (`:root` in `index.css`) and dark
  values (existing `@media (prefers-color-scheme: dark)` block) already exist and are reused
  as-is; this feature only adds the mechanism to switch between them on demand.
- Language/i18n behavior — see `languages.feature.md`.
- Syncing the theme choice live across multiple open tabs — see §8 Edge Cases.

### Feature-Specific Constraints

- **Glass/video panels are exempt from theme switching, by design.** `index.css` already
  documents this decision: the "glass" tokens (`--glass-bg`, `--glass-bg-strong`,
  `--glass-border`, `--glass-text`, `--glass-text-muted`, `--glass-shadow`, `--neon-cyan`,
  `--neon-pink`) are fixed values, not swapped by the dark-mode media query, because the
  background video is a permanently dark night scene and the glass panels must stay legible
  and on-brand against it regardless of OS/user theme choice. This feature does not change
  that: **only** the base tokens (`--text`, `--text-h`, `--bg`, `--border`, `--code-bg`,
  `--accent`, `--accent-bg`, `--accent-border`, `--social-bg`, `--shadow`) toggle between
  light and dark. FR-06's "every component supports both themes" is scoped to components
  and regions that render on the base tokens; components that render exclusively on the
  glass tokens are explicitly excluded and are not a bug.
- This is an explicit exception to `ai-spec.md` §7 "Extra miles are additive, not
  disruptive" only insofar as it means the toggle has a visibly smaller effect on
  video-backed pages (Home, and the glass regions of Navbar/Footer) than on solid pages
  (Login, Back Office, and the plain sections of Portfolio/Links/Contact) — this is intended
  and should not be treated as incomplete coverage.

---

## 3. Requirements

### FR-01 — Manual Theme Toggle On Every Page

**Requirement:**
A `ThemeToggle` button is present and operable on every route: Home, Portfolio, Links,
Contact (via the shared layout), and Login and Back Office (mounted independently, since
those pages don't use `Main`).

**Expected Result:**
A visitor can find and activate the toggle from any page in the app, including the two pages
with no header/footer.

### FR-02 — CSS Custom Properties Remain the Single Source of Theme Color

**Requirement:**
No component introduces a new hardcoded color for anything the toggle should affect; every
themeable value continues to be read from the existing `index.css` custom properties.

**Expected Result:**
Toggling the theme changes color everywhere those properties are used, with no component
"stuck" on a light or dark hardcoded value it shouldn't be stuck on.

### FR-03 — LocalStorage Persistence

**Requirement:**
The chosen theme is written to `localStorage` immediately on toggle, and read back on every
app load, before or during first paint, so the choice survives a refresh or a new visit.

**Expected Result:**
A visitor who selects dark (or light) mode, then reloads or returns later, sees that same
theme applied without needing to toggle again.

### FR-04 — OS Default Respected Until Explicitly Overridden

**Requirement:**
On a visitor's first visit (no stored preference), the theme matches the OS/browser
`prefers-color-scheme` setting, exactly as `index.css` already implements. Only once the
visitor uses the toggle does the explicit choice take precedence over the OS setting, in
both directions (able to force light on a dark-OS device and dark on a light-OS device).

**Expected Result:**
A first-time visitor with a dark-mode OS sees the site in dark mode with no toggle
interaction; after they explicitly pick light mode via the toggle, the site stays light even
though their OS is still set to dark.

### FR-05 — Smooth Transition

**Requirement:**
Switching themes animates the affected color properties over a short duration rather than
snapping instantly, except when `prefers-reduced-motion: reduce` is set, in which case the
change is instant.

**Expected Result:**
Clicking the toggle produces a brief, smooth fade between color states; a visitor with
reduced motion enabled sees the theme change immediately, with no animated transition.

### FR-06 — Full Theme Coverage of Non-Glass Surfaces

**Requirement:**
Every page and component that renders on the base tokens (not the glass/video tokens — see
Feature-Specific Constraints) is legible and correctly styled in both light and dark mode:
sufficient contrast, no invisible text, no leftover hardcoded colors from either theme.

**Expected Result:**
Login, Back Office's non-glass chrome, and the plain sections of Portfolio/Links/Contact all
look correct and readable in both themes; the toggle produces a real, visible change on
these pages even though it produces a much smaller change on the glass/video-backed
sections of Home/Navbar/Footer per the documented exception.

---

## 4. User Flow

**Main flow**

1. A visitor loads the site for the first time. No theme is stored, so the site renders
   using their OS/browser `prefers-color-scheme` setting.
2. The visitor notices the `ThemeToggle` (present on whichever page they're on) and clicks
   it.
3. The theme switches with a smooth transition (or instantly, if reduced motion is
   enabled); the choice is written to `localStorage`.
4. The visitor navigates to other pages, including Login or Back Office; the same explicit
   theme persists across every route without needing to be re-selected.
5. The visitor closes the tab and returns later (or reloads); the site loads directly into
   their last-chosen theme, not back to the OS default.

**Alternate / failure flow**

- **`localStorage` is unavailable or the stored value is invalid** (private browsing, quota
  exceeded, corrupted/unexpected value): the app falls back to the OS `prefers-color-scheme`
  default rather than crashing or rendering an unstyled page.

---

## 5. Interfaces Involved

### Pages

- All routes: Home, Portfolio, Links, Contact (public pages under `Main`), plus `/login` and
  `/backoffice` — the toggle must reach all of them.

### Components

- `ThemeContext` (`src/context/ThemeContext.jsx`) — new. Provides `{ theme, setTheme }` via
  a `useTheme()` hook; on mount, reads `localStorage`, falling back to
  `window.matchMedia('(prefers-color-scheme: dark)')` when nothing is stored; applies
  `data-theme` to `document.documentElement` whenever `theme` changes and writes it to
  `localStorage`.
- `ThemeToggle` (`src/components/theme/ThemeToggle.jsx` + `.css`) — new. A single button
  (sun/moon icon, consistent with the existing hand-drawn SVG icon style used in
  `Navbar`'s mobile nav) that calls `setTheme` with the opposite of the current value; uses
  `aria-label`/`aria-pressed` so its state and action are announced correctly.
- `App` (`src/App.jsx`) — edited. Wraps its existing tree in `ThemeContext`'s provider and
  mounts `ThemeToggle` alongside `SecretAccess` (same precedent: a cross-cutting concern
  that must stay active/visible regardless of which route is rendered), so it reaches
  Login and Back Office without modifying those pages' own layout.
- `index.css` — edited. The existing `@media (prefers-color-scheme: dark)` block gains a
  `:root:not([data-theme="light"])` guard so an explicit light override can suppress it; a
  new `:root[data-theme="dark"]` block restates the same dark values so an explicit dark
  override applies regardless of OS setting; a `transition` is added to the base tokens'
  consuming selectors (or a shared class) for FR-05, guarded by
  `prefers-reduced-motion: reduce`.

### Endpoints

N/A — this feature makes no network or Supabase calls; all state lives in `localStorage`.

---

## 6. Data

### Inputs

- The visitor's click on `ThemeToggle`.
- On load: the stored `localStorage` value (if any) and the OS `prefers-color-scheme`
  media query result (if not).

### Outputs / Returned Data

- The active theme, reflected as a `data-theme` attribute on the root element and,
  transitively, every CSS custom property value computed from it.

### Stored / Modified Data

- `localStorage['theme']` — `'light'` or `'dark'`. Absent until the visitor's first
  explicit toggle; present and authoritative afterward.

---

## 7. Validation

- **Toggle is keyboard-operable and announces its state:** a real `<button>` with
  `aria-label` describing the action and `aria-pressed` (or equivalent) reflecting current
  state - checked via keyboard navigation and screen reader/accessibility audit (client) -
  on failure: fix markup/ARIA attributes.
- **Invalid or missing `localStorage` value doesn't break rendering:** any value other than
  `'light'`/`'dark'` (or a `localStorage` read that throws) is treated as "no preference
  stored" and falls back to the OS default - checked by manually setting/corrupting the
  `localStorage` key in DevTools and reloading (client) - on failure: add a guard around
  the stored-value check.
- **No flash of the wrong theme on load:** the stored/OS-derived theme is applied before or
  during first paint, not after a visible delay - checked by reloading with each stored
  value and watching for a flash (client) - on failure: move the theme-resolution logic
  earlier (e.g. a blocking inline script or effect that runs before paint).
- **Contrast in both themes:** text over `--bg` using `--text`/`--text-h` meets readable
  contrast in both light and dark values - checked visually across Login, Back Office, and
  the plain sections of Portfolio/Links/Contact in both themes (client) - on failure: adjust
  the specific token's value in `index.css`.

---

## 8. Expected Behavior

### Success Behavior

- The toggle switches the active theme immediately, persists it, and applies a smooth
  transition (or an instant change under reduced motion) across every page.
- Every non-glass surface re-themes correctly; glass/video-backed panels stay visually
  unchanged, as intended.
- Returning visitors see their last explicit choice, not the OS default, once they've
  toggled at least once.

### Error / Invalid Behavior

- **`localStorage` throws or is unavailable:** the app still functions, using the OS default
  each load (the choice simply doesn't persist for that visitor/session).

### Empty / Edge Cases

- **No stored preference, OS has no preference expressed:** defaults to whichever value
  `index.css`'s bare `:root` block defines (light), matching standard `prefers-color-scheme`
  fallback behavior.
- **Multiple tabs open:** a toggle in one tab does not live-update other already-open tabs;
  they pick up the new value on their next load. This is acceptable and not treated as a
  bug — cross-tab sync is out of scope.
- **Rapid repeated toggling:** each click reliably lands on the opposite theme with no
  stuck/skipped states; the transition does not stack or visibly glitch on fast repeated
  clicks.

---

## 9. Acceptance Criteria

- [ ] A `ThemeToggle` button is present and functional on Home, Portfolio, Links, Contact,
      Login, and Back Office. (FR-01)
- [ ] No component renders a theme-relevant hardcoded color outside the existing CSS custom
      properties. (FR-02)
- [ ] Toggling the theme updates the visible color scheme everywhere the base tokens are
      used. (FR-02)
- [ ] The chosen theme is written to `localStorage` and reapplied on reload/return visit
      without a further toggle. (FR-03)
- [ ] A first-time visitor sees the theme matching their OS `prefers-color-scheme` setting.
      (FR-04)
- [ ] After an explicit toggle, the chosen theme overrides the OS setting in both directions
      (forcing light on a dark OS, and dark on a light OS). (FR-04)
- [ ] Switching themes animates smoothly, unless `prefers-reduced-motion: reduce` is set, in
      which case the change is instant. (FR-05)
- [ ] Login, Back Office's non-glass chrome, and the plain sections of Portfolio/Links/
      Contact are legible and correctly styled in both themes. (FR-06)
- [ ] Glass/video-backed panels (Navbar, Footer, Home sections) remain visually unchanged
      between themes, per the documented exception, and this is not flagged as a defect.
      (FR-06 / §2 Feature-Specific Constraints)
- [ ] An invalid or missing `localStorage` value falls back to the OS default without
      crashing or rendering unstyled content. (§7 Validation)
