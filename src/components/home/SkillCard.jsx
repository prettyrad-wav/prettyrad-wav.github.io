import { Card } from 'react-bootstrap'
import './SkillCard.css'

// Renders one skill/talent entry (icon + title + description). Shared shape
// for both the technical skills (image icon) and soft skills (sprite icon)
// sections — see home-page.feature.md § Interfaces Involved.
function SkillCard({ title, description, iconSrc, iconSymbol, iconAlt }) {
  return (
    <Card className="skill-card h-100">
      <div className="skill-card-icon">
        {iconSrc ? (
          <img src={iconSrc} alt={iconAlt} />
        ) : (
          <svg role="img" aria-label={iconAlt}>
            <use href={`/icons.svg#${iconSymbol}`}></use>
          </svg>
        )}
      </div>
      <Card.Body>
        <Card.Title as="h3">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SkillCard
