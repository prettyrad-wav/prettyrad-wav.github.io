// Static content for the Portfolio page's Projects section (ai-spec.md §5,
// "Static content as data"). Facts (tech, repo links) are sourced from the
// PROJECTS section of m16-binder/resume.md; descriptions are written fresh
// for this page, not copied from the resume (portfolio-page.feature.md
// FR-03, Feature-Specific Constraints). Images are AI-generated (ChatGPT) —
// see portfolio-page.feature.md FR-06 and CONCEPTS.md for the tool note.

import codebloggsImage from '../../assets/codebloggs/cd-ai.png'
import rocketDeliveryImage from '../../assets/rdelivery/rdelivery-ai.png'

export const projectEntries = [
  {
    id: 'codebloggs',
    name: 'CodeBloggs',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    description:
      'A social blogging platform for developers, built end-to-end on the MERN stack. Visitors register and sign in to publish short posts ("bloggs"), like and comment on what other members share, and browse a directory to find other users on the platform.',
    imageSrc: codebloggsImage,
    imageAlt:
      'AI-generated retro-style artwork representing the CodeBloggs blogging platform',
    repoUrl: 'https://github.com/prettyrad-wav/Fullstack_Codebloggs',
  },
  {
    id: 'rocket-delivery',
    name: 'Rocket Delivery',
    tech: ['React Native', 'Expo', 'Spring Boot', 'MySQL'],
    description:
      'A food-ordering mobile app pairing a React Native/Expo front end with a Spring Boot and MySQL backend. A single login can carry a Customer role, a Courier role, or both, so the same account can browse restaurants and place an order, or accept a delivery and move it through its status updates.',
    imageSrc: rocketDeliveryImage,
    imageAlt:
      'AI-generated retro-style artwork representing the Rocket Delivery food ordering app',
    repoUrl: 'https://github.com/prettyrad-wav/rdelivery-m14',
  },
]
