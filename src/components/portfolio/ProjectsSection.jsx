import { Container, Row, Col } from 'react-bootstrap'
import ProjectCard from './ProjectCard'
import { useLanguage } from '../../i18n/LanguageContext'
import './ProjectsSection.css'

// Titled grid of ProjectCard items (portfolio-page.feature.md FR-03).
function ProjectsSection({ entries }) {
  const { t } = useLanguage()

  return (
    <section className="projects-section">
      <Container className="py-5">
        <h2 className="projects-section-title text-center">{t('portfolio.projects.title')}</h2>
        <Row className="g-4 mt-2">
          {entries.map((entry) => (
            <Col key={entry.id} xs={12} md={6}>
              <ProjectCard {...entry} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default ProjectsSection
