import { Container, Row, Col } from 'react-bootstrap'
import LinkCard from '../components/links/LinkCard'
import { links } from '../components/links/linksData'
import { useLanguage } from '../i18n/LanguageContext'
import './Pages.css'
import './Links.css'

// Links page (link-page.feature.md): 3 cards pointing to Nick's GitHub
// profile and the two learning platforms behind this site. All content is
// static data (ai-spec.md §5) — no user input or network calls. Title/
// subtitle are chrome copy (languages.feature.md FR-03).
function Links() {
  const { t } = useLanguage()

  return (
    <section className="links-section">
      <Container className="py-5">
        <h1 className="links-title text-center">{t('links.title')}</h1>
        <p className="links-subtitle text-center">{t('links.subtitle')}</p>
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
