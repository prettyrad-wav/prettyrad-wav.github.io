import { Card } from 'react-bootstrap'
import { localize, useLanguage } from '../../i18n/LanguageContext'
import './LinkCard.css'

// Renders one external link entry (image, title, description) as a single
// clickable card that opens the target URL in a new tab. See
// link-page.feature.md FR-01/FR-02. title/description/alt arrive as
// locale-keyed objects (linksData.js, per languages.feature.md FR-04) and
// are resolved here via localize(); url is a plain value.
function LinkCard({ title, description, url, image, alt }) {
  const { language } = useLanguage()

  return (
    <Card
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card h-100"
    >
      <div className="link-card-image">
        <img src={image} alt={localize(alt, language)} />
      </div>
      <Card.Body>
        <Card.Title as="h3">{localize(title, language)}</Card.Title>
        <Card.Text>{localize(description, language)}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default LinkCard
