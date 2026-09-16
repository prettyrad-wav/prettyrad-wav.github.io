// Static content for the Home page's skill sections (ai-spec.md §5,
// "Static content as data"). Copy is sourced from m16-binder/resume.md
// (SKILLS/PROJECTS/EXPERIENCE) and the elevator-pitch scripts in
// docs/script-1.md / docs/script-2.md, per home-page.feature.md FR-03/FR-04.
// SkillsSection maps over these arrays instead of repeating card JSX per entry.

import jsIcon from '../../assets/js-icon.png'
import reactJsxIcon from '../../assets/react-jsx-icon.png'
import mernIcon from '../../assets/mern-icon.png'
import javaSpringIcon from '../../assets/java-spring-icon.png'

// Technical skills (FR-03). Icons are AI-generated (ChatGPT) vaporwave/synthwave
// PNGs — see home-page.feature.md FR-06 and CONCEPTS.md for the tool note.
export const technicalSkills = [
  {
    id: 'javascript',
    title: 'JavaScript',
    description:
      'Comfortable building interactive UI logic and application behavior with modern JavaScript (ES6+).',
    iconSrc: jsIcon,
    iconAlt: 'Vaporwave-style JavaScript logo icon',
  },
  {
    id: 'react-jsx',
    title: 'React & JSX',
    description:
      'Builds component-based front ends with React and JSX, including hooks and state management.',
    iconSrc: reactJsxIcon,
    iconAlt: 'Vaporwave-style React and JSX logo icon',
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack',
    description:
      'Built and deployed full-stack applications like CodeBloggs, a social blogging platform, using MongoDB, Express, React, and Node.js end-to-end.',
    iconSrc: mernIcon,
    iconAlt: 'Vaporwave-style MERN stack icon (MongoDB, Express, React, Node.js)',
  },
  {
    id: 'java-spring',
    title: 'Java & Spring Boot',
    description:
      'Developed a Spring Boot backend with a MySQL database for Rocket Delivery, a food-ordering app with a React Native front end.',
    iconSrc: javaSpringIcon,
    iconAlt: 'Vaporwave-style Java and Spring Boot logo icon',
  },
]

// Soft skills / talents (FR-04), drawn from the EXPERIENCE section of the
// resume (HVAC technician, food service/bartending) and the transferable-
// skills framing used in the pitch scripts. Icons reference the hand-drawn
// symbols added to public/icons.svg (not AI-generated — only the technical
// skill PNGs above are, per FR-06).
export const softSkills = [
  {
    id: 'diagnostic-problem-solving',
    title: 'Diagnostic Problem-Solving',
    description:
      'Years of diagnosing complex HVAC systems trained me to break problems into pieces, test hypotheses, and find root causes quickly — the same approach I bring to debugging code.',
    iconSymbol: 'diagnostic-icon',
    iconAlt: 'Magnifying glass icon representing diagnostic problem-solving',
  },
  {
    id: 'communication-under-pressure',
    title: 'Communication Under Pressure',
    description:
      "From explaining repairs to customers to keeping a busy bar running smoothly, I've learned to communicate clearly and stay calm when things get hectic.",
    iconSymbol: 'communication-icon',
    iconAlt: 'Speech bubble icon representing communication under pressure',
  },
  {
    id: 'adaptability',
    title: 'Adaptability & Fast-Paced Environments',
    description:
      'Comfortable switching between competing priorities, whether troubleshooting equipment on a deadline or juggling orders during a rush.',
    iconSymbol: 'adaptability-icon',
    iconAlt: 'Circular arrow icon representing adaptability',
  },
  {
    id: 'customer-team-focus',
    title: 'Customer & Team Focus',
    description:
      'Years in customer-facing roles — HVAC service and bartending — built strong instincts for listening to what people need and delivering it reliably.',
    iconSymbol: 'customer-icon',
    iconAlt: 'Two-person icon representing customer and team focus',
  },
]
