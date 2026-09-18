import { Card } from 'react-bootstrap'
import { localize, useLanguage } from '../../i18n/LanguageContext'
import './WorkEntry.css'

// Renders one work experience entry (icon, title/role, organization, dates,
// description). See portfolio-page.feature.md FR-02 / § Interfaces Involved.
// title/description/iconAlt arrive as locale-keyed objects (workData.js,
// per languages.feature.md FR-04) and are resolved here via localize();
// organization/location/dates are plain strings.
function WorkEntry({ title, organization, location, dates, description, iconSrc, iconAlt }) {
  const { language } = useLanguage()

  return (
    <Card className="work-entry h-100">
      <div className="work-entry-body">
        <div className="work-entry-icon">
          <img src={iconSrc} alt={localize(iconAlt, language)} />
        </div>
        <div className="work-entry-text">
          <Card.Title as="h3">{localize(title, language)}</Card.Title>
          <p className="work-entry-org">
            {organization} — {location}
          </p>
          <p className="work-entry-dates">{dates}</p>
          <Card.Text>{localize(description, language)}</Card.Text>
        </div>
      </div>
    </Card>
  )
}

export default WorkEntry
