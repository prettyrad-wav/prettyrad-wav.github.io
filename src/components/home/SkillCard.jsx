import { Card } from 'react-bootstrap'
import { localize, useLanguage } from '../../i18n/LanguageContext'
import './SkillCard.css'

// Renders one skill/talent entry (icon + title + description). Shared shape
// for both the technical skills (image icon) and soft skills (sprite icon)
// sections — see home-page.feature.md § Interfaces Involved. title/
// description/iconAlt arrive as locale-keyed objects (skillsData.js, per
// languages.feature.md FR-04) and are resolved here via localize().
function SkillCard({ title, description, iconSrc, iconSymbol, iconAlt }) {
  const { language } = useLanguage()
  const localizedIconAlt = localize(iconAlt, language)

  return (
    <Card className="skill-card h-100">
      <div className="skill-card-icon">
        {iconSrc ? (
          <img src={iconSrc} alt={localizedIconAlt} />
        ) : (
          <svg role="img" aria-label={localizedIconAlt}>
            <use href={`/icons.svg#${iconSymbol}`}></use>
          </svg>
        )}
      </div>
      <Card.Body>
        <Card.Title as="h3">{localize(title, language)}</Card.Title>
        <Card.Text>{localize(description, language)}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SkillCard
