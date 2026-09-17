// Static content for the Links page (ai-spec.md §5, "Static content as
// data"). Links.jsx maps over this array instead of repeating card JSX per
// entry — see link-page.feature.md § Data.

// AI-generated (ChatGPT) retro-style logo icons — see link-page.feature.md
// FR-04 and CONCEPTS.md for the tool note.
import githubIcon from '../../assets/github-retro.png'
import codeboxxIcon from '../../assets/cdbxx-retro.png'
import odinIcon from '../../assets/retro-odin.png'

export const links = [
  {
    id: 'github',
    title: 'GitHub',
    description:
      "My GitHub profile, home to projects from my early days learning with The Odin Project as well as my CodeBoxx Academy coursework.",
    url: 'https://github.com/prettyrad-wav',
    image: githubIcon,
    alt: 'Retro-style GitHub logo icon',
  },
  {
    id: 'codeboxx-academy',
    title: 'CodeBoxx Academy',
    description:
      'The full-stack coding bootcamp I am currently finishing, which taught me the skills used to build this portfolio site.',
    url: 'https://academy.codeboxx.com/',
    image: codeboxxIcon,
    alt: 'Retro-style CodeBoxx Academy logo icon',
  },
  {
    id: 'the-odin-project',
    title: 'The Odin Project',
    description:
      "The free, project-based curriculum I used to first start learning to code, whose teaching style complements CodeBoxx Academy's and made my first weeks in the bootcamp easier.",
    url: 'https://www.theodinproject.com/',
    image: odinIcon,
    alt: 'Retro-style The Odin Project logo icon',
  },
]
