import { Card } from 'react-bootstrap'
import './WorkEntry.css'

// Renders one work experience entry (icon, title/role, organization, dates,
// description). See portfolio-page.feature.md FR-02 / § Interfaces Involved.
function WorkEntry({ title, organization, location, dates, description, iconSrc, iconAlt }) {
  return (
    <Card className="work-entry h-100">
      <div className="work-entry-body">
        <div className="work-entry-icon">
          <img src={iconSrc} alt={iconAlt} />
        </div>
        <div className="work-entry-text">
          <Card.Title as="h3">{title}</Card.Title>
          <p className="work-entry-org">
            {organization} — {location}
          </p>
          <p className="work-entry-dates">{dates}</p>
          <Card.Text>{description}</Card.Text>
        </div>
      </div>
    </Card>
  )
}

export default WorkEntry
