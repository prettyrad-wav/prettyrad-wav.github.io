# Feature Specification — Links Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Links Page
- **Related Area:** Front-end (page content)

---

## 1. Feature Goal

Give a visitor a quick way to reach the external resources most relevant to Nick's background as
a developer — his GitHub profile and the two learning platforms (CodeBoxx Academy, The Odin
Project) that taught him to build this site — each presented as a clear, self-explanatory card so
a hiring manager or recruiter can jump straight to source code or verify how he was trained.

---

## 2. Feature Scope

### In Scope

- The Links page content rendered inside the shared `Main` layout, reached via the header/mobile
  nav (`activePage === 'links'`, no path change per `ai-spec.md` §4).
- Exactly 3 link cards: GitHub profile, CodeBoxx Academy, The Odin Project.
- Each card's image, title, short description, and clickable URL (opens in a new tab).
- At least 1 AI-generated image used within this page's content (all 3 card images qualify),
  with the AI tool documented.

### Out of Scope

- The header, footer, and the `Main` layout wrapper itself (nav links, logo, sticky positioning,
  footer contact info, background video) — specified in `header-footer.feature.md`.
- Home and Portfolio page content — `home-page.feature.md`, `portfolio-page.feature.md`.
- Generating the AI images themselves (tool selection, prompting) beyond documenting which tool
  produced them.
- Any routing/navigation mechanics beyond "this content renders when `activePage === 'links'`" —
  owned by `Main`/`Navbar`, see `header-footer.feature.md`.

### Feature-Specific Constraints

- **Legibility over the background video:** because `Main` renders a looping video behind all
  page content (see `header-footer.feature.md`), each link card must remain readable on top of
  it — text needs sufficient contrast (a semi-opaque card background, text shadow, or similar)
  rather than assuming a plain solid page background.
- **Visual consistency with Home and Portfolio:** the Links page must look like the same site as
  Home and Portfolio, not a differently-styled page bolted on. It reuses the same card treatment
  (background/opacity over the video, spacing rhythm, border/divider style), typography scale,
  and color palette established by `home-page.feature.md`'s skill cards and
  `portfolio-page.feature.md`'s entries.

---

## 3. Requirements

### FR-01 — Link Card Display

**Requirement:**
The page displays each link as a structured card containing an image, a title/name, a short
description (1–3 sentences), and the link's URL. At least 3 links are displayed.

**Expected Result:**
Exactly 3 link cards are visible, each showing an image, a title, a 1–3 sentence description, and
acting as (or containing) a clickable link to the target URL:

1. **GitHub** — `https://github.com/prettyrad-wav` — description covers: Nick's GitHub profile,
   home to projects from his early days learning with The Odin Project as well as his CodeBoxx
   Academy coursework. Image: `src/assets/github-retro.png`.
2. **CodeBoxx Academy** — `https://academy.codeboxx.com/` — description covers: the full-stack
   coding bootcamp Nick is currently finishing, which taught him the skills used to build this
   portfolio site. Image: `src/assets/cdbxx-retro.png`.
3. **The Odin Project** — `https://www.theodinproject.com/` — description covers: the free,
   project-based curriculum Nick used to first start learning to code, whose teaching style
   complements CodeBoxx Academy's and made his first weeks in the bootcamp easier. Image:
   `src/assets/retro-odin.png`.

### FR-02 — External Links Open in a New Tab

**Requirement:**
Each link card's URL opens in a new browser tab rather than navigating away from the portfolio
site.

**Expected Result:**
Clicking/tapping any of the 3 cards (or their link element) opens the target URL
(`github.com/prettyrad-wav`, `academy.codeboxx.com`, or `theodinproject.com`) in a new tab, and
the portfolio site remains open in the original tab.

### FR-03 — Section Layout & Visual Separation

**Requirement:**
The page organizes its 3 link cards so each is a distinct, structured item rather than a run of
unstyled text/links.

**Expected Result:**
The 3 cards render in a visually organized layout (e.g. a grid or list of equally-styled cards),
each clearly bounded and separated from its neighbors by spacing, a border, or a background
treatment.

### FR-04 — AI-Generated Images

**Requirement:**
At least 1 image on the Links page is AI-generated, and every image has relevant, descriptive
`alt` text with the AI tool used documented (comment near the image import, and/or noted in
`CONCEPTS.md`).

All 3 card images are AI-generated (generated with ChatGPT), exceeding the 1-image minimum:

- `src/assets/github-retro.png` — GitHub card image.
- `src/assets/cdbxx-retro.png` — CodeBoxx Academy card image.
- `src/assets/retro-odin.png` — The Odin Project card image.

**Expected Result:**
All 3 images above are recognizably AI-generated artwork, thematically relevant to the link they
illustrate, each with non-empty descriptive `alt` text (e.g. "Retro-style GitHub logo icon"), and
a comment or `CONCEPTS.md` entry names ChatGPT as the generation tool.

---

## 4. User Flow

**Main flow**

1. A visitor navigates to the Links page from the header/mobile nav.
2. The Links page renders inside `Main`: 3 link cards (GitHub, CodeBoxx Academy, The Odin
   Project) in a structured grid/list.
3. The visitor reads each card's image, title, and short description.
4. The visitor clicks/taps a card (or its link) to open the target URL in a new tab.
5. The original portfolio tab remains open; the visitor can return to it and use the header/
   footer nav to move on to another page.

**Alternate / failure flow**

N/A — this feature has no form input or Supabase call; content renders from static, in-codebase
data, and each link points to a fixed external URL.

---

## 5. Interfaces Involved

### Pages

- Links (`activePage === 'links'` inside `Main`, no URL path change per `ai-spec.md` §4) —
  renders this feature's content. Existing file: `src/pages/Links.jsx` (currently a placeholder).

### Components

- `Links` (`src/pages/Links.jsx`) - existing, to be built out. Composes the link cards section
  for this page.
- `LinkCard` (new, e.g. `src/components/links/LinkCard.jsx`) - renders one link's image, title,
  description, and new-tab URL.

### Endpoints

N/A — this feature makes no network or Supabase calls; all content is static.

---

## 6. Data

### Inputs

N/A — no user input. Per `ai-spec.md` §5 ("Static content as data"), the 3 link entries are a
plain JS data structure co-located with/imported by `Links.jsx` (e.g. a `links` array of
objects: `{ title, description, url, image, alt }`), mapped over to render each card — not
hardcoded, repeated JSX per entry.

### Outputs / Returned Data

- Rendered link cards (image, title, description, clickable URL) - displayed on the Links page,
  one per entry in the `links` data array.

### Stored / Modified Data

N/A — this feature reads and writes no persistent storage.

---

## 7. Validation

- **Minimum link count:** the `links` data array must contain at least 3 entries - checked at
  code review (client, since it's static data) - on failure: add entries before the feature is
  done.
- **Required fields per entry:** every link entry has an image, a title, a 1–3 sentence
  description, and a valid URL - checked at code review (client) - on failure: fill in the
  missing field before the feature is done.
- **New-tab behavior:** every link's anchor element sets `target="_blank"` with
  `rel="noopener noreferrer"` - checked at code review / manual click-through (client) - on
  failure: add the missing attribute(s).
- **AI image `alt` text:** each AI-generated image's `alt` attribute must be a non-empty string
  describing the image's content/theme, not a filename or empty string - checked visually / via
  accessibility audit (client) - on failure: update the `alt` attribute.

---

## 8. Expected Behavior

### Success Behavior

- The Links page renders 3 structured cards — GitHub, CodeBoxx Academy, The Odin Project — each
  remaining legible over the shared background video.
- Each card shows its image, title, and description, and opens its target URL in a new tab when
  clicked/tapped.
- All 3 AI-generated (ChatGPT) images are visible with descriptive `alt` text.
- Cards, typography, colors, and spacing match the visual language established on the Home and
  Portfolio pages, so all pages read as one cohesive site.

### Error / Invalid Behavior

N/A — there is no user input or network call in this feature that can fail; content renders from
static, in-codebase data and fixed external URLs.

### Empty / Edge Cases

- **Narrow viewports:** the 3 link cards stack to a single column and text wraps rather than
  overflowing or forcing horizontal scroll (per the global responsive rules in
  `ai-spec.md`/`header-footer.feature.md`).
- **Long descriptions:** card height grows to fit the content rather than clipping or overlapping
  neighboring cards.

---

## 9. Acceptance Criteria

- [ ] The page displays exactly 3 link cards — GitHub, CodeBoxx Academy, and The Odin Project —
      each with an image, title, 1–3 sentence description, and clickable URL. (FR-01)
- [ ] Clicking/tapping any card opens its target URL in a new tab, leaving the portfolio site open
      in the original tab. (FR-02)
- [ ] The 3 cards render in a visually organized, clearly separated layout rather than plain
      inline text/links. (FR-03)
- [ ] All 3 images (`github-retro.png`, `cdbxx-retro.png`, `retro-odin.png`) are AI-generated
      (ChatGPT), each with descriptive `alt` text, and the generation tool is documented in a code
      comment or `CONCEPTS.md`. (FR-04)
- [ ] All Links page text remains readable over the shared background video at both desktop and
      mobile widths. (Feature-Specific Constraint, § 2)
- [ ] Link cards reuse the Home/Portfolio pages' card styling, typography, color palette, and
      spacing rather than introducing a visually distinct design. (Feature-Specific Constraint,
      § 2)
