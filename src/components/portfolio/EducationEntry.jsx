import { Card } from 'react-bootstrap'
import './EducationEntry.css'

// Renders one education entry (logo, institution, degree/program, dates).
// See portfolio-page.feature.md FR-01 / § Interfaces Involved.
function EducationEntry({ institution, location, program, dates, logoSrc, logoAlt }) {
  return (
    <Card className="education-entry h-100">
      <div className="education-entry-body">
        <div className="education-entry-logo">
          <img src={logoSrc} alt={logoAlt} />
        </div>
        <div className="education-entry-text">
          <Card.Title as="h3">{institution}</Card.Title>
          {location && <p className="education-entry-location">{location}</p>}
          <p className="education-entry-program">{program}</p>
          <p className="education-entry-dates">{dates}</p>
        </div>
      </div>
    </Card>
  )
}

export default EducationEntry
