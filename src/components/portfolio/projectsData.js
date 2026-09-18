// Static content for the Portfolio page's Projects section (ai-spec.md §5,
// "Static content as data"). Facts (tech, repo links) are sourced from the
// PROJECTS section of m16-binder/resume.md; descriptions are written fresh
// for this page, not copied from the resume (portfolio-page.feature.md
// FR-03, Feature-Specific Constraints). Images are AI-generated (ChatGPT) —
// see portfolio-page.feature.md FR-06 and CONCEPTS.md for the tool note.
//
// name/description/imageAlt are locale-keyed objects ({ en, fr, es, de }),
// per languages.feature.md FR-04 — ProjectCard reads them through the
// active language via i18n/LanguageContext's localize(). tech/repoUrl are
// not user-facing prose and stay plain values.

import codebloggsImage from '../../assets/codebloggs/cd-ai.png'
import rocketDeliveryImage from '../../assets/rdelivery/rdelivery-ai.png'

export const projectEntries = [
  {
    id: 'codebloggs',
    name: {
      en: 'CodeBloggs',
      fr: 'CodeBloggs',
      es: 'CodeBloggs',
      de: 'CodeBloggs',
    },
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    description: {
      en: 'A social blogging platform for developers, built end-to-end on the MERN stack. Visitors register and sign in to publish short posts ("bloggs"), like and comment on what other members share, and browse a directory to find other users on the platform.',
      fr: 'Une plateforme sociale de blogging pour développeurs, entièrement conçue sur la pile MERN. Les visiteurs s’inscrivent et se connectent pour publier de courts articles (« bloggs »), aimer et commenter ce que partagent les autres membres, et parcourir un annuaire pour trouver d’autres utilisateurs de la plateforme.',
      es: 'Una plataforma social de blogs para desarrolladores, creada de principio a fin con el stack MERN. Los visitantes se registran e inician sesión para publicar publicaciones cortas («bloggs»), dar like y comentar lo que comparten otros miembros, y explorar un directorio para encontrar a otros usuarios de la plataforma.',
      de: 'Eine soziale Blogging-Plattform für Entwickler, durchgängig auf dem MERN-Stack aufgebaut. Besucher registrieren sich und melden sich an, um kurze Beiträge („Bloggs“) zu veröffentlichen, das zu liken und zu kommentieren, was andere Mitglieder teilen, und ein Verzeichnis zu durchsuchen, um andere Nutzer der Plattform zu finden.',
    },
    imageSrc: codebloggsImage,
    imageAlt: {
      en: 'AI-generated retro-style artwork representing the CodeBloggs blogging platform',
      fr: 'Illustration de style rétro générée par IA représentant la plateforme de blogging CodeBloggs',
      es: 'Ilustración de estilo retro generada por IA que representa la plataforma de blogs CodeBloggs',
      de: 'KI-generierte Illustration im Retro-Stil, die die Blogging-Plattform CodeBloggs darstellt',
    },
    repoUrl: 'https://github.com/prettyrad-wav/Fullstack_Codebloggs',
  },
  {
    id: 'rocket-delivery',
    name: {
      en: 'Rocket Delivery',
      fr: 'Rocket Delivery',
      es: 'Rocket Delivery',
      de: 'Rocket Delivery',
    },
    tech: ['React Native', 'Expo', 'Spring Boot', 'MySQL'],
    description: {
      en: 'A food-ordering mobile app pairing a React Native/Expo front end with a Spring Boot and MySQL backend. A single login can carry a Customer role, a Courier role, or both, so the same account can browse restaurants and place an order, or accept a delivery and move it through its status updates.',
      fr: 'Une application mobile de commande de repas associant une interface React Native/Expo à un backend Spring Boot et MySQL. Un même identifiant peut porter un rôle Client, un rôle Livreur, ou les deux, afin qu’un même compte puisse parcourir des restaurants et passer une commande, ou accepter une livraison et suivre ses mises à jour de statut.',
      es: 'Una aplicación móvil de pedidos de comida que combina un front end en React Native/Expo con un backend en Spring Boot y MySQL. Un mismo inicio de sesión puede tener el rol de Cliente, el rol de Repartidor, o ambos, de modo que la misma cuenta pueda explorar restaurantes y hacer un pedido, o aceptar una entrega y seguir sus actualizaciones de estado.',
      de: 'Eine mobile App zur Essensbestellung, die ein React-Native/Expo-Frontend mit einem Spring-Boot- und MySQL-Backend kombiniert. Ein einzelner Login kann eine Kunden-Rolle, eine Kurier-Rolle oder beide tragen, sodass dasselbe Konto Restaurants durchsuchen und eine Bestellung aufgeben oder eine Lieferung annehmen und ihre Statusaktualisierungen verfolgen kann.',
    },
    imageSrc: rocketDeliveryImage,
    imageAlt: {
      en: 'AI-generated retro-style artwork representing the Rocket Delivery food ordering app',
      fr: 'Illustration de style rétro générée par IA représentant l’application de commande de repas Rocket Delivery',
      es: 'Ilustración de estilo retro generada por IA que representa la aplicación de pedidos de comida Rocket Delivery',
      de: 'KI-generierte Illustration im Retro-Stil, die die Essensbestell-App Rocket Delivery darstellt',
    },
    repoUrl: 'https://github.com/prettyrad-wav/rdelivery-m14',
  },
]
