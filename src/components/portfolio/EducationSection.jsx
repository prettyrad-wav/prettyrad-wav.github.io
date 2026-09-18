import { Container, Row, Col } from 'react-bootstrap'
import EducationEntry from './EducationEntry'
import { useLanguage } from '../../i18n/LanguageContext'
import './EducationSection.css'

// Titled list of EducationEntry items in reverse chronological order
// (portfolio-page.feature.md FR-01).
function EducationSection({ entries }) {
  const { t } = useLanguage()

  return (
    <section className="education-section">
      <Container className="py-5">
        <h2 className="education-section-title text-center">{t('portfolio.education.title')}</h2>
        <Row className="g-4 mt-2">
          {entries.map((entry) => (
            <Col key={entry.id} xs={12} md={6}>
              <EducationEntry {...entry} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default EducationSection
