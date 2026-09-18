// Static content for the Home page's skill sections (ai-spec.md §5,
// "Static content as data"). Copy is sourced from m16-binder/resume.md
// (SKILLS/PROJECTS/EXPERIENCE) and the elevator-pitch scripts in
// docs/script-1.md / docs/script-2.md, per home-page.feature.md FR-03/FR-04.
// SkillsSection maps over these arrays instead of repeating card JSX per entry.
//
// title/description/iconAlt are locale-keyed objects ({ en, fr, es, de }),
// per languages.feature.md FR-04 — SkillCard reads them through the active
// language via i18n/LanguageContext's localize().

import jsIcon from '../../assets/js-icon.png'
import reactJsxIcon from '../../assets/react-jsx-icon.png'
import mernIcon from '../../assets/mern-icon.png'
import javaSpringIcon from '../../assets/java-spring-icon.png'

// Technical skills (FR-03). Icons are AI-generated (ChatGPT) vaporwave/synthwave
// PNGs — see home-page.feature.md FR-06 and CONCEPTS.md for the tool note.
export const technicalSkills = [
  {
    id: 'javascript',
    title: { en: 'JavaScript', fr: 'JavaScript', es: 'JavaScript', de: 'JavaScript' },
    description: {
      en: 'Comfortable building interactive UI logic and application behavior with modern JavaScript (ES6+).',
      fr: 'À l’aise pour développer une logique d’interface interactive et le comportement d’une application avec le JavaScript moderne (ES6+).',
      es: 'Cómodo desarrollando lógica de interfaz interactiva y el comportamiento de aplicaciones con JavaScript moderno (ES6+).',
      de: 'Sicher im Aufbau interaktiver UI-Logik und Anwendungsverhalten mit modernem JavaScript (ES6+).',
    },
    iconSrc: jsIcon,
    iconAlt: {
      en: 'Vaporwave-style JavaScript logo icon',
      fr: 'Icône du logo JavaScript de style vaporwave',
      es: 'Icono del logotipo de JavaScript estilo vaporwave',
      de: 'JavaScript-Logo-Symbol im Vaporwave-Stil',
    },
  },
  {
    id: 'react-jsx',
    title: { en: 'React & JSX', fr: 'React & JSX', es: 'React & JSX', de: 'React & JSX' },
    description: {
      en: 'Builds component-based front ends with React and JSX, including hooks and state management.',
      fr: 'Conçoit des interfaces basées sur des composants avec React et JSX, y compris les hooks et la gestion d’état.',
      es: 'Crea interfaces basadas en componentes con React y JSX, incluyendo hooks y gestión de estado.',
      de: 'Erstellt komponentenbasierte Frontends mit React und JSX, einschließlich Hooks und State-Management.',
    },
    iconSrc: reactJsxIcon,
    iconAlt: {
      en: 'Vaporwave-style React and JSX logo icon',
      fr: 'Icône du logo React et JSX de style vaporwave',
      es: 'Icono del logotipo de React y JSX estilo vaporwave',
      de: 'React- und JSX-Logo-Symbol im Vaporwave-Stil',
    },
  },
  {
    id: 'mern-stack',
    title: { en: 'MERN Stack', fr: 'MERN Stack', es: 'MERN Stack', de: 'MERN Stack' },
    description: {
      en: 'Built and deployed full-stack applications like CodeBloggs, a social blogging platform, using MongoDB, Express, React, and Node.js end-to-end.',
      fr: 'A conçu et déployé des applications full-stack comme CodeBloggs, une plateforme sociale de blogging, en utilisant MongoDB, Express, React et Node.js de bout en bout.',
      es: 'Creó y desplegó aplicaciones full-stack como CodeBloggs, una plataforma social de blogs, utilizando MongoDB, Express, React y Node.js de principio a fin.',
      de: 'Hat Full-Stack-Anwendungen wie CodeBloggs, eine soziale Blogging-Plattform, mit MongoDB, Express, React und Node.js durchgängig entwickelt und bereitgestellt.',
    },
    iconSrc: mernIcon,
    iconAlt: {
      en: 'Vaporwave-style MERN stack icon (MongoDB, Express, React, Node.js)',
      fr: 'Icône de style vaporwave pour la pile MERN (MongoDB, Express, React, Node.js)',
      es: 'Icono estilo vaporwave del stack MERN (MongoDB, Express, React, Node.js)',
      de: 'MERN-Stack-Symbol im Vaporwave-Stil (MongoDB, Express, React, Node.js)',
    },
  },
  {
    id: 'java-spring',
    title: {
      en: 'Java & Spring Boot',
      fr: 'Java & Spring Boot',
      es: 'Java & Spring Boot',
      de: 'Java & Spring Boot',
    },
    description: {
      en: 'Developed a Spring Boot backend with a MySQL database for Rocket Delivery, a food-ordering app with a React Native front end.',
      fr: 'A développé un backend Spring Boot avec une base de données MySQL pour Rocket Delivery, une application de commande de repas avec une interface React Native.',
      es: 'Desarrolló un backend en Spring Boot con una base de datos MySQL para Rocket Delivery, una aplicación de pedidos de comida con un front end en React Native.',
      de: 'Hat ein Spring-Boot-Backend mit einer MySQL-Datenbank für Rocket Delivery entwickelt, eine Essensbestell-App mit einem React-Native-Frontend.',
    },
    iconSrc: javaSpringIcon,
    iconAlt: {
      en: 'Vaporwave-style Java and Spring Boot logo icon',
      fr: 'Icône du logo Java et Spring Boot de style vaporwave',
      es: 'Icono del logotipo de Java y Spring Boot estilo vaporwave',
      de: 'Java- und Spring-Boot-Logo-Symbol im Vaporwave-Stil',
    },
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
    title: {
      en: 'Diagnostic Problem-Solving',
      fr: 'Résolution de problèmes par diagnostic',
      es: 'Resolución de problemas mediante diagnóstico',
      de: 'Diagnostische Problemlösung',
    },
    description: {
      en: 'Years of diagnosing complex HVAC systems trained me to break problems into pieces, test hypotheses, and find root causes quickly — the same approach I bring to debugging code.',
      fr: 'Des années à diagnostiquer des systèmes CVC complexes m’ont appris à décomposer les problèmes, tester des hypothèses et trouver rapidement les causes profondes — la même approche que j’applique au débogage de code.',
      es: 'Años diagnosticando sistemas de climatización complejos me enseñaron a dividir los problemas en partes, probar hipótesis y encontrar rápidamente la causa raíz — el mismo enfoque que aplico al depurar código.',
      de: 'Jahrelange Diagnose komplexer HLK-Systeme haben mir beigebracht, Probleme in Teile zu zerlegen, Hypothesen zu testen und Ursachen schnell zu finden — denselben Ansatz nutze ich beim Debuggen von Code.',
    },
    iconSymbol: 'diagnostic-icon',
    iconAlt: {
      en: 'Magnifying glass icon representing diagnostic problem-solving',
      fr: 'Icône d’une loupe représentant la résolution de problèmes par diagnostic',
      es: 'Icono de una lupa que representa la resolución de problemas mediante diagnóstico',
      de: 'Lupensymbol für diagnostische Problemlösung',
    },
  },
  {
    id: 'communication-under-pressure',
    title: {
      en: 'Communication Under Pressure',
      fr: 'Communication sous pression',
      es: 'Comunicación bajo presión',
      de: 'Kommunikation unter Druck',
    },
    description: {
      en: "From explaining repairs to customers to keeping a busy bar running smoothly, I've learned to communicate clearly and stay calm when things get hectic.",
      fr: 'Qu’il s’agisse d’expliquer des réparations à des clients ou de faire tourner un bar animé sans accroc, j’ai appris à communiquer clairement et à rester calme quand les choses s’agitent.',
      es: 'Ya sea explicando reparaciones a clientes o manteniendo un bar concurrido funcionando sin problemas, he aprendido a comunicarme con claridad y mantener la calma cuando las cosas se ponen agitadas.',
      de: 'Vom Erklären von Reparaturen gegenüber Kunden bis zum reibungslosen Betrieb einer belebten Bar — ich habe gelernt, klar zu kommunizieren und ruhig zu bleiben, wenn es hektisch wird.',
    },
    iconSymbol: 'communication-icon',
    iconAlt: {
      en: 'Speech bubble icon representing communication under pressure',
      fr: 'Icône de bulle de dialogue représentant la communication sous pression',
      es: 'Icono de un globo de diálogo que representa la comunicación bajo presión',
      de: 'Sprechblasensymbol für Kommunikation unter Druck',
    },
  },
  {
    id: 'adaptability',
    title: {
      en: 'Adaptability & Fast-Paced Environments',
      fr: 'Adaptabilité et environnements dynamiques',
      es: 'Adaptabilidad y entornos de ritmo acelerado',
      de: 'Anpassungsfähigkeit & schnelllebige Umgebungen',
    },
    description: {
      en: 'Comfortable switching between competing priorities, whether troubleshooting equipment on a deadline or juggling orders during a rush.',
      fr: 'À l’aise pour jongler entre des priorités concurrentes, que ce soit pour dépanner un équipement dans l’urgence ou gérer les commandes pendant un coup de feu.',
      es: 'Cómodo alternando entre prioridades en competencia, ya sea solucionando problemas de equipos con una fecha límite o gestionando pedidos durante una hora punta.',
      de: 'Kommt gut damit zurecht, zwischen konkurrierenden Prioritäten zu wechseln — sei es die Fehlersuche an Geräten unter Zeitdruck oder das Jonglieren mit Bestellungen im Stoßgeschäft.',
    },
    iconSymbol: 'adaptability-icon',
    iconAlt: {
      en: 'Circular arrow icon representing adaptability',
      fr: 'Icône de flèche circulaire représentant l’adaptabilité',
      es: 'Icono de flecha circular que representa la adaptabilidad',
      de: 'Kreispfeilsymbol für Anpassungsfähigkeit',
    },
  },
  {
    id: 'customer-team-focus',
    title: {
      en: 'Customer & Team Focus',
      fr: 'Orientation client et esprit d’équipe',
      es: 'Orientación al cliente y al equipo',
      de: 'Kunden- und Teamorientierung',
    },
    description: {
      en: 'Years in customer-facing roles — HVAC service and bartending — built strong instincts for listening to what people need and delivering it reliably.',
      fr: 'Des années dans des rôles en contact avec la clientèle — service CVC et bar — ont développé un solide instinct pour écouter les besoins des gens et y répondre de manière fiable.',
      es: 'Años en roles de atención al cliente — servicio de climatización y bar — desarrollaron un fuerte instinto para escuchar lo que la gente necesita y ofrecerlo de forma confiable.',
      de: 'Jahre in kundenorientierten Rollen — HLK-Service und Barkeeper — haben ein starkes Gespür dafür entwickelt, zuzuhören, was Menschen brauchen, und es zuverlässig zu liefern.',
    },
    iconSymbol: 'customer-icon',
    iconAlt: {
      en: 'Two-person icon representing customer and team focus',
      fr: 'Icône de deux personnes représentant l’orientation client et l’esprit d’équipe',
      es: 'Icono de dos personas que representa la orientación al cliente y al equipo',
      de: 'Zwei-Personen-Symbol für Kunden- und Teamorientierung',
    },
  },
]
