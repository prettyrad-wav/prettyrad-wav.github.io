import { Container, Row, Col } from 'react-bootstrap'
import LinkCard from '../components/links/LinkCard'
import { links } from '../components/links/linksData'
import './Pages.css'
import './Links.css'

// Links page (link-page.feature.md): 3 cards pointing to Nick's GitHub
// profile and the two learning platforms behind this site. All content is
// static data (ai-spec.md §5) — no user input or network calls.
function Links() {
  return (
    <section className="links-section">
      <Container className="py-5">
        <h1 className="links-title text-center">Links</h1>
        <p className="links-subtitle text-center">
          Where to find my code, and where I learned to write it.
        </p>
        <Row className="g-4 mt-2">
          {links.map((link) => (
            <Col key={link.id} xs={12} md={4}>
              <LinkCard {...link} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Links
