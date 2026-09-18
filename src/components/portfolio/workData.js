// Static content for the Portfolio page's Work Experience section
// (ai-spec.md §5, "Static content as data"). Facts (titles, organizations,
// dates) are sourced from the EXPERIENCE section of m16-binder/resume.md;
// descriptions are written fresh for this page, not copied from the resume
// (portfolio-page.feature.md FR-02, Feature-Specific Constraints). Tijuana
// Flats is intentionally omitted per the site owner's decision. Ordered
// most recent first. Icons are AI-generated (ChatGPT) — see
// portfolio-page.feature.md FR-06 and CONCEPTS.md for the tool note.
//
// title/description/iconAlt are locale-keyed objects ({ en, fr, es, de }),
// per languages.feature.md FR-04 — WorkEntry reads them through the active
// language via i18n/LanguageContext's localize(). organization/location/
// dates are proper nouns/date ranges and stay plain strings.

import shakerIcon from '../../assets/shaker-ai.png'
import acIcon from '../../assets/ac-ai.png'

export const workEntries = [
  {
    id: 'pier-teaki',
    title: {
      en: 'Bartender',
      fr: 'Barman',
      es: 'Cantinero',
      de: 'Barkeeper',
    },
    organization: 'Pier Teaki',
    location: 'St. Petersburg, Florida',
    dates: 'March 2023 – Present',
    description: {
      en: 'Run the bar for a busy waterfront restaurant: making cocktails & pouring drinks for guests and fielding drink tickets from the servers. Keep service moving during rushes by staying ahead on prep — batching cocktails and cutting garnish before the bar gets busy.',
      fr: 'Gère le bar d’un restaurant animé en bord de mer : préparation de cocktails et service de boissons aux clients, tout en traitant les commandes transmises par les serveurs. Maintient le service fluide pendant les coups de feu en anticipant la préparation — en préparant des cocktails à l’avance et en coupant les garnitures avant que le bar ne devienne chargé.',
      es: 'Dirige el bar de un concurrido restaurante frente al mar: prepara cócteles y sirve bebidas a los clientes, además de atender los pedidos que llegan de los meseros. Mantiene el servicio fluido durante las horas pico anticipándose en la preparación — preparando cócteles en lote y cortando guarniciones antes de que el bar se llene.',
      de: 'Leitet die Bar eines belebten Restaurants direkt am Wasser: mixt Cocktails und schenkt Getränke für Gäste aus und bearbeitet Bestellungen der Kellner. Hält den Service während des Andrangs am Laufen, indem er der Vorbereitung voraus bleibt — Cocktails im Voraus ansetzt und Garnituren zuschneidet, bevor die Bar voll wird.',
    },
    iconSrc: shakerIcon,
    iconAlt: {
      en: 'AI-generated retro-style cocktail shaker icon',
      fr: 'Icône de shaker à cocktail de style rétro générée par IA',
      es: 'Icono de una coctelera de estilo retro generado por IA',
      de: 'KI-generiertes Cocktail-Shaker-Symbol im Retro-Stil',
    },
  },
  {
    id: 'climate-design',
    title: {
      en: 'Residential Service Technician',
      fr: 'Technicien de service résidentiel',
      es: 'Técnico de servicio residencial',
      de: 'Servicetechniker für Wohngebäude',
    },
    organization: 'Climate Design',
    location: 'Clearwater, Florida',
    dates: 'February 2021 – February 2022',
    description: {
      en: 'Troubleshot residential HVAC systems across a range of makes and models, tracking symptoms down to the core issue. Perform seasonal maintenance on customers’ equipment to catch wear early, before it causes a system to fail.',
      fr: 'Dépannait des systèmes CVC résidentiels de marques et modèles variés, en remontant des symptômes jusqu’au problème central. Effectue l’entretien saisonnier des équipements des clients afin de détecter l’usure tôt, avant qu’elle ne provoque une panne du système.',
      es: 'Diagnosticaba y reparaba sistemas de climatización residenciales de diversas marcas y modelos, rastreando los síntomas hasta la causa principal. Realiza el mantenimiento estacional del equipo de los clientes para detectar el desgaste a tiempo, antes de que provoque una falla del sistema.',
      de: 'Behob Störungen an HLK-Anlagen in Wohnhäusern verschiedenster Marken und Modelle und verfolgte Symptome bis zur eigentlichen Ursache zurück. Führt saisonale Wartungen an den Anlagen der Kunden durch, um Verschleiß frühzeitig zu erkennen, bevor er zu einem Systemausfall führt.',
    },
    iconSrc: acIcon,
    iconAlt: {
      en: 'AI-generated retro-style air conditioning unit icon',
      fr: 'Icône de climatiseur de style rétro générée par IA',
      es: 'Icono de una unidad de aire acondicionado de estilo retro generado por IA',
      de: 'KI-generiertes Klimaanlagen-Symbol im Retro-Stil',
    },
  },
  {
    id: 'victory-mechanical',
    title: {
      en: 'Commercial Service Technician',
      fr: 'Technicien de service commercial',
      es: 'Técnico de servicio comercial',
      de: 'Servicetechniker für Gewerbeanlagen',
    },
    organization: 'Victory Mechanical',
    location: 'Bellingham, Massachusetts',
    dates: 'June 2015 – November 2020',
    description: {
      en: 'Handled service calls on HVAC equipment for commercial accounts, isolating and fixing issues with commercial and industrial heating and cooling systems. Also conducted periodic maintenance checks across client sites to keep equipment out of the repair queue.',
      fr: 'Assurait les interventions de service sur les équipements CVC pour des clients commerciaux, en isolant et en résolvant les problèmes des systèmes de chauffage et de climatisation commerciaux et industriels. Effectuait également des contrôles d’entretien périodiques sur les sites des clients afin d’éviter que les équipements ne finissent en réparation.',
      es: 'Atendía llamadas de servicio en equipos de climatización para clientes comerciales, aislando y solucionando problemas en sistemas de calefacción y refrigeración comerciales e industriales. También realizaba revisiones de mantenimiento periódicas en las instalaciones de los clientes para evitar que los equipos requirieran reparación.',
      de: 'Bearbeitete Serviceeinsätze an HLK-Anlagen für gewerbliche Kunden, indem Störungen an gewerblichen und industriellen Heiz- und Kühlsystemen eingegrenzt und behoben wurden. Führte außerdem regelmäßige Wartungskontrollen an Kundenstandorten durch, um Geräte aus der Reparaturschlange herauszuhalten.',
    },
    iconSrc: acIcon,
    iconAlt: {
      en: 'AI-generated retro-style air conditioning unit icon',
      fr: 'Icône de climatiseur de style rétro générée par IA',
      es: 'Icono de una unidad de aire acondicionado de estilo retro generado por IA',
      de: 'KI-generiertes Klimaanlagen-Symbol im Retro-Stil',
    },
  },
]
