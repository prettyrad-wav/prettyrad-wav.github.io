// Static content for the Portfolio page's Education section (ai-spec.md §5,
// "Static content as data"). Facts sourced from the EDUCATION section of
// m16-binder/resume.md (portfolio-page.feature.md FR-01). Ordered most
// recent first. Logos are AI-generated (ChatGPT) — see
// portfolio-page.feature.md FR-06 and CONCEPTS.md for the tool note.

import cdbxxLogo from '../../assets/cdbxx-retro.png'
import triCountyLogo from '../../assets/tri-county-retro.png'

export const educationEntries = [
  {
    id: 'codeboxx',
    institution: 'CodeBoxx Academy',
    program: 'Full-Stack Development Program',
    dates: 'June 2026 – September 2026',
    logoSrc: cdbxxLogo,
    logoAlt: 'Retro synthwave-style logo for CodeBoxx Academy',
  },
  {
    id: 'tri-county',
    institution: 'Tri-County RVTHS',
    location: 'Bellingham, Massachusetts',
    program: 'High School Diploma',
    dates: '2012 – 2016',
    logoSrc: triCountyLogo,
    logoAlt: 'Retro synthwave-style logo for Tri-County RVTHS',
  },
]
