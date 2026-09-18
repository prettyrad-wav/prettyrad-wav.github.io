# Feature Specification — Languages (i18n)

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Languages (i18n)
- **Related Area:** Front-end (internationalization) — extra mile

---

## 1. Feature Goal

Let a visitor switch every piece of user-facing text in the site — navigation, headings,
paragraphs, buttons, labels, form/validation copy, and the authored content itself (bio,
skills, education, work history, project descriptions, link descriptions) — between English
and French, with the choice remembered across visits, without changing the layout, routing,
or behavior of any main-requirement feature.

---

## 2. Feature Scope

### In Scope

- A `LanguageContext` (React Context + `useLanguage()` hook) holding the current language
  (`'en'` or `'fr'`) and a setter, wrapping the whole app.
- A `LanguageSwitcher` component rendered on every route, using the same App-level mounting
  approach as `ThemeToggle` (`light-dark-mode.feature.md`), since Login and Back Office
  aren't wrapped by `Main`.
- JSON translation dictionaries for all UI chrome text: `src/i18n/en.json` and
  `src/i18n/fr.json`.
- Extending every existing static data file (`skillsData.js`, `educationData.js`,
  `workData.js`, `projectsData.js`, `linksData.js`, `navLinks.js`) so translatable text
  fields (titles, descriptions, program/institution names, nav labels, and image `alt`
  text) are locale-keyed objects (e.g. `{ en: '...', fr: '...' }`) instead of flat strings,
  read through the active language at render time.
- Persistence of the chosen language in `localStorage`.
- Full translation coverage of every page: Home, Portfolio, Links, Contact, Login, Back
  Office, plus the shared `Navbar` and `Footer`.

### Out of Scope

- Any language beyond English and French.
- Auto-detecting the visitor's browser/OS locale as the initial default — see
  Feature-Specific Constraints; the default is always English unless a preference is
  already stored.
- Translating dynamic, visitor-submitted content: messages entered through the Contact form
  and displayed in Back Office are stored and shown verbatim, in whatever language the
  visitor who wrote them used. Machine-translating runtime user input is out of scope for a
  static site with no backend beyond Supabase.
- Right-to-left layout support (not needed — French is left-to-right, same as English).
- Light/dark theme behavior — see `light-dark-mode.feature.md`.

### Feature-Specific Constraints

- **Default language is English, not OS-detected.** Unlike the theme feature (which
  explicitly must respect `prefers-color-scheme`), the grading requirements for this
  feature list only "support for at least two languages" and "preference persisted in
  `localStorage`" — no OS/browser locale detection is required. To keep scope bounded and
  behavior predictable for graders, the app always starts in English for a visitor with no
  stored preference, even if their browser is configured for French.
- **Extends, rather than violates, `ai-spec.md` §5 "Static content as data."** That
  convention already puts bio/skills/education/work/project/link content in plain JS
  data structures. This feature keeps that structure intact; it only changes translatable
  string fields within those structures from flat strings to `{ en, fr }` objects, so a
  single array remains the one source of truth per section (no risk of an English and a
  French array drifting out of sync in length or order).

---

## 3. Requirements

### FR-01 — Language Switcher On Every Page

**Requirement:**
A `LanguageSwitcher` control is present and operable on every route: Home, Portfolio,
Links, Contact, Login, and Back Office.

**Expected Result:**
A visitor can find and use the switcher from any page, including the two pages with no
header/footer.

### FR-02 — Two Supported Languages via Structured JSON Dictionaries

**Requirement:**
English and French are both fully supported. All UI-chrome copy (not authored
page-content data — see FR-04) lives in `src/i18n/en.json` and `src/i18n/fr.json`, keyed
by matching nested namespaces (e.g. `nav.*`, `home.*`, `contact.validation.*`), so both
files stay structurally parallel and a missing key is easy to spot.

**Expected Result:**
Every chrome string rendered by the app resolves to a key present in both JSON files, in
the visitor's selected language.

### FR-03 — Full UI Chrome Translation Coverage

**Requirement:**
Every piece of interface chrome text — navigation labels, page headings/subheadings,
buttons, form field labels and placeholders, validation and status messages
(success/error), empty states, and footer copy — is sourced from the translation
dictionaries rather than hardcoded in JSX.

**Expected Result:**
Switching language changes every visible chrome string across every page; no interface
label, button, or message is left in the previous language.

### FR-04 — Data-Driven Content Translation

**Requirement:**
The authored content in the static data files — Home's technical/soft skills, Portfolio's
education/work/project entries, Links' link entries, and the shared nav labels — is
translated into French alongside the existing English copy, stored as locale-keyed fields
on the same array entries, and rendered through the active language. Image `alt` text on
these entries is translated as part of the same fields, since it is user-facing text read
by screen readers.

**Expected Result:**
Switching language changes the actual bio/skills/education/work/project/link copy shown on
Home, Portfolio, and Links — not just the surrounding chrome — and screen readers announce
translated `alt` text for the affected images.

### FR-05 — LocalStorage Persistence

**Requirement:**
The chosen language is written to `localStorage` immediately on switch, and read back on
every app load, before or during first paint.

**Expected Result:**
A visitor who switches to French, then reloads or returns later, sees the site in French
without switching again.

### FR-06 — Default Language With No Auto-Detection

**Requirement:**
On a visitor's first visit (no stored preference), the site renders in English regardless
of browser/OS locale, per the Feature-Specific Constraint above.

**Expected Result:**
A first-time visitor with a French-language browser still sees the site in English until
they explicitly switch.

---

## 4. User Flow

**Main flow**

1. A visitor loads the site for the first time. No language is stored, so the site renders
   in English (FR-06).
2. The visitor finds the `LanguageSwitcher` (present on whichever page they're on) and
   selects French.
3. Every chrome string and every piece of authored page content re-renders in French; the
   choice is written to `localStorage`.
4. The visitor navigates to other pages, including Login or Back Office; French persists
   across every route without re-selecting.
5. The visitor closes the tab and returns later (or reloads); the site loads directly in
   French, not back to the English default.

**Alternate / failure flow**

- **`localStorage` is unavailable or the stored value is invalid** (private browsing, quota
  exceeded, an unexpected value): the app falls back to English rather than crashing.
- **A translation key is missing in the active language's JSON file** (e.g. introduced by a
  future edit that updates one file but not the other): the string falls back to the
  English value for that key rather than rendering blank, `undefined`, or the raw key.

---

## 5. Interfaces Involved

### Pages

- All routes: Home, Portfolio, Links, Contact, Login, Back Office — every one renders
  translated chrome, and Home/Portfolio/Links additionally render translated data content.

### Components

- `LanguageContext` (`src/i18n/LanguageContext.jsx`) — new. Provides
  `{ language, setLanguage, t }` via a `useLanguage()` hook (`t(key)` resolves a dotted key
  path against the active JSON dictionary, falling back to English on a miss); reads
  `localStorage` on mount (defaulting to `'en'`) and writes on every change.
- `src/i18n/en.json`, `src/i18n/fr.json` — new. Structurally parallel nested dictionaries
  covering `nav`, `home`, `portfolio`, `links`, `contact` (including `validation`), `login`,
  `backoffice`, and `footer` namespaces.
- `LanguageSwitcher` (`src/components/language/LanguageSwitcher.jsx` + `.css`) — new. A
  simple two-option control (EN/FR) mirroring `ThemeToggle`'s button styling and
  accessibility pattern (`aria-label`, current selection indicated e.g. via
  `aria-current`).
- `App` (`src/App.jsx`) — edited. Wraps its tree in `LanguageContext`'s provider (alongside
  `ThemeContext`, if both extra miles are implemented) and mounts `LanguageSwitcher`
  alongside `SecretAccess`/`ThemeToggle`, so it reaches every route without modifying
  Login or Back Office individually.
- Every page/component currently rendering hardcoded chrome text — `Navbar`, `Footer`,
  `IntroSection`, `SkillsSection`/`SkillCard`, `Portfolio` (header + `EducationSection`/
  `WorkExperienceSection`/`ProjectsSection` and their entry components), `Links`/
  `LinkCard`, `Contact`/`ContactForm`, `Login`/`LoginForm`, `BackOffice`/`MessagesTable`/
  `MessageModal`/`LogoutButton` — edited to call `t('namespace.key')` instead of literal
  strings.
- `skillsData.js`, `educationData.js`, `workData.js`, `projectsData.js`, `linksData.js`,
  `navLinks.js` — edited so translatable fields become `{ en, fr }` objects; the
  components that map over these arrays read `field[language]` (or an equivalent small
  helper) instead of `field` directly.

### Endpoints

N/A — this feature makes no network or Supabase calls; all state lives in `localStorage`
and the bundled JSON/data files.

---

## 6. Data

### Inputs

- The visitor's selection in `LanguageSwitcher`.
- On load: the stored `localStorage` value (if any).

### Outputs / Returned Data

- Every rendered chrome string and every rendered data-content field, resolved in the
  active language.

### Stored / Modified Data

- `localStorage['language']` — `'en'` or `'fr'`. Absent until the visitor's first explicit
  switch (site behaves as English in the meantime); present and authoritative afterward.

---

## 7. Validation

- **Switcher is keyboard-operable and announces state:** real, focusable controls with
  `aria-label`s and the current language indicated to assistive tech - checked via keyboard
  navigation and accessibility audit (client) - on failure: fix markup/ARIA attributes.
- **Invalid or missing `localStorage` value doesn't break rendering:** any value other than
  `'en'`/`'fr'` (or a `localStorage` read that throws) is treated as "no preference stored"
  and falls back to English - checked by manually setting/corrupting the key in DevTools and
  reloading (client) - on failure: add a guard around the stored-value check.
- **Missing translation key falls back, never breaks:** a key present in `en.json` but
  temporarily missing from `fr.json` (or vice versa) renders the English value instead of a
  blank/`undefined`/raw key - checked by deliberately removing a key from one file in a
  local test and switching language (client) - on failure: add fallback logic to `t()`.
- **No layout overflow from longer French strings:** French labels/buttons/nav text that
  run longer than their English equivalents don't cause horizontal overflow or truncated,
  unreadable text at any width, including the `768px` breakpoint - checked by switching to
  French and resizing across breakpoints on every page (client) - on failure: adjust
  CSS (`flex-wrap`, `min-width`, font sizing) for the affected element.

---

## 8. Expected Behavior

### Success Behavior

- The switcher changes every chrome string and every data-content string across every page
  immediately, and persists the choice.
- Screen readers announce translated `alt` text for data-driven images in the active
  language.
- Returning visitors see their last explicitly chosen language, not the English default,
  once they've switched at least once.

### Error / Invalid Behavior

- **`localStorage` throws or is unavailable:** the app still functions in English each
  load (the choice simply doesn't persist for that visitor/session).
- **A translation key is missing in the target language:** the English value for that key
  is shown instead, so no UI element ever renders blank or broken.

### Empty / Edge Cases

- **No stored preference:** defaults to English (FR-06), regardless of browser/OS locale.
- **Multiple tabs open:** a switch in one tab does not live-update other already-open tabs;
  they pick up the new value on their next load — acceptable, not a bug.
- **Very long French strings on narrow viewports:** wrap or shrink rather than overflow,
  consistent with the existing `768px` responsive requirement inherited from
  `ai-spec.md` §5 / `header-footer.feature.md` FR-07.

---

## 9. Acceptance Criteria

- [ ] A `LanguageSwitcher` control is present and functional on Home, Portfolio, Links,
      Contact, Login, and Back Office. (FR-01)
- [ ] `src/i18n/en.json` and `src/i18n/fr.json` exist, are structurally parallel, and cover
      every chrome namespace used by the app. (FR-02)
- [ ] No page or component renders hardcoded chrome text that bypasses the translation
      dictionaries. (FR-03)
- [ ] Switching language updates every visible chrome string (nav, headings, buttons,
      labels, validation/status messages, footer) on every page. (FR-03)
- [ ] Switching language updates the authored content on Home (skills), Portfolio
      (education/work/projects), and Links (link entries), including translated `alt`
      text. (FR-04)
- [ ] The chosen language is written to `localStorage` and reapplied on reload/return visit
      without switching again. (FR-05)
- [ ] A first-time visitor with no stored preference sees the site in English regardless of
      browser/OS locale. (FR-06)
- [ ] An invalid or missing `localStorage` value falls back to English without crashing.
      (§7 Validation)
- [ ] A missing translation key falls back to the English value rather than rendering
      blank or broken. (§7 Validation)
- [ ] Switching to French produces no horizontal overflow or truncated text on any page, at
      both desktop and mobile (≤768px) widths. (§7 Validation)
