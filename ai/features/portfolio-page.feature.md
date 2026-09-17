# Feature Specification — Portfolio Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Portfolio Page
- **Related Area:** Front-end (page content)

---

## 1. Feature Goal

Give a visitor a detailed record of Nick Hobbs's education, work history, and project work —
each in reverse-chronological order with enough detail to judge his experience — plus a
one-click way to download his resume as a PDF, so a hiring manager or recruiter can verify his
background and take a copy of it away with them.

---

## 2. Feature Scope

### In Scope

- The Portfolio page content rendered inside the shared `Main` layout, reached via the header/
  mobile nav (`activePage === 'portfolio'`, no path change per `ai-spec.md` §4).
- An education section: institution entries in reverse chronological order, each with
  institution name, degree/program, and dates.
- A work experience section: job entries in reverse chronological order, each with title/role,
  organization, dates, and a description that mentions responsibilities or achievements.
- A projects section: project entries, each with project name, tech used, a description of what
  the project is and its purpose, and an image.
- A downloadable PDF version of the resume, linked/buttoned somewhere on this page.
- Clear visual separation between the page's sections (spacing, background, or dividers).
- At least 2 AI-generated images used within this page's content, with the AI tool documented.

### Out of Scope

- The header, footer, and the `Main` layout wrapper itself (nav links, logo, sticky
  positioning, footer contact info, background video) — specified in
  `header-footer.feature.md`.
- Home page content (introduction, technical/soft skills) — `home-page.feature.md`.
- Links and Contact page content — `link-page.feature.md`, `contact-page.feature.md`.
- Hosting or generating the PDF file itself beyond linking the existing asset — the resume PDF
  (`src/assets/Resume-9:26.pdf`) is an authored deliverable, not something this feature builds.
- Any routing/navigation mechanics beyond "this content renders when `activePage === 'portfolio'`"
  — owned by `Main`/`Navbar`, see `header-footer.feature.md`.
- Tijuana Flats (line cook/prep cook, June 2022 – March 2023) is intentionally omitted from the
  Work Experience section (see Feature-Specific Constraints below) — it still exists as a fact
  on `m16-binder/resume.md` and the downloadable PDF, just not rendered as a work entry on this
  page.

### Feature-Specific Constraints

- **Legibility over the background video:** because `Main` renders a looping video behind all
  page content (see `header-footer.feature.md`), every section on this page must remain
  readable on top of it — text needs sufficient contrast (a semi-opaque section background,
  text shadow, or similar) rather than assuming a plain solid page background.
- **Real facts, original wording — not a copy-paste of `m16-binder/resume.md`:** institution
  names, degrees, dates, job titles, organizations, employment dates, and project details are
  facts drawn from `m16-binder/resume.md` and must stay accurate to it. The prose describing
  each entry (job descriptions, project descriptions) must be written fresh for this page in the
  site's own voice — it must **not** reuse the resume's sentences verbatim or near-verbatim.
  Lorem-ipsum or other placeholder text is also **not** acceptable (Global Definition of Done,
  `ai-spec.md` §6, item 1). The wording samples given under FR-02 and FR-03 below are
  illustrative starting points, not text to copy in as final copy — rephrase them before they
  ship.
- **Tijuana Flats excluded from Work Experience:** the resume lists four jobs, but this page's
  Work Experience section renders only three — Pier Teaki, Climate Design, and Victory
  Mechanical — in that reverse-chronological order. Tijuana Flats is deliberately left out per
  the site owner's decision.
- **Visual consistency with the Home page:** the Portfolio page must look like the same site as
  Home, not a differently-styled page bolted on. It reuses the same section-card treatment
  (background/opacity over the video, spacing rhythm, border/divider style), typography scale,
  color palette, and icon/image sizing established by `home-page.feature.md`'s technical/soft
  skills cards. Where this feature calls for a "card" or "section" (education entries, work
  entries, project cards), it means the same visual component pattern Home uses for its skill
  cards — not a new, separately-designed layout. A visitor moving from Home to Portfolio should
  experience one cohesive design, not two different-looking sites.

---

## 3. Requirements

### FR-01 — Education Section

**Requirement:**
The page displays an education section listing at least one educational institution, each entry
showing institution name, degree/program, and dates, in reverse chronological order (most recent
first). Content sourced from the "EDUCATION" section of `m16-binder/resume.md`.

**Expected Result:**
Two education entries are visible, most recent first:

1. **CodeBoxx Academy** — Full-Stack Development Program — June – September 2026. Institution
   logo: `src/assets/cdbxx-retro.png`.
2. **Tri-County RVTHS**, Bellingham, Massachusetts — High School Diploma — 2012 – 2016.
   Institution logo: `src/assets/tri-county-retro.png`.

### FR-02 — Work Experience Section

**Requirement:**
The page displays a work experience section listing at least one job, each entry showing
title/role, organization, dates, and a description that mentions responsibilities or
achievements, in reverse chronological order (most recent first). Per the Feature-Specific
Constraints above, this section lists exactly three entries — Pier Teaki, Climate Design, and
Victory Mechanical — omitting Tijuana Flats.

**Expected Result:**
Three work entries are visible, most recent first, each with a description rewritten in original
wording (see Feature-Specific Constraints, § 2) that covers the responsibilities/achievements
noted below — not copied verbatim from the resume:

1. **Bartender** — Pier Teaki, St. Petersburg, Florida — March 2023 – Present. Description
   covers: making drinks and serving bar guests and servers, taking food and drink orders, and
   keeping the bar stocked (prepping fruit, batching pre-made cocktails). Icon:
   `src/assets/shaker-ai.png`.
2. **Residential Service Technician** — Climate Design, Clearwater, Florida — February 2021 –
   February 2022. Description covers: diagnosing and repairing residential HVAC systems and
   performing regular maintenance on them. Icon: `src/assets/ac-ai.png`.
3. **Commercial Service Technician** — Victory Mechanical, Bellingham, Massachusetts — June 2015
   – November 2020. Description covers: diagnosing and repairing commercial HVAC systems and
   performing regular maintenance checks on commercial equipment. Icon: `src/assets/ac-ai.png`.

### FR-03 — Projects Section

**Requirement:**
The page displays a projects section listing at least one project, each entry showing project
name, tech used, a description of what the project is and its purpose, and an image. Content
sourced from the "PROJECTS" section of `m16-binder/resume.md`.

**Expected Result:**
At least 2 project entries are visible, each with a description rewritten in original wording
(see Feature-Specific Constraints, § 2) that covers what the project is and its purpose — not
copied verbatim from the resume:

1. **CodeBloggs** — MongoDB, Express, React, Node.js (MERN stack). Description covers: a
   full-stack social blogging platform for developers where users register, log in, post short
   "bloggs," like and comment on posts, and browse a directory of other users. Links to
   `https://github.com/prettyrad-wav/Fullstack_Codebloggs`. Image: `src/assets/codebloggs/cd-ai.png`.
2. **Rocket Delivery** — React Native, Expo, Spring Boot, MySQL. Description covers: a
   food-ordering mobile app (React Native + Expo front end, Spring Boot backend) where a single
   login can hold a Customer role, a Courier role, or both — customers browse restaurants and
   place orders while couriers accept deliveries and advance order status. Links to
   `https://github.com/prettyrad-wav/rdelivery-m14`. Image: `src/assets/rdelivery/rdelivery-ai.png`.

### FR-04 — Downloadable Resume PDF

**Requirement:**
The page provides a way to download a PDF version of the resume/CV.

**Expected Result:**
A visibly labeled link or button (e.g. "Download Resume") is present on the Portfolio page.
Clicking/tapping it downloads or opens `src/assets/Resume-9:26.pdf` (served from the built app's
asset output) in a new tab, without navigating the visitor away from the SPA's single URL.

### FR-05 — Section Layout & Visual Separation

**Requirement:**
The page is organized into at least 3 distinct visual sections (education, work experience,
projects), each visually separated from the next by spacing, a background change, or a divider.

**Expected Result:**
Scrolling the Portfolio page shows a visitor moving through clearly bounded sections — no two
sections visually blend into one continuous, unbroken block of content.

### FR-06 — AI-Generated Images

**Requirement:**
At least 2 images on the Portfolio page are AI-generated, complementing the resume content
(institution logos, work-experience icons, project imagery). Each image has relevant,
descriptive `alt` text, and the AI tool used to generate them is documented (comment near the
image import, and/or noted in `CONCEPTS.md`).

All 6 images used across this page's sections are AI-generated (generated with ChatGPT),
exceeding the 2-image minimum:

- `src/assets/cdbxx-retro.png` — CodeBoxx Academy education entry logo.
- `src/assets/tri-county-retro.png` — Tri-County RVTHS education entry logo.
- `src/assets/shaker-ai.png` — Pier Teaki work experience entry icon.
- `src/assets/ac-ai.png` — Climate Design work experience entry icon (also reused for Victory
  Mechanical, since both are HVAC-technician roles).
- `src/assets/codebloggs/cd-ai.png` — CodeBloggs project entry image.
- `src/assets/rdelivery/rdelivery-ai.png` — Rocket Delivery project entry image.

**Expected Result:**
All 6 images above are recognizably AI-generated artwork, thematically relevant to the entry
they illustrate, each with non-empty descriptive `alt` text (e.g. "Retro-style CodeBoxx Academy
logo"), and a comment or `CONCEPTS.md` entry names ChatGPT as the generation tool.

---

## 4. User Flow

**Main flow**

1. A visitor navigates to the Portfolio page from the header/mobile nav.
2. The Portfolio page renders inside `Main`: education section first, then work experience, then
   projects, each visually separated.
3. The visitor reads institution, degree, and dates in the education section.
4. The visitor scrolls to read job title, organization, dates, and description for each work
   entry.
5. The visitor scrolls to see project entries (name, tech, description, image), optionally
   following a project's link to its GitHub repo (opens in a new tab).
6. The visitor clicks the "Download Resume" control to open/download the resume PDF.
7. The visitor uses the header/footer nav to move on to another page.

**Alternate / failure flow**

N/A — this feature has no form input or Supabase call; content renders from static, in-codebase
data, and the resume download is a static file link.

---

## 5. Interfaces Involved

### Pages

- Portfolio (`activePage === 'portfolio'` inside `Main`, no URL path change per `ai-spec.md`
  §4) — renders this feature's content. Existing file: `src/pages/Portfolio.jsx` (currently a
  placeholder).

### Components

- `Portfolio` (`src/pages/Portfolio.jsx`) - existing, to be built out. Composes the education,
  work experience, and projects sections for this page.
- `EducationSection` (new, e.g. `src/components/portfolio/EducationSection.jsx`) - renders a
  titled list of `EducationEntry` items in reverse chronological order.
- `EducationEntry` (new, e.g. `src/components/portfolio/EducationEntry.jsx`) - renders one
  institution's logo, name, degree/program, and dates.
- `WorkExperienceSection` (new, e.g. `src/components/portfolio/WorkExperienceSection.jsx`) -
  renders a titled list of `WorkEntry` items in reverse chronological order.
- `WorkEntry` (new, e.g. `src/components/portfolio/WorkEntry.jsx`) - renders one job's icon,
  title/role, organization, dates, and description.
- `ProjectsSection` (new, e.g. `src/components/portfolio/ProjectsSection.jsx`) - renders a titled
  grid/list of `ProjectCard` items.
- `ProjectCard` (new, e.g. `src/components/portfolio/ProjectCard.jsx`) - renders one project's
  image, name, tech list, description, and repo link.
- `ResumeDownloadButton` (new, e.g. `src/components/portfolio/ResumeDownloadButton.jsx`) -
  renders the labeled control that links to the resume PDF asset.

### Endpoints

N/A — this feature makes no network or Supabase calls; all content and the resume file are
static.

---

## 6. Data

### Inputs

N/A — no user input. Per `ai-spec.md` §5 ("Static content as data"), education, work experience,
and project entries are plain JS data structures co-located with/imported by `Portfolio.jsx`
(e.g. `educationEntries`, `workEntries`, and `projectEntries` arrays of objects), mapped over to
render each section — not hardcoded, repeated JSX per entry. The facts in these data structures
(names, dates, titles, tech) come from `m16-binder/resume.md`; the description text is original
wording written for this page per the Feature-Specific Constraint in § 2 — not lorem ipsum,
placeholder text, or resume sentences copied verbatim.

### Outputs / Returned Data

- Rendered education entries (logo, institution, degree/program, dates) - displayed in the
  education section, most recent first.
- Rendered work experience entries (icon, title/role, organization, dates, description) -
  displayed in the work experience section, most recent first.
- Rendered project entries (image, name, tech, description, repo link) - displayed in the
  projects section.
- A resume download control - displayed once on the page, resolving to
  `src/assets/Resume-9:26.pdf`.

### Stored / Modified Data

N/A — this feature reads and writes no persistent storage.

---

## 7. Validation

- **Minimum entry counts:** the education array must contain at least 1 entry, the work
  experience array at least 1 entry, and the projects array at least 1 entry - checked at code
  review (client, since it's static data) - on failure: add entries to the relevant data array
  before the feature is done.
- **Reverse chronological order:** education entries and work entries must each be ordered most
  recent first (by end date, or start date for the current role) - checked at code review
  (client) - on failure: reorder the array.
- **Required fields per entry:** every education entry has institution, degree/program, and
  dates; every work entry has title/role, organization, dates, and a description that names a
  responsibility or achievement (not a placeholder like "TBD"); every project entry has name,
  tech, description, and image - checked at code review (client) - on failure: fill in the
  missing field before the feature is done.
- **Description text is original, not copied from the resume:** no work or project description
  in the data structures may be a verbatim or near-verbatim (same sentence structure, only minor
  word swaps) copy of a `m16-binder/resume.md` sentence - checked at code review by comparing
  the rendered copy against `resume.md` (client) - on failure: rewrite the description in the
  site's own voice, keeping only the underlying facts.
- **AI image `alt` text:** each AI-generated image's `alt` attribute must be a non-empty string
  describing the image's content/theme, not a filename or empty string - checked visually / via
  accessibility audit (client) - on failure: update the `alt` attribute.
- **Resume link resolves:** the "Download Resume" control's `href` must resolve to a served copy
  of `src/assets/Resume-9:26.pdf` in both `npm run dev` and the built `dist/` output - checked
  manually in both modes (client) - on failure: fix the asset import/path.
- **Section count:** the page must render at least 3 visually distinct sections (education, work
  experience, projects) - checked at code review / visual inspection (client) - on failure: add
  spacing, background, or divider styling until sections read as distinct.

---

## 8. Expected Behavior

### Success Behavior

- The Portfolio page renders with education, work experience, and projects sections in that
  order, each remaining legible over the shared background video.
- Education entries display CodeBoxx Academy before Tri-County RVTHS.
- Work experience entries display Pier Teaki, then Climate Design, then Victory Mechanical
  (Tijuana Flats omitted).
- Project entries display CodeBloggs and Rocket Delivery, each with image, tech, and a
  purpose-explaining description.
- Clicking "Download Resume" opens/downloads the resume PDF successfully.
- All 6 AI-generated (ChatGPT) images are visible in their respective sections with descriptive
  `alt` text.
- Cards, typography, colors, and spacing match the visual language established on the Home page,
  so the two pages read as one cohesive site.

### Error / Invalid Behavior

N/A — there is no user input or network call in this feature that can fail; content and the
resume file always resolve from static, in-codebase assets.

### Empty / Edge Cases

- **Narrow viewports:** education, work, and project entries stack to a single column and text
  wraps rather than overflowing or forcing horizontal scroll (per the global responsive rules in
  `ai-spec.md`/`header-footer.feature.md`).
- **Long descriptions:** entry/card height grows to fit the content rather than clipping or
  overlapping neighboring entries.

---

## 9. Acceptance Criteria

- [ ] The education section lists CodeBoxx Academy and Tri-County RVTHS, in that order, each with
      institution name, degree/program, dates, and logo. (FR-01)
- [ ] The work experience section lists exactly Pier Teaki, Climate Design, and Victory
      Mechanical, in that order, each with title/role, organization, dates, and a description
      mentioning responsibilities or achievements. (FR-02)
- [ ] The projects section lists at least CodeBloggs and Rocket Delivery, each with project name,
      tech, a purpose-explaining description, and an image. (FR-03)
- [ ] A "Download Resume" control on the page opens/downloads `Resume-9:26.pdf`. (FR-04)
- [ ] The page shows at least 3 visually separated sections (education, work experience,
      projects). (FR-05)
- [ ] All 6 images (`cdbxx-retro.png`, `tri-county-retro.png`, `shaker-ai.png`, `ac-ai.png`,
      `cd-ai.png`, `rdelivery-ai.png`) are AI-generated (ChatGPT), each with descriptive `alt`
      text, and the generation tool is documented in a code comment or `CONCEPTS.md`. (FR-06)
- [ ] All Portfolio page text remains readable over the shared background video at both desktop
      and mobile widths. (Feature-Specific Constraint, § 2)
- [ ] Education, work, and project entries reuse the Home page's card styling, typography, color
      palette, and spacing rather than introducing a visually distinct design. (Feature-Specific
      Constraint, § 2)
- [ ] Work and project descriptions are original wording that convey the required facts, and are
      not verbatim or near-verbatim copies of `m16-binder/resume.md` sentences. (FR-02, FR-03,
      Feature-Specific Constraint, § 2)
