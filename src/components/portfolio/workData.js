// Static content for the Portfolio page's Work Experience section
// (ai-spec.md §5, "Static content as data"). Facts (titles, organizations,
// dates) are sourced from the EXPERIENCE section of m16-binder/resume.md;
// descriptions are written fresh for this page, not copied from the resume
// (portfolio-page.feature.md FR-02, Feature-Specific Constraints). Tijuana
// Flats is intentionally omitted per the site owner's decision. Ordered
// most recent first. Icons are AI-generated (ChatGPT) — see
// portfolio-page.feature.md FR-06 and CONCEPTS.md for the tool note.

import shakerIcon from '../../assets/shaker-ai.png'
import acIcon from '../../assets/ac-ai.png'

export const workEntries = [
  {
    id: 'pier-teaki',
    title: 'Bartender',
    organization: 'Pier Teaki',
    location: 'St. Petersburg, Florida',
    dates: 'March 2023 – Present',
    description:
      'Run the bar for a busy waterfront restaurant: making cocktails & pouring drinks for guests and fielding drink tickets from the servers. Keep service moving during rushes by staying ahead on prep — batching cocktails and cutting garnish before the bar gets busy.',
    iconSrc: shakerIcon,
    iconAlt: 'AI-generated retro-style cocktail shaker icon',
  },
  {
    id: 'climate-design',
    title: 'Residential Service Technician',
    organization: 'Climate Design',
    location: 'Clearwater, Florida',
    dates: 'February 2021 – February 2022',
    description:
      'Troubleshot residential HVAC systems across a range of makes and models, tracking symptoms down to the core issue. Perform seasonal maintenance on customers’ equipment to catch wear early, before it causes a system to fail.',
    iconSrc: acIcon,
    iconAlt: 'AI-generated retro-style air conditioning unit icon',
  },
  {
    id: 'victory-mechanical',
    title: 'Commercial Service Technician',
    organization: 'Victory Mechanical',
    location: 'Bellingham, Massachusetts',
    dates: 'June 2015 – November 2020',
    description:
      'Handled service calls on HVAC equipment for commercial accounts, isolating and fixing issues with commercial and industrial heating and cooling systems. Also conducted periodic maintenance checks across client sites to keep equipment out of the repair queue.',
    iconSrc: acIcon,
    iconAlt: 'AI-generated retro-style air conditioning unit icon',
  },
]
