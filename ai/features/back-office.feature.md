# Feature Specification — [Feature Name]

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

<!--
HOW TO COMPLETE THIS TEMPLATE

- Copy this file once per feature and rename it, for example `login.feature.md`.
- Replace every `[...]` placeholder with content taken from the project
  requirements and your own analysis.
- Instructions live in HTML comments like this one and stay invisible when the
  Markdown is rendered. Delete each comment once its section is complete.
- Write `N/A` for a subsection that genuinely does not apply to this feature
  (a back-end-only feature has no page, for example). Do not invent content to
  fill a heading.
- Golden rule: if a rule is true for the whole project, it belongs in
  `ai-spec.md`, not here.
-->

- **Feature Name:** [name]
- **Related Area:** [e.g. front-end, back-end, full-stack, database]

---

## 1. Feature Goal

<!--
Describe the outcome this feature must provide: what capability is added, who or
what uses it, and what result they get. Two or three sentences are enough.
Describe what the feature achieves, not how it will be coded - no file names,
no libraries, no implementation steps.
-->

[feature goal]

---

## 2. Feature Scope

<!--
Scope draws the boundary of this feature. It answers "what is this feature
responsible for, and what is deliberately left out?"
Stay at feature level: do not restate the project scope from `ai-spec.md`.
-->

### In Scope

<!--
What this feature must deliver. One line per item.
-->

- [item]
- [item]

### Out of Scope

<!--
Related behaviour that could look like part of this feature but is intentionally
excluded. Name where it lives instead when you know (another feature, a later
step, or nowhere yet).
-->

- [excluded item]
- [excluded item]

### Feature-Specific Constraints

<!--
Only constraints that apply to this feature and are NOT already in `ai-spec.md`,
including any explicit exception to a global rule. Write `N/A` if there are none
- that is the normal case.
Example: "This feature must work without JavaScript enabled."
-->

- [constraint, or N/A]

---

## 3. Requirements

### Functional Requirements

<!--
Break the feature into small, explicit, testable requirements. Each one states a
single capability, rule or behaviour that the feature must provide.

- Keep one idea per requirement; split it if it contains "and" twice.
- Number them FR-01, FR-02, ... and never renumber later: the IDs are referenced
  by the acceptance criteria in section 9.
- Requirements say WHAT must happen, not HOW to build it.
- Requirements define the expected behaviour; section 9 defines how that
  behaviour is verified. Every requirement must be verifiable by at least one
  acceptance criterion.

Copy the block below for each requirement.
Example requirement: "The user can submit the form only when all required fields
are valid."
-->

### FR-01 — [Requirement Title]

**Requirement:**
[What the feature must do.]

**Expected Result:**
[The observable result once this requirement is met.]

### FR-02 — [Requirement Title]

**Requirement:**
[What the feature must do.]

**Expected Result:**
[The observable result once this requirement is met.]

---

## 4. User Flow

<!--
Describe the expected sequence of events from the user's (or the calling
system's) point of view: where the interaction starts, what action is taken, what
the system does in response, what the user sees or receives, and where it ends.

Numbered steps, behaviour only - no functions, no code.
Add an alternate flow below only when the feature has a meaningful second path
(for example an invalid input or a failed request); otherwise write `N/A`.
-->

**Main flow**

1. [step]
2. [step]
3. [step]

**Alternate / failure flow**

1. [step, or N/A]

---

## 5. Interfaces Involved

<!--
Lists where this feature touches the application, so nobody has to guess which
page, component or endpoint is concerned.
Identify existing interfaces and the new ones this feature introduces; mark which
is which. Do not restate the repository structure from `ai-spec.md`.
Write `N/A` for a category the feature does not use.
-->

### Pages

<!--
Route or file path, plus what the page does for this feature.
Example: `/contact` - displays the contact form.
-->

- [route/path] - [role in this feature]

### Components

<!--
Component or module name, plus its responsibility inside this feature.
-->

- [name] - [responsibility]

### Endpoints

<!--
HTTP method, path, and purpose. Request and response content is described in
section 6, so keep this line short.
-->

- [METHOD] `[/path]` - [purpose]

---

## 6. Data

<!--
Document the data this feature receives, returns, stores or modifies. Name the
fields, and their type or format when it matters (date format, id, number vs
text). Keep it readable - only include a full schema if this feature actually
depends on one.
Do not invent data that the project requirements do not mention.
-->

### Inputs

<!--
Data entering the feature: form fields, request body or parameters, uploaded
files, values read from storage.
Example: `email` (text, required) - submitted by the contact form.
-->

- [field] ([type/format]) - [source]

### Outputs / Returned Data

<!--
Data the feature produces: response payload, values displayed on screen, status
codes. Describe the shape, not the serialization details.
-->

- [field or response element] ([type/format]) - [where it goes]

### Stored / Modified Data

<!--
What this feature creates, updates or deletes in persistent storage, and where.
Write `N/A` if the feature stores nothing.
-->

- [what is stored or changed, or N/A]

---

## 7. Validation

<!--
Validation rules that are specific to this feature: required values, accepted
formats, ranges and limits, invalid conditions, and any business rule that must
hold before the operation is accepted.

For each rule, state what is checked, where it is checked (client, server, or
both), and what happens when the check fails. The rule must be precise enough
that another developer can tell whether the implementation is correct.
Do not repeat global validation conventions already defined in `ai-spec.md`.

Example: "Email: required, must contain '@'; if invalid, the form is not
submitted and a message appears next to the field."
-->

- **[field or condition]:** [rule] - checked on [client/server/both] - on failure: [result]
- **[field or condition]:** [rule] - checked on [client/server/both] - on failure: [result]

---

## 8. Expected Behavior

<!--
Describes what the system does, as observed from outside. Section 3 states the
requirements; this section states the resulting behaviour in each situation.
Cover only the cases that are real for this feature - do not invent artificial
edge cases for a simple feature. Write `N/A` where a subsection does not apply.
-->

### Success Behavior

<!--
What happens when everything works: what the user sees, what is returned, what
changes in the application state.
-->

- [behaviour]

### Error / Invalid Behavior

<!--
What happens when input is invalid, required data does not exist, or a request
fails: what the user is told, and what the system does or does not change.
-->

- [behaviour]

### Empty / Edge Cases

<!--
Feature-specific situations that are neither success nor error: no results to
display, first use with no data yet, a limit being reached.
-->

- [behaviour, or N/A]

---

## 9. Acceptance Criteria

<!--
Acceptance criteria answer one question: how can someone objectively verify that
this feature works?

- Each criterion must be observable and testable, manually or automatically.
- Write results to verify, not implementation steps.
- Ban subjective wording such as "works properly" or "looks good".
- Reference the requirement each criterion verifies, for example (FR-01).
- Do not introduce new requirements here: everything verified must already be
  described in sections 3 to 8.
- The Global Definition of Done in `ai-spec.md` also applies and is not repeated
  here.

Example: "Submitting the form with an empty email displays an error message and
sends no request. (FR-02)"
-->

- [ ] [verifiable condition] ([FR-01])
- [ ] [verifiable condition] ([FR-02])
