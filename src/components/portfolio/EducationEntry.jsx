import { Card } from 'react-bootstrap'
import { localize, useLanguage } from '../../i18n/LanguageContext'
import './EducationEntry.css'

// Renders one education entry (logo, institution, degree/program, dates).
// See portfolio-page.feature.md FR-01 / § Interfaces Involved. institution/
// program/logoAlt arrive as locale-keyed objects (educationData.js, per
// languages.feature.md FR-04) and are resolved here via localize();
// location/dates are plain strings.
function EducationEntry({ institution, location, program, dates, logoSrc, logoAlt }) {
  const { language } = useLanguage()

  return (
    <Card className="education-entry h-100">
      <div className="education-entry-body">
        <div className="education-entry-logo">
          <img src={logoSrc} alt={localize(logoAlt, language)} />
        </div>
        <div className="education-entry-text">
          <Card.Title as="h3">{localize(institution, language)}</Card.Title>
          {location && <p className="education-entry-location">{location}</p>}
          <p className="education-entry-program">{localize(program, language)}</p>
          <p className="education-entry-dates">{dates}</p>
        </div>
      </div>
    </Card>
  )
}

export default EducationEntry
