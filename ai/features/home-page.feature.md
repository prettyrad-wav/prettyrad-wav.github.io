# Feature Specification — Home Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Home Page
- **Related Area:** Front-end (page content)

---

## 1. Feature Goal

Give a visitor landing on the site a first screen that identifies who Nick Hobbs is, what he
does, and why he's worth reading further about — a name, a role/tagline, a short bio, and an
organized look at his technical and soft skills — so a hiring manager or recruiter can form a
first impression within seconds of the page loading, without needing to visit any other page.

---

## 2. Feature Scope

### In Scope

- The Home page content rendered inside the shared `Main` layout at the site root (`/`).
- An introduction section: name, role/tagline, short bio paragraph.
- A technical skills section: at least 3 skills, each with supporting text and an icon,
  organized visually (cards/grid).
- A soft skills / talents section: at least 3 items, each with supporting text and an icon,
  organized visually (cards/grid).
- Clear visual separation between the page's sections (spacing, background, or dividers).
- At least 2 AI-generated images used within this page's content, with the AI tool documented.

### Out of Scope

- The header, footer, and the `Main` layout wrapper itself (nav links, logo, sticky
  positioning, footer contact info) — specified in `header-footer.feature.md`.
- The full-page looped background video — it renders behind every public page via the shared
  `Main` layout, not just Home, so it is specified in `header-footer.feature.md` (§ Global
  Background Video) rather than here. This feature only needs to render correctly on top of
  that background (readable text, no low-contrast sections) — see the Feature-Specific
  Constraints below.
- Portfolio content (education, work history, projects) — `portfolio-page.feature.md`.
- Links and Contact page content — `link-page.feature.md`, `contact-page.feature.md`.
- Any routing/navigation mechanics beyond "this content renders when `activePage === 'home'`" —
  owned by `Main`/`Navbar`, see `header-footer.feature.md`.

### Feature-Specific Constraints

- **Legibility over the background video:** because `Main` renders a looping video behind all
  page content (see `header-footer.feature.md`), every section on this page must remain
  readable on top of it — text needs sufficient contrast (a semi-opaque section background,
  text shadow, or similar) rather than assuming a plain solid page background.
- **Placeholder copy is acceptable during development:** the exact name/role/bio wording and
  the exact skill list are authored content, not requirements. Lorem-ipsum or draft text may
  stand in while building the layout, but must be replaced with real content before this
  feature is considered done (Global Definition of Done, `ai-spec.md` §6, item 1 — the
  checklist's "attention to detail" criteria expect real, proofread copy in the graded
  submission).

---

## 3. Requirements

### FR-01 — Root Path & Default Landing

**Requirement:**
The Home page is what renders at the site root (`https://prettyrad-wav.github.io`, i.e.
`activePage === 'home'` in `Main`) and is the page shown when no other page has been selected.

**Expected Result:**
Loading the site fresh (first visit, hard refresh, or clicking the header logo) shows the Home
page content inside the shared layout, with the URL staying at the root per `ai-spec.md` §4.

### FR-02 — Introduction Section

**Requirement:**
The page displays an introduction section containing the student's name, a role/title or short
tagline, and a brief paragraph introducing who they are.

**Expected Result:**
Nick Hobbs's name is prominently displayed (largest/most emphasized text in the section), a
role or tagline (e.g. "Full-Stack Developer") is visible near the name, and a short paragraph
of bio copy is readable directly below without scrolling past other sections.

### FR-03 — Technical Skills Section

**Requirement:**
The page displays a technical skills section listing at least 3 technical skills. Each skill
has an icon and supporting descriptive text (not a single word/label).

**Expected Result:**
At least 3 technical skill cards/items are visible, each showing an icon plus a sentence or two
describing that skill, laid out in a visually organized grid or card list rather than a bare
text list.

### FR-04 — Soft Skills / Talents Section

**Requirement:**
The page displays a soft skills or talents section listing at least 3 items. Each item has an
icon and supporting descriptive text (not a single word/label).

**Expected Result:**
At least 3 soft-skill cards/items are visible, each showing an icon plus a sentence or two of
supporting text, laid out in a visually organized grid or card list, visually distinct from the
technical skills section.

### FR-05 — Section Layout & Visual Separation

**Requirement:**
The page is organized into at least 3 distinct visual sections (introduction, technical skills,
soft skills), each visually separated from the next by spacing, a background change, or a
divider.

**Expected Result:**
Scrolling the Home page shows a visitor moving through clearly bounded sections — no two
sections visually blend into one continuous, unbroken block of content.

### FR-06 — AI-Generated Technical Skill Icons

**Requirement:**
At least 2 images on the Home page are AI-generated. These are vaporwave/synthwave-styled icons
representing technical skills (e.g. JavaScript, React), used as the icon for their respective
cards in the Technical Skills section (FR-03), matching the site's retro/synthwave visual theme.
Each image has relevant, descriptive `alt` text, and the AI tool used to generate them is
documented (comment near the image import, and/or noted in `CONCEPTS.md`).

**Expected Result:**
At least 2 of the technical skill icons are recognizably AI-generated artwork (not a stock/plain
icon-font glyph), thematically relevant to the skill and the site's retro-road aesthetic, each
with non-empty descriptive `alt` text (e.g. "Vaporwave-style JavaScript logo"), and a comment or
`CONCEPTS.md` entry names the generation tool (e.g. ChatGPT/DALL·E).

---

## 4. User Flow

**Main flow**

1. A visitor loads `https://prettyrad-wav.github.io` (or clicks the header logo from another
   page).
2. The Home page renders inside `Main`: introduction section first, then technical skills, then
   soft skills, each visually separated.
3. The visitor reads the name, role, and bio in the introduction section.
4. The visitor scrolls to see technical skill cards (icon + description) and soft skill cards
   (icon + description).
5. The visitor uses the header/footer nav (outside this feature's scope) to move on to another
   page.

**Alternate / failure flow**

N/A — this feature has no user input, form, or network request; content renders from static,
in-codebase data every time.

---

## 5. Interfaces Involved

### Pages

- `/` (site root, `activePage === 'home'` inside `Main`) — renders this feature's content.
  Existing file: `src/pages/Home.jsx` (currently a placeholder — see inline comment).

### Components

- `Home` (`src/pages/Home.jsx`) - existing, to be built out. Composes the introduction, technical
  skills, and soft skills sections for this page.
- `IntroSection` (new, e.g. `src/components/home/IntroSection.jsx`) - renders name, role/tagline,
  and bio paragraph.
- `SkillsSection` (new, e.g. `src/components/home/SkillsSection.jsx`) - renders a titled grid of
  `SkillCard`s; reused for both the technical and soft skills sections with different data.
- `SkillCard` (new, e.g. `src/components/home/SkillCard.jsx`) - renders one skill's icon plus
  supporting text; shared shape for technical and soft skill entries.

### Endpoints

N/A — this feature makes no network or Supabase calls; all content is static.

---

## 6. Data

### Inputs

N/A — no user input. Per `ai-spec.md` §5 ("Static content as data"), the bio text and skill
entries are plain JS data structures co-located with/imported by `Home.jsx` (e.g. a
`technicalSkills` array and a `softSkills` array of `{ icon, title, description }` objects),
mapped over to render the cards — not hardcoded, repeated JSX per skill.

### Outputs / Returned Data

- Rendered introduction markup (name, role, bio paragraph) - displayed at the top of the Home
  page.
- Rendered technical skill cards (icon, title/label, description) - displayed in the technical
  skills section.
- Rendered soft skill cards (icon, title/label, description) - displayed in the soft skills
  section.

### Stored / Modified Data

N/A — this feature reads and writes no persistent storage.

---

## 7. Validation

- **Minimum skill counts:** the technical skills array and the soft skills array must each
  contain at least 3 entries - checked at code review (client, since it's static data) - on
  failure: add entries to the relevant data array before the feature is done.
- **Supporting text per skill:** each skill/talent entry's `description` must be more than a
  single word (a real phrase or sentence) - checked at code review (client) - on failure:
  expand the entry's description text.
- **AI image `alt` text:** each AI-generated icon's `alt` attribute must be a non-empty string
  describing the image's content/theme, not a filename or empty string - checked visually / via
  accessibility audit (client) - on failure: update the `alt` attribute.
- **Section count:** the page must render at least 3 visually distinct sections (intro,
  technical skills, soft skills) - checked at code review / visual inspection (client) - on
  failure: add spacing, background, or divider styling until sections read as distinct.

---

## 8. Expected Behavior

### Success Behavior

- The Home page is what a visitor sees at the site root, with the introduction section visible
  first.
- All three sections (introduction, technical skills, soft skills) render with their required
  content and remain legible over the shared background video.
- At least 2 AI-generated vaporwave-style icons are visible among the technical skill cards.

### Error / Invalid Behavior

N/A — there is no user input or network call in this feature that can fail; content always
renders from static, in-codebase data.

### Empty / Edge Cases

- **Narrow viewports:** skill card grids collapse to a single column and text wraps rather than
  overflowing or forcing horizontal scroll (per the global responsive rules in
  `ai-spec.md`/`header-footer.feature.md`).
- **Long bio or descriptions:** section height grows to fit the content rather than clipping or
  overlapping the next section.

---

## 9. Acceptance Criteria

- [ ] Loading `https://prettyrad-wav.github.io` (or clicking the header logo) shows the Home
      page as the active page, with the URL unchanged. (FR-01)
- [ ] The introduction section shows Nick Hobbs's name, a visible role/tagline, and a short bio
      paragraph. (FR-02)
- [ ] At least 3 technical skill entries are displayed, each with an icon and a multi-word
      description, in a card/grid layout. (FR-03)
- [ ] At least 3 soft skill/talent entries are displayed, each with an icon and a multi-word
      description, in a card/grid layout. (FR-04)
- [ ] The page shows at least 3 visually separated sections (introduction, technical skills,
      soft skills). (FR-05)
- [ ] At least 2 technical skill icons are AI-generated, vaporwave/synthwave-styled images with
      descriptive `alt` text, and the generation tool is documented in a code comment or
      `CONCEPTS.md`. (FR-06)
- [ ] All Home page text remains readable over the shared background video at both desktop and
      mobile widths. (Feature-Specific Constraint, § 2)
