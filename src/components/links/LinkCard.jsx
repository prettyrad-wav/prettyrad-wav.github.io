import { Card } from 'react-bootstrap'
import './LinkCard.css'

// Renders one external link entry (image, title, description) as a single
// clickable card that opens the target URL in a new tab. See
// link-page.feature.md FR-01/FR-02.
function LinkCard({ title, description, url, image, alt }) {
  return (
    <Card
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card h-100"
    >
      <div className="link-card-image">
        <img src={image} alt={alt} />
      </div>
      <Card.Body>
        <Card.Title as="h3">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default LinkCard
