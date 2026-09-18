// Static content for the Portfolio page's Education section (ai-spec.md §5,
// "Static content as data"). Facts sourced from the EDUCATION section of
// m16-binder/resume.md (portfolio-page.feature.md FR-01). Ordered most
// recent first. Logos are AI-generated (ChatGPT) — see
// portfolio-page.feature.md FR-06 and CONCEPTS.md for the tool note.
//
// institution/program/logoAlt are locale-keyed objects ({ en, fr, es, de }),
// per languages.feature.md FR-04 — EducationEntry reads them through the
// active language via i18n/LanguageContext's localize(). location/dates are
// proper nouns/date ranges and stay plain strings.

import cdbxxLogo from '../../assets/cdbxx-retro.png'
import triCountyLogo from '../../assets/tri-county-retro.png'

export const educationEntries = [
  {
    id: 'codeboxx',
    institution: {
      en: 'CodeBoxx Academy',
      fr: 'CodeBoxx Academy',
      es: 'CodeBoxx Academy',
      de: 'CodeBoxx Academy',
    },
    program: {
      en: 'Full-Stack Development Program',
      fr: 'Programme de développement full-stack',
      es: 'Programa de desarrollo full-stack',
      de: 'Full-Stack-Entwicklungsprogramm',
    },
    dates: 'June 2026 – September 2026',
    logoSrc: cdbxxLogo,
    logoAlt: {
      en: 'Retro synthwave-style logo for CodeBoxx Academy',
      fr: 'Logo rétro de style synthwave pour CodeBoxx Academy',
      es: 'Logotipo retro estilo synthwave de CodeBoxx Academy',
      de: 'Retro-Synthwave-Logo für die CodeBoxx Academy',
    },
  },
  {
    id: 'tri-county',
    institution: {
      en: 'Tri-County RVTHS',
      fr: 'Tri-County RVTHS',
      es: 'Tri-County RVTHS',
      de: 'Tri-County RVTHS',
    },
    location: 'Bellingham, Massachusetts',
    program: {
      en: 'High School Diploma',
      fr: 'Diplôme d’études secondaires',
      es: 'Diploma de escuela secundaria',
      de: 'Highschool-Abschluss',
    },
    dates: '2012 – 2016',
    logoSrc: triCountyLogo,
    logoAlt: {
      en: 'Retro synthwave-style logo for Tri-County RVTHS',
      fr: 'Logo rétro de style synthwave pour Tri-County RVTHS',
      es: 'Logotipo retro estilo synthwave de Tri-County RVTHS',
      de: 'Retro-Synthwave-Logo für die Tri-County RVTHS',
    },
  },
]
