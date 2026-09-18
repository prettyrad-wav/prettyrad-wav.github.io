// Static content for the Links page (ai-spec.md §5, "Static content as
// data"). Links.jsx maps over this array instead of repeating card JSX per
// entry — see link-page.feature.md § Data.
//
// title/description/alt are locale-keyed objects ({ en, fr, es, de }), per
// languages.feature.md FR-04 — LinkCard reads them through the active
// language via i18n/LanguageContext's localize(). url stays a plain value.

// AI-generated (ChatGPT) retro-style logo icons — see link-page.feature.md
// FR-04 and CONCEPTS.md for the tool note.
import githubIcon from '../../assets/github-retro.png'
import codeboxxIcon from '../../assets/cdbxx-retro.png'
import odinIcon from '../../assets/retro-odin.png'

export const links = [
  {
    id: 'github',
    title: { en: 'GitHub', fr: 'GitHub', es: 'GitHub', de: 'GitHub' },
    description: {
      en: "My GitHub profile, home to projects from my early days learning with The Odin Project as well as my CodeBoxx Academy coursework.",
      fr: 'Mon profil GitHub, qui rassemble des projets de mes débuts d’apprentissage avec The Odin Project ainsi que mes travaux de la CodeBoxx Academy.',
      es: 'Mi perfil de GitHub, hogar de proyectos de mis primeros días aprendiendo con The Odin Project, así como de mis trabajos de la CodeBoxx Academy.',
      de: 'Mein GitHub-Profil, die Heimat von Projekten aus meinen frühen Lerntagen mit The Odin Project sowie meiner Kursarbeiten der CodeBoxx Academy.',
    },
    url: 'https://github.com/prettyrad-wav',
    image: githubIcon,
    alt: {
      en: 'Retro-style GitHub logo icon',
      fr: 'Icône du logo GitHub de style rétro',
      es: 'Icono del logotipo de GitHub de estilo retro',
      de: 'GitHub-Logo-Symbol im Retro-Stil',
    },
  },
  {
    id: 'codeboxx-academy',
    title: {
      en: 'CodeBoxx Academy',
      fr: 'CodeBoxx Academy',
      es: 'CodeBoxx Academy',
      de: 'CodeBoxx Academy',
    },
    description: {
      en: 'The full-stack coding bootcamp I am currently finishing, which taught me the skills used to build this portfolio site.',
      fr: 'Le bootcamp de développement full-stack que je termine actuellement, qui m’a enseigné les compétences utilisées pour construire ce site de portfolio.',
      es: 'El bootcamp de programación full-stack que estoy terminando actualmente, que me enseñó las habilidades usadas para construir este sitio de portafolio.',
      de: 'Das Full-Stack-Coding-Bootcamp, das ich derzeit abschließe und das mir die Fähigkeiten vermittelt hat, mit denen diese Portfolio-Website gebaut wurde.',
    },
    url: 'https://academy.codeboxx.com/',
    image: codeboxxIcon,
    alt: {
      en: 'Retro-style CodeBoxx Academy logo icon',
      fr: 'Icône du logo CodeBoxx Academy de style rétro',
      es: 'Icono del logotipo de CodeBoxx Academy de estilo retro',
      de: 'CodeBoxx-Academy-Logo-Symbol im Retro-Stil',
    },
  },
  {
    id: 'the-odin-project',
    title: {
      en: 'The Odin Project',
      fr: 'The Odin Project',
      es: 'The Odin Project',
      de: 'The Odin Project',
    },
    description: {
      en: "The free, project-based curriculum I used to first start learning to code, whose teaching style complements CodeBoxx Academy's and made my first weeks in the bootcamp easier.",
      fr: 'Le programme gratuit basé sur des projets que j’ai utilisé pour commencer à apprendre à coder, dont le style pédagogique complète celui de la CodeBoxx Academy et a facilité mes premières semaines de bootcamp.',
      es: 'El plan de estudios gratuito y basado en proyectos que usé para empezar a aprender a programar, cuyo estilo de enseñanza complementa al de CodeBoxx Academy y facilitó mis primeras semanas en el bootcamp.',
      de: 'Der kostenlose, projektbasierte Lehrplan, mit dem ich das Programmieren zu lernen begann und dessen Lehrstil den der CodeBoxx Academy ergänzt und mir die ersten Wochen im Bootcamp erleichtert hat.',
    },
    url: 'https://www.theodinproject.com/',
    image: odinIcon,
    alt: {
      en: 'Retro-style The Odin Project logo icon',
      fr: 'Icône du logo The Odin Project de style rétro',
      es: 'Icono del logotipo de The Odin Project de estilo retro',
      de: 'The-Odin-Project-Logo-Symbol im Retro-Stil',
    },
  },
]
